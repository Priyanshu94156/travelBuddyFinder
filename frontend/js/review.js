import getUrl from './url.js'
const url = getUrl()
console.log(url)

$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'));
    }
});


var dat = localStorage.getItem('email')
console.log(dat)
var datas = {email:dat}
datas = JSON.stringify(datas)
// console.log(dat)

$.ajax({
    method:"POST",
    contentType:'application/json',
    data:datas,
    url:'http://localhost:3003/getReview',
    success:(e)=>{
        console.log(e)
        console.log(e.length)
        if(e === 'token not found'){
            alert('token not found')
        }else if(e.length > 0){
            $('#tname').html(e[0].tripName)
            $('#oemail').html(e[0].email)
        alert("plz review you journey")
        }
        else{
            alert("No trips to review")
            window.location.href = "../html/profile.html"
        }
    }
})


$('#reviewSubmit').click(function(){
    const review = $('#writtenReview').val()
    
    const senderEmail = localStorage.getItem('email')
    const receiverEmail = $('#oemail').html()
    const tripName =  $('#tname').html()
    var dats = {
        review: review,
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
        tripName: tripName
    }
    dats = JSON.stringify(dats)
    console.log(senderEmail)
    console.log(receiverEmail)
    console.log(tripName)
    $.ajax({
        method:"POST",
        contentType:'application/json',
        data:dats,
        url:'http://localhost:3003/getReview/save',
        success:(e)=>{
            console.log(e)
            console.log(e.length)
            if(e === 'token not found'){
                alert('token not found')
            }
            else{
                alert("success")
            }
        }
    })
})
