import CardPlaceable from "./CardPlaceable.js";

export default class CardSlayer extends CanvasLayer {
	async draw() {
		await super.draw();
		this.objects = this.addChild(new PIXI.Container());
		const dataArray = canvas.scene.getFlag("card-slayer", "cards") ?? [];
		for (let data of dataArray) {
			const object = new CardPlaceable(data);
			await object.draw();
			this.objects.addChild(object);
		}
		return this;
	}
}