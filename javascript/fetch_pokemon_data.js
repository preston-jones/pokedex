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


async function getPokemonData(i, pokemon_array) {
    let url = pokemon_array[i].url;
    let response = await fetch(url);
    let currentPokemonData = await response.json();
    pushIntoLoadedPokemonData(currentPokemonData);
}


async function getPokemonDescription(i) {
    let url = `${loadedPokemonData[i].species.url}`;
    let response = await fetch(url);
    let currentPokemonDescription = await response.json();
    pushIntoLoadedPokemonDescription(currentPokemonDescription);
}


async function getPokemonEvolutinChain(i) {
    let url = loadedPokemonDescription[i].evolution_chain.url
    let response = await fetch(url);
    let currentPokemonEvolutionChain = await response.json();
    pushIntoLoadedPokemonEvolutionChain(currentPokemonEvolutionChain);
}


async function fetchPokemonImage(pokemonName) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
    let responseAsJson = await response.json();
    imageSrc = responseAsJson.sprites;
    return checkImageSrc(imageSrc);
}