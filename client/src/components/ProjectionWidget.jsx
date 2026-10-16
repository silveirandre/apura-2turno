import React from 'react';
import { TrendingUp, Target, Clock } from 'lucide-react';

export default function ProjectionWidget({ projecao }) {
  const candidatoA = projecao?.candidatoA;
  const candidatoB = projecao?.candidatoB;
  const analise = projecao?.analise;
  const pctApurado = projecao?.pctApurado || '0,00';

  return (
    <div className="fixed top-28 right-6 z-40 hidden xl:flex flex-col gap-4 w-80 text-white">
      {/* Card 1: Projeção de Tendência Final */}
      <div className="bg-gradient-to-br from-indigo-900/90 to-slate-900/95 backdrop-blur-md border border-indigo-500/50 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center gap-2 mb-3 border-b border-indigo-500/30 pb-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-sm text-indigo-200 tracking-wide">Projeção Estatística</h3>
        </div>

        {candidatoA && candidatoB ? (
          <div>
            <div className="text-[11px] text-indigo-300/80 mb-3">
              Estimativa calculada com base na apuração atual ({pctApurado}%) e pesos do 1º Turno.
            </div>

            <div className="space-y-3">
              {/* Candidato A */}
              <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-800/50">
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span className="truncate">{candidatoA.nome}</span>
                  <span className="text-indigo-300 font-mono text-sm">{candidatoA.projecaoPct}%</span>
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Atual: {candidatoA.atualPct}%</span>
                  <span>Projetado</span>
                </div>
              </div>

              {/* Candidato B */}
              <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-800/50">
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span className="truncate">{candidatoB.nome}</span>
                  <span className="text-indigo-300 font-mono text-sm">{candidatoB.projecaoPct}%</span>
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Atual: {candidatoB.atualPct}%</span>
                  <span>Projetado</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-2">
            <Clock className="w-6 h-6 text-indigo-400 animate-pulse mx-auto" />
            <p className="text-xs text-indigo-200/80 font-medium">Aguardando início da apuração...</p>
            <p className="text-[10px] text-slate-400">As projeções serão geradas com a chegada das primeiras urnas.</p>
          </div>
        )}
      </div>

      {/* Card 2: Análise da Virada / Votos Remanescentes */}
      <div className="bg-gradient-to-br from-slate-900/95 to-indigo-950/90 backdrop-blur-md border border-indigo-500/40 rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center gap-2 mb-3 border-b border-indigo-500/30 pb-2">
          <Target className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-sm text-purple-200 tracking-wide">Margem & Votos Restantes</h3>
        </div>

        {analise ? (
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-lg">
              <span className="text-slate-400">Diferença Atual:</span>
              <span className="font-bold font-mono text-indigo-300">{analise.diferencaVotos} votos</span>
            </div>

            <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-lg">
              <span className="text-slate-400">Votos a Apurar:</span>
              <span className="font-bold font-mono text-purple-300">~{analise.votosFaltantesEstimados}</span>
            </div>

            <div className="flex justify-between items-center bg-slate-800/60 p-2 rounded-lg">
              <span className="text-slate-400">Taxa p/ Virada:</span>
              <span className="font-bold font-mono text-amber-400">{analise.taxaViradaNecessaria}</span>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center">
            <p className="text-xs text-slate-400">Modelo estatístico em prontidão.</p>
          </div>
        )}
      </div>
    </div>
  );
}
