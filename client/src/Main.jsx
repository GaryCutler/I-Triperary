import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import Error from './components/pages/error';
import Login from './components/pages/login';
import Logout from './components/pages/logout';
import SignUp from './components/pages/SignUp';
// Define the accessible routes, and which components respond to which URL
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
     
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
