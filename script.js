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


});
