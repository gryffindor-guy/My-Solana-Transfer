import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { FC, useState, useEffect } from 'react'
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const DisplayBalance : FC = () => {
    const [balance, setBalance] = useState(0);
    const {connection} = useConnection();
    const {publicKey} = useWallet();
    
    useEffect(() => {
        if(!connection || !publicKey) {
            setBalance(0);
            return;
        }
        connection.getAccountInfo(publicKey).then(info => {
            setBalance(info.lamports/LAMPORTS_PER_SOL);
        })
    }, [connection, publicKey])

    return (
        <div>
        {
            publicKey ?
                <div>
                    <p>{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL}` : ''}</p>
                </div> :
            null
        }
        </div>
        
    )
}