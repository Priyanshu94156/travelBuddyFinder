
import getUrl from './url.js';
const url=getUrl()
console.log(url)

// console.log(url1)
var email = (window.localStorage.getItem('email'))
$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'));
    }
});
var fromDisp=$('#from_disp');
var toDisp=$('#to_disp');
var email=$('#email');
var gender=$('#gender');
var trip_name=$('#trip_name');
var from_loc=$('#from_loc');
var to_loc=$('#to_loc');
var startDate=$('#startDate');
var endDate=$('#endDate');
var preferences=$('#preferences');
var trip_type=$('#keywords');
var travelCost =$('#travelCost')

var id = window.location.hash.substring(1);
// console.log(id) 
let url1 = "http://localhost:3003/trip/getTripDetails/" + id;
    
tripDetails()
function tripDetails(){
     $.get(url1, function(data,status){
          console.log(data)
          fromDisp.html(data[0].from)
          toDisp.html(data[0].to)
          email.html(data[0].owner)
          gender.html(data[0].gender)
          trip_name.html(data[0].tripName)
          from_loc.html(data[0].from)
          to_loc.html(data[0].to)
          startDate.html(data[0].startDate)
          endDate.html(data[0].endDate)
          preferences.html(data[0].preferences)
          trip_type.html(data[0].keywords)
          travelCost.html(data[0].travellingCost)
     })
}

$('#view_profile').on('click', function(){
     
})
