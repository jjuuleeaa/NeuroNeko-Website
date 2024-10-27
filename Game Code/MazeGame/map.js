const gameContainer = document.getElementById("gamecontainer");

function createMap() {
  try {
    const map1 = `##########
###    ###
### ##   ,
#   ######
# ###   ##
# ##### ##
#     # ##
# ###   ##
#.########`;

    const map2 = `#########,#####
###       #####
### ###########
### #####   ###
###     ### ###
####### ### ###
#   ### ### ###
# ##### ### ###
#           ###
#######.#######`;
    if (!gameContainer) throw Error();

    const map = Math.floor(Math.random() * 2) == 0 ? map1 : map2;
    const mapContent = map.split("\n");
    gameContainer.style.display = "grid";
    console.log(mapContent.length, mapContent[0].length);
    document.documentElement.style.setProperty(
      "--row",
      `repeat(${mapContent.length}, 1fr)`
    );
    document.documentElement.style.setProperty(
      "--col",
      `repeat(${mapContent[0].length}, 1fr)`
    );
    for (const arr of map) {
      if (arr === "#") createWall();
      else if (arr == " ") createEmptyPath();
      else if (arr == ".") createStartBlock();
      else if (arr == ",") createEmptyPath("end");
      else if (arr == "\n") continue;
      else throw Error("Map file not formated correctly");
    }
  } catch (error) {
    console.log(error);
  }
}

function createWall() {
  try {
    const wall = document.createElement("img");
    wall.src = "./GreenBush.png";
    wall.width = 50;
    wall.classList.add("wall");
    if (!gameContainer) throw Error("game container not found");
    gameContainer.appendChild(wall);
    return wall;
  } catch (error) {
    console.log(error);
  }
}

function createEmptyPath(classToAdd) {
  try {
    const path = document.createElement("div");
    path.classList.add("path");
    if (classToAdd) path.classList.add(classToAdd);
    if (!gameContainer) throw Error("game container not found");
    gameContainer.appendChild(path);
    return path;
  } catch (error) {
    console.log(error);
  }
}

function createDot() {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  return dot;
}

function createStartBlock() {
  const path = createEmptyPath();
  const dot = createDot();
  if (!gameContainer) throw Error("game container not found");
  if (!path) throw Error("Error creating path");
  path.appendChild(dot);
  path.id = "hasDot";
  gameContainer.appendChild(path);
}

function createLineFrom(prevDiv, toDiv) {
  const line = document.createElement("div");
  const prevPosition = prevDiv.getBoundingClientRect();
  const currentPosition = toDiv.getBoundingClientRect();
  if (!prevDiv || !toDiv)
    throw Error("previous div or current div gives error");
  if (prevPosition.x == currentPosition.x) {
    if (prevPosition.y > currentPosition.y)
      line.classList.add("verticalUpLine");
    else line.classList.add("verticalDownLine");
  }
  if (prevPosition.y == currentPosition.y) {
    if (prevPosition.x < currentPosition.x) {
      line.classList.add("horrizontalRightLine");
    } else {
      line.classList.add("horrizontalLeftLine");
    }
  }
  prevDiv.appendChild(line);
}

function play() {
  try {
    createMap();

    let heldDown = false;
    let prevDiv = null;
    let headDiv = document.querySelector("#hasDot");

    document.addEventListener("mousedown", (e) => {
      if (!e.target) throw Error("weird");
      let isClickCorrect =
        e.target.id == "hasDot" ||
        e.target.classList.contains("dot") ||
        e.target.classList.contains("verticalLine");
      if (isClickCorrect) {
        heldDown = true;
      }
      console.log(e.target);
    });

    document.addEventListener("mouseover", (e) => {
      try {
        if (e.target.classList.contains("wall")) {
          heldDown = false;
          return;
        }
        if (!e.target) throw Error("Target hovered is throwing error");
        let isInDifferentContainer =
          (e.target.classList.contains("path") &&
            e.target.id != "hasDot" &&
            !e.target.classList.contains("passed")) ||
          (e.target.parentNode.classList.contains("path") &&
            e.target.parentNode.id != "hasDot" &&
            !e.target.parentNode.classList.contains("passed") &&
            !e.target.parentNode.children[0]);
        if (heldDown && isInDifferentContainer) {
          prevDiv = document.querySelector("#hasDot");
          if (!prevDiv) throw Error("Previous Div not available");
          //the new hovered one has the dot
          prevDiv.id = "";
          prevDiv.classList.add("passed");
          prevDiv.children[0].remove();

          if (e.target.classList.contains("path")) {
            e.target.id = "hasDot";
            const dot = createDot();
            e.target.appendChild(dot);
            createLineFrom(prevDiv, e.target);
            headDiv = e.target;

            if (headDiv && headDiv.classList.contains("end")) {
              const text = document.querySelector("#winnerText");
              const button = document.getElementById("playAgain");
              if (button) button.style.display = "block";
              if (text) text.innerHTML = "You Won";
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    });

    document.addEventListener("mouseup", (e) => {
      heldDown = false;
    });
  } catch (error) {
    console.log(error);
  }
}

function restart() {
  const text = document.querySelector("#winnerText");
  if (text) text.innerHTML = "";
  if (!gameContainer) throw Error("Game container doesnt exist");
  while (gameContainer.lastChild) {
    gameContainer.lastChild.remove();
  }
  console.log(gameContainer.children);
  play();
}

play();
