import { addAndRemove } from "./functions";

export default function calc() {
	let personProperties = {
		gender: "fm",
		height: 0,
		weight: 0,
		age: 0,
		activity: "1.375",
	};
	if (localStorage.getItem("personProperties"))
		personProperties = JSON.parse(localStorage.getItem("personProperties"));
	class Calc {
		constructor(outputSelector) {
			this.output = document.querySelector(outputSelector);
		}

		calc = () => {
			localStorage.setItem(
				"personProperties",
				JSON.stringify(personProperties)
			);
			const { gender, height, weight, age, activity } = personProperties;
			if (height && weight && age) {
				const result = (
					+activity *
					(gender === "fm"
						? 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age
						: 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age)
				).toFixed(1);
				this.output.textContent = result;
			}
		};
	}
	class CalcBlock extends Calc {
		constructor({
			id,
			propName,
			outputSelector = ".calculating__result > span",
			clazz = "calculating__choose-item",
			activePostfix = "_active",
		}) {
			super(outputSelector);
			this.block = document.querySelector(`#${id}`);
			this.collection = this.block.querySelectorAll(`.${clazz}`);
			this.clazz = clazz;
			this.activeClazz = clazz + activePostfix;
			this.setActive(propName);
			this.calc();
			this.onClick(propName);
		}

		onClick = (propName) => {
			this.block.addEventListener("click", (e) => {
				if (e.target.matches(`.${this.clazz}`)) {
					this.deleteActiveClass(this.collection, this.activeClazz);
					e.target.classList.add(this.activeClazz);
					personProperties[propName] = e.target.getAttribute(
						`data-${propName}`
					);
					this.calc();
				}
			});
		};

		deleteActiveClass = () => {
			this.collection.forEach((node) =>
				node.classList.remove(this.activeClazz)
			);
		};

		setActive = (propName) => {
			this.collection.forEach((node) => {
				node.classList.remove(this.activeClazz);
				if (
					node.getAttribute(`data-${propName}`) ===
					personProperties[propName]
				)
					node.classList.add(this.activeClazz);
			});
		};
	}

	class CalcInputs extends Calc {
		constructor({
			clazz = "calculating__choose-item",
			successPostfix = "_success",
			errorPostfix = "_error",
			collectionSelector = "#person-properties > .calculating__choose-item",
			outputSelector = ".calculating__result > span",
		} = {}) {
			super(outputSelector);
			this.collection = document.querySelectorAll(collectionSelector);
			this.successClazz = clazz + successPostfix;
			this.errorClazz = clazz + errorPostfix;
			this.setValues();
			this.calc();
			this.onChange();
		}

		onChange = () => {
			this.collection.forEach((input) =>
				input.addEventListener("input", () => {
					if (input.value.trim() === "")
						input.classList.remove(this.errorClazz, this.successClazz);
					else if (/^\d+(\.\d+)?$/g.test(input.value)) {
						addAndRemove(input, this.successClazz, this.errorClazz);
						personProperties[input.getAttribute("data-calc-name")] =
							+input.value;
						this.calc();
					} else addAndRemove(input, this.errorClazz, this.successClazz);
				})
			);
		};

		setValues = () => {
			const { height, weight, age } = personProperties;
			this.collection.forEach((input) => {
				switch (input.getAttribute("data-calc-name")) {
					case "height":
						return height ? (input.value = height) : false;
					case "weight":
						return weight ? (input.value = weight) : false;
					case "age":
						return age ? (input.value = age) : false;
				}
			});
		};
	}

	const genderObj = new CalcBlock({ id: "gender", propName: "gender" });
	const activityObj = new CalcBlock({ id: "activity", propName: "activity" });
	const calcInputs = new CalcInputs();
}
