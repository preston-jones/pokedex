function thumbnailTemplateHTML(i) {
  document.getElementById('content_container').innerHTML += `
  <div onclick="loadPokemonInfos(${i})" class="pokemon_card thumbnail_bgr_${currentPokemonData.types[0].type.name}" id="pokemon_id_${loadedPokemonData[i].id}">
  <div class="pokemon_card_info">
    <h4>#${createIdDigit(i)}</h4>
    <h3>${upperCasePokemonName(i)}</h3>
    <div class="pokemon_card_types" id="pokemon_card_types_${currentPokemonData.id}">
    </div>
  </div>
  <img id="pokemon_png" class="pokemon_png pokemon_png_margin" src="${currentPokemonData.sprites.other.home.front_shiny}">
  </div>
  `;
}


function pokemonTypeTemplateHTML(i, index, capitalizedType) {
  document.getElementById(`pokemon_card_types_${loadedPokemonData[i].id}`).innerHTML += `
  <div id="${loadedPokemonData[i].types[index].type.name}" class="pokemon_type_icon ${loadedPokemonData[i].types[index].type.name}_icon_color">${capitalizedType}</div>
  `;
}


function pokemonCounterTemplateHTML(i) {
  document.getElementById('loaded_pokemon_counter').innerHTML = `
  Pokemon Data Loaded: ${i + 1}/${numberOfAllPokemon}<div class="cursor">_</div>`;
}


function PokemonInfosTemplateHTML(i) {
  document.getElementById('pokemon_info_container').innerHTML += `
  <div class="pokemon_info_card" onclick="event.stopPropagation()">
  <div class="pokemon_info_header pokemon_type_${loadedPokemonData[i].types[0].type.name}_bgr">
    <div onclick="closePokemonInfos()">
    <div class="close_button"><</div>
    </div>
    <div class="pokemon_info_header_headline_container">
      <div class="pokemon_info_header_headline">
        <div class="pokemon_info_name"><h2>${upperCasePokemonName(i)}</h2><div class="cursor"><h2>_</h2></div></div>
        <div class="pokemon_card_types" id="pokemon_info_types_${loadedPokemonData[i].id}"></div>
      </div>
      <div class="pokemon_info_id">#${createIdDigit(i)}</div>
    </div>
    <div class="pokemon_info_png_container">
      <img class="pokemon_png_info_size" src="${loadedPokemonData[i].sprites.front_default}">
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
}


function pokemonStatsTemplateHTML(i) {
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


function pokemonTypeForInfoTemplateHTML(i, index, capitalizedType) {
  document.getElementById(`pokemon_info_types_${loadedPokemonData[i].id}`).innerHTML += `
  <div id="${loadedPokemonData[i].types[index].type.name}" class="pokemon_card_types pokemon_type_icon ${loadedPokemonData[i].types[index].type.name}_icon_color">${capitalizedType}</div >
    `;
}