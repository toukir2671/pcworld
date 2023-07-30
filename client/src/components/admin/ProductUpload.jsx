import { useState } from "react";
import "./admin.scss";
import uuid from "react-uuid";
import { db, storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Select from "react-select";
import { options } from "./productOptions";

const initialDescriptions = {
  productName: "",
  productPrice: "",
  specialPrice: "",
  productId: "",
  brand: "",
  productModel: "",
  warranty: "",
  images: {},
};

const ProductUpload = () => {
  const [formDataForDescriptions, setFormDataForDescriptions] =
    useState(initialDescriptions);

  const [detailsInputFields, setDetailsInputFields] = useState([
    { nameOfTheDetail: "", detail: "" },
  ]);

  const [whatProduct, setWhatProduct] = useState(null);

  const {
    productName,
    productPrice,
    specialPrice,
    productId,
    brand,
    productModel,
    warranty,
    images,
  } = formDataForDescriptions;

  //handling the inputs of the form fields for files(images) and other product description data
  const handleOnChange = (e) => {
    if (e.target.files) {
      setFormDataForDescriptions((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    } else if (!e.target.files) {
      setFormDataForDescriptions((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // handling the inputs of the form fields for additional product features
  const handleDetailFormDataChange = (index, event) => {
    const values = [...detailsInputFields];
    values[index][event.target.name] = event.target.value;
    setDetailsInputFields(values);
  };

  //handling the add more button to add input fields dynamically according to the needs to upload the details of the product features
  const handleAddField = () => {
    setDetailsInputFields([
      ...detailsInputFields,
      { nameOfTheDetail: "", detail: "" },
    ]);
  };

  //this is to remove any of the added input field if necessary
  const handleRemoveField = (index) => {
    const values = [...detailsInputFields];
    values.splice(index, 1);
    setDetailsInputFields(values);
  };

  //handling the form submissions, meaning when the form is submitted, uploading all the data of the form to firebase
  const handleSubmit = async (e) => {
    e.preventDefault();

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const fileName = `${Date.now()}-${image.name}-${uuid()}`;
        const storageRef = ref(storage, `productsImage/${fileName}`);

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

    const formDataForDescriptionsCopy = {
      ...formDataForDescriptions,
      detailsInputFields,
      imgUrls,
      whatProduct:
        whatProduct && whatProduct.value.replace(/\s+/g, "-").toLowerCase(),
      timestamp: serverTimestamp(),
    };

    delete formDataForDescriptionsCopy.images;

    await addDoc(collection(db, "products"), formDataForDescriptionsCopy);
    setFormDataForDescriptions(initialDescriptions);
    toast.success("Product added successfully");
  };

  return (
    <>
      <div className="productUpload">
        <h1>Add Product</h1>
        <form className="product-upload-form" onSubmit={handleSubmit}>
          <div className="form-item">
            <p>What product is it?</p>
            <Select
              options={options}
              onChange={setWhatProduct}
              defaultValue={whatProduct}
              placeholder="what is the product?"
              noOptionsMessage={() =>
                "Not found! Please search for a valid product."
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
            <p>Product Name</p>
            <input
              required
              type="text"
              placeholder="Name of the product"
              name="productName"
              value={productName}
              onChange={handleOnChange}
            />
          </div>

          <div className="form-item">
            <p>Product Price</p>
            <input
              required
              type="number"
              placeholder="price of the product"
              name="productPrice"
              value={productPrice}
              onChange={handleOnChange}
            />
          </div>

          <div className="form-item">
            <p>Special Price</p>
            <input
              required
              type="number"
              placeholder="special price of the product"
              name="specialPrice"
              value={specialPrice}
              onChange={handleOnChange}
            />
          </div>

          <div className="form-item">
            <p>Product Id</p>
            <input
              required
              type="text"
              placeholder="product id"
              name="productId"
              value={productId}
              onChange={handleOnChange}
            />
          </div>

          <div className="form-item">
            <p>Brand</p>
            <input
              required
              type="text"
              placeholder="brand name of the product"
              name="brand"
              value={brand}
              onChange={handleOnChange}
            />
          </div>

          <div className="form-item">
            <p>Product Model</p>
            <input
              required
              type="text"
              placeholder="model of the product"
              name="productModel"
              value={productModel}
              onChange={handleOnChange}
            />
          </div>

          <div className="form-item">
            <p>Warranty</p>
            <input
              required
              type="text"
              placeholder="duration of the warranty"
              name="warranty"
              value={warranty}
              onChange={handleOnChange}
            />
          </div>

          <div className="form-item">
            <p>Images</p>
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
            <h3>Specifications</h3>
            {detailsInputFields.map((inputField, index) => (
              <div key={index} className="fieldsWithButton">
                <div className="inputFields">
                  <input
                    type="text"
                    name="nameOfTheDetail"
                    placeholder="name of the detail"
                    value={inputField.nameOfTheDetail}
                    onChange={(event) =>
                      handleDetailFormDataChange(index, event)
                    }
                  />
                  <input
                    type="text"
                    name="detail"
                    placeholder="details"
                    value={inputField.detail}
                    onChange={(event) =>
                      handleDetailFormDataChange(index, event)
                    }
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
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductUpload;
