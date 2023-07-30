import "./resell.scss";
import Select from "react-select";
import { options } from "../../components/admin/productOptions";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import uuid from "react-uuid";
import { useSelector } from "react-redux";
import {
  selectContactNo,
  selectEmail,
  selectUserId,
  selectUserName,
} from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const initialProperties = {
  itemName: "",
  price: "",
  brand: "",
  description: "",
  images: {},
};

const ResellProductUpload = () => {
  const [resellFormData, setResellFormData] = useState(initialProperties);
  const [whatProduct, setWhatProduct] = useState(null);
  const [warrantyLeft, setWarrantyLeft] = useState(null);

  const sellerName = useSelector(selectUserName);
  const sellerEmail = useSelector(selectEmail);
  const sellerUid = useSelector(selectUserId);
  const sellerContactNo = useSelector(selectContactNo);

  const navigate = useNavigate();

  const [detailsInputFields, setDetailsInputFields] = useState([
    { nameOfTheDetail: "", detail: "" },
  ]);

  const { itemName, price, brand, description, images } = resellFormData;

  const handleOnChange = (e) => {
    if (e.target.files) {
      setResellFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    } else if (!e.target.files) {
      setResellFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleDetailFormDataChange = (index, event) => {
    const values = [...detailsInputFields];
    values[index][event.target.name] = event.target.value;
    setDetailsInputFields(values);
  };

  const handleAddField = () => {
    setDetailsInputFields([
      ...detailsInputFields,
      { nameOfTheDetail: "", detail: "" },
    ]);
  };

  const handleRemoveField = (index) => {
    const values = [...detailsInputFields];
    values.splice(index, 1);
    setDetailsInputFields(values);
  };

  const handleResellSubmit = async (e) => {
    e.preventDefault();

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const fileName = `${Date.now()}-${image.name}-${uuid()}`;
        const storageRef = ref(storage, `resellImages/${fileName}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

    const resellFormDataCopy = {
      ...resellFormData,
      detailsInputFields,
      imgUrls,
      whatProduct:
        whatProduct && whatProduct.value.replace(/\s+/g, "-").toLowerCase(),
      warrantyLeft: warrantyLeft && warrantyLeft.value,
      sellerName: sellerName,
      sellerEmail: sellerEmail,
      sellerUid: sellerUid,
      sellerContact: sellerContactNo,
      timestamp: serverTimestamp(),
    };

    delete resellFormDataCopy.images;

    await addDoc(collection(db, "resells"), resellFormDataCopy);
    setResellFormData(initialProperties);
    navigate("/resell");
    toast.success(
      "Your item is added successfully, you can check your profile for the items you are selling."
    );
  };

  const warrantyYears = [
    { value: 1, label: "1 year" },
    { value: 2, label: "2 year" },
    { value: 3, label: "3 year" },
    { value: 4, label: "4 year" },
    { value: 5, label: "5 year" },
    { value: 6, label: "6 year" },
    { value: 7, label: "7 year" },
    { value: 8, label: "8 year" },
    { value: 9, label: "9 year" },
    { value: 10, label: "10 year" },
    { value: "lifetime", label: "Lifetime" },
  ];

  return (
    <form className="resellForm" onSubmit={handleResellSubmit}>
      <div className="form-container">
        <h1>Upload The Item You Want to Sell</h1>

        <div className="form-item">
          <p>What item is it?</p>
          <Select
            options={options}
            onChange={setWhatProduct}
            defaultValue={whatProduct}
            placeholder="select an item you want to sell"
            noOptionsMessage={() =>
              "You can only sell items that are listed in the options."
            }
            isSearchable
            isClearable
            required
            styles={{
              input: (baseStyles, state) => ({
                ...baseStyles,
                cursor: "text",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                cursor: "pointer",
              }),
              dropdownIndicator: (baseStyles, state) => ({
                ...baseStyles,
                cursor: "pointer",
              }),
              clearIndicator: (baseStyles, state) => ({
                ...baseStyles,
                cursor: "pointer",
                color: "red",
              }),
              noOptionsMessage: (baseStyles, state) => ({
                ...baseStyles,
                cursor: "pointer",
                color: "#e66b6b",
              }),
            }}
          />
        </div>

        <div className="form-item">
          <p>Item Name</p>
          <input
            required
            type="text"
            placeholder="Name of the Item"
            name="itemName"
            value={itemName}
            onChange={handleOnChange}
          />
        </div>

        <div className="form-item">
          <p>Product Price</p>
          <input
            required
            type="number"
            placeholder="price of the item"
            name="price"
            value={price}
            onChange={handleOnChange}
          />
        </div>

        <div className="form-item">
          <p>Brand</p>
          <input
            required
            type="text"
            placeholder="brand name of the item"
            name="brand"
            value={brand}
            onChange={handleOnChange}
          />
        </div>

        <div className="form-item">
          <p>Warranty Left of the item</p>

          <Select
            options={warrantyYears}
            onChange={setWarrantyLeft}
            defaultValue={warrantyLeft}
            placeholder="the duration of the warranty left for the item"
            noOptionsMessage={() => "Not found!"}
            isSearchable
            isClearable
            required
            styles={{
              input: (baseStyles, state) => ({
                ...baseStyles,
                cursor: "text",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                cursor: "pointer",
              }),
              dropdownIndicator: (baseStyles, state) => ({
                ...baseStyles,
                cursor: "pointer",
              }),
              clearIndicator: (baseStyles, state) => ({
                ...baseStyles,
                cursor: "pointer",
                color: "red",
              }),
              noOptionsMessage: (baseStyles, state) => ({
                ...baseStyles,
                cursor: "pointer",
                color: "#e66b6b",
              }),
            }}
          />
        </div>

        <div className="form-item">
          <p>Description</p>
          <TextareaAutosize
            required
            className="textarea"
            placeholder="Write a brief description of the the item(mention the reason of selling if you wish)"
            name="description"
            value={description}
            onChange={handleOnChange}
          />
        </div>

        <div className="form-item">
          <p>Images of your item.</p>
          <span>The first image will be the cover image.</span>

          <input
            required
            type="file"
            name="images"
            onChange={handleOnChange}
            accept="image/jpg, image/png, image/jpeg"
            multiple
          />
        </div>

        <div className="specifications">
          <h3>Item's specifications </h3>
          <em>
            add the specification name of the items along with detail of that.
          </em>
          {detailsInputFields.map((inputField, index) => (
            <div key={index} className="fieldsWithButton">
              <div className="inputFields">
                <input
                  type="text"
                  name="nameOfTheDetail"
                  placeholder="name of the detail"
                  value={inputField.nameOfTheDetail}
                  onChange={(event) => handleDetailFormDataChange(index, event)}
                />
                <input
                  type="text"
                  name="detail"
                  placeholder="details"
                  value={inputField.detail}
                  onChange={(event) => handleDetailFormDataChange(index, event)}
                />
              </div>

              <button
                className="button"
                type="button"
                onClick={() => handleRemoveField(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="addMore"
            type="button"
            onClick={() => handleAddField()}
          >
            Add more
          </button>
        </div>

        <button type="submit" className="submit">
          Submit to Sell
        </button>
      </div>
    </form>
  );
};

export default ResellProductUpload;
