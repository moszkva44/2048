var utils = {
	/**
	* Get a random new number for a tile
	*/
	getRandomValue: function(){
		return globals.values[this.getRandomInRange(0, globals.values.length-1)]
	},	
	/**
	* Get a random integer in the range of min and max
	*/
	getRandomInRange: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	/**
	* Get a column by its index from a 2d array
	*/	
	extractColumn: function(arr, column){
		return arr.map(x => x[column]);
	},
	/**
	* Get a row by its index from a 2d array
	*/
	extractRow: function(arr, row){
		return arr[row].map(x => x);
	},	
	/**
	* Sleep - duration in ms
	*/
	sleep: function(ms) { 
		return new Promise(res => setTimeout(res, ms)); 
	},
	/**
	* Get a loop with the start and end parameters. The callback function will be called inside the loop in every step with the current sequence
	*/
	getIterator: function(start, end, direction=1, callbackfunc){
		for(var i = (direction==1 ? start : end); (direction==1 ? i < end : i > start); i=(direction==1 ? i + 1 : i - 1)){
			callbackfunc(i);
		}		
	},
	/**
	* Rotate 2d array clockwise with 90 degrees 
	*/
	rotateMatrix: function(matrix){
		return matrix.map((val, index) => matrix.map(row => row[index]).reverse());		
	}
};