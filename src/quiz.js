(function() {
  'use strict';
  const deckId = parseInt(window.location.search.slice(8))
  let id
  let currentIndex = 0
  let randomOrderArr
  let numberCorrect = 0
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
      randomOrderArr = createRandomDeckOrder(data)
      newQuiz()
      assignEventListeners()
      nextCard()
      return data
    })

  // Event Listeners
  function assignEventListeners (){
    document.getElementById('correct').addEventListener('click', function(event){
      nextCard(true)
    })
    document.getElementById('incorrect').addEventListener('click', function(event){
      nextCard(false)
    })
  }

  // next card aka RENDER
  function nextCard(attempt) {
    const cardId = randomOrderArr[currentIndex].id
    // If not the initial loading...
    if (attempt != undefined ) {
        // Store attempt result in database
        request(`/users/${id}/decks/${deckId}/cards/${cardId}/attempts`, 'post', {correct: `${attempt}`})
        // Move to next card
        currentIndex++
        if(attempt) numberCorrect++
    }
    console.log(`Number Correct: ${numberCorrect}`)
    if(currentIndex < randomOrderArr.length) {
      console.log(currentIndex)
      const currentCard = randomOrderArr[currentIndex];
      const flashCard = document.querySelector('.flashcard')
      const frontText = document.querySelector('.frontText')
      const backText = document.querySelector('.backText')
      frontText.innerHTML = currentCard.bibleReference
      backText.innerHTML = currentCard.passage
    } else {
      // Results!
      const flashCard = document.querySelector('.flashcard-container')
      flashCard.style.display = 'none';
      const results = document.querySelector('.results-container')
      results.firstElementChild.innerHTML="results!"
      displayResults()
    }

  }
function displayResults() {

  document.querySelector('.temp > h3').innerHTML = 'temp'
  document.querySelector('.correct > h3').innerHTML = 'correct'
  document.querySelector('.results-title > h2').innerHTML = 'recipeName'
  const flashcardCont = document.querySelector('.flashcard-container')
  const resultsCont = document.querySelector('.results-sub-container')
  flashcardCont.style.display = "none"
  resultsCont.style.display = "block"
}


  // function correct() {
  //   const cardId = randomOrderArr[currentIndex].id
  //   console.log(cardId);
  //   request(`/users/${id}/decks/${deckId}/cards/${cardId}/attempts`, 'post', {correct: true})
  //   nextCard()
  // }
  // function incorrect() {
  //   const cardId = randomOrderArr[currentIndex].id
  //   request(`/users/${id}/decks/${deckId}/cards/${cardId}/attempts`, 'post', {correct: false})
  //   nextCard()
  // }

})();
