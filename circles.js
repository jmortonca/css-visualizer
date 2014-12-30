var Visualizers = Visualizers || {};

Visualizers.Circles = _.extend({
    numOfCircles: 0,
    circleDiameter: 50,
    init: function() {
        var styleSheet = document.createElement('style');
        var circleContainer = document.createElement('div');
        circleContainer.id = 'circle-container';

        this.numOfCircles = Math.ceil(window.innerHeight / this.circleDiameter);

        for (var i = 0; i < this.numOfCircles; i++) {
            var circle = document.createElement('div');
            var circleWrapper = document.createElement('div');

            circle.className = 'circle';
            circleWrapper.className = 'circle-wrapper';
            circleWrapper.appendChild(circle);
            circleContainer.appendChild(circleWrapper);
        }

        this.setColors(styleSheet);

        styleSheet.id = 'visualizer-css';
        this.visualizer.appendChild(circleContainer);
        document.head.appendChild(styleSheet);

        this.circles = document.getElementsByClassName('circle');
    },

    setColors: function(styleSheet) {
        styleSheet = styleSheet || document.getElementById('visualizer-css');
        var stylesStr = '';

        for (var i = 0; i < this.numOfCircles; i++) {

            var startOfSelectorStr = '.circle-wrapper:nth-of-type(' + (i + 1) + ') .circle', // Its '+ 2' because reflectionOverlay is first-child
                diameter = (this.circleDiameter * (this.numOfCircles - i)),
                screenCenter = Math.round(window.innerHeight/2),
                barStr = startOfSelectorStr + ' { background-color: ' + this.color1 + '; width: ' + diameter + 'px; height: ' + diameter + 'px;}';

            stylesStr += barStr;

            this.color1 = fadeToColor(this.color1, this.color2, 1/this.numOfCircles);
        }

        styleSheet.innerHTML = stylesStr;
    },
    
    onWaveform: function(waveform) { 
        var sampleAvgs = sampleArray(waveform, this.numOfCircles);
        var circles = this.circles;
    
        for (var j = 0; j < this.numOfCircles; j++) {
            var rotateDeg = 360 * (Math.floor(sampleAvgs[j]*1000)/1000);
            circles[j].style[prefix.css + 'transform'] = ["rotate(", rotateDeg, "deg) translateX(-50%) translateZ(0)"].join("");
        }
    }
}, Visualizers.Base);