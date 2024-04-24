require("dotenv").config();

const MONGODB_URI =
  process.env.NODE_ENV === "development"
    ? process.env.DEVELOPMENT_MONGODB_URI
    : process.env.PRODUCTION_MONGODB_URI;

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  MONGODB_URI,
  JWT_SECRET,
};
