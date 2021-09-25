# Safe Heaven Desktop

## Description:

This project named to be as “Safe Heaven”, is designed for people who want to take charge for their security. 

Safe Heaven is a desktop app built using React JS and ElectronJS framework and serverless AWS DynamoDB for storing data.
Custom CSS is used for the UI.

## User Flow: 
1. User set a unique key.

![set key page](https://github.com/sudolmin/safehaven-desktop/blob/master/shsnap/setkeypage.PNG?raw=true)
![user sets key](https://github.com/sudolmin/safehaven-desktop/blob/master/shsnap/setkeypage2.PNG?raw=true)

2. User then authenticate using master key.

![user sets key](https://github.com/sudolmin/safehaven-desktop/blob/master/shsnap/authenticate.PNG?raw=true)

3. Dashboard view for Safe Heaven. User can create new entries, view, edit or delete existing entries.

![user sets key](https://github.com/sudolmin/safehaven-desktop/blob/master/shsnap/dashboard.PNG?raw=true)
![user sets key](https://github.com/sudolmin/safehaven-desktop/blob/master/shsnap/showpwd.PNG?raw=true)

## Setting up:

1. Installing dependencies

`npm install`

or equivalent in **yarn**

2. Serving in dev-mode 

`npm run electron:serve`

3. Building *exe* for Windows

`npm run electron:build`

### Add an extra file named `secret.js` in the *src/utils folder*
And add these lines to the file:
```
const AWS = require("aws-sdk")

const docClient = new AWS.DynamoDB.DocumentClient({
    region: "{yourDBregion}", "endpoint": "https://dynamodb.{yourDBendpoint}.amazonaws.com/",
    "accessKeyId": {yourawsaccesskey}, //string
    "secretAccessKey": {yourawssecretaccesskey}    //string
});

export {
    docClient
}
```

## Release Notes :

### 0.4.1
* Changes in encryption methods

### 0.3.3
* Changes in UI 
* Added application build script

### 0.1.0
* Migration from React JS web-app to desktop-app using ElectronJS