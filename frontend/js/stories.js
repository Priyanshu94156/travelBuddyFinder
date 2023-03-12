$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'));
    }
});


getStories()


function getStories(){
    $.get("http://localhost:3003/stories/getAllStories",function(data,status){
        console.log(data)
        console.log(data[0].description)
        for(var i=0;i<data.length;i++){
            $("#displayTrips").append(`<div class="trip_card date row">
            <div class="col-sm-3 pr-0">
                <img src="../static/images/bg1.jpg" class="img-fluid">
            </div>
            <div class="col-sm-6">
            <b>${data[i].email}</b>
                <div class="trip_location">
                    <span class="tl">${data[i].from}</span>
                    <span class="trip_color"> -> </span>
                    <span class="tl">${data[i].to}</span>
                </div>
                <div class="trip_type">
                    <span>${data[i].description}</span>
                </div>
            </div>
            <div class="col-sm-3 ">
                <button class="btn btn primary" style="margin: 30px;">Images</button>
            </div>
        </div>
        `)
        }
    })
}