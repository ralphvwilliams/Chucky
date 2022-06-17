//Get DOM Objects
let searchField = document.getElementById("searchField");
let searchBtn = document.getElementById("searchBtn");
let randomBtn = document.getElementById("randomBtn");
let select = document.getElementById("select");
let categoryBtn = document.getElementById("categoryBtn");
let jokeArea = document.getElementById("jokeArea");

//Get Categories
getCategories();

//EventListeners
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  jokeArea.innerHTML = "";
  searchJoke();
});

randomBtn.addEventListener("click", (e) => {
  e.preventDefault();
  jokeArea.innerHTML = "";
  getRandomJoke();
});

categoryBtn.addEventListener("click", (e) => {
  e.preventDefault();
  jokeArea.innerHTML = "";
  getJokeWithCategory();
});

//Functions
function getRandomJoke() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => response.json())
    .then((data) => {
      jokeArea.innerHTML = `<p><i>"${data.value}"</i></p>`;
    });
}

function searchJoke() {
  fetch(`https://api.chucknorris.io/jokes/search?query=${searchField.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error === "Bad Request") {
        jokeArea.innerHTML += `<p id=error><i>Chuck Norris made a mistake once and it corrected itself. Sadly we can't correct your mistake. Try again</i></p>`;
      } else {
        let firstTen = data.result.slice(0, 10);
        firstTen.forEach((joke) => {
          jokeArea.innerHTML += `<p><i>"${joke.value}"</i></p>`;
        });
      }
    });
}

function getCategories() {
  fetch("https://api.chucknorris.io/jokes/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((category) => {
        let option = document.createElement("option");
        option.setAttribute("value", category);
        option.innerText = category;
        select.appendChild(option);
      });
    });
}

function getJokeWithCategory() {
  fetch(`https://api.chucknorris.io/jokes/random?category=${select.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error == "Not Found") {
        jokeArea.innerHTML += `<p id=error><i>Chuck Norris made a mistake once and it corrected itself. Sadly we can't correct your mistake. Try again</i></p>`;
      } else {
        jokeArea.innerHTML += `<p><i>"${data.value}"</i></p>`;
      }
    });
}
