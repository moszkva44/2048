var MoveManager = {
	__getExremePositionOfNotZero: function(vector, direction){
		var size = vector.length;
		
		var pos = -1;
		
		for(var i = (direction==1 ? 0 : size-1); (direction==1 ? i < size-1 : i > 0); i=(direction==1 ? i + 1 : i - 1))
		{
			if(vector[i].getValue() > 0 && vector[i+direction].getValue()==0)
			{
				pos = i;
			}
		}	

		return pos;
	},	
	__removeZerosFromRow: async function(x, direction){
		var size = matrix.getMatrix().length;
		
		var lastPosition = -1;
		var searchIndex = -1;

		var promises = [];
		
		while((searchIndex = this.__getExremePositionOfNotZero(matrix.getMatrix()[x], direction))  > -1)
		{
			if(searchIndex!=lastPosition)
			{
				for(var i=searchIndex; (direction==1 ? i < size-1 : i > 0); i = i + direction)
				{
					if(matrix.getMatrix()[x][i + direction].getValue()==0)
					{
						promises.push(TileManager.swapTiles(x, i, x, i + direction));
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

	__removeZerosFromColumn: async function(y, direction){
		var size = matrix.getMatrix().length;
		
		var promises = [];
	
		var column = utils.extractColumn(matrix.getMatrix(), y);
		
		var lastPosition = -1;
		var searchIndex = -1;
	
		while((searchIndex = this.__getExremePositionOfNotZero(column, direction)) > -1)
		{
			if(searchIndex!=lastPosition)
			{
				for(var i=searchIndex; (direction==1 ? i < size-1 : i > 0); i = i + direction)
				{
					if(column[i+direction].getValue()==0)
					{		
						column[i + direction] = matrix.getMatrix()[i][y];
						column[i] = new Tile({}, 0);		
						
						promises.push(TileManager.swapTiles(i + direction, y, i, y));
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

	move: async function(func, direction){
		var size = matrix.getMatrix().length;
		
		var fn = [];
		
		for(var x = 0; x <= size-1; x++)
		{
			fn.push(window['MoveManager'][func](x, direction));
		}
		
		return await Promise.all(fn);				
	},		
	
	moveRow: async function(x, direction)
	{
		var size = matrix.getMatrix().length;
		
		await this.__removeZerosFromRow(x, direction);		
		
		var promises = [];
		
		for(var i = (direction==1 ? size-1 : 0); (direction==1 ? i > 0 : i < size-1); i = (direction==1 ? i - 1: i + 1))
		{
			if(matrix.getMatrix()[x][i].getValue()==matrix.getMatrix()[x][i+(direction*-1)].getValue())
			{				
				promises.push(TileManager.swapTiles(x, i+(direction*-1), x, i));				
				promises.push(TileManager.changeTile(x, i, matrix.getMatrix()[x][i].getValue() * 2));				
				promises.push(TileManager.blinkTile(x, i));
				promises.push(TileManager.changeTile(x, i+(direction*-1), 0));
				
				ui.score+= matrix.getMatrix()[x][i].getValue();
				
				promises.push(this.__removeZerosFromRow(x, direction));			
			}
		}
		
		await Promise.all(promises);
	},	
	moveColumn: async function(y, direction){
		var size = matrix.getMatrix().length;
		
		var promises = [];
		
		await this.__removeZerosFromColumn(y, direction);

		for(var i = (direction==1 ? size-1 : 0); (direction==1 ? i > 0 : i < size -1); i=(direction==1 ? i-1 : i+1))
		{
			if(matrix.getMatrix()[i][y].getValue()==matrix.getMatrix()[i+(direction*-1)][y].getValue())
			{
				promises.push(TileManager.swapTiles(i+(direction*-1), y, i, y));				
				promises.push(TileManager.changeTile(i, y, matrix.getMatrix()[i][y].getValue() * 2));		
				promises.push(TileManager.blinkTile(i, y));
				promises.push(TileManager.changeTile(i+(direction*-1), y, 0));					
				
				ui.score+= matrix.getMatrix()[i][y].getValue();

				promises.push(this.__removeZerosFromColumn(y, direction));
			}

		}
		
		await Promise.all(promises);
	}	
	
	
};