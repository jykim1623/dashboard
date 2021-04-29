import classNames from "classnames";
import Keycloak from "keycloak-js";
import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import config from "./app/config";
import Content from "./layout/Content";
import Header from "./layout/Header";

const queryClient = new QueryClient();

const AuthContext = createContext(null);

function App() {
  const [auth, setAuth] = useState(null);
  const loadKeycloak = async () => {
    const keycloak = new Keycloak(config.keycloak);
    try {
      await keycloak.init({
        onLoad: "login-required",
      }).then(o => {
        console.log(o);
      });
    } catch (error) {
      console.log('error', error);
    }
    if (!keycloak?.authenticated) {
      // window.location.href = keycloak.createLoginUrl({ redirectUri: "/" });
      return;
    } else {
      setAuth(keycloak);
    }
  };
  useEffect(() => {
    loadKeycloak();
  },[]);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={auth}>
        {!auth?.authenticated && <div>you haven't auth</div>}
        {auth?.authenticated && <BrowserRouter>
          <div className={classNames("container-fluid", "dashboard-container")}>
            <Header />
            <Content />
          </div>
        </BrowserRouter>}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
