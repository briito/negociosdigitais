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

    // Botão fixo no celular: aparece depois do início da página
    // e some quando o fechamento ou o rodapé estão na tela
    var bar = document.getElementById("sticky-bar");
    var hero = document.querySelector(".hero");
    var final = document.getElementById("final");
    var footer = document.querySelector("footer");

    if (bar && hero && "IntersectionObserver" in window) {
        var heroVisible = true;
        var endVisible = false;

        function update() {
            bar.classList.toggle("show", !heroVisible && !endVisible);
        }

        new IntersectionObserver(function (entries) {
            heroVisible = entries[0].isIntersecting;
            update();
        }).observe(hero);

        var endObserver = new IntersectionObserver(function (entries) {
            endVisible = entries.some(function (e) { return e.isIntersecting; });
            update();
        });
        if (final) { endObserver.observe(final); }
        if (footer) { endObserver.observe(footer); }
    }

});

/* ==========================================================
   PIXEL DA META
   ----------------------------------------------------------
   Cole abaixo o ID do seu Pixel (somente números), por exemplo "123456789012345".
   Enquanto o ID estiver vazio, nada é carregado.
   Sem aviso de cookies: o Pixel carrega ao abrir a página, e isso está
   informado na Política de Privacidade e na Política de Cookies.
   ========================================================== */
(function () {
    var META_PIXEL_ID = "";

    if (META_PIXEL_ID) {
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
            t = b.createElement(e); t.async = !0; t.src = v;
            s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
        }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
        window.fbq("init", META_PIXEL_ID);
        window.fbq("track", "PageView");
    }

    // Evento de clique nos botões que levam ao checkout (só dispara se o Pixel estiver carregado)
    document.addEventListener("click", function (ev) {
        var link = ev.target.closest ? ev.target.closest("a[href*='pay.kiwify.com.br']") : null;
        if (link && window.fbq) { window.fbq("trackCustom", "ClickCheckout"); }
    });
})();
