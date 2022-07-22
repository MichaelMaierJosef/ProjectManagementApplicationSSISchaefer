function deleteUser(userId, projectId) {

    var data = {
        userId: userId,
        projectId: projectId
    };

    $.ajax({
        type: "POST",
        url: "/project/DeleteUser",
        data: data,
        success: function () {
            window.location.href = window.location.href;
        }
    });

}

function cancelCreate(projectId) {
    var data = {
        id: projectId
    };

    $.ajax({
        type: "POST",
        url: "/project/DeleteProject",
        data: data,
        success: function () {
            window.location.href = "/Project/Index";
        }
    });
}

function createRoles(userId, projectId) {
    var data = {
        userId: userId,
        projectId: projectId
    };

    $.ajax({
        type: "POST",
        url: "/project/CreateUserRoles",
        data: data,
        success: function () {
            window.location.href = window.location.href;
        }
    });
}

function editUserRoles(userId, projectId) {
    var data = {
        userId: userId,
        projectId: projectId
    };

    $.ajax({
        type: "POST",
        url: "/project/EditUserRoles",
        data: data,
        success: function () {     
            window.location.href = window.location.href;

        }
    });
}

function checkCheckedUser(projectId) {
    var checkboxes = document.getElementsByName('userCheckbox');



    var checkedElements = [];

    for (k = 0; k < checkboxes.length; k++) {
        if (checkboxes[k].checked) {
            checkedElements.push(checkboxes[k].id);
        }
    }

    var data = {
        projectId: projectId,
        checkedElements: checkedElements
    };

    $.ajax({
        type: "POST",
        url: "/project/CreateUserRoles",
        data: data,
        success: function () {
            window.location.href = window.location.href;
        }
    });

}