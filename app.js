// app.js

import {
  weatherCodeToText,
  toggleLoading,
  baseSuggestions,
  getSavedData,
  saveData
} from './utils.js';

// Global variables
const sections = Array.from(document.querySelectorAll('main > section'));
const navLinks = Array.from(document.querySelectorAll('nav a'));
let deferredPrompt = null;
let map = null;
let userMarker = null;
let tasas = getSavedData('viajeaqui_taxas');

// --- PWA & Core App Logic ---

function showSection(id) {
  sections.forEach(s => s.classList.toggle('hidden', '#' + s.id !== id));
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
  if (id === '#mapa') {
    setTimeout(() => map.invalidateSize(), 200);
  } else if (id === '#roteiros') {
    renderSavedItineraries();
  }
}

function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
  document.getElementById('btn-install')?.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
    }
  });
}

function initNav() {
  window.addEventListener('hashchange', () => showSection(location.hash || '#home'));
  showSection(location.hash || '#home');
}

// --- Map & Geolocation ---

function setupMap() {
  map = L.map('map').setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);
}

function centerOnUser() {
  if (!navigator.geolocation) {
    alert('Geolocalização não suportada');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const {
        latitude,
        longitude
      } = pos.coords;
      if (userMarker) {
        map.removeLayer(userMarker);
      }
      userMarker = L.marker([latitude, longitude]).addTo(map).bindPopup('Você está aqui');
      map.setView([latitude, longitude], 15);
      document.getElementById('summary-destino').textContent =
        `Coordenadas: ${latitude.toFixed(4)}, ${longitude.toFixed(4)} — explore as categorias no mapa.`;
      await fetchWeather(latitude, longitude, true);
    },
    (err) => alert('Não foi possível obter a localização: ' + err.message)
  );
}

async function buscarCategoria(lat, lon, tag) {
  const radius = 2000;
  const filter = tag.includes('=') ? `[${tag}]` : `[${tag}]`;
  const query = `[out:json][timeout:25];(node${filter}(around:${radius},${lat},${lon});way${filter}(around:${radius},${lat},${lon});relation${filter}(around:${radius},${lat},${lon}););out center;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error('Falha na busca Overpass');
  }
  const data = await resp.json();
  return data.elements.filter(e => (e.lat && e.lon) || (e.center));
}

// --- Itineraries ---

function generateItineraryText(dias, interesses, orc, estilo) {
  let text = `Roteiro - estilo ${estilo}\n`;
  for (let d = 1; d <= dias; d++) {
    const picks = [];
    interesses.forEach(i => {
      const arr = baseSuggestions[i];
      if (arr) {
        picks.push(arr[(d - 1) % arr.length]);
      }
    });
    const budgetNote = orc ? ` • Orçamento sugerido: ~${orc.toLocaleString()} por dia.` : '';
    text += `\nDia ${d}: ${picks.join(' • ') || 'Passeios livres'}${budgetNote}`;
  }
  return text;
}

function renderSavedItineraries() {
  const savedRoteiros = getSavedData('viajeaqui_roteiros');
  const ul = document.getElementById('roteiros-salvos');
  ul.innerHTML = '';
  if (savedRoteiros.length === 0) {
    ul.innerHTML = '<p>Nenhum roteiro salvo.</p>';
    return;
  }

  savedRoteiros.forEach((roteiro, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${roteiro.dias} dias (${roteiro.estilo})</span>
      <button class="ghost" data-index="${index}">Ver & Baixar</button>
      <button class="ghost" data-delete-index="${index}">Remover</button>
    `;
    ul.appendChild(li);
  });

  ul.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    const deleteIndex = e.target.dataset.deleteIndex;
    if (index) {
      const roteiro = savedRoteiros[index];
      const texto = generateItineraryText(roteiro.dias, roteiro.interesses, roteiro.orc, roteiro.estilo);
      alert(texto);
    } else if (deleteIndex) {
      if (confirm('Tem certeza que deseja remover este roteiro?')) {
        savedRoteiros.splice(deleteIndex, 1);
        saveData('viajeaqui_roteiros', savedRoteiros);
        renderSavedItineraries();
      }
    }
  });
}

// --- Weather ---

async function fetchWeather(lat, lon, setHome = false) {
  const btn = document.getElementById(setHome ? 'btn-atualizar-clima' : 'btn-previsao');
  toggleLoading(btn, true);
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m&forecast_days=2&timezone=auto`;
    const r = await fetch(url);
    if (!r.ok) {
      throw new Error('Falha ao buscar dados de clima');
    }
    const j = await r.json();
    const t = j.current.temperature_2m;
    const code = j.current.weather_code;
    const desc = weatherCodeToText(code);
    const resumo = `${t}°C, ${desc}`;

    if (setHome) {
      document.getElementById('clima-agora').textContent = resumo;
    }
    document.getElementById('tempo-resumo').textContent = resumo;
    saveData('viajeaqui_clima', {
      t,
      code,
      when: Date.now()
    });

    const horas = j.hourly.time.slice(0, 12);
    const temps = j.hourly.temperature_2m.slice(0, 12);
    const prevSec = document.getElementById('previsao-48h');
    prevSec.innerHTML = '<h4>Próximas horas</h4>';
    horas.forEach((h, i) => {
      const p = document.createElement('p');
      p.textContent = `${h.replace('T',' ')} — ${temps[i]}°C`;
      prevSec.appendChild(p);
    });
  } catch (e) {
    console.warn(e);
    alert('Não foi possível obter os dados de clima.');
  } finally {
    toggleLoading(btn, false);
  }
}

// --- Exchange ---

async function atualizarTaxas(base = 'USD') {
  const btn = document.getElementById('btn-atualizar-taxas');
  toggleLoading(btn, true);
  try {
    const r = await fetch(`https://api.exchangerate.host/latest?base=${base}`);
    if (!r.ok) {
      throw new Error('Falha ao buscar taxas de câmbio.');
    }
    const j = await r.json();
    taxas[base] = j.rates;
    saveData('viajeaqui_taxas', taxas);
    alert('Taxas atualizadas!');
  } catch (e) {
    alert('Falha ao atualizar taxas: ' + e.message);
  } finally {
    toggleLoading(btn, false);
  }
}

// --- Community ---

function renderFeed() {
  const feed = getSavedData('viajeaqui_feed').reverse();
  const sec = document.getElementById('feed');
  sec.innerHTML = '';
  feed.forEach(p => {
    const art = document.createElement('article');
    art.className = 'card';
    const h4 = document.createElement('h4');
    h4.textContent = (p.nome || 'Anônimo') + ' — ' + new Date(p.ts).toLocaleString();
    const par = document.createElement('p');
    par.textContent = p.texto;
    art.appendChild(h4);
    art.appendChild(par);
    if (p.foto) {
      const fig = document.createElement('figure');
      const img = document.createElement('img');
      img.src = p.foto;
      img.alt = 'Foto do post';
      fig.appendChild(img);
      art.appendChild(fig);
    }
    sec.appendChild(art);
  });
}

// --- Checklist ---

function renderChecklist() {
  const list = getSavedData('viajeaqui_checklist');
  const ul = document.getElementById('lista-itens');
  ul.innerHTML = '';
  list.forEach((it, idx) => {
    const li = document.createElement('li');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!it.ok;
    cb.addEventListener('change', () => {
      list[idx].ok = cb.checked;
      saveData('viajeaqui_checklist', list);
    });
    const span = document.createElement('span');
    span.textContent = it.txt + (it.date ? ` • até ${it.date}` : '');
    const bt = document.createElement('button');
    bt.className = 'ghost';
    bt.textContent = 'Remover';
    bt.addEventListener('click', () => {
      list.splice(idx, 1);
      saveData('viajeaqui_checklist', list);
      renderChecklist();
    });
    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(bt);
    ul.appendChild(li);
  });
}

// --- Main Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('ano').textContent = new Date().getFullYear();

  initPWA();
  initNav();
  setupMap();
  renderFeed();
  renderChecklist();

  // Restore saved weather data
  const savedWeather = getSavedData('viajeaqui_clima');
  if (savedWeather.t) {
    const resumo = `${savedWeather.t}°C, ${weatherCodeToText(savedWeather.code)}`;
    document.getElementById('clima-agora').textContent = resumo;
    document.getElementById('tempo-resumo').textContent = resumo;
  }

  // --- Event Listeners ---
  document.getElementById('btn-locate')?.addEventListener('click', centerOnUser);
  document.getElementById('btn-notify')?.addEventListener('click', async () => {
    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        new Notification('ViajeAqui', {
          body: 'Notificações ativadas!'
        });
      }
    } catch (e) {
      console.warn(e);
    }
  });

  document.getElementById('btn-alerta-exemplo')?.addEventListener('click', () => {
    if (Notification.permission === 'granted') {
      new Notification('Alerta local', {
        body: 'Museu X com 50% hoje até 18h.'
      });
    } else {
      alert('Permita as notificações na página inicial.');
    }
  });

  document.getElementById('form-busca')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!userMarker) {
      alert('Ative a localização primeiro');
      return;
    }
    toggleLoading(e.target.querySelector('button'), true);
    const lat = userMarker.getLatLng().lat;
    const lon = userMarker.getLatLng().lng;
    const cat = document.getElementById('categoria').value;
    try {
      const results = await buscarCategoria(lat, lon, cat);
      results.forEach(r => {
        const p = r.lat ? [r.lat, r.lon] : [r.center.lat, r.center.lon];
        const name = (r.tags && (r.tags.name || r.tags['name:en'])) || cat;
        L.marker(p).addTo(map).bindPopup(name);
      });
      if (results[0]) {
        map.setView(results[0].lat ? [results[0].lat, results[0].lon] : [results[0].center.lat, results[0].center.lon], 15);
      }
    } catch (err) {
      alert('Falha na busca. Tente novamente mais tarde.');
    } finally {
      toggleLoading(e.target.querySelector('button'), false);
    }
  });

  document.getElementById('form-roteiro')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const dias = +document.getElementById('dias').value;
    const interesses = Array.from(document.getElementById('interesses').selectedOptions).map(o => o.value);
    const orc = +document.getElementById('orcamento').value || null;
    const estilo = document.getElementById('estilo').value;
    const lista = document.getElementById('roteiro-lista');
    lista.innerHTML = '';

    for (let d = 1; d <= dias; d++) {
      const picks = [];
      interesses.forEach(i => {
        const arr = baseSuggestions[i];
        if (arr) picks.push(arr[(d - 1) % arr.length]);
      });
      const budgetNote = orc ? ` • Orçamento sugerido: ~${orc.toLocaleString()} por dia.` : '';
      const sec = document.createElement('section');
      sec.innerHTML = `<h4>Dia ${d} — estilo ${estilo}</h4><p>${picks.join(' • ') || 'Passeios livres'}</p><p><small>Dica: agrupe atrações próximas.${budgetNote}</small></p>`;
      lista.appendChild(sec);
    }
    const savedRoteiros = getSavedData('viajeaqui_roteiros');
    savedRoteiros.push({
      dias,
      interesses,
      orc,
      estilo
    });
    saveData('viajeaqui_roteiros', savedRoteiros);
    renderSavedItineraries();
  });

  document.getElementById('btn-baixar-roteiro')?.addEventListener('click', () => {
    const dias = +document.getElementById('dias').value || 1;
    const interesses = Array.from(document.getElementById('interesses').selectedOptions).map(o => o.value);
    const orc = +document.getElementById('orcamento').value || null;
    const estilo = document.getElementById('estilo').value;
    const texto = generateItineraryText(dias, interesses, orc, estilo);
    const blob = new Blob([texto], {
      type: 'text/plain'
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'roteiro.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('btn-atualizar-clima')?.addEventListener('click', () => {
    if (!userMarker) {
      alert('Ative a localização para clima local');
      return;
    }
    const {
      lat,
      lng
    } = userMarker.getLatLng();
    fetchWeather(lat, lng, true);
  });

  document.getElementById('btn-previsao')?.addEventListener('click', () => {
    if (!userMarker) {
      alert('Ative a localização para previsão local');
      return;
    }
    const {
      lat,
      lng
    } = userMarker.getLatLng();
    fetchWeather(lat, lng);
  });

  document.getElementById('btn-atualizar-taxas')?.addEventListener('click', () => {
    const base = (document.getElementById('moeda-from').value || 'USD').toUpperCase();
    atualizarTaxas(base);
  });

  document.getElementById('form-cambio')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const from = document.getElementById('moeda-from').value.toUpperCase();
    const to = document.getElementById('moeda-to').value.toUpperCase();
    const val = parseFloat(document.getElementById('valor').value || '0');
    const baseRates = taxas[from];
    if (!baseRates) {
      alert('Atualize as taxas primeiro.');
      return;
    }
    const rate = baseRates[to];
    if (!rate) {
      alert('Par de moedas indisponível.');
      return;
    }
    const res = val * rate;
    document.getElementById('resultado-cambio').textContent = `${val.toFixed(2)} ${from} ≈ ${res.toFixed(2)} ${to}`;
  });

  document.getElementById('form-frases')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const idi = document.getElementById('idioma').value;
    const sec = document.getElementById('frases-lista');
    sec.innerHTML = '';
    const frases = {
      en: ['Hello, please.', 'Thank you.', 'Where is the restroom?', 'How much is it?', 'I need help.', 'Do you speak Portuguese?'],
      es: ['Hola, por favor.', 'Gracias.', '¿Dónde está el baño?', '¿Cuánto cuesta?', 'Necesito ayuda.', '¿Habla portugués?'],
      fr: ['Bonjour, s’il vous plaît.', 'Merci.', 'Où sont les toilettes ?', 'Combien ça coûte ?', 'J’ai besoin d’aide.', 'Parlez-vous portugais ?']
    };
    frases[idi].forEach(f => {
      const p = document.createElement('p');
      p.textContent = '• ' + f;
      sec.appendChild(p);
    });
  });

  document.getElementById('form-item')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const txt = document.getElementById('item-texto').value.trim();
    const date = document.getElementById('item-data').value;
    if (!txt) return;
    const list = getSavedData('viajeaqui_checklist');
    list.push({
      txt,
      date,
      ok: false
    });
    saveData('viajeaqui_checklist', list);
    e.target.reset();
    renderChecklist();
  });

  document.getElementById('btn-limpar-itens')?.addEventListener('click', () => {
    if (confirm('Limpar todos os itens?')) {
      localStorage.removeItem('viajeaqui_checklist');
      renderChecklist();
    }
  });

  document.getElementById('form-post')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('post-nome').value.trim();
    const texto = document.getElementById('post-texto').value.trim();
    const file = document.getElementById('post-foto').files[0];
    let foto64 = null;
    if (file) {
      foto64 = await new Promise((res, rej) => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result);
        fr.onerror = rej;
        fr.readAsDataURL(file);
      });
    }
    const feed = getSavedData('viajeaqui_feed');
    feed.push({
      nome,
      texto,
      foto: foto64,
      ts: Date.now()
    });
    saveData('viajeaqui_feed', feed);
    e.target.reset();
    renderFeed();
  });

  document.getElementById('form-aluguel')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const tipo = document.getElementById('tipo-aluguel').value;
    const dias = +document.getElementById('dias-aluguel').value || 1;
    const preco = {
      bike: 30,
      patinete: 25,
      carro: 180
    }[tipo] || 50;
    const total = preco * dias;
    const sec = document.getElementById('resultado-aluguel');
    sec.innerHTML = `<p>${tipo} por ${dias} dia(s): ~${total.toLocaleString()} (simulado)</p>`;
  });
});