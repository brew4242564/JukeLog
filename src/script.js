const albums = [];
const table = document.querySelector("#table-body");
const btns = document.querySelector(".btns");
const modal = document.querySelector("#modal-container");
const form = document.querySelector("#modal");
const emptyAlbum = {
  title: "",
  artist: "",
  year: "",
  genre: "",
  played: false,
};

function renderTable() {
  table.innerHTML = "";

  albums.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.title}</td>
        <td>${item.artist}</td>
        <td>${item.year}</td>
        <td>${item.genre}</td>
        <td>${item.played}</td>
        `;
    table.appendChild(row);
  });
}

btns.addEventListener("click", (e) => {
  if(e.target.tagName !== "BUTTON"){
      return;
  }
  const { action } = e.target.dataset;
  if (action === "add") {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
  if (action === "edit") {
    console.log("edit");
  }
  if (action === "delete") {
    console.log("delete");
  }
});

form.addEventListener("click", (e) => {
  if (e.target.dataset.action === "close") {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});



// test

const newAlbum = {
  ...emptyAlbum,
  title: "nevermind",
  artist: "Nirvana",
  year: 1991,
  genre: "Grunge",
  played: false,
};

albums.push(newAlbum);

renderTable();
