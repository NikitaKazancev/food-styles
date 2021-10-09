import { changeClasses, getData } from "./functions";

export default function foodStyles() {
	const foodStyles = {
		img: document.querySelector(".tabcontent > img"),
		descr: document.querySelector(
			".tabcontent__descr > .tabcontent__descr__wrap"
		),
		styles: [],

		createStyle(id = 0) {
			changeClasses(this.img, "fade", "unFade");
			changeClasses(this.descr, "fade", "unFade");
			const interval = setInterval(() => {
				this.img.setAttribute("src", this.styles[id].imgUrl);
				this.img.setAttribute("alt", this.styles[id].alt);
				this.descr.textContent = this.styles[id].text;

				changeClasses(this.img, "unFade", "fade");
				changeClasses(this.descr, "unFade", "fade");
				clearInterval(interval);
			}, 600);

			this.changeActiveItem(id);
		},

		changeActiveItem(id) {
			document.querySelectorAll(".tabheader__item").forEach((item, i) => {
				if (item.classList.contains("tabheader__item_active")) {
					item.classList.remove("tabheader__item_active");
				} else if (id === i) {
					item.classList.add("tabheader__item_active");
				}
			});
		},
	};

	getData("food-styles").then((arr) => {
		foodStyles.styles = arr;

		document
			.querySelector(".tabheader__items")
			.addEventListener("click", ({ target }) => {
				if (target.matches(".tabheader__item")) {
					foodStyles.createStyle(+target.getAttribute("data-id"));
				}
			});

		foodStyles.createStyle();
	});
}
