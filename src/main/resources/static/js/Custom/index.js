window.token
$(function() {
	$("#anonymousIssueSelected").hide();
	getAllIssues();
});

function getAllIssues() {
	$.ajax({
		url : getSandboxAPIAddress() + "issues?token=" + getToken(),
		type : "GET",
		success : function(result) {
			$("#anonymousIssuesDropdown").empty();
			$("#anonymousIssuesDropdown").append(
					"<option>----- SELECT ISSUE -----</option>");
			for (i = 0; i < result.length; i++) {
				$("#anonymousIssuesDropdown").append(
						'<option id="' + result[i].ID + '" value="'
								+ result[i].ID + '">' + result[i].Name
								+ '</option>');
			}// For loop ends
			$('.selectpicker').selectpicker('refresh');
		},
		error : function(result) {
			alert('Error in serving Issues request: ' + result);
		}
	});
}

function showAnonymousIssues() {
	var id = $("#anonymousIssuesDropdown option:selected").val();
	getIssueById(id);
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
	$('#anonymousIssueSelected').text("");
	$("#anonymousIssueSelected").show();
	var str = "Name:\n" + result.Name + "\n\nShort Description:\n"
			+ result.DescriptionShort + "\n\nLong Description:\n"
			+ result.Description + "\n\nPossible Symptoms:\n"
			+ result.PossibleSymptoms + "\n\nTreatment Description:\n"
			+ result.TreatmentDescription + "\n\nMedical Condition:\n"
			+ result.MedicalCondition;

	$('#anonymousIssueSelected').text(str);
}
