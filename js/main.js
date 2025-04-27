
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

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
	document.addEventListener('touchstart', ui.handlers.handleTouchStart, {passive: false});        
	document.addEventListener('touchmove', ui.handlers.handleTouchMove, {passive: false});		
}
else
{
	window.addEventListener('keydown', ui.handlers.keyDownHandler);
}



