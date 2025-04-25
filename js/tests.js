var tests = {
	initTests: function(){
		this.testMoveMatrixLeft([[8,8,2,2,0], [2,0,2,0,2], [2,0,0,0,0], [2,0,2,0,4], [16,8,8,2,2]], [[16, 4, 0, 0, 0], [4, 2, 0, 0, 0], [2, 0, 0, 0, 0], [4, 4, 0, 0, 0], [16, 16, 4, 0, 0]]);
		this.testMoveMatrixLeft([[8,8,2,2,2], [2,0,2,0,2], [2,0,0,0,2], [2,0,2,0,4], [16,8,0,2,2]], [[16, 4, 2, 0, 0], [4, 2, 0, 0, 0], [4, 0, 0, 0, 0], [4, 4, 0, 0, 0], [16, 8, 4, 0, 0]]);
		
		this.testMoveMatrixRight([[8,8,2,2,2], [2,0,2,0,2], [2,0,0,0,2], [2,0,2,0,4], [16,8,0,2,2]], [[0, 0, 16, 2, 4], [0, 0, 0, 2, 4], [0, 0, 0, 0, 4], [0, 0, 0, 4, 4], [0, 0, 16, 8, 4]]);	
		this.testMoveMatrixRight([[0,0,0,0,0], [2,0,2,0,4], [2,2,0,2,2], [0,2,2,2,2], [2,2,2,2,2]], [[0, 0, 0, 0, 0], [0, 0, 0, 4, 4], [0, 0, 0, 4, 4], [0, 0, 0, 4, 4], [0, 0, 2, 4, 4]]);
		

		this.testMoveMatrixUp([[8,8,2,2,2], [2,0,2,0,2], [2,0,0,0,2], [2,0,2,0,4], [16,8,0,2,2]], [[8,16,4,4,4], [4,0,2,0,2], [2,0,0,0,4], [16,0,0,0,2], [0,0,0,0,0]]);	
		this.testMoveMatrixUp([[8,2,0,0,2], [8,0,0,2,2], [16,0,0,2,2], [2,2,0,2,2], [2,0,0,2,4]], [[16,4,0,4,4], [16,0,0,4,4], [4,0,0,0,4], [0,0,0,0,0], [0,0,0,0,0]]);	
		
		
		this.testMoveMatrixDown([[8,2,0,0,2], [8,0,0,2,2], [16,0,0,2,2], [2,2,0,2,2], [2,0,0,2,4]], [[0,0,0,0,0], [0,0,0,0,0], [16,0,0,0,4], [16,0,0,4,4], [4,4,0,4,4]]);	
		this.testMoveMatrixDown([[2,2,2,2,2], [2,0,0,2,2], [0,0,2,2,4], [2,2,0,2,2], [2,2,2,0,4]], [[0,0,0,0,0], [0,0,0,0,4], [0,0,0,0,4], [4,2,2,4,2], [4,4,4,4,4]]);	
	},

	testMoveMatrixLeft: function(input, expected_output)
	{
		matrix.setMatrix(input);
		matrix.moveLeft();
		var result = JSON.stringify(matrix.getMatrix());
		
		if(result!=JSON.stringify(expected_output))
		{
			console.log('Test failed! testMoveLeft()');
			console.log('input:');
			console.log(input);
			console.log('Expected output:');
			console.log(expected_output);
			console.log('Output:');
			console.log(result);
		}
		else
		{
			console.log('Test passed! testMoveLeft()');
		}
	},

	testMoveMatrixRight: function(input, expected_output)
	{
		matrix.setMatrix(input);
		matrix.moveRight();
		var result = JSON.stringify(matrix.getMatrix());
		
		if(result!=JSON.stringify(expected_output))
		{
			console.log('Test failed! testMoveRight()');
			console.log('input:');
			console.log(input);
			console.log('Expected output:');
			console.log(expected_output);
			console.log('Output:');
			console.log(result);
		}
		else
		{
			console.log('Test passed! testMoveRight()');
		}
	},


	testMoveMatrixUp: function(input, expected_output)
	{
		matrix.setMatrix(input);
		matrix.moveUp();
		var result = JSON.stringify(matrix.getMatrix());
		
		if(result!=JSON.stringify(expected_output))
		{
			console.log('Test failed! testMoveUp()');
			console.log('input:');
			console.log(input);
			console.log('Expected output:');
			console.log(expected_output);
			console.log('Output:');
			console.log(result);
		}
		else
		{
			console.log('Test passed! testMoveUp()');
		}
	},

	testMoveMatrixDown: function(input, expected_output)
	{
		matrix.setMatrix(input);
		matrix.moveDown();
		var result = JSON.stringify(matrix.getMatrix());
		
		if(result!=JSON.stringify(expected_output))
		{
			console.log('Test failed! testMoveDown()');
			console.log('input:');
			console.log(input);
			console.log('Expected output:');
			console.log(expected_output);
			console.log('Output:');
			console.log(result);
		}
		else
		{
			console.log('Test passed! testMoveDown()');
		}
	}

};