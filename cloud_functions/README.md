## Initialize the cloud function in your local environment

##### Install Firebase CLI

Go to the file folder '**cloud_functions**' and open the cmd. Enter '**`npm install -g firebase-tools`**'

##### Login your account

Enter '**`firebase login`**' in the cmd, or you can enter ' **`firebase.cmd login`**' in VScode or other development tools.

##### manage the dependency

Enter '**`firebase init functions`**' or '**`firebase.cmd init functions`**' in vscode. Then, select the existing project '**Web-plugin-XXX**' and **Javascript** type in the following processes. I do not recommend you to install the ELint.

##### Deploy cloud functions

After finishing the above steps, you will find a index.js file in the functions folder. You can write your own code in there. And then use '**`firebase deploy --only functions`**' or '**`firebase deploy`**' to deploy those methods.

##### Install local emulator (optional)

If you want to run you methods in local emulator instead of frequently deploying to the cloud, you should firstly install the Firebase CLI and then go the '**functions**' folder. Then, open the cmd and enter '**`firebase emulators:start`**'.

https://firebase.google.com/docs/functions/local-emulator#windows

##### Use postman to do the testing (optional)

After running the local emulator, you can easily get the https request link, and use it to do testing in the Postman.