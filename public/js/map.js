var mapMarkers = [];

$(function() {
    mapObj = new jvm.Map({
        container: $('#world-map'),
        map: 'world_mill',
        backgroundColor: '#66b3ff',
        markersSelectable: true,
        markerStyle: {
            initial: {
                fill: '#F8E23B',
                stroke: '#383f47'
            }
        },
        regionStyle: {
            initial: {
                fill: '#99ff99',
                "fill-opacity": 1,
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 1
            }
        },
        onMarkerClick: function(event, index) {

            var userHref = mapMarkers[index].userId;
            var userName = mapMarkers[index].name;

            $.ajax({
                url: '/deleteSignal',
                method: 'DELETE',
                dataType: 'json',
                data: { userHref: userHref },
                success: function() {
                    getMarkers();
                    alert('Cleared signal for ' + userName);
                }
            });
        }
    });

    //function to get active signals and mark map
    getMarkers();

    //call refresh every 3 seconds to get new signal markers on map
    window.setInterval(getMarkers, 3000);
});

function getMarkers() {

    mapObj.removeAllMarkers();
    mapMarkers.length = 0;

    $.get("/getMarkers", function(data) {
        for (var i = 0; i < data.length; i++) {
            mapMarkers.push({
                name: data[i].userName + ' @ ' + data[i].userLocation,
                latLng: [data[i].userLat, data[i].userLong],
                userId: data[i].userId
            });
        }
        mapObj.addMarkers(mapMarkers, []);
    });
}


///////////////////////////////
// DISABLED PLANETARYJS CODE //
///////////////////////////////

// (function() {
//     var globe = planetaryjs.planet();
//     // Load our custom `autorotate` plugin; see below.
//     globe.loadPlugin(autorotate(10));
//     // The `earth` plugin draws the oceans and the land; it's actually
//     // a combination of several separate built-in plugins.
//     //
//     // Note that we're loading a special TopoJSON file
//     // (world-110m-withlakes.json) so we can render lakes.
//     globe.loadPlugin(planetaryjs.plugins.earth({
//         topojson: { file: './world.json' },
//         oceans: { fill: '#000080' },
//         land: { fill: '#339966' },
//         borders: { stroke: '#008000' }
//     }));
//     // Load our custom `lakes` plugin to draw lakes; see below.
//     globe.loadPlugin(lakes({
//         fill: '#000080'
//     }));
//     // The `pings` plugin draws animated pings on the globe.
//     globe.loadPlugin(planetaryjs.plugins.pings());
//     // The `zoom` and `drag` plugins enable
//     // manipulating the globe with the mouse.
//     globe.loadPlugin(planetaryjs.plugins.zoom({
//         scaleExtent: [100, 300]
//     }));
//     globe.loadPlugin(planetaryjs.plugins.drag({
//         // Dragging the globe should pause the
//         // automatic rotation until we release the mouse.
//         onDragStart: function() {
//             this.plugins.autorotate.pause();
//         },
//         onDragEnd: function() {
//             this.plugins.autorotate.resume();
//         }
//     }));
//     // Set up the globe's initial scale, offset, and rotation. //TODO: Modify offset based on resolution
//     globe.projection.scale(175).translate([200, 200]).rotate([0, -10, 0]);

//     // Every few hundred milliseconds, we'll draw another random ping.
//     var colors = ['red', 'yellow', 'white', 'orange', 'green', 'cyan', 'pink'];
//     setInterval(function() {
//         var lat = Math.random() * 170 - 85;
//         var lng = Math.random() * 360 - 180;
//         var color = colors[Math.floor(Math.random() * colors.length)];
//         globe.plugins.pings.add(lng, lat, { color: color, ttl: 2000, angle: Math.random() * 10 });
//     }, 150);

//     var canvas = document.getElementById('rotatingGlobe');
//     // Special code to handle high-density displays (e.g. retina, some phones)
//     // In the future, Planetary.js will handle this by itself (or via a plugin).
//     if (window.devicePixelRatio == 2) {
//         canvas.width = 800;
//         canvas.height = 800;
//         context = canvas.getContext('2d');
//         context.scale(2, 2);
//     }
//     // Draw that globe!
//     globe.draw(canvas);

//     // This plugin will automatically rotate the globe around its vertical
//     // axis a configured number of degrees every second.
//     function autorotate(degPerSec) {
//         // Planetary.js plugins are functions that take a `planet` instance
//         // as an argument...
//         return function(planet) {
//             var lastTick = null;
//             var paused = false;
//             planet.plugins.autorotate = {
//                 pause: function() { paused = true; },
//                 resume: function() { paused = false; }
//             };
//             // ...and configure hooks into certain pieces of its lifecycle.
//             planet.onDraw(function() {
//                 if (paused || !lastTick) {
//                     lastTick = new Date();
//                 } else {
//                     var now = new Date();
//                     var delta = now - lastTick;
//                     // This plugin uses the built-in projection (provided by D3)
//                     // to rotate the globe each time we draw it.
//                     var rotation = planet.projection.rotate();
//                     rotation[0] += degPerSec * delta / 1000;
//                     if (rotation[0] >= 180) rotation[0] -= 360;
//                     planet.projection.rotate(rotation);
//                     lastTick = now;
//                 }
//             });
//         };
//     };

//     // This plugin takes lake data from the special
//     // TopoJSON we're loading and draws them on the map.
//     function lakes(options) {
//         options = options || {};
//         var lakes = null;

//         return function(planet) {
//             planet.onInit(function() {
//                 // We can access the data loaded from the TopoJSON plugin
//                 // on its namespace on `planet.plugins`. We're loading a custom
//                 // TopoJSON file with an object called "ne_110m_lakes".
//                 var world = planet.plugins.topojson.world;
//                 lakes = topojson.feature(world, world.objects.ne_110m_lakes);
//             });

//             planet.onDraw(function() {
//                 planet.withSavedContext(function(context) {
//                     context.beginPath();
//                     planet.path.context(context)(lakes);
//                     context.fillStyle = options.fill || 'black';
//                     context.fill();
//                 });
//             });
//         };
//     };
// })();
