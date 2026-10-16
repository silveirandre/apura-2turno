import fetch from 'node-fetch';
import { getMockApuracaoBrasil, getMockAcre } from './mockService.js';

let cacheBrasil = null;
let cacheAcre = null;

export async function fetchApuracaoTse(uf = 'br') {
  const url = `https://resultados.tse.jus.br/oficial/ele2026/628/dados-simplificados/${uf.toLowerCase()}/${uf.toLowerCase()}-c0001-e000628-r.json`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    cacheBrasil = data;
    return data;
  } catch (error) {
    // Quando o TSE estiver inacessível/fora do ar (ex: pré-eleição), usa o simulador
    return getMockApuracaoBrasil();
  }
}

export async function fetchAcreTse() {
  const url = `https://resultados.tse.jus.br/oficial/ele2026/628/dados-simplificados/ac/ac-c0003-e000628-r.json`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    cacheAcre = data;
    return data;
  } catch (error) {
    return getMockAcre();
  }
}
