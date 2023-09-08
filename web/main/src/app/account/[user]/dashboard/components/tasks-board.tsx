import { Task } from '@/types/tasks';
import { useTasks } from '@/context/tasks';

interface TaskProps extends Task {}

export default function TaskBoard() {
  const { tasks } = useTasks();

  return (
    <div className='flex flex-col gap-[10px] mt-[20px]'>
      {tasks.map((task, idx) => (
        <TaskCard
          key={idx}
          {...task}
        />
      ))}
    </div>
  );
}

function TaskCard({ ends, task, id }: TaskProps) {
  const { deleteTask } = useTasks();
  return (
    <div className='card w-full bg-base-300 shadow-xl flex-row py-[10px] px-[10px]'>
      <div className='card-body'>
        <p className='text-neutral'>{ends}</p>
        <p className=''>{task}</p>
      </div>
      <div className='card-actions'>
        <button className='btn bg-info'>edit</button>
        <button
          onClick={() => deleteTask(id)}
          className='btn bg-error'>
          delete
        </button>
      </div>
    </div>
  );
}
