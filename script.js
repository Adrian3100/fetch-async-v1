async function searchPokemon() {
  const input = document
    .getElementById("pokemonInput")
    .value.trim()
    .toLowerCase();
  const spinner = document.getElementById("spinner");
  const cardContainer = document.getElementById("pokemonCard");
  const errorDiv = document.getElementById("error");

  cardContainer.innerHTML = "";
  errorDiv.classList.add("d-none");
  spinner.style.display = "block";

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${input}`
    );
    const data = response.data;

    const types = data.types.map((t) => t.type.name).join(", ");
    const image = data.sprites.other["official-artwork"].front_default;

    const cardHTML = `
<div class="card text-dark" style="width: 20rem;">
<img src="${image}" class="card-img-top" alt="${data.name}">
<div class="card-body">
<h5 class="card-title text-center">${capitalize(data.name)} (ID: ${
      data.id
    })</h5>
<p class="card-text">Height: ${data.height}</p>
<p class="card-text">Weight: ${data.weight}</p>
<p class="card-text">Type(s): ${types}</p>
</div>
</div>
`;

    cardContainer.innerHTML = cardHTML;
  } catch (error) {
    errorDiv.textContent =
      "Pokémon not found. Please check the name or ID and try again.";
    errorDiv.classList.remove("d-none");
  } finally {
    spinner.style.display = "none";
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
