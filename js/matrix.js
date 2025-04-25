var matrix = {
	__matrix: [],
	setMatrix: function(matrix){
		this.__matrix = matrix;
	},
	getMatrix: function(){
		return this.__matrix;
	},
	init: function(i){
		this.__matrix = [];
		
		for(var x = 0; x <= i-1; x++)
		{
			this.__matrix[x] = [];
			
			for(var y = 0; y <= i-1; y++)
			{
				this.__matrix[x][y] = 0;
			}
		}
	},
	populate: function()
	{
		var seq = 0;
		var potentialPlaces = [];
		var size = this.__matrix.length;
		
		
		for(var x = 0; x <= size-1; x++)
		{
			for(var y = 0; y <= size-1; y++)
			{
				if(this.__matrix[x][y]==0)
				{
					potentialPlaces.push(seq);
				}
				
				seq++;
			}
		}
		
		if(potentialPlaces.length==0)
		{
			if(!this.checkDoubleNeighbor())
			{
				alert('Game over :-(');
			}
		} 
		else 
		{
			var newNumber = potentialPlaces[utils.getRandomArbitrary(0, potentialPlaces.length-1)];
			
			seq=0;
			
			for(var x = 0; x <= size-1; x++)
			{
				for(var y = 0; y <= size-1; y++)
				{
					if(seq==newNumber)
					{
						this.__matrix[x][y] = utils.getRandomValue();
						ui.renderCell(x, y, this.__matrix[x][y]);
					}
					
					seq++;
				}
			}		
		}
	},
	checkDoubleNeighbor: function()
	{
		var size = this.__matrix.length;
		
		for(var x = 0; x <= size-1; x++)
		{
			for(var y = 0; y <= size-1; y++)
			{
				if(y < size-1 && this.__matrix[x][y]==this.__matrix[x][y+1] && this.__matrix[x][y] > 0)
				{
					return true;
				}
			}
		}

		for(var y = 0; y <= size-1; y++)
		{
			for(var x = 0; x <= size-1; x++)
			{
				if(x < size-1 && this.__matrix[x][y]==this.__matrix[x+1][y] && this.__matrix[x][y] > 0)
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
			if(vector[i] > 0 && i < size-1 && vector[i+1]==0)
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
		if(vector[i] > 0 && i > 0 && vector[i-1]==0)
		{
			pos = i;
		}
	}	

	return pos;
	},
	removeZeroRight: function(x){
		var size = this.__matrix.length;
		
		var lastPosition = -1;
		var searchIndex = -1;

		while((searchIndex = this.getLastNotNullPosition(this.__matrix[x])) > -1)
		{
			if(searchIndex!=lastPosition)
			{
				for(var i=searchIndex; i <= size-1; i++)
				{
					if(this.__matrix[x][i+1]==0)
					{
						this.__matrix[x][i+1] = this.__matrix[x][i];
						this.__matrix[x][i] = 0;
						
						ui.renderCell(x, i, 0);
						ui.renderCell(x, i+1, this.__matrix[x][i+1]);
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

	},
	moveRight: function(){
		var size = this.__matrix.length;
		
		for(var x = 0; x <= size-1; x++)
		{
			this.removeZeroRight(x);

			for(var i = size-1; i >= 0; i--)
			{
				if(i > 0 && this.__matrix[x][i]==this.__matrix[x][i-1])
				{
					this.__matrix[x][i] = this.__matrix[x][i] * 2;
					this.__matrix[x][i-1] = 0;
					
					ui.score+= this.__matrix[x][i];
					
					ui.renderCell(x, i, this.__matrix[x][i]);
					ui.renderCell(x, i-1, 0);
					
					this.removeZeroRight(x);
				}
			}

		}
	},
	removeZeroLeft: function(x){
		var size = this.__matrix.length;
		
		var lastPosition = -1;
		var searchIndex = -1;

		while((searchIndex = this.getFirstNotNullPosition(this.__matrix[x])) > -1)
		{
			if(searchIndex!=lastPosition)
			{
				for(var i=searchIndex; i >= 0; i--)
				{
					if(this.__matrix[x][i-1]==0)
					{
						this.__matrix[x][i-1] = this.__matrix[x][i];
						this.__matrix[x][i] = 0;
						
						ui.renderCell(x, i, 0);
						ui.renderCell(x, i-1, this.__matrix[x][i-1]);
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
	},
	moveLeft: function()
	{
		var size = this.__matrix.length;
		
		for(var x = 0; x <= size-1; x++)
		{	
			this.removeZeroLeft(x);
			
			for(var i = 0; i <= size-1; i++)
			{
				if(i < size-1 && this.__matrix[x][i]==this.__matrix[x][i+1])
				{
					this.__matrix[x][i] = this.__matrix[x][i] * 2;
					this.__matrix[x][i+1] = 0;
					
					ui.score+= this.__matrix[x][i];
					
					ui.renderCell(x, i, this.__matrix[x][i]);
					ui.renderCell(x, i+1, 0);
					
					this.removeZeroLeft(x);			
				}
			}

		}

	},
	removeZeroUp: function(y){
		var size = this.__matrix.length;
		
		var column = utils.extractColumn(this.__matrix, y);
		
		var lastPosition = -1;
		var searchIndex = -1;

		while((searchIndex = this.getFirstNotNullPosition(column)) > -1)
		{
			if(searchIndex!=lastPosition)
			{
				for(var i=searchIndex; i >= 0; i--)
				{
					if(column[i-1]==0)
					{
						column[i-1] = this.__matrix[i][y];
						column[i] = 0;						
						
						this.__matrix[i-1][y] = this.__matrix[i][y];
						this.__matrix[i][y] = 0;
						
						ui.renderCell(i, y, 0);
						ui.renderCell(i-1, y, this.__matrix[i-1][y]);
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
	},
	moveUp: function(){
		var size = this.__matrix.length;
		
		// oszlopok	
		for(var y = 0; y <= size-1; y++)
		{
			this.removeZeroUp(y);
			
			for(var i = 0; i <= size-1; i++)
			{
				if(i < size-1 && this.__matrix[i][y]==this.__matrix[i+1][y])
				{
					this.__matrix[i][y] = this.__matrix[i][y] * 2;
					this.__matrix[i+1][y] = 0;
					
					ui.score+= this.__matrix[i][y];
					
					ui.renderCell(i, y, this.__matrix[i][y]);
					ui.renderCell(i+1, y, 0);
					
					this.removeZeroUp(y);
				}
			}	
		}
	},
	removeZeroDown: function(y){
		var size = this.__matrix.length;
		
			var column = utils.extractColumn(this.__matrix, y);
			
			var lastPosition = -1;
			var searchIndex = -1;
		
			while((searchIndex = this.getLastNotNullPosition(column)) > -1)
			{
				if(searchIndex!=lastPosition)
				{
					for(var i=searchIndex; i <= size -1; i++)
					{
						if(column[i+1]==0)
						{
							column[i+1] = this.__matrix[i][y];
							column[i] = 0;						
							
							this.__matrix[i+1][y] = this.__matrix[i][y];
							this.__matrix[i][y] = 0;
							
							ui.renderCell(i, y, 0);
							ui.renderCell(i+1, y, this.__matrix[i+1][y]);
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
	},
	moveDown: function(){
		var size = this.__matrix.length;
		
		// oszlopok	
		for(var y = 0; y <= size-1; y++)
		{
			this.removeZeroDown(y);

			for(var i = size-1; i >= 0; i--)
			{
				if(i > 0 && this.__matrix[i][y]==this.__matrix[i-1][y])
				{
					this.__matrix[i][y] = this.__matrix[i][y] * 2;
					this.__matrix[i-1][y] = 0;
					
					ui.score+= this.__matrix[i][y];
					
					ui.renderCell(i, y, this.__matrix[i][y]);
					ui.renderCell(i-1, y, 0);
					
					this.removeZeroDown(y);
				}

			}	

		}
	}	

	
};