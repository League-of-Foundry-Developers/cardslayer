import CardSlayer from "./CardSlayer.js";

Hooks.on("init", () => {
	CONFIG.Canvas.layers["cardslayer"] = {
		layerClass: CardSlayer,
		group: "interface"
	};
});

Hooks.on("ready", () => {

	if (!(canvas.scene.getFlag("card-slayer", "cards"))) {
		canvas.scene.setFlag("card-slayer", "cards", [])
	}
})

