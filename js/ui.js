var ui = {
	score: 0,
	__cells: [],
	init: function(){
		var size = globals.matrix.get().length;
		
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
				TileManager.adjustTileToCell(i, j);   
			}			
		}		
	},
	renderMatrix: function(){
		var size = globals.matrix.get().length;
		var content = "<table id=\"\grid\">";
		
		var width = height = (ui.isMobile() ? window.screen.width/size + 'px' : '5rem');
		
		for(var i=0; i<=size-1; i++)
		{
			content+="<tr>";
			
			for(var j=0; j<=size-1; j++)
			{
				content+="<td id=\"cell[" + i + "," + j + "]\" class=\"cell cell0\" style=\"width: " + width +"; height: " + height + ";\"> &nbsp;</td>";
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
	isMobile: function(){
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	},	
	destroyElements: function(){
		var size = globals.matrix.get().length;
		
		for(var x = 0; x <= size-1; x++)
		{
			for(var y = 0; y <= size-1; y++)
			{
				document.body.removeChild(globals.matrix.get()[x][y].getElement());
				globals.matrix.get()[x][y] = null;
			}
		}
	},	
	
};