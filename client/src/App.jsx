import Nav from './components/Nav';
import {Outlet} from 'react-router-dom'
// Pass users array to the List component as a prop
export default function App() {
 return (
   <div>
     <Nav />
     <Outlet />
   </div>
 );
}