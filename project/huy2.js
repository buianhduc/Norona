let listItem = JSON.parse(localStorage.getItem("listCart"))
let containerCart = document.getElementsByClassName("product")
let containerTotal = document.getElementsByClassName("totals")
let currency = "&euro;"; // HTML entity of the currency to be displayed in the layout
let currencyString = "€"; // Currency symbol as textual string
let paypalCurrency = "EUR"; // PayPal's currency code
let paypalBusinessEmail = "yourbusiness@email.com"; // Your Business PayPal's account email address
let paypalURL = "http://www.sandbox.paypal.com/cgi-bin/webscr"; // The URL of the PayPal's form

console.log(containerCart)
let beginTotal = 0
for (let i = 0; i < listItem.length; i++) {
    beginTotal = beginTotal + listItem[i].price
    console.log(listItem[i].price)
    console.log(beginTotal)

    let HTMLCart =
        `
        <div  class="product">
        <div class="product-image">
                <img src="${listItem[i].productImage}">
            </div>
            <div class="product-details">
                <div class="product-title">${listItem[i].productName}</div>
            </div>
            <div class="product-price">20</div>
            <div class="product-quantity">
                <input type="number" value="1" min="1">
            </div>
            <div class="product-removal">
                <button class="remove-product">
                    Remove
                </button>
            </div>
            <div class="product-line-price">20</div>
        </div>
            
        `
    containerCart[0].insertAdjacentHTML("beforeend", HTMLCart)
}

if (beginTotal) {

    let HTMLTotal =
        `
        <div class="totals-item">
                    <label>Subtotal</label>
                    <div class="totals-value" id="cart-subtotal">${beginTotal}</div>
                </div>
                <div class="totals-item">
                    <label>Tax (5%)</label>
                    <div class="totals-value" id="cart-tax">1.00</div>
                </div>
                <div class="totals-item">
                    <label>Shipping</label>
                    <div class="totals-value" id="cart-shipping"> FREE</div>
                </div>
                <div class="totals-item totals-item-total">
                    <label>Grand Total</label>
                    <div class="totals-value" id="cart-total">${(beginTotal + beginTotal * 0.05 + 0.00).toFixed(2)}</div>
                </div>
        `
    containerTotal[0].insertAdjacentHTML("beforeend", HTMLTotal)
    localStorage.setItem("total", (beginTotal + beginTotal * 0.05 + 0.00).toFixed(2))
}

console.log((beginTotal * 0.05 + 0.00))



/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 0.00;
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change(function () {
    updateQuantity(this);
});

$('.product-removal button').click(function () {
    removeItem(this);
});


/* Recalculate cart */
function recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    $('.product').each(function () {
        if ($(this).children('.product-line-price').text()) {
            console.log(parseFloat($(this).children('.product-line-price').text()))
            subtotal += parseFloat($(this).children('.product-line-price').text());
        }
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;
    localStorage.setItem("total", total)

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function () {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#cart-shipping').html(shipping.toFixed(2));
        $('#cart-total').html(total.toFixed(2));
        if (total == 0) {
            $('.checkout').fadeOut(fadeTime);
        } else {
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}


/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
    });
}

