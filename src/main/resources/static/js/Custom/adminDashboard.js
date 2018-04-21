$(document).ready(
		function() {
			// Session Check
			// Check Session First
			if (!$.session.get("adminId")) {
				showNotification('bg-black', 'Session Invalid!', 'bottom',
						'left', 'animated bounceInDown',
						'animated bounceOutDown');// NotifyCustom.js
				// NotifyCustom.js
				// alert("Session Invalid!");
				setTimeout(function() {
					window.location.replace(getPresentationLayerAddress()
							+ "/index.html");
				}, 2000);

			}

			// Populate Profile
			$(function() {
				$("#adminName").append(
						"Welcome back, " + $.session.get("adminName") + "!");
			});// Session check Ends

			// Hide Edit
			$("#editDoctorCard").hide();
			$("#editPatientCard").hide();
			$("#editBlogCard").hide();

			// Call Doctor Moderator Data
			GetDoctorModeratorData(0);

			// Call Patient Moderator Data
			GetPatientModeratorData(0);

			// Call Blog Moderator
			 GetBlogModeratorData(0);
		});

// Logout To destroy Sessions
function adminlogout() {
	$.session.clear();
	localStorage.clear();
	showNotification('bg-red', 'Please Wait while you are been Logged out!',
			'bottom', 'left', 'animated bounceInDown', 'animated bounceOutDown');// NotifyCustom.js
	setTimeout(function() {
		window.location.replace(getPresentationLayerAddress() + "/index.html")
	}, 2000);
}

function hideEditCard(domId) {
	$("#" + domId + "").hide();
	focusDom('doctorModeratorTable');
}
// Focus Dom Elements
function focusDom(dom) {
	$("#" + dom + "").focus();
}

/** ****************DOCTOR********************************* */
// Get Doctor Moderator Status
function GetDoctorModeratorData(dTable) {

	$
			.ajax({
				url : getPresentationLayerAddress() + "/api/v1/doctor",
				type : "GET",
				success : function(result) {

					var trHTML = "";

					if (dTable === 0)// On first load
					{
						trHTML = "<tbody>";
					} else {
						$('#doctorModeratorTable > tbody').empty();
						trHTML = "<tbody>";
					}

					// Docotr Moderator Table
					for (i = 0; i < result.length; i++) {
						trHTML += '<tr><td>'
								+ result[i]._id
								+ '</td><td>'
								+ result[i].name
								+ '</td><td>'
								+ result[i].email
								+ '</td><td>'
								+ result[i].gender
								+ '</td><td>'
								+ result[i].address
								+ '</td><td>'
								+ result[i].phone
								+ '</td><td>'
								+ result[i].specialization
								+ '</td><td><button type="button" onclick="populateUpdateDoctorData('
								+ result[i]._id
								+ ')" class="btn btn-warning btn-circle waves-effect waves-circle waves-float"><i class="material-icons">edit</i></button>'
								+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="deleteDoctor('
								+ result[i]._id
								+ ')" class="btn btn-danger btn-circle waves-effect waves-circle waves-float"><i class="material-icons">delete_forever</i></button></td></tr>';
					}// For loop ends

					if (dTable === 0) {// On First Load

						trHTML += "</tbody>";
						$('#doctorModeratorTable').append(trHTML);

						$('#doctorModeratorTable').DataTable(
								{
									dom : 'Bfrtip',
									responsive : true,
									buttons : [ 'copy', 'csv', 'excel', 'pdf',
											'print' ],
									ordering : true,
									autoWidth : true,
									info : true,
								});
					} else {
						trHTML += "</tbody>";
						$('#doctorModeratorTable').append(trHTML);
					}
				},
				error : function(result) {
					alert('Error in serving Doctor Moderator Data Request: '
							+ result);
				}
			});

}

// Populate Update Doctor Data
function populateUpdateDoctorData(doctorId) {

	if (doctorId === "") {
		alert("Cannot Populate this Doctor Data!");
	} else {
		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/doctor/" + doctorId
					+ "",
			type : "GET",
			success : function(result) {

				$("#editDoctorCard").show();
				// Populating Update Data Fields
				focusDom("updateDoctorId");
				$("#updateDoctorId").val(result._id);
				focusDom("updateDoctorName");
				$("#updateDoctorName").val(result.name);
				focusDom("updateDoctorEmail");
				$("#updateDoctorEmail").val(result.email);
				focusDom("updateDoctorAddress");
				$("#updateDoctorAddress").val(result.address);
				if (result.gender === "Female") {
					$('input:radio[name=groupD]')[0].checked = true;
				} else {
					$('input:radio[name=groupD]')[1].checked = true;
				}
				focusDom("updateDoctorPhone");
				$("#updateDoctorPhone").val(result.phone);
				focusDom("updateDoctorSpecialization");
				$("#updateDoctorSpecialization").val(result.specialization);
				focusDom("updateDoctorBtn");
				$("#updateDoctorBtn").attr('onclick',
						'updateDoctor(' + doctorId + ')');
			},
			error : function(result) {
				alert('Error in serving Doctor Update Data: ' + result);
			}
		});
	}
}

// Update Doctor
function updateDoctor(doctorId) {
	var email = $('#updateDoctorEmail').val();
	var name = $('#updateDoctorName').val();
	var spl = $('#updateDoctorSpecialization').val();
	var phone = $('#updateDoctorPhone').val();
	var address = $('#updateDoctorAddress').val();
	var gender = $('input[name=groupD]:checked').val();

	if (name === "" || email === "") {
		showNotification('bg-purple', 'Please Input Valid Email, & Name!',
				'bottom', 'center', 'animated bounceInDown',
				'animated bounceOutDown');// NotifyCustom.js
	} else {

		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/doctor/" + doctorId
					+ "",
			type : "PUT",
			contentType : "application/json; charset=utf-8",
			crossDomain : true,
			data : JSON.stringify({
				"email" : email,
				"name" : name,
				"gender" : gender,
				"address" : address,
				"phone" : phone,
				"specialization" : spl
			}),
			success : function(result) {
				// Fancy Notification
				showNotification('bg-purple', 'Doctor Updated!', 'bottom',
						'center', 'animated bounceInDown',
						'animated bounceOutDown');// NotifyCustom.js
				GetDoctorModeratorData(1);
				$("#editDoctorCard").hide();
				focusDom("doctorModeratorTable");
			},
			error : function(result) {
				showNotification('bg-red', 'Oops! Something Wrong!', 'up',
						'right', 'animated bounceOutDown',
						'animated bounceInDown');// NotifyCustom.js
			}
		});
	}// if-else

}

// Delete Doctor
function deleteDoctor(doctorId) {
	if (doctorId === "") {
		alert("Cannot Remove this Doctor!");
	} else {
		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/doctor/" + doctorId
					+ "",
			type : "DELETE",
			success : function(result) {
				// Fancy Notification
				showNotification('bg-green', 'Doctor successfully Removed!',
						'top', 'right', 'animated lightSpeedIn',
						'animated lightSpeedOut');// NotifyCustom.js
				// GetDoctorModeratorData(1);
				setTimeout(function() {
					location.reload();
				}, 1000);
			},
			error : function(result) {
				alert('Error in Removing Doctor: ' + result);
			}
		});
	}
}
/** ****************DOCTOR********************************* */

/** ****************PATIENT********************************* */
// Get Patient Moderator Status
function GetPatientModeratorData(dTable) {

	$
			.ajax({
				url : getPresentationLayerAddress() + "/api/v1/patient",
				type : "GET",
				success : function(result) {

					var trHTML = "";

					if (dTable === 0)// On first load
					{
						trHTML = "<tbody>";
					} else {
						$('#patientModeratorTable > tbody').empty();
						trHTML = "<tbody>";
					}

					// Docotr Moderator Table
					for (i = 0; i < result.length; i++) {
						trHTML += '<tr><td>'
								+ result[i]._id
								+ '</td><td>'
								+ result[i].dob
								+ '</td><td>'
								+ result[i].name
								+ '</td><td>'
								+ result[i].email
								+ '</td><td>'
								+ result[i].gender
								+ '</td><td><button type="button" onclick="populateUpdatePatientData('
								+ result[i]._id
								+ ')" class="btn btn-warning btn-circle waves-effect waves-circle waves-float"><i class="material-icons">edit</i></button>'
								+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="deletePatient('
								+ result[i]._id
								+ ')" class="btn btn-danger btn-circle waves-effect waves-circle waves-float"><i class="material-icons">delete_forever</i></button></td></tr>';
					}// For loop ends

					if (dTable === 0) {// On First Load

						trHTML += "</tbody>";
						$('#patientModeratorTable').append(trHTML);

						$('#patientModeratorTable').DataTable(
								{
									dom : 'Bfrtip',
									responsive : true,
									buttons : [ 'copy', 'csv', 'excel', 'pdf',
											'print' ],
									ordering : true,
									autoWidth : true,
									info : true,
								});
					} else {
						trHTML += "</tbody>";
						$('#patientModeratorTable').append(trHTML);
					}
				},
				error : function(result) {
					alert('Error in serving Patient Moderator Data Request: '
							+ result);
				}
			});

}

// Populate Update Patient Data
function populateUpdatePatientData(patientId) {

	if (patientId === "") {
		alert("Cannot Populate this Patient Data!");
	} else {
		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/patient/"
					+ patientId + "",
			type : "GET",
			success : function(result) {

				$("#editPatientCard").show();
				// Populating Update Data Fields
				focusDom("updatePatientId");
				$("#updatePatientId").val(result._id);
				focusDom("updatePatientName");
				$("#updatePatientName").val(result.name);
				focusDom("updatePatientEmail");
				$("#updatePatientEmail").val(result.email);
				focusDom("updatePatientDob");
				$("#updatePatientDob").val(result.dob);
				if (result.gender === "Female") {
					$('input:radio[name=groupP]')[0].checked = true;
				} else {
					$('input:radio[name=groupP]')[1].checked = true;
				}
				focusDom("updatePatientBtn");
				$("#updatePatientBtn").attr('onclick',
						'updatePatient(' + patientId + ')');
			},
			error : function(result) {
				alert('Error in serving Patient Update Data: ' + result);
			}
		});
	}
}

// Update Patient
function updatePatient(patientId) {
	var email = $('#updatePatientEmail').val();
	var name = $('#updatePatientName').val();
	var dob = $('#updatePatientDob').val();
	var gender = $('input[name=groupP]:checked').val();

	if (name === "" || email === "") {
		showNotification('bg-purple', 'Please Input Valid Email, & Name!',
				'bottom', 'center', 'animated bounceInDown',
				'animated bounceOutDown');// NotifyCustom.js
	} else {

		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/patient/"
					+ patientId + "",
			type : "PUT",
			contentType : "application/json; charset=utf-8",
			crossDomain : true,
			data : JSON.stringify({
				"email" : email,
				"name" : name,
				"gender" : gender,
				"dob" : dob
			}),
			success : function(result) {
				// Fancy Notification
				showNotification('bg-purple', 'Patient Updated!', 'bottom',
						'center', 'animated bounceInDown',
						'animated bounceOutDown');// NotifyCustom.js
				GetPatientModeratorData(1);
				$("#editPatientCard").hide();
				focusDom("patientModeratorTable");
			},
			error : function(result) {
				showNotification('bg-red', 'Oops! Something Wrong!', 'up',
						'right', 'animated bounceOutDown',
						'animated bounceInDown');// NotifyCustom.js
			}
		});
	}// if-else

}

// Delete Patient
function deletePatient(patientId) {
	if (patientId === "") {
		alert("Cannot Remove this Patient!");
	} else {
		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/patient/"
					+ patientId + "",
			type : "DELETE",
			success : function(result) {
				// Fancy Notification
				showNotification('bg-green', 'Patient successfully Removed!',
						'top', 'right', 'animated lightSpeedIn',
						'animated lightSpeedOut');// NotifyCustom.js
				// GetDoctorModeratorData(1);
				setTimeout(function() {
					location.reload();
				}, 1000);
			},
			error : function(result) {
				alert('Error in Removing Patient: ' + result);
			}
		});
	}
}
/** ****************PATIENT********************************* */

/** ****************BLOG********************************* */

// Get Blog Moderator Status
function GetBlogModeratorData(dTable) {

	$
			.ajax({
				url : getPresentationLayerAddress() + "/api/v1/blog",
				type : "GET",
				success : function(result) {

					var trHTML = "";

					if (dTable === 0)// On first load
					{
						trHTML = "<tbody>";
					} else {
						$('#blogModeratorTable > tbody').empty();
						trHTML = "<tbody>";
					}

					// Blog Moderator Table
					for (i = 0; i < result.length; i++) {
						trHTML += '<tr><td>'
								+ result[i]._id
								+ '</td><td>'
								+ result[i].title
								+ '</td><td>'
								+ result[i].body
								+ '</td><td>'
								+ result[i].timestamp
								+ '</td><td>'
								+ result[i].doctor.name
								+ '</td><td><button type="button" onclick="populateUpdateBlogData('
								+ result[i]._id
								+ ')" class="btn btn-warning btn-circle waves-effect waves-circle waves-float"><i class="material-icons">edit</i></button>'
								+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="deleteBlog('
								+ result[i]._id
								+ ')" class="btn btn-danger btn-circle waves-effect waves-circle waves-float"><i class="material-icons">delete_forever</i></button></td></tr>';
					}// For loop ends

					if (dTable === 0) {// On First Load

						trHTML += "</tbody>";
						$('#blogModeratorTable').append(trHTML);

						$('#blogModeratorTable').DataTable(
								{
									dom : 'Bfrtip',
									responsive : true,
									buttons : [ 'copy', 'csv', 'excel', 'pdf',
											'print' ],
									ordering : true,
									autoWidth : true,
									info : true,
								});
					} else {
						trHTML += "</tbody>";
						$('#blogModeratorTable').append(trHTML);
					}
				},
				error : function(result) {
					alert('Error in serving Blog Moderator Data Request: '
							+ result);
				}
			});

}

// Populate Update Blog Data
function populateUpdateBlogData(blogId) {

	if (blogId === "") {
		alert("Cannot Populate this Blog Data!");
	} else {
		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/blog/" + blogId
					+ "",
			type : "GET",
			success : function(result) {

				$("#editBlogCard").show();
				// Populating Update Data Fields
				focusDom("updateBlogId");
				$("#updateBlogId").val(result._id);
				focusDom("updateBlogTitle");
				$("#updateBlogTitle").val(result.title);
				focusDom("updateBlogContent");
				$("#updateBlogContent").val(result.body);
				focusDom("updateBlogDoctorId");
				$("#updateBlogDoctorId").val(result.doctor._id);
				focusDom("updateBlogBtn");
				$("#updateBlogBtn").attr('onclick',
						'updateBlog(' + blogId + ')');
			},
			error : function(result) {
				alert('Error in serving Blog Update Data: ' + result);
			}
		});
	}
}

// Update Blog
function updateBlog(blogId) {
	var title = $('#updateBlogTitle').val();
	var content = $('#updateBlogContent').val();
	var blogDoctorId = $('#updateBlogDoctorId').val();
	
	if (title === "" || content === "") {
		showNotification('bg-purple', 'Please Input valid Title, & Content!',
				'bottom', 'center', 'animated bounceInDown',
				'animated bounceOutDown');// NotifyCustom.js
	} else {

		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/blog/" + blogDoctorId
					+ "",
			type : "PUT",
			contentType : "application/json; charset=utf-8",
			crossDomain : true,
			data : JSON.stringify({
				"title" : title,
				"body" : content
			}),
			success : function(result) {
				// Fancy Notification
				showNotification('bg-purple', 'Blog Updated!', 'bottom',
						'center', 'animated bounceInDown',
						'animated bounceOutDown');// NotifyCustom.js
				GetBlogModeratorData(1);
				$("#editBlogCard").hide();
				focusDom("blogModeratorTable");
			},
			error : function(result) {
				showNotification('bg-red', 'Oops! Something Wrong!', 'up',
						'right', 'animated bounceOutDown',
						'animated bounceInDown');// NotifyCustom.js
			}
		});
	}// if-else

}

// Delete Blog
function deleteBlog(blogId) {
	if (blogId === "") {
		alert("Cannot Remove this Blog!");
	} else {
		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/blog/" + blogId
					+ "",
			type : "DELETE",
			success : function(result) {
				// Fancy Notification
				showNotification('bg-green', 'Blog successfully Removed!',
						'top', 'right', 'animated lightSpeedIn',
						'animated lightSpeedOut');// NotifyCustom.js
				// GetDoctorModeratorData(1);
				setTimeout(function() {
					location.reload();
				}, 1000);
			},
			error : function(result) {
				alert('Error in Removing Blog: ' + result);
			}
		});
	}
}
/*****************BLOG********************************* */
