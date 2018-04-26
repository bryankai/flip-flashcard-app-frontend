// User Score
function getUserScore(users_id) {
  console.log(users_id)
  request(`/users/${users_id}/allAttempts`)
    .then(data => {
      // console.log(data.data.data)
      attemptsArray=data.data.data
      const correctArray = attemptsArray.filter(element => {
        return element.correct
      })
      const userScore = correctArray.length*10
      console.log(userScore)
      return userScore
    })
    .catch(error => {
      console.log('score error')
    })
}

// Quiz functions
function newQuiz(id, deckId, data) {
    console.log(data)
    data.forEach(dbCard => {
      const flashCard = document.querySelector('.flashcard')
      const card = document.createElement('div')
      card.classList.add('vertical', 'flip-container','card', 'border-light', 'mb-3')
      card.addEventListener('click', event => {
        card.classList.toggle('flip')
      })
      flashCard.appendChild(card)

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

      // EVENT LISTENERS

      document.getElementById('back').addEventListener('click', function(event){
        console.log('back')
      })
      document.getElementById('correct').addEventListener('click', function(event){
        console.log('correct')
      })
      document.getElementById('incorrect').addEventListener('click', function(event){
        console.log('incorrect')
      })
    })
}

// Create Random Order
function createRandomDeckOrder(cardIdArr) {
  // const cardIdArr = cardsArr.map(card => card.id)
  let length = cardIdArr.length
  let randomOrderArr=[]
  for (let i=0; i<length; i++) {
    randomOrderArr.push(cardIdArr.splice(Math.floor(Math.random()*cardIdArr.length),1)[0])
  }
  console.log(randomOrderArr)
  return randomOrderArr
}
