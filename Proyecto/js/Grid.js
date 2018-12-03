function Grid (cells, rows, cols)
{
    this.cells = cells;
    this.rows = rows;
    this.cols = cols;

    //Función para objener el índice del arreglo 1D con entradas de arreglo 2D
    this.index = function (i, j)
    {
        if (i >= this.rows || i < 0 || j >= this.cols || j < 0) {
            return -1;
        }
        return this.rows * i + j;
    };

    //Muestra en el canvas la cuadrícula
    this.displayGrid = function ()
    {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.cells[this.index(i, j)].display();
            }
        }
    };
    //Funciones para obtener alguna celda adyacente.
    this.topOf = function (cell)
    {
        return this.cells[this.index(cell.i - 1, cell.j)];
    }

    this.rightOf = function (cell)
    {
        return this.cells[this.index(cell.i, cell.j + 1)];
    }

    this.bottomOf = function (cell)
    {
        return this.cells[this.index(cell.i + 1, cell.j)];
    }

    this.leftOf = function (cell)
    {
        return this.cells[this.index(cell.i, cell.j - 1)];
    }
    //Encuentra las celdas adyacentes que no han sido visitadas.
    this.getUnvisitedAdjacentOf = function (cell)
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
            return adjacents[floor(random(0, adjacents.length))];
        }
        //En caso de no existir, se regresa undefined.
        else {
            return undefined;
        }
    };

    this.removeWallBetween = function (cell1, cell2)
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

    this.markOptimusPath = function (end)
    {
        for (let current = end; current != null; current = current.parent) {
            current.path = true;
        }
    }

}