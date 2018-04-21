function uploadLearningTeamExcel()
{
    var fileData = document.getElementById("frmFileUpload").files[0];

        $.ajax({            
            url: "http://localhost:57540/Uploads/UploadLearningTeamExcel/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ "uploadFile": fileData }),
            success: function (result)
            {
                //if (result === "1")
                //{
                //    alert("File Uploaded!");
                //}
                //else
                //{
                //    alert("Error: " + JSON.stringify(result));
                //}
                
                alert(JSON.stringify(result));
            },
            error: function (result) {
                alert('Error: ' + JSON.stringify(result));
            }
        });

}