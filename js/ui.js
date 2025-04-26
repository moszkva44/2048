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
		var content = "<table>";
		
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
	}
};