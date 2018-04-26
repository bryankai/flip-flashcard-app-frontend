(function() {
  'use strict';
  const deckId = parseInt(window.location.search.slice(8))
  let id

  // authe gate
  request('/auth/token')
    .then(response => {
      id = response.data.id
    })
    .catch(error => {
      window.location = '/index.html'
    })

    // load deck information
    .then(function() {
      console.log(id)
      console.log(deckId)
      return request(`/users/${id}/decks/${deckId}/cards`, 'get')
    })
    .then(response => {
      console.log(response.data)
      const { data } = response.data
      return response.data
    })

  // EVENT LISTENERS
  document.getElementById('next').addEventListener('click', function(event){
    console.log('next')
  })

  document.getElementById('back').addEventListener('click', function(event){
    console.log('back')
  })

  document.getElementById('correct').addEventListener('click', function(event){
    console.log('correct')
  })

  document.getElementById('incorrect').addEventListener('click', function(event){
    console.log('incorrect')
  })

  document.querySelector('.flashcard').addEventListener('click', function(event){
    console.log('flip!')
  })

})();
