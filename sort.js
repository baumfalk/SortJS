function Sort() {
  this.initialize = function() {
    this.width  = 100;
    this.height = 100;
    this.lock = false;
    this.curElem = 0;
    this.numberOfElements = this.width * this.height;

    this.canvas         = document.getElementById("sort");
    this.canvas.height  = this.height;
    this.canvas.width   = this.width;
    this.context        = this.canvas.getContext("2d");

    // create array of random colors
    this.elements = [];
    for (var i = 0; i < this.numberOfElements; i++) {
      var color = this.rainbow(this.numberOfElements,  Math.round(Math.random()*this.numberOfElements));
      this.elements.push(new Element(color));
    };

    document.addEventListener("keypress", this.inputHandler.bind(this));
    // create a timer that draws every 100ms   
  }

  this.inputHandler = function (e) {
    console.log(e);

    if(this.isStart(e)) {
      this.handleStart();
    }
  }

  this.isStart = function(e) {
    if(e.key === " " || e.keyCode == 32) {
      return true;
    }
    return false;
  }

  this.handleStart = function() {
    if(this.started) {
      this.started = false;
      clearInterval(this.intervalID);
    } else {
      this.started = true;
      this.intervalID = setInterval(this.tick.bind(this),1);
    } 
  }

  this.tick = function() {
    while(this.lock) {

    }
    if(this.curElem === this.elements.length -1) {
      clearInterval(this.intervalID);
      console.log("Done!");
    }
    //console.log("Lock is free!");
    this.lock = true;

    //console.log("Doing the tick" + this.curElem);

    var lowestElem = this.elements[this.curElem];
    var lowestIndex = this.curElem;
    console.log(this.elements[this.curElem]);
    for (var i = this.curElem; i < this.elements.length; i++) {
      if(this.elements[i].color < lowestElem.color) {
        this.lowestIndex = i;
        this.lowestElem = this.elements[i];  
      }
    }

    var temp = this.elements[this.curElem];
    this.elements[this.curElem] = this.lowestElem;
    this.elements[this.lowestIndex] = temp;

    console.log(this.elements[this.curElem]);
    this.curElem++;

    this.elements.forEach( function(item, index, array) {
      var y = Math.floor(index / this.width);
      var x = index % this.width; 
      
      var oldColor = this.context.fillStyle;
      this.context.fillStyle = item.color;
      this.context.fillRect(x,y,1,1);
      this.context.fillStyle = oldColor;
    }.bind(this))
    this.lock = false;
  }

  this.rainbow = function(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
  }
}

window.onload = function() {
  var sort = new Sort();
  sort.initialize();

  console.log("initialized sort");
}