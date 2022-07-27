



    // slidetab
    var x = document.getElementById("container");
    var y = document.getElementById("btn1");
    var z = document.getElementById("cesiumContainer");
    function slidetab() {
        if (x.style.width == "20%") {
            x.style.width = "0%";
            y.style.right = "0%";
            z.style.width = "100%";
        } else {
            x.style.width = "20%";
            y.style.right = "20%";
            z.style.width = "80%";
        }
    }
    function slidetaboff() {
        x.style.width = "0%";
        y.style.right = "0%";
        z.style.width = "100%";
    }
    // End slidetab

    // Loading page
    const wait = (delay = 0) =>
    new Promise(resolve => setTimeout(resolve, delay));

    const setVisible = (elementOrSelector, visible) => 
    (typeof elementOrSelector === 'string'
        ? document.querySelector(elementOrSelector)
        : elementOrSelector
    ).style.display = visible ? 'block' : 'none';

    setVisible('.page', false);
    setVisible('#loading', true);

    document.addEventListener('DOMContentLoaded', () =>
    wait(1000).then(() => {
        setVisible('.page', true);
        setVisible('#loading', false);
    }));
    // End loading page

    // Get your token from https://cesium.com/ion/tokens
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NjkwYmEzMy02YWRkLTQ5ZTUtOTg2Yi01MjM4NDQzZmRiYTIiLCJpZCI6OTM4NzEsImlhdCI6MTY1MjY2NTMxMH0.dLsvcMM_ipOxe0tipItrZJ-af-3viHccJO59n7VHd9M';
    // Keep your Cesium.Ion.defaultAccessToken = 'your_token_here' line above. 
    
    // STEP 2 CODE
    // Initialize the viewer with Cesium World Terrain.
    
    const viewer = new Cesium.Viewer('cesiumContainer', {   
        // terrainProvider: Cesium.createWorldTerrain(), 
        imageryProvider : Cesium.createWorldImagery({
            style : Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
        }),
        // animation: false
        // baseLayerPicker : false
    });

    
    // Add Cesium OSM Buildings.
    // const buildingsTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
    // Fly the camera to Denver, Colorado at the given longitude, latitude, and height.
    // viewer.camera.flyTo({
    //     destination: Cesium.Cartesian3.fromDegrees(-100.0, 25.0, 1000000)
    // });
    //<button class="menu_item" id="place" onclick="view_fly_to(id${blogposts[i].id})">${blogposts[i].name}</button>

    //Load model lên map
    const cont = document.getElementById('container');
    
    const place = document.createElement('div');
    place.innerHTML = `<button class="menu_item" id="place" onclick="view_fly_to(id)">tttttttt</button>`;
    cont.appendChild(place);

    for (i = 0; i < blogposts.length; i++) {
        const id = 'id' + blogposts[i]._id;
        id[i] = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(blogposts[i].axis),
            model: {
                uri: blogposts[i].file,
            },
        });
        id[i].name = blogposts[i].name;
        id[i].description = "<iframe width='100%' height='480px' src='model.php?model=" + blogposts[i].file + "'></iframe>" + blogposts[i].content;      
        
        console.log(id[i]);

    }
    //End load model lên map

    // View Fly to ID
    function view_fly_to(id) {
        viewer.flyTo(id);
    }
    // Cho phép chèn script vào mô tả
    viewer.infoBox.frame.removeAttribute("sandbox");
    viewer.infoBox.frame.src = "about:blank";


    // viewer.trackedEntity = entity;
    // STEP 6 CODE
    // Add the 3D Tileset you created from your Cesium ion account.
    const newBuildingTileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: Cesium.IonResource.fromAssetId(1027903)  //Get by ID
            // url: 'C:\xampp\htdocs\cesium\DenHung\3DM_CVVHLS_2405\demnhung_v2_simplified_3d_mesh.obj'  //Get local
        })
    );    

