"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddAuthorMutation, useUpdateAuthorMutation } from "@/Api/authorsApi";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";
import type { Author } from "@/Api/authorsApi";

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  author?: Author | null;   // ✅ null when adding, data when editing
}

export default function AuthorModal({ isOpen, onClose, author }: AuthorModalProps) {
  const isEdit = !!author;

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    image_url: "",
  });

  const [addAuthor, { isLoading: adding }] = useAddAuthorMutation();
  const [updateAuthor, { isLoading: updating }] = useUpdateAuthorMutation();

  // ✅ Pre-fill form when editing
  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name ?? "",
        bio: author.bio ?? "",
        email: author.email ?? "",
        image_url: author.image_url ?? "",
      });
    } else {
      setFormData({ name: "", bio: "", email: "", image_url: "" });
    }
  }, [author]);

   useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", bio: "", email: "", image_url: "" });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateAuthor({
          id: author!.id,
          updates: {
            name: formData.name,
            bio: formData.bio,
            email: formData.email,
            image_url: formData.image_url || null,
          },
        }).unwrap();
        toast.success("Author updated ✅");
      } else {
        await addAuthor({
          name: formData.name,
          bio: formData.bio,
          email: formData.email,
          image_url: formData.image_url || null,
        }).unwrap();
        toast.success("Author added ✅");
      }

      onClose();
    } catch (err) {
      console.error("Save author error:", err);
      toast.error("❌ Something went wrong!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-black">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Author" : "Add New Author"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Author name"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <Textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Short biography..."
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="author@example.com"
              required
            />
          </div>

          {/* Image Upload (inline preview built-in) */}
          <div>
            <label className="block text-sm font-medium mb-2">Profile Image</label>
            <ImageUpload
              bucket="authors"
              value={formData.image_url} // ✅ show existing image in edit mode
              onUploadComplete={(url) =>
                setFormData({ ...formData, image_url: url })
              }
            />
          </div>

          {/* Footer */}
          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={adding || updating}>
              {adding || updating
                ? isEdit
                  ? "Saving..."
                  : "Adding..."
                : isEdit
                ? "Save Changes"
                : "Add Author"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
