//const { default: Backdrop } = require("../lib/MDB5/src/js/bootstrap/src/util/backdrop");

var usName;
var endD;
var startD;
var storyId;
var projectId;
var projectName;

function showDetailView(usid, pid, pname) {
    // UserStory Popup

    /*
     * document.getElementById("storyTitleInput").value = usname;
    document.getElementById("storyDescriptionInput").innerHTML = desc;
    document.getElementById("storyStartDate").value = startDate;
    document.getElementById("storyEndDate").value = endDate;
    document.getElementById("storyState").value = state;
    document.getElementById("storyId").value = usid;
    */

    projectId = pid;
    projectName = pname;

    var data = {
        userStoryid: usid,
        projectId: pid,
    };

    $.ajax({
        type: "POST",
        url: "/userstory/GetUserStory",
        data: data,
        success: function (result) {

            var startD = result.us.startDate.substring(0, 10);
            var endD = result.us.endDate.substring(0, 10);

            document.getElementById("storyTitleInput").value = result.us.name;
            document.getElementById("userStoryTitle").innerHTML = result.us.name;
            usName = result.us.name;
            document.getElementById("storyDescriptionInput").innerHTML = result.us.description;
            document.getElementById("storyStartDate").value = startD;
            document.getElementById("storyEndDate").value = endD;
            dateChange();
            document.getElementById("storyState").value = result.us.state;
            document.getElementById("storyId").value = result.us.id;
            document.getElementById("userStoryId").value = result.us.id;
            document.getElementById("storyIdDel").value = result.us.id;

            document.getElementById("finishedCheckedInput").value = result.us.state;
            if (result.us.state == 2) {
                document.getElementById("modalCheckIcon").classList.add("text-success");
                document.getElementById("modalCheckButton").classList.remove("btn-outline-black");
                document.getElementById("modalCheckButton").classList.add("btn-outline-success");
                document.getElementById("progressIcon").style.color = "green";
            }

            document.getElementById("modal-overdue").style.width = document.getElementById("overdue" + result.us.id).style.width;
            document.getElementById("modal-finished").style.width = document.getElementById("finished" + result.us.id).style.width;
            document.getElementById("modal-estimated").style.width = document.getElementById("estimated" + result.us.id).style.width;

            storyId = result.us.id;

            var text = "";

            result.allUserstoryIdentities.forEach(user => text += "<div class=\"employee d-flex justify-content-around rounded-8 mx-1 my-auto\">" +
                "<button type=\"submit\" class=\"btn btn-link text-black btn-floating\" disabled>" +
                "<i class=\"fas fa-times\" style=\"font-size: 1.5em;\"></i>" +
                "</button>" +
                "<h6 class=\"my-auto mx-1 text-black\">" + user.userName + "</h6>" +
                "<button type=\"button\" onclick=\"deleteUserStoryUser('" + user.id + "'," + usid + ")\" class=\"btn btn-link text-black bg-transparent btn-floating\">" +
                "<i class=\"fas fa-times\" style=\"font-size: 1.5em;\"></i>" +
                "</button>" +
                "</div>"
            );

            var text2 = "";

            result.allUser.forEach(user => text2 +=
                "<tr>" +
                "<th>" + user.userName + "</th>" +
                "<th>" +

                "<input class=\"form-check-input\" name=\"userCheckbox\" type=\"checkbox\" value=\"" + user.id + "\" aria-label=\"...\" />" +

                "</th>" +
                "</tr>"
            );

            
            document.getElementById("userStoryUser").innerHTML = text;
            document.getElementById("userTable").innerHTML = text2;

        }

    });



    $.ajax({
        type: "POST",
        url: "/userstory/GetFiles",
        data: data,
        success: function (uploadfiles) {

            var textFiles = "";

            uploadfiles.forEach(file => {
                textFiles +=
                    "<div class='d-flex flex-column rounded-5 m-2 p-3 filebox'>" +
                        "<div class='d-flex justify-content-center'>" +
                            "<i class='fas fa-file text-black fa-4x'></i>" +
                        "</div>" +
                "<span class='text-center my-3 text-nowrap overflow-hidden' style='width: 6rem' title='" + file.name + "'>" + file.name + "</span>" +
                        "<div class='d-flex justify-content-end mt-auto'>" +
                            "<a class='btn btn-dark btn-floating' href='javascript:;' onclick='downloadFile(" + file.id + ")' role='button'>" +
                                "<i class='fas fa-download'></i>" +
                            "</a>" +
                            "<button type='button' class='btn btn-dark btn-floating mx-2' onclick=\"deleteFileOfUserStory(" + file.id + ")\">" +
                                "<i class='fas fa-trash-alt'></i>" +
                            "</button>" +
                        "</div>" +
                    "</div>";
            });

            document.getElementById("fileDisplay").innerHTML = textFiles;


            /*
            //OLD FILE 
            //To show the Files in a table
            var textFiles = "<tr>" +
                "<th style='width:50px'>File Name</th>" +
                "<th style='width:120px'>Content Type</th>" +
                "<th style='width:80px'>Download</th>" +
                "</tr>";

            uploadfiles.forEach(file => {
                textFiles += "<tr>" +
                    "<td>" + file.name + "</td>" +
                    "<td>" + file.contentType + "</td>" +
                    "<td><a href='javascript:;' onclick='downloadFile(" + file.id + ")'>Download</a></td>" +
                    "<td><button onclick=\"deleteFileOfUserStory(" + file.id + ")\">X</button></td>" +
                    "</tr>";
            });

            document.getElementById("filesToDownloadTable").innerHTML = textFiles;
            */

        }

    });

    
    $('#infoModal').modal('show');

}

function downloadFile(fileId) {
    $("#hfFileId").val(fileId);
    $("#btnFileDownload")[0].click();
}

function deleteUserStoryUser(userId, usId) {

    var data = {
        userId: userId,
        storyId: usId,
        projectid: document.getElementById("projectId").value,
        projectName: document.getElementById("projectName").value
    };

    $.ajax({
        type: "POST",
        url: "/userstory/DeleteUserFromStory",
        data: data,
        success: function () {
            window.location.href = "/UserStory?projectid=" + document.getElementById("projectId").value + "&projectName=" + document.getElementById("projectName").value;
        }
    });
}

function deleteFileOfUserStory(fileid) {

    //console.log("ja ich bin hier");

    var data = {
        fileid: fileid
    };

    $.ajax({
        type: "POST",
        url: "/userstory/DeleteFile",
        data: data,
        success: function () {
            window.location.href = "/UserStory?projectid=" + document.getElementById("projectId").value + "&projectName=" + document.getElementById("projectName").value;

        }
    });
}

function openAddUserModal(projectId) {

    /*var data = {
        projectId: projectId,
        userStoryId: storyId,

    };

    $.ajax({
        type: "POST",
        url: "/userstory/LoadUsersFromStory",
        data: data,
        success: function () {
            document.getElementById("userStoryTitleAdd").innerHTML = usName;
            $('#infoModalAddUser').modal('show');
        }
    });*/
    $('#infoModalAddUser').modal('show');

}
function openDelUserStoryModal(projectId) {
    $('#delUserStoryModal').modal('show'); 
}


$(document).ready(function () {
    $('#infoModal').on('hidden.bs.modal', function (e) {
        $('#editForm').submit();
    });

});


function addUserToStory(userId) {


    var checkboxes = document.getElementsByName('userCheckbox');

    var checkedElements = [];

    for (k = 0; k < checkboxes.length; k++) {
        if (checkboxes[k].checked) {
            checkedElements.push(checkboxes[k].value);
        }
    }


    var data = {
        checkboxes: checkedElements,
        userstoryId: storyId,
    };

    $.ajax({
        type: "POST",
        url: "/userstory/AddUserToStory",
        data: data,
        success: function () {
            window.location.href = "/UserStory?projectid=" + document.getElementById("projectId").value + "&projectName=" + document.getElementById("projectName").value;

        }
    });

}


function dateChange() {
    var infoModalCloseBtn = document.getElementById("infoModalCloseBtn");
    var help = document.getElementById("storyStartDate").value.split('-');
    var startDDate = new Date(help[0], help[1] - 1, help[2]);
    help = document.getElementById("storyEndDate").value.split('-');
    var endDDate = new Date(help[0], help[1] - 1, help[2]);

    if (startDDate <= endDDate) {
        startD = document.getElementById("storyStartDate").value;
        endD = document.getElementById("storyEndDate").value;
        changeProgressBar(startDDate, endDDate);
        infoModalCloseBtn.disabled = false;
        document.getElementById("infoTextDate").hidden = true;
    } else {
        infoModalCloseBtn.disabled = true;
        document.getElementById("infoTextDate").hidden = false;
        
    }
}

function changeProgressBar(startDDate, endDDate) {

    document.getElementById("modal-finished").style.width = "0%";
    document.getElementById("modal-overdue").style.width = "0%";
    document.getElementById("modal-estimated").style.width = "0%";

    var currentDDate = new Date();

    if (!document.getElementById("modalCheckIcon").classList.contains("text-success")) {
        document.getElementById("progressIcon").style.color = "";
        if (currentDDate > startDDate) {
            const diffCurrentTime = Math.abs(currentDDate - startDDate);
            const diffTime = Math.abs(endDDate - startDDate);
            if (endDDate < currentDDate) {
                document.getElementById("modal-overdue").style.width = "100%";
            } else {
                document.getElementById("modal-estimated").style.width = diffCurrentTime / diffTime * 100 + "%";
            }
        }
        //const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    } else {
        document.getElementById("progressIcon").style.color = "green";
        document.getElementById("modal-finished").style.width = "100%";
    }



    var data = {
        userStoryid: document.getElementById('storyId').value,
    };

    $.ajax({
        type: "POST",
        url: "/userstory/GetUserStory",
        data: data,
        success: function (userStory) {

        }
    });
}

function setAspFinishedChecked() {
    if (document.getElementById("modalCheckIcon").classList.contains("text-success")) {
        document.getElementById("finishedCheckedInput").value = 0;
        document.getElementById("modalCheckIcon").classList.remove("text-success");
        document.getElementById("modalCheckButton").classList.remove("btn-outline-success");
        document.getElementById("modalCheckButton").classList.add("btn-outline-black");
    } else {
        document.getElementById("finishedCheckedInput").value = 2;
        document.getElementById("modalCheckIcon").classList.add("text-success");
        document.getElementById("modalCheckButton").classList.remove("btn-outline-black");
        document.getElementById("modalCheckButton").classList.add("btn-outline-success");
    }
    dateChange();
}

function validateCreateUserStory() {
    var submitBtn = document.getElementById("storySubmitInputDummy");
    var infoTextDateDummy = document.getElementById("infoTextDateDummy");

    const start = document.getElementById("storyStartDateDummy").value;
    const end = document.getElementById("storyEndDateDummy").value;
    const startDate = new Date(start);
    const endDate = new Date(end);

    //alert(startDate);
    //alert(!isNaN(endDate));

    if (!isNaN(startDate) && !isNaN(endDate)) {
        if (startDate > endDate) {
            submitBtn.disabled = true;
            infoTextDateDummy.style.visibility = "visible";
        } else {
            submitBtn.disabled = false;
            infoTextDateDummy.style.visibility = "hidden";
        }
    } else {
        submitBtn.disabled = true;
        //infoTextDateDummy.style.visibility = "visible";
    }
}

function resetCreateModal() {
    document.getElementById("storyTitleInputDummy").value = "";
    document.getElementById("storyStartDateDummy").value = "";
    document.getElementById("storyEndDateDummy").value = "";
    document.getElementById("storyDescriptionInputDummy").value = "";
    document.getElementById("infoTextDateDummy").style.visibility = "hidden";;
}