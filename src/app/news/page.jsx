"use client";
import styles from "./news.module.css";
import NavBar from "@/components/nav";
import Footer from "@/components/footer";
import BoxNews from "@/components/news";
import BoxNewsAll from '@/components/newsAll';
import Image from "next/image";
import Link from "next/link";
import NavAdaptive from "@/components/navAdaptive";
export default function News() {
  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <BoxNews />
      <BoxNewsAll />
      <Footer />
      <NavAdaptive />
    </div>
  );
}