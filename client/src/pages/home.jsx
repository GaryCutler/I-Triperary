import Createdtrips from '../components/Createdtrips';
import DatePicker from '../components/datePicker'
import Destinations from '../components/Destinations'
import Stack from 'react-bootstrap/Stack';
import "/src/App.css"
import Card from '../components/Card';
function home () {
  return (
    <Stack direction="horizontal" gap={3} className="col-md-5  " >
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
      <div>
        <Card />
      </div>
    </>
    </Stack>
  );
}
export default home;