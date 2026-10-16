import React, { useEffect, useState } from 'react';
import { Award, RefreshCw } from 'lucide-react';

export default function AcreWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAcreData = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/governo-ac');
      const json = await res.json();
      setData(json.dadosTse);
    } catch (err) {
      console.error('Erro ao buscar Governo AC:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcreData();
    const interval = setInterval(fetchAcreData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-800/95 backdrop-blur-md border border-emerald-500/40 rounded-2xl p-5 shadow-2xl max-w-sm w-full text-white transition-all">
      <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
        <div className="flex items-center gap-2.5">
          <Award className="w-6 h-6 text-emerald-400" />
          <span className="font-bold text-base tracking-wide">Governo do Acre</span>
        </div>
        <button 
          onClick={fetchAcreData}
          className="text-slate-400 hover:text-emerald-400 transition-colors p-1.5 rounded-lg hover:bg-slate-700/50 cursor-pointer"
          title="Atualizar"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
        </button>
      </div>

      {data ? (
        <div>
          <div className="flex justify-between items-center text-xs text-slate-300 font-medium mb-3">
            <span>Seções apuradas</span>
            <span className="font-bold text-sm text-emerald-400 font-mono">{data.pst}%</span>
          </div>
          <div className="space-y-3">
            {data.cand?.map((c) => (
              <div key={c.n} className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/50">
                <div className="flex justify-between items-center text-sm font-semibold mb-1.5">
                  <span className="truncate">{c.nm} <span className="text-slate-400 text-xs">({c.n})</span></span>
                  <span className="text-emerald-400 font-mono text-base">{c.pvp}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${parseFloat(c.pvp.replace(',', '.'))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-xs text-slate-400 text-center py-4">Carregando apuração do AC...</div>
      )}
    </div>
  );
}
