const BASE_URL = "https://webdev.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/movies/";
const POSTER_URL = BASE_URL + "/posters/";
const dataPanel = document.querySelector("#data-panel");
const movies = [];
const MOVIES_PER_PAGE = 12;
const paginator = document.querySelector("#paginator");
let filteredMovies = [];
// const card = document.querySelector("#card");
// const list = document.querySelector("#list");
const modeChange = document.querySelector("#modeChange");
let currentPage = 1;

// 以下是新增的部分

let mode = "list";

modeChange.addEventListener("click", (event) => {
  if (event.target.matches("#card")) {
    mode = "";
    mode += "card";
    renderMovieList(getMoviesByPage(currentPage));
  } else if (event.target.matches("#list")) {
    mode = "";
    mode += "list";
    renderMovieList(getMoviesByPage(currentPage));
  }
});

function renderMovieList(data) {
  if (mode === "list") {
    let rawHTML = "";
    rawHTML += `<div class="container mt-5">`;
    data.forEach((item) => {
      rawHTML += `
    <div class="container-xxl d-flex justify-content-between mt-4">
    <div class="container">${item.title}</div>
    <div class="container" style="text-align:right">
      <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${item.id}">More</button>
      <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
    </div>
  </div>`;
    });

    rawHTML += `</div>`;
    dataPanel.innerHTML = rawHTML;
  } else if (mode === "card") {
    let rawHTML = "";
    data.forEach((item) => {
      rawHTML += `<div class="col-sm-3">
      <div class="mb-2">
        <div class="card">
          <img src="${
            POSTER_URL + item.image
          }" class="card-img-top" alt="Movie Poster">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal" data-id="${
              item.id
            }">More</button>
            <button class="btn btn-info btn-add-favorite" data-id="${
              item.id
            }">+</button>
          </div>
        </div>
      </div>
    </div>`;
    });
    dataPanel.innerHTML = rawHTML;
  }
}

// 以上是新增的部分

function renderPaginator(amount) {
  const numberOfPages = Math.ceil(amount / MOVIES_PER_PAGE);
  let rawHTML = "";
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;
  }
  paginator.innerHTML = rawHTML;
}

function getMoviesByPage(page) {
  const data = filteredMovies.length ? filteredMovies : movies;

  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE);
}

function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results;
    modalTitle.innerText = data.title;
    modalDate.innerText = "Release date: " + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src="${
      POSTER_URL + data.image
    }" alt="movie-poster" class="image-fluid">`;
  });
}

function addToFavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = movies.find((movie) => movie.id === id);
  if (list.some((movie) => movie.id === id)) {
    return alert("此電影已經在收藏清單中！");
  }
  list.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(Number(event.target.dataset.id));
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(Number(event.target.dataset.id));
  }
});

paginator.addEventListener("click", function onPaginatorClicked(event) {
  if (event.target.tagName !== "A") return;
  const page = Number(event.target.dataset.page);
  currentPage = page;
  renderMovieList(getMoviesByPage(page));
});

axios.get(INDEX_URL).then((response) => {
  movies.push(...response.data.results);
  renderPaginator(movies.length);
  renderMovieList(getMoviesByPage(1));
});

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

//監聽表單提交事件
searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();

  const target = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );
  filteredMovies = target;
  if (filteredMovies.length === 0) {
    renderMovieList(filteredMovies);
    paginator.innerHTML = "";
    return alert(`您輸入的關鍵字：${keyword} 沒有符合條件的電影`);
  }
  currentPage = 1;
  renderPaginator(filteredMovies.length);
  renderMovieList(getMoviesByPage(currentPage));
});
