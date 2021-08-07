console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"
let breeds = [];

document.addEventListener('DOMContentLoaded', function() {
    fetchImages();
    fetchBreeds();
  })

function fetchImages() {
    fetch(imgUrl)
        .then(res => res.json())
        .then(results => { results.message.forEach(image => addImage(image)) 
        });
}

function addImage(dogPictureUrl) {
    let container = document.querySelector("#dog-image-container");
    let newEl = document.createElement('img');
    newEl.src = dogPictureUrl;
    container.appendChild(newEl);
}

function fetchBreeds() {
    fetch(breedUrl)
        .then(res => res.json())
        .then(results => { 
            breeds = Object.keys(results.message);
            addBreeds(breeds);
            dropdownOptions();
        });
}

function addBreeds(breeds) {
    breeds.forEach(breed => {
        let ul = document.querySelector('#dog-breeds');
        let li = document.createElement('li');
        li.innerText = breed;
        ul.appendChild(li);
        li.addEventListener('click', function(e) {
            e.target.style.color = "blue"
        });
    });    
}

function dropdownOptions() {
    let dropdown = document.querySelector("#breed-dropdown");
    dropdown.addEventListener("change", function(e) {
        let ul = document.querySelector("#dog-breeds");
        removeAllChildNodes(ul);
        addBreeds(breeds.filter(breed => breed.startsWith(e.target.value)));
    })
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}