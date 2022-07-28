function weightChangedOLD(event) {
    var activeAmount = 0;
    var weightAmount = 0;
    var newWeightAmount = 0;


    for (const element of document.getElementsByClassName("criteria")) {
        if (element.getElementsByClassName("criteria-switch")[0].checked) {
            weightAmount += parseInt(document.getElementById(element.id + "Weight").value);
            activeAmount++;
        }
    }

    if (weightAmount > 100) {
        weightAmount -= 100;
        for (const element of document.getElementsByClassName("criteria")) {
            if (element.getElementsByClassName("criteria-switch")[0].checked && (element.id + "Weight") !== event.target.id) {
                newWeightAmount = parseInt(document.getElementById(element.id + "Weight").value) - parseInt(weightAmount / (activeAmount - 1));
                if (newWeightAmount < 0) {
                    newWeightAmount == 0;
                }
                document.getElementById(element.id + "Weight").value = newWeightAmount;
            }
            

        }
    }


    console.log(document.getElementById("estimatedComplexityWeight").value);



    console.log(activeAmount);
    console.log(weightAmount);
}

function weightChanged(event) {
    var activeAmount = 0;
    var weightAmount = 0;
    var newWeightAmount = 0;


    for (const element of document.getElementsByClassName("criteria")) {
        if (element.getElementsByClassName("criteria-switch")[0].checked) {
            weightAmount += parseInt(document.getElementById(element.id + "Weight").value);
            activeAmount++;
        }
        }

    console.log(document.getElementById("estimatedComplexityWeight").value);



    console.log(activeAmount);
    console.log(weightAmount);
}