<html lang="en">
<head>
<script src="https://cesium.com/downloads/cesiumjs/releases/1.82/Build/Cesium/Cesium.js"></script>

<link href="https://cesium.com/downloads/cesiumjs/releases/1.82/Build/Cesium/Widgets/widgets.css" rel="stylesheet"/>

<link href="style.css" rel="stylesheet">
<style>.cesium-viewer-toolbar {display: none;}</style>
</head>
<body>
    <div id="cesiumContainer" class="fullSize"></div>
    <div id="loadingOverlay">
     <h1>Loading...</h1>
    </div>


<script>
    // Grant CesiumJS access to your ion assets
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NjkwYmEzMy02YWRkLTQ5ZTUtOTg2Yi01MjM4NDQzZmRiYTIiLCJpZCI6OTM4NzEsImlhdCI6MTY1MjY2NTMxMH0.dLsvcMM_ipOxe0tipItrZJ-af-3viHccJO59n7VHd9M";

const viewer = new Cesium.Viewer("cesiumContainer");

const tileset = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(0,0,100),
                model: {
                    uri: "<?=$_GET['model']?>",
                },
                });

(async () => {
  try {
    await tileset.readyPromise;
    await viewer.zoomTo(tileset);

    // Apply the default style if it exists
    var extras = tileset.asset.extras;
    if (
      Cesium.defined(extras) &&
      Cesium.defined(extras.ion) &&
      Cesium.defined(extras.ion.defaultStyle)
    ) {
      tileset.style = new Cesium.Cesium3DTileStyle(extras.ion.defaultStyle);
    }
  } catch (error) {
    console.log(error);
  }
})();

</script>

</body>
</html>