import CardPlaceable from "./CardPlaceable.js";

export default class CardSlayer extends PlaceablesLayer {
	constructor() {
		super();

		this._cardPile = null;
	}
	
	static get layerOptions() {
		return foundry.utils.mergeObject(super.layerOptions, {
			name: "cardslayer",
			canDragCreate: true,
			controllableObjects: true,
			rotatableObjects: true,
			snapToGrid: true,
			objectClass: CONFIG[this.documentName]?.objectClass,
			quadtree: false,
			zIndex: 90
		});
	}

	static documentName = "Card";


	/**
	 * The Cards pile object containing the cards for this scene
	 *
	 * @type {Cards}
	 * @readonly
	 * @memberof CardSlayer
	 */
	get cardPile() {
		if (!this._cardPile) {
			this._cardPile = game.cards.find(c => c.getFlag("card-slayer", "scene") == canvas.scene.id);
		}
		return this._cardPile;
	}

	get documentCollection() {
		// Return the card collection from the card pile
		return this.cardPile.data.cards;
	}

	deactivate() {
		super.deactivate();
		this.objects.visible = true;
		return this;
	}
}