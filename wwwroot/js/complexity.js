
function calculateComplexity() {

    



}




const weightInputs = Array.from(document.getElementsByClassName('weightInput'));

weightInputs.forEach(weightInput => {
    //console.log(weightInput);
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

    document.getElementById("addedComplexityRange" + id).value = document.getElementById("addedComplexityRangeDisplay" + id).value;

    updateScale(id, pid, pname);
}

function rangeChanged(id, pid, pname) {
    //console.log(id);

    document.getElementById("addedComplexityRangeDisplay" + id).value = document.getElementById("addedComplexityRange" + id).value;

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
                    "scale": document.getElementById("addedComplexityRange" + id).value 
                },
                success: function (response) {
                    //console.log(response);
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
                    //console.log(response);
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






