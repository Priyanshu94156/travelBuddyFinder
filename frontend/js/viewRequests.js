import getUrl from './url.js'
const url = getUrl()
console.log(url)
window.onload =()=>{
    $.ajaxSetup({
        beforeSend: function(xhr){
            xhr.setRequestHeader('token', localStorage.getItem('token'));
        }
    });
    getTripRequests()
}

function getTripRequests(){

    let data={
        email:localStorage.getItem('email')
    }
    data=JSON.stringify(data)

    $.ajax({
        method:"POST",
        contentType:"application/json",
        data:data,
        url:url+"/trip/getRequestToOwner",
        success:(data) =>{
            console.log(data)
            renderRequests(data)
        },
        error:(e) =>{
            console.log(e)
            alert(e+"error")
        }
    })}

function renderRequests(data){
    // $.get(url+"/trip/getRequestToOwner", function(data, status){
        
        let count=1
        for(let i=0; i<data.length; i++){
            for(let j = 0; j <data[i].messages_info.length; j++){
            document.querySelector('#allTripRequests').innerHTML+=`<tr class="inner-box">
            <th scope="row">
            <div class="event-date">
            <span>${count}</span>
            </div>
             </th>
            
            <td>
            <div class="event-wrap" >
            <h3><a href="#">${data[i].tripName}</a></h3>
            <div class="meta">
            
            </div>
            </td>

            <td>
            <div class="r-no">
            <span>${data[i].messages_info[j].email}</span>
            </div>
            </td>

            <td>
            <div class="r-no">
            <span>${data[i].messages_info[j].message}</span>
            </div>
            </td>
            

            <td>
            <div class="primary-btn">
            <a class="btn btn-primary"  name="ab" class="dsfds"  id="${data[i]._id+"-"+data[i].messages_info[j].email}" href="#">Accept</a>
            <a class="btn btn-primary"  name="rb" class="fff" id="${data[i]._id +"-"+data[i].messages_info[j].email}" href="#">Reject</a>
            </div>
            </td>

            <td>
            <div class="primary-btn">
            <a class="btn btn-primary"  name="ab" id="" href="#">View Profile</a>
            </div>
            
            <div class="r-no">

            <span></span>
            </div>
            </td>
            
            </tr>
            </div>`
            count=count+1
        }}
        
            console.log("onedone")
        const ss = document.getElementById("allTripRequests")
        console.log(ss)
        ss.addEventListener("click",(e) => {
            if(e.target.nodeName==='A' && (e.target.name === "ab" || e.target.name === "rb"))
            {
                const email = e.target.email
                const id = e.target.id
                const cl = e.target
                var fields = id.split('-');
                var ids = fields[0];
                var emails = fields[1];
            if(e.target.name === "ab"){
                    const obj = {
                            _id:ids,
                            email:emails,
                            task:"Approve"
                    }
                    let ins=JSON.stringify(obj);
                    $.ajax({
                        "method":"POST",contentType:"application/json",'data':ins,'url':url+"/trip/acceptOrReject",
                    "success":(e)=>{console.log("sucessfully accepted")},error:(e)=>{alert(e)}
                    }); 
                    console.log("accept",ins)

            }else if(e.target.name === "rb"){
                    var obj = {
                            _id:ids,
                            email:emails,
                            task:"Decline"
                    }
                    let ins=JSON.stringify(obj);
                    $.ajax({
                        "method":"POST",contentType:"application/json",'data':ins,'url':url+"/trip/acceptOrReject",
                    "success":(e)=>{console.log("sucessfully rejected")},error:(e)=>{alert(e)}
                    }); 
                    console.log("dec",ins)
            }
            }
        })
}