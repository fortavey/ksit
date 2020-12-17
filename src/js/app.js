// Open mobile menu
try{
    (function(){
        const btn = document.querySelector('.patty');
        const header = document.querySelector('header.site-header');

        btn.addEventListener('click', e => {
            btn.classList.toggle('open');
            header.classList.toggle('menu-opened');
        });
    })();
}catch(err){console.log(err);}

// jQuery
try{
    jQuery(function($){
        $('.reviews .container').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: $('.arrows .prev'),
            nextArrow: $('.arrows .next'),
            responsive: [
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 700,
                  settings: {
                    slidesToShow: 1
                  }
                }
            ]
        });
    });
}catch(err){console.log(err)}

// Open review
try{
   (function(){
       const btn = document.querySelector('.reviews .container');
        btn.addEventListener('click', e => {
            console.log(e.target);
            if(e.target.classList.contains('open') || e.target.classList.contains('arrow')) {
                e.target.closest('.text').classList.toggle('opened');
            }
        });
   })();
}catch(err){console.log(err)}