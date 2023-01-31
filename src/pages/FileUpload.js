


import React, {Component, useState} from 'react';
import axios from 'axios';

const FileUpload =()=> {
  const [onSelectedFile,setOnselect]=useState(null)
 
    
    // On file select (from the pop up)
   const onFileChange = event => {
    
      // Update the state
      setOnselect( event.target.files[0]);
    
    };
    
    // On file upload (click the upload button)
  const  onFileUpload = () => {
    
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "myFile",
        onSelectedFile,
        onSelectedFile.name
      );
    
      // Details of the uploaded file
    
    
      // Request made to the backend api
      // Send formData object
      axios.post("api/uploadfile", formData);
    };
    
    // File content to be displayed after
    // file upload is complete
 const   fileData = () => {
    
      if (onSelectedFile) {
         
        return (
          <div>
            <h2>File Information:</h2>
             
<p>File Name: {onSelectedFile.name}</p>
 
             
<p>File Type: {onSelectedFile.type}</p>
 
             
<p>
              Last Modified:{" "}
              {onSelectedFile.lastModifiedDate.toDateString()}
            </p>
 
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose file before Pressing the Upload button</h4>
          </div>
        );
      }
    };
    
    console.log("her",onSelectedFile);
    
      return (
        <div>
            <h3>
              File Upload with Axios
            </h3>
            <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>
                  Upload!
                </button>
            </div>
          {fileData()}
        </div>
      );
    }
  
 

export default FileUpload;