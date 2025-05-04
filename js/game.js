const MOVE = {
	'LEFT':	new Direction(-1,0), 
	'RIGHT': new Direction(1,0), 
	'UP': new Direction(0,-1), 
	'DOWN': new Direction(0,1)
};

/**
* Init a new Game with size of the desired matrix
*/
function Game(size){
	this.size = this.__processSizeParameter(size);
	this.__matrix = [];
	this.__stableTileCount = 0;
	this.__prevState = false;

	this.init(this.size);
	
	globals.game = this;
}

/**
* Get the initialized matrix
*/
Game.prototype.getMatrix = function(){
	return this.__matrix;
};

/**
* Init a game. If there are saved matrix stored in localStorage, set matrix from it.
*/
Game.prototype.init = function(size){
	ui.hideGameOver();
	
	if(localStorage.getItem("matrix") && localStorage.getItem("score")){		
		globals.matrix = this.__matrix = new Matrix(size);		
		this.__matrix.setFromArray(JSON.parse(localStorage.getItem("matrix")));
		ui.score = parseInt(localStorage.getItem("score"));
		
		ui.renderMatrix();
		
		ui.renderScore();
	}else{
		globals.matrix = this.__matrix = new Matrix(localStorage.getItem("pref_size") ? localStorage.getItem("pref_size") : size);	
		
		ui.score = 0;

		ui.renderMatrix();
		
		if(this.__stableTileCount==1) TileManager.setTileStable(2,2);
		
		if(this.__stableTileCount==2){
			TileManager.setTileStable(0,4);
			TileManager.setTileStable(4,0);
		}
		
		TileManager.addNumber();
		TileManager.addNumber();
		
		ui.renderScore();
	}			
};

/**
* Get stored previous state
*/
Game.prototype.getBackupPoint = function(){
	return this.__prevState;
};

/**
* Handle user input to move tiles to different directions
*/
Game.prototype.handleUserAction = async function(action, dontAddTile = false){
	// If no move happened, exit from the function
	if(action.stepX==0 && action.stepY==0) return false;
	
	this.createBackupPoint();
	
	await MoveManager.move(action);
	
	if(!dontAddTile&& this.getBackupPoint().matrix!==JSON.stringify(this.__matrix.getAsArray())){
		await utils.sleep(250);
		await TileManager.addNumber();
	}			
	
	ui.renderScore();
	
	if(this.isGamerOver()){
		localStorage.removeItem("matrix");
		localStorage.removeItem("score");			
		ui.renderGameOver();
		return false;
	}
	
	this.createSnapshot();
	
	return false;
};

/**
* Process size parameter and get correect size and set the count of stable tiles if it is necessary 
*/
Game.prototype.__processSizeParameter = function(size){
	if(size=='5-1'){
		size = 5;
		this.__stableTileCount = 1;
	}
	
	if(size=='5-2'){
		size = 5;
		this.__stableTileCount = 2;
	}	

	return size;
};

/**
* Get the count of stable tiles in the matrix.
*/
Game.prototype.getStableTileCount = function(){
	return this.__stableTileCount;
};
/**
* Reset the game
*/
Game.prototype.reset = function(size){
	size = this.__processSizeParameter(size);
	
	ui.destroyElements();
	ui.hideGameOver();
	
	localStorage.removeItem("matrix");
	localStorage.removeItem("score");
	
	globals.matrix = this.__matrix = new Matrix(size);
	
	ui.score = 0;

	ui.renderMatrix();
	
	if(this.__stableTileCount==1) TileManager.setTileStable(2,2);
	
	if(this.__stableTileCount==2){
		TileManager.setTileStable(0,4);
		TileManager.setTileStable(4,0);
	}	
	
	TileManager.addNumber();
	TileManager.addNumber();	
	
	ui.renderScore();	

	localStorage.setItem("pref_size", size);
};

/**
* Undo the last move and go back to the previous state
*/
Game.prototype.undo = function(){
	if(this.__prevState){
		ui.destroyElements();
		
		this.__matrix.setFromArray(JSON.parse(this.__prevState.matrix));
		ui.score = parseInt(this.__prevState.score);
		
		ui.renderMatrix();
		ui.renderScore();			
	}	
};

/**
* Create a backup point
*/
Game.prototype.createBackupPoint = function(){
	this.__prevState = {"matrix": JSON.stringify(this.__matrix.getAsArray()), "score": ui.score};
};

/**
* Remove the bacup point
*/
Game.prototype.removeBackupPoint = function(){
	this.__prevState = false;
};

/**
* Save game (matrix and score) in localStorage
*/
Game.prototype.createSnapshot = function(){		
	localStorage.setItem("matrix", JSON.stringify(this.__matrix.getAsArray()));
	localStorage.setItem("score", ui.score);
	localStorage.setItem("stableTileCount", this.__stableTileCount);
};

/**
* Return true if there is no more move and game over
*/
Game.prototype.isGamerOver = function(){
	return (this.__matrix.getIndexesOfAvailableTiles().length==0 && !this.__matrix.hasMergableCells());
};

