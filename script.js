"use strict";

// functionality to add later:
// - font-awesome icons for X/O
// document.querySelectorAll('[data-cell]').forEach(cell => {
//   cell.addEventListener('click', function() {
//     this.innerHTML = '<i class="far fa-circle"></i>';
//     });
//   });
// - show draw when all squares fill up with no winner

// ---------- GLOBAL VARIABLES ------------------------
  // I know, I know.. don't use global variables.. teachers said it was okay for now..stop judging me future self!
var Player;
var winningSymbol;
const initialClickCount = 0;
var currentClickCount = initialClickCount;
// -----------START TIC-TAC-TOE GAME ---------------------

// first the page loads up the  HTML and CSS
document.addEventListener("DOMContentLoaded", event => {
  Player = "X";
  
  // then every cell gets a listener attached to it..
  document.querySelectorAll("[data-cell]").forEach(cell => {
    cell.addEventListener("click", event => {
      // if cell block is empty AND there is no winner, keep playing:
      if (!event.target.innerHTML && !winningSymbol) {
        //add 'x' or 'o' to the html page
        event.target.innerHTML = Player;
        currentClickCount++;
        //check to see if anyone won
        determineWinner();
        //ternary: two different symbols for each player
        Player = Player === "X" ? "O" : "X";

      // if someone won - prompt and ask if they want to play again, if not, clear board:  
      } else if (winningSymbol) {
        // the prompt kept popping up before it displayed a winner so I added a .02sec pause
        setTimeout(function() {
          if (
            confirm(
              "This game is over! Player '" +
                winningSymbol +
                "' has already won! Want to play again?"
            )
          ) {
            clearBoard();
          }
        }, 20); //pause for after winning for 20 milliseconds AKA .02 seconds to let rest of DOM loads first
      } 
      determineTie();
    });
  });

  function determineWinner() {
    // --------- Local Variables -------------
    let zero = document.querySelector('[data-cell="0"]').innerHTML;
    let one = document.querySelector('[data-cell="1"]').innerHTML;
    let two = document.querySelector('[data-cell="2"]').innerHTML;
    let three = document.querySelector('[data-cell="3"]').innerHTML;
    let four = document.querySelector('[data-cell="4"]').innerHTML;
    let five = document.querySelector('[data-cell="5"]').innerHTML;
    let six = document.querySelector('[data-cell="6"]').innerHTML;
    let seven = document.querySelector('[data-cell="7"]').innerHTML;
    let eight = document.querySelector('[data-cell="8"]').innerHTML;

    if (
      // check if center cell has a value of 'X' or 'O' or not
      (four === Player) &&
      // check if opposites from center equal one another:

      // "/"
      ((six === four && four === two) ||
      // "\"
      (zero === four && four === eight) ||
      // "---"
      (one === four && four === seven) ||
      // "|"
      (three === four && four === five))
    ) {
      winningSymbol = four; //you can add a error checker here later
      document.querySelector("#announce-winner").innerHTML =
        "Player " + winningSymbol + " Wins!!";
      return true;
    } else if (
      (zero === Player) &&
      ((six === three && three === zero) || (zero === one && one === two))
    ) {
      winningSymbol = zero; //you can add an error checker here later
      document.querySelector("#announce-winner").innerHTML =
        "Player " + winningSymbol + " Wins!!";
      return true;
    } else if (
      (eight === Player) &&
      ((five === eight && eight === two) || (six === seven && seven === eight))
    ) {
      winningSymbol = eight; //you can add an error checker here later
      document.querySelector("#announce-winner").innerHTML =
        "Player " + winningSymbol + " Wins!!";
      return true;
    }
    return false;
  }

  function determineTie () {
    if (currentClickCount === 9) {
      document.querySelector("#announce-winner").innerHTML =
        "Draw!";
    }
  }
});

function clearBoard() {
  document.querySelectorAll("[data-cell]").forEach(cell => {
    cell.innerHTML = "";
  });
  document.querySelector("#announce-winner").innerHTML = "";
  winningSymbol = null;
  Player = "X";
  currentClickCount = initialClickCount;
}