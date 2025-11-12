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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useAddStoryMutation, useUpdateStoryMutation } from "@/Api/storiesApi";
import { useGetAuthorsQuery } from "@/Api/authorsApi";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload";
import type { Story } from "@/Api/storiesApi";

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story?: Story | null;
}

export default function StoryModal({
  isOpen,
  onClose,
  story,
}: StoryModalProps) {
  const isEdit = !!story;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image_url: "",
  });

  const { data: authors = [] } = useGetAuthorsQuery();
  const [addStory, { isLoading: adding }] = useAddStoryMutation();
  const [updateStory, { isLoading: updating }] = useUpdateStoryMutation();

  // ✅ Prefill data when editing or reset when adding
  useEffect(() => {
    if (story) {
      setFormData({
        title: story.title ?? "",
        content: story.content ?? "",
        author: story.author_id ?? "",
        image_url: story.image_url ?? "",
      });
    } else {
      setFormData({ title: "", content: "", author: "", image_url: "" });
    }
  }, [story, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateStory({
          id: story!.id,
          updates: {
            title: formData.title,
            content: formData.content,
            author_id: formData.author,
            image_url: formData.image_url || null,
          },
        }).unwrap();

        toast.success("Story updated ✅");
      } else {
        await addStory({
          title: formData.title,
          content: formData.content,
          author_id: formData.author,
          image_url: formData.image_url || null,
        }).unwrap();
        toast.success("Story added ✅");
      }

      onClose();
    } catch (err) {
      console.error("Failed to save story:", err);
      toast.error("❌ Something went wrong!");
    }
  };
   useEffect(() => {
    if (!isOpen) {
      setFormData({ title: "", content: "", author: "", image_url: "" });
    }
  }, [isOpen]);

  const handleClose = () => {
    setFormData({ title: "", content: "", author: "", image_url: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[800px] bg-black"
        onInteractOutside={(e) => e.preventDefault()} // prevent accidental close when clicking backdrop
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Story" : "Add New Story"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <Input
            placeholder="Story title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="border border-input w-full"
          />

          {/* Author */}
          <Select
            value={formData.author}
            onValueChange={(val) => setFormData({ ...formData, author: val })}
          >
            <SelectTrigger className="w-full border border-input">
              <SelectValue placeholder="Select author..." />
            </SelectTrigger>
            <SelectContent>
              {authors.map((author) => (
                <SelectItem key={author.id} value={author.id}>
                  {author.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Content */}
          <Textarea
            placeholder="Enter story content..."
            rows={4}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
            className="border border-input w-full"
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Story Image
            </label>

            <ImageUpload
              bucket="stories"
              value={formData.image_url}
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
              onClick={handleClose}
              className="border"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={adding || updating} className="cursor-pointer">
              {adding || updating
                ? isEdit
                  ? "Saving..."
                  : "Adding..."
                : isEdit
                ? "Save Changes"
                : "Add Story"}
                
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
