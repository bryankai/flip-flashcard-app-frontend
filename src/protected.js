(function() {
  'use strict';
  let id

  // authe gate
  request('/auth/token')
  .then(function(response){
    // user is logged in
    id=response.data.id
    console.log(id)
    document.querySelector('.user-id').innerHTML = id
  })
  .catch(function(error){
    // user is not logged in
    window.location = '/index.html'
  })

  // load deck information
  .then(function(){
    console.log(id)
    return request(`/users/${id}/decks`, 'get')
  })
  .then(function(response){
    console.log(response.data)
    const {data} = response.data
    document.querySelector('.decks').innerHTML = data[0].deckName
    return response.data
  })


  // EVENT LISTENERS
  document.querySelector('.form-signin').addEventListener('submit', function(event){
    event.preventDefault()

    const id = event.target.id.value

    request(`/protected/${id}`)
    .then(function(response){
      console.log(response);
      document.querySelector('.message').innerHTML = `Hello ${response.data.id}, ${response.data.message}`
    })
    .catch(function(error){
      console.log(error)
      document.querySelector('.message').innerHTML = 'You cannot access this resource'
    })
  })

})();
