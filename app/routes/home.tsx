import type {Route} from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "~/constants";
import {resume} from "react-dom/server";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart FeedBack For Your Dream Job!" },
    ]
}

export default function Home() {
  const { auth } = usePuterStore();
  const navidate = useNavigate();

  useEffect(() => {
    if(!auth.isAuthenticated) navidate('/auth?next=/');//not log in go to auth page
  }, [auth.isAuthenticated]);


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Keep Tabs on Your Applications & Resume Insights</h1>
        <h2>Go through your submissions and analyze AI-generated feedback .</h2>
      </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
        {resumes.map((resume)=>(
          <ResumeCard key={resume.id} resume={resume} />
       ))}
    </div>
    )}
    </section>
  </main>;
}
