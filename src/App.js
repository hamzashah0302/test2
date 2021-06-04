import './App.css';
import {useState} from 'react'
import axios from 'axios'
import Home from './pages/home'
function App() {
  const [isLogin, setisLogin]=useState(false)
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  const handleLogin =async()=>{
    let res = await axios.post('https://morosoft.herokuapp.com',{username,password})
    // console.log(res.data.data.user)
    if(res.data.data.user != undefined) {setisLogin(true)}
  }
  if(!isLogin){return (
    <div className="App">
      <form>
  <label htmlFor="fname">User name:</label><br/>
  <input type="text" value={username} onChange={(e)=>{setusername(e.target.value)}} /><br/>
  <label htmlFor="lname">Password:</label><br/>
  <input type="text" value={password} onChange={(e)=>{setpassword(e.target.value)}} /><br/><br/>
  <button type="button" onClick={handleLogin}>Login!</button>
</form> 
    </div>
  );}
  else{
    return(
    <Home/>
      
    )
    
  }
  
}



export default App;
