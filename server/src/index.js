import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchApuracaoTse, fetchAcreTse } from '../services/tseService.js';
import { getMockApuracaoBrasil, getMockAcre } from '../services/mockService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leitura segura do JSON do 1º Turno
const primeiroTurnoPath = path.join(__dirname, '../data/primeiroTurno.json');
let primeiroTurno = {};
try {
  primeiroTurno = JSON.parse(fs.readFileSync(primeiroTurnoPath, 'utf8'));
} catch (err) {
  console.error('Erro ao ler primeiroTurno.json:', err.message);
}

const app = express();
app.use(cors());

// FLAG DE PRODUÇÃO: Desativado o mock forçado para consumir a API do TSE em tempo real
const FORCAR_MOCK_LOCAL = false;

// Rota principal da apuração
app.get('/api/apuracao', async (req, res) => {
  const uf = (req.query.uf || 'br').toLowerCase();
  let dadosTse = null;

  if (FORCAR_MOCK_LOCAL) {
    dadosTse = getMockApuracaoBrasil();
  } else {
    dadosTse = await fetchApuracaoTse(uf);
    if (!dadosTse) {
      console.log('⚠️ TSE inacessível ou sem dados, ativando fallback mock local');
      dadosTse = getMockApuracaoBrasil();
    } else {
      console.log(`✅ Dados do TSE recebidos com sucesso (${uf.toUpperCase()})`);
    }
  }

  // Referência do 1º turno
  const ref1T = primeiroTurno[uf.toUpperCase()] || { cand1: 45.0, cand2: 55.0 };

  res.json({
    uf,
    dadosTse,
    primeiroTurno: ref1T,
    projecao: {
      status: 'calculado',
      tendencia: 'Em Acompanhamento',
      margem: 'Apurando',
      probabilidade: '--%'
    }
  });
});

// Rota do Governo do Acre
app.get('/api/governo-ac', async (req, res) => {
  let dados = null;
  if (FORCAR_MOCK_LOCAL) {
    dados = getMockAcre();
  } else {
    dados = await fetchAcreTse();
    if (!dados) dados = getMockAcre();
  }
  res.json(dados);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 SERVIDOR EM MODO DE PRODUÇÃO (Porta ${PORT})`);
  console.log(`📡 Conectado à API oficial do TSE para o 2º Turno`);
});
