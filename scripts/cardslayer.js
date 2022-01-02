import CardLayer from "./CardLayer.js";
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
		layerClass: CardLayer,
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

/*	Object.defineProperty(Scene, "metadata", {
		get: function() {
			return mergeObject(foundry.abstract.Document.metadata, {
				name: "Scene",
				collection: "scenes",
				label: "DOCUMENT.Scene",
				labelPlural: "DOCUMENT.Scenes",
				isPrimary: true,
				embedded: {
					AmbientLight: foundry.documents.BaseAmbientLight,
					AmbientSound: foundry.documents.BaseAmbientSound,
					Drawing: foundry.documents.BaseDrawing,
					MeasuredTemplate: foundry.documents.BaseMeasuredTemplate,
					Note: foundry.documents.BaseNote,
					Tile: foundry.documents.BaseTile,
					Token: foundry.documents.BaseToken,
					Wall: foundry.documents.BaseWall,
					Card: foundry.documents.BaseCard
				}
			});
		}
	});
*/

	Object.defineProperty(Scene.prototype, "cardContainer", {
		get: function () {
			return game.cards.find(c => c.getFlag("cardslayer", "scene") == this.id);
		}
	});

	Object.defineProperty(Scene.prototype, "cards", {
		get: function () {
			return this.cardContainer?.data.cards;
		}
	});

	const updateEmbeddedDocuments = Scene.prototype.updateEmbeddedDocuments;
	Scene.prototype.updateEmbeddedDocuments = async function(embeddedName, updates = [], context = {}) {
		if (embeddedName !== "Card") return await updateEmbeddedDocuments.call(this, embeddedName, updates, context);
		
		context.parent = this.cardContainer;
		context.pack = this.pack;
		const cls = foundry.documents.BaseCard.implementation;

		updates = updates.map(update => {
			if (update.x) update["flags.cardslayer.x"] = update.x;
			if (update.y) update["flags.cardslayer.y"] = update.y;
			if (update.hidden) update["flags.cardslayer.hidden"] = update.hidden;
			return update;
		});

		return cls.updateDocuments(updates, context);
	}

	// Add property getters to obtain data from flags as if it
	// were a part of the data schema
	Object.defineProperty(foundry.data.CardData.prototype, "x", {
		/** @return {number} The y coordinate of the card, taken from flags */
		get: function () {
			return this.flags["cardslayer"]?.x || 0;
		},
		set: function (value) {;
			this.flags["cardslayer"].x = value;
		}
	});

	Object.defineProperty(foundry.data.CardData.prototype, "y", {
		/** @return {number} The y coordinate of the card, taken from flags */
		get: function () {
			return this.flags["cardslayer"]?.y || 0;
		},
		set: function (value) {
			this.flags["cardslayer"].y = value;
		}
	});

	Object.defineProperty(foundry.data.CardData.prototype, "hidden", {
		/** @return {boolean} The hidden status of the card, taken from flags */
		get: function () {
			return this.flags["cardslayer"]?.hidden || false;
		},
		set: function (value) {
			this.flags["cardslayer"].hidden = value;
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
			const id = this.getFlag("cardslayer", "scene");
			return game.scenes.get(id)?.isView || false;
		}
	});
}