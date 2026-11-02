/* That One Drawer: shared top bar.
   Every app on thatonedrawer.com loads this with:
     <script src="/nav.js" defer></script>
   To add a new section, add it to LINKS below. Every page picks it up. */
(function () {
  if (document.getElementById("tod-nav")) return;

  var LINKS = [
    { href: "/recipe-box/", label: "The Kitchen" },
    { href: "/personal-finance/", label: "The Vault" },
    { href: "/worksheets/", label: "The Study" }
  ];

  var css =
    "#tod-nav{position:relative;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;" +
    "padding:8px 20px;background:#17201A;color:#FFF8EC;border-bottom:3px solid #F5B400;" +
    "font:600 14px/1.2 Figtree,system-ui,-apple-system,'Segoe UI',sans-serif;}" +
    "#tod-nav a{color:inherit;text-decoration:none}" +
    "#tod-nav .tod-home{display:inline-flex;align-items:center;gap:8px;font-weight:800;letter-spacing:-.01em;padding:4px 6px;border-radius:8px}" +
    "#tod-nav .tod-home svg{width:22px;height:22px;flex:none}" +
    "#tod-nav .tod-home:hover{background:rgba(255,255,255,.1)}" +
    "#tod-nav .tod-links{display:flex;gap:6px;flex-wrap:wrap}" +
    "#tod-nav .tod-links a{padding:5px 12px;border-radius:999px;border:2px solid transparent}" +
    "#tod-nav .tod-links a:hover{border-color:rgba(255,248,236,.5)}" +
    "#tod-nav .tod-links a[aria-current=page]{background:#F5B400;color:#17201A;border-color:#F5B400}" +
    "#tod-nav a:focus-visible{outline:3px solid #F5B400;outline-offset:2px}" +
    "@media (max-width:420px){#tod-nav{padding:8px 12px}#tod-nav .tod-home span{display:none}}";

  function build() {
    if (document.getElementById("tod-nav")) return;
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    var path = location.pathname;
    var nav = document.createElement("nav");
    nav.id = "tod-nav";
    nav.setAttribute("aria-label", "That One Drawer");
    nav.innerHTML =
      '<a class="tod-home" href="/">' +
      '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="4" y="14" width="56" height="40" rx="8" fill="#F5B400" stroke="#FFF8EC" stroke-width="4"/><rect x="22" y="30" width="20" height="7" rx="3.5" fill="#17201A"/></svg>' +
      "<span>That One Drawer</span></a>" +
      '<div class="tod-links">' +
      LINKS.map(function (l) {
        var here = path.indexOf(l.href) === 0;
        return '<a href="' + l.href + '"' + (here ? ' aria-current="page"' : "") + ">" + l.label + "</a>";
      }).join("") +
      "</div>";
    document.body.insertBefore(nav, document.body.firstChild);

    // Stretch edge to edge even when the page adds padding around its body.
    var cs = getComputedStyle(document.body);
    var pt = parseFloat(cs.paddingTop) || 0, pl = parseFloat(cs.paddingLeft) || 0, pr = parseFloat(cs.paddingRight) || 0;
    nav.style.margin = (-pt) + "px " + (-pr) + "px " + pt + "px " + (-pl) + "px";
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
