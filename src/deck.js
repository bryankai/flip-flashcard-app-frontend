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
      const {
        data
      } = response.data
      data.forEach(dbCard => {
        console.log('forEach')
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
        const frontLink = document.createElement('a')
        frontLink.href = "deck.html"
        const frontText = document.createElement('div')
        frontText.classList.add('frontText')
        frontText.innerHTML = dbCard.bibleReference
        flipper.appendChild(front)
        front.appendChild(frontLink)
        front.appendChild(frontText)

        const back = document.createElement('div')
        back.classList.add('back')
        const backLink = document.createElement('a')
        backLink.href = "deck.html"
        const backText = document.createElement('div')
        backText.classList.add('backText')
        backText.innerHTML = dbCard.passage
        flipper.appendChild(back)
        back.appendChild(backLink)
        back.appendChild(backText)
      })
      return response.data
    })


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
