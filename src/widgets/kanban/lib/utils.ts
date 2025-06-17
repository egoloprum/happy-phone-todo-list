import { Task } from '@/entities/task'

export function getUniqueCategories(tasks: Task[]): string[] {
  const categoriesSet = new Set<string>()
  tasks.forEach(task => categoriesSet.add(task.category))
  return Array.from(categoriesSet)
}
