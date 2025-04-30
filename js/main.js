
window.onload = function(){ 
	// Init a new game
	var game = new Game(document.getElementById('size_selector').value);
	
	matrix = game.getMatrix();
	
	// bind event handlers to buttons
	document.getElementById('resetButton').addEventListener('click', function(){
		game.reset(document.getElementById('size_selector').value);		
	});     
	
	document.getElementById('undoButton').addEventListener('click', function(){
		game.undo();		
	});  	 

	document.getElementById('size_selector').value = matrix.get().length;
	
	// bind event handlers to user input depending on coming from mobile/desktop
	if(ui.isMobile()){
		document.addEventListener('touchstart', EventManager.handleTouchStart, {passive: false});        
		document.addEventListener('touchmove', EventManager.handleTouchMove, {passive: false});		
	}else{
		window.addEventListener('keydown', EventManager.keyDownHandler, {passive: false});
	}	
}





