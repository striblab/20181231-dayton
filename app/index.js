/**
 * Main JS file for project.
 */

// Define globals that are added through the js.globals in
// the config.json file, here, mostly so linting won't get triggered
// and its a good queue of what is available:
// /* global _ */

// Dependencies
import utils from './shared/utils.js';

// Mark page with note about development or staging
utils.environmentNoting();



// Adding dependencies
// ---------------------------------
// Import local ES6 or CommonJS modules like this:
// import utilsFn from './shared/utils.js';
//
// Or import libraries installed with npm like this:
// import module from 'module';

// Adding Svelte templates in the client
// ---------------------------------
// We can bring in the same Svelte templates that we use
// to render the HTML into the client for interactivity.  The key
// part is that we need to have similar data.
//
// First, import the template.  This is the main one, and will
// include any other templates used in the project.
// import Content from '../templates/_index-content.svelte.html';
//
// Get the data parts that are needed.  There are two ways to do this.
// If you are using the buildData function to get data, then ?
//
// 1. For smaller datasets, just import them like other files.
// import content from '../assets/data/content.json';
//
// 2. For larger data points, utilize window.fetch.
// let content = await (await window.fetch('../assets/data/content.json')).json();
//
// Once you have your data, use it like a Svelte component:
//
// const app = new Content({
//   target: document.querySelector('.article-lcd-body-content'),
//   data: {
//     content
//   }
// });

import * as d3 from 'd3';
import * as c3 from 'c3';
import grid from '../sources/grid.json';

const data = grid.grid;

const colorScale = d3.scaleLinear()
.domain([-1, -0.5, -0.25, 0, 0.25, 0.5, 1])
.range(['#822010', '#C2421F', '#F2AF80', '#aaaaaa', '#857AAA', '#61538F', '#271D42']);

$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null) {
        return results[1] || 0;
    } else {
        return null;
    }
}

var selected = $.urlParam('chart');

if (selected != null) {
    $(".slide").hide();
    $("#" + selected).show();
}
if (selected == "all") {

    $(".slide").show();
}

function buildGrid(category,parent,target,label,colorClass,symbol,change,xEnd,yMin,yLimit,yFormat,lines,yTick1,yTick2,yTick3,yTick4,yTick5,linecolor1,linecolor2,linecolor3,index) {
    $(parent).append('<div class="smallchart xwidth ' + category + ' ' + lines + '"><div class="label" subject="' + target + '" style="background-color:' + colorScale(change) + ';">' + label + '<div class="stat">' + symbol + '' + d3.format("+.0%")(change) + '</div></div><div class="chart" id="' + target + '"></div></div>');
}

function bigChart(category,parent,target,label,colorClass,symbol,change,xEnd,yMin,yLimit,yFormat,lines,yTick1,yTick2,yTick3,yTick4,yTick5,linecolor1,linecolor2,linecolor3,data) {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#bigchart",
        padding: padding,
        data: {
            x: 'x',
            columns: [
                ['x', 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
                data,
            ],
            type: 'line'
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == xEnd) { return 6;} else { return 3; } }
        },
        line: {
            connectNull: true
        },
        color: {
            pattern: [linecolor1,linecolor2,linecolor3]
        },
        axis: {
            y: {
                max: yLimit,
                min: yMin,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [yTick1,yTick2,yTick3,yTick4,yTick5],
                    format: d3.format(yFormat)
                }
            },
            x: {
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2003, 2011, 2018],
                    multiline: false,
                }
            }
        },
        grid: {
            focus:{
                show:false
              },
              y: {
                lines: [{
                    value: 0,
                    text: '',
                    position: 'start',
                    class: 'powerline1'
                },{
                  value: 0.5,
                  text: '',
                  position: 'start',
                  class: 'powerline2'
              }]
              }
            //   x: {
            //     lines: [{
            //         value: 2007,
            //         text: 'Great Recession begins',
            //         position: 'start'
            //     },{
            //       value: 2009,
            //       text: 'Great Recession ends',
            //       position: 'start'
            //   }]
            // }
          },
          regions: [
           {axis: 'x', start: 1999, end: 2003, class: 'ind'},
           {axis: 'x', start: 2003, end: 2011, class: 'gop'},
           {axis: 'x', start: 2007, end: 2009, class: 'rec'},
           {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
         ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip gray5">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

function smallChart(category,parent,target,label,colorClass,symbol,change,xEnd,yMin,yLimit,yFormat,lines,yTick1,yTick2,yTick3,yTick4,yTick5,linecolor1,linecolor2,linecolor3,data) {
    
    var padding = {
        top: 0,
        right: 10,
        bottom: 0,
        left: 0,
    };

    var chartTrend = c3.generate({
        bindto: "#" + target,
        padding: padding,
        data: {
            x: 'x',
            columns: [
                ['x', 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
                data,
            ],
            type: 'line'
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == xEnd) { return 2.5;} else { return 0; } }
        },
        line: {
            connectNull: true
        },
        color: {
            pattern: [linecolor1,linecolor2,linecolor3]
        },
        axis: {
            y: {
                show: false,
                max: yLimit,
                min: yMin,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [yTick1,yTick2,yTick3,yTick4,yTick5],
                    format: d3.format(yFormat)
                }
            },
            x: {
                show: false,
                padding: {
                    right: 0,
                    left: 0
                },
                tick: {
                    count: 4,
                    values: [1999, 2003, 2011, 2018],
                    multiline: false,
                }
            }
        },
        grid: {
            focus:{
                show:false
              },
              y: {
                lines: [{
                      value: 0,
                      text: '',
                      position: 'start',
                      class: 'powerline1'
                  },{
                    value: 0.5,
                    text: '',
                    position: 'start',
                    class: 'powerline2'
                }]

              }
          },
          regions: [
           {axis: 'x', start: 1999, end: 2003, class: 'ind'},
           {axis: 'x', start: 2003, end: 2011, class: 'gop'},
           {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
         ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip gray5">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

//populate tiny charts
for (var i=0; i < data.length; i++) {
    buildGrid(data[i].category,data[i].parent,data[i].target,data[i].label,data[i].colorClass,data[i].symbol,data[i].change,data[i].xEnd,data[i].yMin,data[i].yLimit,data[i].yFormat,data[i].lines,data[i].yTick1,data[i].yTick2,data[i].yTick3,data[i].yTick4,data[i].yTick5,data[i].linecolor1,data[i].linecolor2,data[i].linecolor3,null,data[i].index);
    smallChart(data[i].category,data[i].parent,data[i].target,data[i].label,data[i].colorClass,data[i].symbol,data[i].change,data[i].xEnd,data[i].yMin,data[i].yLimit,data[i].yFormat,data[i].lines,data[i].yTick1,data[i].yTick2,data[i].yTick3,data[i].yTick4,data[i].yTick5,data[i].linecolor1,data[i].linecolor2,data[i].linecolor3,['Rate', data[i].data1999,data[i].data2000,data[i].data2001,data[i].data2002,data[i].data2003,data[i].data2004,data[i].data2005,data[i].data2006,data[i].data2007,data[i].data2008,data[i].data2009,data[i].data2010,data[i].data2011,data[i].data2012,data[i].data2013,data[i].data2014,data[i].data2015,data[i].data2016,data[i].data2017,data[i].data2018],data[i].index);

    if (data[i].target == "budget") {
        bigChart(data[i].category,data[i].parent,data[i].target,data[i].label,data[i].colorClass,data[i].symbol,data[i].change,data[i].xEnd,data[i].yMin,data[i].yLimit,data[i].yFormat,data[i].lines,data[i].yTick1,data[i].yTick2,data[i].yTick3,data[i].yTick4,data[i].yTick5,data[i].linecolor1,data[i].linecolor2,data[i].linecolor3,['Rate', data[i].data1999,data[i].data2000,data[i].data2001,data[i].data2002,data[i].data2003,data[i].data2004,data[i].data2005,data[i].data2006,data[i].data2007,data[i].data2008,data[i].data2009,data[i].data2010,data[i].data2011,data[i].data2012,data[i].data2013,data[i].data2014,data[i].data2015,data[i].data2016,data[i].data2017,data[i].data2018],data[i].index);
    }
}

function loadBigChart(target) {
    for (var i=0; i < data.length; i++) {
        if (target == data[i].target) {
            bigChart(data[i].category,data[i].parent,data[i].target,data[i].label,data[i].colorClass,data[i].symbol,data[i].change,data[i].xEnd,data[i].yMin,data[i].yLimit,data[i].yFormat,data[i].lines,data[i].yTick1,data[i].yTick2,data[i].yTick3,data[i].yTick4,data[i].yTick5,data[i].linecolor1,data[i].linecolor2,data[i].linecolor3,['Rate', data[i].data1999,data[i].data2000,data[i].data2001,data[i].data2002,data[i].data2003,data[i].data2004,data[i].data2005,data[i].data2006,data[i].data2007,data[i].data2008,data[i].data2009,data[i].data2010,data[i].data2011,data[i].data2012,data[i].data2013,data[i].data2014,data[i].data2015,data[i].data2016,data[i].data2017,data[i].data2018],data[i].index);
            $("#loadTitle").html(data[i].title);
            $("#loadChatter").html(data[i].chatter);
            $("#loadSource").html(data[i].source);
            break;
        }
    }
}

//load into big chart
$('.label').on('click', function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#topper").offset().top
    }, 1500);

    loadBigChart($(this).attr("subject"));
});

$('#return').on('click', function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#topper").offset().top
    }, 1500);
});