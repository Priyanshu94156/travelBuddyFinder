const url = "http://localhost:3003";

//user profile cards


//trip cards


var startLoc = $('#search_startloc');
var endLoc = $('#search_endloc');
var fromDate = $('#fromDate');
var toDate = $('#toDate');
// console.log("rdcrdc",gender);
var gender = ""
function toggleSel(curr, el, parent) {
    //  console.log(curr.html());
    gender += curr.html();

    $(parent).find(el).removeClass('selected');
    curr.addClass('selected')
}
console.log("sdfg" + gender)
$('#search_apply').on('click', function () {
    console.log("clicked")
    var from = startLoc.val();
    var to = endLoc.val();
    var startDate = fromDate.val();
    var endDate = toDate.val();
    console.log(startDate, endDate, from, to, gender)
    applyFilter(startDate, endDate, from, to, gender);
});
function applyFilter(startDate, endDate, from, to, gender) {
    
    // if (gender=="any"){ gender="";}
    // else{ gender=gender}
    // console.log(gender)
    $.get(url+"/trip/tripSearch?from="+from+"&to="+to+"&startDate="+startDate+"&endDate="+endDate,"&preferences="+gender,function(data,status){
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
            let x=renderCard(from,to,startDate,endDate,owner);
            container.innerHTML+=x;
        }

    })


}
function renderCard(from, to, startDate,endDate,owner){
    return (`<div class="trip_card date row">
    <div class="col-sm-3 pr-0">
        <img src="../static/images/bg1.jpg" class="img-fluid">
    </div>
    <div class="col-sm-9">
        <div class="trip_location">
            <span class="tl">${from}</span>
            <span class="trip_color"> > </span>
            <span class="tl">${to}</span>
            <span class="trip_color"></span>
        </div>
        <div class="trip_date">${startDate} - ${endDate}</div>
        <div class="trip_type"><span class="trip_color">${owner}'s Trip</span>
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