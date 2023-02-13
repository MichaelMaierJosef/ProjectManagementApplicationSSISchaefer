function filterPrjectlist() {
    var input, filter, li, t, i, txtValue;
    input = document.getElementById("keyWordInput");
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName("projectItem");
    for (i = 0; i < li.length; i++) {
        t = li[i].getElementsByTagName("h4")[0];
        txtValue = t.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "flex";
        } else {
            li[i].style.display = "none";
        }
    }
}

function filterTasklist() {
    var input, filter, li, t, i, txtValue;
    input = document.getElementById("keyWordInput");
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName("userstoryItem");
    for (i = 0; i < li.length; i++) {
        t = li[i].getElementsByTagName("h4")[0];
        txtValue = t.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
        } else {
            li[i].style.display = "none";
        }
    }
}