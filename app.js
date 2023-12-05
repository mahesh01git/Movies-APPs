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

const convertMovieObj = (obj) => {
  return {
    movieId: obj.movie_id,
    directorId: obj.director_id,
    movieName: obj.movie_name,
    leadActor: obj.lead_actor,
  };
};

///API 1

app.get("/movies/", async (request, response) => {
  const api1 = `
    SELECT movie_name
    FROM 
    movie
    `;
  const movieName = await dbObj.all(api1);
  response.send(movieName.map((i) => convertMovieObj(i)));
});

/// API 2

app.post("/movies/", async (request, response) => {
  const { directorId, movieName, leadActor } = request.body;
  const api2 = `
    INSERT INTO
    movie (director_id,movie_name,lead_actor)
    VALUES (
        ${directorId},
        '${movieName}',
        '${leadActor}'
    )

    `;
  await dbObj.run(api2);
  response.send("Movie Successfully Added");
});

///API 3

app.get("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const api3 = `
    SELECT 
    *
    FROM 
    movie
    WHERE 
    movie_id = ${movieId}
    `;
  const myArraay = await dbObj.get(api3);
  response.send(myArraay);
});
