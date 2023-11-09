import Nav from './components/Nav';
import Createdtrips from './components/Createdtrips';
import Destiantions from "./components/Destinations"
import Grid from "./components/Grid"
// Pass users array to the List component as a prop
export default function App() {
  return (
    <div>
      <Nav />
      <Createdtrips />
      < Grid />
    </div>
  );
}
