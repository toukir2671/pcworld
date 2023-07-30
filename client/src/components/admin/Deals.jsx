import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "./admin.scss";

const initialInputs = {
  title: "",
  description: "",
  images: {},
};

const Deals = () => {
  const [dealFormData, setDealFormData] = useState(initialInputs);
  const [startingDate, setStartingDate] = useState(null);
  const [endingDate, setEndingDate] = useState(null);

  const { title, description, images } = dealFormData;

  const handleDealChange = (e) => {
    if (e.target.files) {
      setDealFormData((prev) => ({
        ...prev,
        images: e.target.files,
      }));
    } else if (!e.target.files) {
      setDealFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const submitDeal = async (e) => {
    e.preventDefault();

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const fileName = `${Date.now()}-${image.name}-${uuid()}`;
        const storageRef = ref(storage, `dealsImages/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            toast.success("Upload is " + progress + "% done");
          },
          (error) => {
            reject(error);
            toast.error(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              resolve(downloadUrl);
              toast.success("Image uploaded successfully.");
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      toast.error(error.message);
    });

    const dealFormDataCopy = {
      ...dealFormData,
      imgUrls,
      startingDate: startingDate,
      endingDate: endingDate,
      timestamp: serverTimestamp(),
    };

    delete dealFormDataCopy.images;

    await addDoc(collection(db, "dailyDeals"), dealFormDataCopy);
    setDealFormData(initialInputs);
    setStartingDate(null);
    setEndingDate(null);
    toast.success("The deal is added successfully");
  };

  return (
    <>
      <form className="deals" onSubmit={submitDeal}>
        <h1>Add a deal</h1>

        <div className="deal-content">
          <div className="deal-upload">
            <div className="dates">
              <div className="from">
                <h2>From:</h2>
                <DatePicker
                  placeholderText="starting from"
                  selected={startingDate}
                  onChange={(date) => setStartingDate(date)}
                  dateFormat="dd/MM/yy"
                  minDate={new Date()}
                  isClearable
                  required
                />
              </div>

              <div className="to">
                <h2>To:</h2>
                <DatePicker
                  placeholderText="available till"
                  selected={endingDate}
                  onChange={(date) => setEndingDate(date)}
                  dateFormat="dd/MM/yy"
                  minDate={new Date()}
                  isClearable
                  required
                />
              </div>
            </div>

            <div className="description">
              <input
                required
                type="text"
                placeholder="give it a title"
                name="title"
                value={title}
                onChange={handleDealChange}
              />

              <TextareaAutosize
                className="textarea"
                required
                placeholder="describe about the deal"
                name="description"
                value={description}
                onChange={handleDealChange}
              />

              <input
                required
                type="file"
                name="images"
                accept="image/jpg, image/png, image/jpeg"
                onChange={handleDealChange}
                multiple
              />
            </div>

            <div className="dealSubmitBtn">
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Deals;
