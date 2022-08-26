# CS74---Web-Plugin-for-Social-Media

A web extention project
[👉Click here for the project description document👈](https://docs.qq.com/pdf/DSWN3RmNLRVVCbXJX)

| Name        | Unikey   | Skills                                        | Roles               |
| ----------- | -------- | --------------------------------------------- | ------------------- |
| Yuming Ma   | yuma9781 | developer, projcet management                 | projcet manager     |
| Zheng Li    | zhli6352 | Java, basic JavaScript, knowledge in database | developer           |
| Zhiben Song | zson6521 | Java, JavaScript, Database                    | developer           |
| Chuyi Fu    | chfu6522 | Java, JavaScript, UI design                   | developer, designer |
| Wenhao Tang | wtan7741 | Java, JavaScript, knowledge in Datavase       | developer           |

## Part A. How to Build this Project

These structures is for developers only, after the extension package has been built, users can download the whole folder and install them in their browser without go through these steps. Please follow them to start your development.

You can find the **video** version:
[*Instruction - How to build and deploy the extension in local Chrome Browser*](https://youtu.be/IHu6d5CNRfw).

For things related to database setting, you can watch this video: 
[*Instruction - How to use Firebase in this Project (CS74)*](https://youtu.be/J6U8soGfJms).

### Step 1

Clone the repo. Currently we are using the 'dev' branch instead of the 'master' branch, so make sure you switch to this branch and pull its file. You should see an 'extension' folder in your project if you clone this branch successfully.

### Step 2

Open the project with your own ide. Open the terminal **in Extension folder**, enter `npm i` and run, it will start to download all the needed dependencies automatically. After it done, you should see a folder called 'node_modules' appears in your project structure. Then open the terminal again, enter and run `npm run move`, the whole project will build automatically。

### Step 3

Deploy this extension to the chrome. Go to the chrome://extensions panel, switch it to developer mode, click 'Load Unpacked' button and select the folder `extension/socialHelper`. You should see a local extension appears in the panel.

### Step 4

Since our extension is still local, the extension id is different, thus we need to do some personal settings. **Please create your own client ID**

Copy your own extension id, go to the [Google Cloud platform](https://console.cloud.google.com/apis/credentials?project=web-extension-project), switch to the Credentials tab on the left, click 'Create Credentials' button, select `OAuth Client ID`, set Application type as `Chrome app`. Then enter a proper name like 'Zhiben's client ID', paste your `extension ID` in the Application ID field and click Create.You would get a new client ID looks like `77xxxxxxx-xxxxxxxxxxxxx.apps.googleusercontent.com`, you need to copy this id, go to the `Manifest.json` file in your project, find the `oauth2` field and paste your client ID right after the `client_id`. You need to **rebuild** your project with `npm run move` after this step.

### Step 5

Go to [firebase console](https://console.firebase.google.com/u/0/project/web-extension-project/authentication/users), choose this 'Web Extension Project', go to Authentication → Sign-in Method, add a new domain with 'chrome-extension://[your extension ID]'.

You may now start the extension and have a test. Contact Zhiben Song if you faced any problems.

Have a nice coding time!

## Part B. Core Function Files

1. `background.js`

   This JavaScript file operate when the extension turn on.

   It handle things related to tab change including message transport

2. `popup.js`

   This JavaScript file operate when you click on extension icon

   It will set listeners on each `Switch`which control these rules

   ![image-20220403130728310](https://anon-images-1259646676.cos.ap-beijing.myqcloud.com/20220403130735.png)

3. `contentscript.js` & `contentscript_fb.js`

   This JavaScript file operate when the browser URL matched the ones set in `manifest.json`

   It will add predefined class to the content page (e.g, twitter.com) in `contentscript.scss` & `contentscript_fb.scss`to implement rules.

## Part C. How dose things work with Extension page?

The pages of popup are built under React.js.

![image-20220403135442689](https://anon-images-1259646676.cos.ap-beijing.myqcloud.com/20220403135442.png)

The basic logic of connection between popup page and the functional files mentions in Part A, can be briefly described like this，

> 1. Extension pop up
> 1. Get `Current Configuration` which contains a bunch of `rules `from server and store them in the `Chrome Storage`
> 1. get `Default Rules `from `Chrome Storage`
> 1. shows Default status of all rules in control panel
> 1. When some rules changes, update them in `Chrome Storage`
> 1. The local changes won't be synchronize to server unless `root user` click on `Update`
