// /**
//  * Created by thomassmuir on 2019-02-18.
//  */


// //boolean generated variable for generateBoard method
// //If returns false, method cannot run
// let generated = false;

// let board = boardArray(); //board array that renders out on the console
// let initial = boardArray(); //initial array generation for later comparison and auto-solve
// let solved = boardArray(); //solved array of current board
// let loaded = boardArray(); //loaded array of user-loaded .sudoku file

// //generateBoard method
// //creates new board for solving by calling upon other methods
// function generateBoard() {
//   print("hell")
//   generated = false; //board can run

//   //for loop to initially fill board array with 0s
//   //Avoids nullPointerException errors
//   board = boardArray();

//   //for loop that calls upon fillBoard() method to fill array with viable numbers
//   //Sets each coordinate to specified number from fillBoard();
//   fillBoard();
//   for (let i = 0; i < 9; i++) {
//     print(board[i]);
//   }

//   //for loop that sets solved array to fully solved newly generated board array
//   for (let y = 0; y < 9; y++) {
//     for (let x = 0; x < 9; x++) {
//       isSolved[x][y] = board[x][y];
//     }
//   }
// }

// //generatePuzzle void method
// //Takes out random squares to create playable Sudoku board array
// function generatePuzzle() {

//   //for loop to choose 20 random squares from Sudoku array to turn into 0
//   //If board[x][y] == 0, Sudoku won't render the number to print out
//   for (let i = 0; i < 20; i++) {
//     let x1 = int(random(0, 1) * board.length);
//     let y1 = int(random(0, 1) * board.length);
//     board[x1][y1] = 0;
//     if (x1 != 0) {
//       board[x1 - 1][y1] = 0;
//     }
//   }
// }

// // **RECURSIVE METHOD**
// // fillBoard array
// //fills board array with numbers for a solvable Sudoku
// function fillBoard() {
//   let newCell = findLowestCandidates();

//   //if statement to determine if board array can be solved or not
//   if (newCell === null) {
//     try { //if new cell is able to be called, try fillBoard() method
//       fillBoard();
//     }
//     catch (e) { //If not, it is an unsolvable board
//       if (!generated) //If it's the first time the board is generated, try generating another board
//         generateBoard();
//       else //otherwise, throw an error (loaded files)
//         throw new Exception("not a solvable board");
//     }
//     return;
//   }

//   //If there are no more new Cells, stop method
//   //Simplest case
//   if (newCell.x === -1) {
//     return;
//   }

//   //Creates a ListList of squares with the lowest number of candidates
//   //Candidates are the number of viable numbers for each square
//   let candidates = countCandidates(newCell.x, newCell.y);

//   //Get another random square to check
//   board[newCell.x][newCell.y] = candidates[int(random(0, 1) * candidates.length)];

//   //Recursively call method again
//   fillBoard();
// }
// //end of fillBoard method


// //findLowestCandidates method that returns CoordinatePair object (an x,y coordinate)
// //Find the squares with the lowest number of possible candidates
// //To later determine which next square is filled
// function findLowestCandidates() {
//   //New LinkedList of CoordinatePairs that lists the squares with
//   //least number of candidates
//   let finalCandidates = [];

//   //Create new array to count the number of possible candidates for each cell
//   let candidates = boardArray();

//   //Fill array with the ints that countCandidates return
//   //If countCandidates has nothing in it, return null
//   for (let y = 0; y < 9; y++) {
//     for (let x = 0; x < 9; x++) {
//       if (countCandidates(x, y) === null) {
//         return null;
//       }
//       candidates[x][y] = countCandidates(x, y).length;
//     }
//   }
//   //Make the lowest comparable number 9
//   //Any square already filled is already listed as 10 in numbers
//   //Therefore, it won't be listed in the comparison
//   let lowestNumber = 9;

//   //for loop to determine what squares to add and remove from the list
//   //If there is a square with less candidates than the squares in the list
//   //Remove those squares and add this square as well as squares of the same amount
//   //If there is a square with more candidates, don't add it
//   //If there is a square with the same number of candidates, add it to the list
//   for (let y = 0; y < 9; y++) {
//     for (let x = 0; x < 9; x++) {
//       if (candidates[x][y] == lowestNumber) {
//         finalCandidates.push(createVector(x, y));
//       } else if (candidates[x][y] < lowestNumber) {
//         finalCandidates = [];
//         finalCandidates.push(createVector(x, y));
//         lowestNumber = candidates[x][y];
//       }
//     }
//   }

//   //If the size of the finalCandidates list is 0,
//   //Return -1, -1 which means the board is finished and fillBoard() can stop
//   if (finalCandidates.length === 0) {
//     return createVector(-1, -1);
//   }

//   //Return a random square from the final candidates list
//   return finalCandidates[int(Math.random() * finalCandidates.length)];
// }
// //end of findLowestCandidates method

// //countCandidates method that returns LinkedList() of Integers
// //Each additional data point in list is the number of candidates for each each square
// function countCandidates(x, y) {

//   //New LinkedList of Integers that lists the different possible number of candidates
//   //each square can have.
//   let numbers = [];
//   for (let i = 9; i > 0; i--) {
//     numbers.push(i);
//   }

//   //If statement that determines if coordinate already has a number placed on board array,
//   //return 10 so that it won't be compared to later on in findLowestCandidates() method.
//   if (board[x][y] !== 0) {
//     numbers.push(10);
//     return numbers;
//   }

//   //for loop that determines what numbers the empty square can't be in its specific row
//   //Each number present in that row is removed from the list.
//   for (let row = 0; row < 9; row++) {
//     if (numbers.includes(board[row][y])) {
//       numbers.splice(numbers.indexOf(board[row][y]), 1);
//     }
//   }

//   //Int variables to determine offset of x,y coordinates
//   let offsetX = floor(x / 3) * 3;
//   let offsetY = floor(y / 3) * 3;

//   //for loop that determines what numbers the empty square can't be in it's specific box
//   //Each number present in that box is removed from the list.
//   for (let row = offsetX; row < offsetX + 3; row++) {
//     for (let column = offsetY; column < offsetY + 3; column++) {
//       if (numbers.includes(board[row][column])) {
//         numbers.splice(numbers.indexOf(board[row][y]), 1);
//       }
//     }
//   }

//   //If the size of the list is 0, return null
//   if (numbers.length === 0) {
//     return null;
//   }

//   //Return the numbers LinkedList
//   return numbers;

// }
// //end of countCandidates method





