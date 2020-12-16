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