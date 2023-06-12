import { LEVEL_1, LEVEL_2, LEVEL_3 } from './levels.js';
let indexlevel = 1;
const switchClass=(element1, element2)=> {
  const tempClass = element1.className;
  element1.className = element2.className;
  element2.className = tempClass;
}
//update player position 
const updatePlayerPosition =(i,offset)=>{
  mazeContainer.children[i].style.backgroundImage="url(images/green.png)"
  mazeContainer.children[i+offset].style.backgroundImage="url(images/aziza.png)"
};

const styleMaze = (map, LIST) => {
  map.style.display = "grid";
  map.style.gridTemplateColumns = `repeat(${LIST[0].length}, 64px)`;
  map.style.gridTemplateRows = `repeat(${LIST.length}, 64px)`;
  map.style.gap = "1px";
  map.style.backgroundColor = "yellow";
  map.style.width = "fit-content";
};

const createMaze = (LIST)=> {
  styleMaze(mazeContainer, LIST);
  for (let i = 0; i < LIST.length; i++) {
    for (let j = 0; j < LIST[i].length; j++) {
      const cell = document.createElement("div");

      if (LIST[i][j] === "*") {
        cell.textContent=`(${i},${j})`;
        cell.classList.add("wall");
      } else if (LIST[i][j] === ".") {
        cell.textContent=`(${i},${j})`;
        cell.classList.add("path");
      } else if (LIST[i][j] === "S") {
        cell.textContent=`(${i},${j})`;
        cell.classList.add("player");
        cell.style.backgroundImage = "url(images/aziza.png)";
      } else if (LIST[i][j] === "T") {
        cell.textContent=`(${i},${j})`;
        cell.classList.add("end");
        cell.style.backgroundImage = "url(images/end.png)";
      }

      mazeContainer.appendChild(cell);
    }
  }
}
// move function eventlistener
const moveEventListener=(LEVEL) =>{
  document.addEventListener("keydown", function(event) {
    if (event.code === "ArrowRight") {
      move(1);
    } else if (event.code === "ArrowLeft") {
      move(-1);
    } else if (event.code === "ArrowDown") {
      move(LEVEL[0].length);
    } else if (event.code === "ArrowUp") {
      move(-LEVEL[0].length);
    }
  });
}
//move function
function move(offset) {
  for (let i = 0; i < mazeContainer.children.length; i++) {
    const currentCell = mazeContainer.children[i];
    const nextCell = mazeContainer.children[i + offset];

    if (currentCell.classList.contains('player') && nextCell.classList.contains('path')) {
      switchClass(currentCell, nextCell);
      updatePlayerPosition(i, offset);
      break;
    } else if (currentCell.classList.contains('player') && nextCell.classList.contains('end')) {
      alert("we have a winner!");
      indexlevel++;
      console.log(indexlevel);
      if (indexlevel === 2) {
        while (mazeContainer.firstChild) {
          mazeContainer.removeChild(mazeContainer.firstChild);
        }
        console.log("mazeContainer.firstChild"+mazeContainer.firstChild);
        createMaze(LEVEL_2);
        moveEventListener(LEVEL_2);
      
        console.log("mazeContainer.children.length : " + mazeContainer.children.length);
        console.log("element of the list : "+LEVEL_2.length*LEVEL_2[0].length)
      } else if (indexlevel === 3) {
        while (mazeContainer.firstChild) {
          mazeContainer.removeChild(mazeContainer.firstChild);
        }
        createMaze(LEVEL_3);
        moveEventListener(LEVEL_3);
      }
    }
  }
}


let main = document.querySelector("main");
main.style.display="flex";
let mazeContainer = document.createElement("div");
mazeContainer.id = "mazeContainer";
let player = document.createElement("div");
player.classList.add("player");

player.style.backgroundImage = "url(images/aziza.png)";
main.appendChild(mazeContainer);


// Call the createMaze function to generate the maze
createMaze(LEVEL_1);
moveEventListener(LEVEL_1);



