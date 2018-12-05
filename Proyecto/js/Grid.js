class Grid 
{
    constructor (cells, rows, cols) {
        this.cells = cells;
        this.rows = rows;
        this.cols = cols;
    }
        
    //Función para objener el índice del arreglo 1D con entradas de arreglo 2D
    index (i, j)
    {
        if (i >= this.rows || i < 0 || j >= this.cols || j < 0) {
            return -1;
        }
        return this.cols * i + j;
    }

    //Muestra en el canvas la cuadrícula
    displayGrid (p5)
    {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].display(p5);
        }
    };

    //Funciones para obtener alguna celda adyacente.
    topOf (cell)
    {
        return this.cells[this.index(cell.i - 1, cell.j)];
    }

    rightOf (cell)
    {
        return this.cells[this.index(cell.i, cell.j + 1)];
    }

    bottomOf (cell)
    {
        return this.cells[this.index(cell.i + 1, cell.j)];
    }

    leftOf (cell)
    {
        return this.cells[this.index(cell.i, cell.j - 1)];
    }
    //Encuentra las celdas adyacentes que no han sido visitadas.
    getUnvisitedAdjacentOf (cell)
    {
        let adjacents = [];
        let top = this.topOf(cell);
        let right = this.rightOf(cell);
        let bottom = this.bottomOf(cell);
        let left = this.leftOf(cell);
        //Se revisa cada uno de los adyacentes para ver si han sido visitados.
        if (top && !top.visited) {
            adjacents.push(top);
        }
        if (right && !right.visited) {
            adjacents.push(right);
        }
        if (bottom && !bottom.visited) {
            adjacents.push(bottom);
        }
        if (left && !left.visited) {
            adjacents.push(left);
        }
        // Se revisa que existan adyacentes sin visitar y se regresa uno aleatorio
        if (adjacents.length > 0) {
            return adjacents[Math.floor(Math.random() * adjacents.length)];
        }
        //En caso de no existir, se regresa undefined.
        else {
            return undefined;
        }
    };

    removeWallBetween (cell1, cell2)
    {
        if (cell1.hasTop(cell2)) {
            cell1.topWall = false;
            cell2.bottomWall = false;
        }
        else if (cell1.hasRight(cell2)) {
            cell1.rightWall = false;
            cell2.leftWall = false;
        }
        else if (cell1.hasBottom(cell2)) {
            cell1.bottomWall = false;
            cell2.topWall = false;
        }
        else if (cell1.hasLeft(cell2)) {
            cell1.leftWall = false;
            cell2.rightWall = false;
        }
    }

    markOptimusPath (end)
    {
        for (let current = end; current != null; current = current.parent) {
            current.path = true;
        }
    }

}