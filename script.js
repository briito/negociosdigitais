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
   CONSENTIMENTO DE COOKIES + PIXEL DA META
   ----------------------------------------------------------
   1) Cole abaixo o ID do seu Pixel (somente números), por exemplo "123456789012345".
   2) Enquanto o ID estiver vazio, nada é carregado e o aviso não aparece
      na primeira visita (o link "Preferências de cookies" continua funcionando).
   3) O Pixel só é carregado depois que o visitante clica em "Aceitar".
   ========================================================== */
(function () {
    var META_PIXEL_ID = "";
    var STORAGE_KEY = "nd_consent";

    function getConsent() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function setConsent(value) {
        try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignora */ }
    }

    function deleteCookie(name) {
        var host = location.hostname;
        var parts = host.split(".");
        var domains = ["", host, "." + host];
        if (parts.length > 2) { domains.push("." + parts.slice(-3).join(".")); }
        if (parts.length > 1) { domains.push("." + parts.slice(-2).join(".")); }
        domains.forEach(function (d) {
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" +
                (d ? "; domain=" + d : "");
        });
    }

    function loadPixel() {
        if (!META_PIXEL_ID || window.fbq) { return; }
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

    var banner = null;

    function closeBanner() {
        if (banner && banner.parentNode) { banner.parentNode.removeChild(banner); }
        banner = null;
    }

    function accept() {
        setConsent("granted");
        closeBanner();
        loadPixel();
    }

    function refuse() {
        var hadPixel = !!window.fbq;
        setConsent("denied");
        closeBanner();
        deleteCookie("_fbp");
        deleteCookie("_fbc");
        if (hadPixel) { location.reload(); }
    }

    function showBanner() {
        if (banner) { return; }
        banner = document.createElement("div");
        banner.className = "cookie-banner";
        banner.setAttribute("role", "dialog");
        banner.setAttribute("aria-label", "Aviso de cookies");
        banner.innerHTML =
            "<p>Usamos cookies e o Pixel da Meta para medir o resultado dos nossos anúncios. " +
            "Você pode aceitar ou recusar — a navegação e a compra funcionam normalmente nos dois casos. " +
            "Saiba mais na <a href=\"politica-de-cookies.html\">Política de Cookies</a> e na " +
            "<a href=\"politica-de-privacidade.html\">Política de Privacidade</a>.</p>" +
            "<div class=\"cookie-actions\">" +
            "<button type=\"button\" class=\"cookie-btn cookie-refuse\">Recusar</button>" +
            "<button type=\"button\" class=\"cookie-btn cookie-accept\">Aceitar</button>" +
            "</div>";
        document.body.appendChild(banner);
        banner.querySelector(".cookie-accept").addEventListener("click", accept);
        banner.querySelector(".cookie-refuse").addEventListener("click", refuse);
    }

    document.addEventListener("DOMContentLoaded", function () {
        ["cookie-settings", "cookie-settings-inline"].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) {
                el.addEventListener("click", function (ev) {
                    ev.preventDefault();
                    showBanner();
                });
            }
        });

        var consent = getConsent();
        if (consent === "granted") {
            loadPixel();
        } else if (consent === null && META_PIXEL_ID) {
            showBanner();
        }
    });
})();
