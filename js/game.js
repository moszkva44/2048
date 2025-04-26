const LEFT_MOVE=1;
const RIGHT_MOVE=2;
const UP_MOVE = 3;
const DOWN_MOVE = 4;

var game = {
	__prevState: false,
	
	getBackupPoint: function(){
		return this.__prevState;
	},	
	handleUserAction: async function(direction){
		this.createBackupPoint();

		switch (direction) {
			case LEFT_MOVE:			
				await matrix.moveLeft();			
				break;
			case RIGHT_MOVE:
				await  matrix.moveRight();			
				break;
			case UP_MOVE:
				await  matrix.moveUp();			
				break;
			case DOWN_MOVE:
				await  matrix.moveDown();			
				break;
		}

		if(this.getBackupPoint().matrix!=JSON.stringify(matrix.getMatrix()))
		{
			await  matrix.populate();
		}
			
		ui.renderScore();
		this.createSnapshot();		
	},
	startNew: function(){
		if(localStorage.getItem("matrix") && localStorage.getItem("score")){
			matrix.setMatrix(JSON.parse(localStorage.getItem("matrix")));
			ui.score = parseInt(localStorage.getItem("score"));
			
			ui.renderMatrix();
			ui.renderScore();
			
		}else{
			matrix.init(5);
			ui.score = 0;
				
			ui.renderMatrix();
			
			matrix.populate();
			matrix.populate();	
			
			ui.renderScore();
		}		
	},	
	reset: function(){
		localStorage.removeItem("matrix");
		localStorage.removeItem("score");
		
		matrix.init(5);
		ui.score = 0;
			
		ui.renderMatrix();
		
		matrix.populate();
		matrix.populate();	
		
		ui.renderScore();		
	},	
	undo: function(){
		if(this.__prevState){
			matrix.setMatrix(JSON.parse(this.__prevState.matrix));
			ui.score = parseInt(this.__prevState.score);
			
			ui.renderMatrix();
			ui.renderScore();			
		}	
	},
	createBackupPoint: function(){
		this.__prevState = {"matrix": JSON.stringify(matrix.getMatrix()), "score": ui.score};
	},
	createSnapshot: function(){		
		localStorage.setItem("matrix", JSON.stringify(matrix.getMatrix()));
		localStorage.setItem("score", ui.score);

	}
	
};