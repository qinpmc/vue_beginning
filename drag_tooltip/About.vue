<template>
    <div>
        <div id="map"
             style="top: 78.67px; left:0; bottom: 0; right:0; position: absolute; width: 100%; background-color: #3cace7;">
        </div>
        <div style="position:absolute;top:100px;left:10px;">
            <input type="button" id="featureQuery" @click="featureQuery()" value="空间要素查询"/>
        </div>
        <div style="position:absolute;top:100px;left:60px;">
            <input type="button" @click="executeCommand('drawPoint')" value="绘制点"/>
        </div>
        <div style="position:absolute;top:100px;left:90px;">
            <input type="button" @click="executeCommand('identifyFeatureTool')" value="拾取"/>
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import HelloWorld from "@/components/HelloWorld.vue";
    import Detail from './Detail.vue';
    import * as g2 from 'g2';

    @Component({
        components: {
            HelloWorld
        }
    })
    export default class About extends Vue {
        private container = window["container2D"];
        private configuration = this.container.resolve("configuration");

        private mounted() {
            const container: any = window["container2D"];
            const configuration = container.resolve("configuration");
            configuration.setType("traffic");
            const mapBuilder = configuration.getMapBuilder();
            mapBuilder.createBussinessCommand = this.createToolTipCommand;
            mapBuilder.build('map').then(function () {
                window['map'] = mapBuilder.getMap();
            });
        }


        private createToolTipCommand() {
            const symbolTable = this.container.resolve('symbolTable');
            const commandManager = this.container.resolve('commandManager');
            const identifyElementTool = new g2.basic.IdentifyElementTool({
                id: 'identifyFeatureTool'
            })
            const kvs: any = [];
            kvs.push({
                key: "经度",
                value: 114
            })
            kvs.push({
                key: "纬度",
                value: 30
            })
            identifyElementTool.onSelectFeature = function (layer: any, feature: any) {
                var toolTip = new g2.widget.Tooltip({
                    title: "详情",
                    content: `<div id="detail"></div>`,
                    anchor: feature.getGeometry().getFlatInteriorPoint()[0],
                    layerId: layer.getLayerId(),
                });
                this.tooltipWare.add(toolTip, true);
                const popupOptions: any = {
                    el: '#detail',
                    data() {
                        return {
                            feature
                        };
                    },
                    store: this.$store,
                };
                var a = new Detail(popupOptions);
            }
            commandManager.add(identifyElementTool);
        }

        private beforeDestroy() {
            const container: any = window["container2D"];
            const map: any = container.resolve("map");
            if (!!map) {
                try{
                    map.destroy();
                }
                catch (e){
                    console.error(e);
                }
            }
        }

        public featureQuery() {
            debugger;
            const map = this.container.resolve("map");
            const featureService = this.container.resolve("WFSService");
            const featureLayer = map.findLayer("provinceFeatureLayer1");
            const renderServiceName = this.configuration.getLayerRenderServiceName("provinceFeatureLayer1");
//创建空间要素查询过滤器
            const filter = new g2.ows.GQueryFilter({
                subFields: 'objectid, districtco, name, shape',
                spatialRelType: g2.ows.SpatialRel.Contains,
                where: "objectid < 100"
            });
            const wfsSource = new g2.carto.WFS({
                name:renderServiceName,
                url:this.configuration.getOwsServiceUrl()+'/wfs',
                filter:filter
            });
            featureLayer.setSource(wfsSource);
            /*featureService.find(renderServiceName,filter).then(function (result:any) {
                featureLayer.addFeatureCollection(result);
                map.pan(featureLayer.getExtent());
            })*/

        }

        private executeCommand(id:string){
            const commandNotify = this.container.resolve('commandNotify');
            //commandNotify.activeCommand('drawPoint');
            commandNotify.activeCommand(id);
        }

        private PointDraw(){
            const commandNotify = this.container.resolve('commandNotify');
            //commandNotify.activeCommand('drawPoint');
            commandNotify.activeCommand('identifyFeatureTool');
        }
    }
</script>
