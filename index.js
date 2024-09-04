var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://rachitchauhanjsp78:RxPSxegBzp7xZZIF@coalmine.lc54i.mongodb.net/coalmine')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/login", (req, res) => {
    var name = req.body.name.trim();
    var password = req.body.password.trim();

    // Log the input data for debugging
    console.log("Input Name: ", name);
    console.log("Input Password: ", password);

    // Find the user with the provided name
    db.collection('login.admin').findOne({ name: name }, (err, user) => {
        if (err) {
            console.error("Error occurred:", err);
            return res.send('<script>alert("An error occurred while processing your request."); window.location.href = "login.html";</script>');
        }

        if (!user) {
            console.log("User not found");
            return res.send('<script>alert("Login failed! Incorrect name or password."); window.location.href = "login.html";</script>');
        } else {
            console.log("Found User: ", user);

            if (user.password === password) {
                console.log("Password match");
                return res.redirect('dashboard.html');
            } else {
                console.log("Password mismatch");
                return res.send('<script>alert("Login failed! Incorrect name or password."); window.location.href = "login.html";</script>');
            }
        }
    });
});

app.post("/sign_up",(req,res) => {
    var name= req.body.name
    var age=req.body.age
    var email=req.body.email
    var phno=req.body.phno
    var gender=req.body.gender
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "gender":gender,
        "password":password
    }
    db.collection('login.admin').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('dashboard.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('login.html')
}).listen(3000);

console.log("Listening on port 3000")