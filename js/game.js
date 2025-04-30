const MOVE = {
	'LEFT': [-1,0], 
	'RIGHT': [1,0], 
	'UP': [0,-1], 
	'DOWN': [0,1]
};

var game = {	
	__prevState: false,
	getBackupPoint: function(){
		return this.__prevState;
	},	
	handleUserAction: async function(action, dontAddTile){
		// There was no move
		if(action[0]==0 && action[1]==0) return false;
		
		dontAddTile = dontAddTile || false;
		
		this.createBackupPoint();
		
		await MoveManager.move({'stepX': action[0], 'stepY': action[1]});
		
		if(!dontAddTile&& this.getBackupPoint().matrix!==JSON.stringify(matrix.getAsArray()))
		{
			await utils.sleep(250);
			await TileManager.addNewTile();
			
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
	},
	startNew: function(size){
		ui.hideGameOver();
		
		if(localStorage.getItem("matrix") && localStorage.getItem("score")){
			matrix.setFromArray(JSON.parse(localStorage.getItem("matrix")));
			ui.score = parseInt(localStorage.getItem("score"));
			
			ui.renderMatrix();
			ui.renderScore();
			
		}else{
			matrix.init(size);
			
			ui.score = 0;

			ui.renderMatrix();
			
			TileManager.addNewTile();
			TileManager.addNewTile();
			
			ui.renderScore();
		}		
	},	
	reset: function(size){
		ui.destroyElements();
		ui.hideGameOver();
		
		localStorage.removeItem("matrix");
		localStorage.removeItem("score");
		
		matrix.init(size);
		ui.score = 0;
			
		ui.renderMatrix();
		
		TileManager.addNewTile();
		TileManager.addNewTile();	
		
		ui.renderScore();		
	},	
	undo: function(){
		if(this.__prevState){
			ui.destroyElements();
			
			matrix.setFromArray(JSON.parse(this.__prevState.matrix));
			ui.score = parseInt(this.__prevState.score);
			
			ui.renderMatrix();
			ui.renderScore();			
		}	
	},
	createBackupPoint: function(){
		this.__prevState = {"matrix": JSON.stringify(matrix.getAsArray()), "score": ui.score};
	},
	createSnapshot: function(){		
		localStorage.setItem("matrix", JSON.stringify(matrix.getAsArray()));
		localStorage.setItem("score", ui.score);

	},
	isGamerOver:function(){
		return (matrix.getFreePlaces().length==0 && !matrix.hasMergableCells());
	}
	
};