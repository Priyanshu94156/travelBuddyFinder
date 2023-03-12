// import { application, json } from 'express';
import getUrl from './url.js'
const url = getUrl()
console.log(url)
var userName = $("#user_name");
var userName1=$("#user_name1");
var userName2=$("#user_name2");
var userEmail=$("#email");
var usercity = $("#city");
var gender = $("#gender");
var height = $("#height");
var phno = $("#phno");
var nationality = $("#nationality");
var smoking = $("#smoking");
var drinking = $("#drinking");
var description = $("#description");
// var profile_image=$("#user_img");
var container=document.querySelector('#container')
var container_for_stories=document.querySelector('#stories_container')

var email = (window.localStorage.getItem('email'))
$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'));
    }
});

getUserDetails()
function getUserDetails(){
    $.get(url+"/abc/fetchUser/"+email,function(data,status){
        console.log(data)
        // profile_image.attr("src",data[0].img)
        userName1.html(data[0].name)
        userName2.html(data[0].name)

        userEmail.html(email)
        userName.html(data[0].name)
        usercity.html(data[0].city)
        gender.html(data[0].gender)
        height.html(data[0].height)
        phno.html(data[0].phno)
        // education.html(data[0].education)
        nationality.html(data[0].nationality)
        smoking.html(data[0].smoking)
        drinking.html(data[0].drinking)
        description.html(data[0].description)
        // birthday.html(data[0].birthday)
        barDisplay();
        $('#edit_profile_image').css({"display":"none"})
    })
    $.get(url+'/trip/fetchUserTrip/'+email,function(data){
        console.log("trip data reached"+data)
        container.innerHTML=``;
        for(var i =0;i<data.length;i++){
            var from=data[i].from;
            var to=data[i].to;
            var startDate=data[i].startDate;
            startDate=startDate.slice(0,10);
            var endDate=data[i].endDate;
            endDate=endDate.slice(0,10)
            var owner = data[i].owner;
            var id=data[i]._id
            let x=renderCard(id,from,to,startDate,endDate,owner);
            container.innerHTML+=x;
        }
    })
    $.get(url+'/stories/fetchUserStory/'+email,function(data){
        // console.log(data)
        container_for_stories.innerHTML=``;
        for(var i =0;i<data.length;i++){
            var from=data[i].from;
            // console.log(from+"from sjdnvsnj")
            var to=data[i].to;
            var description=data[i].description
            let render_card=renderStoryCard(from,to,description);
            container_for_stories.innerHTML+=render_card;
        }
    })
}
function renderCard(id,from, to, startDate,endDate,owner){
    return (`<div class="trip_card date row">
    <div class="col-sm-3 pr-0">
        <img src="../static/images/bg1.jpg" class="img-fluid">
    </div>
    <div class="col-sm-9">
        <div class="trip_location">
            <span class="tl">${from}</span>
            <span class="trip_color"> > </span>
            <span class="tl">${to}</span>
            <span class="trip_color">  </span>
        </div>
        <div class="trip_date">${startDate} - ${endDate}</div>
        <div class="trip_type"><span class="trip_color"></span> 
        </div>
    </div>
    </div>
</div>`)
}
function renderStoryCard(from,to,description){
    return(`<div class="trip_card date row">
    <div class="col-sm-3 pr-0">
        <img src="../static/images/bg1.jpg" class="img-fluid image-pop">
    </div>
    <div class="col-sm-9">
        <div class="blog_title">From ${from} to ${to}</div>
        <div class="blog_date"></div>
        <div class="blog_excerpt">${description}</div>
        <div class="blog_action d-flex align-items-center c2 fw500">

    </div>
    <button class="btn theme2-btn text-right" id="view_photos">View Full Story</button>

    </div>
</div>
`)
}

//edit to submit 
$("#edit").click(()=>{
    edit();
    barDisplay();
})

var flag_es=0;
//progress bar
function barDisplay(){
    var flag_p=0;
    var pbar=document.getElementById("bar")
    document.getElementById('user_name').innerHTML.length>0?flag_p+=1:''
    document.getElementById('email').innerHTML.length>0?flag_p+=1:''
    document.getElementById('city').innerHTML.length>0?flag_p+=1:''
    document.getElementById('height').innerHTML.length>0?flag_p+=1:''
    document.getElementById('nationality').innerHTML.length>0?flag_p+=1:''
    document.getElementById('gender').innerHTML.length>0?flag_p+=1:''
    document.getElementById('smoking').innerHTML.length>0?flag_p+=1:''
    document.getElementById('drinking').innerHTML.length>0?flag_p+=1:''
    pbar.style.width=(12.5*flag_p)+"%";
    document.getElementById("progresspercentage").innerHTML=(12.5*flag_p)+"%";
    console.log(flag_p);
}
function edit() {
    if(flag_es==0){
        var flag_p=0;
        $("#user_name").attr("contenteditable",true);
        // $("#email").attr("contenteditable",true);
        $("#city").attr("contenteditable",true);
        $("#gender").attr("contenteditable",true);
        $("#height").attr("contenteditable",true);
        $("#phno").attr("contenteditable",true);
        $("#nationality").attr("contenteditable",true);
        $("#smoking").attr("contenteditable",true);
        $("#drinking").attr("contenteditable",true);
        $("#description").attr("contenteditable",true);
        // $('#edit_profile_image').css({"display":"inline"})

        $("#edit").html("Save Changes");
        flag_es=1;
        
    }
    else{
        flag_p=0
        $("#user_name").attr("contenteditable",false);
        // $("#email").attr("contenteditable",true);
        $("#city").attr("contenteditable",false);
        $("#gender").attr("contenteditable",false);
        $("#height").attr("contenteditable",false);
        $("#phno").attr("contenteditable",false);
        $("#nationality").attr("contenteditable",false);
        $("#smoking").attr("contenteditable",false);
        $("#drinking").attr("contenteditable",false);
        $("#description").attr("contenteditable",false);
        // $('#edit_profile_image').css({"display":"none"})

        $("#edit").html("Edit");
        updateData();
        flag_es=0;
    }
    }

    // updating form data
    function updateData(){
    
        var data={
            // $img:$("#profile_image").path(),
            name:$("#user_name").text(),
            phno:$("#phno").text(),
            gender:$("#gender").text(),
            height:$("#height").text(),
            nationality:$("#nationality").text(),
            smoking:$("#smoking").text(),
            drinking:$("#drinking").text(),
            description:$("#description").text(),
            city:$("#city").text()
        }
        var url1 = url+"/user/userUpdate/"+localStorage.getItem("email")
        $.ajax(
            {
                type: "post",
                url: url1,
                contentType: "application/json",
                data: JSON.stringify(data),
                xhrFields: { withCredentials: false, },
                headers: {},
                success: function (data) {
                    console.log("Success");
                    console.log(data);
                    data = JSON.parse(data);
                    if(data.status=="success"){
                        
                     alert("user updated successfully")
                    }else{
                        alert("user not updated")
                    }
                    
                },
                error: function () {
                    console.log("Issue with server.");
                    alert("user not updated.");
                },
            }
        );
        barDisplay();
    }
  
dat={
email:localStorage.getItem('email')
}
var dat=JSON.stringify(dat)
console.log(dat)

$('#trip').click(()=>{
    console.log("click",dat)
    $.ajax({
        method:"POST",
        contentType:'application/json',
        data:dat,
        url:url+"/subscribe/subscriptionValid",
        success:(e)=>{
            console.log(e)
            if (e=="you have a subscription"){
                alert("You have a subscription",e)
                window.location.replace("trip.html")
            }else if(e=="you don't have a subscription plan"){
                alert("You don't have a subscription plan",e)
                window.location.replace("upgrade.html")
            }
        }
    })
})

function ss(){
        $.ajax({
        method:"POST",
        contentType:'application/json',
        data:dat,
        url:'http://localhost:3003/getReview',
        success:(e)=>{
            console.log(e)
            if(e.length>0){
            alert("plz review you journey",)
            }
            else{
                console.log('sdfs')
                alert("welcome back")
            }
        }
    })
}
