$(document).ready(function(){
    $.ajax({
        url : "https://stark-badlands-78659.herokuapp.com/completed",
        type : "GET",
        success : function(data){
            console.log(data);
            // empty array to hold all the dates tasks were completed
            var dates = [];
            
            // goes through all completed tasks
            for(var i in data) {
                // checks if date is already in dates array
                if (!dates.includes(data[i].date)) {
                    // makes sure that date is a real date and not an empty value
                    if(data[i].date != null) {
                        // date is added to array
                        dates.push(data[i].date);
                        console.log("date pushed");
                    } else {
                        console.log("date is null");
                    };
                };
            };
            
            var createTableData = function() {
                console.log(data);
                for (var z in data) {
                    var newTr = $("<tr>");
                    newTr.append("<td>" + data[z].date + "</td>");
                    newTr.append("<td>" + data[z].text + "</td>");
                    $("#tasksDoneTable").append(newTr);
                }
            };
            
            createTableData();
            
            // create task counter variable to hold total completed tasks for each day
            var taskCounter = 0;
            // create array to hold the info for what task was completed
            var tasks_completed = [];
            // create array to hold objects for each day (date, all tasks completed, total number of tasks)
            var dateLog = [];
            
            // loops through all the dates in the dates array
            for (var x in dates) {
                // resets counter for each date in the array
                taskCounter = 0;
                // loops through all the data
                for (var y in data) {
                    // if the specific date equals the date in the data loop, adds to tasks_completed and adds to the taskCounter
                    if (dates[x] == data[y].date) {
                        tasks_completed.push(data[y].text);
                        taskCounter++;
                    };
                };
                
                // object to hold all the info for a day that is pushed into the dateLog array
                var newDate = {
                    date: dates[x],
                    tasks_completed: tasks_completed,
                    totalCounter: taskCounter
                };
                dateLog.push(newDate);
            };
            
            console.log("tasks_completed array: " + tasks_completed);
            console.log("taskCounter: " + taskCounter); 
            console.log("dateLog array: " + dateLog);
            
            // an array to hold all the counters so the chart can graph
            var chartData = [];
            var data;
            // for loop through each object in the date log that adds the date's totalCounter to the chartData array
            for (var i=0; i<dateLog.length; i++) {
                data = dateLog[i].totalCounter;
                chartData.push(data);
            };
            console.log("chartData array: " + chartData);
            
            
            // chart creation
            // grabs canvas ID off the index.handlebars page
            var ctx = $("#mycanvas");
            var LineGraph = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: "Number of Tasks Completed",
                        data: chartData,
                        backgroundColor: "rgba(162,196,201)",
                        borderColor: "rgba(0,0,0)"
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        },
        error : function(data) {
            
        }
    });
    
});
