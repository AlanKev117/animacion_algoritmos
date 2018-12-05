$("#btn-start").click(
    function () {
        let rows = parseInt($("#mazeRows").val());
        let cols = parseInt($("#mazeCols").val());
        let xBegin = parseInt($("#xBegin").val());
        let yBegin = parseInt($("#yBegin").val());
        let xEnd = parseInt($("#xEnd").val());
        let yEnd = parseInt($("#yEnd").val());
        $("#canvas-container").html("");
        new Maze(rows, cols, xBegin, yBegin, xEnd, yEnd, "canvas-container", $("#speed"), $("#message"));        
    }
);