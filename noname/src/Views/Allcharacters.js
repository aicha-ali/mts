import React, {Component} from 'react';
import { Link } from "react-router-dom";
import coeur from "../img/heart.svg";
import coeurFull from "../img/heartfull.svg";
import '../App.css';


class Allcharacter extends Component {

  state = {
    character : [],
    characterid : [], 
    liked : [], 
    characterliked : [],
    characterunlike : []
    
  }

  componentDidMount(){
    this.getallcharacters()
    this.getAllLikes();
    this.getAllunLikes()
  }

  getallcharacters = _=> {
    fetch('http://localhost:5555/personnages')
    //.then(this.didUserLike)
    .then(response => response.json())
    .then(response => this.setState({ character: response.data }))
    .catch(err => console.error(err))
  }
  
  getAllLikes = _=> {
    const actualuser = localStorage.getItem('ID')
    fetch('http://localhost:5555/getLiked/'+ actualuser)
    .then(response => response.json())
    .then(response => this.setState({liked : response.data}))
    .catch(err => console.error(err))
  }

  getAllunLikes = _=> {
    const actualuser = localStorage.getItem('ID')
    fetch('http://localhost:5555/getunliked/'+ actualuser)
    .then(response => response.json())
    .then(response => this.setState({characterunlike : response.data}))
    .catch(err => console.error(err))
  }

  
getCharactersliked = () => {
  let chr
  let likedchr
  let {character} = this.state
  
  if (character.length > 0){
  console.log("On rentre dans le if de la fontction getCharacterliked")
  chr = character.map((character) =>{
    
    let {liked} = this.state
    likedchr = liked.map((like) => {
      let stateid = character.Personnage_ID;
      let imageperso = character.Image;
      if(like.ID_personnage === character.Personnage_ID){
        console.log("Le Personnage liké est=>", character.Prenom)
        return <div key={character.Personnage_ID}><Link to={{pathname: "/character/",
        state: { IDperso : stateid, likedcharacter : true, photo : imageperso}}} className="questionblock">{character.Prenom}</Link><br/> 
        <img src={coeurFull} className="test"/></div>
      } 
   })
   return likedchr
})}
return chr
}

getCharactersnotliked = () => {
  let {characterunlike} = this.state
  let characterunliked
  characterunliked = characterunlike.map((chr) =>{
    let stateid = chr.Personnage_ID
    return <div key={chr.Personnage_ID}><Link to={{pathname: "/character/",
        state: { IDperso : stateid, likedcharacter : false}}} className="questionblock">{chr.Prenom}</Link><br/> 
        <img src={coeur} className="test"/></div>
  })
  return characterunliked
}


render() {
  
 return(
   <div>
       {this.getCharactersliked()}
       {this.getCharactersnotliked()} 
    </div>
 )
}
}

export default Allcharacter;
