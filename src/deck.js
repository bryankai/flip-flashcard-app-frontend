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
    // load user name
    .then(function() {
      return request(`/users/${id}`, 'get')
    })
    .then(response => {
      name = response.data.data.name
      document.getElementById('userName').innerHTML = name
    })
    // load deck information
    .then(function() {
      return request(`/users/${id}/decks/${deckId}/cards`, 'get')
    })
    .then(response => {
      const { data } = response.data
      data.forEach(dbCard => {
        const cardGrid = document.querySelector('.cards-grid')
        const card = document.createElement('div')
        card.classList.add('flip-container','card', 'border-light', 'mb-3')
        card.addEventListener('mouseenter', event => {
          event.target.classList.toggle('flip')
        })
        card.addEventListener('mouseleave', event => {
          event.target.classList.toggle('flip')
        })
        cardGrid.appendChild(card)

        const flipper = document.createElement('div')
        flipper.classList.add('flipper')
        card.appendChild(flipper)

        const front = document.createElement('div')
        front.classList.add('front')
        const frontText = document.createElement('div')
        frontText.classList.add('frontText')
        frontText.innerHTML = dbCard.bibleReference
        flipper.appendChild(front)
        front.appendChild(frontText)

        const back = document.createElement('div')
        back.classList.add('back')
        const backText = document.createElement('div')
        backText.classList.add('backText')
        backText.innerHTML = dbCard.passage
        flipper.appendChild(back)
        back.appendChild(backText)
      })
      return getUserScore(id)
    })
    .then(userScore => {
      document.getElementById('userScore').innerHTML=userScore
    });


  // Modal Form Event
  document.querySelector('.form-create-card').addEventListener('submit', function(event){
    event.preventDefault()
    const bibleReference = event.target.bibleReference.value
    const passage = event.target.passage.value
    request(`/users//${id}/decks/${deckId}/cards`, 'post', { decks_id: deckId, deckId, bibleReference , passage })
    window.location = `/deck.html?deckId=${deckId}`
  })

  // Quiz Button
  document.getElementById('quiz').addEventListener('click', function(event){
    window.location = `/quiz.html?deckId=${deckId}`
  })

})();
