const MOVE = {
	'LEFT':	new Direction(-1,0), 
	'RIGHT': new Direction(1,0), 
	'UP': new Direction(0,-1), 
	'DOWN': new Direction(0,1)
};

function Game(size){
	this.size = size;
	this.__matrix = [];
	this.__prevState = false;
	
	this.init(size);
	
	globals.game = this;
}

Game.prototype.getMatrix = function(){
	return this.__matrix;
};

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
		
		TileManager.addNumber();
		TileManager.addNumber();
		
		ui.renderScore();
	}			
};

Game.prototype.getBackupPoint = function(){
	return this.__prevState;
};

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

Game.prototype.reset = function(size){
	ui.destroyElements();
	ui.hideGameOver();
	
	localStorage.removeItem("matrix");
	localStorage.removeItem("score");
	
	globals.matrix = this.__matrix = new Matrix(size);
	
	ui.score = 0;

	ui.renderMatrix();
	
	TileManager.addNumber();
	TileManager.addNumber();	
	
	ui.renderScore();	

	localStorage.setItem("pref_size", size);
};

Game.prototype.undo = function(){
	if(this.__prevState){
		ui.destroyElements();
		
		this.__matrix.setFromArray(JSON.parse(this.__prevState.matrix));
		ui.score = parseInt(this.__prevState.score);
		
		ui.renderMatrix();
		ui.renderScore();			
	}	
};

Game.prototype.createBackupPoint = function(){
	this.__prevState = {"matrix": JSON.stringify(this.__matrix.getAsArray()), "score": ui.score};
};

Game.prototype.removeBackupPoint = function(){
	this.__prevState = false;
};

Game.prototype.createSnapshot = function(){		
	localStorage.setItem("matrix", JSON.stringify(this.__matrix.getAsArray()));
	localStorage.setItem("score", ui.score);
};

Game.prototype.isGamerOver = function(){
	return (this.__matrix.getIndexesOfAvailableTiles().length==0 && !this.__matrix.hasMergableCells());
};
