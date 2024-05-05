let fname=document.querySelectorAll("input")[0];
let lname=document.querySelectorAll("input")[1];
let email=document.querySelectorAll("input")[2];
console.log(email);
let mobile=document.querySelectorAll("input")[3];
let password=document.querySelectorAll("input")[4];
let cpassword=document.querySelectorAll("input")[5];
let efname=document.querySelectorAll("span")[0];
let elname=document.querySelectorAll("span")[1];
let eemail=document.querySelectorAll("span")[2];
let emobile=document.querySelectorAll("span")[3];
let epass=document.querySelectorAll("span")[4];
let ecpass=document.querySelectorAll("span")[5];
let form=document.querySelector("form");
let storage=[];
let lstorage=JSON.parse(localStorage.getItem("lstorage"));
if(lstorage){
    storage=lstorage;
}

form.addEventListener("submit", (e)=>{
    let regx=/^[a-zA-Z]{2,15}$/;
    let regx1=/^[6-9][0-9]{9}$/;
    let regx2=/^[a-zA-Z0-9]{6,15}$/;
    let flag=true;
    let mobileVal=storage.find((e)=>{
        if(mobile.value==e.userMobile){
            return e;
        }
    })
    let emailVal=storage.find((e)=>{
        if(email.value=e.userEmail){
            return e;
        }
    })

    if(fname.value==""){
        efname.innerHTML="*first name is required"
        e.preventDefault()
        flag=false;
    }
    else if(regx.test(fname.value)){
        efname.innerHTML=""
    }
    else {
        efname.innerHTML="min-2 max-15 characters with A-Z"
        e.preventDefault();
         flag=false;
    }

    if(lname.value==""){
        elname.innerHTML="*last name is required <br>"
        e.preventDefault();
        flag=false;
    }
    else if(regx.test(lname.value)){
        elname.innerHTML="";
    }
    else{
        elname.innerHTML="min-2 max-15 characters with A-Z<br>"
        e.preventDefault();
        flag=false;
    }

    if(email.value==""){
        eemail.innerHTML="*email is required <br>";
        e.preventDefault();
        flag=false;
    }
    else if(emailVal){
        eemail.innerHTML="it already exists"
        e.preventDefault();
    }
    if(mobile.value==""){
        emobile.innerHTML="*mobile number is required <br>"
        e.preventDefault();
         flag=false;
    }
    else if(mobileVal){
        emobile.innerHTML="it already exists"
        e.preventDefault();
    }
    else if(regx1.test(mobile.value)){
        emobile.innerHTML=""
    }
   
    else{
        emobile.innerHTML="*Number should start with 6-9 total numbers are 10 <br> ";
        e.preventDefault(); 
         flag=false;
    }

    if(password.value==""){
        epass.innerHTML="*password is required <br>";
        e.preventDefault();
         flag=false;
    }
    else if(regx2.test(password.value)){
        epass.innerHTML=""
    }else{
        epass.innerHTML="min-6 max-15 a-z A-Z 0-9 characters are allowed <br>";
        e.preventDefault();
         flag=false;
    }

    if(cpassword.value==password.value){
        ecpass.innerHTML=""
    }
    else{
        ecpass.innerHTML="*not matching";
        e.preventDefault();
         flag=false;
    }
    
    if(flag){
        let obj={
            userFname:fname.value,
            userLastname:lname.value,
            userEmail:email.value,
            userMobile:mobile.value,
            userPassword:password.value
        }
        storage.push(obj);
        localStorage.setItem("lstorage", JSON.stringify(storage))
        
    }
    
})

