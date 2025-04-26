var tests = {
	initTests: async function(){
		await this.testMoveMatrixLeft([[8,8,2,2,0], [2,0,2,0,2], [2,0,0,0,0], [2,0,2,0,4], [16,8,8,2,2]], [[16, 4, 0, 0, 0], [4, 2, 0, 0, 0], [2, 0, 0, 0, 0], [4, 4, 0, 0, 0], [16, 16, 4, 0, 0]]);		
		await this.testMoveMatrixLeft([[8,8,2,2,2], [2,0,2,0,2], [2,0,0,0,2], [2,0,2,0,4], [16,8,0,2,2]], [[16, 4, 2, 0, 0], [4, 2, 0, 0, 0], [4, 0, 0, 0, 0], [4, 4, 0, 0, 0], [16, 8, 4, 0, 0]]);
		
	
		await this.testMoveMatrixRight([[8,8,2,2,2], [2,0,2,0,2], [2,0,0,0,2], [2,0,2,0,4], [16,8,0,2,2]], [[0, 0, 16, 2, 4], [0, 0, 0, 2, 4], [0, 0, 0, 0, 4], [0, 0, 0, 4, 4], [0, 0, 16, 8, 4]]);	
		await this.testMoveMatrixRight([[0,0,0,0,0], [2,0,2,0,4], [2,2,0,2,2], [0,2,2,2,2], [2,2,2,2,2]], [[0, 0, 0, 0, 0], [0, 0, 0, 4, 4], [0, 0, 0, 4, 4], [0, 0, 0, 4, 4], [0, 0, 2, 4, 4]]);
		

		await this.testMoveMatrixUp([[8,8,2,2,2], [2,0,2,0,2], [2,0,0,0,2], [2,0,2,0,4], [16,8,0,2,2]], [[8,16,4,4,4], [4,0,2,0,2], [2,0,0,0,4], [16,0,0,0,2], [0,0,0,0,0]]);	
		await this.testMoveMatrixUp([[8,2,0,0,2], [8,0,0,2,2], [16,0,0,2,2], [2,2,0,2,2], [2,0,0,2,4]], [[16,4,0,4,4], [16,0,0,4,4], [4,0,0,0,4], [0,0,0,0,0], [0,0,0,0,0]]);	
		
		
		await this.testMoveMatrixDown([[8,2,0,0,2], [8,0,0,2,2], [16,0,0,2,2], [2,2,0,2,2], [2,0,0,2,4]], [[0,0,0,0,0], [0,0,0,0,0], [16,0,0,0,4], [16,0,0,4,4], [4,4,0,4,4]]);	
		await this.testMoveMatrixDown([[2,2,2,2,2], [2,0,0,2,2], [0,0,2,2,4], [2,2,0,2,2], [2,2,2,0,4]], [[0,0,0,0,0], [0,0,0,0,4], [0,0,0,0,4], [4,2,2,4,2], [4,4,4,4,4]]);
		
	},

	testMoveMatrixLeft: async function(input, expected_output)
	{
		matrix.setMatrix(input);
		await matrix.moveLeft();
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

	testMoveMatrixRight: async function(input, expected_output)
	{
		matrix.setMatrix(input);
		await matrix.moveRight();
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


	testMoveMatrixUp: async function(input, expected_output)
	{
		matrix.setMatrix(input);
		await matrix.moveUp();
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

	testMoveMatrixDown: async function(input, expected_output)
	{
		matrix.setMatrix(input);
		await matrix.moveDown();
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