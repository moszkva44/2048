function Matrix(size){
	this.__matrix = [];
	
	this.init(size);
}

Matrix.prototype.get = function(){
	return this.__matrix;
};

Matrix.prototype.getAsArray = function(){
	var matrix = [];
	
	this.__matrix.forEach((row, x) => {
		matrix[x] = [];
		row.forEach((val, y) => {
			matrix[x][y] = this.__matrix[x][y].getValue();
		});
	});	
	
	return matrix;
};

Matrix.prototype.setFromArray = function(matrix){
	this.__matrix = [];
	
	matrix.forEach((row, x) => {
		this.__matrix[x] = [];
		row.forEach((val, y) => {
			this.__matrix[x][y] = new Tile(TileManager.createTileElement(val), val);
		});
	});	
};

Matrix.prototype.init = function(i){
	this.__matrix = [];
	
	var rows = { length: i };
	
	Array.from(rows, () => Array.from(rows, () => 0)).forEach((row, x) => {
		this.__matrix[x] = [];
		row.forEach((column, y) => {
			this.__matrix[x][y] = new Tile(TileManager.createTileElement(0), 0);
		});
	});	
};

Matrix.prototype.getIndexesOfAvailableTiles = function(){
	var places = [];

	this.__matrix.forEach((row, x) => {
		row.forEach((column, y) => {
			if(this.__matrix[x][y].getValue()==0) places.push(x * this.__matrix.length + y);			
		});
	});	
	
	return places;
};

Matrix.prototype.hasMergableCells = function(){
	var checkLines = function(matrix){
		for(var x = 0; x <= matrix.length-1; x++){
			for(var y = 0; y < matrix.length-1; y++){
				if(matrix[x][y].getValue()==matrix[x][y+1].getValue() && matrix[x][y].getValue() > 0) return true;
			}
		}
		
		return false;
	};
	
	return checkLines(this.__matrix) || checkLines(utils.rotateMatrix(this.__matrix));
};


