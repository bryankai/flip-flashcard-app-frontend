(function() {
  'use strict';

  // signup form
  document.querySelector('.form-signup').addEventListener('submit', function(event){
    event.preventDefault()

    const name = event.target.name.value
    const email = event.target.email.value
    const password = event.target.password.value

    request('/users', 'post', { name, email, password })

    .then(function(response){
      return request('/auth/token', 'post', { email , password })
    })
    .then (function(response){
      document.querySelector('#error').classList.add('hide-auth-error')
      localStorage.setItem('token', response.data.token)
      window.location = '/dashboard.html'
    })
    .catch(function(error){
      document.querySelector('#error').classList.remove('hide-auth-error')
    })
  })

})();
