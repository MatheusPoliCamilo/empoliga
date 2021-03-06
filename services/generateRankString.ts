export function generateRankString({ rank, tier, leaguePoints }) {
  switch (tier) {
    case 'UNRANKED':
      return `Unranked`
    case 'IRON':
      return `Ferro ${rank}`
    case 'BRONZE':
      return `Bronze ${rank}`
    case 'SILVER':
      return `Prata ${rank}`
    case 'GOLD':
      return `Ouro ${rank}`
    case 'PLATINUM':
      return `Platina ${rank}`
    case 'DIAMOND':
      return `Diamante ${rank}`
    case 'MASTER':
      return `Mestre - ${leaguePoints} PDL`
    case 'GRANDMASTER':
      return `Grão Mestre - ${leaguePoints} PDL`
    case 'CHALLENGER':
      return `Desafiante - ${leaguePoints} PDL`
    default:
      return ''
  }
}
