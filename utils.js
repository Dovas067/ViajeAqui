// utils.js

/**
 * Maps a weather code from Open-Meteo to a descriptive text.
 * @param {number} code - The weather code.
 * @returns {string} The descriptive text.
 */
export function weatherCodeToText(code) {
  const map = {
    0: 'Céu limpo',
    1: 'Principalmente limpo',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Nevoeiro',
    48: 'Nevoeiro depositante',
    51: 'Garoa leve',
    53: 'Garoa',
    55: 'Garoa forte',
    61: 'Chuva fraca',
    63: 'Chuva',
    65: 'Chuva forte',
    71: 'Neve fraca',
    73: 'Neve',
    75: 'Neve forte',
    80: 'Pancadas fracas',
    81: 'Pancadas',
    82: 'Pancadas fortes',
    95: 'Trovoadas'
  };
  return map[code] || 'Tempo variável';
}

/**
 * A simple utility to manage loading states on elements.
 * @param {HTMLElement} element - The element to show or hide the loading state on.
 * @param {boolean} isLoading - Whether to show the loading state.
 */
export function toggleLoading(element, isLoading) {
  if (isLoading) {
    element.disabled = true;
    element.classList.add('loading');
  } else {
    element.disabled = false;
    element.classList.remove('loading');
  }
}

/**
 * Base data for itinerary suggestions.
 */
export const baseSuggestions = {
  natureza: ['Parque central', 'Trilha leve', 'Mirante', 'Jardim botânico'],
  cultura: ['Museu histórico', 'Centro cultural', 'Igreja/Templo', 'Bairro antigo'],
  gastronomia: ['Mercado municipal', 'Feira de rua', 'Restaurante típico', 'Cafeteria local'],
  esportes: ['Ciclismo na orla', 'Caiaque', 'Aula de surf', 'Corrida no parque'],
  compras: ['Rua de compras', 'Shopping', 'Feirinha de artesanato', 'Livraria local']
};

/**
 * Retrieves data from localStorage, or an empty array if not found.
 * @param {string} key - The localStorage key.
 * @returns {Array<any>}
 */
export function getSavedData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    console.error(`Error parsing localStorage key: ${key}`, e);
    return [];
  }
}

/**
 * Saves data to localStorage.
 * @param {string} key - The localStorage key.
 * @param {any} data - The data to save.
 */
export function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving to localStorage key: ${key}`, e);
  }
}