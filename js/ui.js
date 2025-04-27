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
				content+="<td id=\"cell[" + i + "," + j + "]\" style=\"transition: all; transition-duration: 0.1s;\" class=\"cell cell" + matrix.getMatrix()[i][j] + "\">" + (matrix.getMatrix()[i][j]==0 ? "&nbsp;" : matrix.getMatrix()[i][j])+ "</td>";
			}
			
			content+"</tr>";
		}
		
		content+="</table>";
		
		document.getElementById('matrix').innerHTML = content;
		
		this.init();
	},
	renderScore: function(){
		document.getElementById('score').innerHTML = "<b>Score: " + this.score + "</b>";
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
		document.getElementById('game_over').style.display = "none";
	}	
	
};