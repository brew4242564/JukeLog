let albums = [];
const actionCol = document.querySelector(".action");
const table = document.querySelector("#table-body");
const btns = document.querySelector(".btns");
const modal = document.querySelector("#modal-container");
const form = document.querySelector("#modal");
let emptyAlbum = {
  title: "",
  artist: "",
  year: "",
  genre: "",
  played: false,
};
let isEditMode = false;
let editIndex = null;

const savedAlbums = localStorage.getItem("albums");
if (savedAlbums) {
  albums = JSON.parse(savedAlbums);
}
function saveAlbums() {
  localStorage.setItem("albums", JSON.stringify(albums));
}

function renderTable() {
  table.innerHTML = "";

  albums.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td class="px-4 py-3 font-medium">${item.title}</td>
        <td class="px-4 py-3 font-medium">${item.artist}</td>
        <td class="px-4 py-3 font-medium">${item.year}</td>
        <td class="px-4 py-3 font-medium">${item.genre}</td>
        <td class="px-4 py-3 font-medium text-center">${
          item.played ? "✅" : "❌"
        }</td>
        `;
    actionCol.classList.add("hidden");
    table.appendChild(row);
  });
}

function renderWithButtons() {
  table.innerHTML = "";
  albums.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="px-4 py-3 font-medium">${item.title}</td>
        <td class="px-4 py-3 font-medium">${item.artist}</td>
        <td class="px-4 py-3 font-medium">${item.year}</td>
        <td class="px-4 py-3 font-medium">${item.genre}</td>
        <td class="px-4 py-3 font-medium text-center">${
          item.played ? "✅" : "❌"
        }</td>
        `;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "🗑️";
    btn.dataset.action = "delete";
    btn.dataset.index = index;
    btn.style.marginRight = "1rem";
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "✏️";
    editBtn.dataset.index = index;
    editBtn.dataset.action = "edit";
    const actionTd = document.createElement("td");
    actionTd.className = "px-4 py-3";
    const actionWrapper = document.createElement("div");
    actionWrapper.className = "flex justify-center";
    actionWrapper.appendChild(btn);
    actionWrapper.appendChild(editBtn);
    actionTd.appendChild(actionWrapper);
    row.appendChild(actionTd);
    table.appendChild(row);
    actionCol.classList.remove("hidden");
  });
}

btns.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    return;
  }
  const { action } = e.target.dataset;
  if (action === "add") {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    isEditMode = false;
  }

  if (action === "open-menu") {
    if (isEditMode === false) {
      isEditMode = true;
      renderWithButtons();
    } else {
      isEditMode = false;
      renderTable();
    }
  }
});

table.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    return;
  }

  const { action, index } = e.target.dataset;

  if (action === "edit") {
    startEdit(index);
  }
  if (action === "delete") {
    albums.splice(index, 1);
    saveAlbums();
    renderWithButtons();
  }
});

form.addEventListener("click", (e) => {
  if (e.target.dataset.action === "close") {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    editIndex = null;
    form.reset();
  }
});

function startEdit(index) {
  const album = albums[index];
  form.title.value = album.title;
  form.artist.value = album.artist;
  form.year.value = album.year;
  form.genre.value = album.genre;
  form.played.checked = album.played;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  editIndex = index;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  if (editIndex === null) {
    const value = {
      title: formData.get("title"),
      artist: formData.get("artist"),
      year: formData.get("year"),
      genre: formData.get("genre"),
      played: formData.get("played") === "on",
    };
    if (!value) return;
    albums.push(value);
    saveAlbums();

    renderTable();
    form.reset();
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  } else {
    const updated = {
      title: formData.get("title"),
      artist: formData.get("artist"),
      year: formData.get("year"),
      genre: formData.get("genre"),
      played: formData.get("played") === "on",
    };
    albums[editIndex] = updated;
    editIndex = null;
    saveAlbums();
    renderWithButtons();
    form.reset();
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});

renderTable();
