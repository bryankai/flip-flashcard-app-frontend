(function() {
  'use strict';
  let id

  // authe gate
  request('/auth/token')
    .then(response => {
      // user is logged in
      id = response.data.id
      console.log(id)
      document.querySelector('.user-id').innerHTML = id
    })
    .catch(error => {
      // user is not logged in
      console.log(error)
      window.location = '/index.html'
    })

    // load deck information
    .then(function() {
      console.log(id)
      return request(`/users/${id}/decks`, 'get')
    })
    .then(response => {
      console.log(response.data)
      const {
        data
      } = response.data
      data.forEach(dbDeck => {
        console.log('forEach')
        const deckGrid = document.querySelector('.decks-grid')
        const deck = document.createElement('div')
        deck.classList.add('flip-container','card', 'border-light', 'mb-3')
        deck.addEventListener('mouseenter', event => {
          event.target.classList.toggle('hover')
        })
        deck.addEventListener('mouseleave', event => {
          event.target.classList.toggle('hover')
        })
        deckGrid.appendChild(deck)

        const flipper = document.createElement('div')
        flipper.classList.add('flipper')
        deck.appendChild(flipper)

        const front = document.createElement('div')
        front.classList.add('front')
        const frontLink = document.createElement('a')
        frontLink.href = "deck.html"
        const frontText = document.createElement('div')
        frontText.classList.add('frontText')
        frontText.innerHTML = dbDeck.deckName
        flipper.appendChild(front)
        front.appendChild(frontLink)
        front.appendChild(frontText)


        const back = document.createElement('div')
        back.classList.add('back')
        const backLink = document.createElement('a')
        backLink.href = "deck.html"
        const backText = document.createElement('div')
        backText.classList.add('backText')
        backText.innerHTML = dbDeck.description
        flipper.appendChild(back)
        back.appendChild(backLink)
        back.appendChild(backText)



      })
      document.querySelector('.card-title').innerHTML = data[0].deckName
      return response.data

    })


  // EVENT LISTENERS
  document.querySelector('.form-signin').addEventListener('submit', function(event) {
    event.preventDefault()

    const id = event.target.id.value

    request(`/protected/${id}`)
      .then(function(response) {
        console.log(response);
        document.querySelector('.message').innerHTML = `Hello ${response.data.id}, ${response.data.message}`
      })
      .catch(function(error) {
        console.log(error)
        document.querySelector('.message').innerHTML = 'You cannot access this resource'
      })
  })

})();
