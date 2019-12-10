import React, {Component} from 'react';


class Admininterface extends Component {

  state = {
    character : {
        Personnage_ID: "",
        Nom: "",
        Prenom: "",
        Age: "",
        Date_de_naissance: "",
        Date_de_mort: "",
        Biographie: "",
        Image: "",
        Image2: "",
        Categorie_ID_categorie: ""
    }
  }

  postNewCharacter = _=> {
    const {character} = this.state;
    console.log(character.Image)
    const data = {Personnage_ID : character.Personnage_ID, Nom: character.Nom, Prenom: character.Prenom, Age: character.Age, Date_de_naissance: character.Date_de_naissance, Date_de_mort: character.Date_de_mort, Biographie: character.Biographie, Image: character.Image, Image2: character.Image2, Categorie_ID_categorie: character.Categorie_ID_categorie}
    const param = {
      method : "POST",
      headers: { "content-type" : "application/json"},
      body: JSON.stringify(data)
    }
    fetch('http://localhost:5555/newcharacter', param)
    
    .catch(err => console.error(err))
  }



render() {

    const {character} = this.state;
  return (
    <div>
      <h1>Rajouter un personnage !</h1>
      <form>
        <label>Id perso</label>
        <input type="text" onChange={e => this.setState({character : {...character, Personnage_ID : e.target.value}})}></input>
        <label>Nom</label>
        <input type="text" onChange={e => this.setState({character : {...character, Nom : e.target.value}})}></input>
        <label>Prenom</label>
        <input type="text" onChange={e => this.setState({character : {...character, Prenom : e.target.value}})}></input>
        <label>Age</label>
        <input type="text" onChange={e => this.setState({character : {...character, Age : e.target.value}})}></input>
        <label>Date_de_naissance</label>
        <input type="text" onChange={e => this.setState({character : {...character, Date_de_naissance : e.target.value}})}></input>
        <label>Date de mort</label>
        <input type="text" onChange={e => this.setState({character : {...character, Date_de_mort : e.target.value}})}></input>
        <label>Bigraphie</label>
        <input type="text" onChange={e => this.setState({character : {...character, Biographie : e.target.value}})}></input>
        <label>Image</label>
        <input type="text" onChange={e => this.setState({character : {...character, Image : e.target.value}})}></input>
        <label>Image2</label>
        <input type="text" onChange={e => this.setState({character : {...character, Image2 : e.target.value}})}></input>
        <label>Categorie_ID_categorie</label>
        <input type="text" onChange={e => this.setState({character : {...character, Categorie_ID_categorie : e.target.value}})}></input>
        <input type="submit" value="Ajouter un personnage" onClick={this.postNewCharacter}></input>
      </form>
    </div>
  )
}
}

export default Admininterface;
