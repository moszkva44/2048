

var utils = {
	getRandomValue: function(){
		var values = [2,2,2,2,2,4,2,2,2,2];
		
		return values[this.getRandomArbitrary(0, values.length-1)]
	},
	
	getRandomArbitrary: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	
	extractColumn: function(arr, column){
		return arr.map(x => x[column])
	},
	sleep: function(ms) { 
		return new Promise(res => setTimeout(res, ms)); 
	}	
};