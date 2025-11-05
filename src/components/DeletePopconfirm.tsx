"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeletePopconfirmProps {
  onConfirm: () => void;
  title?: string;
}

export function DeletePopconfirm({ onConfirm, title }: DeletePopconfirmProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Trash2
          className="w-4 h-4 text-red-500 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="right"
        className="w-auto p-3 rounded-md shadow-lg"
      >
        <p className="text-sm font-medium mb-3">
          {title ?? "Are you sure you want to delete this?"}
        </p>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            className="cursor-pointer"
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
