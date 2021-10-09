import { addZero } from "./functions";

export default function slider() {
	const slider = document.querySelector(".offer__slider"),
		prevArrow = slider.querySelector(".offer__slider-prev"),
		nextArrow = slider.querySelector(".offer__slider-next"),
		sliderWrapper = slider.querySelector(".offer__slider-wrapper"),
		sliderTrack = sliderWrapper.querySelector(".offer__slider-track"),
		currentNum = slider.querySelector("#current"),
		slidesTotal = slider.querySelector("#total"),
		dotsWrapper = sliderWrapper.querySelector(".carousel-indicators");

	let copyLastSlide = sliderTrack.lastElementChild.cloneNode(true),
		copyFirstSlide = sliderTrack.firstElementChild.cloneNode(true);
	sliderTrack.prepend(copyLastSlide);
	sliderTrack.append(copyFirstSlide);

	const slides = sliderTrack.querySelectorAll(".offer__slide"),
		len = slides.length,
		timeBetweenSlides = 500;

	for (let i = 0; i < len - 2; i++) {
		dotsWrapper.innerHTML += `<div class="dot"></div>`;
	}
	const sliderDots = dotsWrapper.querySelectorAll(".dot");

	// initial states
	sliderTrack.style.width = 100 * len + "%";
	slidesTotal.textContent = addZero(len - 2);
	sliderTrack.style.transform = `translateX(-${100 / len}%)`;
	currentNum.textContent = addZero(1);

	let sliderId = 1,
		ableToClick = true;

	const setActiveDot = (id) => {
		let idForRemove = !sliderId
			? 0
			: sliderId === len - 1
			? len - 3
			: sliderId - 1;

		sliderDots[idForRemove].classList.remove("dot_active");
		sliderDots[id - 1].classList.add("dot_active");
	};

	const workWithAble = (callback) => {
		if (ableToClick) {
			callback();

			ableToClick = false;
			setTimeout(() => (ableToClick = true), timeBetweenSlides);
		}
	};

	const move = (id, last = false) => {
		!last
			? ((sliderTrack.style.transition = `all ${timeBetweenSlides / 1000}s`),
			  setTimeout(
					() => (sliderTrack.style.transition = "none"),
					timeBetweenSlides
			  ),
			  setActiveDot(!id ? len - 2 : id === len - 1 ? 1 : id),
			  (sliderId = id),
			  (currentNum.textContent = addZero(sliderId)))
			: (sliderId = id - 1);

		sliderTrack.style.transform = `translateX(${(-100 * sliderId) / len}%)`;
	};

	const moveToCopySlide = (id) => {
		currentNum.textContent = addZero(id - 1);
		setTimeout(() => move(id, true), timeBetweenSlides);
	};

	const moveToSlide = (next) => {
		workWithAble(() => {
			next ? move(sliderId + 1) : move(sliderId - 1);

			sliderId === len - 1 && next
				? moveToCopySlide(2)
				: sliderId === 0 && !next
				? moveToCopySlide(len - 1)
				: null;
		});
	};

	sliderDots.forEach((elem, id) =>
		elem.addEventListener("click", () => workWithAble(() => move(id + 1)))
	);
	setActiveDot(1);
	nextArrow.addEventListener("click", () => moveToSlide(true));
	prevArrow.addEventListener("click", () => moveToSlide(false));
}
