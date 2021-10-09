export const addAndRemove = (node, addClazz, removeClazz) => {
	node.classList.add(addClazz);
	node.classList.remove(removeClazz);
};

export const postData = async (url, data, text = false) => {
	const res = await fetch(`http://localhost:3000/${url}`, {
		body: JSON.stringify(data),
		method: "POST",
		headers: { "Content-type": "application/json" },
	});

	if (!res.ok)
		throw new Error(`Could not fetch ${url}. Status: ${res.status}`);
	else return text ? await res.text() : await res.json();
};

export const getData = async (url) => {
	const res = await fetch(`http://localhost:3000/${url}`);

	if (!res.ok)
		throw new Error(`Could not fetch ${url}. Status: ${res.status}`);
	else return res.json();
};

export const clearTimeoutId = (id, elem, removedClass) => {
	elem.classList.remove(removedClass);
	clearTimeout(id);
};

export const changeClasses = (elem, added, removed) => {
	elem.classList.remove(removed);
	elem.classList.add(added);
};

export const addZero = (num) => {
	if (num < 10) return `0${num}`;
	return num;
};
