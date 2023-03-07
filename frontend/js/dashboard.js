// const { getAllTrips } = require("../../backend/mvc/controllers/trips/tripsController");
$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'));
    }
});
getTrips()

function getTrips(){
    $.get("http://localhost:3003/trip/getAllTrips",function(data,status){
        console.log(data)
        console.log(data[0].tripName)
        for(var i=0;i<data.length;i++){
            $("#displayTrips").append(`<div class="trip_card date row">
            <div class="col-sm-3 pr-0">
                <img src="../static/images/bg1.jpg" class="img-fluid">
            </div>
            <div class="col-sm-6">
            <b>${data[i].tripName}</b>
                <div class="trip_location">
                    <span class="tl">${data[i].from}</span>
                    <span class="trip_color"> -> </span>
                    <span class="tl">${data[i].to}</span>
                    <span class="trip_color"> ! </span>
                </div>
                <div class="trip_date">${data[i].startDate} - ${data[i].endDate}</div>
                <div class="trip_type"><span class="trip_color">${data[i].preferences}</span> 
                    <span>${data[i].travellingCost}</span>
                </div>
            </div>
            <div class="col-sm-3 ">
                <button class="btn btn primary" style="margin: 30px;">ask to join</button>
            </div>
        </div>
        `)
        }
    })
}