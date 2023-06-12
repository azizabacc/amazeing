
let mazeContainer = document.createElement("div");
mazeContainer.id = "mazeContainer";

let menu = document.createElement("div");

let columnNb = document.createElement("input");
columnNb.type = "number";
columnNb.id = "columnNb";

let rowNb = document.createElement("input");
rowNb.type = "number";
rowNb.id = "rowNb";

let submitBtn = document.createElement("button");
submitBtn.textContent = "Submit";
submitBtn.addEventListener("click", generateGrid);

let palette = document.createElement("div");
palette.style.display = "flex";

let path = document.createElement("div");
path.classList = "path";

let start = document.createElement("div");
start.style.backgroundImage = 'url(images/start.png)';

let end = document.createElement("div");
end.style.backgroundImage = 'url(images/end.png)';

palette.appendChild(start);
palette.appendChild(end);
palette.appendChild(path);

for(let i=0; i<palette.children.length;i++){
    palette.children[i].style.width ="64px";
    palette.children[i].style.height ="64px";
}

let main = document.querySelector("main");
main.style.display = "flex";

function styleMaze(map, columnCount, rowCount) {
  map.style.display = "grid";
  map.style.gridTemplateColumns = `repeat(${columnCount}, 64px)`;
  map.style.gridTemplateRows = `repeat(${rowCount}, 64px)`;
  map.style.gap = "1px";
  map.style.backgroundColor = "yellow";
  map.style.width = "fit-content";
}

function generateGrid() {
  const columnCount = parseInt(columnNb.value);
  const rowCount = parseInt(rowNb.value);

  mazeContainer.innerHTML = ""; // Réinitialiser le contenu du conteneur du labyrinthe

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      const cell = document.createElement("div");
      cell.style.backgroundImage = 'url(images/blue.png)';
      mazeContainer.appendChild(cell);
    }
  }

  styleMaze(mazeContainer, columnCount, rowCount);
}

menu.appendChild(columnNb);
menu.appendChild(rowNb);
menu.appendChild(submitBtn);
menu.appendChild(palette); // Ajout de la palette à l'élément menu
menu.style.display = "flex";
menu.style.flexDirection = "column";

main.appendChild(mazeContainer);
main.appendChild(menu);
