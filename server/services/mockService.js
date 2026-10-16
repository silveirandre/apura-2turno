let progresso = 85.42;

export function getMockApuracaoBrasil() {
  const vTotal = 110000000;
  const vApurados = Math.round(vTotal * (progresso / 100));
  
  const vCand2 = Math.round(vApurados * 0.55);
  const vCand1 = vApurados - vCand2;

  return {
    pst: progresso.toFixed(2).replace('.', ','),
    cand: [
      {
        n: '13',
        nm: 'Candidato A',
        pvp: '45,00',
        vap: vCand1.toString()
      },
      {
        n: '22',
        nm: 'Candidato B',
        pvp: '55,00',
        vap: vCand2.toString()
      }
    ]
  };
}

export function getMockAcre() {
  return {
    pst: progresso.toFixed(2).replace('.', ','),
    cand: [
      { n: '10', nm: 'Candidato AC 1', pvp: '45,00', vap: '100000' },
      { n: '15', nm: 'Candidato AC 2', pvp: '55,00', vap: '122222' }
    ]
  };
}
