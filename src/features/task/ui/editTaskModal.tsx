'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { Category } from '@/entities/categories'
import { StatusList } from '@/entities/status'
import { Task } from '@/entities/task'
import { Button, Input, Select } from '@/shared/ui'

interface EditTaskProps {
  onClose?: () => void
  categories: Category[]
  task: Task
  onEditTask: (updatedTask: Task) => void
}

type EditTaskRef = {
  showModal: () => void
  close: () => void
}

interface TaskFormData {
  content: string
  status: string
  category: string
  date: string
}

export const EditTaskModal = forwardRef<EditTaskRef, EditTaskProps>(
  ({ onClose = () => {}, categories, task, onEditTask }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm<TaskFormData>({
      defaultValues: {
        content: task.content,
        status: task.status,
        category: task.category,
        date: task.created_at
      }
    })

    useImperativeHandle(ref, () => ({
      showModal: () => {
        reset({
          content: task.content,
          status: task.status,
          category: task.category,
          date: task.created_at
        })
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
      const updatedTask: Task = {
        ...task,
        content: data.content,
        status: data.status as Task['status'],
        category: data.category,
        created_at: data.date
      }

      onEditTask(updatedTask)
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
          <p className="text-xl font-bold mb-6">Edit Task</p>

          <div className="space-y-4 mb-6">
            <Controller
              name="content"
              control={control}
              rules={{ required: 'Task content is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="taskContent"
                  mode="secondary"
                  label="Task Content"
                  placeholder="Enter task content"
                  error={errors.content?.message}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              rules={{ required: 'Status is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="secondary"
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
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="secondary"
                  id="taskCategory"
                  label="Task Category"
                  options={categories.map(category => category.type)}
                  error={errors.category?.message}
                  placeholder="Choose category"
                />
              )}
            />

            <Controller
              name="date"
              control={control}
              rules={{ required: 'Date is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="taskDate"
                  mode="secondary"
                  label="Task Date"
                  placeholder="Enter task date"
                  type="date"
                  error={errors.date?.message}
                />
              )}
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" mode="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" mode="secondary">
              Save Changes
            </Button>
          </div>
        </form>
      </dialog>
    )
  }
)

EditTaskModal.displayName = 'EditTaskModal'
