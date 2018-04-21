// Fancy Notification
//showNotification('bg-orange', '' + data + ' Added!', 'top', 'left',
//		'animated fadeInRight', 'animated fadeOutRight');// NotifyCustom.js

// Create Post
function createPost() {
	var blogTitle = $("#blog-title").val();
	var blogContent = $("#blog-content").val();
	var doctorId = $.session.get("doctorId");

	// alert(tempType);

	if (blogTitle === "") {
		// Fancy Notification
		showNotification('bg-red', 'Please Enter the Post Title!', 'bottom',
				'center', 'animated bounceInDown', 'animated bounceOutDown');//
		// NotifyCustom.js
		// alert("Please Enter the Post Title!");
	} else if (blogContent === "") {
		// Fancy Notification
		showNotification('bg-blue', 'Please Enter valid Blog Content!',
				'bottom', 'center', 'animated bounceInDown',
				'animated bounceOutDown');//
		// NotifyCustom.js
		// alert("Please Enter valid Template Name/ Template Body");
	} else {
		// alert('Creating Templates!');
		$.ajax({
			url : getPresentationLayerAddress() + "/api/v1/blog/doctor/"
					+ doctorId + "/",
			type : "POST",
			contentType : "application/json; charset=utf-8",
			data : JSON.stringify({
				"body" : blogContent,
				"title" : blogTitle
			}),
			success : function(result) {
				if (result._id) {
					// alert("Template Created!");
					// Fancy Notification
					showNotification('bg-orange', 'Post Created!', 'bottom',
							'left', 'animated zoomInRight',
							'animated zoomOutRight');// NotifyCustom.js
					$("#blog-title").val("");
					$("#blog-content").val("");
					// getBlogs();
					setTimeout(function() {
						location.reload();
					}, 1000);
				} else {
					alert("Error: " + JSON.stringify(result));
				}
			},
			error : function(result) {
				alert('Error: ' + JSON.stringify(result));
			}
		});

	}// if-else
}