var TileManager = {
	/**
	* Gind a random cell where the tile's value is zero and then change it to 2 or 4
	*/
	addNumber: async function(num = 0){
		var potentialPlaces = globals.matrix.getIndexesOfAvailableTiles();
		var size = globals.matrix.get().length;
		
		if(potentialPlaces.length==0) return false;

		var selected = potentialPlaces[utils.getRandomInRange(0, potentialPlaces.length-1)];

		for(var x = 0; x <= size-1; x++){
			for(var y = 0; y <= size-1; y++){
				if((x * size) + y==selected){
					await this.changeTile(x, y, num > 0 ? num : utils.getRandomValue());
					return true;
				}
			}
		}

		return false;
	},
	adjustTileToCell: async function(x, y){
		var tile = globals.matrix.get()[x][y];
		var pos = ui.__cells[x][y].getBoundingClientRect();
		
		tile.getElement().style.top = pos['top'];
		tile.getElement().style.left = pos['left'];	
		tile.getElement().style.width = pos['width'];
		tile.getElement().style.height = pos['height'];
		tile.getElement().style.lineHeight = pos['height'] + 'px';
	},
	createTileElement: function(v){
		var element = document.createElement('div');
		
		element.className='tile';
		
		if(v > 0){
			element.className+=" cell" + v;
		}else{
			element.className+=" tile0";
		}
		
		element.innerHTML = v;
		
		document.getElementById('tiles').appendChild(element); 
		
		return element;
	},	
	blinkTile: async function(x, y){
		var tile = globals.matrix.get()[x][y];
		
		tile.getElement().className+=' merged';
		
		setTimeout(function(){
			tile.getElement().className = tile.getElement().className.replace(' merged', '');		
		}, 500)
		
	},
	changeTile: async function(x, y, v){
		var tile = globals.matrix.get()[x][y];
		
		tile.setValue(v);
	
		tile.getElement().className ="tile";
		
		if(v > 0){
			tile.getElement().className+=" cell" + v;
		}
		
		tile.getElement().innerHTML = v==0 ? '' : v;

	},
	swapTiles: async function(fromX, fromY, toX, toY){
		var tile = globals.matrix.get()[fromX][fromY];
		var tmp = globals.matrix.get()[toX][toY];
		var pos = ui.__cells[toX][toY].getBoundingClientRect();
		
		tile.getElement().style.top = pos['top'];
		tile.getElement().style.left = pos['left'];

		globals.matrix.get()[toX][toY] = tile;
		
		var pos = ui.__cells[fromX][fromY].getBoundingClientRect();
		
		tmp.getElement().style.top = pos['top'];
		tmp.getElement().style.left = pos['left'];
		
		globals.matrix.get()[fromX][fromY] = tmp;
	},
	/**
	* Merge two tiles by position. 
	* After merging th two tiles are swaped. (x1,y1) tile will be at position of (x2,y2).
	*/
	mergeTiles: async function(x1, y1, x2, y2){
		var promises = [];
		
		promises.push(this.swapTiles(x2, y2, x1, y1));				
		promises.push(this.changeTile(x1, y1, globals.matrix.get()[x1][y1].getValue() * 2));				
		promises.push(this.blinkTile(x1, y1));
		promises.push(this.changeTile(x2, y2, 0));
		
		ui.score+= globals.matrix.get()[x1][y1].getValue();
		
		return await Promise.all(promises);
	}
	
};