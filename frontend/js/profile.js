// import { application, json } from 'express';
import getUrl from './url.js'
const url = getUrl()
console.log(url)
var userName = $("#user_name");
var userName1=$("#user_name1");
var userEmail=$("#email");
var usercity = $("#city");
var gender = $("#gender");
var height = $("#height");
var phno = $("#phno");
var education = $("#education");
var nationality = $("#nationality");
var smoking = $("#smoking");
var drinking = $("#drinking");
var description = $("#description");
var birthday = $("#birthday");

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
        userName1.html(data[0].name)
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
    })
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
        $("#edit").html("Edit");
        updateData();
        flag_es=0;
    }
    }

    // updating form data
    function updateData(){
    
        var data={
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