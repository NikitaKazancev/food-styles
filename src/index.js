import "./index.css";

// not working
// require("es6-promise").polyfill();
// import "nodelist-foreach-polyfill";

import foodStyles from "./components/foodStyles";
import timer from "./components/timer";
import modal from "./components/modal";
import forms from "./components/forms";
import cards from "./components/cards";
import slider from "./components/slider";
import calc from "./components/calc";

document.addEventListener("DOMContentLoaded", () => {
	foodStyles();
	timer();
	modal();
	forms();
	cards();
	slider();
	calc();
});
