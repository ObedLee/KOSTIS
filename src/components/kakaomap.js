import {useEffect, useState } from "react";
import geomap from "../assets/geomap.json";
import geocity from "../assets/geocity.json";
import geocenter from "../assets/geocenter.json";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import property from "../config/property";
import '../style/kakaomap.css'
import Showswitch from "./showswitch";
import { debounce } from "@mui/material";
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

const { kakao } = window;

const Map = styled(Paper)(({theme}) => ({
    width: "400px", 
    height: "680px",
    borderRadius: property.borderRadius,
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
        width: "95vw",
    }
  }));



export default function Kakaomap({data, year}) {

    const [resize, setResize] = useState(false)
    const [reload, setReload] = useState(false);
    const [on, setOn] = useState(true)
    const [zoom, setZoom] = useState(false)
    const [cent, setCent] = useState([35.880147491722404, 127.7250280907668])
    const [level, setLevel] = useState(13)
    const [sido, setSido] = useState()
    const [pop, setPop] = useState([])
    const [lable, setLable] = useState([])
    const [total, setTotal] = useState()
    const [dataset, setDataset] = useState()

    const handleResize = debounce(() => {
        setResize(!resize)
    }, 1000)

    const url = 'https://kostis-server.run.goorm.site/'
  
    let district = useQuery(['district'], ()=>
      axios.get(url+'maps').then((result)=>{
      const temp = {}
      result.data.map((d, i)=>{
          temp[d.id] = d.name

          return i
      })
      return temp
    }))

    useEffect(
        () => {
          // setTimeout을 통해 delay 이후에 debouncedValue를 얻습니다.
          const timer = setTimeout(() => {
            setReload(!reload);
          }, 250);
    
          return () => {
            clearTimeout(timer); // 이 전의 timer를 clear합니다.
          };
        }, [year, data, on]);

      
    useEffect(()=>{

    let temp = []
    let temp2 = []
    let temp3 = {}

    for (const key in district.data){
        data && data.map((dt) => {
          if (dt.C1_NM === district.data[key] && dt.PRD_DE == year )
          {
            temp = [...temp, dt.C1_NM]
            temp2 = [...temp2, dt.DT]
            temp3[dt.C1_NM] = dt.DT
          }

          if (!total&&dt.C1_NM === "전국") setTotal(dt.DT)

          return dt
        })
      }

      setLable(temp)
      setPop(temp2)
      setDataset(temp3)

},[reload])



    useEffect(() => {
        let geoPoly
        zoom ? geoPoly = JSON.parse(JSON.stringify(geocity)) : geoPoly = JSON.parse(JSON.stringify(geomap))
        // const geoPoly = JSON.parse(JSON.stringify(geomap));
        // const geoPoly= JSON.parse(JSON.stringify(geocity));
        const geocentPos = JSON.parse(JSON.stringify(geocenter));

        // 객체 생성
        var areas = [];

        function setgeomapPoly(){
            for(let i=0; i<geoPoly.features.length;i++){
                // lat, lng 뽑아내기
                const areaInfo = {name:"",path:[]};
                const area = []

                areaInfo.name = geoPoly.features[i].properties.CTP_KOR_NM

                for(let j=0; j<geoPoly.features[i].geometry.coordinates.length; j++)
                {
                    
                    const sectionGeomap = [];

                    for(let k=0; k<geoPoly.features[i].geometry.coordinates[j].length; k++){
                        sectionGeomap.push(new kakao.maps.LatLng(geoPoly.features[i].geometry.coordinates[j][k][1], geoPoly.features[i].geometry.coordinates[j][k][0]));
                    }
                    area.push(sectionGeomap)
                }
                areaInfo.path = [...area];
                areas.push(areaInfo);
            } 
        }

        function setgeocityPoly(){
            for(let i=0; i<geoPoly.features.length;i++){
                if (geoPoly.features[i].properties.sidonm !== sido) continue

                // lat, lng 뽑아내기
                const areaInfo = {name:"",path:[]};
                const area = []

                areaInfo.name = geoPoly.features[i].properties.temp

                for(let j=0; j<geoPoly.features[i].geometry.coordinates.length; j++)
                {
                    const sectionGeocity = [];
                    for(let k=0; k<geoPoly.features[i].geometry.coordinates[j].length; k++){
                        for(let l=0; l<geoPoly.features[i].geometry.coordinates[j][k].length; l++){
                            sectionGeocity.push(new kakao.maps.LatLng(geoPoly.features[i].geometry.coordinates[j][k][l][1], geoPoly.features[i].geometry.coordinates[j][k][l][0]));
                        }
                    }

                    area.push(sectionGeocity)
                }
                areaInfo.path = [...area];
                areas.push(areaInfo);
            } 
        }


    //   var mean = dataset&&(total/pop.length);   /* 평균값 구하기 */
      var mean = dataset&&((total - dataset['경기도'])/(pop.length-1));   /* 평균값 구하기 */
      var devTotal = 0;   /* 편차값의 합계 구하기 */
      for (var i=0; i < pop.length; i++){
          var dev = pop[i] - mean;
          devTotal += dev * dev;
      }
      var stdDev = Math.sqrt(devTotal/(pop.length));   /* 모표준편차값 구하기 */

      var min = mean - stdDev
      var max = mean + stdDev

    //   for (var i=0; i < pop.length; i++){
    //     if (pop[i] > max)   color[lable[i]] = "#F00"
    //     else if (pop[i] < min)  color[lable[i]] = "#00F"
    //     else{
    //         if(mean < pop[i]) color[lable[i]] = `rgb(255, ${255-Math.abs(12*((mean-pop[i])*20/(stdDev)))},${255-Math.abs(12*((mean-pop[i])*20/(stdDev)))})`
    //         else color[lable[i]] = `rgb(${255-Math.abs(12*((mean-pop[i])*20/(stdDev)))},${255-Math.abs(12*((mean-pop[i])*20/(stdDev)))},255)`
    //     }
    // }
    let color = {}
    for (var j=0; j < pop.length; j++){
        if (pop[j] > max)   color[lable[j]] = "#F00"
        else if (pop[j] < min)  color[lable[j]] = "#FFF"
        else color[lable[j]] = `rgb(255, ${255-Math.abs(51*((pop[j]-min)*5/(2*stdDev)))},${255-Math.abs(51*((pop[j]-min)*5/(2*stdDev)))})`
    }
    //   }
    // for (var i=0; i < pop.length; i++){
    //     if (pop[i] > max)   color[lable[i]] = "#60F"
    //     else if (pop[i] < min)  color[lable[i]] = "#FFF"
    //     else color[lable[i]] = `rgb(${255-Math.abs(25*((pop[i]-min)*5/(2*stdDev)))},${255-Math.abs(51*((pop[i]-min)*5/(2*stdDev)))},255)`

    //     console.log(color)

    //   }

        window.addEventListener('resize', handleResize)


        zoom?setgeocityPoly():setgeomapPoly()
        // 객체 생성 완료

        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(cent[0], cent[1]),
            level: level,
            disableDoubleClickZoom: true,
            draggable: false,
            zoomable: false
        };
        let map = new kakao.maps.Map(container, options);
        let customOverlay = new kakao.maps.CustomOverlay({});

        // 각 광역시도별 폴리곤 저장
        let polygons = [] 

        // 지도에 영역데이터를 폴리곤으로 표시합니다
        for (var k = 0, len = areas.length; k < len; k++) {
            displayArea(areas[k]);
        }
        
        function displayArea (area) {
            var polygon = new kakao.maps.Polygon({
                map:map,
                path:area.path,
                strokeWeight: 2,
                strokeColor: property.txtColor,
                strokeOpacity: 0.8,
                fillColor: on?(color&&color[area.name]?color[area.name]:"#FFF"):"#FFF",
                fillOpacity: on?0.8:0.5
            });

            polygons.push(polygon)
            // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
            // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
            kakao.maps.event.addListener(polygon, 'mouseover', function(mouseEvent) {
                polygon.setOptions({strokeColor: property.subColor, strokeWeight: 3, zIndex: 2});

                customOverlay.setContent(`<div class="area">${area.name}<div>인구: ${dataset&&dataset[area.name]&&dataset[area.name].replace(/\B(?=(\d{3})+(?!\d))/g, ',')}명</div></div>`);
                // customOverlay.setContent(`<div class="area">${area.name}</div>`);
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
                polygon.setOptions({strokeColor: property.txtColor, strokeWeight: 2, zIndex: 1});
                customOverlay.setMap(null);
            }); 

            // 다각형에 click 이벤트를 등록
            kakao.maps.event.addListener(polygon, 'click', function() {
                //클릭이벤트
                if (zoom) return;
                
                customOverlay.setMap(null);
                for(let i=0; i<polygons.length; i++) polygons[i].setMap(null)
                for(let i=0; i<geocentPos.length; i++) {
                    if(geocentPos[i].sidonm === area.name) {
                        setCent(geocentPos[i].coordinates)
                        setSido(area.name)
                    }
                }
                setLevel(12)
                setZoom(!zoom)
            });
            // 다각형에 dblclick 이벤트를 등록
            kakao.maps.event.addListener(map, 'dblclick', function() {
                //클릭이벤트
                if (!zoom) {
                    setCent([35.880147491722404, 127.7250280907668])
                    setLevel(13)
                    return;
                }

                customOverlay.setMap(null);
                for(let i=0; i<polygons.length; i++) polygons[i].setMap(null)
                setCent([35.880147491722404, 127.7250280907668])
                setLevel(13)
                setSido()
                setZoom(!zoom)
            });
        }

        return () => {
            window.removeEventListener('resize', handleResize)
            kakao.maps.event.removeListener(map, 'click');
            kakao.maps.event.removeListener(map, 'dblclick');
            kakao.maps.event.removeListener(map, 'mouseover');
            kakao.maps.event.removeListener(map, 'mouseout');
            kakao.maps.event.removeListener(map, 'mousemove');
        }

    },[dataset, zoom, resize]);
    
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
  
    return(
        <Map elevation={4} id="map"><Showswitch on={on} setOn={setOn}/>
        {mobile&&<Box sx={{ position: 'absolute', top: 16, left: 16,  }}>
        <Fab color='primary' sx={{background:property.mainColor, color:property.white}} onClick={() => {
            window.scrollTo({
                    top: 760,
                    behavior: 'smooth',
                });
            }} aria-label="scroll" size="small">
            <KeyboardArrowDownRoundedIcon />
        </Fab>
      </Box>}
      </Map>
    )

};