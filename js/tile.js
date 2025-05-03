/**
* Init a new tile with a DOM element and its value
*/
function Tile(e, v){
	this.__value = v;
	this.__element = e;
	this.__stable = false;
	
	/**
	* Get the value of the tile
	*/
	this.getValue = function(){
		return this.__value;
	};	
	
	/**
	* Set the value of the tile
	*/
	this.setValue = function(v){
		this.__value = v;
	};	

	/**
	* Get the DOM element related to the tile
	*/
	this.getElement = function(){
		return this.__element;
	};

	/**
	* Bind a DOM element to the tile
	*/
	this.setElement = function(e){
		this.__element = e;
	};
	
	/**
	* return true if tile is set to stable otherwise return false
	*/
	this.isStable = function(){
		return this.__stable;
	}
	
	/**
	* Set tile to stable. If a tile is stable, its position is fix, it cannot be moved. It acts like a wall or an obstacle. 
	*/
	this.setStable = function(){
		this.__stable = true;
	}
};