var maze;
$("#pruebas").click(
    function () {
        maze = undefined;
        maze = null;
    }
);

$("#btn-start").click(
    function () {
        let alertMsg = "";
        let rows = parseInt($("#mazeRows").val());
        let cols = parseInt($("#mazeCols").val());
        let xBegin = parseInt($("#xBegin").val());
        let yBegin = parseInt($("#yBegin").val());
        let xEnd = parseInt($("#xEnd").val());
        let yEnd = parseInt($("#yEnd").val());

        if (rows < 1) {
            alertMsg += "Debe haber al menos una fila.\n";
        }
        if (cols < 1) {
            alertMsg += "Debe haber al menos una columna.\n";
        }
        if (xBegin < 1 || xBegin > rows) {
            alertMsg += "Casilla de inicio no válida para el tamaño del laberinto elegido.\n";
        }
        if (yBegin < 1 || yBegin > cols) {
            alertMsg += "Casilla de inicio no válida para el tamaño del laberinto elegido.\n";
        }
        if (xEnd < 1 || xEnd > rows) {
            alertMsg += "Casilla final no válida para el tamaño del laberinto elegido.\n";
        }
        if (yEnd < 1 || yEnd > cols) {
            alertMsg += "Casilla final no válida para el tamaño del laberinto elegido.\n";
        }

        if (alertMsg.length > 0) {
            alert("Error en los datos. Revise lo siguiente: \n" + alertMsg);
            return;
        }

        $("#message-container").html("");
        $("#message-container").html("<div id='message'></div>");
        $("#canvas-container").html("");
        maze = null;
        maze = new Maze(rows, cols, xBegin - 1, yBegin - 1, xEnd - 1, yEnd - 1, "canvas-container", $("#speed"), $("#message"));        
    }
);

$("#tutorialModal").on("shown.bs.modal",
    function () {
        $("#btn-goDFS").click(
            function () {
                $("#tutorialCanvasDFS").attr("hidden", false);
                $("#tutorialCanvasBFS").attr("hidden", true);
            }
        );
        $("#btn-goBFS").click(
            function () {
                $("#tutorialCanvasDFS").attr("hidden", true);
                $("#tutorialCanvasBFS").attr("hidden", false);
            }
        );
    }
);