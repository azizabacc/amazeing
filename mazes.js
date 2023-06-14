import { LEVEL_1, LEVEL_2, LEVEL_3 ,LEVEL_4} from './levels.js';

// Fonction pour calculer le temps écoulé
const getElapsedTime = (start) => {
  return Number((Date.now() - start) / 1000).toFixed(2) + 's';
};
//music div 
let audioContainer = document.createElement('div');
let audio = document.createElement('audio');
audio.controls = true;
audio.autoplay = false;
audio.textContent = 'Your browser does not support the audio file.';
let audioSource = document.createElement('source');
audioSource.src="audio/level1.mp3"

let indexlevel = 1;
let folder = "res0";
let LEVEL = [];

const switchClass = (element1, element2) => {
  const tempClass = element1.className;
  element1.className = element2.className;
  element2.className = tempClass;
};

const updatePlayerPosition = (i, offset, folder) => {
  mazeContainer.children[i].style.backgroundImage = "url(images/" + folder + "/green.png)";
  mazeContainer.children[i + offset].style.backgroundImage = "url(images/" + folder + "/aziza.png)";
};

const styleMaze = (map, LIST) => {
  map.style.display = "grid";
  map.style.gridTemplateColumns = `repeat(${LIST[0].length}, 64px)`;
  map.style.gridTemplateRows = `repeat(${LIST.length}, 64px)`;
  map.style.gap = "1px";
  map.style.backgroundColor = "#6afffc";
  map.style.width = "fit-content";
};

let start = 0;

const createMaze = (LIST, folder, startTime) => {
  styleMaze(mazeContainer, LIST);
  for (let i = 0; i < LIST.length; i++) {
    LEVEL[i] = LIST[i].slice();
    for (let j = 0; j < LIST[i].length; j++) {
      const cell = document.createElement("div");
      cell.style.borderRadius = "10px";

      if (LIST[i][j] === "*") {
        cell.textContent = `(${i},${j})`;
        cell.classList.add("wall");
        cell.style.backgroundImage = "url(../images/" + folder + "/blue.png)";
        console.log("images/" + folder + "/blue.png");
      } else if (LIST[i][j] === ".") {
        cell.textContent = `(${i},${j})`;
        cell.classList.add("path");
        cell.style.backgroundImage = "url(images/" + folder + "/green.png)";
      } else if (LIST[i][j] === "S") {
        cell.textContent = `(${i},${j})`;
        cell.classList.add("player");
        cell.style.backgroundImage = "url(images/" + folder + "/aziza.png)";
      } else if (LIST[i][j] === "T") {
        cell.textContent = `(${i},${j})`;
        cell.classList.add("end");
        cell.style.backgroundImage = "url(images/" + folder + "/end.png)";
      }

      mazeContainer.appendChild(cell);
    }
  }
  //start timer
  start = startTime;
};

function move(offset) {
  for (let i = 0; i < mazeContainer.children.length; i++) {
    const currentCell = mazeContainer.children[i];
    const nextCell = mazeContainer.children[i + offset];

    if (currentCell.classList.contains('player') && nextCell.classList.contains('path')) {
      switchClass(currentCell, nextCell);
      updatePlayerPosition(i, offset, folder);
      break;
    } else if (currentCell.classList.contains('player') && nextCell.classList.contains('end')) {
      console.log(getElapsedTime(start));
      alert("we have a winner! ");
      indexlevel++;
      if (indexlevel == 2) {
        folder = "res1";
        audioSource.src="audio/level2.mp3"
        audio.load(); // Recharge la source audio
        while (mazeContainer.firstChild) {
          mazeContainer.removeChild(mazeContainer.firstChild);
        }
        createMaze(LEVEL_2, folder, Date.now());
      }
      if (indexlevel == 3) {
        folder = "res2";
        audioSource.src="audio/level3.mp3"
        audio.load(); // Recharge la source audio
        while (mazeContainer.firstChild) {
          mazeContainer.removeChild(mazeContainer.firstChild);
        }
        createMaze(LEVEL_3, folder, Date.now());
      }
      if (indexlevel == 4) {
        while (mazeContainer.firstChild) {
          mazeContainer.removeChild(mazeContainer.firstChild);
        }
        console.log("container children : ", mazeContainer.children);
        createMaze(LEVEL_4, folder, Date.now());
      }
    }
  }
}

const moveEventListener = (event) => {
  if (event.code === "ArrowRight") {
    move(1);
  } else if (event.code === "ArrowLeft") {
    move(-1);
  } else if (event.code === "ArrowDown") {
    move(LEVEL[0].length);
  } else if (event.code === "ArrowUp") {
    move(-LEVEL[0].length);
  }
};

let main = document.querySelector("main");
document.body.style.backgroundImage = "url(images/UI/black.png)";

main.setAttribute("style", '');
main.style.display = "flex";
main.style.alignItems = "center";
main.style.justifyContent = "center";
main.style.flexDirection ="column";
main.style.width ="1276px";
//header div
let headerGame = document.createElement('div');
headerGame.style.display = 'flex';
headerGame.style.alignItems ='center';
headerGame.style.width="100%";
headerGame.style.justifyContent = "space-around";

// timer div
let timerDiv = document.createElement("div");
timerDiv.id = "timer";
timerDiv.style.color ="white"
timerDiv.style.font = "50px";
headerGame.appendChild(timerDiv);

// append audio
audio.appendChild(audioSource);
audioContainer.appendChild(audio);
headerGame.appendChild(audioContainer);

let mazeContainer = document.createElement("div");
mazeContainer.id = "mazeContainer";
main.appendChild(headerGame);
main.appendChild(mazeContainer);


// repeatedly call the updateTimer function at regular intervals. 
//In this case, updateTimer is called every 1000 milliseconds, which is every second.
setInterval(updateTimer, 1000);

// Time update function
function updateTimer() {
  let elapsedTime = getElapsedTime(start);
  timerDiv.textContent = "Temps écoulé : " + elapsedTime;
}

createMaze(LEVEL_1, folder, Date.now());
document.addEventListener("keydown", moveEventListener);
