import React, { useContext, useState } from "react";
import './UploadBtn.css';
import FileContext from '../contexts/FileContext'
import Loader from '../loader/Loader'


const UpscaleBtn = () => {
    const selectedFile = useContext(FileContext);
    const [pred, setPred] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        console.log(formData);
        console.log(selectedFile.name);

        const requestOptions = {
            method: 'POST',
            body: formData,
        };
        await fetch('http://34.133.5.60/uploadfile', requestOptions);
        // const data = await resp.json();
    }
    const handlePredict = async () => {
        setLoading(true);
        await handleUpload();
        const requestOptions = {
            method: 'GET',
        };
        const resp = await fetch(`http://34.133.5.60/predict/?filename=${selectedFile.name}`, requestOptions);
        const data = await resp.json();
        setPred(data["STATUS"]);
        console.log(data);
        console.log(pred);
        setLoading(false);
    }

    const handleDownload = async () => {
        const requestOptions = {
          method: "GET",
        };
        const resp = await fetch(
          `http://34.133.5.60/getSubtitles/?filename=${selectedFile.name}`,
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
            {loading ? <Loader /> : null}
            {pred === "SUCCESS" && (
                <button className="download-button" onClick={handleDownload}>
                    Download Subtitles!
                </button>
            )}
        </div>
    )
}

export default UpscaleBtn;