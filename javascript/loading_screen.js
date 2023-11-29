let scrolled = false;


function loadMorePokemons() {
    loadMorePokemonThumbnail();
}


function scrollEvent() {
    window.addEventListener("scroll", scrollWhenOnBottom);
}


function scrollWhenOnBottom() {
    if (window.scrollY >= document.getElementById('content_container').scrollHeight - window.innerHeight) {
        if (!scrolled) {
            scrolled = true;
            setTimeout(loadMorePokemons(), 1000);
        }
    }
}


function enableBodyScrolling() {
    document.body.classList.remove('stopp_scrolling');
}


function disableBodyScrolling() {
    document.body.classList.add('stopp_scrolling');
}


function loadingAnimation() {
    emptyLoadingContainer();
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