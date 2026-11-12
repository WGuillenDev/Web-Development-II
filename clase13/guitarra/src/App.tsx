import "./index.css";
import { menuItems } from "./data/db";
import MenuItem from "./componentes/MenuItem";
import OrderContents from "./componentes/OrderContents";
import OrderTotals from "./componentes/OrderTotals";
import TipPorcentageForm from "./componentes/TipPorcentageForm";
import useOrder from "./hooks/useOrder";

function App() {
  const { order, tip, setTip, addItem, removeItem, placeOrder } = useOrder();

  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-indigo-600 text-4xl">Calculadora de propinas</h1>
      </header>
      <main className="mx-auto grid max-w-7xl py-20 md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Menú</h2>
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} addItem={addItem} />
          ))}
        </div>

        <div className="border border-slate-200 p-5 rounded-lg space-y-10">
          <OrderContents order={order} removeItem={removeItem} />
          <TipPorcentageForm setTip={setTip} tip={tip} />
          <OrderTotals order={order} tip={tip} placeOrder={placeOrder} />
        </div>
      </main>
    </>
  );
}

export default App;
