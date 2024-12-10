// Variables
const pokemonList = document.getElementById("pokemonList");
const pokemonDetail = document.getElementById("pokemonDetail");
const pokemonInfo = document.getElementById("pokemonInfo");
const backBtn = document.getElementById("backBtn");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
let query = "";


//Función que consultala api de pokeapi
async function fetchPokemonData(pokemonID) {
    // let endpoint ="https://pokeapi.co/api/v2/pokemon/" + pokemonID;
    // const response = await fetch(endpoint)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`);
    const pokemon = await  response.json();
    return pokemon;
}
// Función que muestrs el pokemon
function displayPokemon(pokemon){
    // console.log(pokemon.stats[0].stat.name) 
    console.log(pokemon
    
    ) 
    const pokemonCard = document.createElement("div");//creando el elemento
    pokemonCard.classList.add("pokemonCard")// agregando una clase

    //bloque que me busca los tipos
    let pokemonTypes = ""

    for(let i=0; i<pokemon.types.length; i++){
        pokemonTypes = pokemonTypes + pokemon.types[i].type.name + " "
    }

    // creamos el contenido de la tarjeta
    pokemonCard.innerHTML = `
    
    <h3 class="name">${pokemon.name}</h3>
    <h2 class="idName">${pokemon.id}</h2>
    <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
    <h3 class="name">Tipos de pokemon</h3>
    <p>${pokemonTypes}</p>
    `
    //Agregamos la funcionalidad de click para llamar la vista especifica
    pokemonCard.addEventListener("click",()=>{
        console.log("click")
        showPokemonDetail(pokemon)
    })
    
    pokemonList.appendChild(pokemonCard)
}

function showPokemonDetail(pokemon){
    pokemonList.style.display="none"
    pokemonDetail.style.display = "block"

    // console.log(pokemon.moves[0].move.name)

    let pokemonStats="";
    for(let i=0; i<pokemon.stats.length; i++){
        pokemonStats=pokemonStats + `<div>${pokemon.stats[i].stat.name}:${pokemon.stats[i].base_stat} </div>`
    }

    let pokemonTypes= ""
    for(let i=0; i<pokemon.types.length; i++){
        //console.log(pokemon.types[i])
        pokemonTypes = pokemonTypes + pokemon.types[i].type.name + " "
    }

    let pokemonMoves="";
    for(let i=0; i<pokemon.moves.length; i++){
        pokemonMoves=pokemonMoves + `<div>Move ${[i]}:${pokemon.moves[i].move.name} </div>`
    }

    pokemonInfo.innerHTML = `
    <h2>Detalle de Pokemon</h2>
    <h3 class="name">${pokemon.name}</h3>
    <h2 class="idName">${pokemon.id}</h2>
    <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}">
    <h3 class="name">Tipos del pokemon</h3>
    <p>${pokemonTypes}</p>
    <h3 class="name">Pokemon stats</h3>
    <ul>
    ${pokemonStats}
    </ul>

    <h3 class="name">Pokemon moves</h3>
    <ul>
    ${pokemonMoves}
    </ul>
    `
}
backBtn.addEventListener("click",()=>{
    pokemonDetail.style.display="none"
    pokemonList.style.display="block"
})

searchInput.addEventListener("input",(e)=>{
    query = e.target.value
    console.log(query)
})

async function searchPokemon() {

    try{
        const pokemon = await fetchPokemonData(query);
        showPokemonDetail(pokemon);

    } catch (error){
        alert(" Pokemon no encontrado")
    }
    
}

searchBtn.addEventListener("click",()=>{
    searchPokemon()
})

async function loadPokedex() {
    for(let i=1;i<20;i++){
        let pokemon = await fetchPokemonData(i);
        displayPokemon(pokemon)
    }
    
    //console.log(pokemon);
    
}
// solid open encodeURIabierto para modificar cerrado para asignar
loadPokedex()
//displayPokemon()