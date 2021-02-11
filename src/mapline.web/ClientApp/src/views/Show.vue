<!--
  Maybe one day I put these into separate file, but for now on the styles are here...
  https://vuejs.org/v2/style-guide/#Component-style-scoping-essential

  Component style coding / using the `scoped` attribute
-->
<style scoped>
    .map-container {
        height: 100%;
        width: 100%;
    }

    .l-map {
        width: 80%;
        height: 100%;
        display: inline-block;
    }

    .filter-bar-component {
        display: inline-block;
        width: 20%;
        height: 100%;
    }
</style>


<template>
    <div class="map-container">
        <filter-bar class="filter-bar-component" />

        <p v-if="loading">Loading...</p>
        <l-map class="l-map"
               :zoom="zoom"
               :center="center"
               :options="mapOptions">
            <l-tile-layer :url="url"
                          :attribution="attribution" />

            <l-geo-json :geojson="languagesGeoJson"
                        :options="options"
                        :options-style="styleFunction" />
        </l-map>
    </div>
</template>

<script lang="ts">
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
    import { Language } from '../models/Language';
    import FilterBar from '@/components/FilterBar.vue'

    export default {
        name: "VMap",
        components: {
            LMap,
            LTileLayer,
            LGeoJson,
            FilterBar
        },
        data() {
            return {
                loading: true,
                show: true,
                languagesGeoJson: null,
                errorMessage: 'An unexpected error occured while loading the information to the map.',
                languages: [] as Language[],
                zoom: 3,
                center: latLng(60.166458996639314, 24.952770253219168),
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                mapOptions: {},
                fillColor: "#e4ce7f", // blue
                marker: latLng(47.41322, -1.219482)
            };
        },
        computed: {
            options() {
                return { onEachFeature: this.onEachFeatureFucntion };
            },

            styleFunction() {
                const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
                return () => {
                    return {
                        weight: 2,
                        color: "#ECEFF1", // Orange
                        opacity: 1,
                        fillColor: fillColor,
                        fillOpacity: 1
                    };
                };
            },

            onEachFeatureFunction() {
                if (!this.enableTooltip) {
                    // return () => { };
                    return;
                }

                return (feature, layer) => {
                    layer.bindTooltip(`<div>code:${feature.properties.code}</div>`
                        + `<div>nom: ${feature.properties.nom}</div>`,
                        { permanent: false, sticky: true }
                    );
                };
            },


        },

        async created() {
            try {
                this.loading = true;
                const response = await this.$axios.get<Language[]>('api/Map')

                const data = await response.data;

                console.log("async create. data received:");
                console.log(data);

                this.languagesGeoJson = data[0].area;
                this.loading = false;
            } catch (e) {
                alert("An unexpected error occured in API handling...");
                console.log("An unexpected error occured in API handling. The error:");
                console.log(e);
            }
        },
    };
</script>