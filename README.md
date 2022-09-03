# Passportjs-GoogleAuth2.0-With-API-call-from-front-end-example
A very simple example for Passportjs authentication with GoogleAuth2.0, also making an api call from the client side (front-end)

Variables of the .env file;
```
SECRET="YOUR_SECRET" -> Secret for sessions
clientID="YOUR_CLIENT_ID" -> Google project's client ID
clientSecret="YOUR_CLIENT_SECRET" -> Google project's client secret
callbackURL="YOUR_CALLBACK_URL_EXAMPLE=/auth-callback" -> Authorized callback URL
```

### Guides i followed while creating the project

To understand how authorization works;
https://developers.google.com/identity/oauth2/web/guides/how-user-authz-works
How to create a google project;
https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid

I also enabled the Youtube Data API v3 from the Enabled API's and Services section of the project in Google Cloud Console (https://console.cloud.google.com/). (Because i wanted to make API calls to youtube data)

Google's API explorer;
https://developers.google.com/apis-explorer

To setup Passportjs;
https://medium.com/@prashantramnyc/how-to-implement-google-authentication-in-node-js-using-passport-js-9873f244b55e

How to refresh an access token;
https://developers.google.com/identity/protocols/oauth2/web-server#offline

### While Deploying

To get rid of the warning when authorizing the app for your google account;
https://support.google.com/cloud/answer/7454865

Also, the Authorized Origins and Redirect URI must be changed in the Credentials section of the projcet in Google Cloud Console
