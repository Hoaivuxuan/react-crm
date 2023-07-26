import { ToastContainer } from "react-toastify";
//
import "./App.scss";
import Header from "./compoents/Header";
import TableUsers from "./compoents/TableUsers";
import Container from "react-bootstrap/Container";
//
function App() {
  return (
    <>
      <div className="app-container">
        <Header></Header>
        <Container className="pt-5">
          <TableUsers></TableUsers>
        </Container>
      </div>
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
    </>
  );
}

export default App;
