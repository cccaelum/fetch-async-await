const searchInput = document.getElementById("searchInput"),
     searchBtn = document.getElementById("searchBtn"),
     prevBtn = document.getElementById("prevBtn"),
     nextBtn = document.getElementById("nextBtn"),
     resetBtn = document.getElementById("resetBtn"),
     app = document.getElementById("app")


let page = 0

const getPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=10`)
    .then(response => response.json())
    .then(data => {
        data.results.forEach((pokemon,i) => {
        fetch(`${data.results[i].url}`)
        .then(response => response.json())
        .then(data => {
            const template = `
            <div class="card">
            <img src="${data.sprites.front_default}" alt="${data.name}"/>
            <p>${data.name}</p>
            </div>` 
            app.innerHTML += template
            })
        });
    });
} 
getPokemon()


  nextBtn.addEventListener("click", ()=> {
    app.innerHTML = ""
    page += 10
    getPokemon()
  })

  prevBtn.addEventListener("click", ()=> {
    app.innerHTML = ""
    if (page < 10){
        page = 10
    }
    page -= 10
    getPokemon()

  })


  searchBtn.addEventListener("click", () =>{
    const nombre = searchInput.value

    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
    .then(response => {
        if (!response.ok){
            app.innerHTML = `<p class="error-message">Pokemon no encontrado</p>`
         } return response.json()
        }
    ).then(data=> {
        app.innerHTML = ""
        const template = `
        <div class="card">
        <img src="${data.sprites.front_default}" alt="${data.name}"/>
        <p>${data.name}</p>
        </div>` 
        app.innerHTML += template
        })
  }) 
    

  resetBtn.addEventListener('click', ()=> {
    searchInput.value="";
    app.innerHTML = ""
    getPokemon()})