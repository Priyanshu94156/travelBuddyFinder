// import getUrl from './url.js'
// const url = getUrl()

function createTrip() {
    pics=document.getElementById('File')
    owner=window.localStorage.getItem('email'),
        tripName=$('#tripName').val(),
        description=$('#description').val(),
        from=$('#from').val(),
        to=$('#to').val(),
        startDate=$('#startDate').val(),
        endDate=$('#endDate').val(),
        flexible=$('#flexible').val(),
        preferences=$('#preferences').val(),
        keywords=$('#keywords').val(),
        travellingCost=$('#travellingCost').val(),
    photos=[]
    console.log("simple")
    console.log(pics.files)
    
    $.ajaxSetup({
        beforeSend: function(xhr){
            xhr.setRequestHeader('token', localStorage.getItem('token'));
        }
    });

    // for(let i=0; i<pics.files.length; i++){
    //     console.log(pics.files[i])
    //     photos.push(pics.files[i])
    // }
    // console.log(photos)
    // let tripData = new FormData();
    // tripData.append("owner",owner);
    
    


    let formdata = new FormData(document.querySelector("#myform"));
    formdata.set("owner", owner)
    formdata.set("description",description);
    formdata.set("from",from);
    formdata.set("to",to);
    formdata.set("startDate",startDate);
    formdata.set("endData",endDate);
    formdata.set("flexible",flexible);
    formdata.set("preferences",preferences);
    // formdata.set("keywords",keywords);
    formdata.set("travellingCost",travellingCost);
    // tripData.append("photos",pics.files);
    
    console.log("formdata: ",formdata);
    

    $.ajax({
        method: "POST",
        contentType:false,
        processData : false,
        'data': formdata,
        'url': 'http://localhost:3003/trip/newTripSave',
        "success": (e) => { 
            alert("successfully added")
            window.location.reload() 
    },
        error: (e) => { alert(e) }
    })

}