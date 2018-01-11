// SAVED IN HEROKU CONFIG VARS
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  adminCode: process.env.ADMIN_CODE,
  cloudinaryKey: process.env.CLOUDINARY_KEY,
  cloudinarySecret: process.env.CLOUDINARY_SECRET,
  cloudinaryEnvVar: process.env.CLOUDINARY_ENV_VAR,
  port: process.env.PORT
};
