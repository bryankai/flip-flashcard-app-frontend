(function() {
  'use strict';

  const images = ['hawks.png','lemurs.png','sharks.png','velociraptors.png'].map(e => `/img/${e}`)

  function setRandomImgSource(element, array){
    let randomIndex = Math.floor(Math.random() * array.length)
    const currentImage = `/img/${element.src.match(/\w*.png/)[0]}`

    while(array[randomIndex] === currentImage){
      randomIndex = Math.floor(Math.random() * array.length)
    }

    element.setAttribute('src', array[randomIndex])
  }

  // set event listener to change logo
  document.querySelector('#logo').addEventListener('click', function(event){
    setRandomImgSource(document.querySelector('#logo'), images)
  })

  // set initial logo
  setRandomImgSource(document.querySelector('#logo'), images)

})();
