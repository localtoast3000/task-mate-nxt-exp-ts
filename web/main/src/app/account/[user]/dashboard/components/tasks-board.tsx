import { Task } from '@/types/tasks';
import { useTasks } from '@/context/tasks';
import { format } from 'date-fns';
import { DateTimePicker } from 'shared.ui/components/form/exports';
import { useState, useRef } from 'react';

interface TaskCardProps extends Task {}

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

interface ModalElememt extends HTMLDialogElement {
  showModal: () => void;
}

function TaskCard({ ends, task, id }: TaskCardProps) {
  const { deleteTask } = useTasks();
  const modalRef = useRef<ModalElememt | null>(null);
  return (
    <>
      <div className='card w-full bg-base-300 shadow-xl flex-row py-[10px] px-[10px]'>
        <div className='card-body'>
          <p className='text-neutral'>{format(ends, 'dd/MM/yyyy HH:mm')}</p>
          <p className=''>{task}</p>
        </div>
        <div
          className='card-actions'
          onClick={() => {
            const modalElement = modalRef.current;
            if (!modalElement) return;
            modalElement.showModal();
          }}>
          <button className='btn bg-info'>edit</button>
          <button
            onClick={() => deleteTask(id)}
            className='btn bg-error'>
            delete
          </button>
        </div>
      </div>
      <EditTaskModal
        id={id}
        getRef={(ref) => (modalRef.current = ref)}
      />
    </>
  );
}

function EditTaskModal({
  id,
  getRef,
}: {
  id: string;
  getRef: (ref: any) => HTMLDivElement | null;
}) {
  return (
    <dialog
      ref={(ref) => getRef(ref)}
      id={`task-modal-${id}`}
      className='modal '>
      <div className='modal-box w-11/12 max-w-5xl'>
        <DateTimePicker />
        <div className='modal-action'>
          <form method='dialog'>
            <button className='btn btn-ghost'>Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
