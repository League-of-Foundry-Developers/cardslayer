/**
 * ES6 module imports
 */

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


Hooks.on("ready", () => {

	if (!(canvas.scene.getFlag("card-slayer", "cards"))) {
		canvas.scene.setFlag("card-slayer", "cards", {})
	}

})


}