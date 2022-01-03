let display = document.getElementById("display");
let cartNo = document.getElementById("cNumb");
let foodItem = [];
let cartCounter = 0;
let subTotal1;
let subTotal2 = document.getElementById("subt2");
let subTotal3 = document.getElementById("subt3");
let address = [];
let reserveInfo = [];
let commentInfo = [];
let cardDetails = [];
let ordDetails = [];
let signupDetails = [];
let trackOrder = document.getElementById("chkod");
let OrderItem = document.getElementById("orditem");
let reserveMessage = document.getElementById("rsmsg");
let orderMessage = document.getElementById("ordmsg");
let trackMessage = document.getElementById("trckmsg");
let reserveCode = document.getElementById("code");
let orderCode = document.getElementById("ordcode");
let loader = document.getElementById("loader");
let mloader = document.getElementById("mloader");
let trloader = document.getElementById("trloader");
let rCode = [];
let oCode = [];
let bN = [];
let prodPage = document.getElementById("ppa");
let checkReserve = document.getElementById("chrs");
let searchBar = document.getElementById("sbar");
let foundSearch = document.getElementById("fse");
let notFound = document.getElementById("nfse");
let billDeets = [];
let headName = document.getElementById("hdnm");
let siName = document.getElementById("siN");
let siPass = document.getElementById("siP");
let pName = document.getElementById("pName");

if (localStorage.getItem("foodItems")) {
  foodItem = JSON.parse(localStorage.getItem("foodItems"));
}

if (localStorage.getItem("rsvInfo")) {
  reserveInfo = JSON.parse(localStorage.getItem("rsvInfo"));
}

if (localStorage.getItem("cartCounter")) {
  cartCounter = JSON.parse(localStorage.getItem("cartCounter"));
  cartCounter = Number(cartCounter);
}

if (localStorage.getItem("ordInfo")) {
  ordDetails = JSON.parse(localStorage.getItem("ordInfo"));
}

if (localStorage.getItem("rsvCode")) {
  rCode = JSON.parse(localStorage.getItem("rsvCode"));
}

if (localStorage.getItem("ordCode")) {
  oCode = JSON.parse(localStorage.getItem("ordCode"));
}

if (localStorage.getItem("sgnInfo")) {
  signupDetails = JSON.parse(localStorage.getItem("sgnInfo"));
}

if (localStorage.getItem("ordItems")) {
  foodItem = JSON.parse(localStorage.getItem("ordItems"));
}

if (localStorage.getItem("buyName")) {
  bN = JSON.parse(localStorage.getItem("buyName"));
}

if (localStorage.getItem("foodies")) {
  let b = localStorage.getItem("foodies");
  foodiesList = JSON.parse(b);
}

cartNo.innerHTML = cartCounter;

// ADDING CARTED ITEMS TO CART TABLE
function add(params) {
  let Image = document.getElementById("image").getAttribute("src");
  let itemName = document.getElementById("iName").innerHTML;
  let itemPrice = document.getElementById("iPrice").innerHTML;
  let Quantity = document.getElementById("quantity").value;
  let buyerName = document.getElementById("pName").innerHTML;

  Quantity = Number(Quantity);
  console.log(Quantity);
  foodItem.push({ Image, itemName, itemPrice, Quantity, buyerName });
  cartCounter += parseInt(Quantity);
  localStorage.setItem("cartCounter", cartCounter);
  localStorage.setItem("foodItems", JSON.stringify(foodItem));
  cartNo.innerHTML = cartCounter;
  window.location.href = "./cart.html";
}

function OD(params) {
  window.location.href = "./menu.html";
}

$(document).ready(function () {
  //Preloader
  preloaderFadeOutTime = 1500;
  function hidePreloader() {
    let preloader = $(".spinner-wrapper");
    preloader.fadeOut(preloaderFadeOutTime);
  }
  hidePreloader();
});

//GENERATE SPECIAL RESERVATION CODE
function generate() {
  let c = Math.floor(Math.random() * 1000);
  reserveCode.innerHTML = c;
}

function generateOrd() {
  let d = Math.floor(Math.random() * 1000);
  orderCode.innerHTML = d;
}

//LANDING PAGE RESERVATIONS
function reserve(params) {
  window.location.href = "./reservation.html";
}

function reservatioN(params) {
  let rsvp = document.querySelectorAll("#rvreserve");
  let newRsvp = {
    date: "",
    time: "",
    seats: "",
    name: "",
    telNo: "",
    Email: "",
    notes: "",
  };
  for (let r = 0; r < rsvp.length; r++) {
    let a = rsvp[r];
    if (r == 0) {
      newRsvp.date = a.value;
    } else if (r == 1) {
      newRsvp.time = a.value;
    } else if (r == 2) {
      newRsvp.seats = a.value;
    } else if (r == 3) {
      newRsvp.name = a.value;
    } else if (r == 4) {
      newRsvp.telNo = a.value;
    } else if (r == 5) {
      newRsvp.Email = a.value;
    } else if (r == 6) {
      newRsvp.notes = a.value;
    }
  }

  if (rsvp[0].value == "") {
    alert("Please choose a DATE");
  } else if (rsvp[1].value == "") {
    alert("Please pick a TIME");
  } else if (rsvp[2].value == "") {
    alert("Plese choose number of SEATS");
  } else if (rsvp[3].value == "") {
    alert("Please provide a NAME");
  } else if (rsvp[4].value == "") {
    alert("Please provide a NUMBER");
  } else if (rsvp[5].value == "") {
    alert("Please provide an EMAIL");
  } else {
    reserveInfo.push(newRsvp);
    localStorage.setItem("rsvInfo", JSON.stringify(reserveInfo));
    generate();
    showLoader();
  }
}

function okay(params) {
  reserveMessage.hidden = true;
  let reserveCode = document.getElementById("code");
  rCode.push(reserveCode.innerHTML);
  console.log(reserveCode);
  console.log(reserveCode.innerHTML);
  localStorage.setItem("rsvCode", JSON.stringify(rCode));

  window.location.href = "./reservation.html";
}

function showLoader() {
  loader.hidden = false;

  setTimeout(() => {
    loader.hidden = true;
    reserveMessage.hidden = false;
  }, 1400);
}

var found = false;
//CHECK RERSERVATION
function checkRsv(params) {
  if (localStorage.getItem("rsvCode")) {
    rCode = JSON.parse(localStorage.getItem("rsvCode"));
  }
  for (let d = 0; d < rCode.length; d++) {
    // alert (d);
    if (checkReserve.value == rCode[d]) {
      found = true;
      localStorage.setItem("noTyped", JSON.stringify(d));
      loader.hidden = false;
      setTimeout(() => {
        $("#y").modal("show");
        modal();
      }, 1000);
    } else if (found == false && d == rCode.length - 1) {
      alert("not found");
    }
  }
  found = false;
}

//TRACK ORDER
function trackOrd(params) {
  if (localStorage.getItem("ordCode")) {
    oCode = JSON.parse(localStorage.getItem("ordCode"));
  }

  for (let r = 0; r < oCode.length; r++) {
    console.log(oCode);
    if (trackOrder.value == oCode[r]) {
      found = true;
      localStorage.setItem("ordTyped", JSON.stringify(r));
      console.log(r);
      showloadT();
    } else if (found == false && r == oCode.length - 1) {
      alert("not found");
    }
  }
  found = false;
}

function view(params) {
  for (let a = 0; a < oCode.length; a++) {
    localStorage.setItem("ordclicked", JSON.stringify(a));
  }
  $("#od").modal("show");
  modalOd();
}

//useful for profile
function modalOd(params) {
  if (localStorage.getItem("ordInfo")) {
    ordDetails = JSON.parse(localStorage.getItem("ordInfo"));
  }

  if (localStorage.getItem("ordclicked")) {
    odcl = JSON.parse(localStorage.getItem("ordclicked"));
  }

  if (ordDetails.length > 0) {
    for (let e = 0; e < ordDetails.length; e++) {
      console.log(ordDetails[e].itemName);
      console.log(a);
      for (let f = 0; f < ordDetails[e].length; f++) {
        console.log(ordDetails[e][f].itemName);
        console.log(pName.innerHTML);
        if ((a = [e])) {
          console.log(a);
          console.log(odcl);
          document.getElementById("modalod").innerHTML += `
            <div class="modal-body">
            <div class="rd-hdd"><h4 class="rd-hd">ORDER DETAILS</h4></div>
            <p class="rd-inf">NAME : <span class="rd-info" > ${ordDetails[e][f].itemName}</span></p>
            <p class="rd-inf">SEAT NO : <span class="rd-info" >${ordDetails[e][f].Quantity}</span></p>
            <p class="rd-inf">TELEPHONE NUMBER : <span class="rd-info" >${ordDetails[e][f].itemPrice}</span></p>
            
            
    
    
             
         </div>
            `;
        }
      }
    }
  }
}

function X(params) {
  window.location.href = "./reservation.html";
}

function XX(params) {
  window.location.href = "./checkout.html";
}

function Xlp(params) {
  window.location.href = "./index.html";
}

function payOut(params) {
  let crdDts = document.querySelectorAll("#crddt");
  let newdts = { cardNo: "", cvv: "", pin: "" };

  for (let r = 0; r < crdDts.length; r++) {
    let w = crdDts[r];
    if (r == 0) {
      newdts.cardNo = w.value;
    } else if (r == 1) {
      newdts.cvv = w.value;
    } else if (r == 2) {
      newdts.pin == w.value;
    }
  }
  if (crdDts[0].value == "") {
    alert("please input a valid card number");
  } else if (crdDts[1].value == "") {
    alert("please input your cvv");
  } else if (crdDts[2].value == "") {
    alert("please input your pin");
  } else {
    cardDetails.push(newdts);
    localStorage.setItem("crdDeets", JSON.stringify(cardDetails));
    generateOrd();
    showload();
  }
}

function okayM(params) {
  orderMessage.hidden = true;
  oCode.push({ orderCode, pName });
  localStorage.setItem("ordCode", JSON.stringify(oCode));
  mloader.hidden = false;
  saveOrder();
  setTimeout(() => {
    mloader.hidden = true;
    window.location.href = "./checkout.html";
  }, 1000);
}

function modal(params) {
  if (localStorage.getItem("rsvInfo")) {
    reserveInfo = JSON.parse(localStorage.getItem("rsvInfo"));
  }

  if (localStorage.getItem("noTyped")) {
    d = JSON.parse(localStorage.getItem("noTyped"));
  }

  if (reserveInfo.length > 0) {
    reserveInfo.forEach((rInfo, i) => {
      if (i == d) {
        console.log(i);
        console.log(d);
        document.getElementById("modaly").innerHTML += `
        <div class="modal-body">
        <div class="rd-hdd"><h4 class="rd-hd">RESERVATION DETAILS</h4></div>
        <p class="rd-inf">NAME : <span class="rd-info" > ${rInfo.name}</span></p>
        <p class="rd-inf">SEAT NO : <span class="rd-info" >${rInfo.seats}</span></p>
        <p class="rd-inf">TELEPHONE NUMBER : <span class="rd-info" >${rInfo.telNo}</span></p>
        <p class="rd-inf">DATE : <span class="rd-info" >${rInfo.date}</span></p>
        <p class="rd-inf">TIME : <span class="rd-info" >${rInfo.time}</span></p>
        
        


         
     </div>
        `;
      }
    });
  }
}

function openCart(params) {
  window.location.href = "./cart.html";
}

function checkOut(params) {
  let billingDetails = document.querySelectorAll("#checkO");
  let newBD = {
    name: "",
    telNo: "",
    St_Add: "",
    location: "",
    email: "",
    notes: "",
  };

  for (let h = 0; h < billingDetails.length; h++) {
    let f = billingDetails[h];
    if (h == 0) {
      newBD.name = f.value;
    } else if (h == 1) {
      newBD.telNo = f.value;
    } else if (h == 2) {
      newBD.St_Add = f.value;
    } else if (h == 3) {
      newBD.location = f.value;
    } else if (h == 4) {
      newBD.email = f.value;
    } else if (h == 5) {
      newBD.notes = f.value;
    }
  }

  if (billingDetails[0].value == "") {
    alert(" Please input a name");
  } else if (billingDetails[1].value == "") {
    alert(" Please input a number");
  } else if (billingDetails[2].value == "") {
    alert(" Please input a valid address");
  } else if (billingDetails[3].value == "") {
    alert(" Please select a location");
  } else if (billingDetails[4].value == "") {
    alert(" Please input a valid email");
  } else {
    billDeets.push(newBD);
    localStorage.setItem("BDeets", JSON.stringify(billDeets));
    loader.hidden = false;
    setTimeout(() => {
      loader.hidden = true;
      $("#z").modal("show");
    }, 1500);
    // alert('you will be redirected to make your payment')
  }
}

// function OpenCheckout(params) {
//     $('#a').modal('show');

//     // for (let a = 0; a < foodItem.length; a++) {
//     //     let i = foodItem[a]
//     //     if (display.innerHTML == "" && logged) {
//     //         alert('please add stuffs to your cart')
//     //     }
//     //     else {
//     //         window.location.href = './checkout.html'
//     //     }

//     // }

// }

// LANDING PAGE MENU LOOP
let foods = [
  {
    foodName: "ELITE AMALA",
    foodDeets: "Elite Amala<br>Gbegiri <br> Ewedu <br> and orisirisi",
    foodPrice: "&#8358;2500",
    imagePath: "../images/Amala1.jpg",
    category: "HOMEPAGE",
  },

  {
    foodName: "POUNDED YAM & AFANG SOUP",
    foodDeets: "Pounded yam<br> Afang soup<br> assorted meat<br> and orisirisi",
    foodPrice: "3500",
    imagePath: "../images/FM-50.jpg",
    category: "HOMEPAGE",
  },
  {
    foodName: "CATFISH PEPPERSOUP",
    foodDeets:
      "Cat Fish <br>elen themed peppersoup<br> and diced irish potatoes",
    foodPrice: "3000",
    imagePath: "../images/pSOup.jpg",
    category: "HOMEPAGE",
  },
  {
    foodName: "HONEY GLAZED CHICKEN",
    foodDeets: "chicken <br> honey <br> grilled meats <br> and fried plantain.",
    foodPrice: "5500",
    imagePath: "../images/FM-24.jpg",
    category: "HOMEPAGE",
  },
  {
    foodName: "PANDORA BOX",
    foodDeets:
      "Grilled meats<br>Chicken Kebabs<br>Chips<br> and ketchup or sauce.",
    foodPrice: "15500",
    imagePath: "../images/pandora.png",
    category: "HOMEPAGE",
  },
  {
    foodName: "ELITE EWA AGOYIN",
    foodDeets:
      "Mashed Beans <br> fried belona stew, <br> grilled meats <br> and fried plantain.",
    foodPrice: "2500",
    imagePath: "../images/ewa.jpg",
    category: "HOMEPAGE",
  },
  {
    foodName: "ENGLISH BREAKFAST",
    foodDeets:
      "Toast Bread<br> Hotdogs <br> Baked beans <br> scrabbled eggs <br> and coffee",
    foodPrice: "4500",
    imagePath: "../images/engb.jpg",
    category: "BREAKFAST",
  },

  {
    foodName: "YAM AND EGG SAUCE",
    foodDeets: "Diced Yam<br> Egg sauce <br> diced tomato",
    foodPrice: "4500",
    imagePath: "../images/yne.jpg",
    category: "BREAKFAST",
  },

  {
    foodName: "ELITE ENGLISH BREAKFAST",
    foodDeets:
      "Pancakes <br> Hotdogs <br>Baked beans <br> scrabbled eggs <br> and coffee",
    foodPrice: "6500",
    imagePath: "../images/bac.PNG",
    category: "BREAKFAST",
  },

  {
    foodName: "SKEWERED PRAWNS",
    foodDeets: "Seasoned Prawns <br> diced onions and pepper <br> Sauce ",
    foodPrice: "5700",
    imagePath: "../images/Skewered-Prawns.jpg",
    category: "STARTER",
  },

  {
    foodName: "PEPPERED GIZZARD",
    foodDeets: "Peppered Gizzard",
    foodPrice: "4500",
    imagePath: "../images/gizzards.jpg",
    category: "STARTER",
  },

  {
    foodName: "PEPPERED CROACKER FISH",
    foodDeets: "Peppered Croaker Fish",
    foodPrice: "5500",
    imagePath: "../images/Peppered-Fish.jpg",
    category: "STARTER",
  },

  {
    foodName: "BUFFALO WINGS",
    foodDeets: "Buffalo Wings <br> Sauce ",
    foodPrice: "4500",
    imagePath: "../images/Buffalo-wings.jpg",
    category: "STARTER",
  },

  {
    foodName: "FRIED RICE AND SALMOS FILLET",
    foodDeets: "Fried rice <br> Salmon fillet <br> Sauce ",
    foodPrice: "7500",
    imagePath: "../images/salm.PNG",
    category: "LUNCH",
  },

  {
    foodName: "JOLLOF RICE AND FRUIT SALAD",
    foodDeets: "Jollof rice <br> Planatain <br> Fruit Salad <br> Sauce",
    foodPrice: "7500",
    imagePath: "../images/jfr.PNG",
    category: "LUNCH",
  },

  {
    foodName: "JOLLOF RICE AND MEATBALLS",
    foodDeets: "Jollof rice <br> Chicken wings <br> Meatballs <br> Sauce ",
    foodPrice: "7500",
    imagePath: "../images/jrice.jpeg",
    category: "LUNCH",
  },

  {
    foodName: "ELITE POUNDED YAM",
    foodDeets: "Pounded yam<br> Afang soup<br> assorted meat<br> and orisirisi",
    foodPrice: "3500",
    imagePath: "../images/FM-50.jpg",
    category: "DINNER",
  },

  {
    foodName: "ELITE AMALA",
    foodDeets: "Elite Amala<br>Gbegiri <br> Ewedu <br> and orisirisi",
    foodPrice: "2500",
    imagePath: "../images/Amala1.jpg",
    category: "DINNER",
  },

  {
    foodName: "MASHED POTATO AND SALMOS FILLET",
    foodDeets: "Mashed Potato <br> Salmon fillet <br> Sauce ",
    foodPrice: "7500",
    imagePath: "../images/fnmp.PNG",
    category: "DINNER",
  },

  {
    foodName: "CAJUN SPAGHETTI AND SPICE",
    foodDeets: "Cajun Spaghetti<br>chicken fills<br> Spice ",
    foodPrice: "7500",
    imagePath: "../images/cajun.PNG",
    category: "CONTINENTAL",
  },

  {
    foodName: "CHICKEN SALAD",
    foodDeets: "Chicken fills <br>Fruit salad<br> Sauce ",
    foodPrice: "7500",
    imagePath: "../images/capture4.PNG",
    category: "CONTINENTAL",
  },

  {
    foodName: "CHICKEN SHAWARMA",
    foodDeets: "Shawarma <br>Chicken fills ",
    foodPrice: "2500",
    imagePath: "../images/FM-34.jpg",
    category: "GRILLS",
  },

  {
    foodName: "GRILLED FISH AND SAUCE",
    foodDeets: "Grilled fish <br> Chips <br> sauce ",
    foodPrice: "2500",
    imagePath: "../images/FM-52.jpg",
    category: "GRILLS",
  },

  {
    foodName: "TIGER PRAWNS AND CHIPS ",
    foodDeets: "Tiger prawns <br> Fish <br> and sauce",
    foodPrice: "2500",
    imagePath: "../images/tgpr.PNG",
    category: "GRILLS",
  },

  {
    foodName: "ELITE HAMBURGER",
    foodDeets: "Elite Hamburger<br> Chips ",
    foodPrice: "4500",
    imagePath: "../images/bacon.PNG",
    category: "GRILLS",
  },

  {
    foodName: "BBQ Chicken",
    foodDeets: "BBQ Chicken",
    foodPrice: "7500",
    imagePath: "../images/BBQ-chicken.jpg",
    category: "GRILLS",
  },
];

localStorage.setItem("foodies", JSON.stringify(foods));

foods.forEach((food, i) => {
  if (food.category == "HOMEPAGE") {
    document.querySelector(".lp-mefi").innerHTML += `
   <div class="lp-menf"  >
        <div class="lp-mnam">
       
         <p class="lp-mnft">${food.foodDeets} </p>

         <h6 class="lp-mpri"> <span>&#8358;</span>${food.foodPrice}</h6>
         <div class="lp-dmbt odbt" onclick = "openPPage(event)" >
                <button class="btn lp-mbt"> 
                O R D E R &nbsp; N O W
                </button>
                <span class = 'pIndex' hidden>${i}</span>
                
            </div>
      </div>

     <div class="lp-meni" >
        <img class="lp-menim"  src="${food.imagePath}" alt="">
        <h5 class="lp-mnh">${food.foodName}</h5>
     </div>
 </div>
    `;
  }
});

function openPPage(e) {
  if (!e.target.classList.contains("odbt")) {
    let foodId = e.target.parentElement.children[1].innerHTML;
    localStorage.setItem("foodClicked", foodId);
    window.location.href = "./productpage.html";
  }
}

function search(params) {
  let searchedItem = searchBar.value;
  console.log(searchedItem);
  console.log(searchedItem.toUpperCase());

  if (localStorage.getItem("foodies")) {
    let b = localStorage.getItem("foodies");
    foodiesList = JSON.parse(b);
  }
  // console.log(foodiesList);
  for (let i = 0; i < foodiesList.length; i++) {
    let a = foodiesList[i];
    if (a.foodName.includes(searchedItem.toUpperCase())) {
      console.log(a);
      window.location.href = "./search.html";
      // foundSearch.style.display = 'block'
      // notFound.style.display = 'none'

      localStorage.setItem("searchfood", JSON.stringify(a));
    }
    // console.log(a);
  }
}

// UPDATING THE SHIPPING.
function update(params) {
  let addrs = document.querySelectorAll("#list");
  let newAdd = { state: "", location: "" };
  for (let p = 0; p < addrs.length; p++) {
    let d = addrs[p];
    console.log(d.value);
    if (p == 0) {
      newAdd.state = d.value;
    } else if (p == 1) {
      newAdd.location = d.value;
    }
  }

  if (addrs[0].value == "STATE") {
    alert("Please select your State.");
    selectLocation.style.display = "block ";
  } else if (addrs[1].value == "LOCATION") {
    alert("Kindly Select your location");
    selectLocation.style.display = "block ";
  } else {
    address.push(newAdd);
    localStorage.setItem("shipLocation", JSON.stringify(address));
    showLoc();
  }
}

function signInM() {
  $("#s").modal("show");

  headName.innerHTML = "S I G N &nbsp; I N";
}

function trackM() {
  $("#od").modal("show");
}

function signUp(params) {
  let signupDts = document.querySelectorAll("#sgupdts");
  let newSdts = {
    surname: "",
    fName: "",
    mNo: "",
    email: "",
    pword: "",
    rPword: "",
  };

  for (let s = 0; s < signupDts.length; s++) {
    let d = signupDts[s];
    if (s == 0) {
      newSdts.surname = d.value;
    } else if (s == 1) {
      newSdts.fName = d.value;
    } else if (s == 2) {
      newSdts.mNo = d.value;
    } else if (s == 3) {
      newSdts.email = d.value;
    } else if (s == 4) {
      newSdts.pword = d.value;
    } else if (s == 5) {
      newSdts.rPword = d.value;
    }
  }

  if (signupDts[0].value == "") {
    alert("please enter your name");
  } else if (signupDts[1].value == "") {
    alert("please enter your name");
  } else if (signupDts[2].value == "") {
    alert("please enter your number");
  } else if (signupDts[3].value == "") {
    alert("please enter a valid email");
  } else if (signupDts[4].value == "") {
    alert("please enter a password");
  } else {
    signupDetails.push(newSdts);
    localStorage.setItem("sgnInfo", JSON.stringify(signupDetails));
    stsi();
  }
}

let loggedIn;

function signIn() {
  if (localStorage.getItem("logIn")) {
    loggedIn = JSON.parse(localStorage.getItem("logIn"));
  }

  if (localStorage.getItem("sgnInfo")) {
    signupDetails = JSON.parse(localStorage.getItem("sgnInfo"));
  }

  for (let e = 0; e < signupDetails.length; e++) {
    if (
      siName.value == signupDetails[e].email &&
      siPass.value == signupDetails[e].pword
    ) {
      // loggedIn = true;
      console.log(siName.value);
      console.log(signupDetails[e].email);
      console.log(signupDetails[e].fName);
      localStorage.setItem("logIn", "1");
      localStorage.setItem("sIdts", JSON.stringify(e));
      $("#s").modal("hide");
      window.location.href = "./index.html";
    } else {
      mloader.hidden = false;
      setTimeout(() => {
        mloader.hidden = true;
        smload.hidden = false;
      }, 600);
    }
  }
}

function sI(params) {
  if (localStorage.getItem("logIn")) {
    loggedIn = JSON.parse(localStorage.getItem("logIn"));
  }
  if (localStorage.getItem("sgnInfo")) {
    signupDetails = JSON.parse(localStorage.getItem("sgnInfo"));
  }

  if (localStorage.getItem("sIdts")) {
    e = JSON.parse(localStorage.getItem("sIdts"));
  }

  if (signupDetails.length > 0) {
    for (let f = 0; f < signupDetails.length; f++) {
      if (f == e) {
        console.log(signupDetails[f].fName);
        pName.innerHTML = signupDetails[f].fName;
        console.log(pName.innerHTML);
      }
    }
  }
  if (loggedIn == true) {
    sgn.hidden = true;
    prof.hidden = false;
    loggedIn = false;
  } else if (loggedIn == false) {
    sgn.hidden = false;
    prof.hidden = true;
  }
}

sI();

function signOut(params) {
  localStorage.removeItem("logIn", "1");
  localStorage.removeItem("sIdts", JSON.stringify(e));

  window.location.href = "./index.html";
}

function showload(params) {
  mloader.hidden = false;

  setTimeout(() => {
    mloader.hidden = true;
    orderMessage.hidden = false;
  }, 1400);
}

function showloadT(params) {
  trloader.hidden = false;

  setTimeout(() => {
    trloader.hidden = true;
    trackMessage.hidden = false;
  }, 1400);
}

function OpenCheckout(params) {
  let loggedIn;
  if (foodItem.length == 0) {
    alert("please add to cart");
  } else {
    window.location.href = "./checkout.html";
  }
}

function saveOrder(params) {
  sBN();
  ordDetails.push(foodItem);
  localStorage.setItem("ordInfo", JSON.stringify(ordDetails));
  saveBn();
}

console.log(ordDetails);

function sBN(params) {
  bN.push(pName.innerHTML);
  localStorage.setItem("buyName", JSON.stringify(bN));
}

function saveBn(params) {
  for (let x = 0; x < bN.length; x++) {
    localStorage.setItem("bnId", JSON.stringify(x));
  }
}

function stsu() {
  smload.hidden = true;
  mloader.hidden = false;
  headName.innerHTML = "";
  headName.innerHTML = "S I G N &nbsp; U P";

  setTimeout(() => {
    mloader.hidden = true;
    sgIn.hidden = true;
    sgUp.hidden = false;
  }, 600);
}

function stsi() {
  mloader.hidden = false;
  headName.innerHTML = "";
  headName.innerHTML = "S I G N &nbsp; I N";

  setTimeout(() => {
    mloader.hidden = true;

    sgUp.hidden = true;
    sgIn.hidden = false;
  }, 400);
}

function openNav() {
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}
