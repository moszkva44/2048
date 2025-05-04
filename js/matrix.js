/**
* Init a new matrix with the given size
*/
function Matrix(size){
	this.__matrix = [];
	
	this.init(size);
}

/**
* Get matrix as an object
*/
Matrix.prototype.get = function(){
	return this.__matrix;
};

/**
* Get matrix as 2d array
*/
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

/**
* Set matrix from a 2d array
*/
Matrix.prototype.setFromArray = function(matrix){
	this.__matrix = [];
	
	matrix.forEach((row, x) => {
		this.__matrix[x] = [];
		row.forEach((val, y) => {
			this.__matrix[x][y] = new Tile(TileManager.createTileElement(val), val);
			
			if(this.__matrix[x][y].getValue()=='X') this.__matrix[x][y].setStable();
		});
	});	
};

/**
* init the matrix with a size specified in the argument and fill it with zero values
*/
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

/**
* Return an array containing indexes of tiles having zero value
*/
Matrix.prototype.getIndexesOfAvailableTiles = function(){
	var places = [];

	this.__matrix.forEach((row, x) => {
		row.forEach((column, y) => {
			if(this.__matrix[x][y].getValue()==0) places.push(x * this.__matrix.length + y);			
		});
	});	
	
	return places;
};

/**
* return true if matrix has mergable cells
*/
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


