import React, { useEffect, useState } from 'react';

export default function AcreWidget() {
  const [dadosAcre, setDadosAcre] = useState(null);

  useEffect(() => {
    const fetchAcre = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/governo-ac');
        const json = await res.json();
        setDadosAcre(json);
      } catch (err) {
        console.error('Erro ao carregar dados do Acre:', err);
      }
    };

    fetchAcre();
    const interval = setInterval(fetchAcre, 15000);
    return () => clearInterval(interval);
  }, []);

  const pctApuradoStr = dadosAcre?.pst || '0,00';

  const candidatos = dadosAcre?.cand ? [...dadosAcre.cand] : [
    { nm: 'Candidato X', n: '11', pvp: '52,10', st: '' },
    { nm: 'Candidato Y', n: '15', pvp: '47,90', st: '' }
  ];

  candidatos.sort((a, b) => {
    const valA = parseFloat((a.pvp || '0').replace(',', '.'));
    const valB = parseFloat((b.pvp || '0').replace(',', '.'));
    return valB - valA;
  });

  return (
    <div className="fixed bottom-4 right-4 bg-slate-800/95 border border-emerald-500/40 backdrop-blur-md rounded-xl p-4 shadow-2xl z-50 max-w-xs w-full hidden sm:block">
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-700/60">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Governo do Acre (AC)</h4>
        <span className="text-[10px] font-mono text-emerald-400 font-bold">{pctApuradoStr}% Apurado</span>
      </div>

      <div className="space-y-2">
        {candidatos.map((c) => {
          const pct = parseFloat((c.pvp || '0').replace(',', '.')) || 0;
          // CRITÉRIO DE RISCO ZERO: Somente via status oficial do TSE
          const eleito = c.st?.toLowerCase().includes('eleito') || c.st === 'e';

          return (
            <div key={c.n} className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-semibold text-slate-200 truncate flex items-center gap-1.5">
                  <span>{c.nm} ({c.n})</span>
                  {eleito && (
                    <span className="bg-emerald-500 text-slate-950 font-black px-1 py-0.5 rounded text-[8px] uppercase tracking-wider animate-pulse">
                      ELEITO
                    </span>
                  )}
                </span>
                <span className="font-mono font-bold text-emerald-400 text-xs">{c.pvp}%</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${eleito ? 'bg-emerald-400' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
