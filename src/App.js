import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Routes/Routes';
import  { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
