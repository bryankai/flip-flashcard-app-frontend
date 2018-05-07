function request(path, method = 'get', body = null) {
  let bearerToken = ''
  const token = localStorage.getItem('token')

  if(token){
    bearerToken = `Bearer ${token}`
  }

  return axios(`https://bk-flip-app.herokuapp.com${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearerToken
    },
    data: body
  })
}

// User Score
function getUserScore(users_id) {
  let userScore
  console.log('step1');
  return request(`/users/${users_id}/allAttempts`)
    .then(data => {
      attemptsArray=data.data.data
      const correctArray = attemptsArray.filter(element => {
        return element.correct
      })
      userScore = correctArray.length*10
      console.log('bryan',userScore)
      return userScore
    })
    // .then(data => {
    //   return data
    // })
    .catch(error => {
      console.log('score error')
    })
  // console.log('step2')
  // console.log('pat',userScore)
  // return userScore
}

// Quiz functions
function newQuiz() {
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
      flipper.appendChild(front)
      front.appendChild(frontText)

      const back = document.createElement('div')
      back.classList.add('back')
      const backText = document.createElement('div')
      backText.classList.add('backText')
      flipper.appendChild(back)
      back.appendChild(backText)
}

// Create Random Order for Quiz
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
