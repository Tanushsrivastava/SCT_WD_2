window.addEventListener("scroll", function(){
    let nav = document.getElementById("navbar");
    nav.classList.toggle("scrolled", window.scrollY > 50);
});