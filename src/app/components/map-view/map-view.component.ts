import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { GeoJSON } from 'geojson';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-map-view', 
  imports: [LeafletModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnChanges {
  
  @Input() geoJsonData: any;

 
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    ],
    zoom: 5,
    center: L.latLng(41.9028, 12.4964) // Centrato sull'Italia
  };

  private map?: L.Map;
  private geoJsonLayer?: L.GeoJSON;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['geoJsonData'] && this.geoJsonData) {
      console.log(' Dati GeoJSON ricevuti:', this.geoJsonData);
      
      try {
        const geoJson = JSON.parse(this.geoJsonData);
        console.log(' GeoJSON parsato:', geoJson);
        console.log('Numero di features:', geoJson.features?.length || 0);
        
        this.createGeoJsonLayer(geoJson);
      } catch (error) {
        console.error(' Errore nel parsing GeoJSON:', error);
      }
    }
  }

  private createGeoJsonLayer(geoJson: GeoJSON) {
    console.log(' Creazione layer GeoJSON...');
    
    // Rimuovi il layer precedente se esiste
    if (this.geoJsonLayer && this.map) {
      this.map.removeLayer(this.geoJsonLayer);
    }

    // Crea il nuovo layer
    this.geoJsonLayer = L.geoJSON(geoJson as any, {
      pointToLayer: (feature: any, latlng: L.LatLngExpression) => {
        console.log('Creazione marker per:', {
          text: feature.properties?.text,
          coordinates: latlng,
          feature: feature
        });
        
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: '#ff7800',
          color: '#000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      onEachFeature: (feature: any, layer: L.Layer) => {
        if (feature.properties && feature.properties.text) {
          layer.bindPopup(`
            <strong>${feature.properties.text}</strong><br>
            <small>${new Date(feature.properties.creationTime).toLocaleString()}</small>
          `);
        }
      }
    });

    // Aggiungi il layer alla mappa se esiste
    if (this.map && this.geoJsonLayer) {
      console.log(' Aggiunta layer alla mappa');
      this.geoJsonLayer.addTo(this.map);
      
      // Centra la mappa sui marker solo se ci sono features
      const bounds = this.geoJsonLayer.getBounds();
      if (bounds.isValid()) {
        console.log('Centratura mappa sui marker');
        this.map.fitBounds(bounds, { padding: [20, 20] });
      } else {
        console.log('Nessun marker valido trovato per centrare la mappa');
      }
    }
  }

  onMapReady(map: L.Map) {
    console.log(' Mappa inizializzata');
    this.map = map;
    
    // Se abbiamo già dati GeoJSON, aggiungili alla mappa
    if (this.geoJsonLayer) {
      console.log(' Aggiunta layer esistente alla mappa');
      this.geoJsonLayer.addTo(map);
      
      const bounds = this.geoJsonLayer.getBounds();
      if (bounds.isValid()) {
        this.map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }
}