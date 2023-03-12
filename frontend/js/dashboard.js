// const { getAllTrips } = require("../../backend/mvc/controllers/trips/tripsController");
$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'));
    }
});
getTrips()

function getTrips(){
    $.get("http://localhost:3003/trip/getAllTrips",function(data,status){
        console.log("this",data[9].photos[0])
        console.log(data[0].tripName)
        for(var i=0;i<data.length;i++){
            console.log('abc',data[i].owner)
            $("#displayTrips").append(`<div class="trip_card date row">
            <div class="col-sm-3 pr-0">
                <img src="${data[i].photos[0]}" class="img-fluid">
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
                <button class="btn btn primary" style="margin;" name="${data[i].tripName}" id="${data[i].owner}"  >view Details</button>

                
            </div>  
        </div>
        `)
        }
        const list = document.getElementById("displayTrips")
        list.addEventListener("click",(e)=>{
             if(e.target.nodeName == "BUTTON"){
                user= e.target.id
                tripN = e.target.name
                console.log(user)
                console.log(tripN)
                window.location.href="./viewTrip.html#"+user+"/"+tripN
            }
        })

    })
}

function reqUser(user){
    console.log(user)
    data={
        email:user,
        reqEmail:localStorage.getItem('email')
    }
    console.log("data",data)
    data=JSON.stringify(data)
    $.ajax({
                method:"POST",
                contentType:"application/json",
                data:data,
                url:"http://localhost:3003/user/reqPush",
                success:(e) =>{
                    alert(e)
                    console.log("nothing",e)

        
                },error:(e)=>{
                    alert(e)
                }
        
    })
}


// if (e.target.nodeName == "BUTTON" && e.target.name == "join"){
//     console.log(e.target.id)
//     user= e.target.id
//     data={
//         email:user,
//         reqEmail:localStorage.getItem('email')
//     }
//     console.log("data",data)
//     data=JSON.stringify(data)
//     $.ajax({
//                 method:"POST",
//                 contentType:"application/json",
//                 data:data,
//                 url:"http://localhost:3003/user/reqPush",
//                 success:(e) =>{
//                     alert("success",e)
//                     console.log("nothing",e)
        
//                 },error:(e)=>{
//                     alert(e)
//                 }
        
//     })
//     console.log("Now",user)
//     window.location.href="./message.html#"+user
// }
// else