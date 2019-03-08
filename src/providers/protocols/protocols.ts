import { Injectable } from '@angular/core'
import { GenericERC20, addSubProtocol, TezosKtProtocol, GenericERC20Configuration } from 'airgap-coin-lib'

import { tokens } from './tokens'

interface SubAccount {
  protocol: string
  subProtocols: GenericERC20Configuration[]
}

@Injectable()
export class ProtocolsProvider {
  public subProtocols: SubAccount[] = [
    {
      protocol: 'eth',
      subProtocols: [
        {
          symbol: 'CCIO',
          name: 'CryptoControl',
          marketSymbol: 'CCIO',
          identifier: 'eth-erc20-ccio',
          contractAddress: '0x4a9e09f6d1f643ee5f3b02039843d774a224577a',
          decimals: 8
        }
      ]
    }
  ]

  constructor() {
    /* */
    console.log('hit')
  }

  addProtocols() {
    addSubProtocol('xtz', new TezosKtProtocol())

    this.subProtocols.forEach(supportedSubAccount => {
      supportedSubAccount.subProtocols.forEach(subProtocol => {
        addSubProtocol(
          supportedSubAccount.protocol,
          new GenericERC20({
            symbol: subProtocol.symbol,
            name: subProtocol.name,
            marketSymbol: subProtocol.marketSymbol,
            identifier: subProtocol.identifier,
            contractAddress: subProtocol.contractAddress,
            decimals: subProtocol.decimals
          })
        )
      })
    })

    tokens.forEach(token => {
      addSubProtocol(
        'eth',
        new GenericERC20({
          symbol: token.symbol,
          name: token.name,
          marketSymbol: token.marketSymbol,
          identifier: token.identifier,
          contractAddress: token.contractAddress,
          decimals: token.decimals
        })
      )
    })
  }
}
