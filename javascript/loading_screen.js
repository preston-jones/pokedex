//// Loaading Screen
async function loadMorePokemons() {
    disableBodyScrolling();
    loadingAnimation();
    await loadPokemonThumbnail();
    hideLoadingContainer();
    hideLoadingContainer();
    emptyLoadingContainer();
    enableBodyScrolling();
}


function scrollEvent() {
    let timeOut;
    window.addEventListener("scroll", function () {
        if (window.scrollY >= document.getElementById('content_container').scrollHeight - window.innerHeight) {
            clearTimeout(timeOut);
            timeOut = setTimeout(loadMorePokemons, 500);
        }

    });
}


function enableBodyScrolling() {
    document.body.classList.remove('stopp_scrolling');
}


function disableBodyScrolling() {
    document.body.classList.add('stopp_scrolling');
}


function loadingAnimation() {
    showLoadingContainer();
    document.getElementById(`loading_container`).innerHTML += loadingAnimationTemplateHTML();
}


function showLoadingContainer() {
    document.getElementById(`loading_container`).classList.remove('display_none');
}


function hideLoadingContainer() {
    document.getElementById(`loading_container`).classList.add('display_none');
}


function emptyLoadingContainer() {
    document.getElementById(`loading_container`).innerHTML = '';
}


function generateLoadedPokemonCounter(i) {
    document.getElementById('loaded_pokemon_counter').innerHTML = pokemonCounterTemplateHTML(i);
}