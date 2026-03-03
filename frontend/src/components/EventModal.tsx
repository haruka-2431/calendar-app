import { useState, useEffect } from "react";
import { format } from "date-fns";

interface CalendarEvent {
  id: number | null;
  title: string;
  startDateTime: string;
  endDateTime: string;
  category: string;
}

interface EventModalProps {
  targetEvent: CalendarEvent;
  onModalClose: () => void;
  setTargetEvent: React.Dispatch<React.SetStateAction<CalendarEvent>>;
  addEvent: (
    title: string,
    startDateTime: string,
    endDateTime: string,
    category: string,
  ) => void;
  editEvent: (
    id: number | null,
    title: string,
    startDateTime: string,
    endDateTime: string,
    category: string,
  ) => void;
  deleteEvent: (id: number | null) => void;
}

const EventModal = (props: EventModalProps) => {
  const today = new Date();
  const todayFormat = format(today, "yyyy-MM-dd");
  const initData = {
    title: "",
    date: todayFormat,
    startTime: "00:00",
    endTime: "00:00",
    category: "personal",
  };
  const [form, setForm] = useState(initData);
  const hasTargetEventId = !!props.targetEvent.id; // 対象のイベントがあればtrue

  useEffect(() => {
    const { title, startDateTime, endDateTime } = props.targetEvent;

    if (hasTargetEventId) {
      const targetStartDate = new Date(startDateTime);
      const targetEndDate = new Date(endDateTime);

      // 選択したイベントの日付、開始時間、終了時間
      const targetDateFormat = format(targetStartDate, "yyyy-MM-dd");
      const targetStartTime = format(targetStartDate, "HH:mm");
      const targetEndTime = format(targetEndDate, "HH:mm");

      setForm({
        title: title,
        date: targetDateFormat,
        startTime: targetStartTime,
        endTime: targetEndTime,
        category: props.targetEvent.category,
      });
    } else {
      setForm(initData);
    }
  }, [props.targetEvent]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleClose = () => {
    props.onModalClose();
    setForm(initData);
    props.setTargetEvent({
      id: null,
      title: "",
      startDateTime: "",
      endDateTime: "",
      category: "personal",
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { title, date, startTime, endTime, category } = form;
    const startDateTime = `${date} ${startTime}`;
    const endDateTime = `${date} ${endTime}`;

    if (title === "") {
      e.preventDefault();
      return alert("予定タイトルを入力してください");
    } else if (startTime >= endTime) {
      e.preventDefault();
      return alert("終了時間を開始時間より前に設定してください");
    }

    if (hasTargetEventId) {
      props.editEvent(
        props.targetEvent.id,
        title,
        startDateTime,
        endDateTime,
        category,
      );
    } else {
      props.addEvent(title, startDateTime, endDateTime, category);
    }

    handleClose();
  };

  const handleDelete = () => {
    props.deleteEvent(props.targetEvent.id);
    handleClose();
  };

  return (
    <dialog id="modal" className="modal">
      <div className="modal-box w-full max-w-md">
        <form method="dialog">
          <h3 className="text-2xl font-bold">予定の追加</h3>
          <input
            type="text"
            placeholder="予定タイトル"
            className="input input-bordered mt-2 w-full"
            name="title"
            value={form.title}
            onChange={handleInputChange}
          />

          <div className="mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <input
              type="date"
              className="input input-bordered mt-2 w-full"
              name="date"
              value={form.date}
              onChange={handleInputChange}
            />

            <div className="mt-3 flex items-center gap-2">
              <TimeSelect
                name="startTime"
                value={form.startTime}
                onChange={handleInputChange}
              />
              <span>-</span>
              <TimeSelect
                name="endTime"
                value={form.endTime}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-3">
            <select
              className="select select-bordered w-full"
              name="category"
              value={form.category}
              onChange={handleInputChange}
            >
              <option value="work">仕事</option>
              <option value="personal">プライベート</option>
              <option value="other">その他</option>
            </select>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            {hasTargetEventId ? (
              <>
                <button
                  className="btn btn-neutral text-white"
                  onClick={handleDelete}
                >
                  削除
                </button>
                <button
                  className="btn btn-primary text-white"
                  type="submit"
                  onClick={handleSubmit}
                >
                  編集
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-neutral text-white"
                  onClick={handleClose}
                >
                  取り消し
                </button>
                <button
                  className="btn btn-primary text-white"
                  type="submit"
                  onClick={handleSubmit}
                >
                  追加
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </dialog>
  );
};

interface TimeSelectProps {
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}
const TimeSelect = (props: TimeSelectProps) => {
  const elements = [];
  let keyNum = 0;

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      elements.push(
        <option key={keyNum} value={time}>
          {time}
        </option>,
      );
      keyNum++;
    }
  }

  return (
    <select
      className="select select-bordered w-full"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    >
      {elements}
    </select>
  );
};

export default EventModal;
