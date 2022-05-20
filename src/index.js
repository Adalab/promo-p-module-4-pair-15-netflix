const express = require('express');
const cors = require('cors');
// const data = require('./data/movies.json');
//const users = require('./data/users.json');
const Database = require('better-sqlite3');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const db = Database('./src/db/movies.db', { verbose: console.log });
const dbUsers = Database('./src/db/users.db', { verbose: console.log });

// Recuperar todas las peliculas del catálogo de Netflix
server.get('/movies', (req, res) => {
  const query = db.prepare(`SELECT  * FROM movies ORDER BY title `);
  //Ejecuto la sentencia SQL
  const movieList = query.all();

  const dataMovies = {
    success: true,
    movies: movieList,
  };

  // if (req.query.gender === '') {
  //   const query = db.prepare(`SELECT * FROM movies`);
  //   dataMovies = query.all();
  // } else {
  //   const query = db.prepare(`SELECT * FROM movies WHERE gender = ?`);
  //   genderList = query.all(dataMovies.movies.gender);
  //   //return genderList;
  // }
  // console.log(genderList);

  const genderFilterParam = req.query.gender;
  let response = {};
  if (genderFilterParam === undefined) {
    res.json({ success: false });
  } else {
    const filterGenderMovies = dataMovies.movies.filter((movie) => {
      if (genderFilterParam === '') {
        return true;
      }
      return movie.gender === genderFilterParam;
    });
    res.json({ success: true, movies: filterGenderMovies });
  }
});

server.post('/login', (req, res) => {
  //Tomar los datos de la base de datos de usuarios en dbUsers
  const query = dbUsers.prepare(
    `SELECT  * FROM users WHERE email = ? AND password = ? `
  );
  //Ejecuto la sentencia SQL
  const userFind = query.get(req.body.email, req.body.password);
  // Condicional para cuando se hace login, encuentre la usuaria en la base de datos
  if (userFind !== undefined) {
    return res.json({ success: true, userId: userFind.id });
  } else {
    return res.json({
      success: false,
      errorMessage: 'Usuaria/o no encontrada/o',
    });
  }
});

// 4.4.
// 1. Consigue el id de la película que se va a renderizar
server.get('/movie/:movieId', (req, res) => {
  const query = db.prepare(
    `SELECT  * FROM movies WHERE id=${req.params.movieId} `
  );
  //Ejecuto la sentencia SQL
  const movieList = query.get();

  // console.log(req.params.movieId);
  // const foundMovie = data.movies.find(
  //   (movie) => movie.id === req.params.movieId
  // );
  // console.log(foundMovie);
  res.render('movie', movieList);
});

server.post("/singup", (req, res) => {
  // const newUser = query.get(req.body.email, req.body.password);
  console.log(req.body.email, req.body.password);
  const query = db.prepare(
    `SELECT  * FROM users WHERE email = ? AND password = ? `
  );
  //Ejecuto la sentencia SQL
  const emailRegister = query.get(req.body.email, req.body.password);

  if (emailRegister !== undefined) {
    return res.json({
      success: false,
      msj: "La usuaria ya existe",
    });
  } else {
    const insertUser = db.prepare(
      `INSERT INTO users (email, password) VALUES(?, ?) `
    );
    const resultInsert = insertUser.run(email, password);
    return res.json({
      success: true,
      msj: "Usuaria creada",
      userId: resultInsert.lastInsertRowid,
    });
  }
});

const staticServerPathWeb = './src/public-react'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

const staticServerImages = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerImages));

const staticServerCss = './src/public-css'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerCss));

//configura la base de datos en Node JS, donde tomamos los datos de movies.db
