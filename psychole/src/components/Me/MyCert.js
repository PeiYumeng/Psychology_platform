import React, { useEffect, useContext, useState } from 'react';
import './Me.css';
import { Input, Image, Tag, Button } from 'antd';
import { SocketContext } from '../../SocketContext';
import MyAvatar from './MyAvatar';

const { TextArea } = Input;


const { CheckableTag } = Tag;
const tagsData = ['亲子教育', '性格情绪', '个人成长', '人际社交', '婚姻情感', '焦躁抑郁', '焦虑失眠'];

function MyCert() {
    const { userData } = useContext(SocketContext);
    const [ isDoctor, setIsDoctor ] = useState(false);
    const [ goCert, setGoCert ] = useState(false);
    const [ goEdit, setGoEdit ] = useState(false);
    const [ selectedTags, setSelectedTags ] = useState([]);

    function ImageDemo(props) {
        return (
          <Image
            width={props.imageWidth}
            src={"http://132.232.126.211:8080/images/"+ props.imageUrl}
          />
        );
      }

    const returnStatus = (cert) => {
        if(cert==1){return ('一级心理咨询师')}
        else if(cert==2){return ('二级心理咨询师')}
        else if(cert==3){return ('三级心理咨询师')}
        else{return ('普通用户')};
    }

    const handleFields = (docWell) =>{
        var field = [];
        for(var i=0;i<docWell.split(';').length;i++){
          switch(docWell.split(';')[i]){
            case '1': field.push('亲子教育');break;
            case '2': field.push('性格情绪');break;
            case '3': field.push('个人成长');break;
            case '4': field.push('人际社交');break;
            case '5': field.push('婚姻情感');break;
            case '6': field.push('焦躁抑郁');break;
            case '7': field.push('焦虑失眠');break;
          }
        }
        return field;
    }

    const handleFields2 = (docWell) =>{
        var field = [];
        for(var i=0;i<docWell.split(';').length;i++){
          switch(docWell.split(';')[i]){
            case '1': field.push({'well':'亲子教育', 'color':'magenta'});break;
            case '2': field.push({'well':'性格情绪', 'color':'purple'});break;
            case '3': field.push({'well':'个人成长', 'color':'orange'});break;
            case '4': field.push({'well':'人际社交', 'color':'gold'});break;
            case '5': field.push({'well':'婚姻情感', 'color':'green'});break;
            case '6': field.push({'well':'焦躁抑郁', 'color':'cyan'});break;
            case '7': field.push({'well':'焦虑失眠', 'color':'blue'});break;
          }
        }
        return field;
      }

    const handleChange = (tag, checked) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags);
      }
      

    useEffect(()=>{
        if(userData.userState==2){
            setIsDoctor(true);
            setSelectedTags(handleFields(userData.docWell));
        }else{
            setIsDoctor(false);
        }
    }, [])


    return (
        <>
        {/* 不是医生 */}
        {!isDoctor && <div style={{textAlign:'center'}}>
            <p className="basic_infor">您好，<span style={{fontWeight:'bold'}}>{userData.userName}</span>。您现在是普通用户</p>
            <p className="basic_infor">已经是持证心理咨询师？<Button type="primary" size='medium' style={{marginLeft:'1em'}} onClick={()=>{setGoCert(!goCert);}}>{goCert?'取消认证':'点此认证'}</Button></p> 
        { goCert && <>
            <br/>    
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>真实姓名： </span><Input style={{width:'60%'}}></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>最高学历： </span><Input style={{width:'60%'}} placeHolder='例：北京大学心理学博士'></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>毕业证明： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <div><MyAvatar /></div>
            <br/>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>所属机构： </span><Input style={{width:'60%'}} ></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>认证资格： </span><Input style={{width:'60%'}} placeHolder='例：三级心理咨询师'></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>资格证明： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <div><MyAvatar /></div>
            <br/>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>个人简历： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <div><MyAvatar /></div>
            <br/>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>擅长领域： </span>
            {tagsData.map(tag => (
                <CheckableTag
                    key={tag}
                    checked={selectedTags.indexOf(tag) > -1}
                    onChange={checked => handleChange(tag, checked)}>
                    {tag}
                </CheckableTag>
            ))}
            </p>
            
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>个人简介： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <p className="basic_infor"><TextArea style={{width:'70%', display:'inline-block', textAlign:'left', padding:'0.5em'}} rows={4}></TextArea></p>
            
            <Button type="primary" size='medium'>提交申请</Button>
        </>}
        </div>}


        {/* 是医生 */}
        {isDoctor && <div style={{textAlign:'center'}}>
            <p className="basic_infor">您好，<span style={{fontWeight:'bold'}}>{userData.userName}</span>。经认证，您是<span style={{fontWeight:'bold', color:'blue'}}> {returnStatus(userData.docCert)}</span></p>
            <p className="basic_infor">以下是您的咨询师信息<Button type="primary" size='medium' style={{marginLeft:'1em'}} onClick={()=>{setGoEdit(!goEdit);}}>{goEdit?'取消编辑':'编辑'}</Button></p> 

            { goEdit && <>
            <br/>    
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>真实姓名： </span><Input style={{width:'60%'}} defaultValue={userData.userName}></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>最高学历： </span><Input style={{width:'60%'}} defaultValue={userData.docEdu}></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>毕业证明： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <div><MyAvatar avatarSRC={"http://132.232.126.211:8080/images/"+userData.docEduimg}/></div>
            <br/>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>所属机构： </span><Input style={{width:'60%'}} defaultValue={userData.docHop}></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>认证资格： </span><Input style={{width:'60%'}}  defaultValue={returnStatus(userData.docCert)}></Input></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>资格证明： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <div><MyAvatar avatarSRC={"http://132.232.126.211:8080/images/"+userData.docCertimg}/></div>
            <br/>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>个人简历： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <div><MyAvatar avatarSRC={"http://132.232.126.211:8080/images/"+userData.docResume}/></div>
            <br/>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>擅长领域： </span>
            {tagsData.map(tag => (
                <CheckableTag
                    key={tag}
                    checked={selectedTags.indexOf(tag) > -1}
                    onChange={checked => handleChange(tag, checked)}>
                    {tag}
                </CheckableTag>
            ))}
            </p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>个人简介： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <p className="basic_infor"><TextArea style={{width:'70%', display:'inline-block', textAlign:'left', padding:'0.5em'}} defaultValue={userData.userIntro} rows={4}></TextArea></p>
            <Button type="primary" size='medium'>提交申请</Button>
            </>}

            { !goEdit && <>
            <br/>    
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>真实姓名： </span><div style={{width:'60%', display:'inline-block', textAlign:'left'}}>{userData.userName}</div></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>最高学历： </span><div style={{width:'60%', display:'inline-block', textAlign:'left'}}>{userData.docEdu}</div></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>毕业证明： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <div><ImageDemo  imageWidth={200} imageUrl={userData.docEduimg} /></div>
            <br/>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>所属机构： </span><div style={{width:'60%', display:'inline-block', textAlign:'left'}}>{userData.docHop}</div></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>认证资格： </span><div style={{width:'60%', display:'inline-block', textAlign:'left'}}>{returnStatus(userData.docCert)}</div></p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>资格证明： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <div><ImageDemo  imageWidth={200} imageUrl={userData.docCertimg} /></div>
            <br/>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>个人简历： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <div><ImageDemo  imageWidth={200} imageUrl={userData.docResume} /></div>
            <br/>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>擅长领域： </span>
            {handleFields2(userData.docWell).map((item)=>(<Tag color={item.color} style={{fontSize:'13px', margin:'0 12px 7px 0',}}>{item.well}</Tag>))}
            </p>
            <p className="basic_infor"><span style={{fontWeight:'bold'}}>个人简介： </span><div style={{width:'60%', display:'inline-block'}}></div></p>
            <p className="basic_infor"><div style={{width:'70%', display:'inline-block', textAlign:'left', border:'solid 2px #aaaaaa', padding:'0.5em'}}>{userData.userIntro==null?'您还没有简介！可在“修改资料”中添加~':userData.userIntro}</div></p>
            </>}


        </div>}
        </>
    )
}

export default MyCert
