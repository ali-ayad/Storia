"use client"

import { FC, useState } from "react"
import Modal from "@/components/ui/modal"
import StoryForm from "@/components/dashboard/forms/StoryForm"

interface AddStoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
}

const AddStoryModal: FC<AddStoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error("Error saving story:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreview = () => {
    console.log("Preview story")
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Story"
      size="xl"
    >
      <StoryForm
        onSubmit={handleSubmit}
        onPreview={handlePreview}
        isSubmitting={isSubmitting}
        submitLabel="Create Story"
      />
    </Modal>
  )
}

export default AddStoryModal
