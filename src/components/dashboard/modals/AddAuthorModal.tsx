"use client"

import { FC, useState } from "react"
import Modal from "@/components/ui/modal"
import AuthorForm from "@/components/dashboard/forms/AuthorForm"

interface AddAuthorModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
}

const AddAuthorModal: FC<AddAuthorModalProps> = ({
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
      console.error("Error saving author:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Author"
      size="lg"
    >
      <AuthorForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Create Author"
      />
    </Modal>
  )
}

export default AddAuthorModal
