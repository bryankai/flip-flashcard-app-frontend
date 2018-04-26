(function() {
  'use strict';
  const deckId = parseInt(window.location.search.slice(8))
  let id
  let currentIndex = 0
  // authe gate
  request('/auth/token')
    .then(response => {
      id = response.data.id
    })
    .catch(error => {
      window.location = '/index.html'
    })

    // Load Quiz Page
    .then(function() {
      console.log(id)
      console.log(deckId)
      return request(`/users/${id}/decks/${deckId}/cards`, 'get')
    })
    .then(response => {
      console.log(response.data)
      const { data } = response.data
      console.log(data)
      console.log('data')

      // Initializing
      const randomOrderArr = createRandomDeckOrder(data)
      newQuiz(id, deckId, randomOrderArr)
      return data
    })

  document.getElementById('next').addEventListener('click', function(event){
    nextCard()
  })

  // next card aka RENDER
  function nextCard() {
    currentIndex++
    console.log(currentIndex)
  }

})();
