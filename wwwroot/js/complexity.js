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
}



function onOffCriteria(id) {
    document.getElementById( )
}



const weightInputs = Array.from(document.getElementsByClassName('weightInput'));

weightInputs.forEach(weightInput => {
    weightInput.addEventListener('change', function setPercent(event) {
        if (!isNaN(parseInt(weightInput.value))) {
            var availableWeight = 100;
            for (weight of weightInputs) {
                if (weightInput.id !== weight.id) { 
                    availableWeight -= parseInt(weight.value);
                }
            }
            console.log("availableWeight");
            console.log(availableWeight);
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



