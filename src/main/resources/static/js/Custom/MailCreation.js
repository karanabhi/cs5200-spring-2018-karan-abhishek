/// <reference path="SendMail.js" />
//$(document).ready(function () {     
        
    //Get Mail Data
    $.ajax({
        //url: "http://localhost:57540/MailDatas/GetAllMailData",
        url: getCoreLayerAddress()+"/MailDatas/GetAllMailData",
        type: "GET",
        corsEnable: "true",
        success: function (result) {
            var trHTML = "<tbody>";

            //MailData Table       
            for (i = 0; i < result.length; i++) {
                trHTML += '<tr><td>' + result[i].MenteeId + '</td><td>' + result[i].MenteeFirstName + '</td><td>' + result[i].MenteeLastName + '</td><td> <input type="checkbox" name="selector[]" id="Mentee' + i + '" class="chk-col-amber" value="' + result[i].MenteeEmailId + '" /> <label for="Mentee' + i + '">' + result[i].MenteeEmailId + '</label>'
                    + '</td><td>' + result[i].ManagerId + '</td><td>' + result[i].ManagerFirstName + '</td><td>' + result[i].ManagerLastName + '</td><td> <input type="checkbox" name="selector[]" id="Manager' + i + '" class="chk-col-purple" value="' + result[i].ManagerEmailId + '" /> <label for="Manager' + i + '">' + result[i].ManagerEmailId + '</label></td></tr>';
            }//For loop ends

            trHTML += "</tbody>";
            $('#mailTable').append(trHTML);

            $('#signature').append(result[0].Signature);
           // alert(result[0].Signature+"hrllo");
        },
        error: function (result) {
            alert('Error in serving Mail Data request' + result);
        }
    });


    //Get Signature
    $.ajax({
        //url: "http://localhost:57540/MailDatas/GetAllMailData",
        url: getCoreLayerAddress() + "/MailDatas/GetMailSignature?AssociateId=" + $.session.get("AssociateId") + "",
        type: "GET",
        corsEnable: "true",
        success: function (result) {
            
            //Signaure Data      
            if (result.AssociateId === null)
            {                
                $('#sig-fname').text($.session.get("ProfileName"));
                $('#sig-lname').text($.session.get("LastName"));
                $('#sig-email').text($.session.get("AssociateEmailId"));
            }
            else
            {
                $('#sig-fname').text(result.AssociateFirstName);
                $('#sig-lname').text(result.AssociateLastName);
                $('#sig-desig').text(result.AssociateDesignation+",");
                $('#sig-dept').text(result.AssociateDepartment);
                $('#sig-mailto').attr('href', "mailto:"+result.AssociateEmailId);
                $('#sig-email').text(result.AssociateEmailId);
                $('#sig-mob').text("| " + result.AssociateMobileNumber + " mobile");
            }
            

            //$('#signature').append(result[0].Signature);
            
        },
        error: function (result) {
            alert('Error in serving Mail Data request' + result);
        }
    });


    //Populate From Text Field from session
    $(function ()
    {
       // alert("asdas");
        $("#from").val($.session.get("AssociateEmailId"));
    });

    //Get All templates
    $.ajax({
        //url: "http://localhost:57540/TemplateMasters/getAllTemplates/",
        url: getCoreLayerAddress()+"/TemplateMasters/getAllTemplates/",
        type: "GET",
        corsEnable: "true",
        success: function (result)
        {
                   
            //Drop down            
            for (i = 0; i < result.length; i++)
            {                                      
                $("<option value='" + result[i].Id + "'>" + result[i].TemplateName + "</option>").appendTo('#tempType');
            }//For loop ends            
        },
        error: function (result) {
            alert('Error in serving Template request' + result);
        }
    });


    //Dynamic dropdown to populate template names
    $('select[name="tempType"]').change(function () {
        //var tempId = $(this).val();                
        GetTemplateData($(this).val());
    });


    /**For Batch Population*/
    //$.ajax({
//    url: "http://localhost:57540/Batches/GetAllBatches/",
    //    type: "GET",
    //    corsEnable: "true",
    //    success: function (result) {
    //        //Drop down            
    //        for (i = 0; i < result.length; i++) {
    //            $("<option value='" + result[i].Id + "'>"
    //                + result[i].BatchName + "</option>")
    //                .appendTo('#batches');
    //        }//For loop ends
    //    },
    //    error: function (result) {
    //        alert('Error in serving batch request' + result);
    //    }
    //});

    //Dynamic dropdown to populate Batch names
    //$('select[name="batches"]').change(function () {
    //    GetBatchData($(this).val());
    //});
        
    
//});