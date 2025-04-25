var game = {
	__prevState: false,
	
	getBackupPoint: function(){
		return this.__prevState;
	},	
	new: function(){
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