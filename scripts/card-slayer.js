import CardSlayer from "./CardSlayer.js";
import CardPlaceable from "./CardPlaceable.js";
import PlaceableCard from "./PlaceableCard.js";

/**
 * Hook on initialization to establish the cardslayer as a
 * viable canvas layer to store the display data for placed cards
 */
Hooks.on("init", () => {
	setUpLayer();
	extendClasses();
});


/**
 * Add the cardslayer to the canvas
 */
function setUpLayer() {
	CONFIG.Canvas.layers["cardslayer"] = {
		layerClass: CardSlayer,
		group: "primary"
	};
	CONFIG.Card.objectClass = CardPlaceable;
}

/**
 * Extend the Card, Cards, and CardData classes to allow
 * them to function in the canvas environment.
 */
function extendClasses() {
	// Replace the Card class with an extended version
	CONFIG.Card.documentClass = PlaceableCard;

	// Add property getters to obtain data from flags as if it
	// were a part of the data schema
	Object.defineProperty(foundry.data.CardData.prototype, "x", {
		/** @return {number} The y coordinate of the card, taken from flags */
		get: function () {
			return this.flags["card-slayer"]?.x || 0;
		}
	});

	Object.defineProperty(foundry.data.CardData.prototype, "y", {
		/** @return {number} The y coordinate of the card, taken from flags */
		get: function () {
			return this.flags["card-slayer"]?.y || 0;
		}
	});

	Object.defineProperty(foundry.data.CardData.prototype, "hidden", {
		/** @return {boolean} The hidden status of the card, taken from flags */
		get: function () {
			return this.flags["card-slayer"]?.hidden || false;
		}
	});

	Object.defineProperty(foundry.data.CardData.prototype, "img", {
		/** 
		 * @return {string} The image path to the card image for the visible face, 
		 * taken from the parent document img getter 
		 */
		get: function () {
			return this.document.img || "";
		}
	});


	// Add a property to Cards that checks if the associated scene
	// is visible
	Object.defineProperty(CONFIG.Cards.documentClass.prototype, "isView", {
		/** @return {boolean} Whether or not the associated scene is visible */
		get: function () {
			const id = this.getFlag("card-slayer", "scene");
			return game.scenes.get(id)?.isView || false;
		}
	});
}