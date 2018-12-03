function Cell (i, j, sideLength) {
    //Longitud del lado de la celda, que es un cuadrado.
	this.sideLength = sideLength;

	//Par ordenado que identifica a la celda en la cuadrícula.
	this.i = i;
	this.j = j;

    //Paredes de la celda.
	this.topWall = true;
	this.rightWall = true;
	this.bottomWall = true;
	this.leftWall = true;
	
	//Variable que indica si la celda ha sido visitada (DFS)
	this.visited = false;

	//Flags
	this.path = false;
	this.visitedBFS = false;

	//Padre de la celda para BFS.
	this.parent = null;

    //Muestra los lados de la celda según los valores del arreglo sides.
	this.display = function () {
		//Pixeles x, y de la esquina superior izquierda de la celda.
		let x = this.j * this.sideLength;
		let y = this.i * this.sideLength;
		//Se pintan las paredes según corresponda.
		stroke(240);
		if (this.topWall) {
			line(x, y, x + this.sideLength, y);
		}
        if (this.rightWall) {
			line(x + this.sideLength, y, x + this.sideLength, y + this.sideLength);
		}
        if (this.bottomWall) {
			line(x + this.sideLength, y + this.sideLength, x, y + this.sideLength);
		}
        if (this.leftWall) {
			line(x, y + this.sideLength, x, y);
		}
		//Se rellena si es que se ha visitado el nodo.
		if (this.visited) {
			noStroke();
			fill(0, 51, 77, 100);
			//Se dibuja un rectángulo inscrito en la celda
			rect(x, y, this.sideLength, this.sideLength);
		}

		if (this.visitedBFS) {
			noStroke();
			fill(0, 139, 204, 100);
			//Se dibuja un rectángulo inscrito en la celda
			rect(x, y, this.sideLength, this.sideLength);
		}

		if (this.path) {
			noStroke();
			fill(128, 215, 255, 100);
			//Se dibuja un rectángulo inscrito en la celda
			rect(x, y, this.sideLength, this.sideLength);
		}
	}

	this.mark = function ()
	{
		let x = this.j * this.sideLength;
		let y = this.i * this.sideLength;
		noStroke();
		fill(255, 0, 0, 100);
		rect(x, y, this.sideLength, this.sideLength);
	}

	//Comparaciones con celdas adyacentes.
	this.hasTop = function (cell)
	{
		return (this.i - 1 == cell.i) && (this.j == cell.j); 
	}

	this.hasRight = function (cell)
	{
		return (this.i == cell.i) && (this.j + 1 == cell.j); 
	}

	this.hasBottom = function (cell)
	{
		return (this.i + 1 == cell.i) && (this.j == cell.j); 
	}

	this.hasLeft = function (cell)
	{
		return (this.i == cell.i) && (this.j - 1 == cell.j); 
	}
}