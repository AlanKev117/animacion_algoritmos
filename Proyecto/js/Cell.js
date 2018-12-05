class Cell {
	constructor (i, j, sideLength) {
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
	}
		
	//Muestra los lados de la celda según los valores del arreglo sides.
	display (p5) {
		//Pixeles x, y de la esquina superior izquierda de la celda.
		let x = this.j * this.sideLength;
		let y = this.i * this.sideLength;
		//Se pintan las paredes según corresponda.
		p5.stroke(240);
		if (this.topWall) {
			p5.line(x, y, x + this.sideLength, y);
		}
        if (this.rightWall) {
			p5.line(x + this.sideLength, y, x + this.sideLength, y + this.sideLength);
		}
        if (this.bottomWall) {
			p5.line(x + this.sideLength, y + this.sideLength, x, y + this.sideLength);
		}
        if (this.leftWall) {
			p5.line(x, y + this.sideLength, x, y);
		}
		//Se rellena si es que se ha visitado el nodo.
		if (this.visited) {
			p5.noStroke();
			p5.fill(0, 51, 77, 100);
			//Se dibuja un rectángulo inscrito en la celda
			p5.rect(x, y, this.sideLength, this.sideLength);
		}

		if (this.visitedBFS) {
			p5.noStroke();
			p5.fill(0, 139, 204, 100);
			//Se dibuja un rectángulo inscrito en la celda
			p5.rect(x, y, this.sideLength, this.sideLength);
		}

		if (this.path) {
			p5.noStroke();
			p5.fill(128, 215, 255, 100);
			//Se dibuja un rectángulo inscrito en la celda
			p5.rect(x, y, this.sideLength, this.sideLength);
		}
	}

	mark (p5)
	{
		let x = this.j * this.sideLength;
		let y = this.i * this.sideLength;
		p5.noStroke();
		p5.fill(255, 0, 0, 100);
		p5.rect(x, y, this.sideLength, this.sideLength);
	}

	//Comparaciones con celdas adyacentes.
	hasTop (cell)
	{
		return (this.i - 1 == cell.i) && (this.j == cell.j); 
	}

	hasRight (cell)
	{
		return (this.i == cell.i) && (this.j + 1 == cell.j); 
	}

	hasBottom (cell)
	{
		return (this.i + 1 == cell.i) && (this.j == cell.j); 
	}

	hasLeft (cell)
	{
		return (this.i == cell.i) && (this.j - 1 == cell.j); 
	}
}