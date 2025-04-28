function Tile(e, v){
	this.__value = v;
	this.__element = e;
	
	this.getValue = function(){
		return this.__value;
	};	
	
	this.setValue = function(v){
		this.__value = v;
	};	

	this.getElement = function(){
		return this.__element;
	};

	this.setElement = function(e){
		this.__element = e;
	};
};