// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
const json2csv = require('json2csv');
const { firebaseConfig } = require('firebase-functions');
admin.initializeApp();
const db = admin.firestore();
const result = {
    code: 200,
    message: 'Default message',
    data: null
}

class Template {
    constructor(data) {
        for (let key in data) {
            this[key] = data[key];
        }
    }
};

// // Firestore data converter
const templateConverter = {
    toFirestore: function (data) {
        temp = {}
        for (let key in data) {
            temp[key] = data[key];
        }
        return temp;
    },
    fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options);
        return new Template(data);
    }
};


exports.getTemplate = functions.https.onRequest(async (req, res) => {
    // const target_version = req.header('version');
    // const target_version = req.query.version;
    let template;
    // await db.collection("configuration").doc(target_version)
    await db.collection("template").doc("general")
        .withConverter(templateConverter)
        .get().then((doc) => {
            if (doc.exists) {
                template = doc.data();
                // template = new Template(doc.data()['template']);
            } else {
                console.log("No such template!");
            }
        })
        .catch((error) => {
            console.log("Error getting template:", error);
        });
    res.set("Content-Type", "application/json")
    res.status(200).send(template);
    // res.status(200).json(template);
});

exports.downloadCSVFile = functions.https.onRequest(async (req, res) => {
    // gets the documents from the firestore collection
    var data = [];
    let target_collections = { "Twitter": "twitter_data", "Facebook": "facebook_data" }
    for (key in target_collections) {
        const docs = await db.collection(target_collections[key]).listDocuments().catch(error => {
            console.log(error);
            result.code = 500;
            result.message = "Internal error: cannot access the target collection (twitter or facebook). Please try again!";
            res.status(result.code).send(result);
        });
        for (const document of docs) {
            const collections = await document.listCollections().catch(error => {
                console.log(error);
                result.code = 500;
                result.message = "Internal error: cannot access the sub-collection. Please try again!";
                res.status(result.code).send(result);
            })
            for (const collection of collections) {
                console.log("Found subcollection with id:", collection.id);
                await collection.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        data.push({ "platform": key, "version_name": document.id, "user": collection.id, "action_time": doc.id, ...doc.data() });
                    });
                }).catch(error => {
                    console.log(error);
                    result.code = 500;
                    result.message = "Internal error: cannot successfully access data in sub-collections. Please try again!";
                    res.status(result.code).send(result);
                });
            }
        }
    }
    // csv header
    // const fields = Object.keys(record);
    let fields;
    await db.collection("template").doc("general")
        .withConverter(templateConverter)
        .get().then((doc) => {
            if (doc.exists) {
                fields = doc.data().attribute;
            } else {
                console.log("No such template!");
            }
        })
        .catch((error) => {
            console.log("Error getting template:", error);
            result.code = 500;
            result.message = "Internal error. Please try again!";
            res.status(result.code).send(result);
        });
        
    const csvFile = await json2csv.parseAsync(data, { fields });
    // generate filename
    const dateTime = new Date().toISOString().replace(/\W/g, "");
    const filename = dateTime + ".csv";
    res.setHeader(
        'Content-disposition',
        'attachment; filename=' + filename
    );
    res.set("Content-Type", "text/csv")
    res.status(201).send(csvFile)
});

exports.checkRole = functions.https.onRequest(async (req, res) => {
    const user_info = req.query.user;
    await db.collection("users").doc(user_info.toString())
        // .withConverter(templateConverter)
        .get().then(async (userDoc) => {
            if (userDoc.exists) {
                let type = userDoc.protoField('type');
                if (type) {
                    res.status(200).send(type.stringValue);
                } else {
                    //console.log('write type')
                    await db.collection("users").doc(user_info.toString()).update({ 'type': 'normal' })
                    res.status(200).send('normal');
                }
            } else {
                res.status(404).send('User not found!');
            }
        }).catch((error) => {
            console.log("Error getting user info:", error);
        });
});

exports.setLatestVersion = functions.https.onRequest(async (req, res) => {
    const version = req.query.version;
    const platform = req.query.platform;
    if (platform != "twitter" && platform != "facebook") {
        result.code = 400;
        result.message = "Wrong platform!";
        res.status(result.code).send(result);
    } else {
        let collection = platform + "_config";
        let config_all = await obtainAllConfig(collection);
        let config_name = config_all.map(config => config.version);
        console.log(config_name)
        if (config_name.indexOf(version) > -1) {
            await db.collection(collection).doc("latest_version").set({ version }).catch((error) => {
                console.log("Internal error:", error);
                result.code = 500;
                result.message = "Internal error. Please try again!";
                res.status(result.code).send(result);
            });
            result.code = 201;
            result.message = "This version has become the latest version in this platform.";
            res.status(result.code).send(result);
        } else {
            result.code = 400;
            result.message = "The version name is wrong!";
            res.status(result.code).send(result);
        }
    }
});

exports.setRole = functions.https.onRequest(async (req, res) => {
    const user_info = req.query.user
    const user_role = req.query.role.toLowerCase();
    if (user_role !== 'root' && user_role !== 'admin' && user_role !== 'normal') {
        result.code = 400;
        result.message = 'Please set a correct role!';
        res.status(400).send(result)
    } else {
        await db.collection("users").doc(user_info.toString())
            .get().then(async (userDoc) => {
                if (userDoc.exists) {
                    await db.collection("users").doc(user_info.toString()).update({ 'type': user_role })
                    await db.collection("users").doc(user_info.toString())
                        .get().then(async (userDoc) => {
                            let type = userDoc.protoField('type')
                            if (type) {
                                result.code = 201;
                                result.message = user_info + ' has already settled with ' + user_role;
                                result.data = { role: type.stringValue };
                            } else {
                                result.code = 400
                                result.message = "Something went wront and haven't settle correctly!";
                            }
                            res.status(result.code).send(result);
                        })
                } else {
                    result.code = 404;
                    result.message = 'User not found!'
                    res.status(result.code).send(result);
                }
            }).catch((error) => {
                console.log("Error getting user info:", error);
            });
    }
});

exports.uploadConfig = functions.https.onRequest(async (req, res) => {
    let cur = req.body;
    let platform = cur["platform"];
    delete cur.platform;
    let collection;
    if (platform == "twitter") {
        collection = "twitter_config";
    } else if (platform == "facebook") {
        collection = "facebook_config";
    } else {
        result.code = 400;
        result.message = "No such 'platform'."
        res.status(result.code).send(result);
    }

    let version = cur["version"];
    delete cur.version;
    await db.collection(collection).doc(version)
        .withConverter(templateConverter)
        .set(new Template(cur))
        .catch((error) => {
            console.log("Internal error:", error);
            result.code = 500;
            result.message = "Internal error. Please try again!";
            res.status(result.code).send(result);
        });
    await db.collection(collection).doc("latest_version").set({ version }).catch((error) => {
        console.log("Internal error:", error);
        result.code = 500;
        result.message = "Internal error. Please try again!";
        res.status(result.code).send(result);
    });

    let config = await obtainAllConfig(collection).catch((error) => {
        result.code = 500;
        result.message = "Internal error. Please try again!";
        res.status(result.code).send(result);
    });
    res.set("Content-Type", "application/json");
    result.code = 201;
    result.message = "Config uploaded successfuly!";
    result.data = config;
    res.status(200).send(result);
});

exports.getConfig = functions.https.onRequest(async (req, res) => {
    let platform = req.query.platform;
    let type = req.query.type;

    if (platform == "twitter" || platform == "facebook") {
        let collection = platform + '_config';
        if (type == 2) {
            let config = await obtainAllConfig(collection);
            res.set("Content-Type", "application/json");
            res.status(200).send(config);
        } else if (type == 0) {
            let target_version = req.query.version;
            let config = await obtainTargetConfig(collection, target_version);
            res.set("Content-Type", "application/json");
            res.status(200).send(config);
        } else if (type == 1) {
            let config = await obtainLatestConfig(collection);
            res.set("Content-Type", "application/json");
            res.status(200).send(config);
        } else {
            res.status(400).send("Type error!");
        }
    } else if (platform == "all") {
        let config = {};
        const platform_list = ["twitter", "facebook"];
        if (type == 2) {
            // obtain all configurations
            for (let i = 0; i < platform_list.length; i++) {
                let platform_name = platform_list[i];
                let temp = await obtainAllConfig(platform_name + "_config");
                config[platform_name] = temp;
            }
        } else if (type == 1) {
            // get the latest version
            for (let i = 0; i < platform_list.length; i++) {
                let platform_name = platform_list[i];
                let temp = await obtainLatestConfig(platform_name + "_config");
                config[platform_name] = temp;
            }
        } else {
            res.status(400).send("Wrong combination: type should be 0 or 1 when platform is 'all'.");
        }
        res.set("Content-Type", "application/json");
        res.status(200).send(config);
    } else {
        res.status(400).send("No such 'platform' type.");
    }
});

async function obtainAllConfig(collection) {
    let temp = [];
    await db.collection(collection)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    console.log(doc.id, " => ", doc.data());
                    let name = doc.id;
                    if (name != "latest_version") {
                        temp.push({ "version": doc.id, ...doc.data() });
                    }
                } else {
                    console.log("No such configuration!");
                }
            })
        })
        .catch((error) => {
            console.log("Error getting configuration:", error);
            res.status(500).send("Error getting configuration!");
        });
    return temp;
}

async function obtainLatestConfig(collection) {
    let target_version;
    await db.collection(collection).doc("latest_version")
        .get().then((doc) => {
            target_version = doc.data()["version"];
        }).catch((error) => {
            res.status(500).send("Internal error!Please try again.");
            console.log(error);
        });

    return await obtainTargetConfig(collection, target_version);
}

async function obtainTargetConfig(collection, target_version) {
    let temp = [];
    await db.collection(collection).doc(target_version)
        .withConverter(templateConverter)
        .get().then((doc) => {
            if (doc.exists) {
                temp.push({ "version": doc.id, ...doc.data() });
                // config.push({ "version": doc.id, "platform": web, ...doc.data()});
            } else {
                console.log("No such configuration: " + target_version);
                // console.log(doc.data());
            }
        }).catch((error) => {
            console.log("Error getting configuration:", error);
            res.status(500).send("Error getting configuration: " + target_version);
        });
    return temp;
}

exports.uploadData = functions.https.onRequest(async (req, res) => {
    const user_info = req.query.user.toString();
    const platform = req.query.platform.toString();
    const version = req.query.version.toString();
    const data_array = req.body;
    let batch = db.batch();
    data_array.forEach((data) => {
        if(data.time == null){
            result.code = 400;
            result.message = "Some data doesn't have a time"
            res.status(result.code).send(result);
        }else{
            let content = {}
            for (var key in data) {
                if (data.hasOwnProperty(key) && key != 'time') {
                    content[key] = data[key]
                }
            }
            batch.set(db.collection(platform + '_data').doc(version).collection(user_info).doc(data.time), content);
        }
    })
    // Commit the batch
    batch.commit().then(function () {
        result.code = 204;
        result.message = "Data collected successfully!"
        res.status(result.code).send(result);
    }).catch((error) => {
        result.code = 400;
        result.message = error.message;
        res.status(result.code).send(result)
    });
})

exports.readUtilityFile = functions.https.onRequest(async (req, res) => {
    const documentName = req.query.documentName.toString();
    const fileName = req.query.fileName.toString();
    await db.collection("utility_file").doc(documentName)
        .get().then(async (utilityFile) => {
            if (utilityFile.exists) {
                let file = utilityFile.protoField(fileName);
                if (file) {
                    result.code = 200;
                    result.message = 'Read the ' + fileName + ' file';
                    result.data = file.stringValue;
                    res.status(200).send(result);
                }
            } else {
                res.status(404).send('File not found!');
            }
        }).catch((error) => {
            console.log("Error getting utility file:", error);
        });
})