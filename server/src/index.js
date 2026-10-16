import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Carrega os dados estáticos do 1º turno como referência
let primeiroTurnoData = {};
try {
  const rawData = readFileSync(join(__dirname, '../data/primeiro_turno.json'), 'utf-8');
  primeiroTurnoData = JSON.parse(rawData);
} catch (err) {
  console.error('Aviso: Não foi possível carregar primeiro_turno.json', err.message);
}

// Rota de teste e verificação do status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor Apuração 2º Turno ativo',
    timestamp: new Date().toISOString(),
    primeiroTurnoCarregado: Object.keys(primeiroTurnoData).length > 0
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
