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
var nationality = $("#nationality");
var smoking = $("#smoking");
var drinking = $("#drinking");
var description = $("#description");
var birthday = $("#birthday");

let owner=window.location.hash.split('#')[1]
console.log("THIS",owner)

getUserDetails()
function getUserDetails(){
    $.ajaxSetup({
        beforeSend: function(xhr){
            xhr.setRequestHeader('token', localStorage.getItem('token'));
        }
    });
    $.get(url+"/abc/fetchUser/"+owner,function(data,status){
        console.log(data)
        userName1.html(data[0].name)
        userEmail.html(data[0].email)
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
        for(var i=0; i<data[0].reviews.length; i++){
        document.querySelector('#yoyo').innerHTML+= `<div class="trip_card date row">
        <div class="col-sm-3 pr-0">
            <img src="../static/images/bg1.jpg" class="img-fluid">
        </div>
        <div class="col-sm-9">
            <div class="trip_location">
                <span class="tl">${data[0].reviews[i].tripName}</span>
            </div>
            <div class="trip_date">Review by ${data[0].reviews[i].senderEmail}</div>
            <div class="trip_type"><span class="trip_color">${data[0].reviews[i].review}</span> 
            </div>
        </div>
    </div>`
        }
    })
}