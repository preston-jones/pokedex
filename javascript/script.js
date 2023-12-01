
let currentPokemonFlavorText = [];
let loadedPokemonData = [];
let loadedPokemonDescription = [];
let loadedPokemonEvolutionChain = [];
let numberOfNextLoadingPokemon = 40; // first load 40 Pokemon
let numberOfLoadedPokemon = 0;
let pokemonCounter = numberOfNextLoadingPokemon + numberOfLoadedPokemon;
let listOfAllPokemon = [];
let numberOfAllPokemon;
let isSearchOn;


async function load() {
  isSearchOn = false;
  disableBodyScrolling();
  loadingAnimation();
  await getListOfAllPokemon();
  await loadPokemonThumbnail();
  hideLoadingContainer();
  enableBodyScrolling();
  scrollEvent();
}


function pushIntoLoadedPokemonData(currentPokemonData) {
  loadedPokemonData.push(currentPokemonData);
}


function pushIntoLoadedPokemonDescription(currentPokemonDescription) {
  loadedPokemonDescription.push(currentPokemonDescription);
}


function pushIntoLoadedPokemonEvolutionChain(currentPokemonEvolutionChain) {
  loadedPokemonEvolutionChain.push(currentPokemonEvolutionChain);
}


async function loadPokemonThumbnail() {
  let loadingCounter = numberOfLoadedPokemon + numberOfNextLoadingPokemon;
  for (let i = numberOfLoadedPokemon; i < loadingCounter; i++) {
    await getPokemonData(i, listOfAllPokemon);
    await getPokemonDescription(i);
    await getPokemonEvolutinChain(i);
    generatePokemonThumbnail(i);
    generatePokemonThumbnailType(i);
    generateLoadedPokemonCounter(i);
  }
  numberOfLoadedPokemon = loadingCounter;
}


async function loadMorePokemonThumbnail() {
  pokemonCounter = numberOfNextLoadingPokemon + numberOfLoadedPokemon;
  let loadingCounter = numberOfLoadedPokemon + numberOfNextLoadingPokemon;
  for (let i = numberOfLoadedPokemon; i < loadingCounter; i++) {
    await getPokemonData(i, listOfAllPokemon);
    await getPokemonDescription(i);
    await getPokemonEvolutinChain(i);
    generatePokemonThumbnail(i);
    generatePokemonThumbnailType(i);
    generateLoadedPokemonCounter(i);
  }
  numberOfLoadedPokemon = loadingCounter;
  scrolled = false;
}


function generatePokemonThumbnail(i) {
  document.getElementById('content_container').innerHTML += thumbnailTemplateHTML(i);
}


function generatePokemonThumbnailType(i) {
  for (let index = 0; index < loadedPokemonData[i].types.length; index++) {
    let pokemonType = loadedPokemonData[i].types[index].type.name;
    let capitalizedType = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
    document.getElementById(`pokemon_card_types_${loadedPokemonData[i].id}`).innerHTML += pokemonThumbnailTypeTemplateHTML(i, index, capitalizedType);
  }
}


function createIdDigit(i) {
  let digit;
  if (loadedPokemonData[i].id < 10) { digit = `00${loadedPokemonData[i].id}`; }
  if (loadedPokemonData[i].id >= 10 && loadedPokemonData[i].id < 100) { digit = `0${loadedPokemonData[i].id}`; }
  if (loadedPokemonData[i].id >= 100) { digit = `${loadedPokemonData[i].id}`; }

  return digit;
}


function upperCase(word) {
  let capitalizedName = word.charAt(0).toUpperCase() + word.slice(1);
  return capitalizedName;
}


function upperCasePokemonStat(currentStatName) {
  let capitalizedStat;
  if (currentStatName == 'hp') { capitalizedStat = 'HP'; }
  if (currentStatName == 'attack') { capitalizedStat = 'ATK'; }
  if (currentStatName == 'defense') { capitalizedStat = 'DEF'; }
  if (currentStatName == 'special-attack') { capitalizedStat = 'SATK'; }
  if (currentStatName == 'special-defense') { capitalizedStat = 'SDEF'; }
  if (currentStatName == 'speed') { capitalizedStat = 'SPD'; }

  return capitalizedStat;
}


function removeDisplayNoneClass() {
  document.getElementById('pokemon_info_container').classList.remove("display_none");
}


function addDisplayNoneClass() {
  document.getElementById('pokemon_info_container').classList.add("display_none");
}


function getPokemonIdByName(pokemonName, pokemon_array) {
  let currentPokemonId;
  for (let i = 0; i < pokemon_array.length; i++) {
    if (pokemon_array[i].name === pokemonName) {
      currentPokemonId = i;
      return currentPokemonId;
    }
  }
}


function showMenu() {
  document.getElementById('searchbar_container').classList.toggle('display_none');
  addMarginTop();
}