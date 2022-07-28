function changeSlider() {

    var sliderValue = document.getElementById('#customRange1').value;


    $.ajax({
        type: "POST",
        url: "/userstory/ChangeSlider",
        data: data,
        success: function () {
            window.location.href = window.location.href;
        }
    });
}