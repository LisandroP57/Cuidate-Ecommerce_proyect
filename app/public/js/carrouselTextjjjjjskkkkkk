var width = 100;
var animation_speed = 700;
var time_val = 3000;
var current_slide = 1;

var $slider = $('#slider');
var $slide_container = $('.slides');
var $slides = $('.slide');

var interval;

$slides.each(function(index){
  $(this).css('left',(index*100)+'%');
});

function startSlider() {
  interval = setInterval(function() {
    $slide_container.animate({'left': '-='+(width+'%')}, animation_speed, function() {
      if (++current_slide === $slides.length) {
        current_slide = 1;
        $slide_container.css('left', 0);
      }
    });
  }, time_val);
}

startSlider();