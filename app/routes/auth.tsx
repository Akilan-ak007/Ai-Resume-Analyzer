import { usePuterStore } from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
  { title: 'Resumind | Auth' },
  { name: 'description', content: 'log into your account.' },
]);

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navidate = useNavigate();

  useEffect(() => {
    if(auth.isAuthenticated) navidate(next);//already login dont need to do for auth page
  }, [auth.isAuthenticated , next]);
  return (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex flex-col justify-center items-center">
        <div className="gradient-border shadow-lg">
          <section className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1>Welcome</h1>
              <h2>Log in and keep the hustle going</h2>
            </div>

            <div>
              {isLoading ? (
                  <button className="auth-button transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,1)] hover:scale-110 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500">
                    <p>Signing You In...</p>
                  </button>
              ) : (
                  <>
                    {auth.isAuthenticated ? (
                        <button className="auth-button" onClick={() => auth.signOut()}>
                          <p>Log Out</p>
                        </button>
                    ) : (
                        <button className="auth-button" onClick={() => auth.signIn()}>
                          <p>LogIn</p>
                        </button>
                    )}
                  </>
              )}
            </div>
          </section>
        </div>
      </main>
  );
};

export default Auth;
