import Nav from './components/Nav';
import Createdtrips from './components/Createdtrips';
import Destiantions from "./components/Destinations"

// Pass users array to the List component as a prop
export default function App() {
  return (
    <div>
      <Nav />
      <Createdtrips />
      <Destiantions />
    </div>
  );
}
