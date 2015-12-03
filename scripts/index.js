/// <reference path="../scripts/snap/snap.svg.js" />

(function () {
    "use strict";

    const MAX_TRAVEL_RADIUS = 40;
    const SWATCH_SIZE = 1000;
    const SPEED_X = 20;
    const SPEED_Y = 40;
    const SPEED_EXPONENT = 3;

    // DOM elements
    var snap;
    var rightSwatch;
    var leftSwatch;
    var theSwitch;
    var screenOnOff;
    
    // Other variables
    var lookupCanvasContext;
    var lightColor;
    var colorX;
    var colorY;
    var updateTimer;

    window.onload = function()
    {
        // Load DOM elements
        snap = Snap("svg");
        rightSwatch = snap.select("#right-swatch");
        leftSwatch = snap.select("#left-swatch");
        theSwitch = snap.select("#switch");
        screenOnOff = snap.select("#screen-on-off");

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
        screenOnOff.animate({ "fill-opacity": 0 }, 25);

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
        screenOnOff.animate({ "fill-opacity": 1 }, 25);

        theSwitch.animate({ "transform": "translate(0 0)" }, 50);
        clearInterval(updateTimer);

        event.preventDefault();
    }

    function update()
    {
        var dx = theSwitch.transform().localMatrix.e;
        var dy = theSwitch.transform().localMatrix.f;

        colorX += SPEED_X * Math.pow(dx / MAX_TRAVEL_RADIUS, SPEED_EXPONENT); // Uncomment the following for even exponents: * (dx >= 0 ? 1 : -1);
        colorY += SPEED_Y * Math.pow(dy / MAX_TRAVEL_RADIUS, SPEED_EXPONENT); // Uncomment the following for even exponents: * (dy >= 0 ? 1 : -1);

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

        rightSwatch.transform("translate(" + (-colorX) + " " + (-colorY) + ")")
        leftSwatch.transform("translate(" + (-colorX - 1000) + " " + (-colorY) + ")")

        lightColor = getColor(colorX, colorY);
        
        colorize(lightColor);
    }

    function getColor(x, y)
    {
        while (x < 0)
        {
            x += SWATCH_SIZE;
        }

        var raw = lookupCanvasContext.getImageData(Math.floor(x), Math.floor(y), 1, 1);

        return {
            red: raw.data[0],
            green: raw.data[1],
            blue: raw.data[2],
        };

    }
    
    function colorize(color)
    {
        var colorString = "rgb(" + color.red + ", " + color.green + ", " + color.blue + ")";
        
        document.body.style.backgroundColor = colorString;
        document.getElementById("switchplate").style.backgroundColor = colorString;
        theSwitch.attr("fill", colorString);
    }

} )();