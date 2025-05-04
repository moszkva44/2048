var EventManager = {	
	__inputLocked: false, 
	/**
	* Lock handling of user input 
	*/
	__lockInput: function(){
		EventManager.__inputLocked = true;
	},
	/**
	* Release the lock on user input handling
	*/	
	__unlockInput: function(){
		EventManager.__inputLocked = false;
	},
	/**
	* Return true if user input handling is locked otherwhise return false
	*/
	__isInputLocked: function(){
		return EventManager.__inputLocked;
	}, 
	/**
	* Handling user input coming from keyboard on desktop 
	*/
	keyDownHandler: async function(event){
		event.preventDefault();
		event.stopPropagation();	
		
		var keyMap = {"ArrowLeft": MOVE.LEFT, 'ArrowRight': MOVE.RIGHT, 'ArrowUp': MOVE.UP, 'ArrowDown': MOVE.DOWN};
		
		if(!EventManager.__isInputLocked()){
			EventManager.__lockInput();
			await globals.game.handleUserAction(event.key in keyMap ? keyMap[event.key] : new Direction(0,0));
			EventManager.__unlockInput();
		}
	},
	__xDown: null,                                                        
	__yDown: null,
	/**
	* Get event of first touch on mobile device
	*/
	__getTouches: function(evt) {
	  return evt.touches ||        // browser API
		evt.originalEvent.touches; // jQuery
	},
	/**
	* Handle start touch event on mobile device
	*/
	handleTouchStart: function(evt) {
		if(!EventManager.__isInputLocked()){
			EventManager.__lockInput();
			const firstTouch = EventManager.__getTouches(evt)[0];                                      
			this.__xDown = firstTouch.clientX;                                      
			this.__yDown = firstTouch.clientY; 
		}		
	},

	/**
	* Handle touch move event on mobile device
	*/
	handleTouchMove: async function(evt) {
		event.preventDefault();
		event.stopPropagation();
		
		var promises = [];
		
		if ( ! this.__xDown || ! this.__yDown ) {
			return;
		}

		var xUp = evt.touches[0].clientX;                                    
		var yUp = evt.touches[0].clientY;

		var xDiff = this.__xDown - xUp;
		var yDiff = this.__yDown - yUp;

		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
			if ( xDiff > 0 ) {
				promises.push(globals.game.handleUserAction(MOVE.LEFT));
				
			} else {
				promises.push(globals.game.handleUserAction(MOVE.RIGHT));				
			}                       
		} else {
			if ( yDiff > 0 ) {
				promises.push(globals.game.handleUserAction(MOVE.UP));
			} else { 
				promises.push(globals.game.handleUserAction(MOVE.DOWN));
			}                                                                 
		}
		/* reset values */
		this.__xDown = null;
		this.__yDown = null;     
		
		await Promise.all(promises);		
		EventManager.__unlockInput();
	}		
}; 