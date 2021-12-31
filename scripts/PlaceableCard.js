
/**
 * An extension of the Card class to be a viable canvas object.
 *
 * @export
 * @class PlaceableCard
 * @extends {CanvasDocumentMixin(CONFIG.Card.documentClass)}
 */
export default class PlaceableCard extends CanvasDocumentMixin(CONFIG.Card.documentClass) {
	/** @type {typeof CardsLayer} The card placeables layer */
	get layer() {
		return canvas.cardslayer;
	}
}