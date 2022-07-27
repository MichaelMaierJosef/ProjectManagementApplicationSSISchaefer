
var usName;
var storyId;

function showDetailView(usid, pid) {
    // UserStory Popup

    /*document.getElementById("storyTitleInput").value = usname;
    document.getElementById("storyDescriptionInput").innerHTML = desc;
    document.getElementById("storyStartDate").value = startDate;
    document.getElementById("storyEndDate").value = endDate;
    document.getElementById("storyState").value = state;
    document.getElementById("storyId").value = usid;
    */

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
            document.getElementById("storyState").value = result.us.state;
            document.getElementById("storyId").value = result.us.id;
            storyId = result.us.id;

            var text = "";

            result.allUserstoryIdentities.forEach(user => text += "<div class=\"admin d-flex justify-content-around rounded-8 mx-1 my-auto\">" +
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
                "<tr>"+
                    "<th>" + user.userName + "</th>" +
                "<th>" +
                        
                        "<input class=\"form-check-input\" name=\"userCheckbox\" type=\"checkbox\" value=\"" + user.id + "\" aria-label=\"...\" />" +

                    "</th>" +
                "</tr>"
            );

            document.getElementById("userStoryUser").innerHTML = text;
            document.getElementById("userTable").innerHTML = text2;

            $('#infoModal').modal('show');

        }
    });

}

function deleteUserStoryUser(userId, usId) {

    var data = {
        userId: userId,
        storyId: usId,
    };

    $.ajax({
        type: "POST",
        url: "/userstory/DeleteUserFromStory",
        data: data,
        success: function () {
            window.location.href = window.location.href;
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

    document.getElementById("userStoryTitleAdd").innerHTML = usName;

    $('#infoModalAddUser').modal('show');

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
            window.location.href = window.location.href;

        }
    });

}