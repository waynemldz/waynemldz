const itemList = document.getElementById("item-list");
const cartList = document.getElementById("cart-list");
const totalCart = document.getElementById("total");

itemList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-cart")) {
    const item = e.target.parentElement;

    const cartItem = document.createElement("li");
    cartItem.classList.add("item-cart");

    cartItem.innerHTML = `
      <span class="span-name">${item.querySelector(".item-name").textContent}</span>
      <span class="span-price">${item.querySelector(".price").textContent}</span>
      <button class="btn-remove">Remove</button>
    `;

    cartList.appendChild(cartItem);
    calculate();

    // Remove action

    cartList.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-remove")) {
        e.target.parentElement.remove();
        calculate();
      }
    });
  }
});

function parseBRL(valor) {
  return Number(
    valor
      .replace("R$", "")
      .replace(/\s/g, "")
      .replace(".", "")
      .replace(",", "."),
  );
}

// total calculate
function calculate() {
  const lis = document.querySelectorAll("#cart-list li");
  let total = 0;
  lis.forEach((li) => {
    const priceText = li.querySelector(".span-price").innerText;
    let convert = parseBRL(priceText);
    total += convert;
  });

  totalCart.innerText =
    "Total: " +
    total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
}
