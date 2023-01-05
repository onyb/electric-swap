import type { NextApiRequest, NextApiResponse } from 'next'
import * as web3 from '@solana/web3.js'

interface TypedNextApiRequest extends NextApiRequest {
  query: {
    address: string
  }
}

export default async function handler (req: TypedNextApiRequest, res: NextApiResponse) {
  const { address } = req.query

  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'getTokenAccountsByOwner',
    params: [
      address,
      {
        programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
      },
      {
        encoding: 'jsonParsed'
      }
    ]
  }
  const response = await fetch(`https://solana-api.syndica.io`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Token': `${process.env.SYNDICA_ACCESS_TOKEN}`
    },
    method: 'POST',
    body: JSON.stringify(payload)
  })

  const tokenMintsResponse = await response.json()
  const tokenMints = tokenMintsResponse.result.value.map(e => e.account.data.parsed.info.mint)
  res.status(200).json(tokenMints)
}
