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
	__isVerticalStep: function(dir){
		return dir.stepY!=0;
	},
	__removeZeros: async function(x, dir){
		var size = globals.matrix.get().length;
		
		var promises = [];
	
		// vertical move
		var vector = (this.__isVerticalStep(dir) ? utils.extractColumn(globals.matrix.get(), x) : utils.extractRow(globals.matrix.get(), x));
		
		var lastPosition = -1;
		var searchIndex = -1;
		
		var step = (dir.stepX!=0) ? dir.stepX : dir.stepY;
	
		while((searchIndex = this.__getExremePositionOfNotZero(vector, (dir.stepX!=0) ? dir.stepX : dir.stepY)) > -1)
		{
			if(searchIndex!=lastPosition)
			{
				for(var i=searchIndex; (step==1 ? i < size-1 : i > 0); i = i + step)
				{
					if(vector[i+step].getValue()==0)
					{	
						vector[i + step] = this.__isVerticalStep(dir) ? globals.matrix.get()[i][x] : globals.matrix.get()[x][i];
						vector[i] = new Tile({}, 0);	

						promises.push(this.__isVerticalStep(dir) ? TileManager.swapTiles(i + step, x, i, x) : promises.push(TileManager.swapTiles(x, i + step, x, i)));
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

	move: async function(dir){
		var size = globals.matrix.get().length;
		
		var fn = [];
		
		for(var x = 0; x <= size-1; x++)
		{
			fn.push(this.__moveLine(x, dir));
		}
		
		return await Promise.all(fn);				
	},		
	__moveLine: async function(x, dir){
		var size = globals.matrix.get().length;
		
		await this.__removeZeros(x, dir);

		step = (dir.stepX!=0) ? dir.stepX : dir.stepY;

		var promises = [];
		
		for(var i = (step==1 ? size-1 : 0); (step==1 ? i > 0 : i < size-1); i = (step==1 ? i - 1: i + 1))
		{
			// this.__isVerticalStep(dir) -> vertical move else horizontal
			if((this.__isVerticalStep(dir) ? globals.matrix.get()[i][x].getValue() : globals.matrix.get()[x][i].getValue())==(this.__isVerticalStep(dir) ? globals.matrix.get()[i+(step*-1)][x].getValue() : globals.matrix.get()[x][i+(step*-1)].getValue() ))
			{				
				promises.push(this.__isVerticalStep(dir) ? TileManager.swapTiles(i-step, x, i, x) : TileManager.swapTiles(x, i-step, x, i));				
				promises.push(this.__isVerticalStep(dir) ? TileManager.changeTile(i, x, globals.matrix.get()[i][x].getValue() * 2) : TileManager.changeTile(x, i, globals.matrix.get()[x][i].getValue() * 2));				
				promises.push(this.__isVerticalStep(dir) ? TileManager.blinkTile(i, x): TileManager.blinkTile(x, i));
				promises.push(this.__isVerticalStep(dir) ? TileManager.changeTile(i-step, x, 0) : TileManager.changeTile(x, i-step, 0));
				
				ui.score+= this.__isVerticalStep(dir) ? globals.matrix.get()[i][x].getValue() : globals.matrix.get()[x][i].getValue();
				
				promises.push(this.__removeZeros(x, dir));
			}
		}
		
		await Promise.all(promises);
		
		return true;
	}
	
};