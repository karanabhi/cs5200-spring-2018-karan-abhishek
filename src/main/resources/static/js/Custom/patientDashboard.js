//Check Session First
if (!$.session.get("patientId")) {
	// showNotification('bg-red', 'Session Invalid!', 'up', 'right',
	// 'animated bounceOutDown', 'animated bounceInDown');// NotifyCustom.js
	alert("Session Invalid!");
	window.location.replace(getPresentationLayerAddress() + "/index.html");
}

// Populate Profile
$(function() {
	$("#patientName").append(
			"Welcome back, " + $.session.get("patientName") + "!");
});

// Logout To destroy Sessions
function patientlogout() {
	alert("Please Wait while you are been Logged out!");
	$.session.clear();
	localStorage.clear();
	// showNotification('bg-yellow', 'Please Wait while you are been Logged
	// out!', 'up', 'right', 'animated bounceOutDown', 'animated
	// bounceInDown');//NotifyCustom.js
	// setTimeout(function() {
	window.location.replace(getPresentationLayerAddress() + "/index.html")
	// }, 2000);

}