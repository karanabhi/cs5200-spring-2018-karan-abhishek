// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;

var map2;
var infowindow2;

var map3;
var infowindow3;

var pos;

function initMap() {
	// 
//	if (navigator.geolocation) {
//		var location_timeout = setTimeout("geolocFail()", 10000);
//		navigator.geolocation.getCurrentPosition(function(position) {
//			clearTimeout(location_timeout);
//			pos = {
//				lat : position.coords.latitude,
//				lng : position.coords.longitude
//			};
//
//			// nearestHospitals();
//			// nearestPharmacyStores();
//			// nearestDoctors();
	//
	// }, function(error) {
	// clearTimeout(location_timeout);
	// geolocFail();
	// });
	// } else {// Northeastern University
	pos = {
		lat : 42.3398,
		lng : -71.0892
	};
	nearestHospitals();
	nearestPharmacyStores();
	nearestDoctors();
	// }
	// alert(pos);
	// nearestHospitals();
	// nearestPharmacyStores();
	// nearestDoctors();

}

function geolocFail() {
	alert("Geolocation failed to get accuracy!");
	pos = {
		lat : 42.3398,
		lng : 71.0892
	};
	nearestHospitals();
	nearestPharmacyStores();
	nearestDoctors();
}

function nearestHospitals() {
	map = new google.maps.Map(document.getElementById('map'), {
		center : pos,
		zoom : 15
	});

	infowindow = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		location : pos,
		radius : 500,
		type : [ 'hospital' ]
	}, callback);

}// nearestHospitals();

function nearestPharmacyStores() {
	map2 = new google.maps.Map(document.getElementById('map2'), {
		center : pos,
		zoom : 15
	});

	infowindow2 = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map2);
	service.nearbySearch({
		location : pos,
		radius : 500,
		type : [ 'pharmacy' ]
	}, callback2);
}// nearestPharmacyStore();

function nearestDoctors() {
	map3 = new google.maps.Map(document.getElementById('map3'), {
		center : pos,
		zoom : 15
	});

	infowindow3 = new google.maps.InfoWindow();
	var service = new google.maps.places.PlacesService(map3);
	service.nearbySearch({
		location : pos,
		radius : 500,
		type : [ 'doctor' ]
	}, callback3);

}

function callback(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map : map,
		position : place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}

function callback2(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker2(results[i]);
		}
	}
}

function createMarker2(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map : map2,
		position : place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow2.setContent(place.name);
		infowindow2.open(map2, this);
	});
}

function callback3(results, status) {
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker3(results[i]);
		}
	}
}

function createMarker3(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map : map3,
		position : place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow3.setContent(place.name);
		infowindow3.open(map3, this);
	});
}