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
