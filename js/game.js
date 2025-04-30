const MOVE = {'LEFT': 'moveRow:-1', 'RIGHT': 'moveRow:1', 'UP': 'moveColumn:-1', 'DOWN': 'moveColumn:1'};

var game = {	
	__prevState: false,
	getBackupPoint: function(){
		return this.__prevState;
	},	
	handleUserAction: async function(direction){
		if(direction=='')
		{
			return false;
		}
		
		this.createBackupPoint();
		
		var [fn, dir] = direction.split(':');
		
		if(await MoveManager.move(fn, parseInt(dir))){
			if(this.getBackupPoint().matrix!==JSON.stringify(matrix.getMatrixInArray()))
			{
				await utils.sleep(250);
				await TileManager.addNewTile();
				
			}			
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
			matrix.setMatrix(JSON.parse(localStorage.getItem("matrix")));
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
			
			matrix.setMatrix(JSON.parse(this.__prevState.matrix));
			ui.score = parseInt(this.__prevState.score);
			
			ui.renderMatrix();
			ui.renderScore();			
		}	
	},
	createBackupPoint: function(){
		this.__prevState = {"matrix": JSON.stringify(matrix.getMatrixInArray()), "score": ui.score};
	},
	createSnapshot: function(){		
		localStorage.setItem("matrix", JSON.stringify(matrix.getMatrixInArray()));
		localStorage.setItem("score", ui.score);

	},
	isGamerOver:function(){
		return (matrix.getFreePlaces().length==0 && !matrix.hasMergableCells());
	}
	
};