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

//ECONOMICS

//income chart
function chartIncome() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartIncome",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 69422,77440,73117,74635,70574,72986,68218,68508,68808,62687,64240,58951,63156,66098,67798,69696,71114,71728, 71920, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },

        axis: {
            // rotated: true,
            y: {
                max: 80000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 20000, 40000, 60000, 80000],
                    format: d3.format('$,')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind','label':'Ventura', 'vertical': false},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
        grid: {
            focus:{
                show:false
              },
            x: {
                lines: [
                    {value: '2007', text: 'Great Recession starts', position: 'start', class: 'grayline'},
                    {value: '2009', text: 'Great Recession ends', position: 'start', class: 'grayline'}
                ]
        }
    },
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      }
    });
}

chartIncome();

//unemployment chart
function chartHousing() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartHousing",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 0.22,0.22,0.26,0.26,0.27,0.29,0.31,0.33,0.33,0.34,0.33,0.33,0.33,0.30,0.28,0.28,0.27,0.26,0.24,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
        grid: {
            focus:{
                show:false
            },
            x: {
                lines: [
                    {value: '2007', text: 'Great Recession starts', position: 'end', class: 'grayline'},
                    {value: '2009', text: 'Great Recession ends', position: 'end', class: 'grayline'}
                ]
            }
     }
    });
}

chartHousing();

//unemployment chart
function chartUnemployment() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartUnemployment",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 2.9,3.4,4.4,4.4,4.9,4.3,4.1,4.3,4.7,6.7,7.7,7.1,5.9,5.4,4.7,3.8,3.7,3.9,3.3,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 10,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 2, 4, 6, 8, 10],
                    format: d3.format('.1f')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
        grid: {
            focus:{
                show:false
            },
        x: {
            lines: [
                {value: '2007', text: 'Great Recession starts', position: 'start', class: 'grayline'},
                {value: '2009', text: 'Great Recession ends', position: 'start', class: 'grayline'}
            ]
        }
     }
    });
}

chartUnemployment();

//jobs chart chart
function chartJobs() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartJobs",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 2621400, 2683100, 2687800, 2662900, 2658400, 2678900, 2720900, 2755900, 2768900, 2760400, 2652000, 2638000, 2685000, 2727400, 2775100, 2813500, 2855900, 2895600, 2932083, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 3000000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 1000000, 2000000, 3000000],
                    format: d3.format(',.0f')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
        grid: {
            focus:{
                show:false
            },
        x: {
            lines: [
                {value: '2007', text: 'Great Recession starts', position: 'start', class: 'grayline'},
                {value: '2009', text: 'Great Recession ends', position: 'start', class: 'grayline'}
            ]
        }
     }
    });
}

chartJobs();


//TAX/SPEND
//tax chart
function chartTaxes() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartTaxes",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 3056,3053,2971,2975,2921,3002,3003,3019,3062,2818,2745,2899,2980,3142,3222,null,null,null,null,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2013) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 4000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 1000, 2000, 3000, 4000],
                    format: d3.format('$,')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid: {
        focus:{
            show:false
        }
      }
    });
}

chartTaxes();


//budget chart
function chartBudget() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartBudget",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2015) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 50,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 25, 50],
                    format: d3.format(',.1')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid: {
            focus:{
                show:false
            }
      }
    });
}

chartBudget();

//HEALTHCARE
//health care costs chart
function chartHealthCare() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartHealthCare",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 0.08,null,0.061,null,null,0.077,null,null,0.072,null,null,0.09,null,null,0.09,null,0.043,null, 0.063, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
       line: {
             connectNull: true
         },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 0.10,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.02, 0.04, 0.06, 0.08, 0.10],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
        grid: {
            focus:{
                show:false
            },
        x: {
            lines: [
                {value: '2010', text: 'Affordable Care Act', position: 'start', class: 'grayline'}
            ]
        }
     }
    });
}

chartHealthCare();

//health insurance chart
function chartInsurance() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartInsurance",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Public', null,0.211,0.251,null,null,0.252,null,null,0.283,null,null,0.292,null,null,0.311,null,0.336,null,0.365,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
       line: {
             connectNull: true
         },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
        grid: {
            focus:{
                show:false
            },
        x: {
            lines: [
                {value: '2010', text: 'Affordable Care Act', position: 'start', class: 'grayline'}
            ]
        }
     }
    });
}

chartInsurance();

//health factors
function chartFactors() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartFactors = c3.generate({
        bindto: "#chartFactors",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ["Diabetes",0.056,0.061,0.065,0.065,0.071,0.07,0.073,0.075,0.08,0.083,0.083,0.087,0.095,0.097,0.097,0.1,0.099,0.105,null,null],
                ["Obesity",0.196,0.2,0.209,0.219,0.229,0.232,0.244,0.251,0.263,0.267,0.269,0.275,0.278,0.276,0.294,0.296,0.298,0.301,null,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
       line: {
             connectNull: true
         },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333',"#cccccc"]
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
        tooltip: {
            contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
              return '<div class="chart-tooltip"><div>' + d[0].x + '</div></div>' + '<div class="chart-tooltip gray3">' + '<span class="tooltip-label">' + d[1].id + ':</span>' +
                '<span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span>' +
                '</div><div class="chart-tooltip gray5">' +
                '<span class="tooltip-label">' + d[0].id + ':</span>' +
                '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
                '</div>';
            }
          },
        grid: {
            focus:{
                show:false
            },
        x: {
            lines: [
                {value: '2010', text: 'Affordable Care Act', position: 'start', class: 'grayline'}
            ]
        }
     }
    });
}

chartFactors();

//health spending
function chartMental() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartMental = c3.generate({
        bindto: "#chartMental",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Public',null,6.1,6.7,7,7.1,7.4,7.4,7.5,7.3,7.7,8,7.9,7.7,7.9,7.7,7.6,7,null,null,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
       line: {
             connectNull: true
         },
        point: {
            show: true,
            r: function(d) { if (d.x == 2015) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 20,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 5, 10, 15, 20],
                    format: d3.format(',.0')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
        grid: {
            focus:{
                show:false
            },
        x: {
            lines: [
                {value: '2010', text: 'Affordable Care Act', position: 'start', class: 'grayline'}
            ]
        }
     }
    });
}

chartMental();

//EDUCATION
//college tuition chart
function chartCollege() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartCollege",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 5992,6133,6778,7631,8559,9449,9880,10194,10360,10701,11545,12211,12430,12606,12424,12226,12704,12800, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 15000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 3000, 6000, 9000, 12000, 15000],
                    format: d3.format('$,')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid: {
           focus:{
                show:false
            }
      }
    });
}

chartCollege();

//college debt chart
function chartDebt() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartDebt",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
                ['Rate', 485000000,null,568000000,null,802000000,null,1022000000,null,1216000000,null,1740000000,null,1389000000,null,1592000000,null,1383000000,1363000000,null,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
       line: {
             connectNull: true
         },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 2000000000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 500000000, 1000000000, 1500000000, 2000000000],
                    format: d3.format('$.0s')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid: {
            focus:{
                show:false
            }
      }
    });
}

chartDebt();

//test scores chart
function chartTestScores() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartTestScores",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Math', null, 0.66,0.68,0.73,0.70,0.76,0.58,0.61,0.62,0.64,0.66,0.56,0.62,0.61,0.61,0.60,0.59,0.59, null, null],
                ['Reading', null, 0.71,0.71,0.75,0.74,0.79,0.72,0.68,0.71,0.72,0.72,0.75,0.76,0.58,0.59,0.59,0.60,0.60, null, null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333', '#cccccc']
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip"><div>' + d[0].x + '</div></div>' + '<div class="chart-tooltip gray3">' + '<span class="tooltip-label">' + d[1].id + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span>' +
            '</div><div class="chart-tooltip gray5">' +
            '<span class="tooltip-label">' + d[0].id + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid: {
            focus:{
                show:false
            }
      }
    });
}

chartTestScores();

//k-12 tuition chart
function chartEdSpend() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartEdSpend",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ["state",null,0.6,null,null,0.75,null,null,null,null,null,0.67,null,null,null,null,null,0.68,null,null,0.67],
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
        line: {
            connectNull: true
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2018) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid: {
           focus:{
                show:false
            }
      }
    });
}

chartEdSpend();

function chartGrad() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartEnroll = c3.generate({
        bindto: "#chartGrad",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ["enroll",0.795,0.787,0.789,0.786,0.787,0.7352,0.7478,0.7517,0.7483,0.7429,0.743,0.7549,0.7721,0.7787,0.7984,0.8117,0.821,0.825,0.827,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
        line: {
            connectNull: true
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid: {
           focus:{
                show:false
            }
      }
    });
}

chartGrad();

function chartEnroll() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartEnroll = c3.generate({
        bindto: "#chartEnroll",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ["enroll",null,0.026673861,0.028523582,0.030926179,0.033670003,0.037280747,0.04086409,0.042798733,0.046368956,0.050251821,0.053619434,0.062917197,0.070211797,0.074873773,0.079870331,0.082785353,0.084923851,0.087903732,0.089618191,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
        line: {
            connectNull: true
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid: {
           focus:{
                show:false
            }
      }
    });
}

chartEnroll();

//INFRASTRUCTURE
//congestion miles
function chartCommute() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartCommute",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Rate', 0.40,0.41,0.41,0.41,0.41,0.41,0.41,0.37,0.37,0.37,0.33,0.34,0.35,null,null,0.28,null,null,null,null]
            ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
       line: {
             connectNull: true
         },
        point: {
            show: true,
            r: function(d) { if (d.x == 2014) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333']
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid: {
            focus:{
                show:false
            }
      }
    });
}

chartCommute();

//pavement quality
function chartPavement() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartPavement",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Poor Condition', null,null,null,0.68,0.601666667,0.597333333,0.629666667,0.653666667,0.634,0.636,0.605,0.674,0.649666667,0.675666667,0.695666667,0.713333333,0.707333333,0.727666667,0.737333333,null]            
                ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
       line: {
             connectNull: true
         },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333','#CCCCCC']
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid:  {
           focus:{
                show:false
            }
      }
    });
}

chartPavement();


//bridge quality
function chartBridges() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartBridges",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Traffic', null,0.1,0.077,0.08,0.08,0.07,0.07,0.067,0.056,0.053,0.059,0.046,0.041,0.043,0.046,0.032,0.022,0.012,0,null]            
                ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
       line: {
             connectNull: true
         },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333','#CCCCCC']
        },
        axis: {
            // rotated: true,
            y: {
                max: 0.10,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.02, 0.04, 0.06, 0.08, 0.1],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid:  {
           focus:{
                show:false
            },
            x: {
                lines: [
                    {value: 2007, text: 'I-35W Bridge Collapse', position: 'start', class: 'grayline'}
                ]
        }
      }
    });
}

chartBridges();


//bridge quality
function chartInternet() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartTrend = c3.generate({
        bindto: "#chartInternet",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
                ['Access', null,null,null,null,null,null,null,null,null,null,null,null,0.6964,0.7056,0.8203,0.841,0.8583,0.8772,0.8794,null]            
                ],
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1')
                }
            }
        },
        legend: {
            show: false
        },
       line: {
             connectNull: true
         },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ['#333333','#CCCCCC']
        },
        axis: {
            // rotated: true,
            y: {
                max: 1,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 0.25, 0.50, 0.75, 1],
                    format: d3.format('.0%')
                }
            },
            x: {
                // type: 'timeseries',
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
         regions: [
          {axis: 'x', start: 1999, end: 2003, class: 'ind'},
          {axis: 'x', start: 2003, end: 2011, class: 'gop'},
          {axis: 'x', start: 2011, end: 2018, class: 'dfl'},
        ],
      tooltip: {
        contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
          return '<div class="chart-tooltip">' +
            '<span class="tooltip-label">' + d[0].x + ':</span>' +
            '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span>' +
            '</div>';
        }
      },
      grid:  {
           focus:{
                show:false
            }
      }
    });
}

chartInternet();

//statewide crime
function chartCrime() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartCrime = c3.generate({
        bindto: "#chartCrime",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
                ['Rate', 3627.005,3632.7,3584.058,3570.646,3439.754,3351.699,3410.34,3366.448,3256.584,3104.8,2894,2797,2757.4,2775.1,2668.9,2531.4,2466.2,2372.1,null,null],
            ],
            axes: {
                'Rate': 'y',
                'Overall': 'y2'
            },
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ["#333333"]
        },
        axis: {
            // rotated: true,
            y: {
                max: 4000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 1000, 2000, 3000, 4000],
                    format: d3.format(',.0f')
                }
            },
            x: {
                // type: 'timeseries',
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

chartCrime();

//minneapolis violent crime
function chartMPLS() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartMPLS = c3.generate({
        bindto: "#chartMPLS",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
                ['Rate', null,1173.755547,1082.244291,1097.98798,1201.689795,1261.767782,1437.152931,1671.520994,1458.945415,1253.168807,1116.653866,1063.051195,945.6703612,1036.365731,1021.105508,1008.81896,1084.803778,1104.650055,1077.504096,null],
            ],
            axes: {
                'Rate': 'y',
                'Overall': 'y2'
            },
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2017) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ["#333333"]
        },
        axis: {
            // rotated: true,
            y: {
                max: 2000,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 500, 1000, 1500, 2000],
                    format: d3.format(',.0f')
                }
            },
            x: {
                // type: 'timeseries',
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

chartMPLS();

//prison population
function chartPrison() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartPrison = c3.generate({
        bindto: "#chartPrison",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
                ['Rate', 122,124,126,132,141,165,166,173,172,178,177,184,178,175,176,179,182,191,null,null],
            ],
            axes: {
                'Rate': 'y'
            },
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2016) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ["#333333"]
        },
        axis: {
            // rotated: true,
            y: {
                max: 200,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 50, 100, 150, 200],
                    format: d3.format(',.0f')
                }
            },
            x: {
                // type: 'timeseries',
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

chartPrison();

//police shootings
function chartShot() {
    var padding = {
        top: 0,
        right: 40,
        bottom: 20,
        left: 60,
    };

    var chartShot = c3.generate({
        bindto: "#chartShot",
        padding: padding,
        data: {
            x: 'x',
            // xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x', 1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
                ['Rate', null,7,9,8,7,9,5,6,7,8,11,12,8,11,11,9,13,13,10,13],
            ],
            axes: {
                'Rate': 'y'
            },
            type: 'line',
            labels: {
                format: {
                    // 'Rate': d3.format(',.1f')
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: true,
            r: function(d) { if (d.x == 2018) { return 6;} else { return 2.5; } }
        },
        color: {
            pattern: ["#333333"]
        },
        axis: {
            // rotated: true,
            y: {
                max: 20,
                min: 0,
                padding: {
                    bottom: 0,
                    top: 0
                },
                tick: {
                    count: 6,
                    values: [0, 5, 10, 15, 20],
                    format: d3.format(',.0f')
                }
            },
            x: {
                // type: 'timeseries',
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

chartShot();

$(".topbar .gop").width($(".c3-region.gop:first rect").width());
$(".topbar .ind").width($(".c3-region.ind:first rect").width());
$(".topbar .dfl").width($(".c3-region.dfl:first rect").width());

// $( window ).resize(function() {
//     console.log($(".c3-region.ind:first rect").width());
//     console.log($(".c3-region.gop:first rect").width());
//     console.log($(".c3-region.dfl:first rect").width());
//     $(".topbar .gop").width($(".c3-region.gop:first rect").width());
//     $(".topbar .ind").width($(".c3-region.ind:first rect").width());
//     $(".topbar .dfl").width($(".c3-region.dfl:first rect").width());
// });