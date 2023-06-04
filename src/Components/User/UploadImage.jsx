import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import classes from "./UploadImage.module.css";

export default function UploadImage() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");
  // const randomKey = Math.random().toString(36).substring(2);

  const uploadImage = () => {
    if (imageUpload === null) return;
    // const randomFilename = Math.random().toString(36).substring(2);
    console.log(imageUpload);
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    // const imageRef = ref(storage, `images/${imageUpload + randomFilename}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded");
    });
  };
  // if (!imageList.includes(url)) {
  //   setImageList((prev) => [...prev, url]);
  // }
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className={classes.app}>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload Image</button>

      {imageList.map((url) => {
        const key = uuidv4();
        return (
          <img
            key={key}
            className={classes.img}
            src={url}
            alt={"firebase storage"}
          />
        );
      })}
    </div>
  );
}
