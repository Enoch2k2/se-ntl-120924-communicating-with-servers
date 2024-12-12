let characters = [];


// function fetchCharacters() {
//   console.log('a')
//   fetch('https://swapi.dev/api/people/')
//     .then(resp => {
//       console.log('b')
//       return resp.json()
//     })
//     .then(data => {
//       console.log('c')
//       displayCharacters(data)
//     })
  
//   console.log('d')
// }

fetchCharacters()

async function fetchCharacters() {
  let resp = await fetch('https://swapi.dev/api/people/')
  let data = await resp.json()
  characters = characters.concat(data.results)
  while(data.next) {
    resp = await fetch(data.next)
    data = await resp.json()
    characters = characters.concat(data.results)
  }
  displayCharacters()
}

function displayCharacters() {
  
  characters.forEach(displayCharacter)
}

function displayCharacter(character, index) {
  const ul = document.querySelector('#characters ul')
  const li = document.createElement('li')
  li.innerText = `${index + 1}. ${character.name} born in year ${character.birth_year}`
  ul.appendChild(li)
}