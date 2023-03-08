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

getUserDetails()
function getUserDetails(){
    $.ajaxSetup({
        beforeSend: function(xhr){
            xhr.setRequestHeader('token', localStorage.getItem('token'));
        }
    });
    $.get(url+"/abc/fetchUser/p@gmail.com",function(data,status){
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