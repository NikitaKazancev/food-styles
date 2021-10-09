export default function modal() {
	const modalTimer = 5000,
		modal = document.querySelector(".modal"),
		btnContact = document.querySelectorAll("[data-contact]");

	const modalToggle = (overflow = "hidden") => {
		document.documentElement.style.overflow = overflow;
		modal.classList.toggle("show");
		clearTimeout(timeoutId);
		window.removeEventListener("scroll", modalScroll);
	};

	const modalScroll = () => {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.offsetHeight - 10
		)
			modalToggle();
	};

	const timeoutId = setTimeout(() => {
		modalToggle();
	}, modalTimer);

	window.addEventListener("scroll", modalScroll);

	btnContact.forEach((btn) =>
		btn.addEventListener("click", () => modalToggle())
	);
	document.addEventListener("keydown", ({ code }) => {
		if (code === "Escape" && modal.classList.contains("show")) modalToggle();
	});

	modal.addEventListener("click", ({ target }) => {
		if (target.matches(".modal") || target.matches(".modal__close"))
			modalToggle("");
	});
}
