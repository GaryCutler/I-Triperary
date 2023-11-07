import Nav from './components/Nav';
import Destination from "./components/Destination"
import SelectDates from './components/SelectDates';

// Pass users array to the List component as a prop
export default function App() {
  return (
    <div>
      <Nav />
      <Destination />
      <SelectDates />
    </div>
  );
}
