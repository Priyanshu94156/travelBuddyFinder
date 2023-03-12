const url = "http://localhost:3003";

//user profile cards


//trip cards


var startLoc = $('#search_startloc');
var endLoc = $('#search_endloc');
var fromDate = $('#fromDate');
var toDate = $('#toDate');
// console.log("rdcrdc",gender);
var preferences = ""
function toggleSel(curr, el, parent) {
    //  console.log(curr.html());
    preferences += curr.html();

    $(parent).find(el).removeClass('selected');
    curr.addClass('selected')
}
console.log("sdfg" + preferences)
window.onload =()=>{ 
$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'));
    }
});
}
$('#search_apply').on('click', function () {
    console.log("apply clicked")
    var from = startLoc.val();
    var to = endLoc.val();
    var startDate = fromDate.val();
    var endDate = toDate.val();
    console.log(startDate, endDate, from, to,preferences)
    applyFilter(startDate, endDate, from, to, preferences);
    // reset();
});
$('#search_reset').on('click', function (){
    reset();
    // console.log(startDate, endDate, from, to, preferences);
})
function reset(){
    startLoc.val("");
    endLoc.val("");
    fromDate.val("");
    toDate.val("");
    preferences = "";
}
function applyFilter(startDate, endDate, from, to, preferences) {
    
    
    $.get(url+"/trip/tripSearch?from="+from+"&to="+to+"&startDate="+startDate+"&endDate="+endDate,"&preferences="+preferences,function(data,status){
        console.log(data)
        container.innerHTML=``;
        $('#header').html("About"+data.length+" results found.")
        for(var i =0;i<data.length;i++){
            let container=document.querySelector('#container')
            var from=data[i].from;
            var to=data[i].to;
            var startDate=data[i].startDate;
            var endDate=data[i].endDate;
            var owner = data[i].owner;
            var id=data[i]._id
            let x=renderCard(id,from,to,startDate,endDate,owner);
            container.innerHTML+=x;
        }

    })


}
function renderCard(id,from, to, startDate,endDate,owner){
    return (`<div class="trip_card date row">
    <div class="col-sm-3 pr-0">
        <img src="../static/images/bg1.jpg" class="img-fluid">
    </div>
    <div class="col-sm-9">
        <div class="trip_location" >
        <a href="./tripinfo.html#${id}">
        <span class="tl">${from}</span>
        <span class="trip_color"> > </span>
        <span class="tl">${to}</span>
        <span class="trip_color"></span>
        </a>
        </div>
        <div class="trip_date">${startDate} - ${endDate}</div>
        <div class="trip_type"><span class="trip_color" id="ownerInfo">${owner}</span>'s Trip
             <span></span>
        </div>
    </div>
</div> `)
}


{/* <div class="trip_card date row">
    <div class="col-sm-3 pr-0">
        <img src="../static/images/bg1.jpg" class="img-fluid">
    </div>
    <div class="col-sm-9">
        <div class="trip_location">
            <span class="tl">London</span>
            <span class="trip_color"> > </span>
            <span class="tl">Paris</span>
            <span class="trip_color"> ! </span>
        </div>
        <div class="trip_date">11.07.2008 - 01.02-2008</div>
        <div class="trip_type"><span class="trip_color">Date Trip</span>
            <span>We'll split 50-50</span>
        </div>
    </div>
</div> */}