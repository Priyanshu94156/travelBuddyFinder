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
    
    // for(let i=0; i<pics.files.length; i++){
    //     console.log(pics.files[i])
    //     photos.push(pics.files[i])
    // }
    // console.log(photos)
    // let tripData = new FormData();
    // tripData.append("owner",owner);
    // tripData.append("description",description);
    // tripData.append("from",from);
    // tripData.append("to",to);
    // tripData.append("startDate",startDate);
    // tripData.append("endData",endDate);
    // tripData.append("flexible",flexible);
    // tripData.append("preferences",preferences);
    // tripData.append("keywords",keywords);
    // tripData.append("travellingCost",travellingCost);
    // tripData.append("photos",pics.files);
    
    


    let formdata = new FormData(document.querySelector("#myform"));
    formdata.set("owner", owner)
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