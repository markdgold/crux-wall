$('.alert').fadeOut(5000);

$('.your_climbs_btn').click(() => {
    $('.users_climbs').slideToggle();
});

$('.filter_btn').click(() => {
    $('#filter_slider').slideToggle();
});

$('.climb_info').click(function(event) {
    $(this).siblings('.slide_info:eq(0)').slideToggle();
});

//grade selector
var stepSlider = document.getElementById('slider-step');

noUiSlider.create(stepSlider, {
    start: [1, 5],
    step: 1,
    connect: true,
    range: {
        'min': 1,
        'max': 5
    }
});
var stepValues = [
    document.getElementById('slider-step-value-lower'),
    document.getElementById('slider-step-value-upper')
];

stepSlider.noUiSlider.on('update', function(values, handle) {
    stepValues[handle].value = Math.trunc(values[handle]);

});

var powerSelector = document.querySelector('input[value=power]');
var techSelector = document.querySelector('input[value=tech]');
var crimpSelector = document.querySelector('input[value=crimp]');
var oneMoverSelector = document.querySelector('input[value=oneMover]');
var enduroSelector = document.querySelector('input[value=enduro]');
var setBySelector = document.getElementById('setBy');


$('#reset').click(() => {
    stepSlider.noUiSlider.set([1, 5]);
    setBySelector.selectedIndex = 0;
    powerSelector.checked = false;
    techSelector.checked = false;
    crimpSelector.checked = false;
    enduroSelector.checked = false;
    oneMoverSelector.checked = false;
});
