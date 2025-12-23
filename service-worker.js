const CACHE_NAME = "gm-calendar-v13";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./icon.png",
  "./manifest.json"
];

self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});
function normalizarHora(texto) {
  if (!texto) return "";

  // Eliminar espacios
  texto = texto.replace(/\s+/g, "");

  // Si viene con :
  if (texto.includes(":")) {
    let [h, m] = texto.split(":");
    return h.padStart(2, "0") + ":" + (m || "00").padStart(2, "0");
  }

  // Si viene tipo 930 o 1530
  if (texto.length === 3) {
    return "0" + texto[0] + ":" + texto.slice(1);
  }

  if (texto.length === 4) {
    return texto.slice(0, 2) + ":" + texto.slice(2);
  }

  // Si solo pone la hora (ej 9)
  if (texto.length === 1 || texto.length === 2) {
    return texto.padStart(2, "0") + ":00";
  }

  return "";
}

function generarTituloAutomatico(texto) {
  if (!texto) return "Evento";
  return texto.split(" ").slice(0, 4).join(" ");
}












