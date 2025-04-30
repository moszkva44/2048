var TileManager = {
	addNewTile: async function()
	{
		var seq = 0;
		var potentialPlaces = globals.matrix.getFreePlaces();
		var size = globals.matrix.get().length;
		
		if(potentialPlaces.length > 0) 
		{
			var newNumber = potentialPlaces[utils.getRandomArbitrary(0, potentialPlaces.length-1)];

			for(var x = 0; x <= size-1; x++)
			{
				for(var y = 0; y <= size-1; y++)
				{
					if(seq==newNumber)
					{
						return await this.changeTile(x, y, utils.getRandomValue());
					}
					
					seq++;
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
		} else{
			element.className+=" tile0";
		}
		
		element.innerHTML = v;
		
		document.body.appendChild(element);		
		
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
	
		if(v > 0){
			tile.getElement().className ="tile cell" + v;
		} else{
			tile.getElement().className ="tile";
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
	}	
	
};