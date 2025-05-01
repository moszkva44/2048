var ui = {
	score: 0,
	__cells: [],
	init: function(){
		this.__cells = [];

		globals.matrix.get().forEach((row, i) => {
			this.__cells[i] = [];
			row.forEach((column, j) => {
				this.__cells[i].push(document.getElementById('cell[' + i + ',' + j + ']'));
			}, this);
		}, this);		
		
		globals.matrix.get().forEach((row, i) => {
			row.forEach((column, j) => {
				TileManager.adjustTileToCell(i, j); 
			});
		});
	},
	renderMatrix: function(){
		var content = '';
		
		var width = height = (ui.isMobile() ? window.screen.width/globals.matrix.get().length + 'px' : '5rem');
		
		globals.matrix.get().forEach((row, i) => {
			content+="<tr>";
			
			row.forEach((column, j) => {
				content+="<td id=\"cell[" + i + "," + j + "]\" class=\"cell cell0\" style=\"width: " + width +"; height: " + height + ";\"> &nbsp;</td>";
			});
			
			content+"</tr>";
		});	
		
		document.getElementById('matrix').innerHTML = "<table id=\"\grid\">" + content + "</table>";	

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
	isMobile: function(){
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	},	
	destroyElements: function(){
		document.getElementById('tiles').innerHTML = '';
	}
	
};