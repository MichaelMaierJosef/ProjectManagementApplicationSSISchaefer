
function updateCalculatedComplexity(complexityScale) {
    if (complexityScale != -1) {
        let progressBar = document.getElementById("calculatedComplexity");
        progressBar.style.width = complexityScale + "%";
        progressBar.innerHTML = complexityScale + "%";
        progressBar.ariaValueNow = "" + complexityScale;

        progressBar.classList.remove("bg-success");
        progressBar.classList.remove("bg-warning");
        progressBar.classList.remove("bg-danger");
        if (complexityScale <= 33) {
            progressBar.classList.add("bg-success");
        }
        if (complexityScale >= 34 && complexityScale <= 66) {
            progressBar.classList.add("bg-warning");
        }   
        if (complexityScale >= 67) {
            progressBar.classList.add("bg-danger");
        }

        
    }
}
function getCalculatedComplexity(pid) {
    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "/complexity/GetCalculatedComplexity",
            data: {
                "pid": pid
            },
            success: function (response) {
                console.log(response);
                updateCalculatedComplexity(response);
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




const weightInputs = Array.from(document.getElementsByClassName('weightInput'));

weightInputs.forEach(weightInput => {
    console.log(weightInput);
    weightInput.addEventListener('change', function setPercent(event) {
        if (!isNaN(parseInt(weightInput.value))) {
            var availableWeight = 100;
            for (weight of weightInputs) {
                if (weightInput.id !== weight.id) { 
                    availableWeight -= parseInt(weight.value);
                }
            }
            //console.log("availableWeight");
            //console.log(availableWeight);
            if (availableWeight >= parseInt(weightInput.value)) {
                weightInput.value = `${parseInt(weightInput.value)}%`;
            } else {
                weightInput.value = '';
            }
        } else {
            weightInput.value = '0%';
        }
    });
});


function rangeDisplayChanged(id, pid, pname) {
    //console.log(id);

    document.getElementById("complexityRange" + id).value = document.getElementById("complexityRangeDisplay" + id).value;

    updateScale(id, pid, pname);
}

function rangeChanged(id, pid, pname) {
    //console.log(id);

    document.getElementById("complexityRangeDisplay" + id).value = document.getElementById("complexityRange" + id).value;

    updateScale(id, pid, pname);
}


function updateScale(id, pid, pname) {
        $(document).ready(function () {
            $.ajax({
                type: "POST",
                url: "/complexity/UpdateScale",
                data: {
                    "id": id,
                    "pid": pid,
                    "pname": pname,
                    "scale": document.getElementById("complexityRange" + id).value 
                },
                success: function (response) {
                    console.log(response);
                    updateCalculatedComplexity(response);
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

function updateWeight(id, pid, pname, wInput) {
    let weight = wInput.value;
    weight = weight.replace("%", "");
    
    if (!isNaN(weight) && weight >= 0 && weight <= 100) {

        $(document).ready(function () {
            $.ajax({
                type: "POST",
                url: "/complexity/UpdateWeight",
                data: {
                    "id": id,
                    "pid": pid,
                    "pname": pname,
                    "weight": parseInt(wInput.value)
                },
                success: function (response) {
                    console.log(response);
                    updateCalculatedComplexity(response);
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

}

function switchComplexity(id, pid, pname) {
        $(document).ready(function () {
            $.ajax({
                type: "POST",
                url: "/complexity/SwitchComplexity",
                data: {
                    "id": id,
                    "pid": pid,
                    "pname": pname
                },
                success: function (response) {
                    console.log(response);
                    updateCalculatedComplexity(response);
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


function openDelComplexityModal(complexityId) {
    $(complexityId).modal('show');
}






