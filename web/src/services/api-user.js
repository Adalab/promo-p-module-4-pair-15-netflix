// login

const sendLoginToApi = (data) => {
  console.log('Se están enviando datos al login:', data);

  const bodyParams = {
    email: data.email,
    password: data.password,
  };
  // Este fetch enviamos los datos para hacer el login desde front
  return fetch('http://localhost:4000/login', {
    method: 'POST',
    body: JSON.stringify(bodyParams),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

// signup - Este fetch nos sirve para enviar el mail y el password por body params, para registrarse

const sendSingUpToApi = (data) => {
  console.log('Se están enviando datos al signup:', data);
  const bodyParams = {
    email: data.email,
    password: data.password,
  };
  return fetch('http://localhost:4000/signup', {
    method: 'POST',
    body: JSON.stringify(bodyParams),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// profile

const sendProfileToApi = (userId, data) => {
  console.log('Se están enviando datos al profile:', userId, data);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(
    '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json'
  );
};

const getProfileFromApi = (userId) => {
  console.log('Se están pidiendo datos del profile del usuario:', userId);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(
    '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json'
  )
    .then((response) => response.json())
    .then(() => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return {
        success: true,
        name: 'Maricarmen',
        email: 'mari@mail.com',
        password: '1234567',
      };
    });
};

// user movies

const getUserMoviesFromApi = (userId) => {
  console.log(
    'Se están pidiendo datos de las películas de la usuaria:',
    userId
  );
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(
    '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json'
  )
    .then((response) => response.json())
    .then(() => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return {
        success: true,
        movies: [
          {
            id: 1,
            title: 'Gambita de dama',
            gender: 'Drama',
            image:
              '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg',
          },
        ],
      };
    });
};

const objToExport = {
  sendLoginToApi: sendLoginToApi,
  sendSingUpToApi: sendSingUpToApi,
  sendProfileToApi: sendProfileToApi,
  getProfileFromApi: getProfileFromApi,
  getUserMoviesFromApi: getUserMoviesFromApi,
};

export default objToExport;
