import Nav from './components/Nav';
import Createdtrips from './components/Createdtrips';
import Destiantions from "./components/Destinations"
import Grid from "./components/Grid"
import './App.css'
// Pass users array to the List component as a prop
export default function App() {
  return (
    <>
    <video autoPlay muted loop id="bgVideo">
      <source src="/Shorter_Waterfall2.mp4" type="video/mp4"/>
      Your browser does not support HTML5 video.
    </video>
    <div style={{backgroundVideo: "url('/Shorter_Waterfall2.mp4')"}}>
      <Nav />
      <Createdtrips />
      < Grid />
    </div>
    </>
  );
}
