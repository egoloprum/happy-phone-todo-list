import { Category } from '@/entities/categories/type'
import { Task } from '@/entities/task/type'

export const InitialTasks: Task[] = [
  {
    id: 1,
    content: 'Complete the project report',
    status: 'New task',
    category: 'Work',
    created_at: '2023-10-01'
  },
  {
    id: 2,
    content: 'Schedule a meeting with the team',
    status: 'Scheduled',
    category: 'Work',
    created_at: '2023-10-02'
  },
  {
    id: 3,
    content: 'Finish the design mockups',
    status: 'In progress',
    category: 'Design',
    created_at: '2023-10-03'
  },
  {
    id: 4,
    content: 'Review the budget proposal',
    status: 'Completed',
    category: 'Finance',
    created_at: '2023-10-04'
  },
  {
    id: 5,
    content: 'Update the website content',
    status: 'New task',
    category: 'Marketing',
    created_at: '2023-10-05'
  },
  {
    id: 6,
    content: 'Prepare for the client presentation',
    status: 'Scheduled',
    category: 'Work',
    created_at: '2023-10-06'
  },
  {
    id: 7,
    content: 'Conduct user testing for the app',
    status: 'In progress',
    category: 'Development',
    created_at: '2023-10-07'
  },
  {
    id: 8,
    content: 'Finalize the marketing strategy',
    status: 'Completed',
    category: 'Marketing',
    created_at: '2023-10-08'
  },
  {
    id: 9,
    content: 'Write the blog post for this month',
    status: 'New task',
    category: 'Content',
    created_at: '2023-10-09'
  },
  {
    id: 10,
    content: 'Analyze the survey results',
    status: 'Scheduled',
    category: 'Research',
    created_at: '2023-10-10'
  }
]

export const InitialCategories: Category[] = [
  {
    id: 1,
    type: 'Work'
  },
  {
    id: 2,
    type: 'Design'
  },
  {
    id: 3,
    type: 'Finance'
  },
  {
    id: 4,
    type: 'Marketing'
  },
  {
    id: 5,
    type: 'Development'
  },
  {
    id: 6,
    type: 'Content'
  },
  {
    id: 7,
    type: 'Research'
  }
]

export const StatusList = ['New task', 'Scheduled', 'In progress', 'Completed']
