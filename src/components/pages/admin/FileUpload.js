import React from 'react'
import Resize from 'react-image-file-resizer'
import axios from 'axios'

import { useSelector } from 'react-redux'
const FileUpload = ({values,setvalue}) => {

    const { user } = useSelector((state) => ({ ...state }));
    //  console.log('values in Fileupload', values)
    const handleChangeFile = (e) =>{
        // console.log(e.target.files)
        const files = e.target.files
        if(files){
            let allfileUpload = values.images //array
            for(let i=0; i < files.length; i++){
                console.log(files[i]);
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri)=>{
                        axios.post(process.env.REACT_APP_API+'/cloudinary/create',
                        {
                             image: uri
                        },{
                            headers:{
                                // 'Access-Control-Allow-Origin': '*',
                                // 'Content-Type': 'application/json',
                                authtoken: user.token
                            }
                        }).then(res =>{
                            console.log(res)
                            allfileUpload.push(res.data)
                            console.log("allfileupload in then", allfileUpload)
                            // setvalue({ ...values, images: allfileUpload});

                        }).catch(err =>{
                            console.log(err)
                        })
                        console.log(uri)
                        

                    },
                    "base64"

                )
            }
            
        }
    }
  return (
    <div>
         <label >File input</label>
                                                    <div className="input-group">
                                                        <div className="custom-file">
                                                            <input
                                                                type="file"
                                                                className="custom-file-input"
                                                                // id="exampleInputFile"
                                                                accept='images/*'
                                                                name="file"
                                                                multiple
                                                                onChange={handleChangeFile}
                                                            />
                                                            <label
                                                                className="custom-file-label "
                                                                htmlFor="exampleInputFile"
                                                            >
                                                                Choose file
                                                            </label>
                                                        </div>
                                                      
                                                    </div>
      
    </div>
  )
}

export default FileUpload
