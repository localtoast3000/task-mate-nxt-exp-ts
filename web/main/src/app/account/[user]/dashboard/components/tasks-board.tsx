import { Task } from '@/types/tasks';
import { useTasks } from '@/context/tasks';
import { DateTimePicker, DateLib } from 'shared.ui/components/form/exports';
import { useState, useRef } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  getDaysInMonth,
  parse,
  isBefore,
  isSameMonth,
  isAfter,
} from 'date-fns';

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
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  return (
    <dialog
      ref={(ref) => getRef(ref)}
      id={`task-modal-${id}`}
      className='modal '>
      <div className='modal-box w-11/12 max-w-5xl h-full flex flex-col'>
        <div className='self-start ml-auto'>
          <form method='dialog'>
            <button className='btn btn-ghost'>Close</button>
          </form>
        </div>
        <div>
          <DateTimePicker
            dateLib={dateFnsMethods()}
            selectedDate={date}
            onChange={(newDate) => setDate(newDate)}
            disablePastDates={true}
            yearRange={[new Date().getFullYear(), 2100]}
            startWeekOnMonday
          />
        </div>
        <div className=''></div>
      </div>
    </dialog>
  );
}

function dateFnsMethods() {
  return {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    getDaysInMonth,
    parse,
    isBefore,
    isSameMonth,
    isAfter,
  } as DateLib;
}
