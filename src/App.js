import { ToastContainer } from "react-toastify";
//
import "./App.scss";
import Header from "./compoents/Header/Header";
import TableProducts from "./compoents/TableProduct/TableProducts";
//
function App() {
  return (
    <div className="product-crm" style={{ border: "1vmin solid #55bef0" }}>
      <div className="pt-5 row">
        <div className="col-12 p-0">
          <TableProducts></TableProducts>
        </div>
      </div>
      {/*  */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
