# 🌍 ViajeAqui — Guia Inteligente de Viagens (PWA)

## 🧠 1. Processo de Ideação

O projeto nasceu a partir da seguinte questão norteadora:  
**Como facilitar a vida de viajantes, unindo em um único aplicativo funcionalidades essenciais para turismo, planejamento e organização?**

Durante a fase de ideação, foram levantados problemas comuns enfrentados por turistas:
- Dificuldade em encontrar atrações próximas de forma rápida.
- Necessidade de **roteiros personalizados** segundo dias, interesses e orçamento.
- Acesso a **clima em tempo real**.
- Conversão de moedas e comunicação em outros idiomas.
- Organização de **checklists de viagem**.
- Falta de recursos **offline** durante deslocamentos.
- Desejo de compartilhar dicas com outros viajantes.

A resposta foi criar o **ViajeAqui**: um **aplicativo web progressivo (PWA)** que funciona em qualquer navegador, leve e acessível, combinando mapas, roteiros, clima, câmbio, frases úteis, checklist e uma pequena rede comunitária.

---

## 📐 2. Protótipo Inicial

O protótipo inicial foi desenvolvido com:
- **HTML5 + CSS3** (responsivo e acessível).
- **JavaScript Vanilla** (sem frameworks complexos).
- **Leaflet.js** para mapas interativos.
- **APIs públicas** como OpenStreetMap e Open-Meteo.

### Estrutura planejada
- **Cabeçalho fixo** com navegação por seções.
- **Cards** para agrupar informações (clima, roteiros, dicas).
- **Seções SPA** controladas por hash (`#home`, `#mapa`, etc.).
- **Modo offline** via Service Worker.

> Exemplo de wireframe inicial:
>
> ![Protótipo — Wireframe](https://i.ibb.co/zVdRw6m/prototipo-wireframe.png)

---

## 🌎 3. Caráter Extensionista

Este projeto tem caráter **extensionista** porque:
- É **gratuito, aberto e acessível** em qualquer navegador.
- Funciona como **PWA**: pode ser instalado e usado **offline**.
- Reaproveita **APIs públicas** e dados comunitários (OpenStreetMap, Overpass, Open-Meteo).
- Possibilita o uso em **oficinas de turismo e tecnologia**, ampliando a inclusão digital.
- Estimula o **compartilhamento comunitário** de dicas, fortalecendo a colaboração entre viajantes.
- Pode ser replicado em contextos educacionais, servindo como exemplo prático de integração entre **web, turismo e inovação social**.

---

## 💻 4. Tutorial do Código Desenvolvido

### Estrutura de Arquivos
- **`index.html`** → Estrutura da aplicação em formato SPA:contentReference[oaicite:0]{index=0}.
- **`styles.css`** → Estilos responsivos e consistentes:contentReference[oaicite:1]{index=1}.
- **`app.js`** → Lógica principal (mapa, clima, roteiros, checklist, etc.):contentReference[oaicite:2]{index=2}.
- **`manifest.json`** → Configuração PWA (nome, ícones, cores):contentReference[oaicite:3]{index=3}.
- **`sw.js`** → Service Worker: cache e funcionamento offline:contentReference[oaicite:4]{index=4}.

---

### 🔎 Navegação SPA
O site usa **hash routing** para alternar entre seções sem recarregar a página:

```js
function showSection(id) {
  sections.forEach(s => s.classList.toggle('hidden', '#' + s.id !== id));

📍 Geolocalização + Mapa

Leaflet.js para renderizar mapas.

Overpass API para buscar atrações próximas (ex: restaurantes, hotéis, farmácias).

Botão "Ativar localização" centraliza o mapa no usuário.

let map = L.map('map').setView([0,0], 2);
navigator.geolocation.getCurrentPosition((pos) => {
  const { latitude, longitude } = pos.coords;
  userMarker = L.marker([latitude, longitude]).addTo(map).bindPopup('Você está aqui');
  map.setView([latitude, longitude], 15);
});

☁️ Clima em Tempo Real

Usa a API Open-Meteo para clima atual e previsão de 48h.

async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?...`;
  const r = await fetch(url);
  const j = await r.json();
  const t = j.current.temperature_2m;
  document.getElementById('tempo-resumo').textContent = `${t}°C`;
}


📝 Roteiros Personalizados

O usuário escolhe dias, interesses, orçamento e estilo → o app gera sugestões automáticas.

Possibilidade de baixar o roteiro em TXT.

Exemplo de geração:

function gerarRoteiroTexto(dias, interesses, orc, estilo) {
  let texto = `Roteiro — estilo ${estilo}\n`;
  for (let d=1; d<=dias; d++) {
    texto += `Dia ${d}: ${interesses.join(' • ')}`;
  }
  return texto;
}

💵 Conversor de Moedas

Conversão BRL ⇄ USD usando taxa fixa de 1 USD = 5.60 BRL.

let taxas = { USD: { BRL: 5.60 }, BRL: { USD: 1/5.60 } };


💬 Frases Úteis

Frases rápidas em Inglês, Espanhol e Francês, exibidas sob demanda.

const frases = { en: ['Hello, please.'], es: ['Hola, por favor.'], fr: ['Bonjour, s’il vous plaît.'] };


✅ Checklist de Viagem

Lista persistida no localStorage.
Permite adicionar itens, marcar concluídos e limpar.

function renderChecklist(){
  const list = JSON.parse(localStorage.getItem('viajeaqui_checklist')||'[]');
}

👥 Comunidade

Usuários podem postar dicas + fotos.
Os posts ficam salvos localmente e renderizados como cards.

const feed = JSON.parse(localStorage.getItem('viajeaqui_feed')||'[]');


🚲 Transporte

Simulação de aluguel de bike, patinete ou carro com cálculo de preço.

📶 PWA (Modo Offline)

manifest.json: define nome, ícones e cores do app . 

sw.js: salva arquivos essenciais em cache para uso offline . 

🏁 5. Conclusão — Aprendizados

Com o desenvolvimento do ViajeAqui, os aprendizados foram:

Como criar uma SPA leve sem frameworks.

Uso prático de APIs públicas (clima, mapas, dados comunitários).

Integração de Leaflet.js para mapas interativos.

Criação de um PWA funcional com Service Workers.

Implementação de funcionalidades reais de apoio a viajantes.

Reflexão sobre o impacto social e extensionista da tecnologia.

. Integrante

Joaquim Cunha 1 — RA: 10735780



}
window.addEventListener('hashchange', () => showSection(location.hash || '#home'));

<img width="1908" height="896" alt="image" src="https://github.com/user-attachments/assets/8cfdbf71-6d69-4e20-b2f6-c29639752f22" />
<img width="1915" height="888" alt="image" src="https://github.com/user-attachments/assets/f11ef43c-bf6f-4d6a-8a0c-1c45d38b0b12" />
<img width="1898" height="912" alt="image" src="https://github.com/user-attachments/assets/c567964d-a733-46ab-8d56-fe2ee7ae3a81" />



