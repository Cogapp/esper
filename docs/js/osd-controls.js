/*jslint devel: true */

$(function () 
  {
    "use strict";
    $('#fullscreen').click(goFullScreen);
    $('#enhance').click(enhance);
    $('#pull-out').click(pullOut);
    $('#pan-right').click(panRight);
    $('#pan-left').click(panLeft);
    $('#pan-up').click(panUp);
    $('#pan-down').click(panDown);
    $('#stop').click(esperStop);
    $('#hard-copy').click(hardCopy);
  });

window.intVal = null;
window.effectSpeed = 400;

viewer.addHandler('full-screen', startFullScreen); 

function goFullScreen() {
    viewer.setFullScreen(true);
}

function startFullScreen(event) {
    console.log("gone fullscreen " + event.fullScreen);
    if (event.fullScreen == true) {
        recognition.start();
        drawGrid();
    } else {
        recognition.stop();
    }
}

function enhance() {
    //console.log(viewer.viewport.getBounds())
    
    //viewer.viewport.getBounds()    
    //var point = new OpenSeadragon.Point(-0.5,-0.5)
    esperStop();
    
    intVal = setInterval(function() {
        console.log("zooming " + viewer.viewport.getZoom())
        viewer.viewport.zoomTo(viewer.viewport.getZoom()*1.1,null,true);
        blueFlash();
        viewer.forceRedraw();
        drawGrid();
    }, effectSpeed)
    
}


function pullOut() {
    //console.log(viewer.viewport.getBounds())
    
    esperStop();
    
    intVal = setInterval(function() {
        console.log("dezooming " + viewer.viewport.getZoom())
        viewer.viewport.zoomTo(viewer.viewport.getZoom()/1.1,null,true);
    }, effectSpeed)

}

function panRight() {
    pan(0.05,0);
}

function panLeft() {
    pan(-0.05,0);
}

function panUp() {
    pan(0,-0.05);
}

function panDown() {
    pan(0,0.05);
}

function esperStop() {
    clearInterval(intVal);
    intVal = null;
}

function pan(x,y) {
    
    esperStop();
    
    intVal = setInterval(function() {
        console.log("panning " + x + y)
        console.log(viewer.viewport.getBounds());
        var bounds = viewer.viewport.getBounds();
        var point = new OpenSeadragon.Point(x,y);
        var newBounds = bounds.translate(point);
        viewer.viewport.fitBoundsWithConstraints(newBounds, true);    
    }, effectSpeed)
    
}

function hardCopy() {
    window.print();
}