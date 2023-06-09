const LEVEL_1 = [
  ["*","*","*","*","*","*","*","*","*","*","*",".","*"],
  ["*","S",".",".",".",".",".","*","*",".","*",".","T"],
  ["*","*","*","*","*",".",".",".",".",".","*",".","*"],
  ["*","*","*","*","*",".","*","*","*",".","*",".","*"],
  ["*","*","*","*","*",".","*","*","*","*","*",".","*"],
  ["*","*","*","*","*",".","*","*","*","*","*",".","*"],
  ["*","*","*","*","*",".",".",".",".",".",".",".","*"],
  ["*","*","*","*","*",".","*","*","*","*","*","*","*"],
  ["*",".",".",".",".",".",".",".",".",".","*","*","*"],
  ["*",".","*","*","*","*","*","*",".",".",".","*","*"],
  ["*",".",".",".",".","*","*","*","*","*","*","*","*"],
  ["*","*","*","*","*","*","*","*","*","*","*","*","*"]
]

const LEVEL_2 = [
  ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],
  ["*",".",".","S",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","*"],
  ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*",".","*"],
  ["*",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","*"],
  ["*",".","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"],
  ["*",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","T"],
  ["*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*","*"]
]

const LEVEL_3 = [
  ["*","*","*","*","*","*","*","*"],
  ["*","*","*","*","S","*","*","*"],
  ["*","*","*","*",".","*","*","*"],
  ["*","*","*","*",".","*","*","*"],
  ["*","*","*","*",".","*","*","*"],
  ["*",".",".",".",".",".",".","*"],
  ["*",".","*","*","*","*",".","*"],
  ["*",".",".","*","*","*",".","*"],
  ["*",".",".","*","*","*",".","*"],
  ["*","*",".","*","*","*","*","*"],
  ["*","T",".","*","*","*","*","*"],
  ["*","*","*","*","*","*","*","*"]
]
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

// Call the createMaze function to generate the maze
createMaze(LEVEL_1);
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowRight") {
    let index = 0;
    for (let i = 0; i < mazeContainer.children.length-1; i++) {
      if (mazeContainer.children[i].classList.contains('player') && mazeContainer.children[i+1].classList.contains('path')) {
        switchClass(mazeContainer.children[i],mazeContainer.children[i+1])
        mazeContainer.children[i].style.backgroundImage="url(images/green.png)"
        mazeContainer.children[i+1].style.backgroundImage="url(images/aziza.png)"
        index = i;
        console.log("Position de div.end :", index);
        break;
      }else if(mazeContainer.children[i].classList.contains('player') && mazeContainer.children[i+1].classList.contains('end')){
        alert("we have a winner ! ")
        break;
      }
    }
  }
  else if (event.code === "ArrowLeft") {
    let index = 0;
    for (let i = 0; i < mazeContainer.children.length+1; i++) {
      if (mazeContainer.children[i].classList.contains('player') && mazeContainer.children[i-1].classList.contains('path')) {
        switchClass(mazeContainer.children[i],mazeContainer.children[i-1])
        mazeContainer.children[i].style.backgroundImage="url(images/green.png)"
        mazeContainer.children[i-1].style.backgroundImage="url(images/aziza.png)"
        index = i;
        console.log("Position de div.end :", index);
        break;
      }else if(mazeContainer.children[i].classList.contains('player') && mazeContainer.children[i-1].classList.contains('end')){
        alert("we have a winner ! ")
        break;
      }
    }
   
  }
  else if (event.code === "ArrowDown") {
    let index = 0;
    for (let i = 0; i < mazeContainer.children.length+1; i++) {
      if (mazeContainer.children[i].classList.contains('player') && mazeContainer.children[i+LEVEL_1[0].length].classList.contains('path')) {
        switchClass(mazeContainer.children[i],mazeContainer.children[i+LEVEL_1[0].length])
        mazeContainer.children[i].style.backgroundImage="url(images/green.png)"
        mazeContainer.children[i+LEVEL_1[0].length].style.backgroundImage="url(images/aziza.png)"
        index = i;
        console.log("Position de div.end :", index);
        break;
      }else if(mazeContainer.children[i].classList.contains('player') && mazeContainer.children[i+LEVEL_1[0].length].classList.contains('end')){
        alert("we have a winner ! ")
        break;
      }
    }

  }  else if (event.code === "ArrowUp") {
    let index = 0;
    for (let i = 0; i < mazeContainer.children.length+1; i++) {
      if (mazeContainer.children[i].classList.contains('player') && mazeContainer.children[i-LEVEL_1[0].length].classList.contains('path')) {
        switchClass(mazeContainer.children[i],mazeContainer.children[i-LEVEL_1[0].length])
        mazeContainer.children[i].style.backgroundImage="url(images/green.png)"
        mazeContainer.children[i-LEVEL_1[0].length].style.backgroundImage="url(images/aziza.png)"
        index = i;
        console.log("Position de div.end :", index);
        break;
      }else if(mazeContainer.children[i].classList.contains('player') && mazeContainer.children[i-LEVEL_1[0].length].classList.contains('end')){
        alert("we have a winner ! ")
        break;
      }
    }

  }
});



