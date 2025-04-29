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
		
		
		await this.testChangeCheckingAfterLeftMove([[0,0,0,0,0],[0,0,0,0,0], [0,0,2,0,0], [0,0,0,0,0], [2,4,8,2,4]]);
		await this.testChangeCheckingAfterRightMove([[0,0,0,0,0],[0,0,0,0,0], [0,0,2,0,0], [0,0,0,0,0], [2,4,8,2,4]]);
		await this.testChangeCheckingAfterDownMove([[0,0,0,0,0],[0,0,0,0,0], [0,0,2,0,0], [0,0,0,0,0], [2,4,8,2,4]]);
		await this.testChangeCheckingAfterUpMove([[0,0,0,0,0],[0,0,0,0,0], [0,0,2,0,0], [0,0,0,0,0], [2,4,8,2,4]]);
		
		
		await this.testDoesMergableCellsExist([[0,2,0,2,0],[2,0,2,0,2], [0,2,0,2,0], [2,0,2,0,2], [0,2,0,2,0]], false);
		await this.testDoesMergableCellsExist([[0,2,0,2,0],[2,0,2,0,2], [0,2,0,2,0], [2,0,2,4,2], [0,2,0,4,0]], true);
		
		matrix.destroyElements();				
	},
	
	testDoesMergableCellsExist: async function(input, expected_output)
	{
		matrix.setMatrix(input);
		
		game.createBackupPoint();
		
		var result = await matrix.doesMergableCellsExist();
		
		if(result!=expected_output)
		{
			console.log('Test failed! testDoesMergableCellsExist()');
			console.log('input:');
			console.log(input);
			console.log('Expected output:');
			console.log(expected_output);
			console.log('Output:');
			console.log(result);			
		}
		else
		{
			console.log('Test passed! testDoesMergableCellsExist()');
		}
	},	
	
	testChangeCheckingAfterLeftMove: async function(input)
	{
		matrix.setMatrix(input);
		
		game.createBackupPoint();
		
		await matrix.move(MOVE.LEFT);
		
		if(game.getBackupPoint().matrix==JSON.stringify(matrix.getMatrix()))
		{
			console.log('Test failed! testChangeChecking() after left move');
			console.log('input:');
			console.log(input);
		}
		else
		{
			console.log('Test passed! testChangeChecking()');
		}
	},

	testChangeCheckingAfterRightMove: async function(input)
	{
		matrix.setMatrix(input);
		
		game.createBackupPoint();
		
		await matrix.move(MOVE.RIGHT);
		
		if(game.getBackupPoint().matrix==JSON.stringify(matrix.getMatrix()))
		{
			console.log('Test failed! testChangeChecking() after right move');
			console.log('input:');
			console.log(input);			
		}
		else
		{
			console.log('Test passed! testChangeChecking()');
		}
	},	
	
	testChangeCheckingAfterUpMove: async function(input)
	{
		matrix.setMatrix(input);
		
		game.createBackupPoint();
		
		await matrix.move(MOVE.UP);
		
		if(game.getBackupPoint().matrix==JSON.stringify(matrix.getMatrix()))
		{
			console.log('Test failed! testChangeChecking() after up move');
			console.log('input:');
			console.log(input);
		}
		else
		{
			console.log('Test passed! testChangeChecking()');
		}
	},		

	testChangeCheckingAfterDownMove: async function(input)
	{
		matrix.setMatrix(input);
				
		game.createBackupPoint();
		
		await matrix.move(MOVE.DOWN);
		
		if(game.getBackupPoint().matrix==JSON.stringify(matrix.getMatrix()))
		{
			console.log('Test failed! testChangeChecking() after down move');
			console.log('input:');
			console.log(input);		
		}
		else
		{
			console.log('Test passed! testChangeChecking()');
		}
	},		

	testMoveMatrixLeft: async function(input, expected_output)
	{
		matrix.setMatrix(input);
		await matrix.move(MOVE.LEFT);
		var result = JSON.stringify(matrix.getMatrixInArray());
		
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
		await matrix.move(MOVE.RIGTH);
		var result = JSON.stringify(matrix.getMatrixInArray());
		
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
		await matrix.move(MOVE.UP);
		var result = JSON.stringify(matrix.getMatrixInArray());
		
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
		await matrix.move(MOVE.DOWN);
		var result = JSON.stringify(matrix.getMatrixInArray());
		
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