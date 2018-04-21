(function() {
  'use strict';

  // authe gate
  request('/auth/token')
  .then(function(response){
    // user is logged in
    document.querySelector('.user-id').innerHTML = response.data.id
  })
  .catch(function(error){
    // user is not logged in
    window.location = '/index.html'
  })


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
