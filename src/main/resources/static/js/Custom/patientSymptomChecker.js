//window.token = "";
var chance = 1;
$(function() {
	//window.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImthcmFuLmFAaHVza3kubmV1LmVkdSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMjkwOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOC0wMi0yNSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTI0MjIwODEyLCJuYmYiOjE1MjQyMTM2MTJ9.aPI_t8a_lNWhRQrvhhUPk2iD6-l7Isk05gjiYpJx4QE&language=en-gb&format=json";
	$("#patientDiagnosisCard").hide();
	getAllSymptoms();
});

function getAllSymptoms() {
	$.ajax({
		url : getSandboxAPIAddress() + "symptoms?token=" + window.token,
		type : "GET",
		success : function(result) {
			$("#patientSymptomDropdown").empty();
			for (i = 0; i < result.length; i++) {
				$("#patientSymptomDropdown").append(
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
	var str = "";
	var ids = "";
	$("#patientSymptomDropdown option:selected").each(function() {
		str += "{ " + $(this).text() + " } &nbsp;&nbsp;&nbsp;";
		ids += $(this).val() + ","
	});
	ids = ids.substring(0, ids.length - 1);
	$("#symptomsSelected").html(str);

	getDiagnosis(ids);
}

function getDiagnosis(ids) {
	$.ajax({
		url : getSandboxAPIAddress() + "diagnosis?symptoms=[" + ids
				+ "]&gender=" + $.session.get("patientGender")
				+ "&year_of_birth="
				+ $.session.get("patientDob").substring(0, 4) + "&token="
				+ window.token,
		type : "GET",
		success : function(result) {
			populateDiagnosisTable(result);
		},
		error : function(result) {
			alert('Error in serving Diagnosis request: ' + result);
		}
	});
}

function populateDiagnosisTable(result) {
	$('#patientDiagnosisTable > tbody').empty();
	$("#patientDiagnosisCard").show();
	var trHTML = "<tbody>";

	for (i = 0; i < result.length; i++) {
		trHTML += '<tr><td>' + result[i].Issue.Name + '</td><td>'
				+ result[i].Issue.Accuracy + '</td><td>'
				+ result[i].Issue.ProfName + '</td><td>';
		for (j = 0; j < result[i].Specialisation.length; j++) {
			trHTML += "{ " + result[i].Specialisation[j].Name
					+ " } &nbsp;&nbsp;&nbsp;"
		}
		trHTML += '</td></tr>';
	}// For loop ends

	trHTML += "</tbody>";
	$('#patientDiagnosisTable').append(trHTML);
	if (chance == 1) {
		$('#patientDiagnosisTable').DataTable({
			dom : 'Bfrtip',
			responsive : true,
			buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
			ordering : true
		});
		chance = chance + 1;
	} // else {
	// $('#patientDiagnosisTable').DataTable().ajax.reload();
	// }
}
