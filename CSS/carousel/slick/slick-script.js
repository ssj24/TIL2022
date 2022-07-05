$(document).ready(function(){
  const maxIndex = 6;
  $('.container').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });

  $('.container').on('afterChange', function(event, slick, curIdx){
    $('.innerBar').width(`${Math.round((curIdx / maxIndex)*100)}%`);
  });
});