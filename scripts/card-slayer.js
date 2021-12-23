import CardSlayer from "./CardSlayer.js";

Hooks.on("init", () => {
	CONFIG.Canvas.layers["cardslayer"] = {
		layerClass: CardSlayer,
		group: "interface"
	};
});