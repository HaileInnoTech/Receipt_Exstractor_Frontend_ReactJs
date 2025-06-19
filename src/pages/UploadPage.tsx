import * as msgConfig from "@/config/msgConfig";
import * as apiConfig from "@/config/apiConfig";
import axios from "axios";
import { UploadComponent } from "@/components/UploadComponent";
import Loading from "@/molecules/Loading/Loading";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// UploadPage.tsx
// This file defines the UploadPage component which renders a title and an upload component.
export const UploadPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Upload Image - Receipt Extractor";
  }, []);

  const handleUpload = async (file: File) => {
    const url = apiConfig.EXTRACTION_ENDPOINT;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setIsLoading(true);
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 10000,
      });
      if (response.status === 200) {
        const receipt = response.data;
        navigate("/receipt-detail", { state: { receipt: receipt.data, file: file } });
      }
    } catch (error) {
      const status =
        axios.isAxiosError(error) && error.response?.status
          ? ` (Status: ${error.response.status})`
          : "";
      window.alert(
        `Error uploading file${status}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div style={styles.uploadPage}>
        <h1>{msgConfig.UploadPageTitle}</h1>
        <UploadComponent
          onUpload={handleUpload}
          file={file}
          setFile={setFile}
        />
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  uploadPage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    height: "100vh",
    width: "100%",
  },
};
