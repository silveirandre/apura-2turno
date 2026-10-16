import React from 'react';

export default function StateCard({ uf, nomeEstado, dados2T, dados1T }) {
  const pst = dados2T?.pst || '0,00';
  const cands = dados2T?.cand || [];

  return (
    <div className="relative overflow-hidden bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-600 transition-all">
      
      {/* Camada de Fundo / Marca d'Água do 1º Turno */}
      {dados1T && (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-end p-4 opacity-10 select-none">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300 block">1º Turno (Ref)</span>
            <div className="text-xs font-mono text-slate-200 mt-1">
              <span>C1: {dados1T.cand1}%</span> | <span>C2: {dados1T.cand2}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo Principal do 2º Turno (Frente) */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">{nomeEstado}</h3>
            <span className="text-xs text-slate-400 uppercase font-mono">{uf.toUpperCase()}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Apurado</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">{pst}%</span>
          </div>
        </div>

        <div className="space-y-3 my-2">
          {cands.length > 0 ? (
            cands.map((c) => {
              const pct = parseFloat(c.pvp.replace(',', '.'));
              return (
                <div key={c.n} className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs font-medium text-slate-200 mb-1.5">
                    <span className="truncate">{c.nm} <span className="text-slate-500">({c.n})</span></span>
                    <span className="font-bold text-emerald-400 font-mono">{c.pvp}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-xs text-slate-500 text-center py-4 font-mono">
              Aguardando apuração...
            </div>
          )}
        </div>
      </div>

      {/* Rodapé com indicação discreta de referência */}
      {dados1T && (
        <div className="relative z-10 pt-2 border-t border-slate-700/40 text-[10px] text-slate-500 flex justify-between">
          <span>Marca d'água: 1º Turno</span>
          <span>1T: {dados1T.cand1}% / {dados1T.cand2}%</span>
        </div>
      )}
    </div>
  );
}
