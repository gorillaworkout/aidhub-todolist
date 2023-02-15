import React,{useState,useEffect} from 'react';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {GetAllProduct} from './Redux/Actions/ProductActions'
import {useDispatch,useSelector} from 'react-redux'
import NewHome from './Pages/Home/NewHome'
import {FullPageLoading} from './Components/Loading/Loading.jsx'


function App() {
  const dispatch = useDispatch()


  const [loading,setLoading]=useState(true)
  
  useEffect(()=>{

      dispatch(GetAllProduct())
      setLoading(false)
  })



  if(loading){
    return (
      <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
          {FullPageLoading(loading,100,'#0095DA')}
      </div>
    )
  }
  
  return (
    
    <Routes>
      <Route exact path="/" element={<NewHome new_params={"testing"} />} />
    </Routes>
 
  );
}

export default App;
