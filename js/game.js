const MOVE = {'LEFT': 'moveRowLeft', 'RIGHT': 'moveRowRight', 'UP': 'moveRowUp', 'DOWN': 'moveRowDown'};

var game = {	
	__prevState: false,
	getBackupPoint: function(){
		return this.__prevState;
	},	
	handleUserAction: async function(direction){
		this.createBackupPoint();
		
		if(await matrix.move(direction)){
			if(this.getBackupPoint().matrix!==JSON.stringify(matrix.getMatrixInArray()))
			{
				await utils.sleep(250);
				await matrix.addNewTile();
				
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