var board= {
  width: 800,
  height: 750,
  sprite: document.getElementById("board")
};
var player = {
  speed: 50, 
  x_position: 0,
  y_position: 0,
  width: 50,
  height: 50,
  sprite: document.getElementById("player")
};



//Walls position on the map
let walls = [
  { x_position: 250, y_position: 50, width: 50, height: 250 },
  { x_position: 50, y_position: 50, width: 50, height: 100 },
  { x_position: 350, y_position: 50, width: 150, height: 50 },
  { x_position: 350, y_position: 0, width: 50, height: 50 },
  { x_position: 450, y_position: 100, width: 200, height: 50 },
  { x_position: 400, y_position: 300, width: 100, height: 100 },
  { x_position: 450, y_position: 200, width: 150, height: 50 },
  { x_position: 50, y_position: 200, width: 50, height: 200 },
  { x_position: 350, y_position: 150, width: 50, height: 200 },
  { x_position: 150, y_position: 0, width: 50, height: 200 },
  { x_position: 150, y_position: 0, width: 50, height: 200 },
  { x_position: 700, y_position: 50, width: 50, height: 100 },
  { x_position: 650, y_position: 50, width: 50, height: 50 },
  { x_position: 650, y_position: 200, width: 50, height: 250 },
  { x_position: 550, y_position: 0, width: 50, height: 50 },
  { x_position: 550, y_position: 300, width: 50, height: 100 },
  { x_position: 0, y_position: 300, width: 50, height: 50 },
  { x_position: 150, y_position: 250, width: 100, height: 100 },
  { x_position: 50, y_position: 450, width: 50, height: 100 },
  { x_position: 0, y_position: 600, width: 350, height: 50 },
  { x_position: 0, y_position: 700, width: 150, height: 50 },
  { x_position: 150, y_position: 400, width: 50, height: 200 },
  { x_position: 250, y_position: 400, width: 100, height: 100 },
  { x_position: 250, y_position: 550, width: 50, height: 150 },
  { x_position: 350, y_position: 500, width: 150, height: 50 },
  { x_position: 400, y_position: 450, width: 200, height: 50 },
  { x_position: 350, y_position: 700, width: 150, height: 50 },
  { x_position: 400, y_position: 600, width: 150, height: 50 },
  { x_position: 600, y_position: 550, width: 50, height: 150 },
  { x_position: 750, y_position: 200, width: 50, height: 100 },
  { x_position: 700, y_position: 350, width: 100, height: 50 },
  { x_position: 750, y_position: 450, width: 50, height: 150 },
  { x_position: 700, y_position: 650, width: 100, height: 50 },
  { x_position: 650, y_position: 500, width: 50, height: 100 },
];

//Random locations in the map within the board
let Random = [
  50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800
];



// #region Puzzle Piece

var div = document.createElement("div");
div.style.left = "0px";
div.style.top = "0px";
div.style.width = "50px";
div.style.height = "50px";
div.style.position = "fixed";
div.setAttribute("id", "puzzle");
board.sprite.appendChild(div);

// #Regionend

var puzzle = {
  // speed: 50, 
  x_position: 0,
  y_position: 0,
  width: 50,
  height: 50,
  sprite: div
};

var timeID;

let txt_score = document.getElementById("score");
let score = 0;
let max_score = 4;
let pause = true;


//Create Walls
walls.forEach(function (item) {
  var div = document.createElement("div");
  div.style.left = item.x_position + "px";
  div.style.top = item.y_position + "px";
  div.style.width = item.width + "px";
  div.style.height = item.height + "px";
  div.style.position = "absolute";
  div.setAttribute("class", "walls");
  board.sprite.appendChild(div);
});

function totalScore(){
  var elscorebest = score;
  window.location.href = window.location.href + "?puntosfinales=" + elscorebest;
}

function openMenu(isWin){
  reset();
  setTimeout(function (){
    if(isWin){
      alert("Has ganado");
      totalScore();
    }else{
      alert("Has perdido");
      totalScore();  
    }
  }, 10); 
}

function reset(){
    pause = true;
    var TimeButton = document.getElementById("TimeButton");
    TimeButton.style.visibility = "visible";

    update(player, "init", 0, 0);
    clearInterval(timeID);
    
}

function AddScore(inc = 1){
  score += inc;
  txt_score.innerHTML = score + "/" + max_score;
}

function RandomMovement(entity, init_pos_included = false){
  tries = 10;
  let current_pos_x = entity.x_position;
  let current_pos_y = entity.y_position;
  while(!update(entity, "Init", Random[Math.floor(Math.random() * Random.length)], Random[Math.floor(Math.random() * Random.length)])
  || (current_pos_x == entity.x_position && current_pos_y == entity.y_position && !init_pos_included)){
    console.log(10 - tries);
    tries--;
    if(tries <= 0){
      update(entity, "Init", Random[Math.floor(Math.random() * Random.length)], Random[Math.floor(Math.random() * Random.length)]);
      break;
    }
  };
}

//Player collission with puzzle piece
update(player, "Init");
RandomMovement(puzzle, true);


// #region Ref Style

board.sprite.style.width = board.width + "px";
board.sprite.style.height = board.height + "px";

player.sprite.style.left = player.x_position + "px";
player.sprite.style.top = player.y_position + "px";
player.sprite.style.width = player.width + "px";
player.sprite.style.height = player.height + "px";

// #endregion

//Puzzle random location when colliding with player.
document.onkeydown = function (event) {
  // console.log(event);
  if(!pause){
    update(player, event.key);
    if(isCollide(player.x_position, player.y_position, player.width, player.height, puzzle)){
      AddScore();
      if(score < max_score){
        RandomMovement(puzzle);
      }
      else{
        openMenu(true);
      }
    };
  }
  else{
    // reset();
  }
};
//Check objects Collission with movement.
function checkMove(x, y, w, h) {
  var i;
  var len = walls.length;
  var result = false;
    if(x <= board.width - w &&
      x >= 0 &&
      y <= board.height - h &&
      y >= 0) 
    {

      for (i = 0; i < len; i++) {
        if (isCollide(x, y, w, h ,walls[i])) {
          result = false;
          break;
        } else {
          result = true;
        }
      }
    }
  
  return result;
}


//Objects collissions.
function isCollide(x, y, w, h, b) {
  return (
    !(y + h <= b.y_position ||
    y >= b.y_position + b.height ||
    x + w <= b.x_position ||
    x >= b.x_position + b.width)
  );
}

//Updates positions and speed of objects.
function update(a, action, new_position_x = NaN, new_position_y = NaN) {
  let final_speed_x = 0;
  let final_speed_y = 0;
  let result = false;
  if ( action == "ArrowRight") {
    final_speed_x = a.speed;  
  }
  else if (action == "ArrowLeft") {
    final_speed_x = -a.speed;
  }
  else if (action == "ArrowDown") {
    final_speed_y = a.speed;
  }
  else if (action == "ArrowUp" ) {
    final_speed_y = -a.speed;
  }
  if(isNaN(new_position_x)){
    new_position_x = a.x_position + final_speed_x;
  }
  if(isNaN(new_position_y)){
    new_position_y = a.y_position + final_speed_y;
  }
  if (checkMove(new_position_x, new_position_y, a.width, a.height)) {
    a.x_position = new_position_x;
    a.y_position = new_position_y;
    a.sprite.style.left = a.x_position + "px";
    a.sprite.style.top = a.y_position + "px";
    result = true;
  } 
 
  let x = a.x_position + a.width / 2;
  let y = a.y_position + a.height / 2;
  console.log(x, y);
  if(a.sprite.id == "player"){
    document.documentElement.style.setProperty("--cX", x + "px");
    document.documentElement.style.setProperty("--cY", y + "px");
  }
  return(result);
}


//Progress Bar timer made with setInterval
function timer() {
  pause = false;
  score = 0;
  txt_score.innerHTML = score + "/" + max_score;
  RandomMovement(puzzle, true);
  var TimeButton = document.getElementById("TimeButton");
  TimeButton.style.visibility = "hidden";
  const element = document.getElementById("bar");
  let width = 1;
  timeID = setInterval(frame, 630);
  function frame() {
    if (width == 95) {
      openMenu(false);
    } else {
      width++;
      element.style.width = width + "%";
    }
  }
}
