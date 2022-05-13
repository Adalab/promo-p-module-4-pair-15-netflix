const express = require('express');
const cors = require('cors');
const data = require('./data/movies.json');

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
  console.log('Ha pasao por aqui.');
  console.log(req.query.gender);
  const genderFilterParam = req.query.gender;
  let response = {};
  if (genderFilterParam === undefined) {
    res.json({ success: false });
  } else {
    const filterGenderMovies = data.movies.filter(
      (movie) => movie.gender === genderFilterParam
    );
    res.json({ success: true, movies: filterGenderMovies });
  }
});
