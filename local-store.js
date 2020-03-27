//variable

const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart'); //thêm vào sau, ở trong phần tính tiền
const clear = document.querySelector('.clear-cart'); //thêm vào sau, ở trong phần tính tiền
const cartDOM = document.querySelector('.cart'); //thêm vào sau, ở trong phần tính tiền
const cartOverlay = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productDOM = document.querySelector('.product-center');
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
    console.log(products);
    let result = '';
    products.forEach(products => {
      result = `
      <div class="item" class="${products.category}">
    <img src=${products.picture} class="image" style="width: 200px">
    <div class="Description">
        <div class="des-container">
            <div class="name">${products.name}</div>
            <div class="price">${products.price} đ/hộp</div>
            <div class="container add-cart-btn">
                <button class="learn-more .add-to-cart" data-id=${products.id} >
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Thêm vào giỏ hàng</span>
                </button>
            </div>
        </div>
    </div>`;
    productDOM.innerHTML += result;
    })

  }
  getBagButtons(){
    const buttons = [...document.getElementsByClassName('.add-to-cart')];
    buttonsDOM = buttons;
    buttons.forEach(button =>{
      let id= button.dataset.id;
      let inCart =cart.find(item => item.id==id);
      if(inCart){
        button.innerText = "Đã thêm";
        button.disabled = true;
      }
        button.addEventListener('click',(event)=>{
          event.target.innerText = "Đã thêm";
          button.disabled = true;
          // console.log(event);
          // get product from products
            let cartItem = {...Storage.getProducts(id), amount:1};
          // add product to the cart
          cart = [...cart,cartItem];
          //save cart in local storage
          Storage.saveCart(cart);
          //set cart values
          this.setCartValues(cart);
          // display cart item
          // show the cart
        
        });
    })
  }
  setCartValues(cart){
    let tempTotal = 0;
    let itemsTotal =0;
    cart.map(item => {
      tempTotal+= item.price * item.amount;
      itemsTotal += item.amount;
    })
    
  }
}

//local storage
class Storage {
  static saveProduct(products){
    localStorage.setItem("products",JSON.stringify(products));
  }
  static getProducts(id){
    let products = JSON.parse(localStorage.getItem('products'))
    return products.find(product => product.id === id);
  }
  static saveCart(cart){
    localStorage.setItem('cart',JSON.stringify(cart));
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  //get all product
  products.getProducts().then(products => {ui.displayProducts(products)
  Storage.saveProduct(products)})
  .then(()=>{
    ui.getBagButtons();
  })
})