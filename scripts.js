/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */

const FRESH_PRINCE_URL =
  "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
const CURB_POSTER_URL =
  "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
const EAST_LOS_HIGH_POSTER_URL =
  "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// This is an array of strings (TV show titles)
let shows = [];

let isSortedAZ = false;
// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

function loadData() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      shows = data;
      showCards();
    })
    .catch((error) => {
      console.error("Failed to load JSON data:", error);
    });
}

// This function adds cards the page to display the data in the array
function showCards(data = shows) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let i = 0; i < data.length; i++) {
    const { title, image, genre, year, description} = data[i];


    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, title, image, genre, year, description); // Edit title and image

    nextCard.style.animationDelay = `${i * 100}ms`;

    cardContainer.appendChild(nextCard); 
  }
}

function editCardContent(card, title, image, genre, year, description) {
  card.style.display = "block";
  card.classList.add(genre.toLowerCase()); 


  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = title;

  const cardImage = card.querySelector("img");
  cardImage.src = image;
  cardImage.alt = '${title} Poster';

  const ul = card.querySelector("ul");
  ul.innerHTML = `<li><strong>Genre:</strong> ${genre}</li>
    <li><strong>Year:</strong> ${year}</li>
    <li><strong>Description:</strong> ${description}</li>`;

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", title, "- html: ", card);
}

function filterShows() {
  const  query = document.getElementById("search-input").value.toLowerCase();
  const filtered = shows.filter(show => show.title.toLowerCase().includes(query));
  showCards(filtered);
}

function sortAZ() {
  isSortedAZ = !isSortedAZ;

  let sortedShows = [...shows];

  if (isSortedAZ) {
    sortedShows.sort((a, b) => a.title.localeCompare(b.title));
    document.querySelector(".footer button:nth-child(3)").textContent = "Sort Z → A";
  } else {
    sortedShows.sort((a, b) => b.title.localeCompare(a.title));
    document.querySelector(".footer button:nth-child(3)").textContent = "Sort A → Z";
  }

  showCards(sortedShows);
}

function filterByGenre() {
  const selectedGenre = document.getElementById("genre-filter").value;

  if (selectedGenre === "all") {
    showCards(); 
  } else {
    const filtered = shows.filter(show => show.genre === selectedGenre);
    showCards(filtered);
  }
}


function addNewShow() {
  const title = document.getElementById("new-title").value;
  const image = document.getElementById("new-image").value;
  const genre = document.getElementById("new-genre").value;
  const year = parseInt(document.getElementById("new-year").value());
  const description = document.getElementById("new-description").value;

  if (!title || !image || !genre || isNaN(year) || !description) {
    alert("Please fill out all fields correctly.");
    return;
  }

  shows.push({title, image, genre, year, description});


  document.getElementById("new-title").value = "";
  document.getElementById("new-image").value = "";
  document.getElementById("new-genre").value = "";
  document.getElementById("new-year").value = "";
  document.getElementById("new-description").value = "";

  showCards();
}


// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", () => {
  loadCards(); 
});

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
}

function removeLastCard() {
  data.pop(); 
  showCards(); // Call showCards again to refresh
}
