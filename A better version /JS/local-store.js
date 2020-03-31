//variable

const cartBtn = document.querySelector('.cart-btn');
// const closeCartBtn = document.querySelector('.close-cart'); //thêm vào sau, ở trong phần tính tiền
const clear = document.querySelector('.clear-cart'); //thêm vào sau, ở trong phần tính tiền
const cartDOM = document.querySelector('.cart'); //thêm vào sau, ở trong phần tính tiền
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items')
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content-container');
const productDOM = document.querySelector('.product-center');
const clearCartBtn = document.querySelector('.clear-cart');
let cartBtnChecker = false;
const CoronaInformationBtn = document.getElementsByClassName('corona-information-btn');
const CoronaVirusInformation = document.getElementsByClassName('corona-virus-information');



//main-cart

let cart = [];
//buttons
let buttonsDOM = [];
//getting the products
class Products {
  async getProducts() {
    // var xhReq = new XMLHttpRequest();
    // xhReq.open("GET", 'https://raw.githubusercontent.com/buianhduc/Norona/master/database.json', false);
    // xhReq.send(null);
    // var jsonObject = JSON.parse(xhReq.responseText);
    // var items = document.getElementById("items")
    try {
      let result = await fetch('https://raw.githubusercontent.com/buianhduc/Norona/master/database.json');
      let data = await result.json();
      let products = data.items;
      products = products.map(item => {
        const { name, price } = item;
        const { id } = item;
        const picture = item.picture;
        return { name, price, id, picture }
      })
      return products;
    } catch (error) {
      console.log(error);
    }

  }
}
// display product
class UI {
  displayProducts(products) {
    // console.log(products);
    let result = '';
    products.forEach(products => {
      result = `
          <div class="item" data-id="${products.id}">
              <div class="img-container">
                  <img src="${products.picture}" alt="" class="image">
                  <button class="add-to-cart-btn" data-id="${products.id}"><img src="SVG images/add-to-cart.svg" alt="" ></button>
              </div>
              <div class="description">
                  <div class="name">${products.name}</div>
                  <div class="price">${products.price} đ/cái</div>
              </div>
          </div>`
      productDOM.innerHTML += result;
    })

  }
  getBagButtons() {
    const buttons = [...document.getElementsByClassName('add-to-cart-btn')];
    buttonsDOM = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id == id);
      if (inCart) {
        button.innerHTML = '<img src="SVG images/add-to-cart-successful.svg" alt="">';
        button.disabled = true;
      }
      button.addEventListener('click', (event) => {
        // console.log(event.target);
        
        event.target.innerHTML = '<img src="SVG images/add-to-cart-successful.svg" alt="">';
        button.disabled = true;
        // console.log(event);
        // get product from products
        let cartItem = { ...Storage.getProducts(id), amount: 1 };
        // add product to the cart
        cart = [...cart, cartItem];
        //save cart in local storage
        Storage.saveCart(cart);
        //set cart values
        this.setCartValues(cart);
        // display cart item
        this.addCartItem(cartItem)
        // show the cart
        this.showCart()
      });
    })
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText ='Tổng số tiền:  ' + parseFloat(tempTotal.toFixed(2))+' VND';
    // cartItems.innerText= itemsTotal;
    // console.log(cartTotal, itemsTotal); //ddcmm lam lai cho nay di
  }
  addCartItem(item) {
    const div = document.createElement('div');
    div.innerHTML = `<div class="cart-content">
    <div><img src="SVG images/Close-btn.png" alt="" data-id=${item.id} class="remove-item"></div>
    <div class="cart-items">
        <img src="Media/Bitmap.png" alt="">
        <div>
            <p>${item.name}</p>
            <p>${item.price} đ/cái</p>
        </div>
        <div class="Amount">
            <div class="Amount-text">Số lượng: </div>
            <div>
                <img src="SVG images/arrow-up.png" alt="" class="arrow-up" data-id=${item.id}>
            <p class="item-amount">${item.amount}</p>
            <img src="SVG images/arrow-down.png" alt="" class="arrow-down" data-id=${item.id}>
            </div>
        </div>
    </div>
</div>`;
    cartContent.appendChild(div);

  }
  showCart() {
      if(cartBtnChecker==false){
        cartOverlay.style.transform = "translateY(0%)"
      cartBtn.style.transform="rotate(180deg)"
      cartBtnChecker=true;
      }
      else{
        cartOverlay.style.transform = "translateY(95%)";
      cartBtn.style.transform="rotate(0deg)";
      cartBtnChecker=false;
        
      }
  }
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
      cartBtn.addEventListener('click', this.showCart);
  }
  populateCart(cart) {
    cart.forEach(item => this.addCartItem(item));
  }
  cartLogic() {
    // console.log('clearCartBtn')
    clearCartBtn.addEventListener('click',()=>{
      this.clearCart()})
  }
  clearCart(){
    let cartItems =cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));
    while(cartContent.children.length>0){
      cartContent.removeChild(cartContent.children[0]);
    }
    document.addEventListener('click', event=>{
      // console.log(event.target);
      if(event.target.classList.contains('remove-item')){
        // console.log('sdnjsfn');
        let remove_Item = event.target;
        let id=remove_Item.dataset.id;
        cartContent.removeChild(remove_Item.parentElement.parentElement.parentElement);
        // console.log(remove_Item.parentElement.parentElement);
        // console.log('sdnjsfn');
        this.removeItem(id);
      }
      else if(event.target.classList.contains("arrow-up")){
        let addAmount = event.target;
        let id=addAmount.dataset.id;
        let tempItem =  cart.find(item => item.id===id);
        // console.log(tempItem.amount);
        tempItem.amount = tempItem.amount +1;
        // console.log(tempItem.amount)
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      }
      else if(event.target.classList.contains("arrow-down")){
        let addAmount = event.target;
        let id=addAmount.dataset.id;
        let tempItem =  cart.find(item => item.id===id);
        tempItem.amount = tempItem.amount - 1;
        if(tempItem.amount>0){
          Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.previousElementSibling.innerText = tempItem.amount;          
        }
        else{
         cartContent.removeChild(addAmount.parentElement.parentElement.parentElement.parentElement.parentElement);
          this.removeItem(id);
        }
        
      }
    })
  }
  removeItem(id){
    cart = cart.filter(item => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    // console.log(button);
    // console.log('sjhfjhs');
    
    button.disabled = false;
    button.innerHTML = `<img src="SVG images/add-to-cart.svg" alt="" >`;
  }
  getSingleButton(id){
    return buttonsDOM.find(button => button.dataset.id === id);
  }

}

//local storage
class Storage {
  static saveProduct(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProducts(id) {
    let products = JSON.parse(localStorage.getItem('products'))
    return products.find(product => product.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  static getCart() {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  ui.setupAPP();
  //get all product
  products.getProducts().then(products => {
    ui.displayProducts(products)
    Storage.saveProduct(products)
  })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();  
    })
})