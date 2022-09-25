const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dr0kle13x",
  api_key: "281864712292239",
  api_secret: "rjkVJjE7R8QUxvA6APjL9MfkltE",
});

module.exports = cloudinary;