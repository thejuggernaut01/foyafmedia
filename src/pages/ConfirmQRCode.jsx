import { useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import QrScanner from "qr-scanner";

export default function ConfirmQRCode() {
  const [scannedResult, setScannedResult] = useState([]);
  const [isValid, setIsValid] = useState("");
  let qrScanner;

  const checkoutCollection = collection(db, "checkout");

  QrScanner.hasCamera()
    .then((hasCamera) => {
      if (hasCamera) {
        const videoElem = document.getElementById("videoElement");
        videoElem.disablePictureInPicture = true;

        qrScanner = new QrScanner(videoElem, (result) => {
          setScannedResult(result);
        });
      } else {
        console.error("No camera found");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });

  const scanQRCode = async () => {
    qrScanner.start();
    const checkoutQuery = query(
      checkoutCollection,
      where("transNum", "==", scannedResult)
    );
    const querySnapshot = await getDocs(checkoutQuery);

    if (!querySnapshot.empty) {
      const documentData = querySnapshot.docs[0].data();
      if (documentData.QRCodeUsed === false) {
        setIsValid("Valid");
      } else {
        setIsValid("Not valid");
      }

      const documentId = querySnapshot.docs[0].id;
      const newData = { ...documentData, QRCodeUsed: true };
      const docRef = doc(db, checkoutCollection, documentId);
      await updateDoc(docRef, newData);
    }
  };

  const closeQRCode = () => {
    qrScanner.stop();
  };

  return (
    <>
      <section className="mt-10 mb-6">
        <h2 className="text-center pb-5 text-2xl">Check QR Code Validity</h2>

        <aside>
          <div className="px-10">
            <video
              className="w-[500px] md:w-[800px] mx-auto"
              id="videoElement"
            ></video>
          </div>

          <div className="flex justify-center items-center space-x-20 pt-5">
            <button onClick={scanQRCode}>Open Scanner</button>
            <button onClick={closeQRCode}>Close Scanner</button>
          </div>

          <div>{isValid && <h3>{`The QR Code is ${isValid}`}</h3>}</div>
        </aside>
      </section>
    </>
  );
}
