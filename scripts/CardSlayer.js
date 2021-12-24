import CardPlaceable from "./CardPlaceable.js";

export default class CardSlayer extends CanvasLayer {
	async draw() {
		await super.draw();
		this.objects = this.addChild(new PIXI.Container());
		const dataObj = canvas.scene.getFlag("card-slayer", "cards") ?? {};
		for (let data of dataObj) {
			const object = new CardPlaceable(data);
			await object.draw();
			this.objects.addChild(object);
		}
		return this;
	}
}