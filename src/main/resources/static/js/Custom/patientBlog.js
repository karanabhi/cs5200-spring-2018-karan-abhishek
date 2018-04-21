//$(document).ready(function () {
getAllBlogs();
function getAllBlogs() {

	$.ajax({
		url : getPresentationLayerAddress() + "/api/v1/blog",
		type : "GET",
		success : function(result) {

			var trHTML = "<tbody>";

			// MailData Table
			for (i = 0; i < result.length; i++) {
				trHTML += '<tr><td>' + result[i].title + '</td><td>'
						+ result[i].body + '</td><td>' + result[i].timestamp
						+ '</td><td>' + result[i].doctor.name + '</td></tr>';
			}// For loop ends

			trHTML += "</tbody>";
			// $('#blogsTable tbody').remove();
			$('#patientblogsTable').append(trHTML);

			// if (!$('#blogsTable').DataTable()) {
			$('#patientblogsTable').DataTable({
				dom : 'Bfrtip',
				responsive : true,
				buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
				ordering : true
			});
			// }

		},
		error : function(result) {
			alert('Error in serving Blogs request' + result);
		}
	});
}
// });
