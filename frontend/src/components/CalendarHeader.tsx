interface CalendarHeaderProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  onModalOpen: () => void;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const thisYear = props.date.getFullYear(); 
  const thisMonth = props.date.getMonth(); 

  const handleChangeCalendar = (pager: 'prev' | 'next') => {
    if (pager === 'prev') {
      props.setDate(new Date(thisYear, thisMonth - 1));
    } else if (pager === 'next') {
      props.setDate(new Date(thisYear, thisMonth + 1));
    }
  };

  return (
    <header className="flex items-center justify-between bg-amber-500 px-4 py-5">
      <div className="flex items-center gap-3">
        <button
          className="text-slate-50"
          onClick={() => handleChangeCalendar('prev')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <h1 className="text-2xl font-bold text-slate-50">
          {thisYear}年{thisMonth + 1}月
        </h1>

        <button
          className="w-5 text-slate-50"
          onClick={() => handleChangeCalendar('next')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <button className="text-slate-50" onClick={props.onModalOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </header>
  );
};

export default CalendarHeader;
