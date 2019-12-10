const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');

//requêtes
const personnages = 'SELECT * FROM personnage';
const personnage = 'SELECT * FROM personnage WHERE Personnage_ID = ?'
const likes = 'INSERT into likes(ID_user, ID_personnage) VALUES (?, ?)'
const dellike = 'Delete from likes where ID_user= ? AND ID_personnage= ?'
const postcharacter = 'INSERT INTO personnage(Personnage_ID, Nom, Prenom, Age, Date_de_naissance, Date_de_mort, Biographie, Image, Image2, Categorie_ID_categorie) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
const getLiked = 'SELECT * FROM personnage INNER JOIN likes WHERE ID_user = ? AND personnage.Personnage_ID = likes.ID_personnage';
const getunliked = 'SELECT * FROM personnage WHERE personnage.Personnage_ID not in (SELECT personnage.Personnage_ID FROM likes INNER JOIN personnage ON personnage.Personnage_ID = likes.ID_personnage WHERE likes.ID_user = ?)';
const getCommentaire = 'SELECT * FROM commentaires WHERE Personnage_Personnage_ID = ?';
const delcom = 'Delete from commentaires where Personnage_Personnage_ID = ? AND User_User_ID = ? AND Com_ID = ?'
const postcom = 'INSERT into commentaires(Contenu_com, Date_com, Personnage_Personnage_ID, User_User_ID) VALUES (?, ?, ?, ?)'
const login = 'SELECT * FROM user WHERE User_Name = ?'
const createuser = 'INSERT INTO user(User_Name, User_password, User_mail, Photo_de_profil) VALUES (?,?,?,?)'
//requêtes

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'maintenanttusais'
});
connection.connect(err => {
    if(err) {
        return err;
    }
});

app.use(cors());
app.use(bodyParser.json())



app.post('/login', (req, res) => {
    console.log(req.body)

    var payload = [req.body.User_Name]
    
    connection.query(login, payload, (err, results) => {
        
        if (!results[0]){ 
            console.log("Il n'a pas réussit à trouvé dans ta database un match avec le pseudo que tu lui envois, regarde le results est vide => ", results[0])
            return res.status(401).send("unknown user");
            
          }
        /*else if(req.body.User_password == results[0].User_password){
            res.send(results);
            console.log("Tu es desormais connecté");
            console.log("Ca c'est le match password qu'il a trouvé dans la DB => ", results[0].User_password, "& ça c'est le mdp que tu lui envois =>", req.body.User_password); 
          }*/
          else if (err){
              return err
          }
         /* else {
            console.log("Le mot de passe est surement pas bon bibi ");
            console.log("Ca c'est le match password qu'il a trouvé dans la DB => ", results[0].User_password, "& ça c'est le mdp que tu lui envois =>", req.body.User_password); 
          }*/

          bcrypt.compare(req.body.User_password, results[0].User_password).then(function(match) {
            // si le password est invalide, retourner une erreur au client
            console.log("password decrypté ??? ======>",req.body.User_password)
            if (!match){
                console.log("nooope")
                 return res.status(401).send("login failed") 
            }
            else if(match) {
                console.log("yeeeeesss");
                return res.status(200).send(results)
             }
            
          }).catch(err => {
            console.log("@catch", err)
            res.status(500).send(err);
          }); 

        
    }, req.body);
});

app.get('/personnage/:id', (req, res) => {

    connection.query(personnage,req.params.id, (err, results) => {
        if (err){
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.get('/personnages', (req, res) => {

    connection.query(personnages, (err, results) => {
        if (err){
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.post('/newuser', (req, res) => {
    //console.log(req.body)
    var payload = [req.body.User_Name, req.body.User_password, req.body.User_mail, req.body.Photo_de_profil]

        bcrypt.hash(payload[1], 10).then(hash => {
        payload[1] = hash;
        console.log(payload)
        connection.query(createuser, payload, (err, results) => {
            if (err) return res.status(520).send(err);
            return res.status(201).send(results);
        }, req.body);
      }).catch(err => {
        return res.status(500).send(err);
      });

      

});

app.post('/newcharacter', (req, res) => {
    console.log(req.body)
    var payload = [req.body.Personnage_ID, req.body.Nom, req.body.Prenom, req.body.Age, req.body.Date_de_naissance, req.body.Date_de_mort, req.body.Biographie, req.body.Image, req.body.Image2, req.body.Categorie_ID_categorie]
    connection.query(postcharacter, payload, (err, results) => {
        if (err){
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});


app.post('/likes', (req, res) => {
    console.log(req.body)
    var payload = [req.body.ID_user, req.body.ID_personnage]
    connection.query(likes, payload, (err, results) => {
        if (err){
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.delete('/deletelike', (req, res) => {
    console.log(req.body)
    var payload = [req.body.ID_user, req.body.ID_personnage]
    connection.query(dellike, payload, (err, results) => {
        if (err){
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.get('/getLiked/:id', (req, res) => {
    console.log(req.params)
    connection.query(getLiked, req.params.id, (err, results) => {
        if (err){
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.get('/getunliked/:id', (req, res) => {
    console.log(req.params)
    connection.query(getunliked , req.params.id, (err, results) => {
        if (err){
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});


app.get('/commentaires/:id', (req, res) => {

    connection.query(getCommentaire,req.params.id, (err, results) => {
        if (err){
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.delete('/delcom', (req, res) => {
    console.log(req.body)
    var payload = [req.body.Personnage_Personnage_ID, req.body.User_User_ID, req.body.Com_ID]
    connection.query(delcom, payload, (err, results) => {
        if (err){
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.post('/postcom', (req, res) => {
    console.log(req.body)
    var payload = [req.body.Contenu_com, req.body.Date_com, req.body.Personnage_Personnage_ID, req.body.User_User_ID]
    connection.query(postcom, payload, (err, results) => {
        if (err){
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});


app.listen(5555, () =>{
    console.log('Salut ici 5555')
})