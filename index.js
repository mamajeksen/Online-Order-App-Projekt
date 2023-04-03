import {menuArray} from './data.js'


let pickedProducts = []

let totalPrice = 0

const form = document.getElementById('form')
const shopCard = document.getElementById('shoppig-card')


document.addEventListener("click", function(e){

    if(e.target.dataset.pick){
        shoppingCard(e.target.dataset.pick)
    } 
    else if (e.target.dataset.delete) {
        handleRemoveBtn(e.target.dataset.delete)
    } 
    else if (e.target.id === 'complete-btn') {
        handleBtns(e.target.id)
    } 
    else if (e.target.id === 'pay-btn') {
        handleBtns(e.target.id)
    } 

})

const modal = document.getElementById('modal')


function handleBtns(btnId){

let custumerName = document.querySelector('#name')

    if (btnId == 'complete-btn'){

        modal.style.display = 'inline'

    } else if (btnId == 'pay-btn' ) {


        if (form.reportValidity()) {

        modal.style.display = 'none'
        shopCard.classList.add('hidden')

        document.getElementById('successfully-ordered').innerHTML = `

        <div class="successfully-ordered">

            <p class="thanks-message"> Thanks ${custumerName.value}! Your order is on it´s way!</p>
        </div>
        `
    }
}

    
}



function shoppingCard(productId) {

   const targetProduct = menuArray.filter(function(product){
        return product.id == productId
    })[0]



            if (!pickedProducts.some(product => product.name == targetProduct.name) ) {

                    let pickedProduct = {name: targetProduct.name,
                                        amount:1,
                                        price: targetProduct.price,
                                        id: targetProduct.id,
                                        data: [targetProduct.price]}
  
                pickedProducts.push(pickedProduct)

            } else { const pickedProduct = pickedProducts.filter(function(product){
                return product.name == targetProduct.name
            })[0]
            pickedProduct.amount++
            pickedProduct.data.push(targetProduct.price)
            }

        handleTotalPrice()

        render()
    } 

     function handleTotalPrice() {

         let allSums = []
          let totalSum = ''
    

        pickedProducts.forEach(function(product){
               let totalSums =  product.data.reduce(function(a,b){
                return a+b;
               })
                
               allSums.push(totalSums) 

            })

            if (allSums.length > 0) {

                totalSum = allSums.reduce(function(a,b){
                    return a+b
                 })
            }


             return totalSum

     }


function handleRemoveBtn(removeId) {

    const targetProduct = pickedProducts.filter(function(remove){
        return remove.id == removeId
    })[0]
    

    if (targetProduct.amount > 1) {
        targetProduct.amount--
        targetProduct.data.pop()
    } else {
    pickedProducts.pop()}

    render()
}




function getProductHtml() {

    let productHtml = ``

    menuArray.forEach(function(product){



        
        productHtml += `
        <div class="product"> 
            <p class="icons">${product.emoji}</p>

            <div class="prdct-descrptn">
                <p class="prdct-name"> ${product.name}</p>
                <p class="prdct-ingrdnts"> ${product.ingredients}</p>
                <p class="prdct-price">$ ${product.price}</p>
            </div>

            <button class="plus" data-pick="${product.id}">+</button>

        </div>
        `

        
    })
    return productHtml
}

function renderShoppingList() {

    let pickedProduct = ``

    pickedProducts.forEach(function(product) {


        pickedProduct += `
    
            <div class="product-in-shopping-list">
                <p class="list-margin"> ${product.name} 
                <span class="remove-btn  " data-delete="${product.id}"> remove </span> </p>
                
                <p class="list-margin"> <span class="product-amount">x${product.amount}</span> $ ${product.price} </p>
            </div>
        `         
    })
    return pickedProduct
}

function render() {
    document.getElementById('products').innerHTML = getProductHtml()

    if (pickedProducts.length > 0) {
    shopCard.classList.remove('hidden')
} else {
    shopCard.classList.add('hidden')}


        document.getElementById('shop-list').innerHTML = renderShoppingList()

        document.getElementById('total-sum').innerHTML ="$" + handleTotalPrice()


}

render()
