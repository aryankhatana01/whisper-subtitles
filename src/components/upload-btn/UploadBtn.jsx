import React, { useContext, useState } from "react";
import './UploadBtn.css';
import FileContext from '../contexts/FileContext'


const UpscaleBtn = () => {
    const selectedFile = useContext(FileContext);
    const [pred, setPred] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        console.log(formData);
        console.log(selectedFile.name);

        const requestOptions = {
            method: 'POST',
            body: formData,
        };
        await fetch('http://localhost:8000/uploadfile', requestOptions);
        // const data = await resp.json();
    }
    const handlePredict = async () => {
        await handleUpload();
        const requestOptions = {
            method: 'GET',
        };
        const resp = await fetch(`http://localhost:8000/predict/?filename=${selectedFile.name}`, requestOptions);
        const data = await resp.json();
        setPred(data["STATUS"]);
        console.log(data);
        console.log(pred);
    }

    const handleDownload = async () => {
        const requestOptions = {
          method: "GET",
        };
        const resp = await fetch(
          `http://localhost:8000/getSubtitles/?filename=${selectedFile.name}`,
          requestOptions
        );
        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "subtitles.srt";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    };
    return (
        <div className="predict-button">
            <button className="predict-button-button" onClick={handlePredict}>Transcribe!</button>
            {pred === "SUCCESS" && (
                <button className="download-button" onClick={handleDownload}>
                    Download Subtitles!
                </button>
            )}
        </div>
    )
}

export default UpscaleBtn;