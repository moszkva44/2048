const MOVE = {'LEFT': 1, 'RIGHT': 2, 'UP': 3, 'DOWN': 4};

var game = {	
	__prevState: false,
	getBackupPoint: function(){
		return this.__prevState;
	},	
	handleUserAction: async function(direction){
		this.createBackupPoint();
		
		var promises = [];
		
		switch (direction) {
			case MOVE.LEFT:			
				promises.push(matrix.moveLeft());			
				break;
			case MOVE.RIGHT:
				promises.push(matrix.moveRight());			
				break;
			case MOVE.UP:
				promises.push(matrix.moveUp());			
				break;
			case MOVE.DOWN:
				promises.push(matrix.moveDown());			
				break;
		}
				
		if(await Promise.all(promises)){
			if(this.getBackupPoint().matrix!==JSON.stringify(matrix.getMatrixInArray()))
			{
				await utils.sleep(250);
				matrix.addNewTile();
				
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
			
			matrix.addNewTile();
			matrix.addNewTile();	
			
			ui.renderScore();
		}		
	},	
	reset: function(size){
		matrix.destroyElements();
		ui.hideGameOver();
		
		localStorage.removeItem("matrix");
		localStorage.removeItem("score");
		
		matrix.init(size);
		ui.score = 0;
			
		ui.renderMatrix();
		
		matrix.addNewTile();
		matrix.addNewTile();	
		
		ui.renderScore();		
	},	
	undo: function(){
		if(this.__prevState){
			matrix.destroyElements();
			
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
		return (matrix.getFreePlaces().length==0 && !matrix.doesMergableCellsExist());
	}
	
};