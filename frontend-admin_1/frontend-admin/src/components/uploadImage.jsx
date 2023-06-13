// import { useState, useRef, useEffect } from "react";

// // drag drop file component
// export default function UploadImg({
//   imgClass,
//   containerClass,
//   setImg,
//   oldImg,
//   setMultiple,
//   dimension,
//   dropClass,
// }) {
//   // drag state
//   const [dragActive, setDragActive] = useState(false);

//   const multiple = setMultiple;
//   // ref
//   const inputRef = useRef(null);

//   const [count, setCount] = useState(5);

//   const [selectedImage, setSelectedImage] = useState();

//   useEffect(() => {
//     if (oldImg) {
//       setSelectedImage(oldImg);
//     }
//   }, [selectedImage]);

//   const handleImg = (e) => {
//     if (e) {
//       const imgArray = e;

//       if (multiple === true) {
//         setSelectedImage((prevImages) => prevImages.concat(imgArray));
//         console.log(selectedImage);
//       }
//       if (multiple === false) {
//         setSelectedImage(imgArray);
//         console.log(selectedImage);
//         setImg(imgArray);
//       }
//       // setSelectedImage(e[0]);
//     }
//   };

//   // triggers when file is selected with click
//   const handleChange = function (e) {
//     // e.preventDefault();
//     // if (e.target.files && e.target.files[0]) {
//     //   handleImg(e.target.files);
//     //   setCount(count + 1);

//     //   console.log(selectedImage);
//     // }
//     const formData = new FormData();
//     handleImg(formData);

//     formData.append("image", selectedImage);
//   };

//   let ref = useRef();

//   const showImage = (source) => {
//     return source?.map((image) => {
//       const removeImg = () => {
//         source?.splice(source?.indexOf(image), 1);
//         setCount(count - 1);
//         // console.log(source);
//       };

//       const ImgMenu = () => {
//         const [show, setShow] = useState(false);

//         return (
//           <>
//             <button onClick={() => setShow(!show)}>...</button>
//             {show ? (
//               <>
//                 <ul ref={ref}>
//                   <li
//                     onClick={() => {
//                       removeImg();
//                     }}
//                   >
//                     Delete
//                   </li>
//                 </ul>
//               </>
//             ) : (
//               ""
//             )}
//           </>
//         );
//       };

//       return (
//         <div id={`ad-image-${source.indexOf(image)}`}>
//           {source?.includes(image) && count > 1 ? (
//             <>
//               <div className="img-head">
//                 <h1 className="img-title">Image {source.indexOf(image) + 1}</h1>

//                 <ImgMenu />
//               </div>
//               <img
//                 src={image}
//                 alt=""
//                 key={source.indexOf(image)}
//                 className={`ad-img ${imgClass}`}
//               />
//             </>
//           ) : (
//             ""
//           )}
//         </div>
//       );
//     });
//   };

//   // handle drag events
//   const handleDrag = function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   // triggers when file is dropped
//   const handleDrop = function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleImg(e.dataTransfer.files);
//     }
//   };

//   // triggers the input when the button is clicked
//   const onButtonClick = () => {
//     inputRef.current.click();
//   };

//   return (
//     <div className={`add-ad ${containerClass}`}>
//       {showImage(selectedImage)}

//       <div className={`drop-img ${dropClass}`} onDragEnter={handleDrag}>
//         <input
//           ref={inputRef}
//           type="file"
//           className="input-f"
//           id="input-file-upload"
//           onChange={handleChange}
//         />
//         <label
//           id="label-file-upload"
//           htmlFor="input-file-upload"
//           className={dragActive ? "drag-active" : ""}
//         >
//           <div className="upload">
//             <h3>Drag and drop files here</h3>
//             <p>Files supported: Png, Jpg, Pdf </p>
//             <button className="upload-button" onClick={onButtonClick}>
//               Choose file
//             </button>
//             <p>Maximum size: 500Kb, Dimension: {dimension} px</p>
//           </div>
//         </label>
//         {dragActive && (
//           <div
//             id="drag-file-element"
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//           ></div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const UploadImg = ({
  imgClass,
  containerClass,
  uploadBtn,
  setImg,
  oldImg,
  product,
  dimension,
  dropClass,
}) => {
  const ImagePreview = ({ images, onUpdate, onDelete, imgClass }) => {
    const actionsRef = useRef([]);

    const handleImageChange = (index, e) => {
      const newImage = e.target.files[0];
      onUpdate(index, newImage);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          !actionsRef.current.some((ref) => ref && ref.contains(event.target))
        ) {
          setShowActions(Array(images.length).fill(false));
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [images.length]);

    const [showActions, setShowActions] = useState(
      Array(images.length).fill(false)
    );

    const toggleActions = (index) => {
      setShowActions((prevShowActions) => {
        const updatedShowActions = [...prevShowActions];
        updatedShowActions[index] = !updatedShowActions[index];
        return updatedShowActions;
      });
    };

    return (
      <>
        {images.map((url, index) => (
          <div key={index} id={`ad-image-${index}`}>
            <div className="img-head">
              <h1 className="img-title">Image {index + 1}</h1>
              <button
                onClick={() => toggleActions(index)}
                ref={(ref) => (actionsRef.current[index] = ref)}
              >
                ...
              </button>
              <ul
                className={`actions ${
                  showActions[index] ? "show-div" : "hide-div"
                }`}
              >
                <input
                  type="file"
                  onChange={(e) => handleImageChange(index, e)}
                  className="input-f"
                  id={`updateImg-${index}`}
                />
                <li>
                  <label
                    htmlFor={`updateImg-${index}`}
                    className="updateImg-label"
                  >
                    Update
                  </label>
                </li>
                <hr />
                <li onClick={() => onDelete(index)}>Delete</li>
              </ul>
            </div>
            <img
              src={url}
              alt={`Image ${index + 1}`}
              className={`ad-img ${imgClass}`}
            />
          </div>
        ))}
      </>
    );
  };
  console.log(product);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [showActions, setShowActions] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    if (oldImg) {
      setSelectedImages(oldImg);
    }

    if (product) {
      console.log("sadfg");
      console.log(selectedImages);
      setImg(selectedImages);
    }
  }, [selectedImages]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files]);

    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previewURLs]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    setSelectedImages([...selectedImages, ...files]);

    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previewURLs]);
  };

  const handleUpdate = (index, newImage) => {
    const updatedImages = [...selectedImages];
    const updatedPreviews = [...previewImages];

    updatedImages[index] = newImage;
    updatedPreviews[index] = URL.createObjectURL(newImage);

    setSelectedImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const handleDelete = (index) => {
    const updatedImages = [...selectedImages];
    const updatedPreviews = [...previewImages];

    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setSelectedImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });

      await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear selected images and preview
      setSelectedImages([]);
      setPreviewImages([]);

      console.log("Images uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload images:", error);
    }
  };

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className={`add-ad ${containerClass}`}>
      {previewImages.length > 0 && (
        <div className="ad-image-container">
          <ImagePreview
            images={previewImages}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            showActions={showActions}
            imgClass={imgClass}
          />
          {/* <button onClick={toggleActions}>
            {showActions ? "Hide Actions" : "Show Actions"}
          </button> */}
        </div>
      )}
      <div className={`drop-img ${dropClass}`}>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="input-f"
          id="input-file-upload"
          ref={inputRef}
        />

        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={`drag-active`}
        >
          <div
            className="upload"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <h3>Drag and drop files here</h3>
            <p>Files supported: Png, Jpg, Pdf </p>
            <button className="upload-button" onClick={onButtonClick}>
              Choose file
            </button>
            <p>Maximum size: 500Kb, Dimension: {dimension} px</p>
          </div>
        </label>
      </div>

      {selectedImages.length > 0 && uploadBtn ? (
        <button onClick={handleUpload}>Upload Images</button>
      ) : (
        ""
      )}
    </div>
  );
};

export default UploadImg;
