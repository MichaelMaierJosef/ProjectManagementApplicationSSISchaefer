
function showDetail() {
    document.querySelector('.bg-modal').style.display = 'flex';
}


function hideDetail() {
    document.querySelector('.bg-modal').style.display = 'none';
}


function showDetailAdd() {
    document.querySelector('.add-modal').style.display = 'flex';
}

function hideDetailAdd() {
    document.querySelector('.add-modal').style.display = 'none';
}


// when file is inside the drag area
function dragEnter(current) {
    event.preventDefault();
    document.getElementById(current).style.border = '2px dashed #1683ff';
    document.getElementById(current).innerText = "Release to Upload";
}

// when file is leaves the drag area
function dragLeave(current) {
    event.preventDefault();
    document.getElementById(current).style.border = '2px solid #6f7275';
    document.getElementById(current).innerText = "Drag & Drop";
}

var idList = [];
var imgCount = 1;

// when file is dropped in the drag area
function dragDropped(current) {
    if (current == 0) {
        var dragArea = document.getElementById(1);
        let fileURL = document.getElementById("imgURLs").value;
        let imgTag = `<img class="usImage" src="${fileURL}">`;
        dragArea.innerHTML = imgTag;
        document.getElementById(1).style.border = '2px solid #6f7275';
        if (true == true || idList.includes(1) == false && idList.length < 0) {
            idList.push(imgCount);
            imgCount++;
            var insertOption =
                `<div id="${imgCount}" class="anhang" ondragleave="dragLeave(${imgCount})" ondrop="dragDropped(${imgCount})" ondragover="dragEnter(${imgCount})">
                <h3>Upload your Image</h3>
                <div id="drag-area" class="drag-area">
                    <div class="icon">
                        <i class="fas fa-images"></i>
                    </div>
                    <span id="text" class="header">Drag & Drop</span></br><br><br>
                <span class="support">Supports: JPEG, JPG, PNG</span>
                </div>
                </div>
                @model ProjectManagementApplication.Models.UserStory
<form asp-action="MultiUpload" asp-controller="UserStory" method="post" enctype="multipart/form-data">
                    <div class="row mt-2">
                        <div class="col-12">
                            <label class="col-form-label">Select Multiple Files</label>
                            <input asp-for="Files" class="form-control" multiple/>
                            <span asp-validation-for="Files" class="text-danger"></span>
                        </div>
                    </div>


                    <div class="row mt-2">
                        <div class="col-12">
                            <button type="submit" class="btn btn-success">Upload Files</button>
                        </div>
                    </div>
                </form>`;
            document.getElementById("imagecontainer").insertAdjacentHTML("afterbegin", insertOption);
            var wi = document.getElementById("imagecontainer").offsetWidth;
            var helpwi = parseInt(wi) + 300;
            document.getElementById("imagecontainer").style.width = helpwi + 'px';
        }

    }else {
        var dragArea = document.getElementById(current);
        event.preventDefault();
        file = event.dataTransfer.files[0];
        let fileType = file.type;
        let validExtensions = ['image/jpeg', "image/jpg", "image/PNG", "image/png", "image/JPG", "image/JPEG"];

        if (validExtensions.includes(fileType)) {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let fileURL = fileReader.result;
                //alert(fileURL);
                document.getElementById("invIMGid").innerText = fileURL;
                document.getElementById("imgURLs").value = fileURL;
                let imgTag = `<img class="usImage" src="${fileURL}">`
                dragArea.innerHTML = imgTag;
                document.getElementById(current).style.border = '2px solid #6f7275';
                if (idList.includes(current) == false && idList.length < 0) {
                    idList.push(imgCount);
                    imgCount++;
                    var insertOption =
                        `<div id="${imgCount}" class="anhang" ondragleave="dragLeave(${imgCount})" ondrop="dragDropped(${imgCount})" ondragover="dragEnter(${imgCount})">
                    <h3>Upload your Image</h3>
                    <div id="drag-area" class="drag-area">
                        <div class="icon">
                            <i class="fas fa-images"></i>
                        </div>
                        <span id="text" class="header">Drag & Drop</span></br>
                    <span class="support">Supports: JPEG, JPG, PNG</span>
                </div>
            </div>`;
                    document.getElementById("imagecontainer").insertAdjacentHTML("afterbegin", insertOption);
                    var wi = document.getElementById("imagecontainer").offsetWidth;
                    var helpwi = parseInt(wi) + 300;
                    document.getElementById("imagecontainer").style.width = helpwi + 'px';

                }
            };
            fileReader.readAsDataURL(file);
        } else {
            alert('This file is not an Image');
            document.getElementById(current).style.border = '2px solid #6f7275';
        }
    }
}

var usedIDs = [0, 1, 2, 3];

function deleteUserStory() {

    var list = document.getElementById("listUl");

    for (var i = usedIDs.length - 1; i >= 0; i--) {
        var cBox = document.getElementById("c" + usedIDs[i]).checked;
        if (cBox) {
            document.getElementById("dus" + usedIDs[i]).innerHTML = "";
            usedIDs.splice(usedIDs[i], 1);
        }
    }
}

// Functions to set the data, which will be displayed in an userstory
function showDetailMore(title, sid, desc, usname, imgurl, state, snumber) {
    // UserStory Popup
    document.getElementById("title").value = title;
    document.querySelector('.bg-modal').style.display = 'flex';
    $("#userStoryContent").val(desc);
    document.getElementById("usname").innerText = usname + ': US' + snumber;
    document.getElementById("usnameInp").value = usname;
    document.getElementById("storyId").value = sid;
    document.getElementById("storyState").value = state;
    document.getElementById("imgURLs").value = "https://cdn.lko.at/lko3/mmedia/image/2022.05.05/1651738187451445.jpg?m=MjczLDM0Nyw1MCUsOTUuMjUlLDI0LjE2NyUsNC43NSUsLCw2MA%3D%3D&_=1651738189";
    document.getElementById("storyNumber").value = snumber;

    //alert("sid: " + sid);
    //alert("Inhalt davor: " + document.getElementById("userStoryId").value);
    document.getElementById("userStoryId").value = sid;
    //alert("Inhalt danach: " + document.getElementById("userStoryId").value);

    dragDropped(0);
}

function setTaskName(currentProId) {
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "/Task/SetTask",
            data: {
                "taskname": document.getElementById("newTaskInput").value,
                "storyID": document.getElementById("storyId").value,
                "projectID": currentProId
            },
            success: function (response) {
                $(response).each(function () {
                    //alert("Hello" + this.taskname);
                })
            },
            failure: function (response) {
                //alert(response.responseText);
            },
            error: function (response) {
                //alert(response.responseText);
            }
        });
    });
}

//alles arsch
function loadTaskIndex() {
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "/Task/Index",
            data: {
                "userstoryid": document.getElementById("storyId").value
            },
            success: function (response) {
                $(response).each(function () {
                    //alert("Hello" + this.taskname);
                })
            },
            failure: function (response) {
                //alert(response.responseText);
            },
            error: function (response) {
                //alert(response.responseText);
            }
        });
    });
}


function filterlist() {
    var input, filter, li, a, i, txtValue;
    input = document.getElementById("keyWordInput");
    filter = input.value.toUpperCase();
    li = document.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
