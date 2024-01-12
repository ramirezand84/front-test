import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Footer from '../src/components/footer';
import Header from 'src/components/header';

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Prueba Digital Bank
        </h1>
        <div className={styles.cont_form}>
        <Link className={styles.link} href="/usuario">Usuario</Link>
        <Link className={styles.link} href="/usuario/consulta">Usuario Consulta</Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
