
let currentPokemonFlavorText = [];
let loadedPokemonData = [];
let loadedPokemonDescription = [];
let loadedPokemonEvolutionChain = [];
let numberOfNextLoadingPokemon = 10; // first load 20 Pokemon
let numberOfLoadedPokemon = 0;
let listOfAllPokemon = [];
let numberOfAllPokemon;


async function load() {
  await getListOfAllPokemon();
  loadPokemonThumbnail();
  scrollEvent();
}


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


function pushIntoLoadedPokemonData(currentPokemonData) {
  loadedPokemonData.push(currentPokemonData);
}


async function getPokemonDescription(i) {
  let url = `https://pokeapi.co/api/v2/pokemon-species/${loadedPokemonData[i].id}`;
  let response = await fetch(url);
  console.log(response);
  let currentPokemonDescription = await response.json();
  pushIntoLoadedPokemonDescription(currentPokemonDescription);
}


function pushIntoLoadedPokemonDescription(currentPokemonDescription) {
  loadedPokemonDescription.push(currentPokemonDescription);
}


async function getPokemonEvolutinChain(i) {
  let url = loadedPokemonDescription[i].evolution_chain.url
  let response = await fetch(url);
  console.log(response);
  let currentPokemonEvolutionChain = await response.json();
  pushIntoLoadedPokemonEvolutionChain(currentPokemonEvolutionChain);
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


function generateLoadedPokemonCounter(i) {
  document.getElementById('loaded_pokemon_counter').innerHTML = pokemonCounterTemplateHTML(i);
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


// LOAD POKEMON_INFOCARD
function loadPokemonInfoCard(i) {
  document.getElementById('pokemon_info_container').innerHTML = '',
  removeDisplayNoneClass();
  document.getElementById('pokemon_info_container').innerHTML += pokemonInfoCardTemplateHTML(i);
  loadPokemonInfoCardHeader(i);
  setButtonActive(id = 'stats_button');
  loadAbout(i);
}


// CATEGORY BUTTONS //
function clickButton(id) {
  let clicked = id;
  setButtonActive(clicked);
  removeButtonActive(id);
}


function setButtonActive(id) {
  document.getElementById(id).classList.add('pokemon_info_category_button_ACTIVE');
}


function removeButtonActive(id) {
  document.getElementById(id).classList.remove('pokemon_info_category_button_ACTIVE');
}


function loadPokemonEvolution(i) {
  generatePokemonEvolutionChain(i);
  document.getElementById('stats_button').classList.remove('pokemon_info_category_button_ACTIVE'); //!!! AUSLAGERN IN EIGENE FUNKTION???
}


function generatePokemonEvolutionChain(i) {
  document.getElementById(`info_content_container_${loadedPokemonData[i].name}`).innerHTML = '';
  loadPokemonEvolutionChain(i);
}


function loadPokemonMoves(i) {
  document.getElementById(`info_content_container_${loadedPokemonData[i].name}`).innerHTML = '';
  document.getElementById(`info_content_container_${loadedPokemonData[i].name}`).innerHTML += `
      <div id="pokemon_moves_list_${loadedPokemonData[i].name}" class="pokemon_moves_list"></div>
    `;
  document.getElementById('stats_button').classList.remove('pokemon_info_category_button_ACTIVE'); //!!! AUSLAGERN IN EIGENE FUNKTION???
  generatePokemonMoves(i);
}


function generatePokemonMoves(i) {
  for (let index = 0; index < loadedPokemonData[i].moves.length; index++) {
    document.getElementById(`pokemon_moves_list_${loadedPokemonData[i].name}`).innerHTML += `
      <div> ${upperCase(loadedPokemonData[i].moves[index].move.name)}, </div>
    `;
  }
}


function filterFlavorTextByLanguage(i) {
  for (let index = 0; index < loadedPokemonDescription[i].flavor_text_entries.length; index++) {
    checkIfArrayIsEmpty(i, index);
  }
}


function checkIfArrayIsEmpty(i, index) {
  if (!loadedPokemonDescription.length) {
    checkLanguage(i, index);
  }
  checkLanguage(i, index);
}


function checkLanguage(i, index) {
  if (loadedPokemonDescription[i].flavor_text_entries[index].language.name === "en") {
    checkIfStingIsIncluded(i, index);
  }
}


function checkIfStingIsIncluded(i, index) {
  if (currentPokemonFlavorText.includes(loadedPokemonDescription[i].flavor_text_entries[index].flavor_text) == false) {
    pushInCurrentFlavorDescription(i, index);
  }
}


function pushInCurrentFlavorDescription(i, index) {
  currentPokemonFlavorText.push(loadedPokemonDescription[i].flavor_text_entries[index].flavor_text);
}


function loadAbout(i) {
  document.getElementById(`info_content_container_${loadedPokemonData[i].name}`).innerHTML = '';
  document.getElementById(`info_content_container_${loadedPokemonData[i].name}`).innerHTML += categoryAboutTemplateHTML(i);
  document.getElementById(`about_${loadedPokemonData[i].name}`).innerHTML += aboutTemplateHTML(i);
  loadPokemonAbilities(i);
  loadPokemonFlavorText(i);
  loadPokemonStats(i);
}


function loadPokemonAbilities(i) {
  for (let index = 0; index < loadedPokemonData[i].abilities.length; index++) {
    document.getElementById(`abilities_${loadedPokemonData[i].name}`).innerHTML += pokemonAbilitiesTemplateHTML(i, index);
  }
}


function loadPokemonFlavorText(i) {
  currentPokemonFlavorText = [];
  filterFlavorTextByLanguage(i);
  document.getElementById(`text_${loadedPokemonDescription[i].name}`).innerHTML += `
  <div>${currentPokemonFlavorText[getRandomIndexofArray()]}</div>
  `;
}


function getRandomIndexofArray() {
  let randomIndex = Math.floor(Math.random() * currentPokemonFlavorText.length);
  return randomIndex;
}


function loadPokemonStats(i) {
  document.getElementById(`stats_${loadedPokemonData[i].name}`).innerHTML = '';
  generatePokemonStats(i);
}


function generatePokemonStats(i) {
  pokemonStatsTemplateHTML(i);
}


function loadPokemonInfoCardHeader(i) {
  generatePokemonInfoCardHeader(i)
  for (let index = 0; index < loadedPokemonData[i].types.length; index++) {
    let pokemonType = loadedPokemonData[i].types[index].type.name;
    let capitalizedType = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
    pokemonInfoCardHeaderTypesTemplateHTML(i, index, capitalizedType);
  }
}


function generatePokemonInfoCardHeader(i, index, capitalizedType) {
  pokemonInfoCardHeaderTemplateHTML(i, index, capitalizedType);
}


function closePokemonInfos() {
  document.getElementById('pokemon_info_container').classList.add("display_none");
}


function scrollEvent() {
  let timeOut;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= document.getElementById('content_container').scrollHeight - window.innerHeight) {
      clearTimeout(timeOut);
      timeOut = setTimeout(loadMorePokemons, 4000);
    }

  });
}


function loadMorePokemons() {
  // loadingAnimation();
  loadPokemonThumbnail();
}


function loadingAnimation() {
  document.getElementById(`load_more_button_container`).innerHTML += `
  <div id="load_more_button">loading ...</div>
  `
}


/// SEARCH

function searchPokemon() {
  event.preventDefault();
  document.getElementById('content_container').innerHTML = '';
  let searchInput = document.getElementById('searchbar').value.toLowerCase();
  // loadedPokemonData.filter(checkSearchInput(searchInput));
  console.log(searchInput);
}


function checkSearchInput(searchInput) {
  return loadedPokemonData.contain(searchInput);
}


async function getSearchedPokemonData(index) {
  await getPokemonData(index);
  await getPokemonDescription();
}


function loadSearchedPokemonThumbnail() {
  document.getElementById('content_container').innerHTML = '';
  for (let i = 0; i < loadedPokemonData.length; i++) {
    generatePokemonThumbnail(i);
    generatePokemonType(i);
  }
}

///

async function loadPokemonEvolutionChain(i) {

  if (loadedPokemonEvolutionChain[i].chain.evolves_to.length == 0) {
    document.getElementById(`info_content_container_${loadedPokemonData[i].name}`).innerHTML += await evolutionChainIsOneTemplateHTML(i);
  }

  if (typeof loadedPokemonEvolutionChain[i].chain.evolves_to !== 'undefined' && Array.isArray(loadedPokemonEvolutionChain[i].chain.evolves_to) && loadedPokemonEvolutionChain[i].chain.evolves_to.length > 0) {
    document.getElementById(`info_content_container_${loadedPokemonData[i].name}`).innerHTML += await evolutionChainIsTwoTemplateHTML(i);
  }

  if (typeof loadedPokemonEvolutionChain[i].chain.evolves_to[0].evolves_to !== 'undefined' && Array.isArray(loadedPokemonEvolutionChain[i].chain.evolves_to[0].evolves_to) && loadedPokemonEvolutionChain[i].chain.evolves_to[0].evolves_to.length > 0) {
    document.getElementById(`info_content_container_${loadedPokemonData[i].name}`).innerHTML += await evolutionChainIsThreeTemplateHTML(i);
  }
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


function loadPokemonImage(pokemonName) {
  return checkForPokemonImage(pokemonName);
}


async function checkForPokemonImage(pokemonName) {
  let imageSrc;
  let check;
  for (let index = 0; index < loadedPokemonData.length; index++) {
    if (loadedPokemonData[index].name === pokemonName) {
      imageSrc = loadedPokemonData[getPokemonIdByName(pokemonName)].sprites.other.home.front_default;
      check = true;
    }
  }
  if (check === true) {
    return loadedPokemonData[getPokemonIdByName(pokemonName, imageSrc)].sprites.other.home.front_default;
  }
  else {
    return await fetchPokemonImage(pokemonName);
  }
}


async function fetchPokemonImage(pokemonName, imageSrc) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
  let responseAsJson = await response.json();
  imageSrc = responseAsJson.sprites;
  return ceckImageSrc(imageSrc);
}


function ceckImageSrc(imageSrc) {
  if (imageSrc.other.home.front_default == null) {
    return imageSrc.other["official-artwork"].front_default;
  }
  else {
    return imageSrc.other.home.front_default;
  }
}