"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, Loader2, X } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  bucket?: string;
  onUploadComplete?: (url: string) => void;
  value?: string | null; // ✅ add this for edit mode
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  bucket = "stories",
  onUploadComplete,
  value,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);

  // ✅ initialize existing image when editing
  useEffect(() => {
    if (value) setUploadedImagePath(value);
  }, [value]);

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setLoading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error } = await supabase.storage.from(bucket).upload(fileName, file);
      if (error) throw error;

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      const imageUrl = data.publicUrl;

      setUploadedImagePath(imageUrl);
      onUploadComplete?.(imageUrl);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) await handleImageUpload(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const removeImage = () => {
    setUploadedImagePath(null);
    onUploadComplete?.("");
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-lg cursor-pointer overflow-hidden transition group",
          uploadedImagePath
            ? "border-border hover:border-destructive"
            : "border-border/50 hover:border-primary/50 bg-muted/10"
        )}
      >
        <input {...getInputProps()} />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin mb-2" />
            <p className="text-sm font-medium">Uploading image...</p>
          </div>
        ) : uploadedImagePath ? (
          <div className="relative w-full h-48">
            <Image
              src={uploadedImagePath}
              alt="Uploaded preview"
              fill
              className="object-cover rounded-md transition group-hover:opacity-80"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-md hover:bg-black/80 transition"
              title="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <CloudUpload className="w-8 h-8 mb-2" />
            <p className="text-sm font-medium">Click or drag image to upload</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
