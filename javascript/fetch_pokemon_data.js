// get Number of all Pokemon available on Server
async function getNumberOfAllPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    numberOfAllPokemon = responseAsJson.count;
    return numberOfAllPokemon;
}


// get Namelist + Url of all Pokemon
async function getListOfAllPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=${await getNumberOfAllPokemon()}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    listOfAllPokemon = responseAsJson.results;
}


// Load Data for 20 Pokemons at first
async function getPokemonData(i) {
    let url = listOfAllPokemon[i].url;
    let response = await fetch(url);
    console.log(response);
    let currentPokemonData = await response.json();
    pushIntoLoadedPokemonData(currentPokemonData);
}


async function getPokemonDescription(i) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${loadedPokemonData[i].id}`;
    let response = await fetch(url);
    console.log(response);
    let currentPokemonDescription = await response.json();
    pushIntoLoadedPokemonDescription(currentPokemonDescription);
}


async function getPokemonEvolutinChain(i) {
    let url = loadedPokemonDescription[i].evolution_chain.url
    let response = await fetch(url);
    console.log(response);
    let currentPokemonEvolutionChain = await response.json();
    pushIntoLoadedPokemonEvolutionChain(currentPokemonEvolutionChain);
}


async function fetchPokemonImage(pokemonName, imageSrc) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
    let responseAsJson = await response.json();
    imageSrc = responseAsJson.sprites;
    return ceckImageSrc(imageSrc);
}