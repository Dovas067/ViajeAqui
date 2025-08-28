/* ============ CLIMA (WeatherAPI.com) ============ */

// 1) WeatherAPI (obrigatório para clima em tempo real)
const WEATHERAPI_KEY = "6b92a35856234755814182759252808";

function setupClima() {
  const buscarClimaBtn = document.getElementById('buscar-clima');
  const cidadeInput = document.getElementById('cidade-input');
  const climaInfo = document.getElementById('clima-info');
  if (!buscarClimaBtn || !cidadeInput || !climaInfo) return;

  async function buscarClima(cidade) {
    try {
      climaInfo.innerHTML = '<p>Buscando clima...</p>';
      const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHERAPI_KEY}&q=${encodeURIComponent(cidade)}&lang=pt`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        climaInfo.innerHTML = `<p>Erro: ${data.error.message}</p>`;
        return;
      }

      const temp = Math.round(data.current.temp_c);
      const condicao = data.current.condition.text;
      const umidade = data.current.humidity;
      const icon = data.current.condition.icon;
      const cidadeNome = data.location.name;
      const pais = data.location.country;

      climaInfo.innerHTML = `
        <img src="https:${icon}" alt="${condicao}" />
        <p class="clima-temp">${temp}°C</p>
        <p>${condicao} • Umidade: ${umidade}%</p>
        <p>${cidadeNome}, ${pais}</p>
      `;
    } catch (e) {
      climaInfo.innerHTML = `<p>Erro de rede ao buscar clima.</p>`;
    }
  }

  buscarClimaBtn.addEventListener('click', () => {
    const cidade = cidadeInput.value.trim();
    if (!cidade) {
      climaInfo.innerHTML = '<p>Por favor, informe uma cidade.</p>';
      return;
    }
    if (!WEATHERAPI_KEY || WEATHERAPI_KEY.includes('COLOQUE_SUA_CHAVE')) {
      climaInfo.innerHTML = '<p>Configure sua chave da WeatherAPI na variável WEATHERAPI_KEY.</p>';
      return;
    }
    buscarClima(cidade);
  });
}
