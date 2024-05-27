const express = require('express');
const cors = require('cors');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer')
const fs = require('fs')
const Place = require('./models/place')
const uploadmulter = multer({ dest: 'uploads/' })
const Booking = require('./models/booking')


require('dotenv').config()
const user = require('./models/user');
const uri = process.env.MONGO_URL;
const jwtsecret = "ajsdjfoienfsdfja";
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);
  console.log("connection successfull");
}

const bcryptSalt = bcrypt.genSaltSync(10);
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/uploads',express.static(__dirname+'/uploads'))
// app.use(express.urlencoded({extended : true}));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

function getUserDataFromToken(req){
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token,jwtsecret,{},async (err,userData)=>{
            if(err) throw err;
            resolve(userData);
        });
    })
}
app.get('/test', (req, res) => {
    res.json('test ok');
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(user);
    } catch (e) {
        res.status(422).json(e);
    }
})
app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        const passOk = bcrypt.compareSync(password,user.password);
        if(passOk){
            jwt.sign({email : user.email,id : user._id},jwtsecret,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(user);
            })
        }else{
            res.status(422).json('wrong password');
        }
    }else{
        res.json('not found');
    }
})

app.get('/profile',async (req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtsecret,{},async (err,userData)=>{
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        })
    }else{
        res.json(null);
    }
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
    
})

app.post('/upload-by-link',async (req,res)=>{
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await download.image({
        url : link,
        dest : __dirname + '/uploads/' + newName,
    });
    res.json(newName);

})
app.post('/upload',uploadmulter.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
    for(const fileInfo of req.files){
        const {path,originalname} = fileInfo;
        const part = originalname.split('.');
        const ext = part[part.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path,newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
    }
    res.json(uploadedFiles);
})

app.post('/places',(req,res)=>{
    const {token} = req.cookies;
    const {title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;
    jwt.verify(token,jwtsecret,{},async (err,userData)=>{
        if(err) throw err; 
        const placeDoc = await Place.create({
            owner : userData.id,
            title,address,addedPhotos,
            description,perks,extraInfo,
            checkIn,checkOut,maxGuests,price
            
        })
        res.json(placeDoc);
    });
})

app.get('/user-places',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,jwtsecret,{},async (err,userData)=>{
        if(err) throw err;
        const {id} = userData;
        res.json(await Place.find({owner:id}));
    })
})

app.get('/places/:id',async (req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id));
})

app.put('/places',async (req,res)=>{
    const {token} = req.cookies;
    const {id,title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;
    jwt.verify(token,jwtsecret,{},async (err,userData)=>{
        if(err) throw err;
        const placeDoc = await Place.findById(id);
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,address,addedPhotos,
                description,perks,extraInfo,
                checkIn,checkOut,maxGuests,price
            })
            await placeDoc.save();
            res.json('ok');
        }
    })
    
})
app.get('/places',async (req,res)=>{
    res.json(await Place.find({}));
})

app.post('/booking',async (req,res)=>{
    const userData = await getUserDataFromToken(req)
    const {place,checkIn,checkOut,mobile,numberOfGuests,name,price} = req.body;
    Booking.create({
        place,checkIn,checkOut,mobile,numberOfGuests,name,price,user:userData.id
    }).then((doc)=>{
        res.json(doc);
    }).catch(err=>{
        throw err
    })

})
app.get('/booking',async (req,res)=>{
    const userData = await getUserDataFromToken(req);
    res.json(await Booking.find({user:userData.id}).populate('place'))    

})
app.listen(3000, () => {
    console.log("Listening on port 3000 ....")
})