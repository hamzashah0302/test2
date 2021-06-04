    import React from 'react'
    import {useState,useEffect} from 'react'
    import axios from 'axios'
    import { Table,Modal, Button,Space } from 'antd';
    import 'antd/dist/antd.css';


    const Home = () => {
        
        const [items, setitems] = useState(null)
        const [id, setid] = useState('')
        const [name, setname] = useState('')
        const [updateItem , setupdateItem] =useState({id:'',name:''})
        const [isModalVisible, setIsModalVisible] = useState(false);


        const handleCancel = () => {
            setIsModalVisible(false);
        };

        const getItems=async ()=>{
            let res =await axios.get('https://morosoft.herokuapp.com/find')
            setitems(res.data)
        }
        useEffect(() => {
            getItems()
        }, [])
        const handleEdit =async(id,name)=>{
            setIsModalVisible(true);
            setupdateItem({...updateItem,id:id, name: name})
            
            
        }
        const handleDelete =async(id)=>{
            let res = await axios.post('https://morosoft.herokuapp.com/delete',{id})
            if(res.status==200) getItems() // called getItems() to refesh data from server
        }
        const saveUpdate = async()=>{
            let res = await axios.post('https://morosoft.herokuapp.com/update',updateItem)
            if(res.status ==200) {
                handleCancel() //close modal
                getItems()}
        }   
        const addItem =()=>{
            axios.post('/save',{id,name})
            setid('')
            setname('')
            getItems()
        }
        var columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Item name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title:"Action",
                key: "action",
                render : (text, record) => (
                <Space size="middle">
                    <a onClick={()=>handleEdit(record.id,record.name)}>edit</a>
                    <a onClick={()=>handleDelete(record.id)}>Delete</a>
                </Space>
                )
            }
            
        ];
        return (<>
            <div><h1>Add Item </h1>
            <label htmlFor="fname">item ID:</label><br/>
                <input type="text" value={id} onChange={(e)=>{setid(e.target.value)}} /><br/>
                <label htmlFor="lname">Item Name:</label><br/>
                <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}} /><br/><br/>
                <button type="button" onClick={addItem}>save item!</button>
                <hr/>
            </div>
            <div>
            <Modal title="Update data" visible={isModalVisible} footer={[
            <Button onClick={handleCancel}>
                Cancel
            </Button>,
            ]}>
                
                <label htmlFor="fname">item ID:</label><br/>
                <input type="text" value={updateItem.id} onChange={(e)=>{setupdateItem({...updateItem, id:e.target.value})}} /><br/>
                <label htmlFor="lname">Item Name:</label><br/>
                <input type="text" value={updateItem.name} onChange={(e)=>{setupdateItem({...updateItem,name:e.target.value})}} /><br/><br/>
                <button type="button" onClick={saveUpdate}>update!</button>
            </Modal>
            <Table dataSource={items} columns={columns}/>
            </div>
            </>)
    }

    export default Home
