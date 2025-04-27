var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||        // browser API
    evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

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
    xDown = null;
    yDown = null;     

	evt.preventDefault();
};


window.onload = function(){ 
	game.startNew(document.getElementById('size_selector').value);
	
	document.getElementById('resetButton').addEventListener('click', function(){
		game.reset(document.getElementById('size_selector').value);		
	});     
	
	document.getElementById('undoButton').addEventListener('click', function(){
		game.undo();		
	});  	 

	document.getElementById('size_selector').value = matrix.getMatrix().length;
}


var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	
if(isMobile)
{
	document.addEventListener('touchstart', handleTouchStart, {passive: false});        
	document.addEventListener('touchmove', handleTouchMove, {passive: false});		
}
else
{
	window.addEventListener('keydown', (event) => {
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
	});
}




