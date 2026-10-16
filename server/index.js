import express from 'express';
import cors from 'cors';
import { fetchApuracaoTse, fetchAcreTse } from './services/tseService.js';
import { carregarDadosPrimeiroTurno } from './services/primeiroTurnoService.js';
import { calcularProjecao } from './services/projectionService.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/apuracao', async (req, res) => {
  const uf = req.query.uf || 'br';
  const dadosTse = await fetchApuracaoTse(uf);
  const dados1T = carregarDadosPrimeiroTurno(uf);
  const projecao = calcularProjecao(dadosTse, dados1T);

  res.json({
    uf,
    primeiroTurno: dados1T,
    dadosTse,
    projecao
  });
});

app.get('/api/governo-ac', async (req, res) => {
  const dadosTse = await fetchAcreTse();
  res.json({
    uf: 'ac',
    cargo: 'governo',
    dadosTse
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Backend rodando na porta ${PORT}`);
});
