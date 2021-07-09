import logo from './logo.svg';
import React , {useEffect, useState} from 'react';
import Web3 from 'web3';
// import { plannerAbi } from './abis';
import PlannerAbi from './Planner.json';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';



import './App.css';

function App() {


  const [values,setValues] = useState({
    amount:"",
    duration:""

  })

  const {amount , duration} = values;

  useEffect(()=>{
    loadWeb3();
    LoadBlockchaindata()
  },[])

  const[currentAccount,setCurrentAccount] =useState("");
  const[loader,setLoader]=useState(false);

  const loadWeb3 = async () => {
    if(window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
        window.alert("Non-Ethereum browser detected. You should consider trying Metamask!");
            
        
    }
}

  // const LoadBlockchaindata  = async () => {
    setLoader(true);
    // const web3 = window.web3;
    // const accounts = await web3.eth.getAccounts();
    // const account = accounts[0];
    // setCurrentAccount(account);
    // const networkId = await web3.net.getId();
    async function LoadBlockchaindata() {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0]
      setCurrentAccount(account);
  
      console.log(account);
      //getting network id
      // const networkId = await web3.eth.net.getId();

    const networkData = "5777"
    if(networkData){
      const planner = new web3.eth.Contract(PlannerAbi.abi,"0x83E97261d0A16Ae74caAfBCB1538b9501309F144");
      console.log(planner);
    }
    else{
      window.alert('The smart contract is not deployed to current network');
    }

    
  }

  if(loader){
    return <div> loading... </div>
  }

  const handleSubmit = name => e =>{
    e.preventDefault()
    setValues({...values,[name]:e.target.value})
  }

  const submitValues = async (event) => {
    event.preventDefault();
    await values.networkData.method.rateOfInterest(amount,duration).send({from:currentAccount})
  }

  return (
    <div className="App">
     <TextField label="enter the Amount to invest"  onChange = {handleSubmit("_amount")} value ={amount}></TextField>
     <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={duration}
          onChange={handleSubmit("_duration")}
        >
          <MenuItem value={3}>3 months plan with ROI 1%</MenuItem>
          <MenuItem value={6}>6 months plan with ROI 2%</MenuItem>
          <MenuItem value={9}>9 months plan with ROI 3%</MenuItem>
          <MenuItem value={12}>12 months plan with ROI 4%</MenuItem>

        </Select>

        <Button onClick = {submitValues}>Submit</Button>
    </div>
  );

}

export default App;
