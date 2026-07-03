document.addEventListener("DOMContentLoaded", () =>{
    console.log("DOM securely established and ready to be manipulated");
    const dynamicProducts= [
        {name: "Vintage Denim Jackets", price: "Ksh 1,000",  description: "These jackets are made from high-quality denim and are designed to provide both comfort and style. Perfect for any occasion."},
        {name: "Summer Dresses", price: "Ksh 1,500", description: "These dresses are made from soft, breathable fabric that will keep you comfortable all day long. Perfect for any occasion."},
        {name: "Luxury Robes", price: "Ksh 800", description: "These robes are made from premium cotton and are designed to be soft, absorbent, and long-lasting. Perfect for your bathroom or spa."},
        {name: "Sneakers", price: "Ksh 1,200", description: "These sneakers are made from high-quality materials and are designed to provide both comfort and style. Perfect for any occasion."},
    ];
    const dynamicGrid = document.querySelector("#dynamic-products-grid");
    if (dynamicGrid) {
        dynamicProducts.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p><strong>${product.price}</strong> -${product.description}</p>
                `;
            dynamicGrid.appendChild(card);
        });
    }

});

const wishlistForm = document.querySelector("#wishlistForm");
const wishlistInput = document.querySelector("#wishlistInput");
const wishlistItemsContainer = document.querySelector("#wishlistItems");

let storedWishlist = JSON.parse(localStorage.getItem("Obare_wishlist")) || [];
function renderWishlist(itemText){
    const li = document.createElement("li");
    li.textContent = itemText;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        storedWishlist = storedWishlist.filter(item => item !== itemText);
        localStorage.setItem("Obare_wishlist", JSON.stringify(storedWishlist));
    });
    li.appendChild(deleteBtn);
    wishlistItemsContainer.appendChild(li);
}

storedWishlist.forEach(item => renderWishlist(item));
if (wishlistForm) {
    wishlistForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskInputClean = wishlistInput.value.trim();
        if (taskInputClean !=="") {
            if (!storedWishlist.includes(taskInputClean)){
                storedWishlist.push(taskInputClean);
                localStorage.setItem("Obare_wishlist", JSON.stringify(storedWishlist));
                renderWishlist(taskInputClean);
                wishlistInput.value = "";
            } else {
                alert("Item already exists in the wishlist.");
            }
        } else {
            alert("Please enter a valid item.");
        }
    });
}