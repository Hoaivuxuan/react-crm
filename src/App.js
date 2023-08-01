//
import "./App.scss";
import Header from "./compoents/TableHeader/TableHeader";
import TableProducts from "./compoents/TableProduct/TableProducts";
//
function App() {
  return (
    <div
      className="application-container"
      style={{ border: "1vmin solid #87c3e9" }}
    >
      <TableProducts></TableProducts>
      {/*  */}
    </div>
  );
}

export default App;
