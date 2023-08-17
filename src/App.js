// import lib
import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import { Routes as AppRoutes } from "./routes/routes";
//
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./App.scss";
//
function App(props) {
  //
  const [menuAllow, setMenuAllow] = useState([]);
  //
  useEffect(() => {
    var menuAllow = AppRoutes(props).filter((item) => {
      if (item.path == "/crm") return true;
      else {
        var find = window.app_context.user.menuAllow.find((item2) => {
          console.log(item2);
          return ("#" + item.path).includes(
            !item2.urlMfe || item2.urlMfe.trim() == "" ? false : item2.urlMfe
          );
        });
      }
      return find;
    });
    setMenuAllow(menuAllow);
  }, []);
  return (
    <Router>
      <Routes>
        {menuAllow.map((r, index) => (
          <Route key={index} path={r.path} exact element={r.component} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
