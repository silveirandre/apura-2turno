import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getApuracaoPresidente, getApuracaoGovernoAC } from './tseService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Dados estáticos do 1º turno
let primeiroTurnoData = {};
try {
  const rawData = readFileSync(join(__dirname, '../data/primeiro_turno.json'), 'utf-8');
  primeiroTurnoData = JSON.parse(rawData);
} catch (err) {
  console.error('Aviso: Não foi possível carregar primeiro_turno.json', err.message);
}

// Rota de status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor Apuração 2º Turno ativo',
    timestamp: new Date().toISOString(),
    primeiroTurnoCarregado: Object.keys(primeiroTurnoData).length > 0
  });
});

// Rota da apuração presidencial (Brasil ou UF específica)
app.get('/api/apuracao', async (req, res) => {
  const uf = (req.query.uf || 'br').toLowerCase();
  const dadosTse = await getApuracaoPresidente(uf);
  
  res.json({
    uf,
    primeiroTurno: primeiroTurnoData[uf] || null,
    dadosTse
  });
});

// Rota dedicada para o mini widget do Governo do Acre
app.get('/api/governo-ac', async (req, res) => {
  const dadosTse = await getApuracaoGovernoAC();
  res.json({ dadosTse });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
