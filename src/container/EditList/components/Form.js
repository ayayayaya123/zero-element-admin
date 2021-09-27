import React,{useState,useRef,useImperativeHandle, forwardRef} from "react"
import { Input,Select,Switch,InputNumber,Checkbox,Collapse } from 'antd'
import _ from 'lodash'
import TheJson from '@/../zero-antd-dep/formItemType/JSON'
export default forwardRef((props,ref)=>{
    const {
        formData,
        config,
        unUseDefaultValue = false //是否使用默认值
    }=props
    const CheckboxGroup = Checkbox.Group
    const { Panel } = Collapse;
    const [data,setData] = useState(formData)
    function getFormData(field){
        return _.get(formData,field,"")
    }
    function getDefaultData(field,defaultValue){
        let defaultData;
        let dData = getFormData(field)
        if(dData){
            defaultData = dData
        }else if(!unUseDefaultValue){
            defaultData = defaultValue
        }
        return defaultData
    }
    function getSwitchData(field,defaultValue){
        let sData = getFormData(field)
        let value;
        if(sData === "1"||sData === 1||sData === true){
            value = true
        }else if(!unUseDefaultValue){
            value = defaultValue
        }else{
            value = false
        }
        return value
    }
    function ChangeValue(field,e){
        let newVData = data||{}
        newVData[field]= e.target.value
        setData(newVData)
    }
    function defaultChange(field,e){
        let newCData = data||{}
        newCData[field]= e
        console.log(e)
        setData(newCData)
    }
    function switchChange(field,e){
        let newSData = data||{}
        newSData[field]= e?1:0
        console.log(e)
        setData(newSData)
    }
    function JsonChange(field,e){
        let newJData = data||{}
        console.log(e)
        newJData[field]= JSON.stringify(e)
        setData(newJData)
    }
    function GetJsonValue(field){
        let jData = getFormData(field)
        let json
        if(jData&&jData.indexOf("{")!==-1){
            
             json = JSON.parse(jData)
        }else{
            json = {}
        }
        return json
    }
    function handleSelect(field,e){
        let newSeData = data||{}
        console.log(e.toString())
        newSeData[field]=e.toString()
        console.log(newSeData)
    
        setData(newSeData)
    }
    function getSelectData(field,defaultValue){
        let SelectData
        let theForm = getFormData(field)
        if(theForm){
            let newData = theForm.toString()
            console.log(newData)
            let newValue = newData.replace(/\[/g,"") 
            let thenValue = newValue.replace(/\]/g,"") 
            let allValue = thenValue.replace(/\"/g,"") 
            let json = allValue.split(',')
            SelectData=json
            console.log(SelectData)
        }else if(!unUseDefaultValue){
            SelectData = defaultValue
        }
        return SelectData
    }
    useImperativeHandle(ref,
        ()=>{
            return {
                data
            }
        })
        // 选择项
        const selectEndpoint = (item,i) => {
            return <>{item.mode==="multiple"?<CheckboxGroup
            defaultValue={getSelectData(item.field,item.defaultValue)} 
            style={{ width: "100%" }} 
            options={item.options} 
            onChange={(e)=>handleSelect(item.field,e)}
            >
            </CheckboxGroup>:<Select 
            defaultValue={getSelectData(item.field,item.defaultValue)} 
            mode={item.mode} style={{ width: "100%" }} 
            options={item.options} 
            onChange={(e)=>handleSelect(item.field,e)}
            />}</>
        }
        //json项
        const jsonEndpoint = (item,i) => {
            return <TheJson
                value={GetJsonValue(item.field)}
                onChange={(e)=>JsonChange(item.field,e)}
                key={i}
            >
            </TheJson>
        }
        // switch项
        const switchEndpoint = (item,i) => {
            return <Switch defaultChecked={getSwitchData(item.field,item.defaultValue)}
                        onChange={(e)=>switchChange(item.field,e)}
            />
        }
        // 默认input
        const inputEndpoint = (item,i) => {
            return <Input
            defaultValue={getDefaultData(item.field,item.defaultValue)}
            placeholder={item.placeholder||"请输入"+item.label}
            addonAfter={item.addonAfter}
            onChange={(e)=>ChangeValue(item.field,e)}
            key={getDefaultData(item.field,item.defaultValue)}
            size="middle"
             />
        }

        const numberEndpoint = (item,i) => {
            return <InputNumber
            addonAfter={item.addonAfter}
            defaultValue={getDefaultData(item.field,item.defaultValue)}
            placeholder={item.placeholder||"请输入"+item.label}
            onChange={(e)=>defaultChange(item.field,e)}
            key={i}
            size="middle"
             />
        }

        const AllFormType = (item,i) =>{
            return <div className="dynamic_column"><div>{item.label}：</div>{ 
                item.type==="JSON"?jsonEndpoint(item,i):
               item.type==="select"?selectEndpoint(item,i):
               item.type==="switch"?switchEndpoint(item,i):
               item.type==="number"?numberEndpoint(item,i):
                inputEndpoint(item,i)}</div>
        }
    return <>
        {config?config.map((item,i)=>
            item.children?<Collapse>
                <Panel header={item.header}>
                    {item.children.map((child,a)=>AllFormType(child,a))}
                </Panel>
            </Collapse>:
           AllFormType(item,i)) :null}
    </>
})