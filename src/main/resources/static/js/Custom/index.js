window.token
$(function() {
	window.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImthcmFuLmFAaHVza3kubmV1LmVkdSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMjkwOSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxOC0wMi0yNSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTI0MzA3MzAyLCJuYmYiOjE1MjQzMDAxMDJ9.24tXsddTFKf237kL7khorqfc5Hwl4CFEgkC7E-PNQj4&language=en-gb&format=json";
	$("#anonymousIssueSelected").hide();
	getAllIssues();
});

function getAllIssues() {
	$.ajax({
		url : getSandboxAPIAddress() + "issues?token=" + window.token,
		type : "GET",
		success : function(result) {
			$("#anonymousIssuesDropdown").empty();
			// $("#anonymousIssuesDropdown").append(
			// "<option>----- SELECT ISSUE -----</option>");
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
				+ window.token,
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
