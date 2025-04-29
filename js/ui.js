var ui = {
	score: 0,
	__cells: [],
	init: function(){
		var size = matrix.getMatrix().length;
		
		this.__cells = [];

		for(var i=0; i<=size-1; i++)
		{
			var row = [];
			
			for(var j=0; j<=size-1; j++)
			{
				row.push(document.getElementById('cell[' + i + ',' + j + ']'));
			}
			
			this.__cells.push(row);
		}
		
		for(var i=0; i<=size-1; i++)
		{
			for(var j=0; j<=size-1; j++)
			{
				ui.refreshTilePosition(i, j);   
			}			
		}		
	},
	renderMatrix: function(){
		var size = matrix.getMatrix().length;
		var content = "<table id=\"\grid\">";
		
		for(var i=0; i<=size-1; i++)
		{
			content+="<tr>";
			
			for(var j=0; j<=size-1; j++)
			{
				content+="<td id=\"cell[" + i + "," + j + "]\" class=\"cell cell0\"> &nbsp;</td>";
			}
			
			content+"</tr>";
		}
		
		content+="</table>";
		
		document.getElementById('matrix').innerHTML = content;	

		this.init();
		
	},	
	renderScore: function(){
		document.getElementById('score').innerHTML = "Score: " + this.score;
	},
	renderGameOver: function(){
		var pos = document.getElementById('grid').getBoundingClientRect();
		
		document.getElementById('game_over').style.top = pos['top'];
		document.getElementById('game_over').style.left = pos['left'];		
		document.getElementById('game_over').style.width = pos['width'] +  "px";
		document.getElementById('game_over').style.height = pos['height'] +  "px";	
		document.getElementById('game_over').style.lineHeight = pos['height'] +  "px";		
		document.getElementById('game_over').style.display = "block";
		
		setTimeout(function(){
			document.getElementById('game_over').style.backgroundImage = 'url("img/game_over.png")';
			document.getElementById('game_over').style.backgroundSize ='100% 100%';
			document.getElementById('game_over').style.opacity = "100";
			document.getElementById('game_over').innerHTML = '';		
			
		}, 1500);
	},	
	hideGameOver: function(){
		document.getElementById('game_over').style = '';
		document.getElementById('game_over').innerHTML = 'Game over';		
	},
	
	handlers: {
		getMoveFromEvent: function(e){
			var move = '';
			
			switch (e.key) {
				case "ArrowLeft":			
					move = MOVE.LEFT;
					break;
				case "ArrowRight":	
					move = MOVE.RIGHT;				
					break;
				case "ArrowUp":
					move = MOVE.UP;
					break;
				case "ArrowDown":
					move = MOVE.DOWN;
					break;
			}			
			
			return move;
		},		
		keyDownHandler: async function(event){
			event.preventDefault();
			event.stopPropagation();		
			return await game.handleUserAction(ui.handlers.getMoveFromEvent(event));
			
		},
		xDown: null,                                                        
		yDown: null,
		getTouches: function(evt) {
		  return evt.touches ||        // browser API
			evt.originalEvent.touches; // jQuery
		},
		handleTouchStart: function(evt) {
			const firstTouch = ui.handlers.getTouches(evt)[0];                                      
			this.xDown = firstTouch.clientX;                                      
			this.yDown = firstTouch.clientY;                                      
		},
		handleTouchMove: async function(evt) {
			event.preventDefault();
			event.stopPropagation();	

			var promises = [];
			
			if ( ! this.xDown || ! this.yDown ) {
				return;
			}

			var xUp = evt.touches[0].clientX;                                    
			var yUp = evt.touches[0].clientY;

			var xDiff = this.xDown - xUp;
			var yDiff = this.yDown - yUp;

			if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
				if ( xDiff > 0 ) {
					/* right swipe */ 
					promises.push(game.handleUserAction(MOVE.LEFT));
					
				} else {
					/* left swipe */
					promises.push(game.handleUserAction(MOVE.RIGHT));				
				}                       
			} else {
				if ( yDiff > 0 ) {
					/* down swipe */ 
					promises.push(game.handleUserAction(MOVE.UP));
				} else { 
					/* up swipe */
					promises.push(game.handleUserAction(MOVE.DOWN));
				}                                                                 
			}
			/* reset values */
			this.xDown = null;
			this.yDown = null;     

			return await Promise.all(promises);
		}		

		
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
	refreshTilePosition: async function(x, y){
		var tile = matrix.getMatrix()[x][y];
		var pos = this.__cells[x][y].getBoundingClientRect();
		
		tile.getElement().style.top = pos['top'];
		tile.getElement().style.left = pos['left'];	
	},
	
	swapTiles: async function(fromX, fromY, toX, toY){
		var tile = matrix.getMatrix()[fromX][fromY];
		var tmp = matrix.getMatrix()[toX][toY];
		var pos = this.__cells[toX][toY].getBoundingClientRect();
		
		tile.getElement().style.top = pos['top'];
		tile.getElement().style.left = pos['left'];

		matrix.getMatrix()[toX][toY] = tile;
		
		var pos = this.__cells[fromX][fromY].getBoundingClientRect();
		
		tmp.getElement().style.top = pos['top'];
		tmp.getElement().style.left = pos['left'];
		
		matrix.getMatrix()[fromX][fromY] = tmp;
	},
	
	changeTile: async function(x, y, v){
		var tile = matrix.getMatrix()[x][y];
		
		tile.setValue(v);
	
		if(v > 0){
			tile.getElement().className ="tile cell" + v;
		} else{
			tile.getElement().className ="tile";
		}
		
		tile.getElement().innerHTML = v==0 ? '' : v;

	},
	blinkTile: async function(x, y){
		var tile = matrix.getMatrix()[x][y];
		
		tile.getElement().className+=' merged';
		
		setTimeout(function(){
			tile.getElement().className = tile.getElement().className.replace(' merged', '');		
		}, 500)
		
	}
	
};