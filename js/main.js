$(function () {
	newgame();
});

function newgame() {
	// init grid-cells
	init();
	// create two radom cells with number

	generateOneNumber();
	generateOneNumber();
}

var board = new Array();
var score = 0;
var hasConflicted = new Array();

function init(){
    for(var i=0;i<4;i++){
        //定义了一个二维数组
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j=0;j<4;j++){
            //初始化小格子的值为0
            board[i][j] = 0;
            hasConflicted[i][j] = false;
            var gridCell = $("#grid-cell-"+i+"-"+j);
            //通过getPosTop()方法设置每个格子距顶端的距离
            gridCell.css("top", getPosTop(i, j));
            //通过getPosLeft()方法设置每个格子距左端的距离
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    updateBoardView();
}

function updateBoardView() {
	// clear grid
	$(".number-cell").remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			// add number to grid-cell
			$("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
			var numberCell = $("#number-cell-" + i + "-" + j);
			if (board[i][j] == 0) {
				numberCell.css("width", "0px");
				numberCell.css("height", "0px");
				numberCell.css("top", getPosTop(i, j) + 50);
				numberCell.css("left", getPosLeft(i, j) + 50);
			}
			else {
				numberCell.css("width", "100px");
				numberCell.css("height", "100px");
				numberCell.css("top", getPosTop(i, j));
				numberCell.css("left", getPosLeft(i, j));
				numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
				numberCell.css("color", getNumberColor(board[i][j]));
				numberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
	//$(".number-cell").css("line-height", "100px");
	//$(".number-cell").css("font-size", "60px");
}

function generateOneNumber() {
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	while (true) {
		if (board[randx][randy] == 0) {
			break;
		}
		var randx = parseInt(Math.floor(Math.random() * 4));
		var randy = parseInt(Math.floor(Math.random() * 4));
	}

	var randNumber = Math.random() < 0.5 ? 2 : 4;

	board[randx][randy] = randNumber;
	ShowNumberWithAnimation(randx, randy, randNumber);
}

