export function calcularProjecao(dados2T, dados1T) {
  if (!dados2T || !dados2T.cand || dados2T.cand.length === 0) {
    return null;
  }

  const c1 = dados2T.cand[0];
  const c2 = dados2T.cand[1];

  const pctApurado = parseFloat(dados2T.pst.replace(',', '.'));
  const vTotais = parseFloat(c1.vap) + parseFloat(c2.vap);
  const vA = parseFloat(c1.vap);
  const vB = parseFloat(c2.vap);

  let projA = parseFloat(c1.pvp.replace(',', '.'));
  let projB = parseFloat(c2.pvp.replace(',', '.'));

  if (pctApurado > 0 && pctApurado < 95 && dados1T) {
    const peso1T_A = dados1T.cand1;
    const peso1T_B = dados1T.cand2;
    const total1T = peso1T_A + peso1T_B;

    const prop1T_A = peso1T_A / total1T;
    const prop1T_B = peso1T_B / total1T;

    const fatorApurado = pctApurado / 100;
    const fatorRestante = 1 - fatorApurado;

    projA = (projA * fatorApurado) + (prop1T_A * 100 * fatorRestante);
    projB = (projB * fatorApurado) + (prop1T_B * 100 * fatorRestante);
  }

  const difVotos = Math.abs(vA - vB);
  const estimativaVotosFaltantes = pctApurado > 0 ? Math.round((vTotais / (pctApurado / 100)) - vTotais) : 0;
  
  let taxaViradaNecessaria = 0;
  if (vA < vB && estimativaVotosFaltantes > 0) {
    taxaViradaNecessaria = ((vB - vA + (estimativaVotosFaltantes / 2)) / estimativaVotosFaltantes) * 100;
  } else if (vB < vA && estimativaVotosFaltantes > 0) {
    taxaViradaNecessaria = ((vA - vB + (estimativaVotosFaltantes / 2)) / estimativaVotosFaltantes) * 100;
  }

  return {
    pctApurado: pctApurado.toFixed(2),
    candidatoA: {
      nome: c1.nm,
      numero: c1.n,
      atualPct: c1.pvp,
      projecaoPct: projA.toFixed(2),
      votos: c1.vap
    },
    candidatoB: {
      nome: c2.nm,
      numero: c2.n,
      atualPct: c2.pvp,
      projecaoPct: projB.toFixed(2),
      votos: c2.vap
    },
    analise: {
      diferencaVotos: difVotos.toLocaleString('pt-BR'),
      votosFaltantesEstimados: estimativaVotosFaltantes.toLocaleString('pt-BR'),
      taxaViradaNecessaria: taxaViradaNecessaria > 100 ? 'Matematicamente Impossível' : `${Math.max(0, taxaViradaNecessaria).toFixed(1)}%`,
      matematicamenteDefinido: pctApurado > 98 || taxaViradaNecessaria > 100
    }
  };
}
