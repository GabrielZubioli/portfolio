export class Consumer {
	constructor(selector, templateFunction, data) {
		this.container = document.querySelector(selector);
		this.templateFunction = templateFunction;
		this.data = data;

		this.render();
	}

	render() {
		if (!this.container) return;
		this.container.innerHTML = this.data.map(item => this.templateFunction(item)).join("");
	}
}
