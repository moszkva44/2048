const MOVE_DELAY = 10; // ms

var ui = {
	score: 0,
	__cells: [],
	init: function(){
		this.__cells = [];
		for(var i=0; i<=matrix.getMatrix().length-1; i++)
		{
			var row = [];
			
			for(var j=0; j<=matrix.getMatrix()[i].length-1; j++)
			{
				row.push(document.getElementById('cell[' + i + ',' + j + ']'));
			}
			
			this.__cells.push(row);
		}
				
	},
	renderCell: async function(x, y, v){
		var cell = this.__cells[x][y];
		
		cell.className = "cell cell" + v;
		cell.innerHTML = (v==0 ? '&nbsp' : v);		
	},
	renderMatrix: function(){
		var content = "<table id=\"\grid\">";
		
		for(var i=0; i<=matrix.getMatrix().length-1; i++)
		{
			content+="<tr>";
			
			for(var j=0; j<=matrix.getMatrix()[i].length-1; j++)
			{
				content+="<td id=\"cell[" + i + "," + j + "]\" style=\"transition: all; transition-duration: 0.0s;\" class=\"cell cell" + matrix.getMatrix()[i][j] + "\">" + (matrix.getMatrix()[i][j]==0 ? "&nbsp;" : matrix.getMatrix()[i][j])+ "</td>";
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
			
		}, 3000);
	},	
	hideGameOver: function(){
		document.getElementById('game_over').style = '';
		document.getElementById('game_over').innerHTML = 'Game over';		
	},
	handlers: {
		keyDownHandler: function(event){
			const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
			
			switch (event.key) {
				case "ArrowLeft":			
					game.handleUserAction(MOVE.LEFT);
					break;
				case "ArrowRight":	
					game.handleUserAction(MOVE.RIGHT);				
					break;
				case "ArrowUp":
					game.handleUserAction(MOVE.UP);
					break;
				case "ArrowDown":
					game.handleUserAction(MOVE.DOWN);
					break;
			}
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
		handleTouchMove: function(evt) {
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
					game.handleUserAction(MOVE.LEFT);
					
				} else {
					/* left swipe */
					game.handleUserAction(MOVE.RIGHT);				
				}                       
			} else {
				if ( yDiff > 0 ) {
					/* down swipe */ 
					game.handleUserAction(MOVE.UP);
				} else { 
					/* up swipe */
					game.handleUserAction(MOVE.DOWN);
				}                                                                 
			}
			/* reset values */
			this.xDown = null;
			this.yDown = null;     

			evt.preventDefault();
		}		

		
	}
	
};