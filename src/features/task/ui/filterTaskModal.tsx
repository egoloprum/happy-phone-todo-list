'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { Category } from '@/entities/categories'
import { StatusList } from '@/entities/status'
import { Button, Select } from '@/shared/ui'

interface FilterTaskModalProps {
  onClose?: () => void
  categories: Category[]
}

type FilterTaskModalRef = {
  showModal: () => void
  close: () => void
}

interface TaskFormData {
  status: string
  category: string
}

export const FilterTaskModal = forwardRef<
  FilterTaskModalRef,
  FilterTaskModalProps
>(({ onClose = () => {}, categories }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TaskFormData>({
    defaultValues: {
      status: '',
      category: ''
    }
  })

  useImperativeHandle(ref, () => ({
    showModal: () => {
      reset()
      dialogRef.current?.classList.remove('closing')
      dialogRef.current?.classList.add('opening')
      dialogRef.current?.showModal()
    },
    close: () => {
      dialogRef.current?.classList.remove('opening')
      dialogRef.current?.classList.add('closing')
      setTimeout(() => {
        dialogRef.current?.close()
        dialogRef.current?.classList.remove('closing')
      }, 500)
    }
  }))

  const onSubmit = (data: TaskFormData) => {
    const params = new URLSearchParams(searchParams.toString())

    if (data.status) {
      params.set('status', data.status)
    } else {
      params.delete('status')
    }
    if (data.category) {
      params.set('category', data.category)
    } else {
      params.delete('category')
    }

    router.push(`${pathname}?${params.toString()}`)
    onClose()
  }

  return (
    <dialog
      className="w-[95%] max-w-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 outline-0 border-0 rounded-xl bg-white shadow-xl"
      ref={dialogRef}
      onClick={e => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
      onCancel={e => {
        e.preventDefault()
        onClose()
      }}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <p className="text-xl font-bold mb-6">Filter Tasks</p>
        <p className="mb-4">
          To remove filtering, press Continue button without selecting any
          filter.
        </p>

        <div className="space-y-4 mb-6">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="primary"
                id="taskStatus"
                label="Task Status"
                options={StatusList}
                error={errors.status?.message}
                placeholder="Choose status"
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="primary"
                id="taskCategory"
                label="Task Category"
                options={categories.map(category => category.type)}
                error={errors.category?.message}
                placeholder="Choose category"
              />
            )}
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button type="button" mode="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" mode="primary">
            Continue
          </Button>
        </div>
      </form>
    </dialog>
  )
})

FilterTaskModal.displayName = 'FilterTaskModal'
