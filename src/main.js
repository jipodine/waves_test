var wavesUI = require('waves-ui');
var timeline = wavesUI.timeline;
var breakpoint = wavesUI.breakpoint;
var d3 = wavesUI.d3;

var xDomain = [-10, 10];
var yDomain = [-5, 5];

var data = [
  {
    cx: 0,
    cy: 0,
    r: 3
  }, {
    cx: -2,
    cy: -1,
    r: 3
  }, {
    cx: 2,
    cy: 1,
    r: 3
  }
];

var datumToAdd = {
  cx: -8,
  cy: -3,
  r: 6
};

var app = {
  init() {
    var $timeline = document.querySelector('#timeline');


    var graph = timeline()
      .width($timeline.clientWidth)
      .height($timeline.clientWidth / 2)
      .xDomain(xDomain)
      .yDomain(yDomain);

    var breakpointLayer = breakpoint()
      .params({
        interactions: { editable: true },
        displayLine: false
      })
      .data(data);

    // breakpoint.handleSelection = function(item, e) {

    // }

    graph.add(breakpointLayer);

    // call once
    d3.select('#timeline').call(graph.draw);

    // to update
    setTimeout(function() {
      data.push(datumToAdd);
      graph.update(breakpointLayer);
    }, 3000);

    graph.on('mousedown', function(e) {
      var cx = graph.xScale.invert(e.layerX);
      var cy = graph.xScale.invert(e.layerY);

      data.push({
        cx: cx,
        cy: cy,
        r: 3
      });

      graph.update();
    });
  }
};

window.addEventListener('DOMContentLoaded', function() {
  app.init();
});
