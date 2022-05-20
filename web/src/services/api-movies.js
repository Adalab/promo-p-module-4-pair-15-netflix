
const getMoviesFromApi = (params) => {
  console.log('Se están pidiendo las películas de la app');
 // Recibe por parametros el género de las películas para filtrarlas
  return fetch(`http://localhost:4000/movies?gender=${params.gender}`)
    .then((response) => response.json())
    .then((data) => {
      //Nos devuelve las películas filtradas
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
