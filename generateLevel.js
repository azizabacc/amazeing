function dragOver (e) {
  console.log("dragOver");
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  console.log("dragEnter");
  this.classList.add("hovered");
}
function dragLeave() {
  this.classList.remove("hovered");
}
function drop(e) {
  e.preventDefault();
  const draggableId = e.dataTransfer.getData("text/plain");
  console.log("draggableId :" + draggableId);
  const draggableElement = document.getElementById(draggableId);
  
  if (draggableElement) {
    this.style.backgroundImage = draggableElement.style.backgroundImage;
    this.classList.remove("hovered");

    // delete the div at that position
    while (this.firstChild) {
      this.firstChild.remove();
    }

    // add the selected div from the palette to the grid
    const cell = document.createElement("div");
    cell.style.backgroundImage = draggableElement.style.backgroundImage;
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("dragenter", dragEnter);
    cell.addEventListener("dragleave", dragLeave);
    cell.addEventListener("drop", drop);
    cell.style.width = "64px";
    cell.style.height = "64px";
    replaceChild(cell, this);
   
  }
}

const styleMaze = (map, columnCount, rowCount) =>{
    map.style.display = "grid";
    map.style.gridTemplateColumns = `repeat(${columnCount}, 64px)`;
    map.style.gridTemplateRows = `repeat(${rowCount}, 64px)`;
    map.style.gap = "1px";
    map.style.backgroundColor = "yellow";
    map.style.width = "fit-content";
  }
  
const generateGrid = ()=> {
      const columnCount = parseInt(columnNb.value);
      const rowCount = parseInt(rowNb.value);
  
      // Reset maze container contents
      mazeContainer.innerHTML = "";
  
      for (let i = 0; i < rowCount; i++) {
          for (let j = 0; j < columnCount; j++) {
              const cell = document.createElement("div");
              cell.style.backgroundImage = 'url(images/blue.png)';
              cell.addEventListener("dragover", dragOver);
              cell.addEventListener("dragenter", dragEnter);
              cell.addEventListener("dragleave", dragLeave);
              cell.addEventListener("drop", drop);
              mazeContainer.appendChild(cell);
          }
      }
  
      styleMaze(mazeContainer, columnCount, rowCount);
  }


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
submitBtn.textContent = "Generate Maze";
submitBtn.addEventListener("click", generateGrid);

let palette = document.createElement("div");
palette.style.display = "flex";

let path = document.createElement("div");
path.style.backgroundImage='url(images/green.png)';
path.id= "path";

let start = document.createElement("div");
start.style.backgroundImage = 'url(images/start.png)';
start.id = "start";

let end = document.createElement("div");
end.style.backgroundImage = 'url(images/end.png)';
end.id = "end";

palette.appendChild(start);
palette.appendChild(end);
palette.appendChild(path);

let saveBtn = document.createElement("p");
saveBtn.textContent = "SAVE";
saveBtn.style.backgroundColor = "#077bc2";
saveBtn.style.borderRadius ="10px";
saveBtn.style.textAlign ="center";
saveBtn.style.fontSize ="40px";
saveBtn.style.fontWeight="bold";
saveBtn.style.color ="white";
let maze = [];
// Save maze 
const saveMaze = () => {
  maze = [];

  for (let i = 0; i < rowNb.value; i++) {
    let row = [];
    for (let j = 0; j < columnNb.value; j++) {
      const cellIndex = i * columnNb.value + j;
      const cell = mazeContainer.children[cellIndex];
      const backgroundImage = cell.style.backgroundImage;
      switch(backgroundImage){
        case 'url("images/blue.png")' :
        row.push("*");
        break;
        case 'url("images/green.png")' :
          row.push(".");
          break;
        case 'url("images/start.png")' :
            row.push("S");
            break;
        case 'url("images/end.png")' :
          row.push("T");
          break;
        default:
          row.push(""); 
          break;
        }
  }
    maze.push(row);
  }
  const mazeJSON = JSON.stringify(maze);
  console.log(mazeJSON );

  // Enregistrement dans un fichier JSON
  const blob = new Blob([mazeJSON], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "maze.json";
  a.click();
};
saveBtn.addEventListener("click", saveMaze);

function dragStart(e) {
  this.classList.add("dragging");
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
  this.classList.remove("dragging");
}
for (let i = 0; i < palette.children.length; i++) {
  palette.children[i].style.width = "64px";
  palette.children[i].style.height = "64px";
  palette.children[i].draggable = true;
  palette.children[i].addEventListener("dragstart", dragStart);
  palette.children[i].addEventListener("dragend", dragEnd);
}

let main = document.querySelector("main");
main.style.display = "flex";


menu.appendChild(columnNb);
menu.appendChild(rowNb);
menu.appendChild(submitBtn);
menu.appendChild(palette);
menu.appendChild(saveBtn);
menu.style.display = "flex";
menu.style.flexDirection = "column";

main.appendChild(mazeContainer);
main.appendChild(menu);
