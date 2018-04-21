$(document).ready(function() {
	$('#register-doctor-btn').focus();
	$('#register-patient-btn').focus();
});

function registerDoctor() {

	var email = $('#register-doctor-email').val();
	var pass = $('#register-doctor-password').val();
	var name = $('#register-doctor-name').val();
	var spl = $('#register-doctor-spl').val();
	var phone = $('#register-doctor-phone').val();
	var address = $('#register-doctor-address').val();
	var gender = $('input[name=group1]:checked').val();

	if (name === "" || email === "" || pass === "") {
		showNotification('bg-purple',
				'Please Input Valid Email, Password & Name!', 'bottom',
				'center', 'animated bounceInDown', 'animated bounceOutDown');// NotifyCustom.js
	} else {

		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/doctor/",
			type : "POST",
			contentType : "application/json; charset=utf-8",
			crossDomain : true,
			data : JSON.stringify({
				"email" : email,
				"password" : pass,
				"name" : name,
				"gender" : gender,
				"address" : address,
				"phone" : phone,
				"specialization" : spl
			}),
			success : function(result) {
				// console.log(result);
				if (result.length === 0) {
					// Fancy Notification
					showNotification('bg-black', 'Invalid Credentials!',
							'bottom', 'center', 'animated bounceInDown',
							'animated bounceOutDown');// NotifyCustom.js
				} else {
					// Fancy Notification
					showNotification('bg-green', 'Signed Up!', 'bottom',
							'center', 'animated bounceInDown',
							'animated bounceOutDown');// NotifyCustom.js

					setTimeout(function() {
						window.location.replace("login.html");
					}, 2000);
				}
			},
			error : function(result) {
				showNotification('bg-red', 'Oops! Something Wrong!', 'up',
						'right', 'animated bounceOutDown',
						'animated bounceInDown');// NotifyCustom.js
			}
		});
	}// if-else
}// registerDoctor()

function registerPatient() {

	var email = $('#register-patient-email').val();
	var pass = $('#register-patient-password').val();
	var name = $('#register-patient-name').val();
	var dob = $('#register-patient-dob').val();
	var gender = $('input[name=group2]:checked').val();

	if (name === "" || email === "" || pass === "") {
		showNotification('bg-purple',
				'Please Input Valid Email, Password & Name!', 'bottom',
				'center', 'animated bounceInDown', 'animated bounceOutDown');// NotifyCustom.js
	} else {

		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/patient/",
			type : "POST",
			contentType : "application/json; charset=utf-8",
			crossDomain : true,
			data : JSON.stringify({
				"email" : email,
				"password" : pass,
				"name" : name,
				"gender" : gender,
				"dob" : dob
			}),
			success : function(result) {
				// console.log(result);
				if (result.length === 0) {
					// Fancy Notification
					showNotification('bg-black', 'Invalid Credentials!',
							'bottom', 'center', 'animated bounceInDown',
							'animated bounceOutDown');// NotifyCustom.js
				} else {
					// Fancy Notification
					showNotification('bg-green', 'Signed Up!', 'bottom',
							'center', 'animated bounceInDown',
							'animated bounceOutDown');// NotifyCustom.js

					setTimeout(function() {
						window.location.replace("login.html");
					}, 2000);
				}
			},
			error : function(result) {
				showNotification('bg-red', 'Oops! Something Wrong!', 'up',
						'right', 'animated bounceOutDown',
						'animated bounceInDown');// NotifyCustom.js
			}
		});
	}// if-else
}// registerPatient()
