// LOAD POKEMON_INFOCARD
function loadPokemonInfoCard(i) {
    disableBodyScrolling();
    document.getElementById('pokemon_info_container').innerHTML = '',
    removeDisplayNoneClass();
    document.getElementById('pokemon_info_container').innerHTML += pokemonInfoCardTemplateHTML(i);
    loadPokemonInfoCardHeader(i);
    setButtonActive(id = 'about_button');
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
    document.getElementById('evolution_button').classList.add('pokemon_info_category_button_ACTIVE');
    document.getElementById('moves_button').classList.remove('pokemon_info_category_button_ACTIVE');
    document.getElementById('about_button').classList.remove('pokemon_info_category_button_ACTIVE');
}


function generatePokemonEvolutionChain(i) {
    document.getElementById(`info_content_container_${loadedPokemonData[i].name}`).innerHTML = '';
    loadPokemonEvolutionChain(i);
}


function loadPokemonMoves(i) {
    document.getElementById(`info_content_container_${loadedPokemonData[i].name}`).innerHTML = '';
    document.getElementById(`info_content_container_${loadedPokemonData[i].name}`).innerHTML = pokemonMovesListTemplateHTML(i);
    document.getElementById('about_button').classList.remove('pokemon_info_category_button_ACTIVE');
    document.getElementById('evolution_button').classList.remove('pokemon_info_category_button_ACTIVE');
    document.getElementById('moves_button').classList.add('pokemon_info_category_button_ACTIVE');
    generatePokemonMoves(i);
}


function generatePokemonMoves(i) {
    for (let index = 0; index < loadedPokemonData[i].moves.length; index++) {
        document.getElementById(`pokemon_moves_list_${loadedPokemonData[i].name}`).innerHTML += pokemonMovesTemplateHTML(i, index);
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
    document.getElementById('about_button').classList.add('pokemon_info_category_button_ACTIVE');
    document.getElementById('moves_button').classList.remove('pokemon_info_category_button_ACTIVE');
    document.getElementById('evolution_button').classList.remove('pokemon_info_category_button_ACTIVE');
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
    enableBodyScrolling();
}


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


function ceckImageSrc(imageSrc) {
    if (imageSrc.other.home.front_default == null) {
        return imageSrc.other["official-artwork"].front_default;
    }
    else {
        return imageSrc.other.home.front_default;
    }
}