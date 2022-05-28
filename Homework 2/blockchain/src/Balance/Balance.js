import { useEthers, useCall } from '@usedapp/core'
import { tlContract } from '../Contracts';
import { formatUnits } from '@ethersproject/units'


export default function Balance(props) {
    const { account } = useEthers()
    const { value, error }= useCall(account && {
        contract: tlContract,
        method: "balanceOf", 
        args: [account],
    }) ?? {}

    return (<p>
            {!error && value && <p>TL Balance {formatUnits(value?.[0], 18)}</p>}
        </p>);
}