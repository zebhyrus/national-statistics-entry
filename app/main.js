// Bootstrap for NusaStat. Renders the route on load and on hash change,
// wires the search box to filter the headline indicators, and redraws
// charts when the window resizes.
import { render, searchIndicators } from "./views.js";

const search = document.getElementById("search");
const results = document.getElementById("searchresults");

function showSearch() {
  const q = search.value;
  const hits = searchIndicators(q);
  if (!q.trim()) {
    results.innerHTML = "";
    results.hidden = true;
    return;
  }
  results.hidden = false;
  results.innerHTML = hits.length === 0
    ? "<p>Tidak ada indikator yang cocok.</p>"
    : "<ul>" + hits.map((h) => '<li><a href="#/' + h.topic + '"><strong>' + h.label + "</strong> " + h.value +
        " <span>" + h.detail + " · " + h.source + "</span></a></li>").join("") + "</ul>";
  results.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    results.hidden = true;
    search.value = "";
  }));
}

search.addEventListener("input", showSearch);
window.addEventListener("hashchange", render);
let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(render, 200);
});
render();
