import { useEthers, useCall } from '@usedapp/core'
import { tlTokenContract, tlFunctions  } from '../Contracts';
import { formatUnits } from '@ethersproject/units'


export default function Balance(props) {
    // Metamask walletimden benim adresimi buluyor
    const { account } = useEthers()
    const { value, error }= useCall(account && {
        contract: tlTokenContract,
        method: tlFunctions.balanceOf, 
        args: [account],
    }) ?? {}

    return (<p>
            {!error && value && <p>TL Balance {formatUnits(value?.[0], 18)}</p>}
        </p>);
}