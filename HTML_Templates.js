function thumbnailTemplateHTML(i) {
document.getElementById('content_container').innerHTML += `
  <div onclick="showPokemonInfos(${i})" class="pokemon_card pokemon_type_${currentPokemonData.types[0].type.name}_bgr" id="pokemon_id_${loadedPokemonData[i].id}">
  <div class="pokemon_card_info">
    <h5>#${createIdDigit(i)}</h5>
    <h4>${upperCasePokemonName(i)}</h4>
    <div class="pokemon_card_types" id="pokemon_card_types_${currentPokemonData.id}">
    </div>
  </div>
  <img id="pokemon_png" class="pokemon_png pokemon_png_margin" src="${currentPokemonData.sprites.other.home.front_shiny}">
  </div>
  `;
}


function pokemonTypeTemplateHTML(i, index, capitalizedType) {
  document.getElementById(`pokemon_card_types_${loadedPokemonData[i].id}`).innerHTML += `
  <div id="${loadedPokemonData[i].types[index].type.name}" class="pokemon_card_type ${loadedPokemonData[i].types[index].type.name}">${capitalizedType}</div>
  `;
}