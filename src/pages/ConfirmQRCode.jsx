import { useState } from "react";

import QrScanner from "qr-scanner";

export default function ConfirmQRCode() {
  const [scannedResult, setScannedResult] = useState([]);
  let qrScanner;

  QrScanner.hasCamera()
    .then((hasCamera) => {
      if (hasCamera) {
        const videoElem = document.getElementById("videoElement");
        videoElem.disablePictureInPicture = true;

        qrScanner = new QrScanner(
          videoElem,
          (result) => setScannedResult(result),
          {
            returnDetailedScanResult: true,
          }
        );
      } else {
        console.error("No camera found");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });

  const scanQRCode = () => {
    qrScanner.start();
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

          <div>{scannedResult}</div>
        </aside>
      </section>
    </>
  );
}
