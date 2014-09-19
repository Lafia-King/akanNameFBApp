'use strict';

var myApp = angular.module('myApp.view1', ['ngRoute'])
var userGender = "";
var userDOB = "";

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

myApp.controller('View1Ctrl', ['$scope', function($scope) {
	$scope.person={"day": "", "gender": ""};

}]);

	myApp.filter('changeName', function(){
		return function(input){
		return changeName(input.day,input.gender)};
		
	});

	function toDay(dob){
	var userDOB;
		if(dob == 0){
			userDOB = "Sunday";
		}
		else if(dob == 1){
			userDOB = "Monday";
		}
		else if(dob == 2){
			userDOB = "Tuesday";
		}
		else if(dob == 3){
			userDOB = "Wednesday";
		}
		else if(dob == 4){
			userDOB = "Thursday";
		}
		else if(dob == 5){
			userDOB = "Friday";
		}
		else if(dob == 6){
			userDOB = "Saturday";
		}
	return userDOB;
	}
	
	function changeName($d,$g){
		if($d=="monday" && $g=="male"){
			return "Kwadwo";
		}
		else if($d=="monday" && $g=="female"){
			return "Adwoa";
		}
		else if($d=="tuesday" && $g=="male"){
			return "Kwabena";
		}
		else if($d=="tuesday" && $g=="female"){
			return "Abena";
		}
		else if($d=="wednesday" && $g=="male"){
			return "Kwaku";
		}
		else if($d=="wednesday" && $g=="female"){
			return "Ekua";
		}
		else if($d=="thursday" && $g=="male"){
			return "Yaw";
		}
		else if($d=="thursday" && $g=="female"){
			return "Yaa";
		}
		else if($d=="friday" && $g=="male"){
			return "Kofi";
		}
		else if($d=="friday" && $g=="female"){
			return "Efua";
		}
		else if($d=="saturday" && $g=="male"){
			return "Kwame";
		}
		else if($d=="saturday" && $g=="female"){
			return "Ama";
		}
		else if($d=="sunday" && $g=="male"){
			return "Kwesi";
		}
		else if($d=="sunday" && $g=="female"){
			return "Akosua";
		}
	};
	
	
	
// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : "891531540876593",
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {	
	userGender = response.gender;
	userDOB = response.birthday;
	var d = new Date(userDOB);
	
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + " " + "<br>DOB: " + userDOB + " " + "<br>Gender: " + userGender + " " + "<br>Akan name:" + changeName(toDay(d.getDay()).toLowerCase(),userGender);
    });
  }

   (function () {
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              basicAPIRequest();
            }
          });
    });

function basicAPIRequest() {
    FB.api('/me', 
        {fields: "id,about,age_range,picture,bio,birthday,context,email,first_name,gender,hometown,link,location,middle_name,name,timezone,website,work"}, 
        function(response) {
          console.log('API response', response);
          $("#fb-profile-picture").append('<img src="' + response.picture.data.url + '"> ');
          $("#name").append(response.name);
          $("#user-id").append(response.id);
          $("#work").append(response.gender);
          $("#birthday").append(response.birthday);
          $("#education").append(response.hometown);
        }
    );
  }