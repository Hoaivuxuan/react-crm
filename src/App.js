import { createContext, useContext } from "react";
//
import "./App.scss";
import TableProducts from "./compoents/TableProduct/TableProducts";
// useContext
const toastState = createContext();
export const useToast = () => {
  return useContext(toastState);
};
export { toastState };
// app main
function App() {
  return (
    <div
      className="application-container"
      style={{ border: "1vmin solid #87c3e9" }}
    >
      <TableProducts></TableProducts>
    </div>
  );
}

export default App;
