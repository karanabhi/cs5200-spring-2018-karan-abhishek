$(document).ready(function () {
	$('#technology').prop('readonly', true);

	$('#submitBtn').focus();

	//Call Batch Data
	GetbatchData();

	//Call Technical Stack
	GetTechnicalTags();
});

//Counter Technology Limit
var counter = 1;

//Get Batch Data
function GetbatchData() {
	$.ajax({
		url: getCoreLayerAddress() + "/Batches/GetAllBatches",
		type: "GET",
		success: function (result) {

			var dropdownData = "";
			//Batch Dropdown
			for (i = 0; i < result.length; i++) {
				dropdownData += '<option value="' + result[i].Id + '">' + result[i].BatchName + '</option>';
			}//For loop ends

			$("#batchdropdown").append(dropdownData);

			//alert("done");

		},
		error: function (result) {
			alert('Error in serving Batch Details: ' + result.responseText);
		}
	});

}

//Get Technical Stack
function GetTechnicalTags() {
	$.ajax({
		url: getCoreLayerAddress() + "/TechnicalStacks/GetAllTechnologies",
		type: "GET",
		success: function (result) {

			var tags = "";
			//Technical Tags
			for (i = 0; i < result.length; i++) {
				if (i % 5 === 0 && i !== 0) {
					tags += "<br/><br/>";
				}

				tags += '<button class="btn btn-warning waves-effect" onclick="addTechnicalTags(\'' + result[i].TechnologyName + '\')" type="submit">' + result[i].TechnologyName + '<span></span></button>&nbsp;&nbsp;';
			}//For loop ends

			tags += '<br/><br/><button class="btn btn-danger waves-effect" onclick="clearAll()" type="submit">Clear</button>&nbsp;&nbsp;';

			$("#technologyTags").append(tags);

			//alert("done");

		},
		error: function (result) {
			alert('Error in serving Technical Tags: ' + result.responseText);
		}
	});

}

function addTechnicalTags(techName) {
	if (counter <= 3) {
		$('#technology').focus();
		$('#technology').val("" + $("#technology").val().trim() + "  " + techName);
		counter++;
	}

}

function clearAll() {
	$('#technology').val("");
	counter = 1;
}

//Update Associate
function updateAsociate() {
	var assocId = $("#associateId").val();
	var assocBatchId = $("#batchdropdown").val();
	var assocLocation = $("#locaitonDropdown").val();
	var assocWorkEx = $("#workExdropdown").val();
	var assocCollegeName = $("#collegeName").val();
	var assocTechnicalStack = $("#technology").val();

	if (assocId === "" || assocBatchId === "" || assocLocation === "" || assocWorkEx === "" || assocCollegeName === "" || assocTechnicalStack === "") {
		alert("All Fields are Mandatory to fill!");
	}
	else if (assocBatchId === "null" || assocWorkEx === "null" || assocLocation === "null") {
		alert("Please Choose appropiate Batch, Work Experience and/or Location!");
	}
	else {


		$.ajax({
			url: getCoreLayerAddress() + "/Mentees/GetAssociateDatafromAssociateId?associateId=" + assocId.toUpperCase() + "",
			type: "GET",
			success: function (result) {

				if (result !== null) {
					var assocData =
				  {
				  	"Id": result.Id,
				  	"AssociateId": assocId.toUpperCase(),
				  	"BatchId": assocBatchId,
				  	"StartDate": result.StartDate,
				  	"ManagerId": result.ManagerId,
				  	"GraduateDate": result.GraduateDate,
				  	"Location": assocLocation,
				  	"Technology": assocTechnicalStack,
				  	"CollegeName": assocCollegeName,
				  	"WorkExperience": assocWorkEx,
				  	"FTETeam": result.FTETeam,
				  	"MentorId": result.MentorId,
				  	"Moderated": result.Moderated,
				  	"DelFlag": result.DelFlag,
				  	"Batch": result.Batch,
				  };

					$.ajax({
						url: getCoreLayerAddress() + "/Mentees/Edit",
						type: "POST",
						data:
							{
								"mentee": assocData
							},
						success: function (result) {
							if (result === "1") {
								alert("Thank You!");
								$("#associateId").val("");
								$("#batchdropdown").val("");
								$("#locaitonDropdown").val("");
								$("#workExdropdown").val("");
								$("#collegeName").val("");
								$("#technology").val("");
							}
							else {
								alert("Invalid Data!");
							}

						},
						error: function (result) {
							alert('Error in Updating Associate Data: ' + result.responseText);
						}
					});
				}
				else {//Associate Not Found
					alert("Associate Not Found!");
				}

			},
			error: function (result) {
				alert('Error in Getting Associate Data: ' + result.responseText);
			}
		});

	}
}