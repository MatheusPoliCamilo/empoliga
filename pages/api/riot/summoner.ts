export default async (request, response) => {
  switch (request.method) {
    case 'GET': {
      const { nickname } = request.query

      const riotAccountRequest = await fetch(
        `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(nickname)}`,
        {
          method: 'GET',
          headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY,
          },
        }
      )

      const riotAccount = await riotAccountRequest.json()

      if (riotAccount.status) {
        return response.status(404).json({ errors: { message: 'Jogador não encontrado' } })
      }

      const leagueRequest = await fetch(
        `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${riotAccount.id}`,
        {
          method: 'GET',
          headers: {
            'X-Riot-Token': process.env.RIOT_API_KEY,
          },
        }
      )

      const league = await leagueRequest.json()

      const soloqLeague = league.find((league) => {
        return league.queueType === 'RANKED_SOLO_5x5'
      })

      return response.status(200).json({ ...riotAccount, ...soloqLeague })
    }

    default: {
      return response.status(404).json({})
    }
  }
}
