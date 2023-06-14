//costum body
document.body.style.display= "flex";
document.body.style.justifyContent ="center";
document.body.style.backgroundImage ="url(images/res2/green.png)";
document.body.style.height ="876px";

// select main et style it
let main = document.querySelector("main");
main.style.backgroundImage =('url(images/UI/mainMenu.png');
main.style.width ="1276px";

//main.style.height = "960px"
main.style.display="flex";
main.style.flexDirection ='column';


//create header
let header = document.createElement('header');
header.style.height = "10vh"
//change the fullscreenbtn onclick
const zoomAndRotate = (size)=> {
    fullscreenBtn.style.transform = 'rotate(360deg)';
    fullscreenBtn.style.fontSize = size;
  }

// full screen fct
const fullScreen =()=> {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      // No element in full screen mode => activate full screen mode
      zoomAndRotate('1.5em');
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Support for Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { //  for Chrome, Safari, Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // for Internet Explorer et Edge
        document.documentElement.msRequestFullscreen();
      }
    } else {
      // An element is already in full-screen mode => full-screen mode is deactivated.
      zoomAndRotate('2em');
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { 
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { 
        document.msExitFullscreen();
      }
    }

  }
  
  // button to activate and deactivate fullscreen mode 
  let fullscreenBtn = document.createElement('h1');
  fullscreenBtn.innerHTML = "<i class='fas fa-expand fa-lg'></i>";
  fullscreenBtn.style.color = '#e1ff00';
  fullscreenBtn.style.transition = 'transform 0.5s, font-size 0.5s';
  fullscreenBtn.style.textAlign ="end";
  fullscreenBtn.style.marginRight ="40px";
  fullscreenBtn.style.cursor = 'pointer';

  // fullscreen eventlistener
  fullscreenBtn.addEventListener('click', fullScreen);
 // header append children
 header.appendChild(fullscreenBtn);

///////////////////////////////////create page center/////////////////////////////////////////
let center = document.createElement('div');
center.style.display="flex";
center.style.alignItems ="center";
center.style.justifyContent ="space-around";
center.style.flexDirection="column";
center.style.height = "80vh"
center.style.marginTop ="400px";


//start game btn
let startButton = document.createElement("img");
startButton.src = "images/UI/startButton.png";
startButton.style.width ='fit-content';
startButton.style.cursor = 'pointer';
//startbutton eventlistner
//editbutton eventlistner
startButton.addEventListener('click', () => {
    // Charger et exécuter le fichier "generateLevel.js"
    const script = document.createElement('script');
    script.src = 'mazes.js';
    script.type ='module';
    main.innerHTML ='';
    //main.style.backgroundImage="url(images/res0/green.png)";
    document.head.appendChild(script);
  });

//Maze Editor btn
let editButton = document.createElement("img");
editButton.src = "images/UI/editButton.png";
editButton.style.width ='fit-content';
editButton.style.cursor = 'pointer';
//editbutton eventlistner
editButton.addEventListener('click', () => {
    // Charger et exécuter le fichier "generateLevel.js"
    const script = document.createElement('script');
    script.src = 'generateLevel.js';
    main.innerHTML ='';
    main.style.backgroundImage="url(images/res0/green.png)";
    document.head.appendChild(script);
  });

//quit btn
let quitButton = document.createElement("img");
quitButton.src = "images/UI/quitButton.png";
quitButton.style.width ='fit-content';
quitButton.style.cursor = 'pointer';
//quitbutton eventlistner 
quitButton.addEventListener('click', () => {
    window.close();
  });

//center append children
center.appendChild(startButton);
center.appendChild(editButton);
center.appendChild(quitButton);

////////////////////////////////////////////create footer////////////////////////////////////
let footer = document.createElement('footer');
footer.style.height = "10vh"







main.appendChild( header );
main.appendChild(center);
main.appendChild(footer)