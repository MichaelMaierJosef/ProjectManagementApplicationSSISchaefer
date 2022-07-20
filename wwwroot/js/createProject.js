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
            location.reload();
        }
    });

}