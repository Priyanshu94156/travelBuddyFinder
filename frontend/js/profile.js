// import { application, json } from 'express';
import getUrl from './url.js'
const url = getUrl()
console.log(url)
var userName = $("#user_name");
var userAddress = $("#user_location");
var gender = $("#gender");
var height = $("#height");
var ethinicity = $("#ethinicity");
var education = $("#education");
var religion = $("#religion");
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
        userName.html(data[0].name)
        userAddress.html(data[0].address)
        gender.html(data[0].gender)
        
    })
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
                window.location.replace("trip.html")
            }else if(e=="you don't have a subscription plan"){
                window.location.replace("upgrade.html")
            }
        }
    })
})