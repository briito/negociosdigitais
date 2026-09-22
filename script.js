document.addEventListener("DOMContentLoaded", function () {

    // FAQ accordion
    var faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(function (item) {
        var question = item.querySelector(".faq-question");
        question.addEventListener("click", function () {
            var isOpen = item.classList.contains("open");
            faqItems.forEach(function (i) { i.classList.remove("open"); });
            if (!isOpen) {
                item.classList.add("open");
            }
        });
    });

    // Sticky CTA bar — appears after the hero is scrolled past
    var stickyCta = document.getElementById("stickyCta");
    var hero = document.querySelector(".hero");

    if (stickyCta && hero) {
        window.addEventListener("scroll", function () {
            var heroBottom = hero.getBoundingClientRect().bottom;
            if (heroBottom < 0) {
                stickyCta.classList.add("visible");
            } else {
                stickyCta.classList.remove("visible");
            }
        });
    }

});
