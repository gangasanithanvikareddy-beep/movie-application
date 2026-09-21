const API_URL = "http://localhost:5000/api/movies";

let allMovies = [];

async function loadMovies() {
    try {
        const response = await fetch(API_URL);
        allMovies = await response.json();

        displayMovies(allMovies);
    } catch (error) {
        console.error("Error loading movies:", error);
    }
}

function displayMovies(movies) {
    const movieContainer = document.getElementById("movieContainer");

    movieContainer.innerHTML = "";

    if (movies.length === 0) {
        movieContainer.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement("div");

        movieCard.className = "movie-card";
movieCard.onclick = () => showMovieDetails(movie);
        movieCard.innerHTML = `
    <img src="https://placehold.co/300x450?text=Interstellar" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.description}</p>
    <p><strong>Genre:</strong> ${movie.genre}</p>
    <p><strong>Language:</strong> ${movie.language}</p>
    <p><strong>Release Date:</strong> ${new Date(movie.releaseDate).toLocaleDateString()}</p>
    <p><strong>Duration:</strong> ${movie.duration} minutes</p>
    <p class="rating">⭐ Rating: ${movie.rating}</p>
`;

        movieContainer.appendChild(movieCard);
    });
}
function showMovieDetails(movie) {
    const movieDetails = document.getElementById("movieDetails");

    movieDetails.style.display = "block";

    movieDetails.innerHTML = `
        <img src="https://placehold.co/300x450?text=${encodeURIComponent(movie.title)}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <p><strong>Description:</strong> ${movie.description}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Language:</strong> ${movie.language}</p>
        <p><strong>Release Date:</strong> ${new Date(movie.releaseDate).toLocaleDateString()}</p>
        <p><strong>Duration:</strong> ${movie.duration} minutes</p>
        <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>
    `;
}
function searchMovies() {
    const searchTerm = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const filteredMovies = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm) ||
    movie.genre.toLowerCase().includes(searchTerm) ||
    movie.language.toLowerCase().includes(searchTerm)
);

    displayMovies(filteredMovies);
}

loadMovies();