const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

// 🔹 Middleware to parse POST form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'Frontend' folder
app.use(express.static(path.join(__dirname, 'Frontend')));

// 🔹 Setup EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to send index.html file
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

// frontend se req liya hai (user, pass)
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log('Password : ', password);
    res.render('submit', { username });
});

// click create-account 
app.get("/create-account", (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'create.html'));
});


// Hidden Detail Enter 
app.post('/create-account', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const cPassword = req.body.cPassword;
    const email = req.body.email;

    // Check if password and confirm password are the same
    if (password != cPassword) {
        return res.status(400).send("Error: Password and confirm password do not match.");
    }
    else {
        console.log(username);
        console.log(password);
        console.log(email);

        res.render('create', { username });
    }

});


// forget Password click
app.get('/forget-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'forget.html'));
});

// OTP System is not Created 

// hidden detail forget Password

app.post('/forget-password', (req, res) => {
    const email = req.body.email;
    const newPassword = req.body.Npassword;
    const confirmPassword = req.body.Cpassword;

    if (newPassword != confirmPassword) {
        return res.status(400).send("Error: Password and confirm password do not match.");
    }

    console.log(email);
    console.log(newPassword);

    res.render('change');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
