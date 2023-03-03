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
getUserDetails()
function getUserDetails(){
    $.get(url+"/user/fetchUser/"+email,function(data,status){
        console.log(data)
        userName.html(data[0].name)
        userAddress.html(data[0].address)
        gender.html(data[0].gender)
        
    })
}