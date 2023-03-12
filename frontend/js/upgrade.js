// import getUrl from './url.js'
// const url = getUrl()
// console.log(url)
import getUrl from './url.js'
const urls = getUrl()
console.log(urls)
window.onload= () =>{
$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'));
        console.log(localStorage.getItem('token'));
    }
});
}

$("#silver").click(()=>{
    let email=localStorage.getItem("email"),
    currentSubscription=2
    let suscription={
        email:email,
        currentSubscription:currentSubscription
    }
    suscription=JSON.stringify(suscription)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:suscription,
        url:urls+"/subscribe/getSubscription",
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
  
    let email=localStorage.getItem("email"),
    currentSubscription=5
    let suscription={
        email:email,
        currentSubscription:currentSubscription
    }
    suscription=JSON.stringify(suscription)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:suscription,
        url:urls+"/subscribe/getSubscription",
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
  
    let email=localStorage.getItem("email"),
    currentSubscription=10
    let suscription={
        email:email,
        currentSubscription:currentSubscription
    }
    suscription=JSON.stringify(suscription)
    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:suscription,
        url:urls+"/subscribe/getSubscription",
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