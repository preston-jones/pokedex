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