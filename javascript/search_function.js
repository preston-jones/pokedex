/// SEARCH
let filteredPokemon;


async function loadSearchresult() {
    isSearchOn = true;
    loadingAnimation();
    disableBodyScrolling();
    removeScrollEvent();
    filterPokemonByName();
    emptyAllPokemonArrays();
    await searchResult();
    clearSearchbar();
    enableBodyScrolling();
    hideLoadingContainer();
    emptyLoadingContainer();
    enableBodyScrolling();
}


function filterPokemonByName() {
    let inputValue = document.getElementById('searchbar').value.toLowerCase();
    filteredPokemon = listOfAllPokemon.filter(function (pokemon) {
        return pokemon.name.toLowerCase().includes(inputValue);
    });
    document.getElementById('content_container').innerHTML = '';
    pokemonCounter = filteredPokemon.length;
}


function clearSearchbar() {
    document.getElementById('searchbar').value = '';
}


function emptyAllPokemonArrays() {
    loadedPokemonData = [];
    loadedPokemonDescription = [];
    loadedPokemonEvolutionChain = [];
}


function removeScrollEvent() {
    window.removeEventListener("scroll", scrollWhenOnBottom);
}


async function searchResult() {
    if (filteredPokemon.length > 0) {
        for (let i = 0; i < filteredPokemon.length; i++) {
            await getPokemonData(i, filteredPokemon);
            await getPokemonDescription(i);
            await getPokemonEvolutinChain(i);
            generatePokemonThumbnail(i);
            generatePokemonThumbnailType(i);
            generateLoadedPokemonCounter(i);
        }
        document.getElementById('back_button_container').innerHTML = '';
        document.getElementById('back_button_container').innerHTML += backButtonTemplateHTML();
    }
    else {
        document.getElementById('back_button_container').innerHTML = '';
        document.getElementById('back_button_container').innerHTML += failedSearchTemplateHTML();
    }
}


function addMarginTop() {
    document.getElementById('content_container').classList.toggle('margin_top');
}