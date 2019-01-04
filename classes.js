
  class Player {
   constructor(name) {
    this.name = name;
    this.type = "player";
    this.currentTurn = true;
    }

    // Set the currentTurn for player to turn and update UI to reflect the same.
    setCurrentTurn(turn) {
      this.currentTurn = turn;
      const message = turn ? 'Your turn' : 'Waiting for Opponent';
      $('#turn').text(message);
    }
    setPlayerType(type) {
      this.type = type;
    }

    getPlayerName() {
      return this.name;
    }

    getPlayerType() {
      return this.type;
    }

    getCurrentTurn() {
      return this.currentTurn;
    }
  }

  class Lobby {
    constructor(roomId) {
      this.roomId = roomId;
      this.players = [];
    }
        // Remove the menu from DOM, display the gameboard and greet the player.
    displayLobby(message) {
      $('#menu').css('display', 'none');
      $('#lobby').css('display', 'block');
      	    
      $('#userMessage').html(message);
      //this.createGameBoard();
    }
    
    getRoomId() {
      return this.roomId;
    }
  }
