document.body.style.justifyContent=  "center";
document.body.style.alignItems ='center';
const updatePalette = () =>{
  path.style.backgroundImage='url(images/'+folder+'/green.png)';
  start.style.backgroundImage = 'url(images/'+folder+'/start.png)';
  end.style.backgroundImage = 'url(images/'+folder+'/end.png)';
}
let folder ="res0";
document.body.style.backgroundImage='url(images/'+folder+'/aziza.png)'
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
    const newId = draggableElement.id; // take the id of the lelected div of the palette
    this.style.backgroundImage = draggableElement.style.backgroundImage;
    this.classList.remove("hovered");
    //the div of the grid append the id of the div of the palette
    this.id = newId;

    // delete the div at that position
    while (this.firstChild) {
      this.firstChild.remove();
    }

    // add the selected div from the palette to the grid
    const cell = document.createElement("div");
    cell.style.backgroundImage = draggableElement.style.backgroundImage;
    cell.id = newId;
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
              cell.id='wall';
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
world.style.width = "60%";
world.style.backgroundColor="rgba(37,24,2,0.61)"
world.style.border='13px groove rgba(37,24,2,0.61)'
world.style.color="blanchedalmond";
world.style.fontWeight="bold";
world.style.padding="10px";
world.style.fontSize ="25px"
let labelWorld =document.createElement('label');
labelWorld.setAttribute('for', 'world');
labelWorld.innerText =" Select The World"
let world1 = document.createElement("option");
world1.setAttribute('value', '0');
world1.style.backgroundColor ="#376915";
world1.style.color='pink';

world1.innerText = 'Earth';
let world2 = document.createElement("option");
world2.setAttribute('value', '1');

world2.style.backgroundColor ="#9ff3d3";
world2.style.color='bleu';

world2.innerText = 'Ice';
let world3 = document.createElement("option");
world3.setAttribute('value', '2');
world3.style.color ="yellow";

world3.style.backgroundColor ="red";
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
      document.body.style.backgroundImage='url(images/'+folder+'/aziza.png)'
  }else if(worldSelected =="1"){
    folder = "res1";
    updatePalette();
    document.body.style.backgroundImage='url(images/'+folder+'/aziza.png)'
  }else if(worldSelected =="2"){
    folder = "res2";
    updatePalette();
    document.body.style.backgroundImage='url(images/'+folder+'/aziza.png)'
}
}
//input column and row values
let columnNb = document.createElement("input");
let labelColumnNb = document.createElement('label');
labelColumnNb.setAttribute('for', 'colomnNb');
labelColumnNb.innerText = 'Number of columns';
columnNb.style.padding="10px";

columnNb.style.fontSize ="25px"
columnNb.style.backgroundColor="rgba(37,24,2,0.61)"
columnNb.style.border='13px groove rgba(37,24,2,0.61)'
columnNb.style.color="blanchedalmond";
columnNb.setAttribute('min','3');
columnNb.type = "number";
columnNb.id = "columnNb";

let rowNb = document.createElement("input");
let labelRowNb = document.createElement('label');
labelRowNb.setAttribute('for', 'rowNb');
rowNb.setAttribute('min','3');
labelRowNb.innerText = 'Number of rows';
rowNb.style.fontSize ="25px"
rowNb.style.padding="10px";

rowNb.style.backgroundColor="rgba(37,24,2,0.61)"
rowNb.style.border='13px groove rgba(37,24,2,0.61)'
rowNb.style.color="blanchedalmond";
rowNb.type = "number";
rowNb.id = "rowNb";
//style labels
labelWorld.style.fontSize ="20px";
labelWorld.style.color="#e7cdcd";
labelWorld.style.fontWeight="bold";
labelWorld.style.fontStyle ="italic";
labelWorld.style.textAlign ='center';

labelColumnNb.style.fontSize ="20px";
labelColumnNb.style.color="#e7cdcd";
labelColumnNb.style.fontWeight="bold";
labelColumnNb.style.fontStyle ="italic";
labelColumnNb.style.textAlign ='center';

labelRowNb.style.fontSize ="20px";
labelRowNb.style.color="#e7cdcd";
labelRowNb.style.fontWeight="bold";
labelRowNb.style.fontStyle ="italic";
labelRowNb.style.textAlign ='center';

// botton to generate maze
let submitBtn = document.createElement("button");
submitBtn.textContent = "Generate Maze";
submitBtn.style.marginTop = '15px';
submitBtn.style.fontSize ="25px"
submitBtn.style.backgroundColor="rgba(37,24,2,0.61)"
submitBtn.style.border='13px groove rgba(37,24,2,0.61)'
submitBtn.style.color="blanchedalmond";
submitBtn.style.cursor ="pointer";
submitBtn.addEventListener("click", generateGrid);

// palette of divisions
let palette = document.createElement("div");
palette.style.display = "flex";
palette.style.justifyContent= "space-around" ;



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

//save maze btn
let saveBtn = document.createElement("p");
saveBtn.textContent = "SAVE";




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
//start menu btn
let startmenu = document.createElement('div');
startmenu.textContent='START MENU';
startmenu.addEventListener('click', ()=>{

});
//Quit btn
quitBtn = document.createElement('div');
quitBtn.textContent = "QUIT";

//quitbtn eventlistner 
quitBtn.addEventListener('click', () => {
  console.log("quit");
  exitDialogue="Don't forget to save your map Nigga !"
  if(confirm(exitDialogue)==true){
    window.close();
  }


});

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
main.style.backgroundImage= "url(images/UI/black.png)";
main.style.display = "flex";
main.style.fontFamily ="'Chakra Petch', sans-serif"
main.style.justifyContent='space-evenly';
main.style.flexDirection ="row";
main.style.width ="100vw";
main.style.height ="auto";
main.style.border='13px groove rgba(37,24,2,0.61)'
//change world topic
let changeWorld = document.createElement("p");
changeWorld.textContent="Change WORLD";

const worldChanger =() =>{
  if(folder=='res0'){
    folder='res1';
  }else if(folder=='res1'){
    folder='res2';
  }else if(folder=='res2'){
    folder='res0';
  }
  for (let tile of mazeTab.children) {
    switch(tile.id){
      case 'wall' : 
      tile.style.backgroundImage='url("images/'+folder+'/blue.png")';
      break;
      case 'path' :
      tile.style.backgroundImage='url("images/'+folder+'/green.png")';
      break;
      case 'start' :
        tile.style.backgroundImage='url("images/'+folder+'/start.png")';
        break;
        case 'end' :
          tile.style.backgroundImage='url("images/'+folder+'/end.png")';
          break;
          default:
            console.log(ERROR);
    }

  }
  updatePalette();
  document.body.style.backgroundImage='url(images/'+folder+'/aziza.png)'


}
changeWorld.addEventListener("click", worldChanger);
let buttons = document.createElement('div');

buttons.appendChild(palette);
buttons.appendChild(changeWorld)
buttons.appendChild(saveBtn);
buttons.appendChild(startmenu);
buttons.appendChild(quitBtn);
for(let btn of buttons.children){
  btn.style.padding ='10px';
  btn.style.fontFamily ='25px';
  btn.style.backgroundColor="rgba(37,24,2,0.61)"
  btn.style.border='13px groove rgba(37,24,2,0.61)'
  btn.style.fontWeight="bold";
  btn.style.fontSize ="25px";
  btn.style.textAlign ="center";
  btn.style.color ="blanchedalmond";
  btn.style.cursor="pointer";
}
menu.appendChild(labelWorld);
menu.appendChild(world);
menu.appendChild(labelColumnNb);
menu.appendChild(columnNb);
menu.appendChild(labelRowNb);
menu.appendChild(rowNb);
menu.appendChild(submitBtn);

menu.style.display = "flex";
menu.style.flexDirection = "column";
menu.style.padding="10px";
for(let btn of menu.children){
 btn.style.width="246px"
}
rowNb.style.width="200px"
columnNb.style.width="200px"

main.appendChild(menu);
main.appendChild(mazeTab);
main.appendChild(buttons);

