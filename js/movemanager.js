var MoveManager = {
	/**
	* Take a vector and according to the given direction find the furthest tile a with value greater than zero that can be moved further,
	* then return its index.
	*/
	__getPosOfTileToBeMoved: function(vector, direction){
		var pos = -1;
		
		utils.getIterator(0, vector.length-1, direction, (i) => {
			if(vector[i].getValue() > 0 && !vector[i].isStable() && vector[i+direction].getValue()===0){
				pos = i;
			}			
		});

		return pos;
	},
	/**
	* return true if the given direction is vertical.
	*/
	__isVerticalStep: function(dir){
		return dir.stepY!=0;
	},
	/**
	* Take a line by its index according to the direction (row or col) and shift tiles greater than zero to the margin.
	*/
	__shiftTilesToMargin: async function(x, dir){
		var promises = [];
	
		var vector = (this.__isVerticalStep(dir) ? utils.extractColumn(globals.matrix.get(), x) : utils.extractRow(globals.matrix.get(), x));
		
		var step = (dir.stepX!=0) ? dir.stepX : dir.stepY;
	
		while(this.__getPosOfTileToBeMoved(vector, step) > -1){
			utils.getIterator(0, globals.matrix.get().length-1, step, (i) => {
				if(vector[i+step].getValue()===0 && !vector[i].isStable() && !vector[i+step].isStable()){	
					vector[i + step] = this.__isVerticalStep(dir) ? globals.matrix.get()[i][x] : globals.matrix.get()[x][i];
					vector[i] = new Tile({}, 0);	

					promises.push(this.__isVerticalStep(dir) ? TileManager.swapTiles(i + step, x, i, x) : TileManager.swapTiles(x, i + step, x, i));
				}		
			});			
		}

		await Promise.all(promises);
	},
	/**
	* Handle move action. According to the given direction, move lines (row or colls) one by one.
	*/
	move: async function(dir){
		var size = globals.matrix.get().length;
		
		var fn = [];
		
		for(var x = 0; x <= size-1; x++){
			fn.push(this.__moveLine(x, dir));
		}
		
		return await Promise.all(fn);				
	},	
	/**
	* Take a line by its index and move it according to the given direction.
	*/
	__moveLine: async function(x, dir){
		await this.__shiftTilesToMargin(x, dir);

		step = (dir.stepX!=0) ? dir.stepX : dir.stepY;

		var promises = [];
		
		utils.getIterator(0, globals.matrix.get().length-1, -step, async (i) => {
			if(this.__isVerticalStep(dir) && globals.matrix.get()[i][x].getValue()===globals.matrix.get()[i-step][x].getValue()){
				promises.push(TileManager.mergeTiles(i, x, i-step, x));
				promises.push(this.__shiftTilesToMargin(x, dir));
			}else if(!this.__isVerticalStep(dir) && globals.matrix.get()[x][i].getValue()===globals.matrix.get()[x][i-step].getValue()){
				promises.push(TileManager.mergeTiles(x, i, x, i-step));	
				promises.push(this.__shiftTilesToMargin(x, dir));
			}	
		});		
		
		await Promise.all(promises);
		
		return true;
	}
	
};