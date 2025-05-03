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
		await this.testHasMergableCells([[0,2,0,2,0],[2,0,2,0,2], [0,2,0,2,0], [2,0,2,0,2], [0,2,8,8,0]], true);

		await this.testShiftTilesToMargin([[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testShiftTilesToMargin([[0,1,1,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testShiftTilesToMargin([[0,0,1,1,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testShiftTilesToMargin([[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testShiftTilesToMargin([[1,0,1,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testShiftTilesToMargin([[1,0,0,1,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testShiftTilesToMargin([[1,0,0,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testShiftTilesToMargin([[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testShiftTilesToMargin([[1,0,1,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,1,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		await this.testShiftTilesToMargin([[1,1,1,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,1,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.RIGHT);
		
		
		
		await this.testShiftTilesToMargin([[0,0,0,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testShiftTilesToMargin([[0,0,1,1,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testShiftTilesToMargin([[0,1,1,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testShiftTilesToMargin([[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testShiftTilesToMargin([[0,0,1,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testShiftTilesToMargin([[0,1,0,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testShiftTilesToMargin([[1,0,0,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testShiftTilesToMargin([[0,0,0,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testShiftTilesToMargin([[1,0,1,0,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,1,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		await this.testShiftTilesToMargin([[1,1,1,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,1,1,1,1], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.LEFT);
		

		await this.testShiftTilesToMargin([[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);		
		await this.testShiftTilesToMargin([[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[1,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
		await this.testShiftTilesToMargin([[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.DOWN);
				
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testShiftTilesToMargin([[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], 0, MOVE.UP);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testShiftTilesToMargin([[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);		
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testShiftTilesToMargin([[0,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testShiftTilesToMargin([[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);		
		await this.testShiftTilesToMargin([[1,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);		
		await this.testShiftTilesToMargin([[1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		await this.testShiftTilesToMargin([[1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [1,0,0,0,0]], [[1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]], 0, MOVE.UP);
		
		await this.testMoveMatrixRight([[1,1,'X',1,1], [0,0,'X',0,0], [1,0,'X',1,0], [1,1,'X',0,1], [0,1,'X',1,0]], [[0,2,'X',0,2], [0,0,'X',0,0], [0,1,'X',0,1], [0,2,'X',0,1], [0,1,'X',0,1]], 0, MOVE.RIGHT);		
		await this.testMoveMatrixRight([[1,0,'X',1,0], [0,0,'X',0,0], [0,1,'X',1,0], [0,1,'X',0,0], [0,0,'X',2,0]], [[0,1,'X',0,1], [0,0,'X',0,0], [0,1,'X',0,1], [0,1,'X',0,0], [0,0,'X',0,2]], 0, MOVE.RIGHT);
		await this.testMoveMatrixRight([[1,1,0,0,'X'], [1,0,1,0,'X'], [1,0,0,1,'X'], [1,0,0,0,'X'], [0,0,0,2,'X']], [[0,0,0,2,'X'], [0,0,0,2,'X'], [0,0,0,2,'X'], [0,0,0,1,'X'], [0,0,0,2,'X']], 0, MOVE.RIGHT);
		
		await this.testMoveMatrixLeft([[1,1,'X',1,1], [0,0,'X',0,0], [0,1,'X',0,1], [0,1,'X',1,1], [0,1,'X',1,0]], [[2,0,'X',2,0], [0,0,'X',0,0], [1,0,'X',1,0], [1,0,'X',2,0], [1,0,'X',1,0]], 0, MOVE.LEFT);
		await this.testMoveMatrixLeft([[0,1,'X',0,1], [0,0,'X',0,0], [0,1,'X',1,0], [0,0,'X',1,0], [0,2,'X',0,0]], [[1,0,'X',1,0], [0,0,'X',0,0], [1,0,'X',1,0], [0,0,'X',1,0], [2,0,'X',0,0]], 0, MOVE.LEFT);
		await this.testMoveMatrixLeft([['X',0,0,1,1], ['X',1,0,0,1], ['X',2,2,2,2], ['X',2,2,2,1], ['X',0,2,2,4]], [['X',2,0,0,0], ['X',2,0,0,0], ['X',4,4,0,0], ['X',4,2,1,0], ['X',4,4,0,0]], 0, MOVE.LEFT);

		await this.testShiftTilesToMargin([[1,0,'X',1,0], [1,1,'X',0,0], [0,1,'X',1,0], [1,0,'X',0,1], [1,0,'X',1,1]], [[0,1,'X',0,1], [1,1,'X',0,0], [0,1,'X',1,0], [1,0,'X',0,1], [1,0,'X',1,1]], 0, MOVE.RIGHT);
		await this.testShiftTilesToMargin([[1,0,'X',1,0], [1,1,'X',0,0], [0,1,'X',1,0], [1,0,'X',0,1], [1,0,'X',1,1]], [[1,0,'X',1,0], [1,1,'X',0,0], [0,1,'X',1,0], [1,0,'X',0,1], [1,0,'X',1,1]], 1, MOVE.RIGHT);		
		await this.testShiftTilesToMargin([[1,0,'X',1,0], [1,1,'X',0,0], [0,1,'X',1,0], [1,0,'X',0,1], [1,0,'X',1,1]], [[1,0,'X',1,0], [1,1,'X',0,0], [0,1,'X',0,1], [1,0,'X',0,1], [1,0,'X',1,1]], 2, MOVE.RIGHT);		
		await this.testShiftTilesToMargin([[1,0,'X',1,0], [1,1,'X',0,0], [0,1,'X',1,0], [1,0,'X',0,1], [1,0,'X',1,1]], [[1,0,'X',1,0], [1,1,'X',0,0], [0,1,'X',1,0], [0,1,'X',0,1], [1,0,'X',1,1]], 3, MOVE.RIGHT);		
		await this.testShiftTilesToMargin([[1,0,'X',1,0], [1,1,'X',0,0], [0,1,'X',1,0], [1,0,'X',0,1], [1,0,'X',1,1]], [[1,0,'X',1,0], [1,1,'X',0,0], [0,1,'X',1,0], [1,0,'X',0,1], [0,1,'X',1,1]], 4, MOVE.RIGHT);

		localStorage.removeItem("matrix");
		localStorage.removeItem("score");		
	},
	
	
	testShiftTilesToMargin: async function(input, expected_output, index, dir){
		var game = new Game(5);	

		game.getMatrix().setFromArray(input);
		
		await MoveManager.__shiftTilesToMargin(index, dir);

		var result = JSON.stringify(game.getMatrix().getAsArray());
		
		if(result!=JSON.stringify(expected_output))
		{
			console.log('Test failed! testShiftTilesToMargin()');
			console.log('input:');
			console.log(input);
			console.log('Expected output:');
			console.log(expected_output);
			console.log('Output:');
			console.log(result);
		}
		else
		{
			console.log('Test passed! testShiftTilesToMargin()');
		}		
		
		ui.destroyElements();
	},	

	
	testHasMergableCells: async function(input, expected_output){
		var game = new Game(5);	
		var matrix = game.getMatrix();				
		
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
		
		ui.destroyElements();
	},	
	
	testChangeCheckingAfterLeftMove: async function(input){
		var game = new Game(5);	
		var matrix = game.getMatrix();				
		
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
		
		ui.destroyElements();
	},

	testChangeCheckingAfterRightMove: async function(input){
		var game = new Game(5);	
		var matrix = game.getMatrix();				
		
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
		
		ui.destroyElements();
	},	
	
	testChangeCheckingAfterUpMove: async function(input){
		var game = new Game(5);	
		var matrix = game.getMatrix();				
		
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
		
		ui.destroyElements();
	},		

	testChangeCheckingAfterDownMove: async function(input){
		var game = new Game(5);	
		var matrix = game.getMatrix();				
		
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
		
		ui.destroyElements();
	},		

	testMoveMatrixLeft: async function(input, expected_output){
		var game = new Game(5);	
		var matrix = game.getMatrix();				
		
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
		
		ui.destroyElements();
	},

	testMoveMatrixRight: async function(input, expected_output){
		var game = new Game(5);	
		var matrix = game.getMatrix();				
		
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
		
		ui.destroyElements();
	},


	testMoveMatrixUp: async function(input, expected_output){
		var game = new Game(5);	
		var matrix = game.getMatrix();				
		
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
		
		ui.destroyElements();
	},

	testMoveMatrixDown: async function(input, expected_output){
		var game = new Game(5);	
		var matrix = game.getMatrix();				
		
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
		
		ui.destroyElements();
	}

};