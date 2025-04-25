var ui = {
	score: 0,
	renderCell: function(x, y, v){
		var cell = document.getElementById('cell[' + x + ',' + y + ']');
		
		cell.style.transition = "all 2s";
		cell.style.transitionDuration = "0.5s";
		cell.innerHTML= (v==0 ? '&nbsp' : v);
		cell.className = "cell cell" + v;
	},
	renderMatrix: function(){
		var content = "<table>";
		
		for(var i=0; i<=matrix.getMatrix().length-1; i++)
		{
			content+="<tr>";
			
			for(var j=0; j<=matrix.getMatrix()[i].length-1; j++)
			{
				content+="<td id=\"cell[" + i + "," + j + "]\" class=\"cell cell" + matrix.getMatrix()[i][j] + "\">" + (matrix.getMatrix()[i][j]==0 ? "&nbsp;" : matrix.getMatrix()[i][j])+ "</td>";
			}
			
			content+"</tr>";
		}
		
		content+="</table>";
		
		document.getElementById('matrix').innerHTML = content;
	},
	renderScore: function(){
		document.getElementById('score').innerHTML = "<b>Score: " + this.score + "</b>";
	}	
		
	
};