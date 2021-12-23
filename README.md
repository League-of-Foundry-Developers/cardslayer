![](https://img.shields.io/badge/Foundry-v9-informational)
![CardSlayer](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FLeague-of-Foundry-Developers%2Fleague-repo-status%2Fshields-endpoint%2Fcard-slayer.json)


Before this decade is out, we will put cards on the Foundry VTT canvas. We choose to do this not because it is easy, but because Foundry gave enough stuff to make us think it is easy.

**Basic architecture:**

1) New placeables layer that all user levels can access
2) Create new placeable type based off of PlaceableObject directly and steal stuff from Tile and whatever we need
3) library (In League Org maybe?)
4) overwrite canvas drop handling to better work with handling embedded document drops
5) no #@!$ing typscript
6) TABS not spaces


<!--- Downloads @ Latest Badge -->
<!--- replace <user>/<repo> with your username/repository -->
<!--- ![Latest Release Download Count](https://img.shields.io/github/downloads/<user>/<repo>/latest/module.zip) -->

<!--- Forge Bazaar Install % Badge -->
<!--- replace <your-module-name> with the `name` in your manifest -->
<!--- ![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2F<your-module-name>&colorB=4aa94a) -->