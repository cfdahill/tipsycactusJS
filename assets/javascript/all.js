//this code is needed by all pages

//Makes navbar stay at top when scrolling down
$(document).ready(function () {
    window.onscroll = function () { stickyNavBar() };
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
function stickyNavBar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("fixed-top");
    } else {
        navbar.classList.remove("fixed-top");
    }
}
});