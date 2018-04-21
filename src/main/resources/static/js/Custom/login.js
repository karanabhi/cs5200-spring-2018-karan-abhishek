$(document).ready(function() {
	$('#login-btn').focus();
});

function login() {

	var email = $('#login-email').val();
	var pass = $('#login-password').val();

	if (email === "" || pass === "") {
		showNotification('bg-orange', 'Please Input Valid Email & Password!',
				'bottom', 'center', 'animated bounceInDown',
				'animated bounceOutDown');// NotifyCustom.js
	} else {

		// Admin Login Hard Code check
		if (email === "admin" && pass === "admin") {
			$.session.set("adminName", "Admin");
			$.session.set("adminId", "12345678");
			localStorage.clear();// Clear Local storage
			// Fancy Notification
			showNotification('bg-orange', 'Logging Admin!', 'bottom', 'center',
					'animated bounceInDown', 'animated bounceOutDown');// NotifyCustom.js
			setTimeout(function() {
				window.location.replace("adminDashboard.html");
			}, 1500);

		} else {
			$
					.ajax({
						url : getPresentationLayerAddress()
								+ "/api/v1/doctorLogin/",
						type : "POST",
						contentType : "application/json; charset=utf-8",
						crossDomain : true,
						data : JSON.stringify({
							email : email,
							password : pass
						}),
						success : function(result) {
							// console.log(result);
							if (result.length === 0) {
								$
										.ajax({
											url : getPresentationLayerAddress()
													+ "/api/v1/patientLogin/",
											type : "POST",
											contentType : "application/json; charset=utf-8",
											crossDomain : true,
											data : JSON.stringify({
												email : email,
												password : pass
											}),
											success : function(result1) {
												if (result1.length === 0) {
													// Fancy Notification
													showNotification(
															'bg-black',
															'Invalid Credentials!',
															'bottom',
															'center',
															'animated bounceInDown',
															'animated bounceOutDown');// NotifyCustom.js
												} else {
													// fetch session vars from
													// success query
													$.session.set(
															"patientName",
															result1[0].name);
													$.session.set("patientId",
															result1[0]._id);
													$.session.set("patientGender",
															result1[0].gender);
													$.session.set("patientDob",
															result1[0].dob);
													localStorage.clear();// Clear
													// Local
													// storage

													// Fancy Notification
													showNotification(
															'bg-orange',
															'Logging In!',
															'bottom',
															'center',
															'animated bounceInDown',
															'animated bounceOutDown');// NotifyCustom.js

													setTimeout(
															function() {
																window.location
																		.replace("patientDashboard.html");
															}, 2000);
												}
											},
											error : function(result1) {
												showNotification(
														'bg-red',
														'Oops! Something Wrong!',
														'up',
														'right',
														'animated bounceOutDown',
														'animated bounceInDown');// NotifyCustom.js
											}
										});

							} else {
								// alert(result[0].name);
								// fetch session vars from success query
								$.session.set("doctorName", result[0].name);
								$.session.set("doctorId", result[0]._id);
								localStorage.clear();// Clear Local storage
								// alert($.session.get("doctorName"));
								// Fancy Notification
								showNotification('bg-orange', 'Logging In!',
										'bottom', 'center',
										'animated bounceInDown',
										'animated bounceOutDown');// NotifyCustom.js

								setTimeout(function() {
									window.location
											.replace("doctorDashboard.html");
								}, 1500);
							}
						},
						error : function(result) {
							showNotification('bg-red',
									'Oops! Something Wrong!', 'up', 'right',
									'animated bounceOutDown',
									'animated bounceInDown');// NotifyCustom.js
						}
					});
		}// Admin else ends

	}// if-else
}
