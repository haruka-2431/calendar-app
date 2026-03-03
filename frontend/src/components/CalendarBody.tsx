import { format } from 'date-fns';

interface CalendarEvent {
  id: number | null;
  title: string;
  startDateTime: string;
  endDateTime: string;
  category: string;
}

interface CalendarBodyProps {
  date: Date;
  events: CalendarEvent[];
  setTargetEvent: React.Dispatch<React.SetStateAction<CalendarEvent>>;
}

const CalendarBody = (props: CalendarBodyProps) => {
  const thisYear = props.date.getFullYear(); 
  const thisMonth = props.date.getMonth(); 
  const today = new Date(); 
  const firstDayOfWeek = new Date(thisYear, thisMonth, 1).getDay(); 
  const lastDateNum = new Date(thisYear, thisMonth + 1, 0).getDate(); 
  const lastDateOfPrevMonthNum = new Date(thisYear, thisMonth, 0).getDate(); 
  const rowNumber = Math.ceil((firstDayOfWeek + lastDateNum) / 7); 
  let dayCount = 1; 

  return (
    <div className="flex grow flex-col">
      <Week />
      <div className={`grid grid-cols-7 grid-rows-${rowNumber} grow`}>
        {[...Array(rowNumber * 7)].map((_, index) => {
          const borderStyle =
            (index + 1) % 7 === 0
              ? 'border-b border-slate-300'
              : 'border-b border-slate-300 border-r';

          if (index < 7 && index < firstDayOfWeek) {
            const num = lastDateOfPrevMonthNum - firstDayOfWeek + index + 1;
            return (
              <div
                key={index}
                className={`${borderStyle} p-1 text-center text-slate-200`}
              >
                <span className="mb-2 inline-grid h-6 place-items-center">
                  {num}
                </span>
              </div>
            );
          } else if (dayCount > lastDateNum) {
            const num = dayCount - lastDateNum;
            dayCount++;
            return (
              <div
                key={index}
                className={`p-1 text-center text-slate-200 ${borderStyle}`}
              >
                <span className="mb-2 inline-grid h-6 place-items-center">
                  {num}
                </span>
              </div>
            );
          } else if (
            today.getFullYear() === thisYear &&
            today.getMonth() === thisMonth &&
            today.getDate() === dayCount
          ) {
            const num = dayCount;
            dayCount++;
            return (
              <div key={index} className={`${borderStyle} p-1 text-center`}>
                <span className="mb-2 inline-grid h-6 w-6 place-items-center rounded-full bg-blue-600 text-white">
                  {num}
                </span>
                <EventBadges
                  events={props.events}
                  year={thisYear}
                  month={thisMonth}
                  date={num}
                  setTargetEvent={props.setTargetEvent}
                />
              </div>
            );
          } else {
            const num = dayCount;
            dayCount++;
            return (
              <div key={index} className={`${borderStyle} p-1 text-center`}>
                <span className="mb-2 inline-grid h-6 place-items-center">
                  {num}
                </span>
                <EventBadges
                  events={props.events}
                  year={thisYear}
                  month={thisMonth}
                  date={num}
                  setTargetEvent={props.setTargetEvent}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

const Week = () => {
  const week = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className="grid grid-cols-7 border-b border-slate-300">
      {week.map((day, index) => {
        return (
          <div
            key={index}
            className={`w-full p-1 text-center ${index + 1 === 7 ? '' : 'border-r border-slate-300'}`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
};

interface EventBadgesProps {
  events: CalendarEvent[];
  year: number;
  month: number;
  date: number;
  setTargetEvent: React.Dispatch<React.SetStateAction<CalendarEvent>>;
}
const EventBadges = (props: EventBadgesProps) => {
  const { events, year, month, date, setTargetEvent } = props;
  const categoryColor: Record<string, string> = {
  work: 'bg-blue-500',
  personal: 'bg-teal-500',
  other: 'bg-purple-500',
};
  return (
    <>
      {events.map((event) => {
        const { id, title, startDateTime } = event;
        const eventDate = new Date(startDateTime);
        const eventTime = format(eventDate, 'HH:mm');

        if (
          eventDate.getFullYear() === year &&
          eventDate.getMonth() === month &&
          eventDate.getDate() === date
        ) {
          return (
            <button
              key={id}
              className={`text-3xs mt-1 line-clamp-1 w-full rounded ${categoryColor[event.category] ?? 'bg-teal-500'} p-0.5 text-left font-bold text-white md:p-1 md:text-xs`}
              onClick={() => setTargetEvent(event)}
            >
              {eventTime} {title}
            </button>
          );
        }
      })}
    </>
  );
};

export default CalendarBody;
