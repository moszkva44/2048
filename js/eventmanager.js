var EventManager = {	
	__keyLocked: false, 
	/**
	* Lock handling of user input coming from keyboard
	*/
	__lockKeyInput: function(){
		EventManager.__keyLocked = true;
	},
	/**
	* Release the lock on user input handling coming from keyboard
	*/	
	__unlockKeyInput: function(){
		EventManager.__keyLocked = false;
	},
	/**
	* Return true if user input handling is locked otherwhise return false
	*/
	__isKeyInputLocked: function(){
		return EventManager.__keyLocked;
	}, 
	/**
	* Handling user input coming from keyboard on desktop 
	*/
	keyDownHandler: async function(event){
		event.preventDefault();
		event.stopPropagation();	
		
		var keyMap = {"ArrowLeft": MOVE.LEFT, 'ArrowRight': MOVE.RIGHT, 'ArrowUp': MOVE.UP, 'ArrowDown': MOVE.DOWN};
		
		if(!EventManager.__isKeyInputLocked()){
			EventManager.__lockKeyInput();
			await globals.game.handleUserAction(event.key in keyMap ? keyMap[event.key] : new Direction(0,0));
			EventManager.__unlockKeyInput();
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
		const firstTouch = EventManager.__getTouches(evt)[0];                                      
		this.__xDown = firstTouch.clientX;                                      
		this.__yDown = firstTouch.clientY;                                      
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

		return await Promise.all(promises);
	}		
}; 