const express = require('express');
const cors = require('cors');
const data = require('./data/movies.json');
const users = require('./data/users.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Recuperar todas las peliculas del catálogo de Netflix
server.get('/movies', (req, res) => {
  const genderFilterParam = req.query.gender;

  let response = {};
  if (genderFilterParam === undefined) {
    res.json({ success: false });
  } else {
    const filterGenderMovies = data.movies.filter((movie) => {
      if (genderFilterParam === '') {
        return true;
      }
      return movie.gender === genderFilterParam;
    });
    res.json({ success: true, movies: filterGenderMovies });
  }
});

server.post('/login', (req, res) => {
  const userFind = users.find(
    (user) =>
      user.email === req.body.email && user.password === req.body.password
  );
  if (userFind !== undefined) {
    return res.json({ success: true, userId: userFind.id });
  } else {
    return res.json({
      success: false,
      errorMessage: 'Usuaria/o no encontrada/o',
    });
  }
});

const staticServerPathWeb = './src/public-react'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerPathWeb));

const staticServerImages = './src/public-movies-images'; // En esta carpeta ponemos los ficheros estáticos
server.use(express.static(staticServerImages));
