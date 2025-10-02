// SPA simples: alterna seções por hash
const sections = Array.from(document.querySelectorAll('main > section'));
const navLinks = Array.from(document.querySelectorAll('nav a'));
function showSection(id) {
  sections.forEach(s => s.classList.toggle('hidden', '#' + s.id !== id));
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
  if (id === '#mapa') setTimeout(() => map.invalidateSize(), 200);
}
window.addEventListener('hashchange', () => showSection(location.hash || '#home'));
showSection(location.hash || '#home');

// Ano no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
document.getElementById('btn-install')?.addEventListener('click', async () => {
  if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; }
});

// Notificações
document.getElementById('btn-notify')?.addEventListener('click', async () => {
  try {
    const perm = await Notification.requestPermission();
    if (perm === 'granted') new Notification('ViajeAqui', { body: 'Notificações ativadas!'});
  } catch(e){ console.warn(e); }
});
document.getElementById('btn-alerta-exemplo')?.addEventListener('click', () => {
  if (Notification.permission === 'granted') new Notification('Alerta local', { body: 'Museu X com 50% hoje até 18h.' });
  else alert('Permita as notificações na página inicial.');
});

// Geolocalização + Mapa (Leaflet)
let map = L.map('map').setView([0,0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap'
}).addTo(map);
let userMarker = null;
function centerOnUser() {
  if (!navigator.geolocation) { alert('Geolocalização não suportada'); return; }
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    if (userMarker) map.removeLayer(userMarker);
    userMarker = L.marker([latitude, longitude]).addTo(map).bindPopup('Você está aqui');
    map.setView([latitude, longitude], 15);
    document.getElementById('summary-destino').textContent = `Coordenadas: ${latitude.toFixed(4)}, ${longitude.toFixed(4)} — explore as categorias no mapa.`;
    fetchWeather(latitude, longitude, true);
  }, (err) => alert('Não foi possível obter a localização: ' + err.message));
}
document.getElementById('btn-locate')?.addEventListener('click', centerOnUser);

// Busca por categoria (Overpass simples)
async function buscarCategoria(lat, lon, tag) {
  const radius = 2000;
  const filter = tag.includes('=') ? `[${tag}]` : `[${tag}]`;
  const query = `[out:json][timeout:25];(node${filter}(around:${radius},${lat},${lon});way${filter}(around:${radius},${lat},${lon});relation${filter}(around:${radius},${lat},${lon}););out center;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data.elements.filter(e => (e.lat && e.lon) || (e.center));
}
document.getElementById('form-busca')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!userMarker) { alert('Ative a localização primeiro'); return; }
  const lat = userMarker.getLatLng().lat;
  const lon = userMarker.getLatLng().lng;
  const cat = document.getElementById('categoria').value;
  const results = await buscarCategoria(lat, lon, cat);
  results.forEach(r => {
    const p = r.lat ? [r.lat, r.lon] : [r.center.lat, r.center.lon];
    const name = (r.tags && (r.tags.name || r.tags['name:en'])) || cat;
    L.marker(p).addTo(map).bindPopup(name);
  });
  if (results[0]) map.setView(results[0].lat ? [results[0].lat, results[0].lon] : [results[0].center.lat, results[0].center.lon], 15);
});

// Roteiros personalizados
function gerarRoteiroTexto(dias, interesses, orc, estilo) {
  const baseSugestoes = {
    natureza: ['Parque central', 'Trilha leve', 'Mirante', 'Jardim botânico'],
    cultura: ['Museu histórico', 'Centro cultural', 'Igreja/Templo', 'Bairro antigo'],
    gastronomia: ['Mercado municipal', 'Feira de rua', 'Restaurante típico', 'Cafeteria local'],
    esportes: ['Ciclismo na orla', 'Caiaque', 'Aula de surf', 'Corrida no parque'],
    compras: ['Rua de compras', 'Shopping', 'Feirinha de artesanato', 'Livraria local']
  };
  let texto = `Roteiro — estilo ${estilo}\n`;
  for (let d=1; d<=dias; d++) {
    const picks = [];
    interesses.forEach(i => { const arr = baseSugestoes[i]; if (arr) picks.push(arr[(d-1)%arr.length]); });
    const budgetNote = orc ? ` • Orçamento sugerido: ~${orc.toLocaleString()} por dia.` : '';
    texto += `\nDia ${d}: ${picks.join(' • ') || 'Passeios livres'}${budgetNote}`;
  }
  return texto;
}

document.getElementById('form-roteiro')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const dias = +document.getElementById('dias').value;
  const interesses = Array.from(document.getElementById('interesses').selectedOptions).map(o=>o.value);
  const orc = +document.getElementById('orcamento').value || null;
  const estilo = document.getElementById('estilo').value;
  const lista = document.getElementById('roteiro-lista');
  lista.innerHTML = '';

  for (let d=1; d<=dias; d++) {
    const picks = [];
    interesses.forEach(i => { const arr = {
      natureza: ['Parque central', 'Trilha leve', 'Mirante', 'Jardim botânico'],
      cultura: ['Museu histórico', 'Centro cultural', 'Igreja/Templo', 'Bairro antigo'],
      gastronomia: ['Mercado municipal', 'Feira de rua', 'Restaurante típico', 'Cafeteria local'],
      esportes: ['Ciclismo na orla', 'Caiaque', 'Aula de surf', 'Corrida no parque'],
      compras: ['Rua de compras', 'Shopping', 'Feirinha de artesanato', 'Livraria local']
    }[i]; if (arr) picks.push(arr[(d-1)%arr.length]); });
    const budgetNote = orc ? ` • Orçamento sugerido: ~${orc.toLocaleString()} por dia.` : '';
    const sec = document.createElement('section');
    sec.innerHTML = `<h4>Dia ${d} — estilo ${estilo}</h4><p>${picks.join(' • ') || 'Passeios livres'}</p><p><small>Dica: agrupe atrações próximas.${budgetNote}</small></p>`;
    lista.appendChild(sec);
  }

  // Salva draft no localStorage
  localStorage.setItem('viajeaqui_roteiro', JSON.stringify({dias, interesses, orc, estilo}));
});

document.getElementById('btn-baixar-roteiro')?.addEventListener('click', () => {
  const dias = +document.getElementById('dias').value || 1;
  const interesses = Array.from(document.getElementById('interesses').selectedOptions).map(o=>o.value);
  const orc = +document.getElementById('orcamento').value || null;
  const estilo = document.getElementById('estilo').value;
  const texto = gerarRoteiroTexto(dias, interesses, orc, estilo);
  const blob = new Blob([texto], {type: 'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'roteiro.txt';
  a.click();
  URL.revokeObjectURL(a.href);
});

// Clima (Open-Meteo, sem chave)
async function fetchWeather(lat, lon, setHome=false) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&hourly=temperature_2m&forecast_days=2&timezone=auto`;
    const r = await fetch(url);
    const j = await r.json();
    const t = j.current.temperature_2m;
    const code = j.current.weather_code;
    const desc = weatherCodeToText(code);
    const resumo = `${t}°C, ${desc}`;
    if (setHome) document.getElementById('clima-agora').textContent = resumo;
    document.getElementById('tempo-resumo').textContent = resumo;
    // guarda última
    localStorage.setItem('viajeaqui_clima', JSON.stringify({t, code, when: Date.now()}));
    // previsão
    const horas = j.hourly.time.slice(0, 12);
    const temps = j.hourly.temperature_2m.slice(0, 12);
    const prevSec = document.getElementById('previsao-48h');
    prevSec.innerHTML = '<h4>Próximas horas</h4>';
    horas.forEach((h, i) => {
      const p = document.createElement('p');
      p.textContent = `${h.replace('T',' ')} — ${temps[i]}°C`;
      prevSec.appendChild(p);
    });
  } catch(e) {
    console.warn(e);
  }
}
function weatherCodeToText(code){
  const map = {0:'Céu limpo',1:'Principalmente limpo',2:'Parcialmente nublado',3:'Nublado',45:'Nevoeiro',48:'Nevoeiro depositante',51:'Garoa leve',53:'Garoa',55:'Garoa forte',61:'Chuva fraca',63:'Chuva',65:'Chuva forte',71:'Neve fraca',73:'Neve',75:'Neve forte',80:'Pancadas fracas',81:'Pancadas',82:'Pancadas fortes',95:'Trovoadas'};
  return map[code] || 'Tempo variável';
}
document.getElementById('btn-atualizar-clima')?.addEventListener('click', () => {
  if (!userMarker) { alert('Ative a localização para clima local'); return; }
  const {lat, lng} = userMarker.getLatLng();
  fetchWeather(lat, lng, true);
});
document.getElementById('btn-previsao')?.addEventListener('click', () => {
  if (!userMarker) { alert('Ative a localização para previsão local'); return; }
  const {lat, lng} = userMarker.getLatLng();
  fetchWeather(lat, lng);
});

// Conversor de moedas (fixo com dólar 5.60)
let taxas = {
  USD: { BRL: 5.60, USD: 1 },
  BRL: { USD: 1/5.60, BRL: 1 }
};

document.getElementById('form-cambio')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const from = document.getElementById('moeda-from').value.toUpperCase();
  const to = document.getElementById('moeda-to').value.toUpperCase();
  const val = parseFloat(document.getElementById('valor').value || '0');
  const baseRates = taxas[from];
  if (!baseRates) { alert('Moeda não suportada.'); return; }
  const rate = baseRates[to];
  if (!rate) { alert('Par de moedas indisponível.'); return; }
  const res = val * rate;
  document.getElementById('resultado-cambio').textContent =
    `${val.toFixed(2)} ${from} ≈ ${res.toFixed(2)} ${to}`;
});

// Frases úteis
const frases = {
  en: ['Hello, please.','Thank you.','Where is the restroom?','How much is it?','I need help.','Do you speak Portuguese?'],
  es: ['Hola, por favor.','Gracias.','¿Dónde está el baño?','¿Cuánto cuesta?','Necesito ayuda.','¿Habla portugués?'],
  fr: ['Bonjour, s’il vous plaît.','Merci.','Où sont les toilettes ?','Combien ça coûte ?','J’ai besoin d’aide.','Parlez-vous portugais ?']
};
document.getElementById('form-frases')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const idi = document.getElementById('idioma').value;
  const sec = document.getElementById('frases-lista');
  sec.innerHTML = '';
  frases[idi].forEach(f=>{
    const p = document.createElement('p');
    p.textContent = '• ' + f;
    sec.appendChild(p);
  });
});

// Checklist
function renderChecklist(){
  const list = JSON.parse(localStorage.getItem('viajeaqui_checklist')||'[]');
  const ul = document.getElementById('lista-itens');
  ul.innerHTML = '';
  list.forEach((it, idx)=>{
    const li = document.createElement('li');
    const cb = document.createElement('input'); cb.type='checkbox'; cb.checked = !!it.ok;
    cb.addEventListener('change', ()=>{ list[idx].ok = cb.checked; localStorage.setItem('viajeaqui_checklist', JSON.stringify(list)); });
    const span = document.createElement('span'); span.textContent = it.txt + (it.date?` • até ${it.date}`:'');
    const bt = document.createElement('button'); bt.className='ghost'; bt.textContent='Remover';
    bt.addEventListener('click', ()=>{ list.splice(idx,1); localStorage.setItem('viajeaqui_checklist', JSON.stringify(list)); renderChecklist(); });
    li.appendChild(cb); li.appendChild(span); li.appendChild(bt);
    ul.appendChild(li);
  });
}
document.getElementById('form-item')?.addEventListener('submit',(e)=>{
  e.preventDefault();
  const txt = document.getElementById('item-texto').value.trim();
  const date = document.getElementById('item-data').value;
  if(!txt) return;
  const list = JSON.parse(localStorage.getItem('viajeaqui_checklist')||'[]');
  list.push({txt, date, ok:false});
  localStorage.setItem('viajeaqui_checklist', JSON.stringify(list));
  (e.target).reset();
  renderChecklist();
});
document.getElementById('btn-limpar-itens')?.addEventListener('click',()=>{
  if (confirm('Limpar todos os itens?')) { localStorage.removeItem('viajeaqui_checklist'); renderChecklist(); }
});
renderChecklist();

// Comunidade (localStorage)
function renderFeed(){
  const feed = JSON.parse(localStorage.getItem('viajeaqui_feed')||'[]').reverse();
  const sec = document.getElementById('feed');
  sec.innerHTML = '';
  feed.forEach(p=>{
    const art = document.createElement('article'); art.className='card';
    const h4 = document.createElement('h4'); h4.textContent = (p.nome||'Anônimo') + ' — ' + new Date(p.ts).toLocaleString();
    const par = document.createElement('p'); par.textContent = p.texto;
    art.appendChild(h4); art.appendChild(par);
    if (p.foto) {
      const fig = document.createElement('figure');
      const img = document.createElement('img'); img.src = p.foto; img.alt = 'Foto do post';
      fig.appendChild(img); art.appendChild(fig);
    }
    sec.appendChild(art);
  });
}
document.getElementById('form-post')?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const nome = document.getElementById('post-nome').value.trim();
  const texto = document.getElementById('post-texto').value.trim();
  const file = document.getElementById('post-foto').files[0];
  let foto64 = null;
  if (file) {
    foto64 = await new Promise((res, rej)=>{
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });
  }
  const feed = JSON.parse(localStorage.getItem('viajeaqui_feed')||'[]');
  feed.push({nome, texto, foto: foto64, ts: Date.now()});
  localStorage.setItem('viajeaqui_feed', JSON.stringify(feed));
  (e.target).reset();
  renderFeed();
});
renderFeed();

// Transporte – simplificado (mock local)
document.getElementById('form-aluguel')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const tipo = document.getElementById('tipo-aluguel').value;
  const dias = +document.getElementById('dias-aluguel').value || 1;
  const preco = {bike:30, patinete:25, carro:180}[tipo] || 50;
  const total = preco * dias;
  const sec = document.getElementById('resultado-aluguel');
  sec.innerHTML = `<p>${tipo} por ${dias} dia(s): ~${total.toLocaleString()} (simulado)</p>`;
});

// Restaurar clima salvo (se houver)
(function(){
  const saved = localStorage.getItem('viajeaqui_clima');
  if (saved) {
    try{
      const {t, code} = JSON.parse(saved);
      document.getElementById('clima-agora').textContent = `${t}°C, ${weatherCodeToText(code)}`;
      document.getElementById('tempo-resumo').textContent = `${t}°C, ${weatherCodeToText(code)}`;
    }catch(e){}
  }
})();
