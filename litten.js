document.addEventListener("DOMContentLoaded", async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const pokemonURL = urlParams.get("pokemon");
  let pokemon;
  let pokemonSpecies;

  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonURL}`)
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((pokemonCopy) => {
      pokemon = pokemonCopy;
    })
    .catch((error) => {
      console.error("hubo un problema recuperando la lista de posts ", {
        error,
      });
    });

  await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonURL}`)
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((pokemonSpeciesCopy) => {
      pokemonSpecies = pokemonSpeciesCopy;
    });

  document.getElementById(
    "nombre"
  ).innerHTML = `${pokemon.forms[0].name.toUpperCase()} #${pokemon.id}`;

  document.getElementById("imagen").src =
    pokemon.sprites.other["official-artwork"].front_default;

  pokemon.stats.forEach((stat) => {
    const valor = stat.base_stat;
    const nombreStat = stat.stat.name;
    document.getElementById(
      "stats"
    ).innerHTML += `<li>${nombreStat.toUpperCase()}: ${valor}</li>`;
  });

  document.getElementById("grito").src = pokemon.cries.latest;

  document.getElementById("nombre").style.backgroundColor =
    pokemonSpecies.color.name;

  const descripcion = pokemonSpecies.flavor_text_entries.find((elemento) => {
    return elemento.language.name == "es";
  });

  document.getElementById("descripcion").innerHTML = descripcion.flavor_text;

  
});
