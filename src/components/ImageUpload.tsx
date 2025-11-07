"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/lib/supabaseClient";

interface ImageUploadProps {
  bucket?: string; 
  onUploadComplete?: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  bucket = "stories", 
  onUploadComplete,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);

  // 🔹 Upload to Supabase Storage
  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setLoading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;
      setUploadedImagePath(imageUrl);

      if (onUploadComplete) onUploadComplete(imageUrl);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) handleImageUpload(image);
  };

  // 🔹 Handle drag-drop
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      await handleImageUpload(acceptedFiles[0]);
    }
  }, [bucket]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true });

  const removeSelectedImage = () => {
    setUploadedImagePath(null);
  };

  return (
    <div className="space-y-3 h-full">
      <div {...getRootProps()} className="h-full">
        <label
          htmlFor="dropzone-file"
          className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer dark:bg-gray-700 dark:border-gray-600  transition"
        >
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
              <p className="text-sm font-medium text-gray-600">
                Uploading image...
              </p>
            </div>
          ) : !uploadedImagePath ? (
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <CloudUpload size="1.6em" />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Drag or click to upload</span>
              </p>
             
            </div>
          ) : (
            <div className="text-center space-y-2">
              <Image
                width={1000}
                height={1000}
                src={uploadedImagePath}
                className="w-full object-contain max-h-32 rounded-md border"
                alt="uploaded image"
              />
              <p className="text-sm font-semibold text-gray-600">
                Image Uploaded
              </p>
            </div>
          )}
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
          disabled={loading || !!uploadedImagePath}
          onChange={handleImageChange}
        />
      </div>

      {!!uploadedImagePath && (
        <div className="flex items-center justify-between">
          <Link
            href={uploadedImagePath}
            className="text-gray-500 text-xs hover:underline"
          >
            View uploaded image
          </Link>

          <Button
            onClick={removeSelectedImage}
            type="button"
            variant="secondary"
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
