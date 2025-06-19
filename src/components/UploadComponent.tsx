import React, { useRef } from "react";
import * as msgConfig from "@/config/msgConfig";
import CommonButton from "@/molecules/CommonButton/CommonButton";
import { Icon } from "@iconify/react";
interface UploadComponentProps {
  onUpload: (file: File) => void;
  file?: File | null;
  setFile?: (file: File | null) => void;
}

export const UploadComponent: React.FC<UploadComponentProps> = ({
  onUpload,
  file,
  setFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && setFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile && setFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleReset = () => {
    if (setFile) {
      setFile(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="upload-container" style={styles.container}>
      {file && (
        <div style={styles.fileInfo}>
          <div style={styles.preview}>
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              style={styles.image}
            />
          </div>
          <div style={styles.imgInfo}>
            <span>
              <strong>{msgConfig.FILE_NAME}:</strong> {file.name}
            </span>
            <span>
              <strong>{msgConfig.FILE_UPLOAD_DATE}:</strong>{" "}
              {file.lastModified
                ? new Date(file.lastModified).toLocaleString()
                : "N/A"}
            </span>
            <span>
              <strong>{msgConfig.FILE_SIZE}:</strong>{" "}
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </span>
            <span>
              <strong>{msgConfig.FILE_TYPE}:</strong> {file.type || "N/A"}
            </span>
          </div>
        </div>
      )}

      {!file && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={styles.dropZone}
          onClick={() => fileInputRef.current?.click()}
        >
          <div style={styles.iconCircle}>
            <span style={styles.icon}>
              <Icon icon="fluent-color:image-32" width="64" height="64" />
            </span>
          </div>
          <div style={styles.text}>{msgConfig.UploadImageText}</div>
          <div style={styles.text}>{msgConfig.OR}</div>
          <div
            style={styles.link}
            onClick={() => fileInputRef.current?.click()}
          >
            Choose file
          </div>
          <div style={styles.text}>{msgConfig.ONLY_JPG_JPEG_PNG}</div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      )}

      <div style={styles.footer}>
        <CommonButton
          disabled={!file}
          backgroundColor="#007bff"
          textColor="white"
          title={msgConfig.UPLOAD}
          onClick={() => file && onUpload(file)}
        />

        <CommonButton
          title={msgConfig.RESET}
          onClick={handleReset}
          backgroundColor="red"
          textColor="white"
          disabled={!file}
        />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 600,
    width: "100%",
    padding: 20,
    borderRadius: 12,
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  dropZone: {
    border: "2px dashed #ccc",
    borderRadius: 8,
    padding: 40,
    textAlign: "center" as const,
    cursor: "pointer",
    backgroundColor: "#fafafa",
  },
  iconCircle: {
    backgroundColor: "#f0f0f0",
    width: 30,
    height: 30,
    margin: "0 auto 10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#666",
    fontSize: 14,
    marginBottom: 4,
  },
  link: {
    color: "#007bff",
    fontSize: 14,
    cursor: "pointer",
    textDecoration: "underline",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
    gap: 10,
  },
  fileInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  preview: {
    width: 300,
    overflow: "hidden",
    borderRadius: 8,
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    maxWidth: "100%",
    maxHeight: "600px",
    objectFit: "contain",
  },
  imgInfo: {
    marginLeft: 20,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignSelf: "start",
    gap: 10,
    fontSize: 16,
  },
};
