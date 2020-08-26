var chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,233,237)',
  white:'rgb(225,225,225)',
  black:'rgb(0,0,0,0.5)',

};


function draw1(Input){

    // console.log(40 rem); 

	config = {

	    type: 'line',
        data: {
            datasets: [{
                label: 'Real data',
                data: Input[0],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:1,
                pointBackgroundColor:chartColors.blue

            },
            {
                label: 'Prediction',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    chartColors.red,
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                    xAxes: [{

                        type:"time",
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        // unit : 'day',
                        // unitStepSize: 20,
                        displayFormats: {
                            'day': 'MMM D'
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:4,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,                              
                        },
                        gridLines: {
                            // display: false,
                            drawOnChartArea:false,
                            lineWidth:2,
                        },
                   }],
                    yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                        return value/1000 + 'K'
                        },
                        fontSize:10,                  
                    },
                    gridLines: {
                             // display: false
                            drawOnChartArea:false,
                            drawBorder:true,
                            zeroLineWidth:2,
                            },

                    }]
                },
                fill : false,
                title: {
                display: true,
                position:'top',
                text: 'Active Infections',
                fontSize: 18
            },
                legend:{
                    position:'top',
                    // fullWidth:true,
                    // usePointStyle:true,
                    display:true,
                    boxWidth:10,
                    labels:{
                        position:'top',
                        align:'start',
                        // podding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 20,
                top: 0,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }
	};

    var x = (document.getElementsByClassName("small-screen"));
    if(window.getComputedStyle(x[0],null).display !== "none"){

        
        if(window.chart7 != undefined){
            window.chart7.destroy();
        }
        window.chart7 = new Chart(ctx7,config);
    }
    else{

        if(window.chart1 != undefined){
            window.chart1.destroy();
        }
        window.chart1 = new Chart(ctx1,config);   
    }
}

function draw2(Input){

	    config = {

	    type: 'line',
        data: {
            datasets: [{
                label: 'Real data',
                data: Input[0],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:2,
                pointBackgroundColor:chartColors.blue

            },
            {
                label: 'Prediction',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    chartColors.red,
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                    xAxes: [{

                        type:"time",
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        // unit : 'day',
                        // unitStepSize: 20,
                        displayFormats: {
                            'day': 'MMM D'
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:4,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,                              
                        },
                        gridLines: {
                            // display: false,
                            drawOnChartArea:false,
                            lineWidth:2,
                        },
                   }],
                    yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                            if (value >= 0)
                                return value/1000 + 'K'
                            else
                                return 0 + 'L'
                        },
                        fontSize:10,
                        // suggestedMin: 0,                  
                    },
                    gridLines: {
                             // display: false
                            drawOnChartArea:false,
                            drawBorder:true,
                            zeroLineWidth:2,
                            },

                    }]
                },
                fill : false,
                title: {
                display: true,
                position:'top',
                text: 'Daily Infections',
                fontSize: 18
            },
                legend:{
                    position:'top',
                    // fullWidth:true,
                    // usePointStyle:true,
                    display:true,
                    boxWidth:10,
                    labels:{
                        position:'top',
                        align:'start',
                        // podding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 20,
                top: 0,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }
	};
   var x = (document.getElementsByClassName("small-screen"));
    if(window.getComputedStyle(x[0],null).display !== "none"){

        
        if(window.chart8 != undefined){
            window.chart8.destroy();
        }
        window.chart8 = new Chart(ctx8,config);
    }
    else{

        if(window.chart2 != undefined){
            window.chart2.destroy();
        }
        window.chart2 = new Chart(ctx2,config);   
    }
}

function draw3(Input){

	    config = {

	    type: 'line',
        data: {
            datasets: [{
                label: 'Real data',
                data: Input[0],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:2,
                pointBackgroundColor:chartColors.blue

            },
            {
                label: 'Prediction',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    chartColors.red,
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                    xAxes: [{

                        type:"time",
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        unit : 'month',
                        // unitStepSize: 20,
                        displayFormats: {
                            'day': 'MMM D'
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:4,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,                              
                        },
                        gridLines: {
                            // display: false,
                            drawOnChartArea:false,
                            lineWidth:2,
                        },
                   }],
                    yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                        return value/100000 + 'L'
                        },
                        fontSize:10,                  
                    },
                    gridLines: {
                             // display: false
                            drawOnChartArea:false,
                            drawBorder:true,
                            zeroLineWidth:2,
                            },

                    }]
                },
                fill : false,
                title: {
                display: true,
                position:'top',
                text: 'Total Infections',
                fontSize: 18
            },
                legend:{
                    position:'top',
                    // fullWidth:true,
                    // usePointStyle:true,
                    display:true,
                    boxWidth:10,
                    labels:{
                        position:'top',
                        align:'start',
                        // podding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 20,
                top: 0,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }
	};
    var x = (document.getElementsByClassName("small-screen"));
    if(window.getComputedStyle(x[0],null).display !== "none"){

        
        if(window.chart9 != undefined){
            window.chart9.destroy();
        }
        window.chart9 = new Chart(ctx9,config);
    }
    else{

        if(window.chart3 != undefined){
            window.chart3.destroy();
        }
        window.chart3 = new Chart(ctx3,config);   
    }
}

function draw4(Input){

	    config = {

	    type: 'line',
        data: {
            datasets: [{
                label: 'Real data',
                data: Input[0],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:2,
                pointBackgroundColor:chartColors.blue

            },
            {
                label: 'Prediction',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    chartColors.red,
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
        options: {
            responsive:true,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                    xAxes: [{

                        type:"time",
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        // unit : 'day',
                        // unitStepSize: 20,
                        displayFormats: {
                            'day': 'MMM D'
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:4,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,                              
                        },
                        gridLines: {
                            // display: false,
                            drawOnChartArea:false,
                            lineWidth:2,
                        },
                   }],
                    yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                        return value/1000 + 'K'
                        },
                        fontSize:10,                  
                    },
                    gridLines: {
                             // display: false
                            drawOnChartArea:false,
                            drawBorder:true,
                            zeroLineWidth:2,
                            },

                    }]
                },
                fill : false,
                title: {
                display: true,
                position:'top',
                text: 'Daily Deaths',
                fontSize: 18
            },
                legend:{
                    position:'top',
                    // fullWidth:true,
                    // usePointStyle:true,
                    display:true,
                    boxWidth:10,
                    labels:{
                        position:'top',
                        align:'start',
                        // podding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 20,
                top: 0,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }
	};
    var x = (document.getElementsByClassName("small-screen"));
    if(window.getComputedStyle(x[0],null).display !== "none"){

        
        if(window.chart10 != undefined){
            window.chart10.destroy();
        }
        window.chart10 = new Chart(ctx10,config);
    }
    else{

        if(window.chart4 != undefined){
            window.chart4.destroy();
        }
        window.chart4 = new Chart(ctx4,config);   
    }
}

function draw5(Input){

	    config ={

	    type: 'line',
        data: {
            datasets: [{
                label: 'Real data',
                data: Input[0],
                borderColor: [
                    chartColors.blue,
                ],
                showLine:false,
                borderWidth: 2,
                fill:false,
                pointRadius:2,
                pointBackgroundColor:chartColors.blue

            },
            {
                label: 'Prediction',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    chartColors.red,
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
        exportEnabled: true,

        options: {
            responsive:true,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                    xAxes: [{

                        type:"time",
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        // unit : 'day',
                        // unitStepSize: 20,
                        displayFormats: {
                            'day': 'MMM D'
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:4,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,                              
                        },
                        gridLines: {
                            // display: false,
                            drawOnChartArea:false,
                            lineWidth:2,
                        },
                   }],
                    yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                        return value/1000 + 'K'
                        },
                        fontSize:10,                  
                    },
                    gridLines: {
                             // display: false
                            drawOnChartArea:false,
                            drawBorder:true,
                            zeroLineWidth:2,
                            },

                    }]
                },
                fill : false,
                title: {
                display: true,
                position:'top',
                text: 'Total Deaths',
                fontSize: 18
            },
                legend:{
                    position:'top',
                    // fullWidth:true,
                    // usePointStyle:true,
                    display:true,
                    boxWidth:10,
                    labels:{
                        position:'top',
                        align:'start',
                        // podding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 20,
                top: 0,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }
	};
    var x = (document.getElementsByClassName("small-screen"));
    if(window.getComputedStyle(x[0],null).display !== "none"){

        
        if(window.chart11 != undefined){
            window.chart11.destroy();
        }
        window.chart11 = new Chart(ctx11,config);
    }
    else{

        if(window.chart5 != undefined){
            window.chart5.destroy();
        }
        window.chart5 = new Chart(ctx5,config);   
    }
}


function draw6(Input){

	    config = {
        type: 'line',
        data: {
            datasets: [{
                label: 'I',
                data: Input[0],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            },
            {
                label: 'A+I',
                data: Input[1],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    'rgba(0,225,0,0.8)',
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            },
            {
                label: '(A+I)c',
                data: Input[2],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    'rgba(0,0,225,0.5)',
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            },
            {
                label: 'Ic',
                data: Input[3],
                backgroundColor: [
                    'rgba(255,0,0,0.5)',
                ],
                borderColor: [
                    'rgba(0,0,0,0.5)',
                ],
                borderWidth: 2,
                fill:false,
                pointRadius:0

            }]
        },
                options: {
            responsive:true,
            maintainAspectRatio: false,
            aspectRatio:2,
            scales: {
                    xAxes: [{

                        type:"time",
                        // distribution: "series",
                        time: {
                        // parser: 'YYYY-MM-DD',
                        // unit : 'day',
                        // unitStepSize: 20,
                        displayFormats: {
                            'day': 'MMM D'
                            },
                        },
                        ticks: {
                            beginAtZero: false,
                            maxTicksLimit:4,
                            fontSize:10,
                            fontStyle:'normal',
                            maxRotation:0,                              
                        },
                        gridLines: {
                            // display: false,
                            drawOnChartArea:false,
                            lineWidth:2,
                        },
                   }],
                    yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        maxTicksLimit:4,
                        callback: function(value, index, values) {
                        return value/100000 + 'L'
                        },
                        fontSize:10,                  
                    },
                    gridLines: {
                             // display: false
                            drawOnChartArea:false,
                            drawBorder:true,
                            zeroLineWidth:2,
                            },

                    }]
                },
                fill : false,
                title: {
                display: true,
                position:'top',
                text: 'Asymptomatic Infections',
                fontSize: 18
            },
                legend:{
                    position:'top',
                    // fullWidth:true,
                    // usePointStyle:true,
                    display:true,
                    boxWidth:10,
                    labels:{
                        position:'top',
                        align:'start',
                        // podding:20,
                    }
                },
                 layout: {
                padding: {
                left: 0,
                right: 20,
                top: 0,
                bottom: 0
            }
            },
            // events:['hover','tooltips'],
            tooltips: {enabled: true},
            hover: {mode: null}
        }        
            
    };
    var x = (document.getElementsByClassName("small-screen"));
    if(window.getComputedStyle(x[0],null).display !== "none"){

        
        if(window.chart12 != undefined){
            window.chart12.destroy();
        }
        window.chart12 = new Chart(ctx12,config);
    }
    else{

        if(window.chart6 != undefined){
            window.chart6.destroy();
        }
        window.chart6 = new Chart(ctx6,config);   
    }
}