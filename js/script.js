const searchInput = document.getElementById("searchInput"),
     searchBtn = document.getElementById("searchBtn"),
     prevBtn = document.getElementById("prevBtn"),
     nextBtn = document.getElementById("nextBtn"),
     resetBtn = document.getElementById("resetBtn"),
     app = document.getElementById("app")

let page = 0 

const getPokemon = async () => {
  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=10`);
      const data = await response.json();

      const pokemonPromises = data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          const template = `
          <div class="card">
              <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"/>
              <p>${pokemonData.name}</p>
          </div>`; 
          app.innerHTML += template;
      });

      await Promise.all(pokemonPromises);
  } catch (error) {
      console.log(error);
  }
};

getPokemon();

nextBtn.addEventListener("click", () => {
  app.innerHTML = "";
  page += 10;
  getPokemon();
});

prevBtn.addEventListener("click", () => {
  app.innerHTML = "";
  if (page < 10) {
      page = 10;
  }
  page -= 10;
  getPokemon();
});

searchBtn.addEventListener("click", async () => {
  const name = searchInput.value;
  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
          app.innerHTML = `<p class="error-message">Pokemon no encontrado</p>`;
          return;
      }
      const data = await response.json();
      app.innerHTML = "";
      const template = `
      <div class="card">
          <img src="${data.sprites.front_default}" alt="${data.name}"/>
          <p>${data.name}</p>
      </div>`; 
      app.innerHTML += template;
  } catch (error) {
      console.log(error);
      app.innerHTML = `<p class="error-message">Pokemon no encontrado</p>`;
  }
});

resetBtn.addEventListener('click', () => {
  searchInput.value = "";
  app.innerHTML = "";
  getPokemon();
});

