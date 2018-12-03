//Datos de la cuadrícula.
//===============================OBTENER DEL DOM=========================================
var gridRows = 10;
var gridCols = 10;
var cellLength = 50;
var grid;
var stack = [];

var mazeDone = false;
var solveDone = false;
var queue = [];
var path = [];
var visitedBFS = [];

//Variables para el algoritmo.
var currentCell;
var beginCell;
var endCell;

function setup () {
	//Declara el canvas en el DOM
	createCanvas(cellLength * gridCols, cellLength * gridRows);
	//Frames por segundo.
	frameRate(20);

	//Instancia una cuadrícula.
	grid = new Grid([], gridRows, gridCols);
	//Llena la cuadrícula con celdas según las medidas dadas.
	for (let i = 0; i < gridRows; i++) {
		for (let j = 0; j < gridCols; j++) {
			grid.cells[grid.index(i, j)] = new Cell(i, j, cellLength);
		}
	}
	//Inicio DFS
	currentCell = grid.cells[0];
	currentCell.visited = true;
	
	//Inicio BFS
	//=====================================OBTENER DEL DOM=====================================
	beginCell = grid.cells[2]; //OBTENER CELDA QUE EL USUARIO ELIJA (INICIO)
	beginCell.path = true;
	endCell = grid.cells[grid.index(gridRows - 1, gridCols - 1)]; //OBTENER CELDA QUE EL USUARIO ELIJA (FIN)
	queue.push(beginCell);
	visitedBFS.push(beginCell);
	
}

function draw () {
	background(0);
	grid.displayGrid();
	currentCell.mark();
	//Generación del laberinto DFS
	if (!mazeDone) {
		let nextCell = grid.getUnvisitedAdjacentOf(currentCell);
		if (nextCell) {
			stack.push(currentCell);
			grid.removeWallBetween(currentCell, nextCell);
			currentCell = nextCell;
			currentCell.visited = true;
		}
		else if (stack.length > 0) {
			currentCell = stack.pop();
		}
		mazeDone = currentCell == grid.cells[0];
	}
	//Solución del laberinto BFS
	else if (queue.length > 0 && currentCell != endCell) {
		currentCell = queue.shift();
		currentCell.mark();
		let top = grid.topOf(currentCell);
		let right = grid.rightOf(currentCell);
		let bottom = grid.bottomOf(currentCell);
		let left = grid.leftOf(currentCell);
		let adjacents = [top, right, bottom, left];
		let walls = [currentCell.topWall, currentCell.rightWall, currentCell.bottomWall, currentCell.leftWall];
		for (let i = 0; i < adjacents.length; i++) {
			if (adjacents[i] && !visitedBFS.includes(adjacents[i]) && !walls[i]) {
				adjacents[i].parent = currentCell;
				queue.push(adjacents[i]);
				visitedBFS.push(adjacents[i]);
				adjacents[i].visitedBFS = true;
			}
		}
	}
	else {
		grid.markOptimusPath(endCell);
	}
}