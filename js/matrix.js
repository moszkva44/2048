var matrix = {
	__matrix: [],
	setMatrix: function(matrix){
		var size = matrix.length;
		
		this.__matrix = [];
		
		for(var x = 0; x <= size-1; x++)
		{
			this.__matrix[x] = [];
			
			for(var y = 0; y <= size-1; y++)
			{
				this.__matrix[x][y] = new Tile(ui.createTileElement(matrix[x][y]), matrix[x][y]);
			}
		}
	},
	getMatrix: function(){
		return this.__matrix;
	},
	getMatrixInArray: function(){
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
	init: function(i){
		this.__matrix = [];
		
		for(var x = 0; x <= i-1; x++)
		{
			this.__matrix[x] = [];
			
			for(var y = 0; y <= i-1; y++)
			{
				this.__matrix[x][y] = new Tile(ui.createTileElement(0), 0);
			}
		}
	},
	destroyElements: function(){
		var size = this.__matrix.length;
		
		for(var x = 0; x <= size-1; x++)
		{
			for(var y = 0; y <= size-1; y++)
			{
				document.body.removeChild(this.__matrix[x][y].getElement());
				this.__matrix[x][y] = null;
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
	addNewTile: async function()
	{
		var seq = 0;
		var potentialPlaces = this.getFreePlaces();
		var size = this.__matrix.length;
		
		if(potentialPlaces.length > 0) 
		{
			var newNumber = potentialPlaces[utils.getRandomArbitrary(0, potentialPlaces.length-1)];
			
			seq=0;
			
			for(var x = 0; x <= size-1; x++)
			{
				for(var y = 0; y <= size-1; y++)
				{
					if(seq==newNumber)
					{
						await ui.changeTile(x, y, utils.getRandomValue());
					}
					
					seq++;
				}
			}		
		}
	},
	addNewTileAfterChange: async function(){
		/*
		if(game.getBackupPoint().matrix!==JSON.stringify(this.getMatrixInArray())){
			await this.addNewTile();
		}
		*/
	},
	doesMergableCellsExist: function()
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
	},
	getLastNotNullPosition: function(vector){
		var size = vector.length;
		
		var pos = -1;
		
		for(var i = 0; i <= size-1; i++)
		{
			if(vector[i].getValue() > 0 && i < size-1 && vector[i+1].getValue()==0)
			{
				pos = i;
			}
		}	

		return pos;
	},	
	
	getFirstNotNullPosition: function(vector){
		var size = vector.length;
		
		var pos = -1;
		
		for(var i = size-1; i >= 0; i--)
		{
			if(vector[i].getValue() > 0 && i > 0 && vector[i-1].getValue()==0)
			{
				pos = i;
			}
		}	

		return pos;
	},
	removeZeroRight: async function(x){
		var size = this.__matrix.length;
		
		var lastPosition = -1;
		var searchIndex = -1;

		var promises = [];
		
		while((searchIndex = this.getLastNotNullPosition(this.__matrix[x])) > -1)
		{
			if(searchIndex!=lastPosition)
			{
				for(var i=searchIndex; i < size-1; i++)
				{
					if(this.__matrix[x][i+1].getValue()==0)
					{
						promises.push(ui.moveTile(x, i, x, i + 1));
					}
					else
					{
						break;
					}
				}

				lastPosition = searchIndex;
			} 
			else
			{
				lastPosition = -1;
				break;
			}
			
		}
		
		await Promise.all(promises);	

	},	
	moveRight: async function(){
		var size = this.__matrix.length;
		
		var fn = [];
		
		for(var x = 0; x <= size-1; x++)
		{
			fn.push(this.moveRowRight(x));
		}
		
		await Promise.all(fn);	
	},

	moveRowRight: async function(x){
		var size = this.__matrix.length;
		
		var promises = [];
		
		await this.removeZeroRight(x);

		for(var i = size-1; i >= 0; i--)
		{
			if(i > 0 && this.__matrix[x][i].getValue()==this.__matrix[x][i-1].getValue())
			{
				promises.push(ui.moveTile(x, i-1, x, i));
				promises.push(ui.changeTile(x, i, this.__matrix[x][i].getValue() * 2));	
				promises.push(ui.changeTile(x, i-1, 0));				
				
				ui.score+= this.__matrix[x][i].getValue();

				promises.push(this.removeZeroRight(x));
			}
		}
		
		await Promise.all(promises);
	},

	removeZeroLeft: async function(x){
		var size = this.__matrix.length;
		
		var lastPosition = -1;
		var searchIndex = -1;

		var promises = [];
		while((searchIndex = this.getFirstNotNullPosition(this.__matrix[x])) > -1)
		{
			if(searchIndex!=lastPosition)
			{
				for(var i=searchIndex; i > 0; i--)
				{
					if(this.__matrix[x][i-1].getValue()==0)
					{
						promises.push(ui.moveTile(x, i, x, i - 1));
					}
					else
					{
						break;
					}
				}

				lastPosition = searchIndex;
			} 
			else
			{
				lastPosition = -1;
				break;
			}
			
		}
		
		await Promise.all(promises);	
	},
	
	moveLeft: async function()
	{
		var size = this.__matrix.length;
		
		var fn = [];
		
		for(var x = 0; x <= size-1; x++)
		{
			fn.push(this.moveRowLeft(x));
		}
		
		await Promise.all(fn);		
	},

	moveRowLeft: async function(x)
	{
		var size = this.__matrix.length;
		
		await this.removeZeroLeft(x);		
		
		var promises = [];
		
		for(var i = 0; i <= size-1; i++)
		{
			if(i < size-1 && this.__matrix[x][i].getValue()==this.__matrix[x][i+1].getValue())
			{				
				promises.push(ui.moveTile(x, i+1, x, i));
				promises.push(ui.changeTile(x, i, this.__matrix[x][i].getValue() * 2));	
				promises.push(ui.changeTile(x, i+1, 0));
				
				ui.score+= this.__matrix[x][i].getValue();
				
				promises.push(this.removeZeroLeft(x));			
			}
		}
		
		await Promise.all(promises);
	},	
	removeZeroUp: async function(y){
		var size = this.__matrix.length;
		
		var column = utils.extractColumn(this.__matrix, y);
		
		var promises = [];

		var lastPosition = -1;
		var searchIndex = -1;

		while((searchIndex = this.getFirstNotNullPosition(column)) > -1)
		{
			if(searchIndex!=lastPosition)
			{
				for(var i=searchIndex; i > 0; i--)
				{
					if(column[i-1].getValue()==0)
					{			
						column[i-1] = this.__matrix[i][y];
						column[i] = new Tile({}, 0);	
						
						promises.push(ui.moveTile(i - 1, y, i, y));
					}	
					else
					{
						break;
					}
				}

				lastPosition = searchIndex;
			} 
			else
			{
				lastPosition = -1;
				break;
			}
			
		}
		
		await Promise.all(promises);
	},
	
	moveUp: async function(){
		var size = this.__matrix.length;
		
		var fn = [];
		
		// oszlopok	
		for(var y = 0; y <= size-1; y++)
		{	
			fn.push(this.moveRowUp(y));			
		}
		
		await Promise.all(fn);			
	},

	moveRowUp: async function(y){
		var size = this.__matrix.length;
		
		var promises = [];
		
		await this.removeZeroUp(y);
		
		for(var i = 0; i <= size-1; i++)
		{
			if(i < size-1 && this.__matrix[i][y].getValue()==this.__matrix[i+1][y].getValue())
			{
				promises.push(ui.moveTile(i+1, y, i, y));
				promises.push(ui.changeTile(i, y, this.__matrix[i][y].getValue() * 2));	
				promises.push(ui.changeTile(i+1, y, 0));				
				
				ui.score+= this.__matrix[i][y].getValue();

				promises.push(this.removeZeroUp(y));
			}
		}

		await Promise.all(promises);
	},	
	removeZeroDown: async function(y){
		var size = this.__matrix.length;
		
		var promises = [];
	
		var column = utils.extractColumn(this.__matrix, y);
		
		var lastPosition = -1;
		var searchIndex = -1;
	
		while((searchIndex = this.getLastNotNullPosition(column)) > -1)
		{
			if(searchIndex!=lastPosition)
			{
				for(var i=searchIndex; i < size -1; i++)
				{
					if(column[i+1].getValue()==0)
					{		
						column[i+1] = this.__matrix[i][y];
						column[i] = new Tile({}, 0);		
						
						promises.push(ui.moveTile(i + 1, y, i, y));
					}
					else
					{
						break;
					}
				}

				lastPosition = searchIndex;
			} 
			else
			{
				lastPosition = -1;
				break;
			}
			
		}
		
		await Promise.all(promises);
	},
	moveDown: async function(){
		var size = this.__matrix.length;
		
		var fn = [];
		
		// oszlopok	
		for(var y = 0; y <= size-1; y++)
		{	
			fn.push(this.moveRowDown(y));			
		}
		
		await Promise.all(fn);				
	},
	moveRowDown: async function(y){
		var size = this.__matrix.length;
		
		var promises = [];
		
		await this.removeZeroDown(y);

		for(var i = size-1; i >= 0; i--)
		{
			if(i > 0 && this.__matrix[i][y].getValue()==this.__matrix[i-1][y].getValue())
			{
				promises.push(ui.moveTile(i-1, y, i, y));
				promises.push(ui.changeTile(i, y, this.__matrix[i][y].getValue() * 2));	
				promises.push(ui.changeTile(i-1, y, 0));					
				
				ui.score+= this.__matrix[i][y].getValue();

				promises.push(this.removeZeroDown(y));
			}

		}
		
		await Promise.all(promises);
	}		
	
};