import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Footer, Hero, Navbar, Products } from "../components";

const Home: NextPage = () => {
  return (
    <>
    <div className="">
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <Products />
      </main>
      <Footer />
      </div>
      
    </>
  );
};

export default Home;
