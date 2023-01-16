import React, { useState, useEffect, useId } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import List from '../List';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const history = useNavigate();
    const[book, setBook] = useState([{
        id : 1,
        ISBN : '9043445',
        Title : 'Ragnarok',
        Author: 'Gagas M.K, Yrydah K.p', 
        Publish_Date : '11:09 PM - 1 Jan 2016',
        Publisher : 'IEEE Journal',
        Number : '515',
        Description : 'Film Ragnarok disini menceritakan tentang penduduk Edda yang mempunyai kehidupan yang tidak seperti biasa, dimana fenomena alam terjadi dengan tidak semestinya seperti kutub yang mencair, musim dingin yang hangat, dan hujan deras.okoh utama dalam film Ragnarok yaitu Magne diperankan oleh David Stakston, film kedua yang dibintangi oleh aktor 19 tahun tersebut. Film ini juga diperankan oleh Theresa Frostad Eggesbo, wanita 21 tahun yang sempat memukau lewat film Norwegia, Kometen.',
        URL :'Netflix-Ragnarok.com',
        Create_Date : '11:09 PM - 1 Jan 2015',
        Last_Up_Date : '11:09 PM - 25 Des 2015'

    }]);
    const [formData, SetFormatData] = useState({
        
        ISBN : '',
        Title : '',
        Author: '', 
        Publish_Date : '',
        Publisher : '',
        Number : '',
        Description : '',
        URL :'',
        Create_Date : '',
        Last_Up_Date : ''
    })

    function handleChange(e){
        let data ={ ...formData};
        data[e.target.title] = e.target.value;
        SetFormatData(data);
    }
    function handleSubmit(){
        e.preventDefault();
        alert("Sudah Tersimpan !")

        let data = [...book];

        data.push({id : uid(), ISBN : formData.ISBN, Title: formData.Title, Author: formData.Author, Publish_Date:formData.Publish_Date, Publisher: formData.Publisher, Number : formData.Number, Description: formData.Description, URL: formData.URL, Create_Date: formData.Create_Date , Last_Up_Date:formData.Last_Up_Date   })
        setBook(data)
    }

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decode = jwt_decode(response.data.accessToken);
            setName(decode.name);
            setExpire(decode.exp);
        } catch (error) {
            if (error.response) {
                history("/");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currendate = new Date();
        if (expire * 1000 < currendate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decode = jwt_decode(response.data.accessToken);
            setName(decode.name);
            setExpire(decode.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data)
    }
    return (
        <div className="container mt-5">
            <h1>Selamat Datang {name}</h1>
            <button onClick={getUsers} className='button is-info'>Get Users</button>
            <form onSubmit={handleSubmit} className='box mt-5' >
                {/* <p className='has-text-centered'>{msg}</p> */}
                <div className="field mt-5">
                    <label className='label'>
                        Book ID
                    </label>
                    <div className="controls">
                        <input type="text" className='input' placeholder='1'   />
                    </div>
                </div>
                <div className="field">
                    <label className='label'>
                        Book ISBN Number
                    </label>
                    <div className="controls">
                        <input type="text" onChange={handleChange} className='input' placeholder='89735' value={formData.ISBN}  />
                    </div>
                </div>
                <div className="field">
                    <label className='label'>
                        Book Title
                    </label>
                    <div className="controls">
                        <input type="text" onChange={handleChange} className='input' placeholder='Ragnarok'  value={formData.Title}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label'>
                        Book Author
                    </label>
                    <div className="controls">
                        <input type="text" className='input' onChange={handleChange}  placeholder='Name'  value={formData.Author}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label'>
                        Book Pubilish Date
                    </label>
                    <div className="controls">
                        <input type="text" onChange={handleChange}  className='input' placeholder='dd-mm-yy'  value={formData.Publish_Date}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label'>
                        Book publisher
                    </label>
                    <div className="controls">
                        <input type="text" onChange={handleChange}  className='input' placeholder='Name'  value={formData.Publisher}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label'>
                        Number
                    </label>
                    <div className="controls">
                        <input type="text" onChange={handleChange}  className='input' placeholder='total page'  value={formData.Number}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label'>
                        Book Description
                    </label>
                    <div className="controls">
                        <input type="text" className='input' onChange={handleChange}  placeholder='....'  value={formData.Description}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label'>
                        Book URL
                    </label>
                    <div className="controls">
                        <input type="text" className='input' onChange={handleChange}  placeholder='...'  value={formData.URL}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label'>
                        Created
                    </label>
                    <div className="controls">
                        <input type="text" className='input' onChange={handleChange}  placeholder='dd-mm-yy'  value={formData.Create_Date}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label'>
                        Update
                    </label>
                    <div className="controls">
                        <input type="text" onChange={handleChange}  className='input' placeholder='dd-mm-yy'  value={formData.Last_Up_Date}/>
                    </div>
                </div>
                <div className="field">
                    <button className='button is-success is-fullwidth'> Input </button>
                </div>
            </form>
            <List data={book}/>
        </div>
        

    )
}

export default Dashboard
