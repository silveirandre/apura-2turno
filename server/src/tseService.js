import fetch from 'node-fetch';

const BASE_URL_PRESIDENTE = 'https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados';
const BASE_URL_GOVERNO_AC = 'https://resultados.tse.jus.br/oficial/ele2022/547/dados-simplificados/ac';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Cache-Control': 'no-cache'
};

// Mock para testes locais caso o TSE esteja inacessível
const MOCK_PRESIDENTE = {
  pst: "85,42",
  cand: [
    { n: "13", nm: "Candidato A", pvp: "50,80", vap: "51200300" },
    { n: "22", nm: "Candidato B", pvp: "49,20", vap: "49580200" }
  ]
};

const MOCK_GOVERNO_AC = {
  pst: "91,10",
  cand: [
    { n: "11", nm: "Gov Candidato 1", pvp: "53,15", vap: "210400" },
    { n: "44", nm: "Gov Candidato 2", pvp: "46,85", vap: "185500" }
  ]
};

export async function getApuracaoPresidente(uf = 'br') {
  try {
    const url = uf === 'br'
      ? `${BASE_URL_PRESIDENTE}/br/br-c0001-e000545-r.json`
      : `${BASE_URL_PRESIDENTE}/${uf}/${uf}-c0001-e000545-r.json`;

    const response = await fetch(url, { headers: HEADERS });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Aviso: TSE fora do ar ou inacessível (${uf}). Usando mock local.`);
    return MOCK_PRESIDENTE;
  }
}

export async function getApuracaoGovernoAC() {
  try {
    const url = `${BASE_URL_GOVERNO_AC}/ac-c0003-e000547-r.json`;
    const response = await fetch(url, { headers: HEADERS });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Aviso: TSE Governo AC inacessível. Usando mock local.');
    return MOCK_GOVERNO_AC;
  }
}
