import React, {Component} from 'react';
import coeur from "../img/heart.svg";
import coeurFull from "../img/heartfull.svg";
import '../App.css';


class Character extends Component {

  state = {
    likes : [], 
    count : 1, 
    persoInfo : [], 
    liked : false, 
    match : [], 
    findmatch : false,
    commentary : {
      Contenu_com: ""
    }, 
    Allcommentary :[],
    
  }

  componentDidMount(){
    this.getOneCharacter();
    this.getAllLikes();  
    this.getAllCommentaires();  
  }

  getOneCharacter = _=> {
    const actualcharacter = this.props.location.state.IDperso;
    fetch('http://localhost:5555/personnage/' + actualcharacter)
    .then(response => response.json())
    .then(response => this.setState({persoInfo : response.data}))
    .catch(err => console.error(err))
  }

  getAllLikes = _=> {
    const actualuser = localStorage.getItem('ID')
    fetch('http://localhost:5555/getLiked/'+ actualuser)
    .then(response => response.json())
    .then(response => this.setState({likes : response.data}))
    .then(response => this.setFindmatch())
    .catch(err => console.error(err))
  }

  postCom = _=> {
    const {commentary} = this.state;
    const actualuser = localStorage.getItem('ID')
    const actualcharacter = this.props.location.state.IDperso;
    const data = {Contenu_com : commentary.Contenu_com, Personnage_Personnage_ID: actualcharacter, User_User_ID: actualuser, Date_com: "11/11/12"}
    const param = {
      method : "POST",
      headers: { "content-type" : "application/json"},
      body: JSON.stringify(data)
    }
    fetch('http://localhost:5555/postcom', param)
    .catch(err => console.error(err))
  }

  setFindmatch = ()=> {
    
    const actualuser = localStorage.getItem('ID')
    const {likes} = this.state
    let maplike = likes.map((like) => {
      const actualcharacter = this.props.location.state.IDperso;
      if(actualcharacter === like.ID_personnage){
            this.setState({findmatch : true})
      }
    })
    return maplike
  }

  
  didUserLike =() =>{
    const {persoInfo} = this.state;
    if (this.props.location.state.likedcharacter == false){
      return <div key={persoInfo.Personnage_ID}> <img src={this.props.location.state.photo} alt="img_personnage"/> {persoInfo.Prenom} <img src={coeur} id="imglikeone" alt="img_personnage" onClick={this.likebtn}/> </div>}
     else {
      return <div key={persoInfo.Personnage_ID}> <img src={this.props.location.state.photo} alt="img_personnage"/> {persoInfo.Prenom} <img src={coeurFull} id="imgliketwo" onClick={this.test} alt="img_personnage" onClick={this.unlikebtn}/></div>
    }
  }

  postLike = _=> {
    const actualuser = localStorage.getItem('ID')
    const actualcharacter = this.props.location.state.IDperso;
    const data = {ID_user: actualuser, ID_personnage : actualcharacter}
    const param = {
      method : "POST",
      headers: { "content-type" : "application/json"},
      body: JSON.stringify(data)
    }
    fetch('http://localhost:5555/likes', param)
    .catch(err => console.error(err))
  }

  deleteLike = _=> {
    const actualuser = localStorage.getItem('ID')
    const actualcharacter = this.props.location.state.IDperso;
    const data = {ID_user: actualuser, ID_personnage : actualcharacter}
    const param = {
      method : "DELETE",
      headers: { "content-type" : "application/json"},
      body: JSON.stringify(data)
    }
    fetch('http://localhost:5555/deletelike', param)
    .catch(err => console.error(err))
  }

  getAllCommentaires = _=> {
    const actualcharacter = this.props.location.state.IDperso;
    fetch('http://localhost:5555/commentaires/' + actualcharacter)
    .then(response => response.json())
    .then(response => this.setState({Allcommentary : response.data}))
    .catch(err => console.error(err))
  }

  likebtn =_=> {
    const {findmatch} = this.state
    if(findmatch === true){
      this.setState({findmatch : false})
      this.deleteLike()
    }else{
      this.setState({findmatch : true})
      this.postLike()
    }
    let imglikeone = document.getElementById('imglikeone');
    if(imglikeone.src == "http://localhost:3000"+ coeur){
      
      imglikeone.src = coeurFull
    }else{
      imglikeone.src = coeur 
    }
    //console.log(lol.src, "coeurfull =>" , coeurFull)
   
  }

  setUserToStorage =_=> {
    localStorage.setItem('current_player', "Lana");
    localStorage.setItem('ID', 1);
  }

  unlikebtn =_=> {
    const {findmatch} = this.state
    if(findmatch === true){
      this.setState({findmatch : false})
      this.deleteLike()
    }else{
      this.setState({findmatch : true})
      this.postLike()
    }
    let imgliketwo = document.getElementById('imgliketwo');
    if(imgliketwo.src == "http://localhost:3000"+ coeur){
      
      imgliketwo.src = coeurFull
    }else{
      imgliketwo.src = coeur 
    }
  }

  returncom =_=> {
    const {Allcommentary} = this.state;
    let mapcom
    mapcom = Allcommentary.map((com) => {
      return <p>{com.Contenu_com}</p>  
    })
    return mapcom
  }
    
render() {
  const {commentary} = this.state;
  
  const {test} = this.state;
  return (
    <div>
      {this.didUserLike()}
      <button onClick={this.test}>Test</button>
      <br/>
      <button onClick={this.setUserToStorage}>Set User to storage</button>
      <textarea rows="5" cols="33" onChange={e => this.setState({commentary : {...commentary, Contenu_com : e.target.value}})}></textarea>
      <button onClick={this.postCom}>PostCom</button>
      <h1>Les commentaires</h1>
      {this.returncom()}

      
    </div>
  )
}
}

export default Character;
