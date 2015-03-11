var debug = require('debug')('sketch');

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

function oneChildSelection(element) {
  d3.selectAll(element.parentNode.childNodes)
    .classed('selected', false);
  var $s = d3.select(element);
  $s.classed('selected', ! $s.classed('selected'));
}

var app = {
  init() {
    var addCtrl = false;

    var $sketchControl = d3.select('#sketch-control')
          .append('p');

    $sketchControl.append('button').attr('id', 'clickAdd')
      .attr('class', 'sketch-control-element')
      .text('Add')
      .on('click', function (d, i) {
        debug('Add');
        addCtrl = true;
        oneChildSelection(this);
      });

    $sketchControl.append('button').attr('id', 'clickSelect')
      .attr('class', 'sketch-control-element')
      .text('Select')
      .on('click', function (d, i) {
        debug('Select');
        addCtrl = false;
        oneChildSelection(this);
      });

    $sketchControl.append('button').attr('id', 'clickDelete')
      .attr('class', 'sketch-control-element')
      .text('Delete')
      .on('click', function (d, i) {
        debug('Delete');
        oneChildSelection(this);
      });

    $sketchControl.append('button').attr('id', 'clickMove')
      .attr('class', 'sketch-control-element')
      .text('Move')
      .on('click', function (d, i) {
        debug('Move');
        oneChildSelection(this);
      });

    var $sketch = document.querySelector('#sketch');

    var graph = timeline()
      .width($sketch.clientWidth)
      .height($sketch.clientWidth / 2)
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
    d3.select('#sketch').call(graph.draw);

    graph.on('mousedown', function(e) {
      if (!addCtrl) { return; }
      var cx = graph.xScale.invert(e.layerX);
      var cy = graph.yScale.invert(e.layerY);

      // debug('item = %s', d3.select(e).classed('item') );
      debug("e.layerX,Y = %s,%s", e.layerY, e.layerX);

      data.push({
        cx: cx,
        cy: cy,
        r: 3
      });

      // update after data change
      graph.update();
    });
  }
};

window.addEventListener('DOMContentLoaded', function() {
  app.init();
});
