import React, { useState, useEffect } from 'react';
// import {Select} from 'antd';
import './SignUpForm.css';

function CitySelector({prov, city, setProv, setCity, setUserProcity}) {
    const [pickerValue, setPickerValue] = useState([]);
    const [children0, setChildren0] = useState([]);
    const [children1, setChildren1] = useState([]);
    // const [children2, setChildren2] = useState([]);
    const [place0, setPlace0] = useState(); //place的label是地方的名称
    const [place1, setPlace1] = useState();
    // const [place2, setPlace2] = useState();

    const provChange = () => {
        let tempChildren = [];
        var provSelect = document.getElementById("prov");
        var index=provSelect.selectedIndex;
        setPlace0(pickerValue[index]);
        setProv(pickerValue[index].label);
        for (let i=0;i<pickerValue[index].children.length;i++){
            tempChildren.push(<option key={i}>{pickerValue[index].children[i].label}</option>);
        }
        setChildren1(tempChildren);
    };

    const cityChange = () => {
        var citySelect = document.getElementById("city");
        var index=citySelect.selectedIndex;
        setPlace1(place0.children[index-1]);
        setCity(place0.children[index-1].label);
        setUserProcity(prov+';'+place0.children[index-1].label);
    };

    useEffect(() => {
        let antdDistrict =[];
        let districtData = require('./location');
        let tempChildren = [];
        Object.keys(districtData).forEach((index)=>{
            let itemLevel1 ={};
            let itemLevel2 ={};
            itemLevel1.value = districtData[index].code;
            itemLevel1.label = districtData[index].name;
            itemLevel1.children = [];
            let data = districtData[index].cities;
            Object.keys(data).forEach((index)=>{
                itemLevel2.value = data[index].code;
                itemLevel2.label = data[index].name;
                itemLevel2.children = [];
                let data2 = data[index].districts;
                let itemLevel3 ={};
                itemLevel3.children = [];
                Object.keys(data2).forEach((index)=>{
                    itemLevel3.value = index;
                    itemLevel3.label = data2[index];
                    itemLevel2.children.push(itemLevel3);
                    itemLevel3 ={};
                });
                itemLevel1.children.push(itemLevel2);
                itemLevel2 ={};
            });
            antdDistrict.push(itemLevel1)
        });
        setPickerValue(antdDistrict);
        for (let i=1;i<antdDistrict.length;i++){
            tempChildren.push(<option key={i}>{antdDistrict[i].label}</option>);
        }
        setChildren0(tempChildren);
        // console.log(antdDistrict);
      }, []);

    return (
        <form>
            <select className='suf-select' id="prov" name="prov" onChange={provChange}>
                <option>省份&nbsp;&nbsp;&nbsp;&nbsp;</option>
                {children0}
            </select>
            <select className='suf-select' id="city" name="city" onChange={cityChange}>
                <option>城市&nbsp;&nbsp;&nbsp;&nbsp;</option>
                {children1}
            </select>
        </form>
    )
}

export default CitySelector
