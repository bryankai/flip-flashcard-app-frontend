(function() {
  'use strict';

  // login form
  document.querySelector('.form-login').addEventListener('submit', function(event){
    event.preventDefault()

    const email = event.target.email.value
    const password = event.target.password.value

    request('/auth/token', 'post', { email , password })
    .then(function(response){
      document.querySelector('#error').classList.add('hide-auth-error')
      localStorage.setItem('token', response.data.token)
      window.location = '/protected.html'
    })
    .catch(function(error){
      document.querySelector('#error').classList.remove('hide-auth-error')
    })
  })


})();
