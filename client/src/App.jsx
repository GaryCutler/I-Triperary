import Nav from './components/Nav';
import Createdtrips from './components/Createdtrips';
import {Outlet} from 'react-router-dom'
import './App.css'
// Pass users array to the List component as a prop
export default function App() {
  return (
    <>
    <video autoPlay muted loop id="bgVideo">
      <source src="/Waterfall.webm" type="video/webm"/>
      Your browser does not support HTML5 video.
    </video>
    <div>
      <Nav />
      <Outlet />
    </div>
    </>
  );
}



