// Poke API
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
 
async function requestPokeInfo(url, name) {
  await fetch(url + name)
  .then(response => response.json())
  .then(data => {
    pokemon = data
  })
  .catch(err => console.log(err))
}

const getElement = document.querySelector.bind(document),
	searchInput = getElement('.search-input'),
	searchButton = getElement('.search-button'),
	container = getElement('.pokemon'),
	erroMessage = getElement('.error')

let pokeName, 
	pokemon,
	card

function createCard() {
  card = `
    <div class="card">
      <img src="${pokemon.sprites.front_default}" class="card-img-top img-fluid border mt-2" alt="Sprite of ${pokemon.name}">
      <div class="card-body text-center">
        <h5 class="card-title title">${pokemon.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Nº ${pokemon.id} - Type: ${pokemon.types.map(item => item.type.name).toString()}</h6>
        <p class="card-text">${pokemon.moves.map(item => ' ' + item.move.name).toString()}</p>
        <p class="card-text">Height: ${pokemon.height  / 10}m</p>
        <p class="card-text">Weight: ${pokemon.weight  / 10}kg</p>
        <a href="#" class="btn btn-primary button-eletric d-block mt-2">Mais...</a>
      </div>
    </div>`
  return card
}

async function startApp(pokeName) {
  await requestPokeInfo(baseUrl, pokeName);
    if(pokemon.detail) {
      erroMessage.style.display = 'block';
      container.style.display = 'none';
    }else{
      erroMessage.style.display = 'none';
      container.style.display = 'flex';
      container.innerHTML = createCard();
    }
}

// Add Events --------------------------------------------
searchButton.addEventListener('click', event => {
  event.preventDefault()
  pokeName = searchInput.value.toLowerCase()
  searchInput.value = ''
  startApp(pokeName)
})