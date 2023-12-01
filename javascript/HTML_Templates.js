function thumbnailTemplateHTML(i) {
  return `
  <div onclick="loadPokemonInfoCard(${i})" class="pokemon_card thumbnail_bgr_${loadedPokemonData[i].types[0].type.name}" id="pokemon_id_${loadedPokemonData[i].id}">
  <div class="pokemon_card_info">
    <div>
      <h4>#${createIdDigit(i)}</h4>
      <h3>${upperCase(loadedPokemonData[i].name)}</h3>
    </div>
    <div class="pokemon_thumbnail_types" id="pokemon_card_types_${loadedPokemonData[i].id}">
    </div>
  </div>
  <img id="pokemon_png" class="pokemon_png pokemon_png_margin" src="${checkImageSrc(loadedPokemonData[i].sprites)}" alt="No Image Found">
  </div>
  `;
}


function pokemonThumbnailTypeTemplateHTML(i, index, capitalizedType) {
  return `
  <div id="${loadedPokemonData[i].types[index].type.name}" class="pokemon_type_icon ${loadedPokemonData[i].types[index].type.name}_icon_color">${capitalizedType}</div>
  `;
}


function pokemonInfoCardTemplateHTML(i) {
  return `
  <div class="pokemon_infocard" onclick="event.stopPropagation()">
    <div class="pokemon_info_header pokemon_type_${loadedPokemonData[i].types[0].type.name}_bgr" id="pokemon_infocard_header_${loadedPokemonData[i].types[0].type.name}">
    </div>
    <div class="pokemon_info_container">
      <div class="pokemon_info_category_buttons_container">
        <div class="pokemon_info_category_button button_left ${loadedPokemonData[i].types[0].type.name}_icon_color" id="about_button" onclick="loadAbout(${i})">ABOUT</div>
        <div class="pokemon_info_category_button button_middle ${loadedPokemonData[i].types[0].type.name}_icon_color" id="evolution_button" onclick="loadPokemonEvolution(${i})">EVOLUTION</div>
        <div class="pokemon_info_category_button button_right ${loadedPokemonData[i].types[0].type.name}_icon_color" id="moves_button" onclick="loadPokemonMoves(${i})">MOVES</div>
      </div>
      <div class="pokemon_info_content_container" id="info_content_container_${loadedPokemonData[i].name}"></div>
    </div>
  </div>
  `;
}


function categoryAboutTemplateHTML(i) {
  return `
    <div class="pokemon_info_text" id="text_${loadedPokemonData[i].species.name}"></div>
    <div class="about_infos" id="about_${loadedPokemonData[i].name}"></div>
    <div class="pokemon_info_stats" id="stats_${loadedPokemonData[i].name}"></div>
    `;
}


function aboutTemplateHTML(i) {
  return `
    <div class="about_bgr_container"><h4>Species:</h4> ${upperCase(loadedPokemonData[i].species.name)}</div>
    <div class="about_bgr_container"><h4>Height:</h4> ${loadedPokemonData[i].height / 10} m</div>
    <div class="about_bgr_container"><h4>Weight:</h4> ${loadedPokemonData[i].weight / 10} kg</div>
    <div class="about_bgr_container pokemon_info_abilities"><h4>Abilities:</h4>
    <div id="abilities_${loadedPokemonData[i].name}" class="abilities_container"></div>
    </div>
    `;
}


function pokemonAbilitiesTemplateHTML(i, index) {
  return `
    <div>${upperCase(loadedPokemonData[i].abilities[index].ability.name)},</div>
    `;
}


function pokemonMovesListTemplateHTML(i) {
  return `
  <div id="pokemon_moves_list_${loadedPokemonData[i].name}" class="pokemon_moves_list"></div>
`;
}


function pokemonMovesTemplateHTML(i, index) {
  return `
<div class="pokemons_moves_container"> ${upperCase(loadedPokemonData[i].moves[index].move.name)}, </div>
`;
}


function pokemonStatsTemplateHTML(i, index, currentPokemonStats, currentStatName) {
  return `
    <div class="stats_row">
    <h4 class="stats_name">${upperCasePokemonStat(currentStatName)}</h4>
    <div class="stats_value">${currentPokemonStats[index].base_stat}</div>
    <div class="stat_bar_container"><div class="stat_bar ${loadedPokemonData[i].types[0].type.name}_icon_color" style="max-width: ${currentPokemonStats[index].base_stat}%"></div></div>
    </div>
    `;
}


function pokemonInfoCardHeaderTemplateHTML(i) {
  return `
  <div class="close_button_container" onclick="closePokemonInfos()">
          <img class="close_button" src="./icons/xmark.svg">
        </div>
        <div class="pokemon_info_header_headline_container">
          <div class="pokemon_info_header_headline">
            <div class="pokemon_info_name"><h2>${upperCase(loadedPokemonData[i].name)}</h2><div class="cursor"><h2>_</h2></div></div>
            <div class="pokemon_card_types" id="pokemon_info_types_${loadedPokemonData[i].id}">
            </div>
          </div>
          <div class="pokemon_info_id">#${createIdDigit(i)}</div>
        </div>
        <div class="pokemon_info_png_container">
        <div onclick="loadPrevPokemonInfoCard(${i})" class="pokemon_button_icon_container" id="prev_pokemon_button_${i}"><img class="pokemon_button_icon" src="./icons/chevron-left-solid.svg"></div>
          <img class="pokemon_png_info_size" src="${checkImageSrc(loadedPokemonData[i].sprites)}" alt="No Image Found">
          <div onclick="loadNextPokemonInfoCard(${i})" class="pokemon_button_icon_container" id="next_pokemon_button_${i}"><img class="pokemon_button_icon" src="./icons/chevron-right-solid.svg"></div>
        </div>
  `;
}


function pokemonInfoCardHeaderTypesTemplateHTML(i, index, capitalizedType) {
  return `
  <div id="${loadedPokemonData[i].types[index].type.name}" class="pokemon_card_types pokemon_type_icon ${loadedPokemonData[i].types[index].type.name}_icon_color">${capitalizedType}</div >
  `;
}


async function evolutionChainIsOneTemplateHTML(i) {
  return `
<div id="evolution_chain_container_1" class="evolution_chain_row">
<div class="pokemon_evolutin_png_container">
  <img class="pokemon_png_evolution_size" src="${await loadPokemonImage(loadedPokemonEvolutionChain[i].chain.species.name)}" alt="No Image Found">
  <div>${upperCase(loadedPokemonEvolutionChain[i].chain.species.name)}</div>
  <div>>> NO EVOLUTION CHAIN FOUND <<</div>
</div>
</div>
`;
}


async function evolutionChainIsTwoTemplateHTML(i) {
  return `
<div id="evolution_chain_container_1" class="evolution_chain_row">
<div class="pokemon_evolutin_png_container">
  <img class="pokemon_png_evolution_size" src="${await loadPokemonImage(loadedPokemonEvolutionChain[i].chain.species.name)}" alt="No Image Found">
  <div>${upperCase(loadedPokemonEvolutionChain[i].chain.species.name)}</div>
</div>
  <div class="evolution_arrow_container"><img class="arrow_right" src="./icons/arrow-right-solid.svg">
  </div>
<div class="pokemon_evolutin_png_container">
  <img class="pokemon_png_evolution_size" src="${await loadPokemonImage(loadedPokemonEvolutionChain[i].chain.evolves_to[0].species.name)}">
  <div>${upperCase(loadedPokemonEvolutionChain[i].chain.evolves_to[0].species.name)}</div>
</div>
</div>
`;
}


async function evolutionChainIsThreeTemplateHTML(i) {
  return `
<div id="evolution_chain_container_2" class="evolution_chain_row">
<div class="pokemon_evolutin_png_container">
  <img class="pokemon_png_evolution_size" src="${await loadPokemonImage(loadedPokemonEvolutionChain[i].chain.evolves_to[0].species.name)}">
  <div>${upperCase(loadedPokemonEvolutionChain[i].chain.evolves_to[0].species.name)}</div>
</div>
  <div class="evolution_arrow_container"><img class="arrow_right" src="./icons/arrow-right-solid.svg">
  </div>
<div class="pokemon_evolutin_png_container">
  <img class="pokemon_png_evolution_size" src="${await loadPokemonImage(loadedPokemonEvolutionChain[i].chain.evolves_to[0].evolves_to[0].species.name)}" alt="No Image Found">
  <div>${upperCase(loadedPokemonEvolutionChain[i].chain.evolves_to[0].evolves_to[0].species.name)}</div>
</div>
`;
}


function loadingAnimationTemplateHTML() {
  return `
  <img class="loading_img" src="img/pokeball-1594373_640.png">
  <div class="loaded_pokemon_counter_container">
  <div class="loaded_pokemon_counter">Pokemon Data Loading: </div>
  <div id="loaded_pokemon_counter" class="loaded_pokemon_counter"></div>
  </div>
  `;
}


function pokemonCounterTemplateHTML(i) {
  return `
  ${i + 1} / ${pokemonCounter}`;
}


function backButtonTemplateHTML() {
  return `
  <div id="back_button" onclick="window.location.reload()">BACK</div>
  `;
}


function failedSearchTemplateHTML() {
  return `
  <div id="failed_search">
    <div>No Pokemon found</div>
    <div id="back_button" onclick="window.location.reload()">BACK</div>
  </div>
  `;
}