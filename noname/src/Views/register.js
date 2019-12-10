import React, {Component} from 'react';
import '../App.css';


class Register extends Component {
    
    state = {
        Prenom :"",
        Password:"",
        Mail :"",
        Photo: ""
    }
  
    componentDidMount(){
         
    }

    createUser = _=> {
        const {Prenom} = this.state;
        const {Password} = this.state;
        const {Mail} = this.state;
        const {Photo} = this.state;
        const data = {User_Name: Prenom, User_password: Password, User_mail: Mail, Photo_de_profil : Photo }
        const param = {
          method : "POST",
          headers: { "content-type" : "application/json"},
          body: JSON.stringify(data)
        }
        fetch('http://localhost:5555/newuser', param)
        .catch(err => console.error(err))
      }    

   
      
  render() {
      const {Prenom} = this.state;
      const {Password} = this.state
      const {Mail} = this.state
      const {Photo} = this.state
    return (
      <div>
          <form>
              <label>Pseudo</label>
              <input type="text" onChange={e => this.setState({Prenom : e.target.value})}></input>
              <label>Mot de passe</label>
              <input type="password" onChange={e => this.setState({Password : e.target.value})}></input>
              <label>Email</label>
              <input type="mail" onChange={e => this.setState({Mail : e.target.value})}></input>
              <label>Photo URL</label>
              <input type="text" onChange={e => this.setState({Photo : e.target.value})}></input>
              <input type="submit" onClick={this.createUser}></input>
          </form>
      </div>
    )
  }
  }
  
  export default Register;