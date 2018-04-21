function GetTemplateData(tempId)
{
    if (tempId === "null" || tempId==="") {
        alert("Select a valid Template name");
    } else {
        $.ajax({
            //url: "http://localhost:57540/TemplateMasters/getTemplate/" + tempId + "/",
            url: getCoreLayerAddress()+"/TemplateMasters/getTemplate/" + tempId + "/",
            type: "GET",
            corsEnable: "true",
            success: function (result)
            {
                $("#body").html(result.TemplateData);                                
            },
            error: function (result) {
                alert('Error in getting templates: ' + result);
            }
        });
    }//if-else
}

//function GetBatchData(batchId) {
//    if (batchId == "null") {
//        alert("Select a valid Batch Name");    
//    } else {
//        alert("Batch Id:"+batchId);


    //    $.ajax({
//        url: "http://localhost:57540/TemplateMasters/getTemplate/" + batchId + "/",
    //        type: "GET",
    //        corsEnable: "true",
    //        success: function (result) {
    //            $("#body").html(result.TemplateData);
    //        },
    //        error: function (result) {
    //            alert('Error in getting templates: ' + result);
    //        }
        //    });
    //}//if-else
//}

//Checkbox selection for input TO data
//function fillTextboxes()
//{
   
//        var selects = "";
//        $(':checkbox:checked').each(function (i) {   
//            selects += $(this).val() + ";";   
//        });
//        $("#to").html(selects.substring(0,selects.length-1));
//    //});
//}