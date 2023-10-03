import { Task } from '@/types/tasks';
import { useTasks } from '@/context/tasks';
import { Form, DateInput } from 'shared.form/exports';
import { useRef, useState } from 'react';
import { format, addYears } from 'date-fns';

interface TaskCardProps extends Task {}

export default function TasksBoard() {
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
  const { editTask, tasks } = useTasks();
  const [trackedDate, setTracedDate] = useState(new Date());

  return (
    <dialog
      ref={(ref) => getRef(ref)}
      id={`task-modal-${id}`}
      className='modal'>
      <div className='modal-box w-11/12 max-w-5xl h-full flex flex-col'>
        <div className='self-start ml-auto'>
          <form method='dialog'>
            <button className='btn btn-ghost'>Close</button>
          </form>
        </div>
        <Form
          defaultValues={{
            'task-end-date': new Date(),
          }}
          onSubmit={({ values }: any) => {}}>
          <DateInput
            name='task-end-date'
            initialDate={trackedDate}
            onValueChange={(date) => setTracedDate(date)}
            controlled
            picker
            dateFormat='dd/MM/yyy HH:mm'
            pickerProps={{
              yearRange: [
                new Date().getFullYear(),
                addYears(new Date(), 27).getFullYear(),
              ],
              views: ['calendar', 'year'],
              disablePastDates: true,
              startWeekOnMonday: true,
              maxDate: addYears(new Date(), 10),
            }}
          />
          <button
            className='btn btn-success'
            type='submit'>
            Submit
          </button>
        </Form>
        <div className=''></div>
      </div>
    </dialog>
  );
}
