import {useEffect} from "react";
import geomap from "../assets/geomap.json";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import property from "../store/property";
import './style/kakaomap.css'

const { kakao } = window;

const Map = styled(Paper)(({ theme }) => ({
    width: "400px", 
    height: "680px", 
    marginRight:'10px',
    borderRadius: property.borderRadius,
  }));

export default function Kakaomap(props) {
  
    let geomapPolygon = JSON.parse(JSON.stringify(geomap));

    useEffect(() => {
        // 객체 만드는 과정
        var areas = [];

        for(let i=0; i<geomapPolygon.features.length;i++){
            // lat, lng 뽑아내기
            const areaInfo = {name:"",path:[]};
            const temp = []
            for(let j=0; j<geomapPolygon.features[i].geometry.coordinates.length; j++)
            {

                //console.log(geomapPolygon.features[i].geometry.coordinates.length)
                areaInfo.name = geomapPolygon.features[i].properties.CTP_KOR_NM;
                const sectionGeomap = [];

                for(let k=0; k<geomapPolygon.features[i].geometry.coordinates[j].length; k++){
                    sectionGeomap.push(new kakao.maps.LatLng(geomapPolygon.features[i].geometry.coordinates[j][k][1], geomapPolygon.features[i].geometry.coordinates[j][k][0]));
                }
                temp.push(sectionGeomap)
            }
            areaInfo.path = [...temp];
            areas.push(areaInfo);
        }
        // 객체 다 만듦.


        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(35.880147491722404, 127.7250280907668),
            level: 13,
            disableDoubleClickZoom: true
        };
        let map = new kakao.maps.Map(container, options);
        map.setDraggable(false)
        map.setZoomable(false)
        let customOverlay = new kakao.maps.CustomOverlay({});

        // 지도에 영역데이터를 폴리곤으로 표시합니다
        for (var i = 0, len = areas.length; i < len; i++) {
            displayArea(areas[i]);
        }

        function displayArea (area) {
            var polygon = new kakao.maps.Polygon({
                map:map,
                path:area.path,
                strokeWeight: 2,
                strokeColor: property.darkColor,
                strokeOpacity: 0.8,
                fillColor: '#fff',
                fillOpacity: 0.7
            });
            // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
            // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
            kakao.maps.event.addListener(polygon, 'mouseover', function(mouseEvent) {
                polygon.setOptions({fillColor: property.mainColor});

                customOverlay.setContent('<div class="area">' + area.name + '</div>');

                customOverlay.setPosition(mouseEvent.latLng);
                customOverlay.setMap(map);
            });

            // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
            kakao.maps.event.addListener(polygon, 'mousemove', function(mouseEvent) {
                customOverlay.setPosition(mouseEvent.latLng);
            });

            // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
            // 커스텀 오버레이를 지도에서 제거합니다
            kakao.maps.event.addListener(polygon, 'mouseout', function() {
                polygon.setOptions({fillColor: '#fff'});
                customOverlay.setMap(null);
            });

            // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
            kakao.maps.event.addListener(polygon, 'click', function(mouseEvent) {
                //클릭이벤트
            });
        }

    },[]);

    return(
        <Map elevation={2} id="map">
        </Map>
    )
};