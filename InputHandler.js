import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.Arrays;

/**
 * Created by thomassmuir on 2019-02-12.
 */

]
  //end of mouseReleased method

  //chooseNum method that takes x,y coordinate in as argument
  //and returns an int
  public static int chooseNum(int x, int y) {

   
  }

  //pressButton method that takes x,y, coordinate in as argument
  //and returns a String
  public static String pressButtons(int x, int y) {

    //if statement to determine which areas when clicked should return a String
    //Areas indicate button locations
    if (x > 256 && x < 372 && y > 255 && y < 290) {
      return "Play";
    } else if (x > 228 && x < 314 && y > 212 && y < 244) {
      return "Rules";
    } else if (x > 320 && x < 412 && y > 213 && y < 246) {
      return "About";
    } else if (x > 474 && x < 559 && y > 41 && y < 76) {
      return "Home";
    } else if (x > 524 && x < 547 && y > 8 && y < 39) {
      return "Menu";
    } else if (x > 291 && x < 419 && y > 25 && y < 54) {
      return "Auto Solve";
    } else if (x > 558 && x < 632 && y > 11 && y < 35) {
      return "Erase";
    } else if (x > 439 && x < 590 && y > 259 && y < 297) {
      return "Load Puzzle";
    } else if (x > 438 && x < 592 && y > 304 && y < 338) {
      return "Save Puzzle";
    } else if (x > 438 && x < 587 && y > 350 && y < 389) {
      return "New Puzzle";
    }
    return "";
  }

  //placeNum method that takes x,y, coordinate in as argument
  //And returns a CoordinatePair object
  public static BoardCreator.CoordinatePair placeNum(int x, int y) {

    //Creates new CoordinatePair object
    BoardCreator.CoordinatePair square = new BoardCreator.CoordinatePair(0, 0);

    //If mouse clicked is within this area (area of Sudoku board)
    //Then it indicates a square that can be clicked
    if (x > 30 && x < 418 && y > 67 && y < 451) {

      //For loop to determine which column the square is in
      for (int i = 0; i < 9; i++) {
        if (x < ((i + 1) * 43 + 30)) {
          square.x = i;
          break;
        }
      }

      //for loop to determine which row the square is in
      for (int i = 0; i < 9; i++) {
        if (y < ((i + 1) * 43 + 65)) {
          square.y = i;
          break;
        }
      }

      //Returns CoordinatePair of square coordinate
      return square;
    } else return null;//otherwise returns null
  }

  //Boolean editable method that takes in chosenSquare CoordinatePair object
  //as argument
  public static Boolean editable(BoardCreator.CoordinatePair chosenSquare) {

    //returns true if the initial board creation coordinate was empty (equals zero)
    return BoardCreator.initial[chosenSquare.x][chosenSquare.y].equals(0);
  }

  //Boolean isSame method that takes in chosenSquare CoordinatePair object
  //as argument
  public static Boolean isSame(BoardCreator.CoordinatePair chosenSquare) {

    //returns false if there is no square chosen
    if (chosenSquare == null) {
      return false;
    }

    //returns true if board coordinate does not equal solved coordinate
    return !BoardCreator.board[chosenSquare.x][chosenSquare.y].equals(BoardCreator.solved[chosenSquare.x][chosenSquare.y]);
  }
}

