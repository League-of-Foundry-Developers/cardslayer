export default class CardHud extends BasePlaceableHUD {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			id: "card-hud",
			template: "modules/cardslayer/templates/card-hud.hbs",
		});
	}

	getData() {
		const data = super.getData();
		data.card = this.object.data;
		return data;
	}

	setPosition(options) {
		let { x, y, width, height } = this.object.hitArea;
		const c = 70;
		const p = -10;
		const position = {
			width: width + (c * 2) + (p * 2),
			height: height + (p * 2),
			left: x + this.object.data.x - c - p,
			top: y + this.object.data.y - p
		};
		this.element.css(position);
	}

	_onClickControl(event) {
		const button = event.currentTarget;
		switch (button.dataset.action) {
			case "visibility":
				return this._onToggleVisibility(event);
			case "play":
				return this._onPlay(event);
		}
	}

	_onPlay(event) {
		this.object.layer.cardPile.playDialog(this.object.data.document);
	}
}