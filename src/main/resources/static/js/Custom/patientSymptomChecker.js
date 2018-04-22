var chance = 0;
var flag = "";
$(function() {
	$("#patientPayload").css({
		"marginTop" : "-1.4em"
	});
	$("#patientPayload").text(
			"" + $.session.get("patientGender") + " | Year of Birth: "
					+ $.session.get("patientDob").substring(0, 4));
	$("#patientDiagnosisCard").hide();
	$("#patientIssueCard").hide();
	$("#patientProposedSymptomsCard").hide();
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
	var str = "Selected Symptoms: ";
	var ids = "";
	$("#patientSymptomDropdown option:selected").each(
			function() {
				ids += $(this).val() + ",";
				checkFlag($(this).val(), $(this).text());
				str += "{ " + $(this).text() + ": <span style='color:red;'>"
						+ flag + "</span> } &nbsp;&nbsp;&nbsp;";
			});
	ids = ids.substring(0, ids.length - 1);
	$("#symptomsSelected").html(str);
	getProposedSymptoms(ids);
	setTimeout(function() {
		getDiagnosis(ids);
	}, 1500);

}

function getProposedSymptoms(ids) {
	$.ajax({
		url : getSandboxAPIAddress() + "symptoms/proposed?symptoms=[" + ids
				+ "]&gender=" + $.session.get("patientGender")
				+ "&year_of_birth="
				+ $.session.get("patientDob").substring(0, 4) + "&token="
				+ getToken(),
		type : "GET",
		success : function(result) {
			if (result.length != 0) {
				populateProposedSymptomsText(result);
			}
		},
		error : function(result) {
			alert('Error in serving Proposed Symptoms request: ' + result);
		}
	});
}

function populateProposedSymptomsText(result) {
	$('#patientProposedSymptomsSelected').text("");
	$("#patientProposedSymptomsCard").show();
	var str = "";
	for (var i = 0; i < result.length; i++) {
		str += result[i].Name + ", ";
	}
	str = str.substring(0, str.length - 2);
	$('#patientProposedSymptomsSelected').text(str);
	$('#patientProposedSymptomsSelected').focus();
}

function getDiagnosis(ids) {
	$.ajax({
		url : getSandboxAPIAddress() + "diagnosis?symptoms=[" + ids
				+ "]&gender=" + $.session.get("patientGender")
				+ "&year_of_birth="
				+ $.session.get("patientDob").substring(0, 4) + "&token="
				+ getToken(),
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
		trHTML += '<tr><td>' + result[i].Issue.Name
				+ '<button class="right rm-default-btn" onclick="getIssueById('
				+ result[i].Issue.ID
				+ ')"><i class="material-icons">search</i></button></td><td>'
				+ result[i].Issue.Accuracy + '</td><td>'
				+ result[i].Issue.ProfName + '</td><td>';
		for (j = 0; j < result[i].Specialisation.length; j++) {
			trHTML += result[i].Specialisation[j].Name + ", "
		}
		trHTML = trHTML.substring(0, trHTML.length - 2);
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
	}
}

function getIssueById(id) {
	$.ajax({
		url : getSandboxAPIAddress() + "issues/" + id + "/info?token="
				+ getToken(),
		type : "GET",
		success : function(result) {
			populateIssueTextArea(result);
		},
		error : function(result) {
			alert('Error in serving an Issue request: ' + result);
		}
	});
}

function populateIssueTextArea(result) {
	$('#patientIssueSelected').text("");
	$("#patientIssueCard").show();
	var str = "Name:\n" + result.Name + "\n\nShort Description:\n"
			+ result.DescriptionShort + "\n\nLong Description:\n"
			+ result.Description + "\n\nPossible Symptoms:\n"
			+ result.PossibleSymptoms + "\n\nTreatment Description:\n"
			+ result.TreatmentDescription + "\n\nMedical Condition:\n"
			+ result.MedicalCondition;

	$('#patientIssueSelected').text(str);
	$('#patientIssueSelected').focus();

}

var str1 = "Selected Symptom: ";
function checkFlag(id, name) {
	$.ajax({
		url : getSandboxAPIAddress() + "redflag?symptomId=" + id + "&token="
				+ getToken(),
		type : "GET",
		success : function(result) {
			flag = result;
			str1 += "{ <b>" + name + "- </b><span style='color:red;'>" + flag
					+ "</span> } &nbsp;&nbsp;&nbsp;";
			$("#symptomsSelected").html("");
			$("#symptomsSelected").html(str1);
		},
		error : function(result) {
			alert('Error in serving Red flag request: ' + result);
		}
	});
}