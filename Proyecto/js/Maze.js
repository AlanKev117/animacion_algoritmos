class Maze {
	constructor (rows, cols, beginX, beginY, endX, endY, idContainer, fpsSilder, messageDiv) {
        //Datos del laberinto.
        new p5(function (p5) {

            var sidePixels = 50; //(NOT USER)
            
            //Instancia una cuadrícula para el laberinto.
            var grid = new Grid([], rows, cols);
            
            //Variables para DFS.
            var currentCell;
            var stack = [];
            var mazeDone = false;
            
            //Variables para BFS.
            var beginCell;
            var endCell;
            var queue = [];
            var visitedBFS = [];
            var mazeSolved = false;
            
            p5.setup = function () {
                //Declara el canvas en el DOM
                p5.createCanvas(sidePixels * cols, sidePixels * rows);
                
                //Llena la cuadrícula con celdas según las medidas dadas.
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        grid.cells.push(new Cell(i, j, sidePixels));
                    }
                }
                
                //Inicio DFS
                currentCell = grid.cells[0];	//Celda de inicio.
                currentCell.visited = true;		//Marcada como visitada.
                
                //Inicio BFS
                beginCell = grid.cells[grid.index(beginX, beginY)];	//Celda de partida	
                endCell = grid.cells[grid.index(endX, endY)]; 		//Celda destino
                beginCell.path = true; 								//Celda de partida es parte de la ruta.
                queue.push(beginCell);
                visitedBFS.push(beginCell);
            }
            
            p5.draw = function () {
                //Visualización del estado del laberinto.
                p5.frameRate(parseInt(fpsSilder.val()));
                p5.background(0);
                grid.displayGrid(p5);
                currentCell.mark(p5);
                messageDiv.html("");
                //Generación del laberinto (DFS).
                if (!mazeDone) {
                    messageDiv.html(`Somos la casilla roja (${currentCell.i + 1}, ${currentCell.j + 1}).<br>`);
                    let nextCell = grid.getUnvisitedAdjacentOf(currentCell);
                    if (nextCell) {
                        messageDiv.append(`Tenemos junto a (${nextCell.i + 1}, ${nextCell.j + 1}) sin visitar!, lo metemos en la pila, <br>`);
                        stack.push(currentCell);
                        messageDiv.append(`removemos la pared entre nosotros y (${nextCell.i + 1}, ${nextCell.j + 1}) <br>`);
                        grid.removeWallBetween(currentCell, nextCell);
                        messageDiv.append("y nos desplazamos a la nueva casilla.");
                        currentCell = nextCell;
                        currentCell.visited = true;
                    }
                    else if (stack.length > 0) {
                        messageDiv.append("¡No tenemos vecinos sin visitar!<br>");
                        currentCell = stack.pop();
                        messageDiv.append(`Ahora quitamos de la pila a (${currentCell.i + 1}, ${currentCell.j + 1}) y nos movemos ahí.<br>`);
                    }
                    mazeDone = currentCell == grid.cells[0];
                }
                //Solución del laberinto (BFS)
                else if (!mazeSolved) {
                    messageDiv.html(`El laberinto ha sido generado.<br>`);
                    currentCell = queue.shift();
                    if (!currentCell || currentCell == endCell) {
                        mazeSolved = true;
                        messageDiv.append(`Hemos llegado a la casilla destino.`);
                    }
                    else {
                        messageDiv.append(`Somos la casilla roja (${currentCell.i + 1}, ${currentCell.j + 1}), la siguiente de la fila.`);
                        currentCell.mark(p5);
                        let top = grid.topOf(currentCell);
                        let right = grid.rightOf(currentCell);
                        let bottom = grid.bottomOf(currentCell);
                        let left = grid.leftOf(currentCell);
                        let adjacents = [top, right, bottom, left];
                        let walls = [currentCell.topWall, currentCell.rightWall, currentCell.bottomWall, currentCell.leftWall];
                        for (let i = 0; i < adjacents.length; i++) {
                            if (adjacents[i] && !visitedBFS.includes(adjacents[i]) && !walls[i]) {
                                messageDiv.append(`Ponemos al vecino (${adjacents[i].i + 1}, ${adjacents[i].j + 1}) en fila <br>`);
                                messageDiv.append(`y lo marcamos como visitado.`);
                                adjacents[i].parent = currentCell;
                                queue.push(adjacents[i]);
                                visitedBFS.push(adjacents[i]);
                                adjacents[i].visitedBFS = true;
                            }
                        }
                    }
                }
                //Ambos algoritmos terminados.
                else {
                    messageDiv.html("Ruta econtrada.");
                    grid.markOptimusPath(endCell);
                }
            } 
        }, idContainer);
	}
}