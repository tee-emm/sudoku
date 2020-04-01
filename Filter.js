// import javax.swing.*;
// import javax.swing.filechooser.FileFilter;
// import java.io.*;

// public class Filter extends FileFilter {

//   //Accept all directories and all gif, jpg, tiff, or png files.
//   //However, can only choose files that end with the ".sudoku" extension
//   public boolean accept(File f) {
//     if (f.isDirectory()) {
//       return true;
//     }
//     return f.getName().endsWith(".sudoku");
//   }

//   //The description of this Filter
//   //Visible when "Load Puzzle" button is pressed
//   public String getDescription() {
//     return "Sudoku board (.soduku)";
//   }

//   //loadFile method that allows players to select a sudoku game state board to play
//   public static void loadFile() {

//     JFileChooser fc = new JFileChooser(); //New JFileChooser variable to allow users to select file
//     fc.setFileFilter(new Filter()); //Apply Filter
//     fc.setAcceptAllFileFilterUsed(false); //Don't accept all files

//     //Opens up new selection frame
//     //Approve button is titled "Load Puzzle"
//     int returnVal = fc.showDialog(Window.frame, "Load Puzzle");

//     //If returnVal variable does not return 0, return;
//     //Avoids crashing
//     if (returnVal != 0) {
//       return;
//     }

//     //try-catch statement to attempt loading .sudoku file that player selects
//     try {
//       Sudoku.loadingFile = true; //trying to load file
//       BufferedReader br = new BufferedReader(new FileReader(fc.getSelectedFile())); //uses BufferedReader to read in file

//       //for loop to read in contents of file as an array
//       //Each space that separates the numbers indicates a separate coordinate in the array
//       for (int i = 0; i < 9; i++) {
//         String line = br.readLine();
//         for (int j = 0; j < 9; j++)
//           BoardCreator.loaded[i][j] = Integer.valueOf(line.split(" ")[j]);
//       }
//       //When file is loaded, uses copyBoard method to turn the new board array
//       //into the new loaded array
//       BoardCreator.board = Sudoku.copyBoard(BoardCreator.loaded);

//       //nested try-catch statement to attempt to use fillBoard() method to solve the loaded array puzzle
//       //If the loaded array is invalid, will display error message to user using JOPtionPane
//       try {
//         BoardCreator.fillBoard();
//       }
//       catch(StackOverflowError e) {
//         JOptionPane.showMessageDialog(Window.frame, "Puzzle is unsolvable", "Unsolvable Puzzle Alert", JOptionPane.ERROR_MESSAGE);
//       }

//       //Updates Integer[][] arrays to new loaded array values
//       BoardCreator.solved = BoardCreator.board;
//       BoardCreator.initial = Sudoku.copyBoard(BoardCreator.loaded);
//       BoardCreator.board = Sudoku.copyBoard(BoardCreator.loaded);

//       //If the file that is attempting to be loaded is invalid
//       //Print error, but don't crash program
//     }
//     catch(Exception ex) {
//       JOptionPane.showMessageDialog(Window.frame, "This file cannot be opened");
//       Sudoku.loadingFile = false;
//       Sudoku.solved = true;
//       ex.printStackTrace();
//     }
//     Sudoku.loadingFile = false; //No longer loading file
//   }
//   //end of LoadFile method

//   //saveFile method that allows players to select a sudoku game state board to save
//   public static void saveFile() {

//     JFileChooser fc = new JFileChooser(); //New JFileChooser variable to allow users to select file
//     fc.setFileFilter(new Filter()); //Apply Filter
//     fc.setAcceptAllFileFilterUsed(false); //Can't save as any file, just .sudoku

//     //Opens up new save option frame
//     int returnVal = fc.showSaveDialog(Window.frame);

//     //If returnVal variable does not return 0, return;
//     //Avoids crashing
//     if (returnVal != 0) {
//       return;
//     }

//     //try-catch statement to write current board game state to a file
//     try {
//       BufferedWriter bw = new BufferedWriter(new FileWriter(fc.getSelectedFile()+
//         (fc.getSelectedFile().toString().endsWith(".sudoku") ? "" : ".sudoku"))); //uses BufferedWriter to write in file
//       for (int i = 0; i < 9; i++) {
//         for (int j = 0; j < 9; j++)
//           bw.write(Integer.valueOf(BoardCreator.board[i][j]) + " ");
//         bw.newLine(); //Writes in each coordinate value to an array
//       }
//       bw.close(); //Stops writing, closes BufferedWriter

//       //If there's an error
//       //Print but don't crash
//     }
//     catch(Exception ex) {
//       ex.printStackTrace();
//     }
//   }
//   //end of SaveFile method
// }
