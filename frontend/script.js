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

function getPoster(title) {
    const posters = {
        "Interstellar": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        "Inception": "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        "The Dark Knight": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        "3 Idiots": "https://picsum.photos/seed/3idiots/500/750",
        "RRR": "https://picsum.photos/seed/rrr/500/750"
    };

    return posters[title] ||
        `https://placehold.co/500x750/111827/ffffff?text=${encodeURIComponent(title)}`;
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
            <img src="${getPoster(movie.title)}" alt="${movie.title}">

            <div class="movie-info">
                <h3>${movie.title}</h3>

                <p class="description">${
                    movie.title === "Interstellar"
                        ? "Journey beyond the stars to find a new home for humanity."
                        : movie.title === "Inception"
                        ? "A skilled thief enters dreams to steal secrets and change the past."
                        : movie.title === "The Dark Knight"
                        ? "Batman faces a dangerous criminal who brings chaos to Gotham."
                        : movie.title === "3 Idiots"
                        ? "Three friends discover friendship, dreams and life beyond college."
                        : movie.title === "RRR"
                        ? "Two revolutionaries build an unforgettable friendship while fighting for freedom."
                        : movie.description
                }</p>

                <div class="movie-meta">
                    <span>${movie.genre}</span>
                    <span>⭐ ${movie.rating}</span>
                </div>
            </div>
        `;

        movieContainer.appendChild(movieCard);
    });
}

function showMovieDetails(movie) {
    const movieDetails = document.getElementById("movieDetails");

    movieDetails.style.display = "block";

    movieDetails.innerHTML = `
        <img src="${getPoster(movie.title)}" alt="${movie.title}">

        <h2>${movie.title}</h2>

        <p><strong>Description:</strong> ${movie.description}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Language:</strong> ${movie.language}</p>
        <p><strong>Release Date:</strong> ${new Date(movie.releaseDate).toLocaleDateString()}</p>
        <p><strong>Duration:</strong> ${movie.duration} minutes</p>
        <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>

        <div class="details-buttons">
            <button onclick="editMovie('${movie._id}')">
                Edit Movie
            </button>

            <button onclick="deleteMovie('${movie._id}')">
                Delete Movie
            </button>
        </div>
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

document.getElementById("movieForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const movie = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        genre: document.getElementById("genre").value,
        language: document.getElementById("language").value,
        releaseDate: document.getElementById("releaseDate").value,
        duration: Number(document.getElementById("duration").value),
        rating: Number(document.getElementById("rating").value) || 0
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        });

        if (!response.ok) {
            throw new Error("Failed to add movie");
        }

        alert("Movie added successfully!");

        document.getElementById("movieForm").reset();

        loadMovies();
    } catch (error) {
        console.error(error);
        alert("Could not add movie.");
    }
});

async function deleteMovie(id) {
    if (!confirm("Are you sure you want to delete this movie?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete movie");
        }

        alert("Movie deleted successfully!");

        document.getElementById("movieDetails").style.display = "none";

        loadMovies();
    } catch (error) {
        console.error(error);
        alert("Could not delete movie.");
    }
}

async function editMovie(id) {
    const movie = allMovies.find(movie => movie._id === id);

    if (!movie) {
        return;
    }

    const newRating = prompt(
        `Enter new rating for ${movie.title}:`,
        movie.rating
    );

    if (newRating === null) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rating: Number(newRating)
            })
        });

        if (!response.ok) {
            throw new Error("Failed to update movie");
        }

        alert("Movie updated successfully!");

        loadMovies();
    } catch (error) {
        console.error(error);
        alert("Could not update movie.");
    }
}

loadMovies();