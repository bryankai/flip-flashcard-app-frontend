(function() {
  'use strict';
  const deckId = parseInt(window.location.search.slice(8))
  let id
  let currentIndex = 0
  let randomOrderArr
  let numberCorrect = 0
  let name
  // authe gate
  request('/auth/token')
    .then(response => {
      id = response.data.id
    })
    .catch(error => {
      window.location = '/index.html'
    })
    .then(function() {
      return request(`/users/${id}`, 'get')
    })
    .then(response => {
      name = response.data.data.name
      document.getElementById('userName').innerHTML = name
    })

    // Load Quiz Page
    request(`/users/${id}/decks/${deckId}/cards`, 'get')
    .then(response => {
      const { data } = response.data

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
  // const numCorrect = document.querySelector('.correct-description-text')
  // numCorrect.innerHTML="asdf"
  const flashcardCont = document.querySelector('.flashcard-container')
  const resultsCont = document.querySelector('.results-sub-container')
  flashcardCont.style.display = "none"
  resultsCont.style.display = "block"
}

})();
