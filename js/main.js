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
		
	game.createBackupPoint();

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
			matrix.moveLeft();	
			
        } else {
            /* left swipe */
			matrix.moveRight();					
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
			matrix.moveUp();	
        } else { 
            /* up swipe */
			matrix.moveDown();			
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;     

	if(game.getBackupPoint().matrix!=JSON.stringify(matrix.getMatrix()))
	{
		matrix.populate();
	}
		
	ui.renderScore();
	game.createSnapshot();
	
	evt.preventDefault();
};


window.onload = function(){ 
	game.new();
	
	document.getElementById('resetButton').addEventListener('click', function(){
		game.reset();		
	});     
	
	document.getElementById('undoButton').addEventListener('click', function(){
		game.undo();		
	});  	
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
		
		game.createBackupPoint();

		switch (event.key) {
			case "ArrowLeft":			
				matrix.moveLeft();			
				break;
			case "ArrowRight":
				matrix.moveRight();			
				break;
			case "ArrowUp":
				matrix.moveUp();			
				break;
			case "ArrowDown":
				matrix.moveDown();			
				break;
		}


		if(game.getBackupPoint().matrix!=JSON.stringify(matrix.getMatrix()))
		{
			matrix.populate();
		}
			
		ui.renderScore();
		game.createSnapshot();
	});
}




