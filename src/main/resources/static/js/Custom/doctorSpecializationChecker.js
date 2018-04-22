var chance = 0;
var flag = "";
$(function() {
	$("#doctorSpecializationTableCard").hide();
	getAllSymptoms();
});

function hideCard(id) {
	$("#" + id).hide();
}

function getAllSymptoms() {
	$.ajax({
		url : getSandboxAPIAddress() + "symptoms?token=" + getToken(),
		type : "GET",
		success : function(result) {
			$("#doctorSymptomDropdown").empty();
			for (i = 0; i < result.length; i++) {
				$("#doctorSymptomDropdown").append(
						'<option id="' + result[i].ID + '" value="'
								+ result[i].ID + '">' + result[i].Name
								+ '</option>');
			}// For loop ends
			$('.selectpicker').selectpicker('refresh');
		},
		error : function(result) {
			alert('Error in serving Symptoms request: ' + result);
		}
	});
}

function showSymptoms() {
	var ids = "";
	$("#doctorSymptomDropdown option:selected").each(function() {
		ids += $(this).val() + ",";
	});
	ids = ids.substring(0, ids.length - 1);
	getSpecializations(ids);
}

function getSpecializations(ids) {

	var gender = $('input[name=group3]:checked').val();
	var year = $('#doctor-specialization-year').val();

	if (gender === "" || year === "") {
		// Fancy Notification
		showNotification('bg-red', 'Please Enter DOB Year and select Gender!',
				'bottom', 'center', 'animated bounceInDown',
				'animated bounceOutDown');//
		return;
	}

	$.ajax({
		url : getSandboxAPIAddress() + "/diagnosis/specialisations?symptoms=["
				+ ids + "]&gender=" + gender + "&year_of_birth=" + year
				+ "&token=" + getToken(),
		type : "GET",
		success : function(result) {
			populateSpecializationsTable(result);
		},
		error : function(result) {
			alert('Error in serving Specializations request: ' + result);
		}
	});
}

function populateSpecializationsTable(result) {
	$('#doctorSpecializationTable > tbody').empty();
	$("#doctorSpecializationTableCard").show();
	var trHTML = "<tbody>";

	for (i = 0; i < result.length; i++) {
		trHTML += '<tr><td>' + result[i].Name + '</td><td>'
				+ result[i].Accuracy + '</td><tr>';
	}// For loop ends

	trHTML += "</tbody>";
	$('#doctorSpecializationTable').append(trHTML);
	if (chance == 1) {
		$('#doctorSpecializationTable').DataTable({
			dom : 'Bfrtip',
			responsive : true,
			buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
			ordering : true
		});
		chance = chance + 1;
	}
}