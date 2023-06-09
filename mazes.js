import { LEVEL_1, LEVEL_2, LEVEL_3 } from './levels.js';
function switchClass(element1, element2) {
  const tempClass = element1.className;
  element1.className = element2.className;
  element2.className = tempClass;
}

const styleMaze = (map, LIST) => {
  map.style.display = "grid";
  map.style.gridTemplateColumns = `repeat(${LIST[0].length}, 64px)`;
  map.style.gridTemplateRows = `repeat(${LIST.length}, 64px)`;
  map.style.gap = "1px";
  map.style.backgroundColor = "yellow";
  map.style.width = "fit-content";
};
let main = document.querySelector("main");
main.style.display="flex";
let mazeContainer = document.createElement("div");
mazeContainer.id = "mazeContainer";


let player = document.createElement("div");
player.classList.add("player");


function createMaze(LIST) {
  styleMaze(mazeContainer, LIST);
  for (let i = 0; i < LIST.length; i++) {
    for (let j = 0; j < LIST[i].length; j++) {
      const cell = document.createElement("div");

      if (LIST[i][j] === "*") {
        cell.classList.add("wall");
      } else if (LIST[i][j] === ".") {
        cell.classList.add("path");
      } else if (LIST[i][j] === "S") {
        cell.classList.add("player");
        cell.style.backgroundImage = "url(images/aziza.png)";
      } else if (LIST[i][j] === "T") {
        cell.classList.add("end");
        cell.style.backgroundImage = "url(images/end.png)";
      }

      mazeContainer.appendChild(cell);
    }
  }
}

player.style.backgroundImage = "url(images/aziza.png)";
main.appendChild(mazeContainer);
//update player position 
const updatePlayerPosition =(i,offset)=>{
  mazeContainer.children[i].style.backgroundImage="url(images/green.png)"
  mazeContainer.children[i+offset].style.backgroundImage="url(images/aziza.png)"
};
//move function
function move(offset) {
  let index = 0;
  for (let i = 0; i < mazeContainer.children.length + 1; i++) {
    if (mazeContainer.children[i].classList.contains('player') && mazeContainer.children[i + offset].classList.contains('path')) {
      switchClass(mazeContainer.children[i], mazeContainer.children[i + offset]);
      updatePlayerPosition(i , offset);
      index = i;
      console.log("Position de div.end :", index);
      break;
    } else if (mazeContainer.children[i].classList.contains('player') && mazeContainer.children[i + offset].classList.contains('end')) {
      alert("we have a winner ! ")
      break;
    }
  }
}
// Call the createMaze function to generate the maze
createMaze(LEVEL_1);
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowRight") {
    move(1);
  } else if (event.code === "ArrowLeft") {
    move(-1);
  } else if (event.code === "ArrowDown") {
    move(LEVEL_1[0].length);
  } else if (event.code === "ArrowUp") {
    move(-LEVEL_1[0].length);
  }
});


