document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("boton-buscar-pokemon")//buscador
    .addEventListener("click", async (e) => {
      e.preventDefault();

      let pokemonURL = document.getElementById("buscador-pokemon").value;

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


      // PRIMERA PROMISE

      // nombre y número de la pokédex
      document.getElementById(
        "nombre"
      ).innerHTML = `${pokemon.forms[0].name.toUpperCase()} #${pokemon.id}`;


      // imagenes
      document.getElementById("imagen").src =
        pokemon.sprites.other["official-artwork"].front_default;

      document.getElementById("shiny").src =
        pokemon.sprites.other["official-artwork"].front_shiny;


      //stats
      const stats = document.getElementById("stats");
      stats.innerHTML = "";
      pokemon.stats.forEach((stat) => {
        const valor = stat.base_stat;
        const nombreStat = stat.stat.name;
        stats.innerHTML += `<li>${nombreStat.toUpperCase()}: ${valor}</li>`;
      });

      // sonido
      document.getElementById("grito").src = pokemon.cries.latest;

      // SEGUNDA PROMISE

      // color de fondo segun el color del pokémon
      document.getElementById("nombre").style.backgroundColor =
        pokemonSpecies.color.name;

      //descripción en español del pokémon 
      const descripcion = pokemonSpecies.flavor_text_entries.find(
        (elemento) => {
          return elemento.language.name == "es"; // buscar la descripción en español
        }
      );

      document.getElementById("descripcion").innerHTML =
        descripcion.flavor_text;
    });
});
