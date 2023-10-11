
let currentPokemonFlavorText = [];
let loadedPokemonData = [];
let loadedPokemonDescription = [];
let numberOfNextLoadingPokemon = 20; // first load 20 Pokemon
let numberOfLoadedPokemon = 0;
let listOfAllPokemon = [];
let currentPokemonData;
let currentPokemonDescription;
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
  currentPokemonData = await response.json();
  pushIntoLoadedPokemonData(currentPokemonData);
}


function pushIntoLoadedPokemonData(currentPokemonData) {
  loadedPokemonData.push(currentPokemonData);
}


async function getPokemonDescription() {
  let url = `https://pokeapi.co/api/v2/pokemon-species/${currentPokemonData.id}`;
  let response = await fetch(url);
  console.log(response);
  currentPokemonDescription = await response.json();
  pushIntoLoadedPokemonDescription(currentPokemonDescription);
}


function pushIntoLoadedPokemonDescription(currentPokemonDescription) {
  loadedPokemonDescription.push(currentPokemonDescription);
}


async function loadPokemonThumbnail() {
  let loadingCounter = numberOfLoadedPokemon + numberOfNextLoadingPokemon;
  for (let i = numberOfLoadedPokemon; i < loadingCounter; i++) {
    await getPokemonData(i);
    await getPokemonDescription();
    generatePokemonThumbnail(i);
    generatePokemonType(i);
    console.log(`Pokemon Loaded ${i}/${numberOfAllPokemon}`);
    document.getElementById('loaded_pokemon_counter').innerHTML = `
      Pokemon Data Loaded ${i + 1}/${numberOfAllPokemon}
      `;
  }
  numberOfLoadedPokemon = loadingCounter;
  // numberOfNextLoadingPokemon = 20; // number of Pokemon loading when scrolling
}


function generatePokemonThumbnail(i) {
  thumbnailTemplateHTML(i);
}


function generatePokemonType(i) {
  for (let index = 0; index < loadedPokemonData[i].types.length; index++) {
    let pokemonType = loadedPokemonData[i].types[index].type.name;
    let capitalizedType = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
    pokemonTypeTemplateHTML(i, index, capitalizedType);
  }
}


function createIdDigit(i) {
  let digit;
  if (loadedPokemonData[i].id < 10) { digit = `00${loadedPokemonData[i].id}`; }
  if (loadedPokemonData[i].id >= 10 && loadedPokemonData[i].id < 100) { digit = `0${loadedPokemonData[i].id}`; }
  if (loadedPokemonData[i].id >= 100) { digit = `${loadedPokemonData[i].id}`; }

  return digit;
}


function upperCasePokemonName(i) {
  let pokemonName = loadedPokemonData[i].name;
  let capitalizedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
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


// -- Pokemon Infos von angeklicktem Abrufen und speichern -- //
function showPokemonInfos(i) {
  removeDisplayNoneClass();
  document.getElementById('pokemon_info_container').innerHTML = '';
  document.getElementById('pokemon_info_container').innerHTML += `
  <div class="pokemon_info_card" onclick="event.stopPropagation()">
  <div class="pokemon_info_header pokemon_type_${loadedPokemonData[i].types[0].type.name}_bgr">
    <div onclick="closePokemonInfos()">
    <img class="close_button" src="img/chevron-left-solid.svg">
    </div>
    <div class="pokemon_info_header_headline_container">
      <div class="pokemon_info_header_headline">
        <div class="pokemon_info_name"><h2>${upperCasePokemonName(i)}</h2></div>
        <div class="pokemon_card_types" id="pokemon_info_types_${loadedPokemonData[i].id}"></div>
      </div>
      <div class="pokemon_info_id">#${createIdDigit(i)}</div>
    </div>
    <div class="pokemon_info_png_container">
      <img class="pokemon_png_info_size" src="${loadedPokemonData[i].sprites.other.home.front_shiny}">
    </div>
    </div>
    <div class="pokemon_info">
      <div class="pokemon_info_category_buttons_container">
      <div class="pokemon_info_category_button" id="stats_button" onclick="loadAbout(${i})">ABOUT</div>
      <div class="pokemon_info_category_button" id="evolution_button" onclick="loadPokemonEvolution(${i})">EVOLUTION</div>
      <div class="pokemon_info_category_button" id="moves_button" onclick="loadPokemonMoves(${i})">MOVES</div>
    </div>
    <div class="pokemon_infos" id="infos_${loadedPokemonData[i].name}"></div>
  </div>
  </div>
    `;
  setButtonActive(id = 'stats_button');
  getCurrentPokemonTypeForInfo(i);
  loadPokemonStats(i);
  loadPokemonFlavorText(i);
}


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
  document.getElementById(`infos_${loadedPokemonData[i].name}`).innerHTML = '';
  document.getElementById(`infos_${loadedPokemonData[i].name}`).innerHTML += `
    <div>Evolution</div>
    `;
  document.getElementById('stats_button').classList.remove('pokemon_info_category_button_ACTIVE'); //!!! AUSLAGERN IN EIGENE FUNKTION???
}


function loadPokemonMoves(i) {
  document.getElementById(`infos_${loadedPokemonData[i].name}`).innerHTML = '';
  document.getElementById(`infos_${loadedPokemonData[i].name}`).innerHTML += `
    <div>Moves</div>
    `;
  document.getElementById('stats_button').classList.remove('pokemon_info_category_button_ACTIVE'); //!!! AUSLAGERN IN EIGENE FUNKTION???
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


function pushInCurrentFlavorDescription(i, index) {
  currentPokemonFlavorText.push(loadedPokemonDescription[i].flavor_text_entries[index].flavor_text);
}


function checkIfStingIsIncluded(i, index) {
  if (currentPokemonFlavorText.includes(loadedPokemonDescription[i].flavor_text_entries[index].flavor_text) == false) {
    pushInCurrentFlavorDescription(i, index);
  }
}


function loadAbout(i) {
  loadPokemonStats(i);
  loadPokemonFlavorText(i);
}


function loadPokemonFlavorText(i) {
  currentPokemonFlavorText = [];
  filterFlavorTextByLanguage(i);
  document.getElementById(`text_${loadedPokemonDescription[i].name}`).innerHTML += `
  <div>${currentPokemonFlavorText[getRandomIndexofArray()]}</div>
  `;
}


// What if Random Numbers are the same???
function getRandomIndexofArray() {
  let randomIndex = Math.floor(Math.random() * currentPokemonFlavorText.length);
  return randomIndex;
}


function loadPokemonStats(i) {
  document.getElementById(`infos_${loadedPokemonData[i].name}`).innerHTML = '';
  document.getElementById(`infos_${loadedPokemonData[i].name}`).innerHTML += `
  <div class="pokemon_info_text" id="text_${loadedPokemonData[i].name}"></div>
    <div class="pokemon_info_stats" id="stats_${loadedPokemonData[i].name}">
    </div>`;
  let currentPokemonStats = loadedPokemonData[i].stats;
  let currentStatName;
  for (let index = 0; index < loadedPokemonData[i].stats.length; index++) {
    currentStatName = currentPokemonStats[index].stat.name;
    document.getElementById(`stats_${loadedPokemonData[i].name}`).innerHTML += `
    <div class="stats_row">
    <div class="stats_name">${upperCasePokemonStat(currentStatName)}</div>
    <div class="stats_value">${currentPokemonStats[index].base_stat}</div>
    <div class="stat_bar_container"><div class="stat_bar" style="max-width: ${currentPokemonStats[index].base_stat}%"></div></div>
    </div>
    `;
  }
}


function getCurrentPokemonTypeForInfo(i) {
  for (let index = 0; index < loadedPokemonData[i].types.length; index++) {
    let pokemonType = loadedPokemonData[i].types[index].type.name;
    let capitalizedType = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
    document.getElementById(`pokemon_info_types_${loadedPokemonData[i].id}`).innerHTML += `
    <div id="${loadedPokemonData[i].types[index].type.name}" class="pokemon_card_type ${loadedPokemonData[i].types[index].type.name}">${capitalizedType}</div >
      `;
  }
}


function closePokemonInfos() {
  document.getElementById('pokemon_info_container').classList.add("display_none");
}


function scrollEvent() {
  let timeOut;

  window.addEventListener("scroll", function () {
    if (window.scrollY >= document.getElementById('content_container').scrollHeight - window.innerHeight) {
      clearTimeout(timeOut);
      timeOut = setTimeout(loadMorePokemons, 1000);
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

async function searchPokemon() {
  clearArrays();
  let searchInput = document.getElementById('searchbar').value.toLowerCase();
  for (let index = 0; index < listOfAllPokemon.length; index++) {
    if (listOfAllPokemon[index].name.includes(searchInput)) {
      console.log(`${listOfAllPokemon[index].name},${listOfAllPokemon[index].url}  gefunden`);
      await getSearchedPokemonData(index);
    }
  }
  console.log(loadedPokemonData.length);
  loadSearchedPokemonThumbnail();
}


function clearArrays() {
  currentPokemonFlavorText = [];
  loadedPokemonData = [];
  loadedPokemonDescription = [];
  currentPokemonData = '';
  currentPokemonDescription = '';
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