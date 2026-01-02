const albums = [];
const table = document.querySelector("#table-body");
const emptyAlbum = {
    title: "",
    artist: "",
    year: "",
    genre: "",
    played: false
};


function renderTable() {
    table.innerHTML = "";

    albums.forEach((item, index)=>{
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


// test

const newAlbum = {
    ...emptyAlbum,
    title: "nevermind",
    artist: "Nirvana",
    year: 1991,
    genre: "Grunge",
    played: false
}


albums.push(newAlbum);

renderTable();