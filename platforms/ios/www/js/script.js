$(document).ready(function() {

    $("#mainPage").bind('touchmove', function(e) {
        e.preventDefault();
    });

	var canvas = document.getElementById('chordCanvas');
    var context = canvas.getContext('2d');
    var bCanvas = document.getElementById('bridgeCanvas');
    var bContext = bCanvas.getContext('2d');
    var unitX, unitY, chord, chordVar, currentChord, currentChordIndex, chordGrid;
    var neck = new Image();
    neck.src = "img/neck.png";

    var stringSounds = new Array;

    $("#chordSelector").change(pickChord);
    $("#subChordSelector").change(pickChord);

    $(canvas).swiperight(prevVar);
    $(canvas).swipeleft(nextVar);

    $("#prevButton").tap(prevVar);
    $("#nextButton").tap(nextVar);
    $("#allVariants").tap(varShow);
    $("#playButton").tap(playChord);

    resizeCanvas();
 
    function resizeCanvas() {
        $("#chordDiv").width(window.innerWidth);
        $("#chordDiv").height(window.innerHeight * 0.75);
        canvas.width = $("#chordDiv").width();
        
        $("#select").width = window.innerWidth;
        $("#select").height(window.innerHeight * 0.1);
        $(".botBut").height(window.innerHeight * 0.05);
        $("#mainButtons").css("left", window.innerWidth/2 - $("#mainButtons").width()/2);
        unitX = canvas.width/7;
        unitY = $("#chordDiv").height()/6;

        canvas.height = unitY*12;
        bCanvas.width = $("#chordDiv").width();
        bCanvas.height = unitY;

        context.font = unitY*0.3 + "px Arial";
        context.textAlign = "center";
        bContext.font = unitY*0.3 + "px Arial";
        bContext.textAlign = "center";

        for(i = 1; i <= 6; i++)
            drawCross(bContext, i);
        neck.onload = function() {
            drawNeck();
        }      
    }

    function pickChord() {
        var noteInd;
        chord = $("select#chordSelector").val() + $("select#subChordSelector").val();

        chordVar = chords[chord];
        currentChordIndex = 0;
        setArray();

        $("#playButton").removeClass("ui-disabled");
        $("#allVariants").removeClass("ui-disabled");
    }

    function chordCheck() {
        if(currentChordIndex != chordVar.length - 1)
            $("#nextButton").removeClass("ui-disabled");
        else
            $("#nextButton").addClass("ui-disabled");
        if(currentChordIndex != 0)
            $("#prevButton").removeClass("ui-disabled");
        else
            $("#prevButton").addClass("ui-disabled");      
    }

    function prevVar() {
        if(currentChordIndex != 0) {
            currentChordIndex--;
            setArray();
        }
    }

    function nextVar() {
        if(currentChordIndex != chordVar.length - 1) {
            currentChordIndex++;
            setArray();
        }
    }

    function buildChord() {
        strings = ["E0","A0","D1","G1","B1","E2"];
        for(i = 0; i < chordGrid.length; i++) {
            if(stringSounds[i])
                stringSounds[i].release();
            if(chordGrid[i] == null)
                strings[i] = null;
            else {
                noteInd = $.inArray(strings[i], notes);
                strings[i] = notes[noteInd + chordGrid[i]];
                stringSounds[i] = new Media("sounds/" + strings[i] + ".aiff");
                stringSounds[i].setVolume('0.6');
            }
        }         
    }

    function playChord() {
        for(i = 0; i < chordGrid.length; i++) {
            if(chordGrid[i] != null) {
                stringSounds[i].stop();
                stringSounds[i].play();
            }
        }
    }

    function setArray() {
        currentChord = chordVar[currentChordIndex];
        chordGrid = currentChord;
        buildChord();
        drawFinger(chordGrid);
        chordCheck();       
    }

    function drawNeck() {
        context.drawImage(neck, unitX, 0, unitX*5, unitY*12);
    }

    function drawGuitar(min, max) { //отрисовка сетки грифа
        context.clearRect(0, 0, canvas.width, canvas.height);
        //основа
        context.beginPath();
        context.strokeRect(unitX, unitY, unitX*5, unitY*5);

        //отрисовка порожка
        if(max <= 5) {
            context.beginPath();
            context.moveTo(unitX, unitY);
            context.lineTo(unitX*6, unitY);
            context.lineWidth = unitX/6;
            context.stroke();
            context.lineWidth = 1;
        }
        else {
            context.font = unitY*0.6 + "px Arial";
            context.textAlign = "center";
            context.fillText(min, unitX/2.25, unitY*1.75, unitX*0.6);
        }
        
        //отрисовка ладов и струн
        for(i = 2; i < 6; i++) {
            context.beginPath();
            context.moveTo(unitX*i, unitY);
            context.lineTo(unitX*i, unitY*6);
            context.moveTo(unitX, unitY*i);
            context.lineTo(unitX*6, unitY*i);
            context.stroke();
        }
    }

    function drawCross(ctx, k) { //отрисовка незвучащей струны
        ctx.beginPath();
        ctx.moveTo(k*unitX - unitX/3, unitY/4);
        ctx.lineTo(k*unitX + unitX/3, unitY - unitY/4);
        ctx.moveTo(k*unitX + unitX/3, unitY/4);
        ctx.lineTo(k*unitX - unitX/3, unitY - unitY/4);
        ctx.stroke();
    }

    function drawFinger(arr) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        bContext.clearRect(0, 0, canvas.width, canvas.height);
        var note;
        drawNeck();
        for(i = 0; i < arr.length; i++) {
            //отрисовка позиций пальцев
            if(arr[i] == null) {
                drawCross(bContext, i + 1);
            }
            else {
                context.fillStyle = "#000";
                note = strings[i][0];
                if(strings[i][1] == "d")
                    note += "#";
                if(arr[i] == 0) {
                    bContext.beginPath();
                    bContext.arc(unitX*i + unitX, unitY/2, unitY/3, 0, Math.PI*2, false);
                    bContext.stroke(); 
                    bContext.fillText(note, unitX*i + unitX, unitY/1.75, unitX*0.6);
                }
                else {
                    context.beginPath();
                    context.arc(unitX*i + unitX, arr[i]*unitY - unitY/2, unitY/3, 0, Math.PI*2, false);
                    context.fill();
                    context.fillStyle = "#fff";
                    context.fillText(note, unitX*i + unitX, arr[i]*unitY - unitY/2.5, unitX*0.6);
                }
            }    
        }
    }

    function drawFingerMini(arr) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var tab = 0;
        var min = 0;
        var note;
        var noteY;
        var max = Math.max.apply(Math, arr);
        //проверяем позицию
        if(max > 5) {
            min = 50;
            for(i = 0; i < arr.length; i++) {
                if(arr[i] != null && arr[i] != 0 && arr[i] < min)
                    min = arr[i];
            }
            tab = min - 1;
        }
        drawGuitar(min, max);

        for(i = 0; i < arr.length; i++) {
            //отрисовка позиций пальцев
            if(arr[i] == null)
                drawCross(context, i + 1);
            else {
                context.fillStyle = "#000";
                if(arr[i] == 0) {
                    context.beginPath();
                    context.arc(unitX*i + unitX, unitY/2, unitY/3, 0, Math.PI*2, false);
                    context.stroke(); 
                    context.fillStyle = "#000";
                    noteY = unitY/1.75;                          
                }
                else {
                    context.beginPath();
                    context.arc(unitX*i + unitX, (arr[i] - tab)*unitY + unitY - unitY/2, unitY/3, 0, Math.PI*2, false);
                    context.fill();
                    context.fillStyle = "#fff"; 
                }
            }    
        }
    }

    function varShow() {
        $("#allVars").empty();
        var miniCanvas;
        for(var i = 0; i < chordVar.length; i++) {
            $("#allVars").append("<canvas class='canvasMini' id='" + i + "'></canvas>");
            miniCanvas = document.getElementById(i);
            context = miniCanvas.getContext('2d');
            miniCanvas.width = window.innerWidth/3-4;
            miniCanvas.height = miniCanvas.width;
            unitX = miniCanvas.width/7;
            unitY = miniCanvas.height/7;
            drawFingerMini(chordVar[i]);
        }
        $('#' + currentChordIndex).addClass("picked");
        $(".canvasMini").tap(function() {
            currentChordIndex = this.id;
            setArray();
            $.mobile.changePage("#mainPage", {transition: "pop"});
        });
        context = canvas.getContext('2d');
        unitX = canvas.width/7;
        unitY = $("#chordDiv").height()/6;
    }
});