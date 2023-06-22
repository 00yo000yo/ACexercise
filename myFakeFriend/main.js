const INDEX_URL = "https://user-list.alphacamp.io/api/v1/users/";
const user = [];
const eachCard = document.querySelector("#eachCard");

axios
  .get(INDEX_URL)
  .then((response) => {
    user.push(...response.data.results);
    cardList(user);
  })
  .catch((err) => console.log(err));

function cardList(data) {
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `
      <div class="card" style="width: 15rem">
      <img src="${item.avatar}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${item.name} ${item.surname}</h5>
        <button type="button" class="btn btn-primary btn-showInfo" data-bs-toggle="modal" data-bs-target="#infoModal" data-id="${item.id}">
          More Info
        </button>
      </div>
    </div>
    `;
  });
  eachCard.innerHTML = rawHTML;
}

eachCard.addEventListener("click", userModalClick);

function userModalClick(event) {
  if (event.target.matches(".btn-showInfo")) {
    showInfo(event.target.dataset.id);
  }
}

// console.log(showInfo(5))

function showInfo(event) {
  const infoImage = document.querySelector("#info-image");
  const detailInfo = document.querySelector("#detailInfo");
  const modalTitle = document.querySelector("#info-modal-title");

  modalTitle.textContent = "";
  infoImage.innerHTML = "";
  detailInfo.innerHTML = "";

  axios.get(INDEX_URL + event).then((response) => {
    const data = response.data;

    modalTitle.textContent = data.name + data.surname;

    infoImage.innerHTML = `
    <img src=" ${data.avatar}" class="img-thumbnail">
    `;

    detailInfo.innerHTML = `
      <p class="info-name">Name：${data.name}</p>
      <p class="info-sur">Surname：${data.surname}</p>
      <p class="info-email">Email：${data.email}</p>
    `;
  });
}
