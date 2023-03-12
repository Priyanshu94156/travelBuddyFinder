// import getUrl from './url.js'
// const url = getUrl()23
dates = new Date()
let month = (dates.getMonth()+1).toString()
let year = (dates.getFullYear()).toString()
let day = (dates.getDate()).toString()
if (day < 10) {
    day = '0' + day;
 }
 
 if (month < 10) {
    month = '0' + month;
 } 
mindate = year+"-"+month+"-"+day
// console.log(mindate)
// console.log(day, " ", month, " ", year)
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
dates2 = (new Date()).addDays(30)
let month2 = (dates2.getMonth()+1).toString()
let year2 = (dates2.getFullYear()+1).toString()
let day2 = (dates2.getDate()).toString()
if (day2 < 10) {
    day2 = '0' + day2;
 }
 
 if (month2 < 10) {
    month2 = '0' + month2;
 } 
maxdate = year2+"-"+month2+"-"+day2
// console.log(maxdate)
document.getElementById('startDate').min = mindate
document.getElementById('startDate').max = maxdate
document.getElementById('endDate').max = maxdate
document.getElementById('endDate').min = mindate
function createTrip() {
    pics=document.getElementById('File')
    owner=window.localStorage.getItem('email'),
        tripName=$('#tripName').val(),
        description=$('#description').val(),
        from = $('#from').val(),
        to=$('#to').val(),
        startDate=$('#startDate').val(),
        endDate=$('#endDate').val(),
        flexible=$('#flexible').val(),
        preferences=$('#preferences').val(),
        keywords=$('#keywords').val(),
        travellingCost=$('#travellingCost').val()


        const date1 = new Date(startDate);
        const date2 = new Date(endDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        // console.log(diffTime + " milliseconds");
        // console.log(diffDays + " days");
    photos=[]
    console.log("simple")
    console.log(pics.files)
    $.ajaxSetup({
        beforeSend: function(xhr){
            xhr.setRequestHeader('token', localStorage.getItem('token'));
        }
    });
    // for(let i=0; i<pics.files.length; i++){
    //     console.log(pics.files[i])
    //     photos.push(pics.files[i])
    // }
    // console.log(photos)
    // let tripData = new FormData();
    // tripData.append("owner",owner);
    // tripData.append("description",description);
    // tripData.append("from",from);
    // tripData.append("to",to);
    // tripData.append("startDate",startDate);
    // tripData.append("endData",endDate);
    // tripData.append("flexible",flexible);
    // tripData.append("preferences",preferences);
    // tripData.append("keywords",keywords);
    // tripData.append("travellingCost",travellingCost);
    // tripData.append("photos",pics.files);
    
    


    let formdata = new FormData(document.querySelector("#myform"));
    formdata.set("owner", owner)
    formdata.set("tripName", tripName)
    formdata.set("description",description);
    formdata.set("from",from);
    formdata.set("to",to);
    formdata.set("startDate",startDate);
    formdata.set("endDate",endDate);
    formdata.set("flexible",flexible);
    formdata.set("preferences",preferences);
    // formdata.set("keywords",keywords);
    formdata.set("travellingCost",travellingCost);
    // formdata.set("photos",pics.files);

    // console.log("formdata: ",formdata);
    if(date1 < new Date()){ alert("Pick a valid start date")}
    else if(date2 > ((new Date()).addDays(365))) {alert("Max limit to set trip is 1 year")}
    else if(date1 > date2) {alert("start Date should be smaller than end date")}
    else if(diffDays > 30) {alert("long trips not allowed")}
    else{
            console.log("You are permitted to trip go enjoy")
    $.ajax({    
        method: "POST",
        contentType:false,
        processData : false,
        'data': formdata,
        'url': 'http://localhost:3003/trip/newTripSave',
        "success": (e) => { 
            console.log("sassssss", e)
            if(e == 'token not found'){alert("token not found")}
            else if(e == 'buy a subscription'){alert("buy a subscription")
             window.location.href = "../html/upgrade.html"}
            else if(e == 'Cant overlap 2 trips') alert("cant overlap 2 trips")
            else if(e == 'permission granted') {alert("successfully added")
            window.location.reload()} 
            else{ alert("error")}
    },
        error: (e) => { alert(e) }
    })

}
}


function createStory() {
    owner=window.localStorage.getItem('email'),
    photos=[]
    console.log("simple")
    $.ajaxSetup({
        beforeSend: function(xhr){
            xhr.setRequestHeader('token', localStorage.getItem('token'));
        }
    });  
    
    // for(let i=0; i<pics.files.length; i++){
    //     console.log(pics.files[i])
    //     photos.push(pics.files[i])
    // }
    // console.log(photos)

    let storyform = new FormData(document.querySelector("#storyform"));
    storyform.set("email", window.localStorage.getItem('email'))
    // formdata.set("description",description);
    // formdata.set("from",from);
    // formdata.set("to",to);
    // formdata.set("startDate",startDate);
    // formdata.set("endData",endDate);
    // formdata.set("flexible",flexible);
    // formdata.set("preferences",preferences);
    // // formdata.set("keywords",keywords);
    // formdata.set("travellingCost",travellingCost);
    // // formdata.set("photos",pics.files);

    console.log("formdata: ",storyform);
    
    

    $.ajax({    
        method: "POST",
        contentType:false,
        processData : false,
        'data': storyform,
        'url': 'http://localhost:3003/stories/newstorySave',
        "success": (e) => { 
            console.log(e)
            if(e == 'token not found'){alert("token not found")}
            else {alert("successfully added")
            window.location.reload()} 
    },
        error: (e) => { alert(e) }
    })

}