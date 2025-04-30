var matrix = {
	__matrix: [],
	get: function(){
		return this.__matrix;
	},	
	getAsArray: function(){
		var size = this.__matrix.length;
		var matrix = [];
		
		for(var x = 0; x <= size-1; x++)
		{
			matrix[x] = [];
			
			for(var y = 0; y <= size-1; y++)
			{
				matrix[x][y] = this.__matrix[x][y].getValue();
			}
		}
		
		return matrix;
	},
	setFromArray: function(matrix){
		var size = matrix.length;
		
		this.__matrix = [];
		
		for(var x = 0; x <= size-1; x++)
		{
			this.__matrix[x] = [];
			
			for(var y = 0; y <= size-1; y++)
			{
				this.__matrix[x][y] = new Tile(TileManager.createTileElement(matrix[x][y]), matrix[x][y]);
			}
		}
	},	
	init: function(i){
		this.__matrix = [];
		
		for(var x = 0; x <= i-1; x++)
		{
			this.__matrix[x] = [];
			
			for(var y = 0; y <= i-1; y++)
			{
				this.__matrix[x][y] = new Tile(TileManager.createTileElement(0), 0);
			}
		}
	},	
	getFreePlaces: function(){
		var seq = 0;
		var places = [];
		var size = this.__matrix.length;
	
		for(var x = 0; x <= size-1; x++)
		{
			for(var y = 0; y <= size-1; y++)
			{
				if(this.__matrix[x][y].getValue()==0)
				{
					places.push(seq);
				}
				
				seq++;
			}
		}		
		
		return places;
	},
	hasMergableCells: function()
	{
		var size = this.__matrix.length;
		
		for(var x = 0; x <= size-1; x++)
		{
			for(var y = 0; y <= size-1; y++)
			{
				if(y < size-1 && this.__matrix[x][y].getValue()==this.__matrix[x][y+1].getValue() && this.__matrix[x][y].getValue() > 0)
				{
					return true;
				}
			}
		}

		for(var y = 0; y <= size-1; y++)
		{
			for(var x = 0; x <= size-1; x++)
			{
				if(x < size-1 && this.__matrix[x][y].getValue()==this.__matrix[x+1][y].getValue() && this.__matrix[x][y].getValue() > 0)
				{
					return true;
				}
			}
		}		
		
		return false;
	}
	
};