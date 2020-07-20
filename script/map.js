const style = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#282a2f"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
]

// found here: https://developers.google.com/maps/solutions/store-locator/clothing-store-locator
function initMap(circles, lat, lng, zoom, color, type) {
    var sydney = { lat: lat, lng: lng };
    map = new google.maps.Map(document.getElementById('map'), {
        center: sydney,
        zoom: zoom,
        mapTypeId: 'roadmap',
        styles: style,
        disableDefaultUI: true,
        mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU }
    });
    console.log(sydney)

    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    for (var country in circles) {
        // Add the circle for this city to the map.
        let circleSize

        if (type) {
            switch (type) {
                case 'active':
                    circleSize = circles[country].active
                    break;
                case 'deaths':
                    circleSize = circles[country].deaths
                    break;
                case 'recovered':
                    circleSize = circles[country].recovered
                    break;

                default:
                    circleSize = circles[country].total
                    break;
            }
        } else {
            circleSize = circles[country].total
        }

        var countryCircle = new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            map: map,
            center: circles[country].center,
            radius: Math.sqrt(circleSize) * 1000
        });
    }
}

buildCircles = (data, lat, lng, zoom, color, type) => {
    let circleData = []
    let passColor = ''
    let passType = ''

    if (!type) { passType = 'active' } else { passType = type }
    if (!color) { passColor = '#9945d7' } else { passColor = color }

    data.map((entry) => {
        let item = {}

        item['country'] = entry.country
        item['center'] = {
            "lat": entry.countryInfo.lat,
            "lng": entry.countryInfo.long
        }
        item['active'] = entry.active
        item['deaths'] = entry.deaths
        item['recovered'] = entry.recovered
        item['total'] = entry.cases

        circleData.push(item)
    })

    initMap(circleData, lat, lng, zoom, passColor, passType)
}