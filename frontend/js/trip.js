// import getUrl from './url.js'
// const url = getUrl()

function createTrip() {
    var trip = {
        owner:'kukunuriabhiram.19.it@anits.edu.in',
        tripName:$('#tripName').val(),
        description:$('#description').val(),
        from:$('#from').val(),
        to:$('#to').val(),
        startDate:$('#startDate').val(),
        endDate:$('#endDate').val(),
        flexible:$('#flexible').val(),
        preferences:$('#preferences').val(),
        keywords:$('#keywords').val(),
        travellingCost:$('#travellingCost').val(),

    }
    trip = JSON.stringify(trip)
    $.ajax({
        "method": "POST",
        contentType: "application/json",
        'data': trip,
        'url': 'http://localhost:3003/trip/newTripSave',
        "success": (e) => { 
            alert("successfully added")
            window.location.reload() 
    },
        error: (e) => { alert(e) }
    })

}