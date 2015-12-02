/// <reference path="../scripts/snap/snap.svg.js" />

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };



    const CONFIG = {
        speed: 1.0,
    };

    var snap = Snap("svg");
    var swatches = [snap.select("#swatch-1"), snap.select("#swatch-2")];
    var theSwitch = snap.select("#switch");
    var screenCircle = snap.select("#screen-circle");

    theSwitch.drag(dragMove, dragStart, dragEnd);

    function dragStart(x, y, event)
    {
        screenCircle.removeClass("off");
        screenCircle.addClass("on");
    }

    function dragMove(dx, dy, x, y, event)
    {

    }

    function dragEnd(event)
    {
        screenCircle.removeClass("on");
        screenCircle.addClass("off");

    }

    function update()
    {
        var dx = theSwitch.transform().localMatrix.e;
        var dy = theSwitch.transform().localMatrix.f;
        for (swatch in swatches)
        {
            
        }
    }

} )();