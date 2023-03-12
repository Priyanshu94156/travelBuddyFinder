// import getUrl from './url.js'
// const url = getUrl()
// console.log(url)
window.onload= () =>{
$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'));
        console.log(localStorage.getItem('token'));
    }
});
}

$("#silver").click(()=>{
    email=localStorage.getItem("email"),
    currentSubscription=2
    suscription={
        email:email,
        currentSubscription:currentSubscription
    }
    suscription=JSON.stringify(suscription)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:suscription,
        url:"http://localhost:3003/subscribe/getSubscription",
        success:(e)=>{
            console.log(e)
            if(e == "token not found") alert("token not found")
            else
            alert("you are subscribed to silver edition")
            window.location.replace("trip.html")
        },
        error:(e)=>{
            alert(e)
            
        }
    })
})

$("#gold").click(()=>{
  
    email=localStorage.getItem("email"),
    currentSubscription=5
    suscription={
        email:email,
        currentSubscription:currentSubscription
    }
    suscription=JSON.stringify(suscription)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:suscription,
        url:"http://localhost:3003/subscribe/getSubscription",
        success:(e)=>{
            console.log(e)
            if(e == "token not found") alert("token not found")
            else
            alert("you are subscribed to gold edition")
            window.location.replace("trip.html")
        },
        error:(e)=>{
            alert(e)
            
        }
    })
})

$("#platinum").click(()=>{
  
    email=localStorage.getItem("email"),
    currentSubscription=10
    suscription={
        email:email,
        currentSubscription:currentSubscription
    }
    suscription=JSON.stringify(suscription)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:suscription,
        url:"http://localhost:3003/subscribe/getSubscription",
        success:(e)=>{
            console.log(e)
            if(e == "token not found") alert("token not found")
            else
            alert("you are subscribed to platinum edition")
            window.location.replace("trip.html")
        },
        error:(e)=>{
            alert(e)
            
        }
    })
})