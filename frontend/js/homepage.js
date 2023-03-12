$(document).ready(function() {
	new fullpage('#fullpage', {
		menu: '#menu',
		anchors: ['fphome','fphowitworks','fptimooapp','fpstories','fpfaq','fpregister'],
		navigation: true,
		responsiveWidth: 700,
		parallax: false,
		css3: true,
		easing: 'easeInOutCubic',
	easingcss3: 'ease',
		// slidesNavigation: true,
afterLoad: function(origin, destination, direction){

}
		});
	$('#slideshow').carousel({
		// maxWidth: 550,
		// maxHeight: 285,
		distance: 50,
		scale: 0.8,
		animationTime: 1000,
		showTime: 4000,
		autoPlay: false,
	});
$(document).on('click', '.menu-link', function(){
  fullpage_api.moveTo($(this).parent().attr('data-menuanchor'), 1);
});

	$('#accordion').find('.accordion-toggle').click(function(){
		$('#accordion').find('.accordion-toggle').not($(this)).removeClass('active')
      //Expand or collapse this panel
      $(this).toggleClass('active').next().slideToggle('fast');

      //Hide the other panels
      $(".accordion-content").not($(this).next()).slideUp('fast').find($(this).prev());

  });

});


// ----------------------------------------------------------------------------------------------//



//sign in button
var signinbtn = document.getElementById('signinbtn');
signinbtn.addEventListener('click', function() {
	var mail=document.querySelector("#LogEmail");
	var pwd= document.getElementById("LogPassword");
	console.log(mail.value+" "+pwd.value);;
	var url="http://localhost:3003/user/validate";
	var email=mail.value;
	var password=pwd.value;
	data={email:email,password:password}
	dataUser=JSON.stringify(data);
	console.log(dataUser);
	$.ajax({
		url:url,
        type:"POST",
        data:dataUser,
        contentType:"application/json",
        success:function(data){
			console.log("sucessful");
			data = JSON.parse(data) 
			localStorage.setItem("token",data.token);
			//console.log("data",data.status);
			
			if(data.status =="valid"){
				console.log("data",data);
				// console.log(username)
				window.localStorage.setItem("email",data.email)
				window.localStorage.setItem("username",data.name)
				window.location.replace("profile.html");

				alert("successful login")
			}
			else if(data.status =="invalid"){
                alert("Invalid email or password");
            }
			
	},
	error:function(){
        console.log("error with the server");
		alert("not added ")
    }})

});


//signup button
signupBtn.addEventListener('click',()=>{
    var input_email=$('#email')[0]
	var in_name=$("#name")[0]
    var pwd=$('#password')[0]
    var pwd_conf =$("#confirm_password")[0]
	var in_gender=$('#gender')[0]
	var in_age=$('#age')[0]
	var in_phno=$('#phno')[0]
    if(pwd.value != pwd_conf.value){
        alert("password doesn't match!!")
    }else{
        var url="http://localhost:3003/user/addUser";
        var data={email:input_email.value,password:pwd.value,name:in_name.value,gender:in_gender.value,age:in_age.value,phno:in_phno.value};
        var data = JSON.stringify(data);
		console.log(data)
        $.ajax(
            {
                type: "post",
                url: url,
                contentType: "application/json",
                data: data,
                xhrFields: { withCredentials: false, },
                headers: {},
                success: function (data) {
                    console.log("Success");
                    console.log(data);
                    data = JSON.parse(data);
                    if(data.status=="valid"){
                        localStorage.setItem("email",email);
                        // localStorage.setItem("name",username);
                        window.location.replace("profile.html")
                        alert("user registered successfully")
                    }else if(data.status=="exist"){
                        alert("user already exist")                      
                    }else{
                        alert("unable to register user")
                    }
                    
                },
                error: function () {
                    console.log("Issue with server.");
                    alert("user not added.");
                },
            }
        );
    }

})



if(localStorage.getItem("email")){
	console.log("email found")
	$.ajaxSetup({
		beforeSend: function(xhr){
			xhr.setRequestHeader('token', localStorage.getItem('token'));
		}
	});
	$("#loginn").html(`<a href='profile.html'>${localStorage.getItem("email")}</a><br><button id="hola" onclick=localStorage.clear(),location.reload() >Log Out</button>`)
}
