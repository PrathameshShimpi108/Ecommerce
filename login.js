let userName=document.querySelectorAll("input")[0];
let password=document.querySelectorAll("input")[1];
let form=document.querySelector("form");
let euser=document.querySelectorAll("span")[0];
let epass=document.querySelectorAll("span")[1];
let eform=document.querySelectorAll("span")[2];
let lstorage=JSON.parse(localStorage.getItem("lstorage"));



form.addEventListener("submit", (e)=>{

    euser.innerHTML="";
    epass.innerHTML="";
    eform.innerHTML="";

    let matching=lstorage.find((e)=>{
        if(e.userMobile==userName.value && e.userPassword==password.value){
            return e;
        }
    });
    console.log(matching);


    if(userName.value=="" && password.value==""){
        euser.innerHTML=`Enter Username`
        epass.innerHTML=`Enter Password`
        e.preventDefault();
    }else if(userName.value==""){
        euser.innerHTML=`Enter username`
        e.preventDefault();
    }else if(password.value==""){
        epass.innerHTML=`Enter Password`
        e.preventDefault();
    }else if(matching){
                alert("Approved");
                localStorage.setItem("user", JSON.stringify(matching))
            }else{
                eform.innerHTML=`Not Approved`;
                e.preventDefault();
            }
})