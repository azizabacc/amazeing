const updatePalette = () =>{
  path.style.backgroundImage='url(images/'+folder+'/green.png)';
  start.style.backgroundImage = 'url(images/'+folder+'/start.png)';
  end.style.backgroundImage = 'url(images/'+folder+'/end.png)';
}
let folder ="res0";
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
      mazeTab.innerHTML = "";
  
      for (let i = 0; i < rowCount; i++) {
          for (let j = 0; j < columnCount; j++) {
              const cell = document.createElement("div");
              cell.style.backgroundImage = 'url(images/'+folder+'/blue.png)';
              cell.addEventListener("dragover", dragOver);
              cell.addEventListener("dragenter", dragEnter);
              cell.addEventListener("dragleave", dragLeave);
              cell.addEventListener("drop", drop);
              mazeTab.appendChild(cell);
          }
      }
  
      styleMaze(mazeTab, columnCount, rowCount);
  }


let mazeTab = document.createElement("div");
mazeTab.id = "mazeTab";

let menu = document.createElement("div");

//select world
let world = document.createElement("select")
let labelWorld =document.createElement('label');
labelWorld.setAttribute('for', 'world');
labelWorld.innerText =" Select The World"
let world1 = document.createElement("option");
world1.setAttribute('value', '0');
world1.innerText = 'Earth';
let world2 = document.createElement("option");
world2.setAttribute('value', '1');
world2.innerText = 'Ice';
let world3 = document.createElement("option");
world3.setAttribute('value', '2');
world3.innerText = 'Fire';
world.appendChild(world1);
world.appendChild(world2);
world.appendChild(world3);
// event listner for world selection
world.onchange = function(){
  const worldSelected = world.value;
  console.log(worldSelected);
  if(worldSelected =="0"){
      folder = "res0";
      updatePalette();
      document.body.style.backgroundColor="black";
      document.body.style.color = "white"; 
  }else if(worldSelected =="1"){
    folder = "res1";
    updatePalette();
      document.body.style.backgroundColor="white";
      document.body.style.color = "black"; 
  }else if(worldSelected =="2"){
    folder = "res2";
    updatePalette();
    document.body.style.backgroundColor="white";
    document.body.style.color = "black"; 
}
}
//input column and row values
let columnNb = document.createElement("input");
let labelColumnNb = document.createElement('label');
labelColumnNb.setAttribute('for', 'colomnNb');
labelColumnNb.innerText = 'Number of columns';
columnNb.type = "number";
columnNb.id = "columnNb";

let rowNb = document.createElement("input");
let labelRowNb = document.createElement('label');
labelRowNb.setAttribute('for', 'rowNb');
labelRowNb.innerText = 'Number of rows';
rowNb.type = "number";
rowNb.id = "rowNb";

// botton to generate maze
let submitBtn = document.createElement("button");
submitBtn.textContent = "Generate Maze";
submitBtn.addEventListener("click", generateGrid);

// palette of divisions
let palette = document.createElement("div");
palette.style.display = "flex";



let path = document.createElement("div");
//path.style.backgroundImage='url(images/'+folder+'/green.png)';
path.id= "path";

let start = document.createElement("div");
//start.style.backgroundImage = 'url(images/'+folder+'/start.png)';
start.id = "start";

let end = document.createElement("div");
//end.style.backgroundImage = 'url(images/'+folder+'/end.png)';
end.id = "end";
updatePalette();
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
      const cell = mazeTab.children[cellIndex];
      const backgroundImage = cell.style.backgroundImage;
      switch(backgroundImage){
        case 'url("images/'+folder+'/blue.png")' :
        row.push("*");
        break;
        case 'url("images/'+folder+'/green.png")' :
          row.push(".");
          break;
        case 'url("images/'+folder+'/start.png")' :
            row.push("S");
            break;
        case 'url("images/'+folder+'/end.png")' :
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
main.style.flexDirection ="row";
main.style.width ="auto";
main.style.fontFamily ="'Kablammo', cursive";
//change world topic
let changeWorld = document.createElement("p");
changeWorld.textContent="Change WORLD";
changeWorld.style.backgroundColor = "#077bc2";
changeWorld.style.borderRadius ="10px";
changeWorld.style.textAlign ="center";
changeWorld.style.fontSize ="40px";
changeWorld.style.fontWeight="bold";
changeWorld.style.color ="white";

const worldChanger =() =>{
  path.style.backgroundImage='url(green.png)';
  start.style.backgroundImage='url(start.png)';
  end.style.backgroundImage='url(end.png)';
}
changeWorld.addEventListener("click", worldChanger);
menu.appendChild(labelWorld);
menu.appendChild(world);
menu.appendChild(labelColumnNb);
menu.appendChild(columnNb);
menu.appendChild(labelRowNb);
menu.appendChild(rowNb);
menu.appendChild(submitBtn);
menu.appendChild(palette);
menu.appendChild(changeWorld);
menu.appendChild(saveBtn);

menu.style.display = "flex";
menu.style.flexDirection = "column";
menu.style.alignItems ="center";

main.appendChild(mazeTab);
main.appendChild(menu);

main.appendChild(mazeEditor);
