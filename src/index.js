const express = require('express');
const cors = require('cors');
// const data = require('./data/movies.json');
const users = require('./data/users.json');
const Database = require("better-sqlite3");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set("view engine", "ejs");

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const db = Database("./src/db/movies.db", { verbose: console.log });

// Recuperar todas las peliculas del catálogo de Netflix
server.get("/movies", (req, res) => {
  const query = db.prepare(`SELECT  * FROM movies ORDER BY title `);
  //Ejecuto la sentencia SQL
  const movieList = query.all();

  const dataMovies = {
    success: true,
    movies: movieList,
  };

  const genderFilterParam = req.query.gender;
  let response = {};
  if (genderFilterParam === undefined) {
    res.json({ success: false });
  } else {
    const filterGenderMovies = dataMovies.movies.filter((movie) => {
      if (genderFilterParam === "") {
        return true;
      }
      return movie.gender === genderFilterParam;
    });
    res.json({ success: true, movies: filterGenderMovies });
  }
});

server.post("/login", (req, res) => {
  const userFind = users.find(
    (user) =>
      user.email === req.body.email && user.password === req.body.password
  );
  if (userFind !== undefined) {
    return res.json({ success: true, userId: userFind.id });
  } else {
    return res.json({
      success: false,
      errorMessage: "Usuaria/o no encontrada/o",
    });
  }
});

// 4.4.
// 1. Consigue el id de la película que se va a renderizar
server.get("/movie/:movieId", (req, res) => {
  // console.log(req.params.movieId);
  const foundMovie = data.movies.find(
    (movie) => movie.id === req.params.movieId
  );
  // console.log(foundMovie);
  res.render("movie", foundMovie);
});

const staticServerPathWeb = "./src/public-react"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

const staticServerImages = "./src/public-movies-images"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerImages));

const staticServerCss = "./src/public-css"; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerCss));

//configura la base de datos en Node JS, donde tomamos los datos de movies.db
