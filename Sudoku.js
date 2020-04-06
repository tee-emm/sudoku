/**
 * Created by thomassmuir on 2019-02-12.
 */

// constant
let play;
let splash;
let home;
let rules;
let about; //Image variables for Canvas

// state variables
let selectedScreen = 0;
let chosen;
let button = "";
let loadingFile = false;
let isSolved = false;
let displayGame = false;
let generated = false;

// Aarays for board generation
let board = boardArray(); // board array that renders out on the console
let initial = boardArray(); // initial array generation for later comparison and auto-solve
let solved = boardArray(); // solved array of current board
let loaded = boardArray(); // loaded array of user-loaded .sudoku file

function preload() {
  // splash = loadImage('data/sudokusplash.png');
  home = loadImage('data/sudokusplash.png');
  rules = loadImage('data/rules.png');
  about = loadImage('data/about.png');
  play = loadImage('data/sudokuboard.png');
}

// Main class
function setup() {

  // Calls upon generateBoard() class to generate a working Sudoku board
  // Calls upon generatePuzzle() class to create a randomized solvable puzzle
  generateBoard();
  generatePuzzle();
  generated = true;

  // Sets initial int array to values of newly generated board array
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      initial[x][y] = int(board[x][y]);
    }
  }

  // sets text properties
  textFont('Tahoma');
  textSize(30);

  noFill();

  // Creates canvas
  createCanvas(640, 480);
}

function draw() {
  // draws background
  switchScreen(selectedScreen);

  // splash screen buttons (highlight pink)
  if (selectedScreen === 0) {
    highlightButtons(mouseX, mouseY, 440, 246, 100, 39, '#ffb0c5'); // play button
    highlightButtons(mouseX, mouseY, 460, 286, 54, 17, '#ffb0c5'); // rules button
    highlightButtons(mouseX, mouseY, 460, 304, 53, 16, '#ffb0c5'); // about button
  }

  // number buttons (hightlight colour according to number)
  if (selectedScreen === 1) {
    highlightButtons(mouseX, mouseY, 433, 65, 46, 47, '#ffb0c5');  // number 1, pink highlight
    highlightButtons(mouseX, mouseY, 489, 65, 46, 47, '#8edd8b');  // number 2, green highlight
    highlightButtons(mouseX, mouseY, 545, 65, 46, 47, '#9ff2f9');  // number 3, blue highlight
    highlightButtons(mouseX, mouseY, 433, 122, 46, 47, '#bb94ff'); // number 4, purple highlight
    highlightButtons(mouseX, mouseY, 489, 122, 46, 47, '#fffff5'); // number 5, beige highlight
    highlightButtons(mouseX, mouseY, 545, 122, 46, 47, '#ffb850'); // number 6, orange highlight
    highlightButtons(mouseX, mouseY, 433, 177, 46, 47, '#97ffc1'); // number 7, mint highlight
    highlightButtons(mouseX, mouseY, 489, 177, 46, 47, '#ffed7a'); // number 8, yellow highlight
    highlightButtons(mouseX, mouseY, 545, 177, 46, 47, '#fd908e'); // number 9, yellow highlight
  }

  // main screen buttons (hightlight pink)
  if (selectedScreen === 1) {
    highlightButtons(mouseX, mouseY, 291, 22, 128, 30, '#ffb0c5'); //auto solve button
    highlightButtons(mouseX, mouseY, 556, 6, 77, 29, '#ffb0c5'); // erase button
    highlightButtons(mouseX, mouseY, 521, 4, 30, 34, '#ffb0c5'); // home button
    highlightButtons(mouseX, mouseY, 437, 256, 154, 38, '#ffb0c5'); //load puzzle button
    highlightButtons(mouseX, mouseY, 437, 305, 154, 38, '#ffb0c5'); //solve puzzle button
    highlightButtons(mouseX, mouseY, 437, 355, 154, 38, '#ffb0c5'); //new puzzle button
  }

  // rules / about screen (highlight pink)
  if (selectedScreen === 2 || selectedScreen === 3) {
    highlightButtons(mouseX, mouseY, 452, 41, 116, 39, '#ffb0c5'); // return to splash button
  }

  //If statement to print congratulations message if sudoku puzzle is solved
  if (compareBoard(board, solved) && !isSolved) {
    alert("Congrats! The board has been solved");
    isSolved = true;
  }

  if (displayGame) {
    drawGame();
  }
}

function switchScreen(selectedScreen) {
  if (selectedScreen === 0) { // menu/splash screen
    image(home, 0, 0);
  } else if (selectedScreen === 1) { // play screen
    image(play, 0, 0);
  } else if (selectedScreen === 2) { // rules screen
    image(rules, 0, 0);
  } else if (selectedScreen === 3) { // about screen
    image(about, 0, 0);
  }
}

function mouseReleased() {

  // splash screen buttons
  if (selectedScreen === 0) {
    // play button
    if (rectHitTest(mouseX, mouseY, 440, 246, 100, 39)) {
      selectedScreen = 1;
      displayGame = true;
    };
    // rules button
    if (rectHitTest(mouseX, mouseY, 460, 286, 54, 17)) {
      selectedScreen = 2;
    };
    // about button
    if (rectHitTest(mouseX, mouseY, 460, 304, 53, 16)) {
      selectedScreen = 3;
    };
  }

  // main screen buttons
  if (selectedScreen === 1) {
    // home button
    if (rectHitTest(mouseX, mouseY, 521, 4, 30, 34)) {
      alert("Warning! A new puzzle will be generated when you return to the Home menu.");
      gameReset();
      displayGame = false;
    }
    // erase button
    if (rectHitTest(mouseX, mouseY, 556, 6, 77, 29)) {
      chosen = 0;
    }
    // new puzzle button
    if (rectHitTest(mouseX, mouseY, 438, 350, 151, 36)) {
      gameReset();
    }
    // auto solve button
    if (rectHitTest(mouseX, mouseY, 291, 22, 128, 30)) {
      revealPuzzle();
    }

    // number buttons
    // areas indicate a Sudoku number from menu
    // numbers clicked become the chosen number to place
    if (rectHitTest(mouseX, mouseY, 433, 65, 46, 47)) {
      chosen = 1;
    } else if (rectHitTest(mouseX, mouseY, 489, 65, 46, 47)) {
      chosen = 2;
    } else if (rectHitTest(mouseX, mouseY, 545, 65, 46, 47)) {
      chosen = 3;
    } else if (rectHitTest(mouseX, mouseY, 433, 122, 46, 47)) {
      chosen = 4;
    } else if (rectHitTest(mouseX, mouseY, 489, 122, 46, 47)) {
      chosen = 5;
    } else if (rectHitTest(mouseX, mouseY, 545, 122, 46, 47)) {
      chosen = 6;
    } else if (rectHitTest(mouseX, mouseY, 433, 177, 46, 47)) {
      chosen = 7;
    } else if (rectHitTest(mouseX, mouseY, 489, 177, 46, 47)) {
      chosen = 8;
    } else if (rectHitTest(mouseX, mouseY, 545, 177, 46, 47)) {
      chosen = 9;
    }

    //Set chosenSquare variable to whatever placeNum function returns
    chosenSquare = selectedSquare(mouseX, mouseY);
    //If statement to write what editable square becomes a chosen variable when clicked
    //And then print it
    if (chosenSquare !== null && editable(chosenSquare) && chosen) {

      board[chosenSquare.x][chosenSquare.y] = chosen;
    }


  }
  // rule / about screen
  if (selectedScreen === 2 || selectedScreen === 3) {
    // return to splash button
    if (rectHitTest(mouseX, mouseY, 452, 41, 116, 39)) {
      selectedScreen = 0;
    }
  }
}

// function that highlights button when mouse hovers over it
// uses rectHitTest function to determine if mouse is hovering over button
// adds a thicker stroke button around hover area
// location and colour are determined by parameters
function highlightButtons(px, py, x, y, w, h, col) {
  noFill();
  if (rectHitTest(px, py, x, y, w, h, col)) {
    strokeWeight(4);
    stroke(col);
    rect(x, y, w, h, 5);
  }
}

// determines if mouse is inside rect with passed arguments
// px and py are the coordinates of the mouse
// x and y are the coordinates upper left corner of the rectangle
// w and h are the width and height of the rectangle
function rectHitTest(px, py, x, y, w, h) {
  if (px >= x && px <= x + w &&
    py >= y && py <= y + h) {
    return true;
  } else {
    return false;
  }
}

// function that returns a new 9*9 array
// fills in the array with null values
function boardArray() {
  let newArray = [];
  for (let i = 0; i < 9; i++) {
    newArray[i] = [];
    for (let j = 0; j < 9; j++) {
      newArray[i][j] = null;
    }
  }
  return newArray;
}

// copyBoard function that returns a copy of the Integer array passed as the argument
// avoids jumbled redirections to the same Integer array
function copyBoard(arr) {
  let arr2 = boardArray();
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      arr2[x][y] = int(arr[x][y]);
    }
  }
  return arr2;
}

// compareBoard boolean function that compares both of the Integer arrays passed as the arguments
// If the value at each coordinate is equal to one another, the function returns false
// Otherwise, it returns true
function compareBoard(arr1, arr2) {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++)
      if (arr1[x][y] !== arr2[x][y]) {
        return false;
      }
  }
  return true;
}

// Resets Puzzle
// Alerts the player that there will be a new board set up
// Might take a few moments to generate puzzle.
function gameReset() {
  isSolved = true; // resets puzzle
  selectedScreen = 0;
  alert("We are now generating a new sudoku board for you. This might take a few moments ^^");
  generateBoard();
  solved = copyBoard(board);
  generatePuzzle();
  initial = copyBoard(board);
  isSolved = false;
}

//Reveals Puzzle
function revealPuzzle() {
  try {
    board = copyBoard(solved);
    fillBoard();
    alert("The auto solver has completed the puzzle.");
  }
  catch (e) {
    alert("The puzzle is unsolvable.");
  }
}

// draws the game
// draws the numbers in their corresponding boxes
// if the user fills in the wrong number, the numbers turn red
function drawGame() {
  if (selectedScreen === 1) {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (board[x][y] != 0) {
          textSize(20);
          noStroke();
          if (isNotSame(createVector(x, y))) {
            fill('red');
          } else {
            fill(0);
          }
          text(board[x][y] + "", x * 43 + 45, y * 43 + 93);
        }
      }
    }
  }
}

//placeNum function that takes x,y, coordinate in as argument
//And returns a CoordinatePair object
function selectedSquare(x, y) {

  //Creates new CoordinatePair object
  let square = createVector(0, 0);

  //If mouse clicked is within this area (area of Sudoku board)
  //Then it indicates a square that can be clicked
  if (x > 30 && x < 418 && y > 67 && y < 451) {

    //For loop to determine which column the square is in
    for (let i = 0; i < 9; i++) {
      if (x < ((i + 1) * 43 + 30)) {
        square.x = i;
        break;
      }
    }

    //for loop to determine which row the square is in
    for (let i = 0; i < 9; i++) {
      if (y < ((i + 1) * 43 + 65)) {
        square.y = i;
        break;
      }
    }

    //Returns CoordinatePair of square coordinate
    return square;
  } else return null;//otherwise returns null
}

//Boolean editable function that takes in chosenSquare CoordinatePair object
//as argument
function editable(chosenSquare) {

  //returns true if the initial board creation coordinate was empty (equals zero)
  return initial[chosenSquare.x][chosenSquare.y] === 0;
}

//Boolean isSame function that takes in chosenSquare CoordinatePair object
//as argument
function isNotSame(chosenSquare) {

  //returns false if there is no square chosen
  if (chosenSquare === null) {
    print(chosenSquare);
    return false;
  }

  //returns true if board coordinate does not equal solved coordinate
  return !(board[chosenSquare.x][chosenSquare.y] === solved[chosenSquare.x][chosenSquare.y]);
}




//////////////////////////////////////

// //If statement to determine how the numbers appear when pressed
// //If the number placed is wrong, it will appear red when placed
// //Otherwise, it will appear black
// if (!loadingFile)
//   for (int y = 0; y < 9; y++) {
//   for (int x = 0; x < 9; x++) {
//     if (MouseClick.isSame(MouseClick.chosenSquare) && MouseClick.chosenSquare.x == x && MouseClick.chosenSquare.y == y) {
//       g.setColor(Color.red); //appear red if wrong
//     } else
//       g.setColor(Color.black); //otherwise, appear

//     //if statement to determine if the square that player has chosen is able to be written in
//     //Prevents players from changing the board to their liking
//     if (BoardCreator.board[x][y] != 0)
//       g.drawString(BoardCreator.board[x][y] + "", x * 43 + 45, y * 43 + 93);
//   }
// }

// //If Load Puzzle button is pressed, loadFile method is selected (Filter Class)
// //Users will be able to selec
// if (button.equals("Load Puzzle")) {
//   SwingUtilities.invokeLater(new Runnable() { //waits until correct time for everything to load (prevents errors)
//           @Override
//   public void run() {
//     Filter.loadFile();
//     solved = false;
//   }
// }

// //If Save Puzzle button is pressed, saveFile (Filter Class)
// //Users will be able to name and save their current board state
// if (button.equals("Save Puzzle")) {
//   JOptionPane.showMessageDialog(Window.frame, "Warning! Do not save your current game state with mistakes, " +
//     "they will not be able to be undone.");
//   SwingUtilities.invokeLater(new Runnable() {  //waits until correct time for everything to load (prevents errors)
//           @Override
//   public void run() {
//     Filter.saveFile();
//   }
// }


//function that creates new board for solving by calling upon other function
function generateBoard() {
  generated = false; //board can run

  // initially fills board array with 0s
  // avoids null pointer errors
  for (let i = 0; i < 9; i++) {
    board[i].fill(0);
  }

  // calls upon fillBoard() function to fill array with viable numbers
  //Sets each coordinate to specified number from fillBoard();
  fillBoard();

  // sets solved array to fully solved newly generated board array
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      solved[x][y] = board[x][y];
    }
  }
}

// function that takes out random squares to create playable Sudoku board array
function generatePuzzle() {

  // chooses 20 random squares from Sudoku array to turn into 0
  // if board[x][y] == 0, Sudoku won't render the number to print out
  for (let i = 0; i < 20; i++) {
    let x1 = int(random(0, 1) * board.length);
    let y1 = int(random(0, 1) * board.length);
    board[x1][y1] = 0;
    if (x1 !== 0) {
      board[x1 - 1][y1] = 0;
    }
  }
}

// Recursive Function
// fills board array with numbers for a solvable Sudoku
function fillBoard() {
  // finds the next square to be filled
  let newCell = findLowestCandidates();

  // if statement to determine if board array can be solved or not
  if (newCell === null) {
    try { //if new cell is able to be called, try fillBoard() function
      fillBoard();
    }
    // error handler
    catch (e) { //If not, it is an unsolvable board
      if (!generated) //If it's the first time the board is generated, try generating another board
        generateBoard();
      else //otherwise, throw an error (loaded files)
        throw new Exception("not a solvable board");
    }
    return;
  }

  // if there are no more new Cells, stop function
  // simplest case
  if (newCell.x === -1) {
    return;
  }

  // creates an array of squares with the lowest number of candidates
  // candidates are the number of viable numbers for each square
  let candidates = countCandidates(newCell.x, newCell.y);

  // gets another random square to check
  board[newCell.x][newCell.y] = random(candidates);

  // recursively calls function again
  fillBoard();
}


// findLowestCandidates function that returns vector object (an x,y coordinate)
// finds the squares with the lowest number of possible candidates
// to later determine which next square is filled
function findLowestCandidates() {
  // array that lists the squares with least number of candidates
  let finalCandidates = [];

  // counts the number of possible candidates for each cell
  let candidates = boardArray();

  // fills array with the ints that countCandidates return
  // if countCandidates has nothing in it, return null
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (countCandidates(x, y) === null) {
        return null;
      }
      candidates[x][y] = countCandidates(x, y).length;
    }
  }
  // make the lowest comparable number 9
  // any square already filled is already array as 10 in numbers
  // therefore, it won't be listed in the comparison
  let lowestNumber = 9;

  // determines what squares to add and remove from the array
  // if there is a square with less candidates than the squares in the array
  // remove those squares and add this square as well as squares of the same amount
  // if there is a square with more candidates, don't add it
  // if there is a square with the same number of candidates, add it to the array
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (candidates[x][y] == lowestNumber) {
        finalCandidates.push(createVector(x, y));
      } else if (candidates[x][y] < lowestNumber) {
        finalCandidates = [];
        finalCandidates.push(createVector(x, y));
        lowestNumber = candidates[x][y];
      }
    }
  }

  // if the size of the finalCandidates array is 0,
  // return -1, -1 which means the board is finished and fillBoard() can stop
  if (finalCandidates.length === 0) {
    return createVector(-1, -1);
  }

  // return a random square from the final candidates array
  return random(finalCandidates);
}
//end of findLowestCandidates function

// countCandidates function that returns array of ints
// each additional data point in array is the number of candidates for each each square
function countCandidates(x, y) {

  // new array that lists the different possible number of candidates each square can have.
  let numbers = [];
  for (let i = 9; i > 0; i--) {
    numbers.push(i);
  }

  // determines if coordinate already has a number placed on board array,
  // returns 10 so that it won't be compared to later on in findLowestCandidates() function
  if (board[x][y] !== 0) {
    numbers.push(10);
    return numbers;
  }

  // for loop that determines what numbers the empty square can't be in its specific row
  // each number present in that row is removed from the array.
  for (let row = 0; row < 9; row++) {
    if (numbers.includes(board[row][y])) {
      numbers.splice(numbers.indexOf(board[row][y]), 1);
    }
  }

  // for loop that determines what numbers the empty square can't be in its specific column
  // each number present in that column is removed from the array.
  for (let column = 0; column < 9; column++) {
    if (numbers.includes(board[x][column])) {
      numbers.splice(numbers.indexOf(board[x][column]), 1);
    }
  }

  // variables to determine offset of x,y coordinates
  let offsetX = floor(x / 3) * 3;
  let offsetY = floor(y / 3) * 3;

  // determines what numbers the empty square can't be in it's specific box
  // each number present in that box is removed from the array.
  for (let row = offsetX; row < offsetX + 3; row++) {
    for (let column = offsetY; column < offsetY + 3; column++) {
      if (numbers.includes(board[row][column])) {
        numbers.splice(numbers.indexOf(board[row][column]), 1);
      }
    }
  }

  // if the size of the array is 0, return null
  if (numbers.length === 0) {
    return null;
  }

  // return the numbers array
  return numbers;

}