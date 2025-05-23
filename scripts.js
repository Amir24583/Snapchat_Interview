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

// This is an array of strings (TV show titles)
let shows = [];

let isSortedAZ = false;

let currentTypeFilter = "all";

const TYPE_ALIASES = {
  "tv": "TV Show",
  "show": "TV Show",
  "tv show": "TV Show",
  "movie": "Movie",
  "movies": "Movie",
  "Tv": "TV Show",
  "Show": "TV Show",
  "Tv Show": "TV Show",
  "Movie": "Movie",
  "Movies": "Movie"
};

// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

function loadData() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const saved = localStorage.getItem("shows");
      shows = saved ? JSON.parse(saved) : data.map(show => ({...show,
        genre: show.genre.trim(),
        type: show.type.trim()
      }));

      if (!saved) {
        localStorage.setItem("shows", JSON.stringify(shows));
      }
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
    editCardContent(nextCard, title, image, genre, year, description); // Edits card content

    nextCard.style.animationDelay = `${i * 100}ms`;

    cardContainer.appendChild(nextCard); 
  }
}

function editCardContent(card, title, image, genre, year, description) {
  card.style.display = "block";
  const genreClass = genre.toLowerCase().replace(/\s+/g, "-");
  card.classList.add(genreClass);


  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = title;

  const cardImage = card.querySelector("img");
  cardImage.src = image || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  cardImage.alt = `${title} Poster`;


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

function applyFilters() {
  const selectedGenre = document.getElementById("genre-filter").value.toLowerCase();
  const selectedType = currentTypeFilter.toLowerCase();

  const filtered = shows.filter(show => {
    const genreMatch =
      selectedGenre === "all" ||
      show.genre.toLowerCase() === selectedGenre;

    const typeMatch =
      selectedType === "all" ||
      show.type.toLowerCase() ===  selectedType;

    return genreMatch && typeMatch;
  });

  showCards(filtered);
}

function filterByType(type) {
  const lower = type.trim().toLowerCase();
  currentTypeFilter = TYPE_ALIASES[lower] || "all";  
  applyFilters();
}


function filterByGenre() {
  applyFilters();
}

function addNewShow() {
  const title = document.getElementById("new-title").value;
  const image = document.getElementById("new-image").value;
  const genre = document.getElementById("new-genre").value;
  const year = parseInt(document.getElementById("new-year").value);
  const description = document.getElementById("new-description").value;
  const rawType = document.getElementById("new-type").value.trim().toLowerCase();
  const type = TYPE_ALIASES[rawType];

  if (!title || !image || !genre || isNaN(year) || !description || !type) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const newShow = {
    title,
    image,
    genre,
    year,
    description,
    type,
  };

  shows.push(newShow);
  localStorage.setItem("shows", JSON.stringify(shows));
  showCards();


  document.getElementById("new-title").value = "";
  document.getElementById("new-image").value = "";
  document.getElementById("new-genre").value = "";
  document.getElementById("new-year").value = "";
  document.getElementById("new-description").value = "";
  document.getElementById("new-type").value = "";

}

function resetShows() {
  localStorage.removeItem("shows");
  loadData();
}


// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", () => {
  loadData(); 
});

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
}

function removeLastCard() {
  shows.pop(); 
  showCards(); // Call showCards again to refresh
}
