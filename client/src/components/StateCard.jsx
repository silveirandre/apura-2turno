import React from 'react';

export default function StateCard({ uf, nomeEstado, dados2T, dados1T }) {
  const pctApuradoStr = dados2T?.pst || '0,00';

  // Lista de candidatos
  const listaCandidatos = dados2T?.cand ? [...dados2T.cand] : [
    { nm: 'Candidato A', n: '13', pvp: '45,00', vap: '0', st: '' },
    { nm: 'Candidato B', n: '22', pvp: '55,00', vap: '0', st: '' }
  ];

  // ORDENAÇÃO DINÂMICA: Maior percentual no topo
  listaCandidatos.sort((a, b) => {
    const valA = parseFloat((a.pvp || '0').replace(',', '.'));
    const valB = parseFloat((b.pvp || '0').replace(',', '.'));
    return valB - valA;
  });

  const c1_2T = listaCandidatos[0]; // Líder
  const c2_2T = listaCandidatos[1]; // Segundo colocado

  const p1 = parseFloat((c1_2T.pvp || '0').replace(',', '.')) || 0;
  const p2 = parseFloat((c2_2T.pvp || '0').replace(',', '.')) || 0;

  // CRITÉRIO DE RISCO ZERO: Exibe ELEITO APENAS quando o TSE confirmar oficialmente no JSON (st = 'e' ou 'Eleito')
  const isEleito1 = c1_2T.st?.toLowerCase().includes('eleito') || c1_2T.st === 'e';
  const isEleito2 = c2_2T.st?.toLowerCase().includes('eleito') || c2_2T.st === 'e';

  // Referência do 1º Turno
  const pct1T_13 = dados1T?.cand1 ? dados1T.cand1.toFixed(2).replace('.', ',') : '0,00';
  const pct1T_22 = dados1T?.cand2 ? dados1T.cand2.toFixed(2).replace('.', ',') : '0,00';

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 shadow-lg flex flex-col justify-between gap-3 relative overflow-hidden">
      {/* Cabeçalho */}
      <div className="flex justify-between items-start border-b border-slate-700/50 pb-2">
        <div>
          <h3 className="font-bold text-white text-base tracking-tight">{nomeEstado}</h3>
          <span className="text-[10px] text-slate-400 font-mono uppercase">{uf}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Apurado</span>
          <span className="font-mono text-sm font-bold text-emerald-400">{pctApuradoStr}%</span>
        </div>
      </div>

      {/* Candidatos e Barras */}
      <div className="space-y-3 my-1">
        {/* LÍDER DO 2º TURNO */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-200 truncate pr-2 flex items-center gap-2">
              <span>{c1_2T.nm} <span className="text-slate-400 font-normal">({c1_2T.n})</span></span>
              {isEleito1 && (
                <span className="bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider animate-pulse shadow-sm shadow-emerald-500/50 shrink-0">
                  ELEITO
                </span>
              )}
            </span>
            <span className="font-mono font-bold text-emerald-400 text-sm shrink-0">{c1_2T.pvp}%</span>
          </div>
          <div className="w-full bg-slate-900/80 rounded-full h-2 overflow-hidden border border-slate-700/50">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isEleito1 ? 'bg-emerald-400' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(100, Math.max(0, p1))}%` }}
            />
          </div>
        </div>

        {/* 2º COLOCADO */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-200 truncate pr-2 flex items-center gap-2">
              <span>{c2_2T.nm} <span className="text-slate-400 font-normal">({c2_2T.n})</span></span>
              {isEleito2 && (
                <span className="bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider animate-pulse shadow-sm shadow-emerald-500/50 shrink-0">
                  ELEITO
                </span>
              )}
            </span>
            <span className="font-mono font-bold text-emerald-400 text-sm shrink-0">{c2_2T.pvp}%</span>
          </div>
          <div className="w-full bg-slate-900/80 rounded-full h-2 overflow-hidden border border-slate-700/50">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, p2))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Rodapé do 1º Turno */}
      <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between gap-1 text-[10px] text-slate-400/80 font-mono">
        <span className="bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-700/40 text-[9px] uppercase tracking-wider text-slate-400 shrink-0">
          1º Turno
        </span>
        
        <div className="flex items-center gap-1.5 text-[10px] font-medium">
          <span className="whitespace-nowrap">
            13: <strong className="text-slate-200">{pct1T_13}%</strong>
          </span>
          <span className="text-slate-600">•</span>
          <span className="whitespace-nowrap">
            22: <strong className="text-slate-200">{pct1T_22}%</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
