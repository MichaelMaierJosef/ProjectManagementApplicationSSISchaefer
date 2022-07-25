
var usName;

function showDetailView(usid) {
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
    };

    $.ajax({
        type: "POST",
        url: "/userstory/GetUserStory",
        data: data,
        success: function (userStory) {

            var startD = userStory.startDate.substring(0, 10);
            var endD = userStory.endDate.substring(0, 10);

            document.getElementById("storyTitleInput").value = userStory.name;
            document.getElementById("userStoryTitle").innerHTML = userStory.name;
            usName = userStory.name;
            document.getElementById("storyDescriptionInput").innerHTML = userStory.description;
            document.getElementById("storyStartDate").value = startD;
            document.getElementById("storyEndDate").value = endD;
            document.getElementById("storyState").value = userStory.state;
            document.getElementById("storyId").value = userStory.id;
        }
    });

    $('#infoModal').modal('show');


}

function openAddUserModal() {

    document.getElementById("userStoryTitleAdd").innerHTML = usName;
    $('#infoModalAddUser').modal('show');
}

$(document).ready(function () {
    $('#infoModal').on('hidden.bs.modal', function (e) {
        $('#editForm').submit();
    });

});