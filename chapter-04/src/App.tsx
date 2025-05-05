
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';

const router = createBrowserRouter([
  {
  path: '/',
  element: <HomeLayout />,
  errorElement: <NotFound />,
  children: [
    {
      index: true, element: <HomePage />
    },
    {
      path: 'login', element: <LoginPage />
    },
    {
      path: "signup",
      element: <SignupPage />
    }
    
  ]
},
]);


function App() {
   return <RouterProvider router={router} />;
}

export default App;
