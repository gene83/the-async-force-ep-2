'use strict';

function reqResource() {
  const genReq = new XMLHttpRequest();
  const genReqListener = function() {
    if (this.status !== 200) {
      const errorDiv = document.createElement('div');
      errorDiv.innerHTML = `Error: Fetching resource: ${this.responseURL} ${
        genObj.detail
      }`;
      contContainer.appendChild(errorDiv);
      return;
    }

    const genObj = JSON.parse(this.responseText);
    const contContainer = document.querySelector('#contentContainer');

    contContainer.innerHTML = '';

    if (resourceType.value === 'people') {
      const nameH2 = document.createElement('h2');
      nameH2.innerHTML = genObj.name;
      contContainer.appendChild(nameH2);

      const genderP = document.createElement('p');
      genderP.innerHTML = 'Gender: ' + genObj.gender;
      contContainer.appendChild(genderP);

      const speciesReq = new XMLHttpRequest();

      const speciesReqListener = function() {
        const speciesObj = JSON.parse(this.responseText);

        const speciesP = document.createElement('p');
        speciesP.innerHTML = 'Species: ' + speciesObj.name;
        contContainer.appendChild(speciesP);
      };

      speciesReq.addEventListener('load', speciesReqListener);
      speciesReq.open('get', genObj.species[0]);
      speciesReq.send();
    } else if (resourceType.value === 'planets') {
      const nameH2 = document.createElement('h2');
      nameH2.innerHTML = genObj.name;
      contContainer.appendChild(nameH2);

      const terrainP = document.createElement('p');
      terrainP.innerHTML = 'Terrain: ' + genObj.terrain;
      contContainer.appendChild(terrainP);

      const populationP = document.createElement('p');
      populationP.innerHTML = 'Population: ' + genObj.population;
      contContainer.appendChild(populationP);

      const filmHeader = document.createElement('p');
      filmHeader.innerHTML = 'Appears in Films:';
      contContainer.appendChild(filmHeader);

      const filmList = document.createElement('ul');
      contContainer.appendChild(filmList);

      for (let i = 0; i < genObj.films.length; i++) {
        const filmReq = new XMLHttpRequest();

        function filmReqListener() {
          const filmObj = JSON.parse(this.responseText);

          const film = document.createElement('li');
          film.innerHTML = filmObj.title;
          filmList.appendChild(film);
        }

        filmReq.addEventListener('load', filmReqListener);
        filmReq.open('get', genObj.films[i]);
        filmReq.send();
      }
    } else if (resourceType.value === 'starships') {
      const nameH2 = document.createElement('h2');
      nameH2.innerHTML = genObj.name;
      contContainer.appendChild(nameH2);

      const ManufacturerP = document.createElement('p');
      ManufacturerP.innerHTML = 'Manufacturer: ' + genObj.manufacturer;
      contContainer.appendChild(ManufacturerP);

      const starshipClassP = document.createElement('p');
      starshipClassP.innerHTML = 'Starship class: ' + genObj.starship_class;
      contContainer.appendChild(starshipClassP);

      const filmHeader = document.createElement('p');
      filmHeader.innerHTML = 'Appears in Films:';
      contContainer.appendChild(filmHeader);

      const filmList = document.createElement('ul');
      contContainer.appendChild(filmList);

      for (let i = 0; i < genObj.films.length; i++) {
        const filmReq = new XMLHttpRequest();

        function filmReqListener() {
          const filmObj = JSON.parse(this.responseText);

          const film = document.createElement('li');
          film.innerHTML = filmObj.title;
          filmList.appendChild(film);
        }

        filmReq.addEventListener('load', filmReqListener);
        filmReq.open('get', genObj.films[i]);
        filmReq.send();
      }
    }
  };

  genReq.addEventListener('load', genReqListener);
  genReq.open(
    'get',
    `https://swapi.co/api/${resourceType.value}/${resourceId.value}`
  );
  genReq.send();
}

const reqResourceBtn = document.querySelector('#requestResourceButton');
reqResourceBtn.addEventListener('click', reqResource);
