/// <reference path="../scripts/snap/snap.svg.js" />

// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    const MAX_TRAVEL_RADIUS = 40;
    const SWATCH_SIZE = 1000;
    const SPEED = 1.0;

    // DOM elements
    var snap;
    var rightSwatch;
    var leftSwatch;
    var theSwitch;
    var screenCircle;
    
    // Other variables
    var lookupCanvasContext;
    var lightColor;
    var colorX;
    var colorY;
    var updateTimer;

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    window.onload = function()
    {
        // Load DOM elements
        snap = Snap("svg");
        rightSwatch = snap.select("#right-swatch");
        leftSwatch = snap.select("#left-swatch");
        theSwitch = snap.select("#switch");
        screenCircle = snap.select("#screen-circle");

        // Add event handlers
        theSwitch.drag(dragMove, dragStart, dragEnd);

        // Initialize other variable
        lightColor = "#ffffff";
        colorX = 0;
        colorY = 1000;

        lookupCanvasContext = constructLookupCanvas();
    }

    function constructLookupCanvas()
    {
        var can = document.createElement('canvas');
        can.height = SWATCH_SIZE;
        can.width = SWATCH_SIZE;

        var ctx = can.getContext('2d');

        var image = new Image();
        image.src = "images/hsl.png";
        ctx.drawImage(image, 0, 0);

        return ctx;
    }

    function dragStart(x, y, event)
    {
        screenCircle.removeClass("off");
        screenCircle.addClass("on");

        event.preventDefault();

        updateTimer = setInterval(update, 40);
    }

    function dragMove(dx, dy, x, y, event)
    {
        if (dx * dx + dy * dy > MAX_TRAVEL_RADIUS * MAX_TRAVEL_RADIUS)
        {
            var scale = MAX_TRAVEL_RADIUS / Math.sqrt(dx * dx + dy * dy)
            dx *= scale;
            dy *= scale;
        }

        theSwitch.transform("translate(" + dx + " " + dy + ")");
        event.preventDefault();
    }

    function dragEnd(event)
    {
        screenCircle.removeClass("on");
        screenCircle.addClass("off");

        theSwitch.animate({ "transform": "translate(0 0)" }, 50);
        clearInterval(updateTimer);

        event.preventDefault();
    }

    function update()
    {
        var dx = theSwitch.transform().localMatrix.e;
        var dy = theSwitch.transform().localMatrix.f;

        colorX += SPEED * dx;
        colorY += SPEED * dy;


        // Rollover when hitting an X bound
        if (colorX < (-SWATCH_SIZE / 2))
        {
            colorX += SWATCH_SIZE;
        }
        
        else if (colorX > (SWATCH_SIZE / 2))
        {
            colorX -= SWATCH_SIZE
        }

        // Stop when hitting a Y bound
        if (colorY < 0)
        {
            colorY = 0;
        }
        else if (colorY > SWATCH_SIZE)
        {
            colorY = SWATCH_SIZE;
        }


        console.log(Snap.format("{dx} {dy}", { "dx": dx, "dy": dy }));

        rightSwatch.transform("translate(" + (-colorX) + " " + (-colorY) + ")")
        leftSwatch.transform("translate(" + (-colorX - 1000) + " " + (-colorY) + ")")
    }

} )();