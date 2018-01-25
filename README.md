# Art Gallery App

[Art Gallery](https://dry-badlands-96280.herokuapp.com/) is essentially a photo displayer. It was created to show off art made by students in an art club at an elementary school. It allows users to go to the gallery, login with google for commenting, and expand different galleries and individual pieces of art. The operator has admin access to be able to upload, post, edit, and delete parent-level galleries and child-level pieces of artwork and their info. User features include being able to comment on pictures and edit or delete those comments. The current pictures are samples to display what the gallery looks like, as the art club has not started yet.

## Development
### Prerequisites
#### MongoDB
Art Gallery uses MongoDB as its database. That being said, it uses a local Mongo shell for development. Be sure to download Mongo and run the local database before running your application.
#### Cloudinary
Art Gallery uses Multer and Cloudinary to upload image files for blog posts. You will need to visit [cloudinary.com](cloudinary.com) and set up an account for image uploading the work properly.
#### Google OAuth
Art Gallery uses the Google+ API for Google OAuth. Go to [console.developers.google.com](https://console.developers.google.com) and create a new project. Enable the Google+ API. Then, under the "credentials" tab, under "Authorized JavaScript origins" input `http://localhost:8080` (or whatever port you are running your server from) and under "Authorized redirect URIs"  put `http://localhost:8080/auth/google/callback` (or whatever port you are running your server from).

### Setup
After cloning this repo, you will need to do the following to have it ready to run in your own environment:

Run `npm install` to install the dependencies from the package.json file into a node_modules folder in the server. Then, move into the `client` directory and run `npm install` to install the client-side dependencies from the package.json file into a node_modules folder. 

#### dev.js
Next, you will need to open the `config` folder and create the `dev.js` file. Within this file, you should have the following code:
```
module.exports = {
  googleClientID: 'some_google_client_id',
  googleClientSecret: 'some_google_client_secret',
  mongoURI: 'mongodb://localhost/artgallery',
  cookieKey: 'some_cookie_key',
  adminCode: 'some_admin_code',
  cloudinaryKey: 'some_cloudinary_key',
  cloudinarySecret: 'some_cloudinary_secret',
  cloudinaryEnvVar: 'some_cloudinary_environment_variable',
  cloudName: 'some_cloud_name',
  port: 8080 // any unused port beside 3000
};
```
-`googleClientId` and `googleClientSecret` are keys found within your Google OAuth API.
-`mongoURI` is your MongoDB shell. You can keep it as is, or change 'ramblings' to something else.
-`cookieKey` is the secret key for cookie-session. Make sure this is something that would be hard to guess. (Keyboard mashing works just fine for this).
-`adminCode` is a password you set that allows a user to register his or her account as an admin.
-`cloudinaryKey` ,  `cloudinarySecret`, `cloudinaryEnvVar`, and `cloudName` are keys found within your Cloudinary account.

### Fire it Up
Once everything is configured for development, you can run your application by entering `npm run dev` in the command prompt. 'dev' is a script to run the server and client at the same time. Once you run this command, a new tab should open up in your browser with your project.

## Production
### Prerequisites
#### MLab
Because Art Gallery uses MongoDB, it uses MLab in production. Create an account at [mlab.com](mlab.com) and create a database (there is a free option) for your application.
#### Heroku
Art Gallery is deployed using Heroku. Be sure to set all of your config variables under settings. The most notable changes from your `dev.js` configuration are your `DATABASEURL`, which will no longer be the local Mongo shell, but will be your MLab URL (It should look similar to this:
`mongodb://username:password@ds123456.mlab.com:78910/artgallery`) and your Google OAuth keys (which will be found in the production project).
#### Google OAuth
It is a good idea to create a separate production Google OAuth project. Do this, enable the Google+ API. Then, under the "credentials" tab, under "Authorized JavaScript origins" input `https://artgallery.herokuapp.com` (or whatever your name your heroku project) and under "Authorized redirect URIs"  put `https://artgallery.herokuapp.com/auth/google/callback` (or whatever your name your heroku project).