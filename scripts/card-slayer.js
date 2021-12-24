/**
 * ES6 module imports
 */

import CardSlayer from "./CardSlayer.js";

/**
 * Hook on initialization to establish the cardslayer as a
 * viable canvas layer to store the display data for placed cards
 */

Hooks.on("init", () => {
	CONFIG.Canvas.layers["cardslayer"] = {
		layerClass: CardSlayer,
		group: "interface"
	};
});

/**
 * Hook on ready to check if the scene has an established
 * set of cardslayer flags, if it doesn't, create an empty
 * object for one.
 */


Hooks.on("ready", () => {

	if (!(canvas.scene.getFlag("card-slayer", "cards"))) {
		canvas.scene.setFlag("card-slayer", "cards", {})
	}

})

