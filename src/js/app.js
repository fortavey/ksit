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
        $(document).ready(function() {
            $('.certificates .container').magnificPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0,1] // Will preload 0 - before current, and 1 after the current image
                }
            });
        });
    });
}catch(err){console.log(err)}

// Open review
try{
   (function(){
       const btns = [document.querySelector('.reviews .container'), document.querySelector('.faq .container')];
       btns.forEach(btn => {
           if(btn) {
               btn.addEventListener('click', e => {
                   if(e.target.classList.contains('open') || e.target.classList.contains('arrow')) {
                       e.target.closest('.text').classList.toggle('opened');
                   }
               });
           }
       });
   })();
}catch(err){console.log(err)}

// Add same height on faq
try{
   (function(){
       if(window.innerWidth > 600) {
           const allTitle = [...document.querySelectorAll('.faq .container .title')];
           let maxHeight = 0;
    
           allTitle.forEach(el => {
                maxHeight = el.clientHeight > maxHeight ? el.clientHeight : maxHeight;
           });
           allTitle.forEach(el => el.style.height = maxHeight + 'px');
       }
   })();
}catch(err){console.log(err)}

// Lazy Background
try{
    (function(){
        const arr = [
            '.feedback',
            '.main-fourth-block',
            'footer.site-footer',
            '.certificates',
        ];
        const newArr = arr.filter(el => document.querySelectorAll(el).length);

        function addClass(){
            if(window.scrollY > 100) {
                newArr.forEach(el => {
                    document.querySelector(el).classList.add('lazyBg');
                });
                window.removeEventListener('scroll', addClass);
            }
        }
        window.addEventListener('scroll', addClass);
    })();
}catch(err){console.log(err);}

// Lazy Image
try{
    (function(){
        const arr = [...document.querySelectorAll('.f-lazy-image')];

        function addSrc(){
            if(window.scrollY > 100) {
                arr.forEach(el => {
                    el.setAttribute('src', el.dataset.src);
                });
                window.removeEventListener('scroll', addSrc);
            }
        }

        arr.forEach(el => {
            const img = new Image();
            img.src = el.dataset.src;
        });

        window.addEventListener('scroll', addSrc);
    })();
}catch(err){console.log(err);}