const APIKEY = "2297be298bc72e23ed6e5545088c26d2";
// const num = 602;
var page = 1;
var flag = 0;
var gener = 28;
const genres = "https://api.themoviedb.org/3/genre/movie/list?api_key=2297be298bc72e23ed6e5545088c26d2&language=en-US"
var APIurl = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKEY + "&with_genres=16" + "&page=" + page;
// const APIurl = "https://api.themoviedb.org/3/movie/" + num + "?api_key=" + APIKEY;
// var APIurl = "";
var SEARCHapi = "https://api.themoviedb.org/3/search/movie?api_key=" + APIKEY + "&language=en-US&page=" + page + "&include_adult=false&query=";
// console.log(APIurl);
const imgUrl = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const footer = document.getElementById("footer");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const PageNo = document.getElementById("PageNo");
const generBtn = document.getElementById("gener-btn");
const movieGener = document.getElementById("movieGener");
var eAPIurl = "";
prev.addEventListener("click", () => {
    if (flag === 0) {
        if (page > 1) {
            page--;
            getMovies(APIurl + page);
            PageNo.innerHTML = `Page ${page}`;

        }
    }
    else {
        if (page > 1) {
            page--;
            getMovies(SEARCHapi + page);
            PageNo.innerHTML = `Page ${page}`;
        }
    }
})
next.addEventListener("click", () => {
    if (flag === 0) {
        // alert("dropdowns");
        page++;
        getMovies(APIurl + page);
        PageNo.innerHTML = `Page ${page}`;
    }
    if (flag === 1) {
        // alert("searched");
        page++;
        getMovies(SEARCHapi + page);
        PageNo.innerHTML = `Page ${page}`;
    }
})
footer.innerHTML = `<p><span class="made">Made with ❤️ by </span><span class="msfreak">Ayush Gupta</span></p>`
function getColor(vote) {
    if (vote >= 8) { return "green"; }
    else if (vote >= 6) { return "yellow"; }
    else { return "red"; }
}
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    // console.log(respData);
    showMovies(respData.results)
    // img.src = imgUrl + respData.backdrop_path;
    // document.body.appendChild(img);
    // })
    return respData;
}
function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        console.log(movie)
        const { poster_path, title, vote_average, overview } = movie;
        // const img = document.createElement("img");
        // img.src = imgUrl + respData.backdrop_path;
        // document.body.appendChild(img);
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML =
            `<img src="${imgUrl + movie.backdrop_path}" alt="" />
            <div class="movieInfo">
                <h3 class="MovieTitle">${movie.title}</h3>
                <span class="${getColor(movie.vote_average)} rating">${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h4>Overview :</h4>
                <p>${movie.overview}</p>
            </div>`;
        main.appendChild(movieDiv);
    });
}
generBtn.addEventListener("click", () => {
    // getElementById("search").placeholder = "Search";
    gener = movieGener.value;
    page = 1;
    // 
    APIurl = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKEY + "&with_genres=" + gener + "&page=" + page;
    console.log(APIurl);
    getMovies(APIurl);
    PageNo.innerHTML = `Page ${page}`;
    flag = 0;
})
getMovies(APIurl);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        page = 1;
        SEARCHapi = "https://api.themoviedb.org/3/search/movie?api_key=" + APIKEY + "&language=en-US" + "&include_adult=false&query=" + searchTerm + "&page=";
        getMovies(SEARCHapi + page);
        PageNo.innerHTML = `Page ${page}`;
        flag = 1;
        // getElementById("search").placeholder = searchTerm;
        search.value = "";
    }
})