"use client";

import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function SignIn() {
  return (
    <>
      <Header />
      <AuthForm isLogin={true} />
      <Footer />
    </>
  );
} 