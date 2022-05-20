// Importamos librerias para trabajar con el back-end
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const server = express();

// configurar el servidor de express para apis
server.use(cors());
server.use(express.json());

//configurar el servidor para usar base de datos
server.set('view engine', 'ejs');

// Arrancamos el servidor
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Configuracion de la base de datos SQLite
const db = Database('./src/db/movies.db', { verbose: console.log });

// ENDPOINTS
// Recuperar todas las peliculas del catálogo de Netflix
server.get('/movies', (req, res) => {
  //Preparamos la query
  const query = db.prepare(`SELECT  * FROM movies ORDER BY title `);
  const movieList = query.all();
  // Para mantener estructura de datos originales
  const dataMovies = {
    success: true,
    movies: movieList,
  };
  // Filtro por genero de pelicula
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

// Endpoint para iniciar sesión
server.post('/login', (req, res) => {
  //Tomar los datos de la base de datos de usuarios en db
  const query = db.prepare(
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

//  Endpoint que nos trae la película según el id
server.get('/movie/:movieId', (req, res) => {
  const query = db.prepare(
    `SELECT  * FROM movies WHERE id=${req.params.movieId} `
  );
  //Nos traemos los datos de todas las películas
  const movieList = query.get();
  res.render('movie', movieList);
});

// Endpoint es para registrarse
server.post('/signup', (req, res) => {
  const query = db.prepare(
    `SELECT  * FROM users WHERE email = ? AND password = ? `
  );
  //Recogemos los valores de email y password que vienen por body params
  const emailRegister = query.get(req.body.email, req.body.password);
  // Condicional que busca en la base de datos si la usuaria ya está registrada
  if (emailRegister !== undefined) {
    return res.json({
      success: false,
      errorMessage: 'La usuaria ya está registrada',
    });
  } else {
    const insertUser = db.prepare(
      `INSERT INTO users (email, password) VALUES(?, ?) `
    );
    //Inserta en la base de datos
    const resultInsert = insertUser.run(req.body.email, req.body.password);
    return res.json({
      success: true,
      msj: 'Usuaria creada',
      userId: resultInsert.lastInsertRowid,
    });
  }
});

//SERVIDORES ESTÁTICOS
//Nos traemos la parte del front al back-end
const staticServerPathWeb = './src/public-react';
server.use(express.static(staticServerPathWeb));

//Servidor de estáticos de las imágenes
const staticServerImages = './src/public-movies-images';
server.use(express.static(staticServerImages));

// Servidor de estáticos para los estilos
const staticServerCss = './src/public-css';
server.use(express.static(staticServerCss));
