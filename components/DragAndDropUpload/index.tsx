import React, { DragEvent, ChangeEvent } from "react";
import styles from "./DragAndDrop.module.css";
import PlusIcon from "@/public/icons/plus.svg";
import CrossIcon from "@/public/icons/cross.svg";
import { DragAndDropProps } from "@/constants/types";
import Image from "next/image";
import { heicPreview } from "@/api/image-manager/heicPreview";
import Spinner from "../Spinner";

const DragAndDrop: React.FC<DragAndDropProps> = ({
  onFileSelect,
  acceptedFormats = "image/*, .heic", // Accept all image types + .heic
  maxFileSizeMB,
  height = "260px",
  borderColor = "var(--red-200)",
  textColor = "black",
  selectedImage,
  onRemoveImage,
  error,
  id,
}) => {
  const [dragging, setDragging] = React.useState<boolean>(false);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = React.useState<boolean>(false);
  const [heicPreviewImage, setHeicPreviewImage] = React.useState<string|null>(null);

  const isSafari =
    typeof window !== "undefined" &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = async (file: File | undefined) => {
    setIsPreviewLoading(false)
    if (!file) return;
    const isHeic = file.name.toLocaleLowerCase().endsWith('.heic')
    if (isHeic && !isSafari) {
      setIsPreviewLoading(true);
      const previewImage = await heicPreview().create(file);
      setIsPreviewLoading(false);
      setHeicPreviewImage(previewImage)
    }

    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setImageError(`File size exceeds ${maxFileSizeMB}MB.`);
      onFileSelect(null);
      return;
    }

    setImageError(null);
    onFileSelect(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  return (
    <div>
      <div
        className={`${styles.dropArea} ${
          dragging ? styles.dragging : ""
        } d-flex justify-content-center align-items-center position-relative cursor-pointer text-center`}
        style={{ height, borderColor }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById(id)?.click()}
      >
        <input
          type="file"
          id={id}
          accept={acceptedFormats}
          style={{ display: "none" }}
          onChange={handleChange}
        />
        {selectedImage ? (
          <div className="position-relative w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden">
            {heicPreviewImage ? (
              // Show a placeholder image for .heic files in non-Safari browsers
              <Image className="h-100 mx-auto"
                src={heicPreviewImage} // Path to your placeholder image
                alt="Selected"
                width={0}
                height={0}
                style={{ height: '100%', width: 'auto' }} 
              />
            ) : (
              <Image className="h-100 mx-auto"
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                width={0}
                height={0}
                style={{ height: '100%', width: 'auto' }} 
              />
            )}
            <CrossIcon onClick={(e:any)=>{e.preventDefault(); e.stopPropagation(); if (onRemoveImage) onRemoveImage()}} className={styles.crossIcon} />
          </div>
        ) : (!isPreviewLoading &&
          <div>
            <div className={`${styles.content} d-flex align-items-center`}>
              <PlusIcon className="logoStroke" />
              <p>
                Drag file here or <span>Click to browse</span>
              </p>
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
          </div>
        )}

        {isPreviewLoading && <Spinner></Spinner>}
      </div>
      {imageError && <p className={styles.errorText}>{imageError}</p>}
      <div className={`${styles.info} d-flex justify-content-center`}>
        <p>Supported ext. : JPG, JPEG, PNG, HEIC, BMP, TIFF, WebP and more.</p>
        <p>Max file size {maxFileSizeMB}MB</p>
      </div>
    </div>
  );
};

export default DragAndDrop;
