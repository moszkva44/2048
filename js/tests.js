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
		
		
		await this.testHasMergableCells([[0,2,0,2,0],[2,0,2,0,2], [0,2,0,2,0], [2,0,2,0,2], [0,2,0,2,0]], false);
		await this.testHasMergableCells([[0,2,0,2,0],[2,0,2,0,2], [0,2,0,2,0], [2,0,2,4,2], [0,2,0,4,0]], true);

		await this.testRemoveZerosFromRow([[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testRemoveZerosFromRow([[0,1,1,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testRemoveZerosFromRow([[0,0,1,1,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testRemoveZerosFromRow([[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testRemoveZerosFromRow([[1,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testRemoveZerosFromRow([[1,0,0,1,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testRemoveZerosFromRow([[1,0,0,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testRemoveZerosFromRow([[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testRemoveZerosFromRow([[1,0,1,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,1,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testRemoveZerosFromRow([[1,1,1,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,1,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		
		
		
		await this.testRemoveZerosFromRow([[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testRemoveZerosFromRow([[0,0,1,1,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testRemoveZerosFromRow([[0,1,1,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testRemoveZerosFromRow([[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testRemoveZerosFromRow([[0,0,1,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testRemoveZerosFromRow([[0,1,0,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testRemoveZerosFromRow([[1,0,0,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testRemoveZerosFromRow([[0,0,0,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testRemoveZerosFromRow([[1,0,1,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,1,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testRemoveZerosFromRow([[1,1,1,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,1,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		

		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);		
		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
				
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.UP);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);		
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testRemoveZerosFromColumn([[0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);		
		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);		
		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testRemoveZerosFromColumn([[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		
		ui.destroyElements();	
		
	},
	
	testRemoveZerosFromColumn: async function(input, expected_output, index, dir){
		matrix.setFromArray(input);
		
		await MoveManager.__removeZeros(index, {'stepX': parseInt(dir[0]), 'stepY': parseInt(dir[1])});
		
		var result = JSON.stringify(matrix.getAsArray());
		
		if(result!=JSON.stringify(expected_output))
		{
			console.log('Test failed! testRemoveZerosFromColumn()');
			console.log('input:');
			console.log(input);
			console.log('Expected output:');
			console.log(expected_output);
			console.log('Output:');
			console.log(result);
		}
		else
		{
			console.log('Test passed! testRemoveZerosFromColumn()');
		}		
		
	},	
	
	testRemoveZerosFromRow: async function(input, expected_output, index, dir){
		matrix.setFromArray(input);
		
		await MoveManager.__removeZeros(index, {'stepX': parseInt(dir[0]), 'stepY': parseInt(dir[1])});
		
		var result = JSON.stringify(matrix.getAsArray());
		
		if(result!=JSON.stringify(expected_output))
		{
			console.log('Test failed! testRemoveZerosFromRow()');
			console.log('input:');
			console.log(input);
			console.log('Expected output:');
			console.log(expected_output);
			console.log('Output:');
			console.log(result);
		}
		else
		{
			console.log('Test passed! testRemoveZerosFromRow()');
		}		
		
	},
	
	testHasMergableCells: async function(input, expected_output){
		matrix.setFromArray(input);
		
		game.createBackupPoint();
		
		var result = await matrix.hasMergableCells();
		
		if(result!=expected_output)
		{
			console.log('Test failed! testHasMergableCells()');
			console.log('input:');
			console.log(input);
			console.log('Expected output:');
			console.log(expected_output);
			console.log('Output:');
			console.log(result);			
		}
		else
		{
			console.log('Test passed! testHasMergableCells()');
		}
	},	
	
	testChangeCheckingAfterLeftMove: async function(input)
	{
		matrix.setFromArray(input);
		
		game.createBackupPoint();
		
		await game.handleUserAction(MOVE.LEFT, true);
		
		if(game.getBackupPoint().matrix==JSON.stringify(matrix.get()))
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
		matrix.setFromArray(input);
		
		game.createBackupPoint();
		
		await game.handleUserAction(MOVE.RIGHT, true);
		
		if(game.getBackupPoint().matrix==JSON.stringify(matrix.get()))
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
		matrix.setFromArray(input);
		
		game.createBackupPoint();
		
		await game.handleUserAction(MOVE.UP, true);
		
		if(game.getBackupPoint().matrix==JSON.stringify(matrix.get()))
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
		matrix.setFromArray(input);
				
		game.createBackupPoint();
		
		await game.handleUserAction(MOVE.DOWN, true);
		
		if(game.getBackupPoint().matrix==JSON.stringify(matrix.get()))
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
		matrix.setFromArray(input);
		await game.handleUserAction(MOVE.LEFT, true);
		var result = JSON.stringify(matrix.getAsArray());
		
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
		matrix.setFromArray(input);
		await game.handleUserAction(MOVE.RIGHT, true);
		var result = JSON.stringify(matrix.getAsArray());
		
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
		matrix.setFromArray(input);
		await game.handleUserAction(MOVE.UP, true);
		var result = JSON.stringify(matrix.getAsArray());
		
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
		matrix.setFromArray(input);
		await game.handleUserAction(MOVE.DOWN, true);
		var result = JSON.stringify(matrix.getAsArray());
		
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