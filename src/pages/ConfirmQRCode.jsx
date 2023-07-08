import { useState } from "react";
import QrScanner from "qr-scanner";

export default function ConfirmQRCode() {
  const [scanRegion, setScanRegion] = useState(false);
  let qrScanner;

  QrScanner.hasCamera()
    .then((hasCamera) => {
      if (hasCamera) {
        const videoElem = document.getElementById("videoElement");
        videoElem.disablePictureInPicture = true;

        qrScanner = new QrScanner(
          videoElem,
          (result) => console.log("decoded qr code:", result),
          {
            returnDetailedScanResult: true,
            highlightScanRegion: scanRegion ? true : false,
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
    setScanRegion((prevState) => !prevState);
    qrScanner.start();
  };

  const closeQRCode = () => {
    qrScanner.stop();
    setScanRegion((prevState) => !prevState);
  };

  return (
    <>
      <section>
        <h2>Check QR Code Validity</h2>

        <aside>
          <div className="px-10">
            <video
              className="w-[500px] md:w-[800px] mx-auto"
              id="videoElement"
            ></video>
          </div>
          <div>
            <button onClick={scanQRCode}>Open Scanner</button>
            <button onClick={closeQRCode}>Close Scanner</button>
          </div>
        </aside>
      </section>
    </>
  );
}
