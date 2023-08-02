//
import "./App.scss";
import TableProducts from "./compoents/TableProduct/TableProducts";
//
function App() {
  return (
    <div
      className="application-container"
      style={{ border: "1vmin solid #87c3e9" }}
    >
      <div>
        <TableProducts></TableProducts>
      </div>
    </div>
  );
}

export default App;
