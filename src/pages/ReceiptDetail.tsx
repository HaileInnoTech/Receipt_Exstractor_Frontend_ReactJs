import * as msgConfig from "@/config/msgConfig";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CommonButton from "@/molecules/CommonButton/CommonButton";
interface ReceiptDetailProps {
  receipt: {
    id: string;
    date: string;
    currency: string;
    vendor_name: string;
    receipt_items: Item[];
    tax: number;
    total: number;
  };
  file: File;
}
interface Item {
  item_name: string;
  item_cost: number;
}
export const ReceiptDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receipt = location.state?.receipt as ReceiptDetailProps["receipt"];
  const file = location.state?.file as File;
  useEffect(() => {
    document.title = "Receipt Detail - Receipt Extractor";
    if (!receipt || !file) {
      navigate("/");
    }
  }, [receipt, file, navigate]);
  if (!receipt || !(file instanceof File)) return null;

  const handleExitClick = () => {
    navigate("/");
  };

  return (
    <>
      <div style={styles.receiptDetail}>
        <h1>{msgConfig.ReceiptDetailTitle}</h1>
        <div style={styles.receiptContainer}>
          <div style={styles.receiptInfo}>
            <div style={styles.receiptFile}>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={styles.image}
              />
            </div>

            <div style={styles.receiptDetails}>
              <p>
                <div style={styles.rowItem}>
                  <strong>{msgConfig.DATE}:</strong>
                  <span>{receipt.date}</span>
                </div>
              </p>
              <p>
                <div style={styles.rowItem}>
                  <strong>{msgConfig.CURRENCY}:</strong>
                  <span>{receipt.currency}</span>
                </div>
              </p>
              <p>
                <div style={styles.rowItem}>
                  <strong>{msgConfig.VENDOR_NAME}:</strong>
                  <span>{receipt.vendor_name}</span>
                </div>
              </p>
              <p>
                <div style={styles.rowItem}>
                  <strong>{msgConfig.RECEIPT_ITEMS}:</strong>
                </div>
                <ul>
                  {receipt.receipt_items.map((item, index) => (
                    <li key={index} style={styles.rowItem}>
                      <span>{item.item_name}</span>
                      <span>
                        {item.item_cost.toFixed(2)} {receipt.currency}
                      </span>
                    </li>
                  ))}
                </ul>
              </p>
              <p>
                <div style={styles.rowItem}>
                  <strong>{msgConfig.GST_TAX}:</strong>
                  <span>
                    {receipt.tax.toFixed(2)} {receipt.currency}
                  </span>
                </div>
              </p>
              <p>
                <div style={styles.rowItem}>
                  <strong>{msgConfig.TOTAL}:</strong>
                  <span>
                    {receipt.total.toFixed(2)} {receipt.currency}
                  </span>
                </div>
              </p>
            </div>
          </div>
          <div style={styles.buttonContainer}>
            <CommonButton
              title={msgConfig.BackToHome}
              onClick={handleExitClick}
              backgroundColor="red"
            />
          </div>
        </div>
      </div>
    </>
  );
};
const styles: { [key: string]: React.CSSProperties } = {
  receiptDetail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    height: "100vh",
    width: "100%",
  },
  receiptContainer: {
    display: "flex",
    width: "840px",
    flexDirection: "column",
    alignItems: "center",
  },
  receiptInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    maxWidth: "800px",
    width: "100%",
    gap: "20px",
    margin: "0 50px 20px 50px ",
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
    height: "600px",
    objectFit: "contain",
  },
  receiptDetails: {
    maxHeight: "600px",
    height: "100%",
    width: "100%",
    overflowY: "auto",
  },
  rowItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 5px",
  },

  buttonContainer: {
    width: "840px",
    display: "flex",
    justifyContent: "flex-end",
  },
};
