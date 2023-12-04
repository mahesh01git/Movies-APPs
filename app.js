const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "moviesData.db");

dbObj = null;

const intilazing = async () => {
  try {
    dbObj = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("server in running on http://3000/movies");
    });
  } catch (e) {
    console.log(`error ${e.message}`);
    process.exit(1);
  }
};

intilazing();
