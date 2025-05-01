var utils = {
	getRandomValue: function(){
		return globals.values[this.getRandomInRange(0, globals.values.length-1)]
	},	
	getRandomInRange: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},	
	extractColumn: function(arr, column){
		return arr.map(x => x[column]);
	},
	extractRow: function(arr, row){
		return arr[row].map(x => x);
	},	
	sleep: function(ms) { 
		return new Promise(res => setTimeout(res, ms)); 
	},
	getIterator: function(start, end, direction=1, callbackfunc){
		for(var i = (direction==1 ? start : end); (direction==1 ? i < end : i > start); i=(direction==1 ? i + 1 : i - 1)){
			callbackfunc(i);
		}		
	},
	rotateMatrix: function(matrix){
		return matrix.map((val, index) => matrix.map(row => row[index]).reverse());		
	}
};