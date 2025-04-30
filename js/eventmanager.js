var EventManager = {
	__getMoveFromEvent: function(e){
		var move = [0,0];
		
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
		return await game.handleUserAction(EventManager.__getMoveFromEvent(event));
		
	},
	xDown: null,                                                        
	yDown: null,
	__getTouches: function(evt) {
	  return evt.touches ||        // browser API
		evt.originalEvent.touches; // jQuery
	},
	handleTouchStart: function(evt) {
		const firstTouch = EventManager.__getTouches(evt)[0];                                      
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
				promises.push(game.handleUserAction(MOVE.LEFT));
				
			} else {
				promises.push(game.handleUserAction(MOVE.RIGHT));				
			}                       
		} else {
			if ( yDiff > 0 ) {
				promises.push(game.handleUserAction(MOVE.UP));
			} else { 
				promises.push(game.handleUserAction(MOVE.DOWN));
			}                                                                 
		}
		/* reset values */
		this.xDown = null;
		this.yDown = null;     

		return await Promise.all(promises);
	}		
}; 