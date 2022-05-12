const express = require('express');
const cors = require('cors');
const movies = require("./data/movies.json");

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
server.get("/movies", (req, res) => {
  console.log("Ha pasao por aqui.");
  res.send(movies);
});
