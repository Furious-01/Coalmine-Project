// Select elements
const wrapper = document.querySelector('.wrapper');



const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const termsLink = document.querySelector('.terms-link');
const modal = document.getElementById('terms-modal');
const modalClose = document.querySelector('.modal-close');

// Form elements
const loginForm = document.querySelector('.login form');


/*const express = require("express")
const app = express()
const path = require("path")
const collection = require("./mongoodb")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
*/


// Toggle between login and register forms


// Show login/register popup
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

// Close login/register popup
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Show terms modal
termsLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    modal.style.display = "block";
});

// Close terms modal
modalClose.addEventListener('click', () => {
    modal.style.display = "none";
});

// Close modal if clicked outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Handle login form submission

//app,get("/",(req,res)=>{
  //  res.render("login")
//}
//)