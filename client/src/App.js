import React from 'react';
import './App.css';
import NavBar from './mainComps/NavBar'
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import SignUp from './mainComps/SignUp'
import Login from './mainComps/Login'
import Calendar from './mainComps/Calendar'
import ClientContainer from './containers/ClientContainer'
import ProfContainer from './containers/ProfContainer'
import ServicesContainer from './containers/ServicesContainer'
import ApptContainer from './containers/ApptContainer'

class App extends React.Component{ 
  debugger

  constructor(props) {
    super(props)
    this.state = {
      appts: [],
      dispAppts: [],
      data: [],

      clients: [],
      dispClients: [],

      profs: [],
      dispProfs: [],

      services: [],
      dispServs: [],

    }
  }


  //////// FETCHES DATA BASED ON LOGGED IN USER /////////
  componentDidMount(){
    ///////////////////////APPTS/////////////////////////////
    fetch('http://localhost:3000/appointments', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(appts => {
      // userType === "c"
      // ?appts.filter(appt =>{
      //   let a = appt.client_id === userId
      //   return a
      //   // debugger
      // })
      // :appts.filter(appt =>{
      //   let a = appt.professional_id === userId
      //   return a

      // })
      // debugger
      this.setState({
        appts: appts,
        dispAppts: appts,
        data: appts
      })
    })

    ////////////////////////CLIENTS////////////////////////////
    fetch('http://localhost:3000/clients', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
    })
    .then(res => res.json())
    .then(clients => {

      this.setState({
        clients: clients,
        dispClients: clients
      })
    })

    ///////////////////////PRO'S/////////////////////////////
    fetch('http://localhost:3000/professionals', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(profs => {
      this.setState({
        profs: profs,
        dispProfs: profs,
      })
    })

    // ////////////////////////SERVICES////////////////////////////
    // fetch('http://localhost:3000/services', {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${localStorage.token}`
    //   }
    // })
    // .then(res => res.json())
    // .then(servs => {
    //   // userType === "p"
    //   // ?servs.filter(serv =>{return serv.professional_id === userId
    //   // })
    //   // :servs.filter(serv =>{return serv.client_id === userId
    //   // })
    //   this.setState({
    //     services: servs,
    //     dispServs: servs,
    //   })
    // })
  }



  render(){
    return (
      <BrowserRouter>
      <div className="App">
        {/* <Switch> */}

        <NavBar />
        <Route path='/appointments' render={(routerProps)=> <ApptContainer appts={this.state.dispAppts} {...routerProps}/>}/>
        <Route path='/signup' render={(routerProps)=> <SignUp {...routerProps}/>}/>
        <Route path='/login' render={(routerProps)=> <Login {...routerProps} />}/>
        <Route path='/schedule' render={(routerProps)=> <Calendar data={this.state.data} {...routerProps}/>}/>
        <Route path='/clients' render={(routerProps)=> <ClientContainer clients={this.state.dispClients} {...routerProps}/>}/>
        <Route path='/professionals' render={(routerProps)=> <ProfContainer profs={this.state.dispProfs} {...routerProps}/>}/>
        <Route path='/services' render={(routerProps)=> <ServicesContainer servs={this.state.dispServs} {...routerProps}/>}/>
        {/* </Switch> */}
      </div>
      </BrowserRouter>
    )
   
  }
}

export default App;
