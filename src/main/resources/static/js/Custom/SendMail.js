function sendMail() {    
    //var from = $('#from').val();
    var from = "";
    from=$.session.get("AssociateEmailId");  
    var sig=document.getElementById("signature").innerHTML;    
    var body = $('#body').val();
    var subj = $('#subject').val();
    var templateId = $('option:selected').val();

    //alert(templateId);

    if (from === "" || subj === "" || body === "" || templateId === null || templateId === ""||templateId==="null")
    {
        alert("Please fill From, Subject, Template and Email Body correctly!");
    }
      else
    {
        alert('Sending Mails!');               

        var mailObj = {
            "To": "",
            "From": from,
            "EmailSubject": subj,
            "EmailBody": body,
            "TemplateId":templateId
        };        

        var values = new Array();
        var to = "";
        var temp = "0";

        $.each($("tbody").find('tr'), function () {

            if ($(this).find("td:eq(3)").find("input[name='selector[]']").prop('checked')) {
                to += $(this).find('td:eq(3)').text().trim() + ";";
                temp = "1";                
            }
            if ($(this).find("td:eq(7)").find("input[name='selector[]']").prop('checked')) {           
                to += $(this).find('td:eq(7)').text().trim() + ";";
                temp = "1";           
            }         
            

            if (temp === "1") {
                to = to.substring(0, to.length - 1);
                values.push({
                    To: to,
                    MenteeId: $(this).find('td:eq(0)').text().trim(),
                    MenteeFirstName: $(this).find('td:eq(1)').text().trim(),
                    MenteeLastName: $(this).find('td:eq(2)').text().trim(),
                    MenteeEmailId: $(this).find('td:eq(3)').text().trim(),
                    ManagerId: $(this).find('td:eq(4)').text().trim(),
                    ManagerFirstName: $(this).find('td:eq(5)').text().trim(),
                    ManagerLastName: $(this).find('td:eq(6)').text().trim(),
                    ManagerEmailId: $(this).find('td:eq(7)').text().trim(),
                    Signature: sig
                });

            }//if checkbox is checked
            temp = "0";
            to = "";
        });//tr loop ends

        //var new1 = "";
        //for (var i = 0; i = values.length; i++) {
        //    new1 += ""+values[i].To + "\n" + values[i].MenteeId + "\n" + values[i].MenteeFirstName + "\n" + values[i].MenteeLastName + "\n" + values[i].MenteeEmailId + "\n" + values[i].ManangerId
        //        + "\n" + values[i].ManagerFirstName + "\n" + values[i].ManagerLastName + "\n" + values[i].ManagerEmailId;
        //}
        //alert(JSON.stringify(values));


        $.ajax({            
            //url: "http://localhost:57540/Emails/SendTemplateEmail/",
            url: getCoreLayerAddress()+"/Emails/SendTemplateEmail/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ mailObject: mailObj, tempBodyObject: values }),
            success: function (result)
            {
                if (result === "1")
                {
                    //alert("Mail(s) Sent");
                    //Fancy Notification
                    showNotification('bg-teal', 'Mail(s) Sent!', 'bottom', 'center', 'animated rotateInUpLeft', 'animated rotateOutUpLeft');//NotifyCustom.js
                    
                } else {
                    alert("Error :"+result);
                }
              
            },
            error: function (result) {
                alert('Error: ' + JSON.stringify(result));
            }
        });
    }//if-else    
}

function sendInvite() {
       
    var from = $.session.get("AssociateEmailId");
    var sig = document.getElementById("signature").innerHTML;
    var body = $('#body').val();
    var subj = $('#subject').val();
    var loc = $('#location').val();
    var templateId = $('option:selected').val();
    var startDT = $('#datetimepickerStart').val();
    var endDT = $('#datetimepickerEnd').val();

    //alert(startDT+"\n"+endDT);

    if (from === "" || subj === "" || body === "" || loc === "" || templateId === null || templateId==="null"|| templateId==="" || startDT==="" || endDT==="")
    {
        alert("Please fill all the fields correctly!");
    }
    else
    {
        alert('Sending Invites!');

        var inviteObj = {
            "To": "",
            "From": from,
            "InviteSubject": subj,
            "InviteBody": body,
            "EventLocation": loc,
            "TemplateId": templateId,
            "EventStartDateTime": startDT,
            "EventEndDateTime":endDT
        };

        var values = new Array();
        var to = "";
        var temp = "0";

        $.each($("tbody").find('tr'), function () {

            if ($(this).find("td:eq(3)").find("input[name='selector[]']").prop('checked')) {
                to += $(this).find('td:eq(3)').text().trim() + ";";
                temp = "1";
            }
            if ($(this).find("td:eq(7)").find("input[name='selector[]']").prop('checked')) {
                to += $(this).find('td:eq(7)').text().trim() + ";";
                temp = "1";
            }


            if (temp === "1") {
                to = to.substring(0, to.length - 1);
                values.push({
                    To: to,
                    MenteeId: $(this).find('td:eq(0)').text().trim(),
                    MenteeFirstName: $(this).find('td:eq(1)').text().trim(),
                    MenteeLastName: $(this).find('td:eq(2)').text().trim(),
                    MenteeEmailId: $(this).find('td:eq(3)').text().trim(),
                    ManagerId: $(this).find('td:eq(4)').text().trim(),
                    ManagerFirstName: $(this).find('td:eq(5)').text().trim(),
                    ManagerLastName: $(this).find('td:eq(6)').text().trim(),
                    ManagerEmailId: $(this).find('td:eq(7)').text().trim(),
                    Signature: sig
                });

            }//if checkbox is checked
            temp = "0";
            to = "";
        });//tr loop ends
        
        $.ajax({
            //url: "http://localhost:57540/Invites/SendTemplateInvite/",
            url: getCoreLayerAddress()+"/Invites/SendTemplateInvite/",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ inviteObject: inviteObj, tempBodyObject: values }),
            success: function (result)
            {
                if (result === "1") {

                    //alert("Invite(s) Sent");
                    //Fancy Notification
                    showNotification('bg-teal', 'Invite(s) Sent', 'bottom', 'center', 'animated rotateInUpLeft', 'animated rotateOutUpLeft');//NotifyCustom.js

                } else {
                    alert("Error :" + JSON.stringify(result));
                }                
            },
            error: function (result) {
                alert('Error: ' + result);
            }
        });
    }//if-else    

    
}

