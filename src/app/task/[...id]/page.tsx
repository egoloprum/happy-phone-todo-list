import { TaskDetail } from '@/widgets/task'

interface pageProps {
  params: {
    id: string
  }
}

const page = async ({ params }: { params: Promise<pageProps['params']> }) => {
  const resolvedParams = await params
  const { id } = resolvedParams

  return (
    <div className="min-h-[100vh] p-4 flex justify-center">
      <TaskDetail taskId={id} />
    </div>
  )
}

export default page
