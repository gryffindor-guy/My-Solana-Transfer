import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { AppBar } from '../components/AppBar'
import { SendSolForm } from '../components/SendSolForm'
import { DisplayBalance } from '../components/DisplayBalance'
import Head from 'next/head'

const Home: NextPage = (props) => {

  return (
    <div className={styles.App}>
      <Head>
        <title>My_Solana_Transfer.com</title>
        <meta
          name="description"
          content="My Solana Transfer"
        />
      </Head>
      <AppBar />
      <div className={styles.AppBody}>
        <DisplayBalance/>
        <SendSolForm />
      </div>
    </div>
  );
}

export default Home;