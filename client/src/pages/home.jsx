import Createdtrips from '../components/Createdtrips';
import DatePicker from '../components/datePicker'
import Destinations from '../components/Destinations'
import Stack from 'react-bootstrap/Stack';
import "/src/App.css"
function home () {
  return (
    <Stack direction="horizontal" gap={3} className="col-md-5 m-auto " >
    <>
    <div>
      <Createdtrips />
      </div>
      <div >
        <Destinations />
      </div>
      <div>
      <DatePicker />
      </div>
    </>
    </Stack>
  );
}
export default home;