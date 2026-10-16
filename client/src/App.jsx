import React, { useEffect, useState } from 'react';
import { RefreshCw, Vote } from 'lucide-react';
import StateCard from './components/StateCard';
import AcreWidget from './components/AcreWidget';
import ProjectionWidget from './components/ProjectionWidget';

const ESTADOS = [
  { uf: 'ac', nome: 'Acre' },
  { uf: 'al', nome: 'Alagoas' },
  { uf: 'am', nome: 'Amazonas' },
  { uf: 'ap', nome: 'Amapá' },
  { uf: 'ba', nome: 'Bahia' },
  { uf: 'ce', nome: 'Ceará' },
  { uf: 'df', nome: 'Distrito Federal' },
  { uf: 'es', nome: 'Espírito Santo' },
  { uf: 'go', nome: 'Goiás' },
  { uf: 'ma', nome: 'Maranhão' },
  { uf: 'mg', nome: 'Minas Gerais' },
  { uf: 'ms', nome: 'Mato Grosso do Sul' },
  { uf: 'mt', nome: 'Mato Grosso' },
  { uf: 'pa', nome: 'Pará' },
  { uf: 'pb', nome: 'Paraíba' },
  { uf: 'pe', nome: 'Pernambuco' },
  { uf: 'pi', nome: 'Piauí' },
  { uf: 'pr', nome: 'Paraná' },
  { uf: 'rj', nome: 'Rio de Janeiro' },
  { uf: 'rn', nome: 'Rio Grande do Norte' },
  { uf: 'ro', nome: 'Rondônia' },
  { uf: 'rr', nome: 'Roraima' },
  { uf: 'rs', nome: 'Rio Grande do Sul' },
  { uf: 'sc', nome: 'Santa Catarina' },
  { uf: 'se', nome: 'Sergipe' },
  { uf: 'sp', nome: 'São Paulo' },
  { uf: 'to', nome: 'Tocantins' }
];

export default function App() {
  const [dadosGerais, setDadosGerais] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchApuracaoCompleta = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/apuracao?uf=br');
      const json = await res.json();
      setDadosGerais(json);
    } catch (err) {
      console.error('Erro ao carregar apuração:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApuracaoCompleta();
    const interval = setInterval(fetchApuracaoCompleta, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans pb-28">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Vote className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Apuração Presidencial — 2º Turno</h1>
            <p className="text-xs text-slate-400 mt-0.5">Painel de Monitoramento em Tempo Real</p>
          </div>
        </div>

        <button
          onClick={fetchApuracaoCompleta}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700/60 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-semibold text-slate-200 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          <span>Atualizar Dados</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto space-y-6 pr-0 xl:pr-88">
        {/* Destaque Principal: BRASIL */}
        <section className="bg-slate-800/90 border-2 border-emerald-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <StateCard
            uf="br"
            nomeEstado="Brasil (Total Nacional)"
            dados2T={dadosGerais.dadosTse}
            dados1T={dadosGerais.primeiroTurno}
          />
        </section>

        {/* Grelha dos Estados */}
        <section>
          <h2 className="text-lg font-bold text-slate-300 mb-4 px-1">Estados (UFs)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ESTADOS.map((est) => (
              <StateCard
                key={est.uf}
                uf={est.uf}
                nomeEstado={est.nome}
                dados2T={dadosGerais.dadosTse}
                dados1T={dadosGerais.primeiroTurno}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Painel Flutuante de Projeções (Empilhado à direita em tons arroxeados) */}
      <ProjectionWidget projecao={dadosGerais.projecao} />

      {/* Mini Widget Flutuante do Governo do Acre */}
      <AcreWidget />
    </div>
  );
}
