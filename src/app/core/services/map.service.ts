/* eslint-disable curly */
/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
	providedIn: 'root'
})
export class MapService {
    mapbox: mapboxgl.Map;
    hasMarker: boolean;
    selectedPosition: number[];

    constructor() {
        mapboxgl.accessToken = environment.mapbox;
     }

    initMap(location: number[] = [2.343756, 48.8653533]): void {
        this.mapbox = new mapboxgl.Map({
			container: 'mapbox',
			style: `mapbox://styles/mapbox/streets-v11`,
			zoom: 14,
			center: location,
		});

		this.mapbox.on('load', (event) => {
			this.mapbox.resize();
			window['map'] = this.mapbox;
		});

        this.mapbox.on('click', (e) => {
            if(this.hasMarker) this.removeMarker();
            this.addMarker('Selection', [e.lngLat.lng, e.lngLat.lat]);
        });
    }

    destroyMap() {
        this.mapbox.remove();
    }

    addMarker(title: string, coordinates: number[], markerColor = 'red'): void {
        this.hasMarker = true;
        this.selectedPosition = coordinates;
        this.mapbox.loadImage(
            `assets/markers/mapbox-marker-icon-20px-${markerColor}.png`,
            (error, image) => {
                if (error) { throw error; }
                this.mapbox.addImage('custom-marker', image);
                this.mapbox.addSource('points', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                // feature for Mapbox DC
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates
                                },
                                properties: {
                                    title
                                }
                            }
                        ]
                    }
                });

                this.mapbox.addLayer({
                    id: 'points',
                    type: 'symbol',
                    source: 'points',
                    layout: {
                        'icon-image': 'custom-marker',
                        // get the title name from the source's "title" property
                        'text-field': ['get', 'title'],
                        'text-font': [
                            'Open Sans Semibold',
                            'Arial Unicode MS Bold'
                        ],
                        'text-offset': [0, 1.25],
                        'text-anchor': 'top'
                    }
                });
            }
        );
    }

    removeMarker(): void {
        this.mapbox.removeImage('custom-marker');
        this.mapbox.removeLayer('points');
        this.mapbox.removeSource('points');
        this.hasMarker = false;
    }

    getSelectedPosition(): number[] {
        return this.selectedPosition;
    }
}
