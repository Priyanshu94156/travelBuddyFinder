import getUrl from './url.js'
const url = getUrl()
console.log(url)
var userName = $("#user_name");
var userEmail=$("#email");
var usercity = $("#city");
var gender = $("#gender");
var height = $("#height");
var phno = $("#phno");
var education = $("#education");
var religion = $("#religion");
var smoking = $("#smoking");
var drinking = $("#drinking");
var description = $("#description");
var birthday = $("#birthday");

var email = (window.localStorage.getItem('email'))
getUserDetails()
function getUserDetails(){
    $.get(url+"/user/fetchUser/"+email,function(data,status){
        console.log(data)
        userEmail.html(email)
        userName.html(data[0].name)
        usercity.html(data[0].city)
        gender.html(data[0].gender)
        height.html(data[0].height)
        phno.html(data[0].phno)
        education.html(data[0].education)
        religion.html(data[0].religion)
         smoking.html(data[0].smoking)
        drinking.html(data[0].drinking)
        // description.html(data[0].description)
        birthday.html(data[0].birthday)
    })
}



//edit to submit 
$("#edit").click(()=>{
    edit();
    barDisplay();
})

var flag_es=0;
//progress bar
function barDisplay(){
    var flag_p=0
    var pbar=$('#bar')
    if ($("#user_name").html().length > 0) {
        flag_p++;
      }
      if ($("#city").html().length > 0) {
        flag_p++;
      }
      if ($("#gender").html().length > 0) {
        flag_p++;
      }
      if ($("#height").html().length > 0) {
        flag_p++;
      }
      if ($("#phno").html().length > 0) {
        flag_p++;
      }
    //   if ($("#education").html().length > 0) {
    //     flag_p++;
    //   }
    //   if ($("#religion").html().length > 0) {
    //     flag_p++;
    //   }
    //   if ($("#smoking").html().length > 0) {
    //     flag_p++;
    //   }
    //   if ($("#drinking").html().length > 0) {
    //     flag_p++;
    //   }
    //   if ($("#birthday").html().length > 0) {
    //     flag_p++;
    //   }
      console.log(flag_p);                                                    
    pbar.style.width(10*flag_p);
    var x=10*flag_p;
    $("#progresspercentage").html(x+'% complete');
    console.log("hi")
    console.log(flag_p)
    
}
function edit() {
    if(flag_es==0){
        var flag_p=0;
        $("#user_name").attr("contenteditable",true);
        // $("#email").attr("contenteditable",true);
        $("#city").attr("contenteditable",true);
        $("#gender").attr("contenteditable",true);
        $("#height").attr("contenteditable",true);
        $("#phno").attr("contenteditable",true);
        $("#education").attr("contenteditable",true);
        $("#religion").attr("contenteditable",true);
        $("#smoking").attr("contenteditable",true);
        $("#drinking").attr("contenteditable",true);
        $("#description").attr("contenteditable",true);
        // $("#birthday").attr("contenteditable",true);
        $("#edit").html("Save Changes");
        flag_es=1;
    }
    else{
        flag_p=0
        $("#user_name").attr("contenteditable",false);
        // $("#email").attr("contenteditable",true);
        $("#city").attr("contenteditable",false);
        $("#gender").attr("contenteditable",false);
        $("#height").attr("contenteditable",false);
        $("#phno").attr("contenteditable",false);
        $("#education").attr("contenteditable",false);
        $("#religion").attr("contenteditable",false);
        $("#smoking").attr("contenteditable",false);
        $("#drinking").attr("contenteditable",false);
        $("#description").attr("contenteditable",false);
        // $("#birthday").attr("contenteditable",true);
        $("#edit").html("Edit");
        updateData();
        flag_es=0;
    }
    }

    // updating form data
    function updateData(){
    
        var data={
            phno:$("#phno").text()
        }
        var url1 = url+"/user/userUpdate/"+localStorage.getItem("email")
        $.ajax(
            {
                type: "post",
                url: url1,
                contentType: "application/json",
                data: JSON.stringify(data),
                xhrFields: { withCredentials: false, },
                headers: {},
                success: function (data) {
                    console.log("Success");
                    console.log(data);
                    data = JSON.parse(data);
                    if(data.status=="success"){
                        
                     alert("user updated successfully")
                    }else{
                        alert("user not updated")
                    }
                    
                },
                error: function () {
                    console.log("Issue with server.");
                    alert("user not updated.");
                },
            }
        );
    }
  