const express= require('express'); // module name is express

const path= require('path'); // path is a inbuilt module

const port=8000;


const app= express();


// Telling express that view engine is going to be ejs

app.set('view engine','ejs'); // app.set ---> it sets a property ,eg, her it is view engine: ejs 

app.set('views',path.join(__dirname,'views')); // __dirname is an dynamic function for mapping views folder

app.use(express.urlencoded()); // parser whch is a middleware

app.use(express.static('assets'));
// own middlewares below

// app.use(function(req,res,next){   // next is a function with tells the server to go to next middle ware,
//     console.log('middleware 1 called');
//     next();            
//                                     // if next is not called the srver would not move further
// });

// app.use(function(req,res,next){
//     console.log('middleware 2 called');
//     next();            
// });

var contactlist=[
    {
        name:"Anirudh Bhat",
        phone:"7710006199"
    },
    {
        name:"Tony Stark",
        phone:"000000000"
    }
]

app.get('/',function(req,res){        // get post put patch delete  thee are all request types   

  //  res.send('<h1>Cool running fine</h1>');

    return res.render('home',{
        title:"I am ironman",
        contact_list: contactlist
                            }); 
});

app.post('/contact-details',function(req,res){

contactlist.push(req.body);
return res.redirect('back');
});

app.get('/delete-contact/',function(req,res){   //using params or query paramand then slicing it  
                                                // use ?phone=<%= i.phone %> in html here phone becomes variale
    console.log(req.query);

    let phone=req.query.phone;

    //findindex is a greated method , it finds index for a value, if not exits then retuns -1;

    let contactIndex= contactlist.findIndex(contact => contact.phone==phone);
    
    if(contactIndex!=-1){
        contactlist.splice(contactIndex,1);
    }
   
    return res.redirect('back');
});


app.listen(port,function(err){
if(err){
    console.log("Something is wrong",err);
}

console.log("Express Sever is up and running on port",port);
});