const main = document.querySelector(".main-wrapper");
const sup = document.querySelector(".pizzas-wrapper");
const sup2 = document.querySelector(".basket-aside");

sup.remove();
sup2.remove();

function page() {
	let info = document.createElement("div");
	info.classList.add("pizza-wrapper");

	let div = document.createElement("div");
	div.classList.add("pizza-item");

	let img = document.createElement("img");
	img.classList.add("pizza-picture");
	img.src = "https://cdn.dummyjson.com/recipe-images/1.webp";

	let btn = document.createElement("span");
	btn.classList.add("add-to-cart-btn");

	let icon = document.createElement("img");
	icon.src = "../images/carbon_shopping-cart-plus.svg";

	let p = document.createElement("p");
	p.textContent = "Ajouter au panier";

	let ul = document.createElement("ul");
	ul.classList.add("pizza-infos");

	let li1 = document.createElement("li");
	li1.textContent = "test";
	li1.classList.add("pizza-name");

	let li2 = document.createElement("li");
	li2.textContent = "test";
	li2.classList.add("pizza-price");

	let aside = document.createElement("aside");
	aside.classList.add("basket-aside");

	let h2 = document.createElement("h2");
	h2.textContent = "Votre panier (0)";

	let empty = document.createElement("div");
	empty.classList.add("empty-basket");

	let pizza = document.createElement("img");
	pizza.src = "../images/pizza.png";

	let pPizza = document.createElement("p");
	pPizza.textContent = "Votre panier est vide...";

	main.appendChild(info);
	info.appendChild(div);
	div.appendChild(img);
	div.appendChild(btn);
	btn.appendChild(icon);
	btn.appendChild(p);
	div.appendChild(ul);
	ul.appendChild(li1);
	ul.appendChild(li2);
	main.appendChild(aside);
	aside.appendChild(h2);
	aside.appendChild(empty);
	empty.appendChild(pizza);
	empty.appendChild(pPizza);
}

async function ordre() {
	const result = await fetch("http://51.38.232.174:3001/products", {
		method: "GET",
	});
	const data = await result.json();

	console.log(data);

	for (let i = 0; i < data.length; i++) {
		li1.textContent = data[i].name;
		li2.textContent = "$" + data[i].price;
	}
}

page();
ordre();
