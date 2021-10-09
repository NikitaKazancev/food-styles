import { getData, postData, clearTimeoutId } from "./functions";

export default function card() {
	let timeoutCurrId;

	const currencies = document.querySelector(".currencies"),
		currenciesUl = currencies.querySelector(".currencies__ul");

	currencies.querySelector("span").addEventListener("click", () => {
		if (currenciesUl.classList.contains("moveOut")) {
			clearTimeoutId(
				timeoutCurrId,
				currencies.querySelector(".currencies__ul"),
				"moveOut"
			);
		} else {
			currencies.querySelector(".currencies__ul").classList.add("moveOut");

			timeoutCurrId = setTimeout(() => {
				clearTimeoutId(
					timeoutCurrId,
					currencies.querySelector(".currencies__ul"),
					"moveOut"
				);
			}, 5000);
		}
	});

	let dataCards;

	const createCards = (cards, curr) => {
		cards.forEach(
			({ title, descr, price, img, additionalClasses: classes }) => {
				if (classes)
					new Card(title, descr, price, img, classes).render(curr);
				else new Card(title, descr, price, img).render(curr);
			}
		);
	};

	const changeCurr = (curr) => {
		document.querySelector(".menu__field > .container").innerHTML = "";
		if (dataCards) createCards(dataCards, curr);
		else {
			getData("menu").then((data) => {
				dataCards = data;
				createCards(dataCards, curr);
			});
		}
	};

	currenciesUl.querySelectorAll("li").forEach((curr) => {
		curr.addEventListener("click", () => {
			clearTimeoutId(timeoutCurrId, currenciesUl, "moveOut");
			postData("current-currency", { id: curr.getAttribute("data-curr") });
			getData(`currencies`).then((data) => {
				changeCurr(data[curr.getAttribute("data-curr")]);
			});
		});
	});

	class Card {
		constructor(title, descr, price, img, classes = []) {
			this.title = "Меню" + title;
			this.descr = descr;
			this.price = price;
			this.img = img;
			this.classes = "menu__item " + classes.join(" ");
		}

		render({ value, currDesc, round }) {
			document.querySelector(".menu__field > .container").innerHTML += `
            <div class="${this.classes}">
               <img src="img/tabs/${this.img}.jpg" alt="${this.img}">
               <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${(
							this.price * value
						).toFixed(round)}</span> ${currDesc}/день</div>
               </div>
            </div>
         `;
		}
	}

	if (!dataCards) {
		getData("menu").then((data) => {
			getData("currencies").then((currencies) => {
				getData("current-currency").then((obj) => {
					dataCards = data;
					createCards(dataCards, currencies[obj.id]);
				});
			});
		});
	}
}
