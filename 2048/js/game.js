$(document).keydown(function (event) {
	switch (event.keyCode) {
		case 37:
			if (moveLeft()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 38:
			if (moveUp()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 39:
			if (moveRight()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 40:
			if (moveDown()) {
				generateOneNumber();
				isgameover();
			}
			break;
		default :
			break;
	}
});

function moveLeft() {
	if (!canMoveLeft(board)) {
		return false;
	}
	
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < j; k++) {
                    if(board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)){
                        //才能向左移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board) && !hasConflicted[i][k]) {
                        //才能向左移动
                        //move
                        showMoveAnimation(i, j, i, k);
                        score += board[i][k];
                        updateScore(score);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                    }
                }
			}
		}
	}
	setTimeout("updateBoardView();",200);
	return true;
}

function moveUp() {
	if (!canMoveUp(board)) {
		return false;
	}
	
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < 4; i++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < i; k++) {
                    if(board[k][j] == 0 && noBlokDCol(j, k, i, board)) {
                        //才能向左移动
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[k][j] == board[i][j] && noBlokDCol(j, k, i, board) && !hasConflicted[k][j]) {
                        //才能向左移动
                        //move
                        showMoveAnimation(i, j, k, j);
                        score += board[k][j];
                        updateScore(score);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                    }
                }
			}
		}
	}
	setTimeout("updateBoardView();",200);
	return true;
}

function moveRight() {
	if (!canMoveRight(board)) {
		return false;
	}
	
	for (var i = 0; i < 4; i++) {
		for (var j = 4-1; j >= 0; j--) {
			if (board[i][j] != 0) {
				for (var k = 4-1; k > j; k--) {
                    if(board[i][k] == 0 && noBlokHorizontalRow(i, k, j, board)){
                        //才能向左移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[i][k] == board[i][j] && noBlokHorizontalRow(i, k, j, board) && !hasConflicted[i][k]){
                        //才能向左移动
                        //move
                        showMoveAnimation(i, j, i, k);
                        score += board[i][k];
                        updateScore(score);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                    }
                }
			}
		}
	}
	setTimeout("updateBoardView();",200);
	return true;
}

function moveDown() {
	if (!canMoveDown(board)) {
		return false;
	}
	
	for (var j = 0; j < 4; j++) {
		for (var i = 4-1; i >= 0; i--) {
			if (board[i][j] != 0) {
				for (var k = 4-1; k > i; k--) {
                    if(board[k][j] == 0 && noBlokDRow(j, k, i, board)) {
                        //才能向左移动
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }else if(board[k][j] == board[i][j] && noBlokDRow(j, k, i, board) && !hasConflicted[k][j]) {
                        //才能向左移动
                        //move
                        showMoveAnimation(i, j, k, j);
                        score += board[k][j];
                        updateScore(score);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                    }
                }
			}
		}
	}
	setTimeout("updateBoardView();",200);
	return true;
}

function restartgame() {
	$("#gameover").remove();
	updateScore(0);
	newgame();
}