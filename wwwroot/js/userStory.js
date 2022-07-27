var usName;
var endD;
var startD;

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

            startD = userStory.startDate.substring(0, 10);
            endD = userStory.endDate.substring(0, 10);

            document.getElementById("storyTitleInput").value = userStory.name;
            document.getElementById("userStoryTitle").innerHTML = userStory.name;
            usName = userStory.name;
            document.getElementById("storyDescriptionInput").innerHTML = userStory.description;
            document.getElementById("storyStartDate").value = startD;
            document.getElementById("storyEndDate").value = endD;
            document.getElementById("storyState").value = userStory.state;
            document.getElementById("storyId").value = userStory.id;
            document.getElementById("userStoryId").value = userStory.id;
            document.getElementById("storyIdDel").value = userStory.id;

            document.getElementById("finishedCheckedInput").value = userStory.state;
            if (userStory.state == 2) {
                document.getElementById("modalCheckIcon").classList.add("text-success");
                document.getElementById("modalCheckButton").classList.remove("btn-outline-black");
                document.getElementById("modalCheckButton").classList.add("btn-outline-success");
                document.getElementById("progressIcon").style.color = "green";
            }

            document.getElementById("modal-overdue").style.width = document.getElementById("overdue" + userStory.id).style.width;
            document.getElementById("modal-finished").style.width = document.getElementById("finished" + userStory.id).style.width;
            document.getElementById("modal-estimated").style.width = document.getElementById("estimated" + userStory.id).style.width;
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

function dateChange() {
    var help = document.getElementById("storyStartDate").value.split('-');

    var startDDate = new Date(help[0], help[1] - 1, help[2]);
    help = document.getElementById("storyEndDate").value.split('-');
    var endDDate = new Date(help[0], help[1] - 1, help[2]);
    if (startDDate < endDDate) {
        startD = document.getElementById("storyStartDate").value;
        endD = document.getElementById("storyEndDate").value;
        document.getElementById("infoTextDate").hidden = true;
        changeProgressBar(startDDate, endDDate);
    } else {
        document.getElementById("storyStartDate").value = startD;
        document.getElementById("storyEndDate").value = endD;
        document.getElementById("infoTextDate").hidden = false;
    }
}

function changeProgressBar(startDDate, endDDate) {

    document.getElementById("modal-finished").style.width = "0%";
    document.getElementById("modal-overdue").style.width = "0%";
    document.getElementById("modal-estimated").style.width = "0%";

    var currentDDate = new Date();

    if (!document.getElementById("modalCheckIcon").classList.contains("text-success")) {
        console.log("WOW");
        document.getElementById("progressIcon").style.color = "";
        const diffCurrentTime = Math.abs(currentDDate - startDDate);
        const diffTime = Math.abs(endDDate - startDDate);
        console.log(diffCurrentTime +"");
        if (diffCurrentTime > 0) {
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