import React, {Component} from 'react';
import '../App.css';


class Login extends Component {

    state = {
      Prenom : "",
      Password : ""
    }
  
    componentDidMount(){
         
    }

    login= _=> {
      const {Prenom} = this.state;
      const {Password} = this.state;
      const data = {User_Name : Prenom, User_password : Password}
      const param = {
        method : "POST",
        headers: { "content-type" : "application/json"},
        body: JSON.stringify(data)
      }
      fetch('http://localhost:5555/login', param)
      .catch(err => console.error(err))
    }
      
  render() {
    return (
      <div>
        <form>
          <label>Pseudo</label>
          <input type="text" onChange={e => this.setState({Prenom : e.target.value})}></input>
          <label>Mot de passe</label>
          <input type="text" onChange={e => this.setState({Password : e.target.value})}></input>
          <input type="submit"onClick={this.login}></input>
        </form>
      </div>
    )
  }
  }
  
  export default Login;