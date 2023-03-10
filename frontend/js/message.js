const chat = document.getElementById('chats')
const msgArea = document.querySelector('#messageArea')
let owner=window.location.hash.split('#')[1]
console.log("THIS",owner)

window.onload =() =>{

$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'))
    }
});
data={
    email:localStorage.getItem('email')
}

    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify(data),
        url:"http://localhost:3003/user/getVisitors",
        success:(e)=>{
            console.log(e)
            ShowUsers(e)
        }
    })
    console.log(obj.roomname)
    // var value = JSON.stringify(obj.roomname)

    let value = {
        chatRoom : obj.roomname 
    }

    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:JSON.stringify(value),
        url:"http://localhost:3003/chats/getChats",
        success:(e)=>{
            console.log("thissssss",e)
            showHead(e)
            showPrevChats(e.chats)
            
        },error:(e)=>{
            console.log(e)
        }

    })
    
}
// getUserChats()
const socket = io('http://localhost:3003');


var obj = {
    name:localStorage.getItem('email'),
    email:localStorage.getItem('email'),
    time:"10.45am",
    roomname:localStorage.getItem('email')+'$'+owner
}
if(localStorage.getItem('email')>owner){
    obj.roomname=owner+"$"+localStorage.getItem('email');
}
socket.emit("joinchat",obj)
socket.on('message',msgD=>{
    console.log(msgD)
    showMessage(msgD.message)
    msgArea.scrollTop = msgArea.scrollHeight
})

chat.addEventListener('submit',e=>{
    e.preventDefault();            
    const msg = $('#msg').val();   //getting value
    const email = localStorage.getItem('email')
    var msgD = {
        chatRoom:obj.roomname,
        message:{
        msg:msg,
        email:email,
        time:"12:45am",
        }
    
    }
    console.log("this is print",msgD)
    socket.emit('chatMessage',msgD)  //sending msg to server
    msgD = JSON.stringify(msgD)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:msgD,
        url:"http://localhost:3003/chats/pushMessage",
        success:(e) =>{
            console.log(e)
            console.log(msgD)
        },error:(e)=>{
            alert(e)
        }

    })
    e.target.elements.msg.value = ' '
})

function ShowUsers(data){
    console.log(data)
    for(i=0;i<data.length;i++){
    
    document.querySelector('#messages').innerHTML+=`<div class="date mesListCard read" >
    <div class="trip_location text-ellipsis btn-btn-secondary">
       <b><a href="#example" onclick="location.href=location.href.split('#')[0]+'#${data[i]}'; location.reload();">${data[i]}</a></b>
        <span class="trip_color"></span>
    </div>`
}
const targ = document.getElementById('#messages')
targ.addEventListener('click',(e)=>{
    if(e.target.nodeName=='A' && e.target.name==mess){
        owner=e.target.id
        console.log(owner)
        window.location.href='message.html#'+owner
        window.location.reload()
    }
})
}






function showHead(data){
    document.querySelector('#head').innerHTML=`<div class="col-sm-8 rightContentArea date">
    <header>
        <div class="trip_location text-ellipsis">
            <span class="tl">${data.persons}</span>
            <span class="tl"></span>
            <span class="trip_color"></span>
        </div>`
}


function showPrevChats(message){
    
    for (i=0;i<message.length;i++){
        console.log(message[i].sender)
        if(message[i].sender==localStorage.getItem('email')){
            document.querySelector('#messageArea').innerHTML+=`<div class="rightCard">
            <div class="msgBox">
            <div><span class="userName">${message[i].sender}</span><span class="olIndicator online"></span></div>
                                                
                <div class="msg">${message[i].message}</div>
            </div>
        </div>`
        }
        else{
            document.querySelector('#messageArea').innerHTML+=`<div class="leftCard">
    <div class="msgBox">
    <div><span class="userName">${message[i].sender}</span><span class="olIndicator online"></span></div>
										
        <div class="msg">${message[i].message}</div>
    </div>
</div>`
        }
    }

}




function showMessage(message){
    if (message.email==localStorage.getItem('email')){
        console.log("must",message)
    document.querySelector('#messageArea').innerHTML+=`<div class="rightCard">
    <div class="msgBox">
    <div><span class="userName">${message.email}</span><span class="olIndicator online"></span></div>
										
        <div class="msg">${message.msg}</div>
    </div>
</div>`
} else{
    console.log("else",message)
    document.querySelector('#messageArea').innerHTML+=`<div class="leftCard">
    <div class="msgBox">
    <div><span class="userName">${message.email}</span><span class="olIndicator online"></span></div>
										
        <div class="msg">${message.msg}</div>
    </div>
</div>`
}
}




// function getUserChats(){

//     $.ajax({
//         method:"POST",
//         contentType:"application/json",
//         data:msgD,
//         url:"http://localhost:3003/chats/getUserChats",
//         success:(e) =>{

//             console.log("",e)

//         },error:(e)=>{
//             alert(e)
//         }

//     })


    // $.post("http://localhost:3003/chats/getUserChats",function(data,status){
    //     console.log("Users",data)
    //     // console.log(data[0].tripName)
    //     k=localStorage.getItem('email')

    //     for(var i=0;i<data.length;i++){

    //         console.log('abc',data[i].persons)
    //         myArray=(data[i].persons).split("$")
    //         console.log(myArray)
    //     }
    // })
// }