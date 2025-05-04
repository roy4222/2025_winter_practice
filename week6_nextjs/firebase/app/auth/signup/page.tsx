"use client";

import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
export default function SignUp() {
  return (
    <>
      <Header />
      <AuthForm isLogin={false} />
      <Footer />
    </>
  );
} 