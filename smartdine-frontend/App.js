import React, { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import SmartDineMain from "./components/SmartDineMain";

function App() {
  const [user, setUser] = useState(null); // {name, email, token?}
  const [view, setView] = useState("splash"); // splash | login | signup | main
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Theme
    const storedTheme = localStorage.getItem("smartdine_theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
    }

    // User
    const stored = localStorage.getItem("smartdine_user_simple");
    setTimeout(() => {
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setView("main");
        } catch {
          setView("login");
        }
      } else {
        setView("login");
      }
    }, 900); // small delay for splash screen
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("smartdine_user_simple", JSON.stringify(userData));
    setView("main");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("smartdine_user_simple");
    setView("login");
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("smartdine_theme", next);
      return next;
    });
  };

  return (
    <div className={`app-root ${theme === "dark" ? "dark" : ""}`}>
      {view === "splash" && <SplashScreen />}

      {view === "login" && (
        <LoginForm
          onLoginSuccess={handleAuthSuccess}
          goToSignup={() => setView("signup")}
        />
      )}

      {view === "signup" && (
        <SignupForm
          onSignupSuccess={handleAuthSuccess}
          goToLogin={() => setView("login")}
        />
      )}

      {view === "main" && (
        <SmartDineMain
          user={user}
          onLogout={handleLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      <footer className="app-footer">
        <small>
          Built for Indian college students &amp; young professionals. Powered
          by FastAPI &amp; Google Places.
        </small>
      </footer>
    </div>
  );
}

export default App;
