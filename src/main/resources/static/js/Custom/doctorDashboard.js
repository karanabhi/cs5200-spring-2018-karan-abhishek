//Check Session First
if (!$.session.get("doctorId")) {
	alert("Session Invalid!");
	// showNotification('bg-red', 'Session Invalid!', 'up', 'right',
	// 'animated bounceOutDown', 'animated bounceInDown');// NotifyCustom.js
	window.location.replace(getPresentationLayerAddress() + "/index.html");
}

// Populate Profile
$(function() {
	$("#profileName").append(
			"Welcome back, Dr. " + $.session.get("doctorName") + "!");
});

// Logout To destroy Sessions
function doctorlogout() {
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
