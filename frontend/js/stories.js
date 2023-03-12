$.ajaxSetup({
    beforeSend: function(xhr){
        xhr.setRequestHeader('token', localStorage.getItem('token'));
    }
});


getStories()


function getStories(){
    $.get("http://localhost:3003/stories/getAllStories",function(data,status){
        console.log(data)
        console.log(data[0].description)
        for(var i=0;i<data.length;i++){
            $("#displayTrips").append(`<div class="trip_card date row">
            <div class="col-sm-3 pr-0">
                <img src="../static/images/bg1.jpg" class="img-fluid">
            </div>
            <div class="col-sm-6">
            <b>${data[i].email}</b>
                <div class="trip_location">
                    <span class="tl">${data[i].from}</span>
                    <span class="trip_color"> -> </span>
                    <span class="tl">${data[i].to}</span>
                </div>
                <div class="trip_type">
                    <span>${data[i].description}</span>
                </div>
            </div>
            <div class="col-sm-3 ">
                <button class="btn btn primary" id=${data[i]._id} style="margin: 30px;">More</button>
            </div>
        </div>
        `)
        }
        const list = document.getElementById('displayTrips')
        list.addEventListener('click', (e) =>{
          if(e.target.nodeName == "BUTTON"){
            stories = e.target.id
            console.log(stories)
            data = {
                _id:stories
            }
            $.ajaxSetup({
                beforeSend: function(xhr){
                    xhr.setRequestHeader('token', localStorage.getItem('token'));
                }
            });
            $.ajax({
                method:"POST",
                contentType:"application/json",
                data:JSON.stringify(data),
                url:"http://localhost:3003/stories/getSingleStory",
                success:(e)=>{
                    console.log(e)
                    document.querySelector(".bodyy").innerHTML =`<div class="card">
                    <div class="card-header text-center">
                      Read Below
                    </div>
                    <div class="card-body text-center">
                      <h5 class="card-title">${e[0].from+"                ------>             "+e[0].to}</h5>
                      <p class="card-text">${e[0].description}</p>
                      <p>Author ${e[0].email}</p>
                    <a href="../html/stories.html" class="btn btn-primary">Go Back</a>
                    </div>
                  </div>`
                }
            })
          }  
        })
    })
}