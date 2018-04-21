//$(document).ready(function () {
getBlogs();
function getBlogs() {

	$.ajax({
		url : getPresentationLayerAddress() + "/api/v1/blog/doctor/"
				+ $.session.get("doctorId"),
		type : "GET",
		success : function(result) {
			var trHTML = "<tbody>";

			// MailData Table
			for (i = 0; i < result.length; i++) {
				trHTML += '<tr><td>' + result[i].title + '</td><td>'
						+ result[i].body + '</td><td>' + result[i].Timestamp
						+ '</td></tr>';
			}// For loop ends

			trHTML += "</tbody>";
			//$('#blogsTable tbody').remove();
			$('#blogsTable').append(trHTML);

			//if (!$('#blogsTable').DataTable()) {
				$('#blogsTable').DataTable({
					dom : 'Bfrtip',
					responsive : true,
					buttons : [ 'copy', 'csv', 'excel', 'pdf', 'print' ],
					ordering : true
				});
			//}

		},
		error : function(result) {
			alert('Error in serving Blogs request' + result);
		}
	});
}
// });
