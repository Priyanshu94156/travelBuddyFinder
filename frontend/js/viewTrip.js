import getUrl from './url.js'
const url = getUrl()
console.log(url)
window.onload =()=>{
    $.ajaxSetup({
        beforeSend: function(xhr){
            xhr.setRequestHeader('token', localStorage.getItem('token'));
        }
    });
    getUserDetails()
}

const data=window.location.hash.split('#')[1]
const postOwner=data.split('/')[0]
const user=postOwner


profileBtn.addEventListener('click',()=>{

let data=window.location.hash.split('#')[1]
let postOwner=data.split('/')[0]
let user=postOwner
    console.log("user",user)
    data={
        email:user,
        reqEmail:localStorage.getItem('email')
    }
    data=JSON.stringify(data)
    console.log("data",data)
    $.ajax({
                method:"POST",
                contentType:"application/json",
                data:data,
                url:"http://localhost:3003/user/reqPush",
                success:(e) =>{
                    alert("success",e)
                    console.log("nothing",e)
                    window.location.href="./viewProfile.html#"+postOwner
        
                },error:(e)=>{
                    alert(e)
                }
        
    })

})

chatBtn.addEventListener('click',()=>{
    
    window.location.href="./message.html#"+user
})


function getUserDetails(){
    
let data=window.location.hash.split('#')[1]
let postOwner=data.split('/')[0]
let name=data.split('/')[1]
let tripNam =decodeURIComponent(name)
// let tripNam = (data.split('/')[1]).replace("%20", " ");
console.log("THIS data",data)
console.log("THIS data",postOwner)
console.log("THIS trip Name",tripNam)

var tripName = $("#tripName");
var owner=$("#owner");
var description = $("#description");
var from = $("#from");
var to = $("#to");
var cost = $("#cost");
var startDate = $("#startDate");
var endDate = $("#endDate");
    data={
        owner:postOwner,
        tripName:tripNam
    }
    data = JSON.stringify(data)
    console.log(data)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:data,
        url:url+"/trip/getOne",
        success:(e) =>{
            console.log(e)
            console.log(e.tripName)
        tripName.html(e.tripName)
        owner.html(e.owner)
        description.html(e.description)
        from.html(e.from)
        to.html(e.to)
        cost.html(e.travellingCost)
        startDate.html((e.startDate).slice(0,10))
        endDate.html((e.endDate).slice(0,10))
        },error:(e)=>{
            alert(e)
        }
    })
}


const sendRequestBtn = document.querySelector('#send-request-btn');

sendRequestBtn.addEventListener('click', () => {
  const alertBox = document.createElement('div');
  alertBox.classList.add('alert-box');
  alertBox.innerHTML = `
    <h2>Send Request</h2>
    <label for="message">Message:</label>
    <input type="text" id="message" name="message" required>
    <button id="send-btn">Send</button>
  `;
  document.body.appendChild(alertBox);
  
  const sendBtn = alertBox.querySelector('#send-btn');
  const messageInput = alertBox.querySelector('#message');
  
  sendBtn.addEventListener('click', () => {
    let message = messageInput.value;
    // Send request logic here

let data=window.location.hash.split('#')[1]
let postOwner=data.split('/')[0]
let tripNam = (data.split('/')[1]).replace("%20", " ");

    data={
        owner:postOwner,
        tripName:tripNam,
        message:message,
        email:localStorage.getItem('email')
    }
    data=JSON.stringify(data)
    console.log(data)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:data,
        url:url+"/trip/tripRequest",
        success:(e) =>{
            console.log(e)
            alert(e+'Request sent: ' + message);
        },
        error:(e) =>{
            console.log(e)
            alert(e+"error")
        }
    })
    
    alertBox.remove();
  });
});
