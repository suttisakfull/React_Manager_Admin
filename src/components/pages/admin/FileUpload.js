import React from 'react'
import Resize from 'react-image-file-resizer'
import axios from 'axios'

import { Avatar, Badge, Spin } from "antd";


import { useSelector } from 'react-redux'
const FileUpload = ({ values, setvalues, pictureload, setpictureload }) => {

    const { user } = useSelector((state) => ({ ...state }));
    //  console.log('values in Fileupload', values)
    const handleChangeFile = (e) => {
        // console.log(e.target.files)
        const files = e.target.files
        if (files) {
            setpictureload(true)
            let allfileUpload = values.images //array
            for (let i = 0; i < files.length; i++) {
                console.log(files[i]);
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        axios.post(process.env.REACT_APP_API + '/cloudinary/create',
                            {
                                image: uri
                            }, {
                            headers: {
                                // 'Access-Control-Allow-Origin': '*',
                                // 'Content-Type': 'application/json',
                                authtoken: user.token
                            }
                        }).then(res => {
                            setpictureload(false)
                            console.log(res)
                            allfileUpload.push(res.data)
                            console.log("allfileupload in then", allfileUpload)
                            setvalues({ ...values, images: allfileUpload });

                        }).catch(err => {
                            setpictureload(false)
                            console.log(err)
                        })
                        console.log(uri)


                    },
                    "base64"

                )
            }

        }
    }
    const handleRemove = (public_id) => {
        setpictureload(true)
        console.log(public_id)
        // const img = values.images
        const { images } = values
        axios.post(process.env.REACT_APP_API + '/cloudinary/remove',
            { public_id },
            {
                headers: {
                    authtoken: user.token
                }
            }
        ).then(res => {
            console.log(res)
            setpictureload(false)
            let filterImages = images.filter(item => {
                // return console.log('item',item.public_id)
                return item.public_id !== public_id
            })
            setvalues({ ...values, images: filterImages });
        }).catch(err => {
            setpictureload(false)
            console.log(err)
        })
    }
    return (
        <>
 
            <div className="form-group mt-5">
                <div>
                    <label className="btn btn-primary ">
                        Choose file...

                        <input
                            onChange={handleChangeFile}
                            className="form-control"
                            type="file"
                            hidden
                            multiple
                            accept='images/*'
                            name="file"
                        />

                    </label>
                    <span>  {
                        pictureload
                            ? <h1><Spin /></h1> //ture
                            : <h1 className="m-0"></h1>//false
                    }</span>
                </div>
            </div>

            <br />

            {values.images && values.images.map((item) =>
                <span key={item._id} className="avatar-item">
                    <Badge

                        onClick={() => handleRemove(item.public_id)}
                        style={{ cursor: 'pointer' }}
                        count="X">

                        <Avatar
                            className="m-2"
                            src={item.url}
                            shape="square"
                            size={120}
                        />
                    </Badge>
                </span>
            )}
     





        </>
    )
}

export default FileUpload
