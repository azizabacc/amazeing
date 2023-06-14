import { LEVEL_1, LEVEL_2, LEVEL_3 ,LEVEL_4} from './levels.js';
let indexlevel = 1;
let LEVEL =[];
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
  map.style.backgroundColor = "#6afffc";
  map.style.width = "fit-content";
};

const createMaze = (LIST,folder)=> {

  styleMaze(mazeContainer, LIST);
  for (let i = 0; i < LIST.length; i++) {
    LEVEL[i] = LIST[i].slice();
    for (let j = 0; j < LIST[i].length; j++) {
      const cell = document.createElement("div");
      cell.style.borderRadius = "10px";

      if (LIST[i][j] === "*") {
        cell.textContent=`(${i},${j})`;
        cell.classList.backgroundImage = "url(../images/res0/blue.png)";
        console.log("images/"+folder+"/blue.png");
      } else if (LIST[i][j] === ".") {
        cell.textContent=`(${i},${j})`;
        cell.classList.backgroundImage = "url(images/"+folder+"/green.png)";
      } else if (LIST[i][j] === "S") {
        cell.textContent=`(${i},${j})`;
        cell.classList.add("player");
        cell.style.backgroundImage = "url(images/aziza.png)";
      } else if (LIST[i][j] === "T") {
        cell.textContent=`(${i},${j})`;
        cell.classList.add("end");
        cell.style.backgroundImage = "url(images/"+folder+"/end.png)";
      }

      mazeContainer.appendChild(cell);
    }
  }

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
      if(indexlevel==2){
        while (mazeContainer.firstChild) {
          mazeContainer.removeChild(mazeContainer.firstChild);
        }
        console.log("container children : ", mazeContainer.children);
        createMaze(LEVEL_2,"res1");
  
      }
      if(indexlevel==3){
        while (mazeContainer.firstChild) {
          mazeContainer.removeChild(mazeContainer.firstChild);
        }
        console.log("container children : ", mazeContainer.children);
        createMaze(LEVEL_3,"res2");
  
      }
      if(indexlevel==4){
        while (mazeContainer.firstChild) {
          mazeContainer.removeChild(mazeContainer.firstChild);
        }
        console.log("container children : ", mazeContainer.children);
        createMaze(LEVEL_4,"res2");
  
      }

      
    }
  }
}
// move function eventlistener
const moveEventListener=(event) =>{
    if (event.code === "ArrowRight") {
      move(1);
    } else if (event.code === "ArrowLeft") {
      move(-1);
    } else if (event.code === "ArrowDown") {
      move(LEVEL[0].length);
    } else if (event.code === "ArrowUp") {
      move(-LEVEL[0].length);
    }
}



let main = document.querySelector("main");
main.style.display="flex";
let mazeContainer = document.createElement("div");
mazeContainer.id = "mazeContainer";
//let playButton = document.createElement('div');
//playButton.style.backgroundImage ="url(images/startButton.png)"
let player = document.createElement("div");
player.classList.add("player");

player.style.backgroundImage = "url(images/aziza.png)";
main.appendChild(mazeContainer);



// Call the createMaze function to generate the maze
createMaze(LEVEL_1,"res0")
document.addEventListener("keydown", moveEventListener);



