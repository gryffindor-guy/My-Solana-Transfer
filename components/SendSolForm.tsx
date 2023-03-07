import * as Web3 from '@solana/web3.js'
import { FC, useState} from 'react'
import styles from '../styles/Home.module.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react' 

export const SendSolForm: FC = () => {
    const [TransactionSig, setTransactionSig] = useState('');
    const [recipientStatus, setRecipientStatus] = useState(true);
    const {publicKey, sendTransaction} = useWallet();
    const {connection} = useConnection();
    const link = () => {
        return TransactionSig ? `http://explorer.solana.com/tx/${TransactionSig}?cluster=devnet` : '';
    }
    
    const sendSol = event => {
        event.preventDefault()
        if(!connection || !publicKey ) {
            setTransactionSig('');
            setRecipientStatus(true);
            return;
        } 
        let recipientPubkey;
        try {
            recipientPubkey = new Web3.PublicKey(event.target.recipient.value);
            setRecipientStatus(true);
        } catch (error) {
            setRecipientStatus(false);
            setTransactionSig('')
            console.log(error);
            console.log(recipientStatus);
            return;
        }
        const transaction = new Web3.Transaction();
        connection.getAccountInfo(recipientPubkey).then(info => {
            
            const instruction = Web3.SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipientPubkey,
                lamports: event.target.amount.value * Web3.LAMPORTS_PER_SOL
            })
            transaction.add(instruction);
            sendTransaction(transaction, connection).then(sig => {
                setTransactionSig(sig);
            
            })
        })
        
        // console.log(`Send ${event.target.amount.value} SOL to ${event.target.recipient.value}`)
    }

    return (
        <div>
            {
                publicKey ?

                    <form onSubmit={sendSol} className={styles.form}>
                        <label htmlFor="amount">Amount (in SOL) to send:</label>
                        <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                        <br />
                        <label htmlFor="recipient">Send SOL to:</label>
                        <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                        <button type="submit" className={styles.formButton}>Send</button>
                    </form> :
                <span>Connect your Wallet</span>
            }
            {
                TransactionSig ?
                    <div>
                        <p>View your transaction on </p>
                        <a href={link()}>Solana Explorer</a>
                    </div> :
                    null
            }
            {
                !recipientStatus ?
                    
                    <span>Please Check the recipient address</span>
                :
                null
            }
        </div>
    )
}