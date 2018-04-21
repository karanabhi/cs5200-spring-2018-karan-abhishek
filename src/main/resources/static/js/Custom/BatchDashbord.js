$(document).ready(function () {
    //Batch Start Date Format
    $("#batchStartDate").bootstrapMaterialDatePicker({ format: 'DD MMMM YYYY' });

    //Hide Edit Card
    hideCard('editBatchCard');

    //Populate Batch Status
    GetBatchStatus(0);

});

//Focus Dom Elements
function focusDom(dom)
{
    $("#"+dom+"").focus();
}

//Hide Edit Card
function hideCard(dom)
{
    //Hide Edit
    $("#"+dom+"").hide();
}



//Get Batch Status
function GetBatchStatus(dTable) {

    $.ajax({
        url: getCoreLayerAddress() + "/Batches/GetBatchStatus",
        type: "GET",
        success: function (result) {

            var trHTML = "";

            if (dTable === 0)//On first load
            {
                trHTML = "<tbody>";
            }
            else
            {
                $('#batchStatusTable > tbody').empty();
                trHTML = "<tbody>";
            }
                      
            //MailData Table       
            for (i = 0; i < result.length; i++)
            {
                trHTML += '<tr><td>' + result[i].BatchName + '</td><td>' + result[i].BatchStartDate.substring(0, 10) + '</td><td>' + result[i].BatchIteration
                    + '</td><td>' + result[i].BatchWeek + '</td><td>' +'<div id="chartdiv['+i+']" style="width: 400px; height: 200px;"></div></td><td>'
                    + result[i].BatchStrength
                    //+ '<div style="display:inline;width:135px;height:135px;"><canvas width="135" height="135"></canvas>'
                    //+ '<input type="text" class="knob" data-skin="tron" value="25" data-width="135" data-height="135" data-thickness="0.2" data-fgcolor="#F44336" style="width: 71px; height: 45px; position: absolute; vertical-align: middle; margin-top: 45px; margin-left: -103px; border: 0px; background: none; font-style: normal; font-variant: normal; font-weight: bold; font-stretch: normal; font-size: 27px; line-height: normal; font-family: Arial; text-align: center; color: rgb(244, 67, 54); padding: 0px; -webkit-appearance: none;"></div>'                    
                    + '</td><td><button type="button" onclick="populateUpdateBatchData(\' ' + result[i].Id + '\',\'' + result[i].BatchCreationDate + '\')" class="btn btn-warning btn-circle waves-effect waves-circle waves-float"><i class="material-icons">edit</i></button>'
                    + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onclick="deleteBatch(' + result[i].Id + ')" class="btn btn-danger btn-circle waves-effect waves-circle waves-float"><i class="material-icons">delete_forever</i></button></td></tr>';
            }//For loop ends
            
            if (dTable === 0)
            {//On First Load

                trHTML += "</tbody>";
                $('#batchStatusTable').append(trHTML);

                $('#batchStatusTable').DataTable({
                    dom: 'Bfrtip',
                    responsive: true,
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ],
                    ordering: true,                    
                });

            }
            else
            {
                trHTML += "</tbody>";
                $('#batchStatusTable').append(trHTML);
            }

            //Draw Chart
            for (i = 0; i < result.length; i++)
            {
                if (result[i].BatchStrength === 0)//if strength === 0 then do not draw the graph
                {
                    $('#chartdiv[' + i + ']').append("Not enough Data to draw a graph!");
                    //alert(i);
                }
                else {
                    drawchart(result[i], i);
                }
            }


        },
        error: function (result) {
            alert('Error in serving Batch Status Request: ' + result);
        }
    });

}

//Create Batch
function createBatch()
{
    var bname = $("#batchName").val();
    var bStartDate = $("#batchStartDate").val();
    var bDesc = $("#batchDescrip").val();

    if(bname===""||bStartDate==="")
    {
        alert("Please Fill Batch Name and Batch Start Date!");
    }
    else
    {

        var batchData =
        {
            "BatchName": bname,
            "StartDate": bStartDate,
            "BatchDescription": bDesc
        };

        $.ajax({
            url: getCoreLayerAddress() + "/Batches/Create",
            type: "POST",
            data:
                {
                    "batch": batchData
                },
            success: function (result)
            {
                if (result === "1")
                {
                    //alert("Batch successfully Created!");

                    //Fancy Notification
                    showNotification('bg-orange', 'Batch successfully Created!', 'bottom', 'center', 'animated rotateIn', 'animated rotateOut');//NotifyCustom.js

                    $("#batchName").val("");
                    $("#batchStartDate").val("");
                    $("#batchDescrip").val("");
                    GetBatchStatus(1);
                }
                else
                {
                    alert("Something went wrong!. Batch Not Created");
                }
                
            },
            error: function (result)
            {
                alert('Error in Creating Batch: ' + result);
            }
        });
    }

}

//Delete Batch
function deleteBatch(batchId)
{
    if (batchId === "")
    {
        alert("Cannot Delete this Batch!");
    }
    else
    {
        $.ajax({
            url: getCoreLayerAddress() + "/Batches/Delete?id="+batchId+"",
            type: "GET",           
            success: function (result) {
                if (result === 1) {

                    //Fancy Notification
                    showNotification('bg-green', 'Batch successfully Deleted!', 'bottom', 'center', 'animated rotateIn', 'animated rotateOut');//NotifyCustom.js

                    //alert("Batch successfully Deleted!");
                    GetBatchStatus(1);
                }
                else
                {
                    alert("Something went wrong!. Batch Cannot be deleted!");
                }

            },
            error: function (result) {
                alert('Error in Deleting Batch: ' + result);
            }
        });
    }
}

//Populate Update Batch Data
function populateUpdateBatchData(batchId,createDate) {
    if (batchId === "")
    {
        alert("Cannot Populate this Batch Data!");
    }
    else {        
        $.ajax({
            url: getCoreLayerAddress() + "/Batches/GetBatchData?id="+batchId+"",
            type: "GET",
            success: function (result) {                
          
                $("#editBatchCard").show();
                //Populating Update Data Fields
                $("#updateBatchName").val(result.BatchName);
                $("#updateBatchStartDate").val(result.StartDate.substring(0, 10));
                $("#updateBatchDescrip").val(result.BatchDescription);
                focusDom("updateBtn");
                $("#updateBtn").attr('onclick', 'updateBatch(\''+batchId+'\',\''+createDate+'\')');

            },
            error: function (result) {
                alert('Error in serving Batch Update Data: ' + result);
            }
        });
    }
}

//Update Batch
function updateBatch(batchId,createDate) {
    var Ubname = $("#updateBatchName").val();
    var UbStartDate = $("#updateBatchStartDate").val();
    var UbDesc = $("#updateBatchDescrip").val();    

    if(batchId==="")
    {
        alert("Cannot Edit this Batch!");
    }
    else if (Ubname === "" || UbStartDate === "")
    {
        alert("Please Fill Batch Name and Batch Start Date!");
    }
    else {        
        var UbatchData =
        {
            "Id":batchId,
            "BatchName": Ubname,
            "StartDate": UbStartDate,            
            "CreationDate":createDate,
            "BatchDescription": UbDesc
        };

        $.ajax({
            url: getCoreLayerAddress() + "/Batches/Edit",
            type: "POST",
            data:
                {
                    "batch": UbatchData
                },
            success: function (result) {
                if (result === "1") {

                    //Fancy Notification
                    showNotification('bg-blue', 'Batch successfully Edited!', 'bottom', 'center', 'animated rotateIn', 'animated rotateOut');//NotifyCustom.js

                    //alert("Batch successfully Edited!");
                    $("#updateBatchName").val("");
                    $("#updateBatchStartDate").val("");
                    $("#updateBatchDescrip").val("");                    
                    hideEditCard();
                    GetBatchStatus(1);
                }
                else {
                    alert("Something went wrong!. Batch Not Edited");
                }

            },
            error: function (result) {
                alert('Error in Updating Batch: ' + result);
            }
        });
    }

}

//Get All batch Names
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

            $("#batchdropdown").empty();//clear dropdown
            $("#batchdropdown").append('<option value="null">---- Select Batch ----</option>');
            $("#batchdropdown").append(dropdownData);
            focusDom('batchdropdown');

        },
        error: function (result) {
            alert('Error in serving Batch Details: ' + result.responseText);
        }
    });
}

//BatchID Selection from Dropdown
$("#batchdropdown").change(function () {
    batchInsightsCall($("#batchdropdown").val());
});

//Draw Batch Status chart
function drawchart(dataValues,rowId)
{
    // Callback that creates and populates a data table,  
    // instantiates the pie chart, passes in the data and  
    // draws it.  

  
//    google.charts.setOnLoadCallback(drawChart);


    var data = google.visualization.arrayToDataTable([
          ['Batch Status', 'Assoiciates Count'],
          ['Graduated Associates', dataValues.BatchGraduatedStrength],
          ['Current Associates', (dataValues.BatchStrength - dataValues.BatchGraduatedStrength)]
    ]);

    var options = {
        title: 'Graduation Status',
        is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('chartdiv[' + rowId + ']'));

    chart.draw(data, options);

}

//Batch Insights Chart API Calls
function batchInsightsCall(batchId)
{
    if (batchId === "" || batchId===null || batchId==="null") {
        alert("Please Choose an Appropiate Batch!");
    }
    else {

        //Batch WorkEx Chart
        $.ajax({
            url: getCoreLayerAddress() + "/Mentees/BatchWorkExChart?id=" + batchId + "",
            type: "GET",
            success: function (result)
            {
                if (result.length===0) {
                    alert("Not enought data to draw charts!");
                }
                else {
                    var data;
                    if (result.length === 1) {
                        data = google.visualization.arrayToDataTable([
                  ['Associate Work Experience', 'Associate Count'],
                      [result[0].WorkEx, result[0].Count]                      
                        ]);
                    } else if (result.length === 2) {
                        data = google.visualization.arrayToDataTable([
                     ['Associate Work Experience', 'Associate Count'],
                         [result[0].WorkEx, result[0].Count],
                         [result[1].WorkEx, result[1].Count]
                        ]);                     
                    } else if (result.length === 3) {
                        data = google.visualization.arrayToDataTable([
                     ['Associate Work Experience', 'Associate Count'],
                         [result[0].WorkEx, result[0].Count],
                         [result[1].WorkEx, result[1].Count],
                         [result[2].WorkEx, result[2].Count]
                        ]);
                    }
                   
                    var options = {
                        title: 'Batch Work Experience Status',
                        bar: { groupWidth: "25%" },
                        legend: 'bottom',
                        vAxes: {
                            // Adds titles to each axis.
                            0: { title: 'Associate Count' }                            
                        },
                        hAxes: {
                            // Adds titles to each axis.
                            0: { title: ' Work Experience (Years)' }
                        }

                    };
                    $("#batchWorkExChart").empty();//clear div
                    var chart = new google.visualization.ColumnChart(document.getElementById('batchWorkExChart'));

                    chart.draw(data, options);

                    //Fancy Notification
                    showNotification('bg-purple', 'Work Experience Chart Created!', 'top', 'right', 'animated ZoomIn', 'animated ZoomOut');//NotifyCustom.js

                }
            },
            error: function (result) {
                alert('Error in serving Batch  WorkEx Chart: ' + result);
            }
        });

        //Batch Location Chart
        $.ajax({
            url: getCoreLayerAddress() + "/Mentees/BatchLocationChart?id=" + batchId + "",
            type: "GET",
            success: function (result) {
               
                if (result.length === 0) {
                    alert("Not enought data to draw charts!");
                }
                else {
                    var data;

                    if (result.length === 1)
                    {
                        data = google.visualization.arrayToDataTable([
                     ['Associate Location', 'Associate Count'],
                     [result[0].Location, result[0].Count]         
                        ]);
                    } else if (result.length === 2)
                    {
                        data = google.visualization.arrayToDataTable([
                     ['Associate Location', 'Associate Count'],
                     [result[0].Location, result[0].Count],
                     [result[1].Location, result[1].Count],                     
                        ]);
                    } else if (result.length === 3)
                    {
                        data = google.visualization.arrayToDataTable([
                     ['Associate Location', 'Associate Count'],
                     [result[0].Location, result[0].Count],
                     [result[1].Location, result[1].Count],
                     [result[2].Location, result[2].Count]
                        ]);
                    }
                    
                    var options = {
                        title: 'Batch Location Status',
                        is3D: true
                    };

                    $("#batchLocationChart").empty();//clear div

                    var chart = new google.visualization.PieChart(document.getElementById('batchLocationChart'));

                    chart.draw(data, options);

                    //Fancy Notification
                    showNotification('bg-black', 'Batch Location Chart Created!', 'top', 'right', 'animated ZoomIn', 'animated ZoomOut');//NotifyCustom.js
                }
            },
            error: function (result) {
                alert('Error in serving Batch Location Chart: ' + result);
            }
        });

    }
}

