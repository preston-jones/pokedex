
let currentPokemonFlavorText = [];
let loadedPokemonData = [];
let loadedPokemonDescription = [];
let loadedPokemonEvolutionChain = [];
let numberOfNextLoadingPokemon = 40; // first load 20 Pokemon
let numberOfLoadedPokemon = 0;
let listOfAllPokemon = [];
let numberOfAllPokemon;


async function load() {
  disableBodyScrolling();
  loadingAnimation();
  await getListOfAllPokemon();
  await loadPokemonThumbnail();
  hideLoadingContainer();
  emptyLoadingContainer();
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
    await getPokemonData(i);
    await getPokemonDescription(i);
    await getPokemonEvolutinChain(i);
    generatePokemonThumbnail(i);
    generatePokemonThumbnailType(i);
    generateLoadedPokemonCounter(i);
  }
  numberOfLoadedPokemon = loadingCounter;
  // numberOfNextLoadingPokemon = 20; // number of Pokemon loading when scrolling
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


function getPokemonIdByName(pokemonName) {
  let currentPokemonId;
  for (let i = 0; i < listOfAllPokemon.length; i++) {
    if (listOfAllPokemon[i].name === pokemonName) {
      currentPokemonId = i;
      return currentPokemonId;
    }
  }
}