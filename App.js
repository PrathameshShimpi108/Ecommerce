let user=JSON.parse(localStorage.getItem("user"));
let login=document.querySelector("#login");
let right=document.querySelector(".right")
console.log(user, login, right);
let menSection=document.querySelector("#menSection")
let womenSection=document.querySelector("#womenSection")
let electronicsSection=document.querySelector("#electronicsSection")
let KidsSection=document.querySelector("#KidsSection")
let designSection=document.querySelector(".design");
let cartSection=document.querySelector("#cart");
let close=document.querySelector("#close");
let cartStorage=[];
let cartCont=document.querySelector("#cart-cont")
let total=document.querySelector("#total");



close.addEventListener("click",()=>{
    cartSection.style.right="-100%";
})

if(user){
    login.remove();
    right.innerHTML=`<a href="./index.html" id="logout"><button>logout</button></a>
    <span style="color:white;">${user.userFname}</span>
    <a href="#"><i class="fa-sharp fa-solid fa-cart-shopping"></i></a>`
}

let logout=document.querySelector("#logout");
logout.addEventListener("click",()=>{
    localStorage.removeItem("user");
})

async function products(){
    let data=await fetch("https://www.shoppersstack.com/shopping/products/alpha");
    let allData=await data.json();
    // console.log(allData);
    let menData=allData.data.filter((e)=>{
        if(e.category=="men"){
            return e;
        }
    })
    // console.log(menData);
    let womenData=allData.data.filter((e)=>{
        if(e.category=="women"){
            return e;
        }
    })
    // console.log(womenData);

    let electronics=allData.data.filter((e)=>{
        if(e.category=="electronics"){
            return e;
        }
    })
    // console.log(electronics);
    let kids=allData.data.filter((e)=>{
        if(e.category=="kids"){
            return e;
        }
    })
    console.log(kids);
    menData.map((e)=>{
        menSection.innerHTML +=`<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>
    </div>`
    })
    womenData.map((e)=>{
        womenSection.innerHTML +=`<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>
    </div>`
    })
    electronics.map((e)=>{
        electronicsSection.innerHTML +=`<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>
    </div>`
    })
    kids.map((e)=>{
        KidsSection.innerHTML +=`<div id="${e.productId}">
        <img src="${e.productImageURLs[0]}" alt="">
        <h2>${e.name}</h2>
        <p>${e.description}</p>
        <h3>${e.price}</h3>
        <button>Add to cart</button>
    </div>`
    })


    let designBtn=designSection.querySelectorAll("button");
    console.log(designBtn);
    designBtn.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            cartSection.style.right="0";
            let parentElement=btn.parentElement.id;
            // console.log(parentElement);
            let product=allData.data.find((e)=>{
                if(parentElement==e.productId){
                    return e;
                }
               
            })
            cartStorage=cartStorage.filter((e)=>{
                if(e.productId != product.productId){
                     return e;
                }
           })
            cartStorage.push(product)

           cartProduct();
            console.log(product, cartStorage);
        })
    })
}
products();
function cartProduct(){
    cartCont.innerHTML=""

         cartStorage.map((e)=>{
            cartCont.innerHTML +=`
        <div class="cart-item" id="${e.productId}">
            <div>
                <img src="${e.productImageURLs[0]}" alt="">
            </div>
            <div>
                <h3>${e.name}</h3>
                <input type="number" >
                <h5>${e.price}</h5>
            </div>
            <div>
                <h4 class="sub">${e.price}</h4>
            </div>
            <div>
                <i class="fa-solid fa-trash"></i>
            </div>
        </div>
        `
    })
    removeProducts();
    subtotal();
    grandTotal();

};

   function removeProducts(){
    let del=document.querySelectorAll(".fa-solid");
    del.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
           let parentId=btn.parentElement.parentElement.id
         
           cartStorage=cartStorage.filter((e)=>{
                if(e.productId != parentId){
                     return e;
                }
           })
           console.log(cartStorage);
           cartProduct();
        })
    })
   }

   function subtotal(){
    let input=document.querySelectorAll("input");
        input.forEach((quantity)=>{
           quantity.addEventListener("input",()=>{
            if(quantity.value<1){
                quantity.value=1
            }
            let parent=quantity.parentElement.parentElement
            let price=parent.querySelector("h5");
            let sub=parent.querySelector("h4");
            sub.innerHTML=quantity.value*price.innerHTML;
            // console.log(parent, price, sub);
            grandTotal();
           })

        })
   }

   function grandTotal(){
    let sub1=document.querySelectorAll(".sub");
    let temp=0
    sub1.forEach((e)=>{
       let subNumber=parseInt(e.innerHTML)
        temp +=subNumber
    })
    total.innerHTML =`Total: ${temp}`;
   }

//    if(userdata){then only show everything}
// cartStorage each object should be assigned to input