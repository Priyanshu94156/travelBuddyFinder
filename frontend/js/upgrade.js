// import getUrl from './url.js'
// const url = getUrl()
// console.log(url)

$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'));
    }
});

$("#silver").click(()=>{
    // "email":"akash@gmail.com",
    // "currentSubscription":5
    email=localStorage.getItem("email"),
    currentSubscription=2
    suscription={
        email:email,
        currentSubscription:currentSubscription
    }
    suscription=JSON.stringify(suscription)
    $.ajax({
        method:POST,
        contentType:"application/json",
        data:suscription,
        url:url+"/user/getSubscription",
        success:(e)=>{
            alert("you are subscribed to silver edition")
            window.location.replace("trip.html")
        },
        error:(e)=>{
            alert(e)
            
        }
    })
})

$("#gold").click(()=>{
    // "email":"akash@gmail.com",
    // "currentSubscription":5
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
        url:"http://localhost:3003/user/getSubscription",
        success:(e)=>{
            alert("you are subscribed to gold edition")
            window.location.replace("trip.html")
        },
        error:(e)=>{
            alert(e)
            
        }
    })
})

$("#platinum").click(()=>{
    // "email":"akash@gmail.com",
    // "currentSubscription":5
    email=localStorage.getItem("email"),
    currentSubscription=2
    suscription={
        email:email,
        currentSubscription:currentSubscription
    }
    suscription=JSON.stringify(suscription)
    $.ajax({
        method:POST,
        contentType:"application/json",
        data:suscription,
        url:url+"/user/getSubscription",
        success:(e)=>{
            alert("you are subscribed to platinum edition")
            window.location.replace("trip.html")
        },
        error:(e)=>{
            alert(e)
            
        }
    })
})