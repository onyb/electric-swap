import type { NextApiRequest, NextApiResponse } from 'next'

interface TypedNextApiRequest extends NextApiRequest {
  query: {
    address: string
  }
}

interface GetTokenAccountsByOwnerResponse {
  result: {
    value: {
      account: {
        data: {
          parsed: {
            info: {
              mint: string
            }
          }
        }
      }
    }[]
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
  const response = await fetch(
    `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`,
    {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

  const tokenMintsResponse: GetTokenAccountsByOwnerResponse = await response.json()
  const tokenMints = tokenMintsResponse.result.value.map(e => e.account.data.parsed.info.mint)
  res.status(200).json(tokenMints)
}
