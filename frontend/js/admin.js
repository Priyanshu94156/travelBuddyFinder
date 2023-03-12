//JWT
$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader('token', localStorage.getItem('token'));
    }
});
var url_attach="http://localhost:3003";
//donut chart
document.addEventListener("DOMContentLoaded", () => {
    var url = url_attach+"/trip/getChart";
    $.get(url, (data) => {
        var count_silver = 0;
        var count_gold = 0;
        var count_platinum = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].value == 2) {
                count_silver++;
            }
            else if (data[i].value == 5) {
                count_gold++;
            }
            else {
                count_platinum++;
            }
        }

        echarts.init(document.querySelector("#trafficChart")).setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '10%',
                left: 'center'
            },
            series: [{
                name: 'User count',
                type: 'pie',
                radius: ['30%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '22',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [{
                    value: count_silver,
                    name: 'Silver'
                },
                {
                    value: count_gold,
                    name: 'Gold'
                },
                {
                    value: count_platinum,
                    name: 'Platinum'
                }

                ]
            }]
        });
    });
})
//Graph
document.addEventListener("DOMContentLoaded", () => {
    var url = url_attach+"/trip/getGraph";
    $.get(url, (data) => {
        console.log(data)
    var count_of_past_trips=0;
    var count_of_active_trips=0;
    var count_of_upcomming_trips=0;
    var current_date=new Date().toISOString();
    for(var i=0;i<data.length;i++){
    var start_date=data[i].startDate;
    var end_date=data[i].endDate;
    if(start_date<=current_date && end_date>=current_date){
        count_of_active_trips++;
    }
    else if(start_date<current_date && end_date<current_date){
        count_of_past_trips++;
    }
    else if(start_date>current_date && end_date>current_date){
        count_of_upcomming_trips++
    }
    }
    new ApexCharts(document.querySelector("#columnChart"), {
        series: [{
            data: [count_of_past_trips, count_of_active_trips, count_of_upcomming_trips]
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '45%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Previous', 'Active', 'Upcoming'],
        },
        yaxis: {
            title: {
                text: 'no. of users'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return  val + " users"
                }
            }
        }
    }).render();
});
});
//DataTables 
getUsersData();
getTripsData()
function getUsersData() {
    console.log("reached getUserData")
    var url = url_attach+"/user/userCount";
    $.get(url, (data) => {
        response = JSON.parse(data);
        $("#userCount").html(`${response}`);
    })
    $(document).ready(function () {
        $.get('http://localhost:3003/user/fetchAllUsers', (data) => {
            console.log("fetchAllUsers");
            console.log(data);
        })
        $("#usersTable").DataTable({
            serverside: true,
            processing: true,
            ajax: {
                url: 'http://localhost:3003/user/fetchAllUsers',
                dataSrc: '',
            },
            columns: [
                { data: 'email' },
                { data: 'name' },
                { data: 'age' },
                { data: 'gender' },
            ]
        })
    });
}

function getTripsData() {
    console.log("reached trip")
    var url = url_attach+"/trip/count";
    $.get(url, (data1) => {
        $("#tripsCount").html(`${data1}`);
    })
    $(document).ready(function () {
        $.get('http://localhost:3003/trip/fetchAllTrips', (data) => {
            console.log("trips");
            console.log(data);

        })

        $("#tripsTable").DataTable({
            serverside: true,
            processing: true,
            ajax: {
                url: 'http://localhost:3003/trip/fetchAllTrips',
                dataSrc: '',
            },

            columns: [
                { data: 'owner' },
                { data: 'tripName' },
                { data: 'from' },
                { data: 'to' },
                { data: 'startDate' },
                { data: 'endDate' },
                { data: 'travellingCost' },
            ]
        })
    });
}
