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
    var username= req.body.username
    var gender=req.body.gender
    var bloodgroup= req.body.bloodgroup
    var address= req.body.address
    var pinCode= req.body.pinCode
    var email=req.body.email
    var phno=req.body.phno
    var dob= req.body.dob
    var password=req.body.password
    var fathersName= req.body.fathersName
    var fathersNo= req.body.fathersNo
    var fathersAddress= req.body.fathersAddress

    var data={
        "name":name,
        "username": username,
        "gender":gender,
        "bloodgroup": bloodgroup,
        "address": address,
        "pincode": pinCode,
        "email":email,
        "phno":phno,
        "dob": dob,
        "password":password,
        "father's name": fathersName,
        "father's Number": fathersNo,
        "fathersAddress": fathersAddress
    }
    db.collection('worker.info').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('dashboard.html')
})

app.post("/add_equipment",(req,res) => {

    var machine_no= req.body.machine_no
    var machine_type= req.body.machine_type
    var machine_status= req.body.machine_status

    var data={
        "Machine.no.":machine_no,
        "Machine.type": machine_type,
        "Machine.Status":machine_status
    }
    db.collection('Machine_info').insertOne(data,(err,collection) => {
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