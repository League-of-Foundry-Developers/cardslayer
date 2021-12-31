export default class CardPlaceable extends PlaceableObject {
	constructor(document, scene) {
		super(document);

		this.scene = scene;
	}

	get layer() {
		return canvas.cardslayer;
	}


	/***********************
	 * Copied from Tile
	 **********************/

	async draw() {
		this.clear();

		// Create the image texture
		this.tile = undefined;
		if (this.data.img) {
			this.texture = await loadTexture(this.data.img, { fallback: 'icons/svg/hazard.svg' });
			if (this.texture?.valid) {
				// Create and anchor the Sprite to the parent container
				this.tile = this.addChild(new PIXI.Sprite(this.texture));
				this.tile.anchor.set(0.5, 0.5);
			}
			this.bg = undefined;
		}

		// If there was no valid texture, display a background
		if (!this.tile) {
			this.texture = null;
			this.tile = undefined;
			this.bg = this.addChild(new PIXI.Graphics());
		}

		// Create the outer frame for the border and interaction handles
		this.frame = this.addChild(new PIXI.Container());
		this.frame.border = this.frame.addChild(new PIXI.Graphics());
		this.frame.handle = this.frame.addChild(new ResizeHandle([1, 1]));

		// Refresh the current display
		this.refresh({ refreshPerception: true });
		this.zIndex = this.data.z;

		// The following options do not apply to preview tiles
		if (this.id && this.parent) {
			// Enable interactivity
			this.activateListeners();
		}

		return this;
	}

	refresh({ refreshPerception = false } = {}) {
		const aw = Math.abs(this.data.width);
		const ah = Math.abs(this.data.height);
		const r = Math.toRadians(this.data.rotation);

		// Update tile appearance
		this.position.set(this.data.x, this.data.y);
		if (this.tile) {

			// Tile position
			this.tile.scale.x = this.data.width / this.texture.width;
			this.tile.scale.y = this.data.height / this.texture.height;
			this.tile.position.set(aw / 2, ah / 2);
			this.tile.rotation = r;

			// Tile appearance
			this.tile.alpha = this.data.hidden ? 0.5 : 1;
			this.tile.tint = 0xFFFFFF;
		}

		// Temporary tile background
		if (this.bg) this.bg.clear().beginFill(0xFFFFFF, 0.5).drawRect(0, 0, aw, ah).endFill();

		// Define bounds and update the border frame
		let bounds = (aw === ah) ?
			new NormalizedRectangle(0, 0, aw, ah) : // Square tiles
			NormalizedRectangle.fromRotation(0, 0, aw, ah, r); // Non-square tiles
		this.hitArea = this._controlled ? bounds.clone().pad(20) : bounds;
		this._refreshBorder(bounds);
		this._refreshHandle(bounds);

		// Set visibility
		this.visible = !this.data.hidden || game.user.isGM;

		return this;
	}

	_refreshBorder(b) {
		const border = this.frame.border;

		// Determine border color
		const colors = CONFIG.Canvas.dispositionColors;
		let bc = colors.INACTIVE;
		if (this._controlled) {
			bc = colors.CONTROLLED;
		}

		// Draw the tile border
		const t = CONFIG.Canvas.objectBorderThickness;
		const h = Math.round(t / 2);
		const o = Math.round(h / 2);
		border.clear()
			.lineStyle(t, 0x000000, 1.0).drawRoundedRect(b.x - o, b.y - o, b.width + h, b.height + h, 3)
			.lineStyle(h, bc, 1.0).drawRoundedRect(b.x - o, b.y - o, b.width + h, b.height + h, 3);
		border.visible = this._hover || this._controlled;
	}

	_refreshHandle(b) {
		this.frame.handle.refresh(b);
		this.frame.handle.visible = this._controlled;
	}

	/***********************
	 * /Copied from Tile
	 **********************/
}