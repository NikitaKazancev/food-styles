import { postData } from "./functions";

export default function forms() {
	const forms = document.querySelectorAll("form"),
		messages = {
			error: "Произошла ошибка!!!",
			info: "Ваш запрос обрабатывается...",
			success: "Ваш запрос был успешно отправлен. Скоро с вами свяжутся",
		};

	const showFormResp = (formResponse, status, remove) => {
		formResponse.textContent = messages[status];
		formResponse.classList.add(`form-response_${status}`);

		if (remove) {
			formResponse.classList.remove("form-response_info");
			const timeout = setTimeout(() => {
				formResponse.classList.remove(`form-response_${status}`);

				clearTimeout(timeout);
			}, 5000);
		}
	};

	forms.forEach((form) => {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const data = Object.fromEntries(new FormData(form).entries());
			// new FormData(form).forEach((value, key) => data[key] = value);

			const formResponse = document.querySelector(".form-response");
			showFormResp(formResponse, "info");

			postData("requests", data, true)
				.then((data) => {
					showFormResp(formResponse, "success", true);
				})
				.catch((data) => {
					console.error(data);
					showFormResp(formResponse, "error", true);
				})
				.finally(() => {
					form.reset();
				});
		});
	});
}
