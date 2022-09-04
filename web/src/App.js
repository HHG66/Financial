import 'antd/dist/antd.min.css'
import {BrowserRouter} from 'react-router-dom'
import AppRouter from '@/Router'
// import {Routes,Route,BrowserRouter} from 'react-router-dom'
// import Layouts from '@/pages/Layout';
// import NoFound from '@/pages/NoFound';
// import Login from '@/pages/Login'
// import Home from '@/pages/Home'

function App() {
  return (
     <BrowserRouter  style={{height:"100%",width:"100%"}}>
      <AppRouter/>
       {/* <Routes>
          <Route path='/' element={
             <Layouts/>
       </Routes> */}
     </BrowserRouter>
  );
}

export default App;
