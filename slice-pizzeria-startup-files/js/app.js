let total = 0;
let prixMax;

let body = document.querySelector("body");

function reusit() {
	let nomb = document.querySelectorAll(".basket-aside li");

	let div = document.createElement("div");
	div.classList.add("order-modal-wrapper");

	let div1 = document.createElement("div");
	div1.classList.add("order-modal");

	let image = document.createElement("img");
	image.src = "../images/carbon_checkmark-outline.svg";

	let p3 = document.createElement("p");
	p3.classList.add("order-modal-title");
	p3.textContent = "Order Confirmed";

	let p4 = document.createElement("p");
	p4.classList.add("order-modal-subtitle");
	p4.textContent = "We hope you enjoy your food!";

	let ul = document.createElement("ul");
	ul.classList.add("order-detail");

	for (let i = 0; i < nomb.length; i++) {
		let imageId = "";
		for (let y = 0; y < data.length; y++) {
			if (data[y].id == nomb[i].getAttribute("id")) {
				imageId = data[y].image;
			}
		}

		let Name = nomb[i].querySelector(".basket-product-item-name");
		let Nombre = nomb[i].querySelector(".basket-product-details-quantity");
		let LePrix = nomb[i].querySelector(".basket-product-details-unit-price");
		let Prix = nomb[i].querySelector(".basket-product-details-total-price");
		console.log(nomb[i].getAttribute("id"));

		let li = document.createElement("li");
		li.classList.add("order-detail-product-item");

		let image2 = document.createElement("img");
		image2.src = imageId;
		image2.classList.add("order-detail-product-image");

		let span9 = document.createElement("span");
		span9.classList.add("order-detail-product-name");
		span9.textContent = Name.innerHTML;

		let span10 = document.createElement("span");
		span10.classList.add("order-detail-product-quantity");
		span10.textContent = Nombre.innerHTML;

		let span11 = document.createElement("span");
		span11.classList.add("order-detail-product-unit-price");
		span11.textContent = LePrix.innerHTML;

		let span12 = document.createElement("span");
		span12.classList.add("order-detail-product-total-price");
		span12.textContent = Prix.innerHTML;

		ul.appendChild(li);
		li.appendChild(image2);
		li.appendChild(span9);
		li.appendChild(span10);
		li.appendChild(span11);
		li.appendChild(span12);
	}
	let Total = document.querySelector(".total-order-price");

	let li2 = document.createElement("li");
	li2.classList.add("order-detail-total-price");

	let span13 = document.createElement("span");
	span13.classList.add("total-order-title");
	span13.textContent = "Order total";

	let span14 = document.createElement("span");
	span14.classList.add("total-order-price");
	span14.textContent = Total.innerHTML;

	let a = document.createElement("a");
	a.classList.add("new-order-btn");
	a.textContent = "Start new order";
	a.href = "#";

	a.addEventListener("click", () => {
		location.reload();
	});

	div.appendChild(div1);
	div1.appendChild(image);
	div1.appendChild(p3);
	div1.appendChild(p4);
	div1.appendChild(ul);
	ul.appendChild(li2);
	li2.appendChild(span13);
	li2.appendChild(span14);
	div1.appendChild(a);

	body.appendChild(div);

	console.log(div);

	return div;
}

let data;
addEventListener("DOMContentLoaded", async () => {
	const result = await fetch("http://51.38.232.174:3001/products", {
		method: "GET",
	});
	data = await result.json();

	console.log(data);

	ordre();
});

const sup = document.querySelector(".pizzas-wrapper");
const section = document.querySelector("section");

sup.remove();

let info = document.createElement("div");
info.classList.add("pizzas-wrapper");

section.appendChild(info);

let elPrixNomb = document.getElementById("itemCount");

function page(image, nom, prix, i) {
	let div = document.createElement("div");
	div.classList.add("pizza-item");

	let img = document.createElement("img");
	img.classList.add("pizza-picture");
	img.src = image;

	let btn = document.createElement("span");
	btn.classList.add("add-to-cart-btn");

	let icon = document.createElement("img");
	icon.src = "../images/carbon_shopping-cart-plus.svg";

	let p = document.createElement("p");
	p.textContent = "Ajouter au panier";

	let ul = document.createElement("ul");
	ul.classList.add("pizza-infos");

	let li1 = document.createElement("li");
	li1.textContent = nom;
	li1.classList.add("pizza-name");

	let li2 = document.createElement("li");
	li2.textContent = "$" + prix;
	li2.classList.add("pizza-price");

	div.appendChild(img);
	div.appendChild(btn);
	btn.appendChild(icon);
	btn.appendChild(p);
	div.appendChild(ul);
	ul.appendChild(li1);
	ul.appendChild(li2);

	btn.addEventListener("click", () => {
		let item = Array.from(document.querySelectorAll(".basket-product-item"));
		const el = item.find((e) => {
			const elName = e.querySelector(".basket-product-item-name").innerHTML;
			return elName == nom;
		});

		if (el) {
			let elPrix = el.querySelector(".basket-product-details-total-price");
			let elNomb = el.querySelector(".basket-product-details-quantity");
			elNomb.innerHTML = 1 + Number(elNomb.innerHTML.replace("x", "")) + "x";
			elPrix.innerHTML =
				"$" + (prix + Number(elPrix.innerHTML.replace("$", "")));
			elPrixNomb.innerHTML = Number(elNomb.innerHTML.replace("x", ""));
		} else {
			const choix = commende(
				data[i].name,
				1,
				data[i].price,
				data[i].price,
				data[i].id
			);
			ul1.appendChild(choix);
			item.push(choix);
		}
		const elItem = item.reduce((a, e) => {
			let elNomb = e.querySelector(".basket-product-details-quantity");

			return a + Number(elNomb.innerHTML.replace("x", ""));
		}, 0);
		elPrixNomb.innerHTML = elItem;

		const elTotal = item.reduce((a, e) => {
			let elPrix = e.querySelector(".basket-product-details-total-price");

			return a + Number(elPrix.innerHTML.replace("$", ""));
		}, 0);
		total = "$" + elTotal;
		prixMax.innerHTML = total;
	});

	return div;
}

async function ordre() {
	for (let i = 0; i < data.length; i++) {
		const resultPizza = page(data[i].image, data[i].name, data[i].price, i);
		info.appendChild(resultPizza);
	}
}

const sup3 = document.querySelector(".baskets-with-pizza");
const aside = document.querySelector(".basket-aside");

sup3.remove();

let baskets = document.createElement("div");
baskets.classList.add("baskets-with-pizza");

aside.appendChild(baskets);

let ul1 = document.createElement("ul");
ul1.classList.add("basket-products");

baskets.appendChild(ul1);

function commende(nom, nombre, lePrix, prix, id) {
	let li = document.createElement("li");
	li.classList.add("basket-product-item");
	li.setAttribute("id", id);

	let span = document.createElement("span");
	span.classList.add("basket-product-item-name");
	span.textContent = nom;

	let span2 = document.createElement("span");
	span2.classList.add("basket-product-details");

	let span3 = document.createElement("span");
	span3.classList.add("basket-product-details-quantity");
	span3.textContent = nombre + "x";

	let span4 = document.createElement("span");
	span4.classList.add("basket-product-details-unit-price");
	span4.textContent = "@ $" + lePrix;

	let span5 = document.createElement("span");
	span5.classList.add("basket-product-details-total-price");
	span5.textContent = "$" + prix;

	let image = document.createElement("img");
	image.classList.add("basket-product-remove-icon");
	image.src = "../images/remove-icon.svg";

	li.appendChild(span);
	li.appendChild(span2);
	span2.appendChild(span3);
	span2.appendChild(span4);
	span2.appendChild(span5);
	li.appendChild(image);

	image.addEventListener("click", () => {
		li.remove();

		let item = Array.from(document.querySelectorAll(".basket-product-item"));

		const elItem = item.reduce((a, e) => {
			let elNomb = e.querySelector(".basket-product-details-quantity");

			return a + Number(elNomb.innerHTML.replace("x", ""));
		}, 0);
		elPrixNomb.innerHTML = elItem;

		const elTotal = item.reduce((a, e) => {
			let elPrix = e.querySelector(".basket-product-details-total-price");

			return a + Number(elPrix.innerHTML.replace("$", ""));
		}, 0);
		total = "$" + elTotal;
		prixMax.innerHTML = total;
	});

	return li;
}

function valide() {
	let p = document.createElement("p");
	p.classList.add("total-order");

	let span6 = document.createElement("span");
	span6.classList.add("total-order-title");
	span6.textContent = "Order Total";

	let span7 = document.createElement("span");
	span7.classList.add("total-order-price");
	span7.textContent = total;

	let p2 = document.createElement("p");
	p2.appendChild(document.createTextNode("This is a"));
	p2.classList.add("delivery-info");

	let span8 = document.createElement("span");
	span8.appendChild(document.createTextNode(" carbon neutral "));

	baskets.appendChild(p2);
	p2.appendChild(span8);

	p2.appendChild(document.createTextNode("delivery"));

	let a = document.createElement("a");
	a.classList.add("confirm-order-btn");
	a.textContent = "Confirm order";
	a.href = "#";

	baskets.appendChild(p);
	p.appendChild(span6);
	p.appendChild(span7);
	baskets.appendChild(a);

	prixMax = span7;

	a.addEventListener("click", async () => {
		const result = await fetch("http://51.38.232.174:3001/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: "hfranceschi@edenschool.fr",
				password: "ABCD",
			}),
		});
		data1 = await result.json();
		data1 = data1.access_token;

		console.log(data1);

		reusit();

		let nomb = document.querySelectorAll(".basket-aside li");

		let ordeur = [];
		for (let i = 0; i < nomb.length; i++) {
			ordeur.push({
				uuid: nomb[i].getAttribute("id"),
				quantity: Number(
					nomb[i]
						.querySelector(".basket-product-details-quantity")
						.innerHTML.replace("x", "")
				),
			});
		}
		console.log(ordeur);

		const result2 = await fetch("http://51.38.232.174:3001/orders", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + data1,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				products: ordeur,
			}),
		});
		data1 = await result2.json();
		console.log(data1);
		console.log(result2.status);

		console.log("ok");
	});
}
valide();

let sup4 = document.querySelector(".order-modal-wrapper");

sup4.remove();
