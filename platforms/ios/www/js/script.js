$(document).ready(function() {

    $("#mainPage, #variants").bind('touchmove', function(e) {
        e.preventDefault();
    });

	var canvas = document.getElementById('chordCanvas');
    var context = canvas.getContext('2d');
    var bCanvas = document.getElementById('bridgeCanvas');
    var bContext = bCanvas.getContext('2d');
    var unitX, unitY, currentChordIndex;
    var index = 0;
    var chordVar = [];
    var chordGrid = [null, null, null, null, null, null];
    var neck = new Image();
    neck.src = "img/neck.png";

    var stringSounds = new Array;

    var myScroll;
    var myScroll2;

    $('#cf').bind('datebox', function (e, p) {
        if (p.method === 'postrefresh') {
            $(".ui-datebox-container h1.ui-title").html("Close");
            currentChordIndex = null;
            $("#prevButton").addClass("ui-disabled");
            $("#nextButton").addClass("ui-disabled"); 
        }
        if (p.method === 'set') {
            e.stopImmediatePropagation();
            if(p.value == "Chord") {
                $("#allVariants").addClass("ui-disabled");

            }
            else {
                var valArr = p.value.split(",");
                var chordValue = chordsIndexes[0][valArr[0]] + chordsIndexes[1][valArr[1]];
                $(this).val(chordValue);           
                pickChord(chordValue);
            } 
        }
    });

    $("#chordSelector").change(pickChord);
    $("#subChordSelector").change(pickChord);

    $(canvas).tap(addNote);
    $(bCanvas).tap(openString);

    $("#prevButton").tap(prevVar);
    $("#nextButton").tap(nextVar);
    $("#allVariants").tap(varShow);
    $("#playButton").tap(playChord);

    resizeCanvas();

    function resizeCanvas() {
        $("#wrapper").height(window.innerHeight);
        $("#wrapper").width(window.innerWidth);
        $("#chordDiv").width(window.innerWidth);
        $("#allVars").width(window.innerWidth);
        canvas.width = $("#chordDiv").width();
        bCanvas.width = $("#chordDiv").width();
              
        unitX = canvas.width/7;
        unitY = window.innerHeight/7;
        
        bCanvas.height = unitY;
        canvas.height = unitY*12;

        bCanvas.width = $("#chordDiv").width();
        
        $("#headerMenu").height($("#dateBox").height() + bCanvas.height);
        $("#chordDiv").height(window.innerHeight - $("#headerMenu").height() - $("#footerMenu").height());

        $("#chordDiv").trigger("updatelayout");  
        context.font = unitY*0.3 + "px Arial";
        context.textAlign = "center";
        bContext.font = unitY*0.3 + "px Arial";
        bContext.textAlign = "center";

        neck.onload = function() {
            drawFinger(chordGrid);
        }
        myScroll = new iScroll('chordDiv', { hScrollbar: false, vScrollbar: false });
    }

    function pickChord(chordValue) {
        chordVar = [];
        for(var i = 0; i < chords[chordValue].length; i++) {
            chordVar[i] = chords[chordValue][i];
        }
        $("#cf").val(chordValue.replace("M", ""));        
        
        currentChordIndex = index;
        index = 0;
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

    function addNote(event) {
        var stringIndex;
        var fretIndex;
        var tapX = event.pageX/unitX;
        var tapY = (event.pageY - myScroll.y)/unitY;

        if((Math.abs(tapX - tapX.toFixed())) < 0.35) {
            var stringIndex = Math.round(tapX) - 1;
            if(stringIndex > -1 && stringIndex < 6) {
                fretIndex = Math.round(tapY) - 1;
                if(chordGrid[stringIndex] == fretIndex)
                    chordGrid[stringIndex] = null;
                else
                    chordGrid[stringIndex] = fretIndex;
                buildChord(chordGrid);
                drawFinger(chordGrid);
                findChord();
            }
        } 
    }

    function openString(event) {
        var stringIndex;
        var tapX = event.pageX/unitX;

        if((Math.abs(tapX - tapX.toFixed())) < 0.35) {
            var stringIndex = Math.round(tapX) - 1;
            if(stringIndex > -1 && stringIndex < 6) {
                if(chordGrid[stringIndex] == 0)
                    chordGrid[stringIndex] = null;
                else
                    chordGrid[stringIndex] = 0;
                buildChord(chordGrid);
                drawFinger(chordGrid);
                findChord();
            }
        }
    }

    function findChord() {
        var prima;
        var targetArr;
        var targetName;
        chordVar = [];
        for(var i = 0; i < strings.length; i++) {
            if(strings[i] != null) {
                prima = strings[i];
                break;
            }
        }

        if(!prima)
            return;
        if(prima[1] == "#")
            prima = prima[0] + prima[1];
        else
            prima = prima[0];

        for(i = 0; i < chordsIndexes[1].length; i++) {
            targetName = prima + chordsIndexes[1][i];
            for(var j = 0; j < chords[targetName].length; j++) {
                if(chordGrid.join("-") == chords[targetName][j].join("-")) {
                    /*$.extend($.mobile.datebox.prototype.options, {
                        'openCallbackArgs': ["dsasa"]
                    });*/
                    index = j;
                    $("#cf").trigger('datebox', {'method':'set', 'value':$.inArray(prima, chordsIndexes[0]) + "," + i});
                    return;
                }
            }
        }
        $("#cf").trigger('datebox', {'method':'set', 'value':"Chord"});
    }

    function prevVar() {
        if(currentChordIndex != 0) {
            currentChordIndex--;
            setArray();
            $(this).parent.removeClass("ui-btn-active");
        }
    }

    function nextVar() {
        if(currentChordIndex != chordVar.length - 1) {
            currentChordIndex++;
            setArray();
            $(this).parent.removeClass("ui-btn-active");
        }
    }

    function buildChord(arr) {
        var noteInd;
        strings = ["E0","A0","D1","G1","B1","E2"];
        for(i = 0; i < arr.length; i++) {
            if(stringSounds[i])
                stringSounds[i].release();
            if(arr[i] == null)
                strings[i] = null;
            else {
                noteInd = $.inArray(strings[i], notes);
                strings[i] = notes[noteInd + arr[i]];
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
        $(this).parent.removeClass("ui-btn-active");
    }

    function setArray() {
        chordGrid = [];
        for(var i = 0; i < chordVar[currentChordIndex].length; i++) {
            chordGrid[i] = chordVar[currentChordIndex][i];
        }
        buildChord(chordGrid);
        drawFinger(chordGrid);
        
        var scroll = searchMin(chordGrid);
        if(scroll[0])
            myScroll.scrollTo(0, -((scroll[0]*unitY) - unitY*1.25), 400);
        else
            myScroll.scrollTo(0, 0, 400);
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
                if(strings[i][1] == "#")
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
        var note;
        var noteY;
        //проверяем позицию
        var minMaxArr = searchMin(arr);
        drawGuitar(minMaxArr[0], minMaxArr[1]);

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
                    context.arc(unitX*i + unitX, (arr[i] - minMaxArr[2])*unitY + unitY - unitY/2, unitY/3, 0, Math.PI*2, false);
                    context.fill();
                    context.fillStyle = "#fff"; 
                }
            }    
        }
    }

    function searchMin(arr) {
        var tab = 0;
        var min = 0;
        var max = Math.max.apply(Math, arr);
        if(max > 5) {
            min = 12;
            for(i = 0; i < arr.length; i++) {
                if(arr[i] != null && arr[i] != 0 && arr[i] < min)
                    min = arr[i];
            }
            tab = min - 1;
        }
        var mm = [min, max, tab];
        return mm;
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

        myScroll2 = new iScroll('wrapper', { hScrollbar: false, vScrollbar: false });
        setTimeout(function () { myScroll2.refresh(); }, 0); 
        
        $(".canvasMini").tap(function() {
            currentChordIndex = this.id;
            setArray();
            $.mobile.changePage("#mainPage", {transition: "pop"});
        });
        context = canvas.getContext('2d');
        unitX = canvas.width/7;
        unitY = window.innerHeight/7;
    }
});