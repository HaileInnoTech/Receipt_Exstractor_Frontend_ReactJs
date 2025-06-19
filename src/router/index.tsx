import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { UploadPage } from "@/pages/UploadPage";
import { ReceiptDetail } from "@/pages/ReceiptDetail";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/home" element={<UploadPage />} />
      <Route path="/receipt-detail" element={<ReceiptDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
