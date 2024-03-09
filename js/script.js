 
 // Get all the cells of the game board
 const cells = document.querySelectorAll('[data-cell]');

 // Get the element that displays the current player's turn
 const messageText = document.querySelector('.current-player');
 
 // Get the element that displays messages (like winner or draw)
 const message = document.getElementById('message');
 message.textContent = "Player X's turn"
 // Initialize the current player as 'X'
 let currentPlayer = 'X';
 
 // Initialize the game status as active
 let gameActive = true;
 

 // Define winning combinations in Tic-Tac-Toe
 const winningCombination = [
   [0, 1, 2], // Top row
   [3, 4, 5], // Middle row
   [6, 7, 8], // Bottom row
   [0, 3, 6], // Left column
   [1, 4, 7], // Middle column
   [2, 5, 8], // Right column
   [0, 4, 8], // Diagonal from top-left to bottom-right
   [2, 4, 6]  // Diagonal from top-right to bottom-left
 ];
 
 // Add click event listener to each cell
 cells.forEach(cell => {
   cell.addEventListener('click', handleClick, { once: true }); // 'once: true' ensures the event listener is removed after the first click
 });
 
 // Function to handle cell click event
 function handleClick(e) {
    debugger;
   const cell = e.target; // Get the clicked cell
   const index = Array.from(cell.parentNode.children).indexOf(cell); // Get the index of the clicked cell
 
   // If the game is not active or the cell is already filled, return
   if (!gameActive || cell.textContent !== '') return;
 
   // Mark the cell with the current player's symbol
   cell.textContent = currentPlayer;
   cell.classList.add(`player${currentPlayer}`);
 
   // Check if the current player wins the game
   if (checkWin(currentPlayer)) {
     gameActive = false; // Set game status to inactive
     messageText.textContent = `${currentPlayer} wins!`; // Display winner message
     let elmButton = document.getElementById('playButton');
     elmButton.style.display = "block"; // showing play again button 
   } else if (checkDraw()) {
     gameActive = false; // Set game status to inactive
     messageText.textContent = "It's a draw!"; // Display draw message
     let elmButton = document.getElementById('playButton');
     elmButton.style.display = "block"; // showing play again button 
   } else {
     currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch the current player
     messageText.textContent = "Player" + currentPlayer + "'s turn"; // Update message to display the current player's turn
   }
 }
 
// Function to check if the current player wins the game
function checkWin(player) {
    return winningCombination.some(combination => 
        combination.every(index => cells[index].classList.contains(`player${player}`))
    );
}
 
// Function to check if the game ends in a draw
function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent !== '');
}

// Function to reset all the cells after clicking play again
document.getElementById('playButton').addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
    });

    // Reset game status and current player
    gameActive = true;
    currentPlayer = 'X';
    messageText.textContent = `Player ${currentPlayer}'s turn`;
    let elmButton = document.getElementById('playButton');
    elmButton.style.display = "none"; // hiding play again button 
});