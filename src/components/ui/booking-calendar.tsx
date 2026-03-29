import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Columns3, Grid, Clock, Globe, Video } from 'lucide-react';

export type DayType = {
  day: string;
  classNames: string;
  availableSlots?: {
    time: string;
    period: string; // AM or PM
  }[];
};

interface DayProps {
  classNames: string;
  day: DayType;
  onHover: (day: string | null) => void;
  onClick: (day: string) => void;
  isActive: boolean;
}

const Day: React.FC<DayProps> = ({ classNames, day, onHover, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const clickable = !!day.availableSlots && day.availableSlots.length > 0;
  
  return (
    <>
      <motion.div
        className={`relative flex items-center justify-center py-1 transition-colors duration-200 ${classNames} ${clickable ? 'cursor-pointer hover:bg-white/10' : ''} ${isActive ? 'ring-2 ring-purple-500 bg-white/10' : ''}`}
        style={{ height: '4rem', borderRadius: 16 }}
        onMouseEnter={() => {
          if (clickable) {
            setIsHovered(true);
            onHover(day.day);
          }
        }}
        onMouseLeave={() => {
          if (clickable) {
            setIsHovered(false);
            onHover(null);
          }
        }}
        onClick={() => {
          if (clickable) onClick(day.day);
        }}
        id={`day-${day.day}`}
      >
        <motion.div className="flex flex-col items-center justify-center pointer-events-none">
          {!(day.day[0] === '+' || day.day[0] === '-') && (
            <span className={`text-sm ${isActive ? 'text-white font-bold' : 'text-white/80'}`}>{day.day}</span>
          )}
        </motion.div>
        
        {day.availableSlots && (
          <motion.div
            className={`absolute bottom-1 right-1 flex size-5 items-center justify-center rounded-full p-1 text-[10px] font-bold text-white ${isActive ? 'bg-purple-500' : 'bg-white/20'}`}
            layoutId={`day-${day.day}-slot-count`}
            style={{
              borderRadius: 999,
            }}
          >
            {day.availableSlots.length}
          </motion.div>
        )}

        <AnimatePresence>
          {day.availableSlots && isHovered && !isActive && (
            <div className="absolute inset-0 flex size-full items-center justify-center pointer-events-none">
              <motion.div
                className="flex size-10 items-center justify-center bg-purple-500 p-1 text-xs font-bold text-white"
                layoutId={`day-${day.day}-slot-count`}
                style={{
                  borderRadius: 999,
                }}
              >
                {day.availableSlots.length}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

interface BookingCalendarProps {
  onBook?: (date: string, time: string, period: string) => void;
  className?: string;
}

export const BookingCalendar = React.forwardRef<HTMLDivElement, BookingCalendarProps>(
  ({ className, onBook, ...props }, ref) => {
    const [moreView, setMoreView] = useState(false);
    const [hoveredDay, setHoveredDay] = useState<string | null>(null);
    const [selectedDayDay, setSelectedDayDay] = useState<string | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ time: string; period: string } | null>(null);
    const [timezone, setTimezone] = useState('United States - New York');

    const handleDayHover = (day: string | null) => {
      setHoveredDay(day);
    };

    const handleDayClick = (dayStr: string) => {
      setSelectedDayDay(dayStr);
      setSelectedTimeSlot(null);
      setMoreView(true);
    };

    const handleSlotSelection = (time: string, period: string) => {
      setSelectedTimeSlot({ time, period });
    };

    const handleConfirmBooking = () => {
      if (!selectedDayDay || !selectedTimeSlot) return;
      const selectedDayObj = DAYS.find(d => d.day === selectedDayDay);
      if (selectedDayObj && onBook) {
        onBook(`Nov ${selectedDayObj.day}, 2024`, selectedTimeSlot.time, selectedTimeSlot.period);
      } else {
        alert(`Booking Confirmed for Nov ${selectedDayDay}, 2024 at ${selectedTimeSlot?.time} ${selectedTimeSlot?.period}`);
      }
    };

    // Derived selected day data
    const selectedDay = selectedDayDay ? DAYS.find(d => d.day === selectedDayDay) : null;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          ref={ref}
          className={`relative mx-auto my-10 flex w-full flex-col items-start justify-center gap-6 lg:gap-8 lg:flex-row ${className || ''}`}
          {...props}
        >
          {/* Event Info Panel */}
          <motion.div className={`w-full lg:w-64 xl:w-80 flex-shrink-0 flex-col gap-6 p-2 sm:p-4 ${moreView ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex flex-col gap-2">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-2 shadow-xl border border-white/20">
                <span className="text-xl font-black text-white">TCA</span>
              </div>
              <h3 className="text-white/50 font-semibold uppercase tracking-widest text-xs">The Clips Agency</h3>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mt-1">Discovery Strategy Session</h1>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3 text-white/70 font-medium">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>30 min</span>
              </div>
              <div className="flex items-start gap-3 text-white/70 font-medium">
                <Video className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="leading-snug">Web conferencing details provided upon confirmation.</span>
              </div>
            </div>
          </motion.div>

          {/* Calendar Grid Side */}
          <motion.div layout className={`w-full max-w-lg flex-shrink-0 ${moreView ? 'hidden lg:block' : 'block'}`}>
            <motion.div
              key="calendar-view"
              className="flex w-full flex-col gap-4 bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex w-full items-center justify-between">
                <motion.h2 className="mb-2 text-2xl sm:text-3xl font-bold tracking-wider text-white">
                  NOV <span className="opacity-50">2024</span>
                </motion.h2>
                <motion.button
                  className="relative flex items-center gap-3 rounded-lg border border-white/10 px-1.5 py-1 text-white/50 hover:text-white transition-colors"
                  onClick={() => setMoreView(!moreView)}
                >
                  <Columns3 className="z-[2] w-4 h-4" />
                  <Grid className="z-[2] w-4 h-4" />
                  <div
                    className="absolute left-0 top-0 h-[85%] w-6 rounded-md bg-white/20 transition-transform duration-300"
                    style={{
                      top: '50%',
                      transform: moreView
                        ? 'translateY(-50%) translateX(32px)'
                        : 'translateY(-50%) translateX(4px)',
                    }}
                  ></div>
                </motion.button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                  <div
                    key={day}
                    className="rounded-xl bg-white/5 py-1 text-center text-[10px] font-semibold text-white/50 tracking-wider"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {DAYS.map((day, index) => (
                  <Day
                    key={`${day.day}-${index}`}
                    classNames={day.classNames}
                    day={day}
                    onHover={handleDayHover}
                    onClick={handleDayClick}
                    isActive={selectedDayDay === day.day}
                  />
                ))}
              </div>
              
              {/* Timezone Selector */}
              <div className="mt-6 flex items-center justify-start gap-2 pt-6 border-t border-white/10 text-sm text-white/50">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold text-white/80 shrink-0">Time zone:</span>
                <select 
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="bg-transparent border-none text-white/80 font-medium focus:ring-0 outline-none cursor-pointer py-1 shrink w-full"
                >
                  <option className="text-black bg-white" value="United States - New York">United States - New York</option>
                  <option className="text-black bg-white" value="United States - Los Angeles">United States - Los Angeles</option>
                  <option className="text-black bg-white" value="United Kingdom - London">United Kingdom - London</option>
                  <option className="text-black bg-white" value="United Arab Emirates - Dubai">United Arab Emirates - Dubai</option>
                  <option className="text-black bg-white" value="Australia - Sydney">Australia - Sydney</option>
                  <option className="text-black bg-white" value="Singapore - Singapore">Singapore - Singapore</option>
                  <option className="text-black bg-white" value="France - Paris">France - Paris</option>
                </select>
              </div>
            </motion.div>
          </motion.div>

          {/* Time Slots Side (Appears when day is selected or moreView is toggled) */}
          {moreView && (
            <motion.div
              className="w-full max-w-lg"
              initial={{ opacity: 0, x: -20, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -20, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                key="more-view"
                className="flex w-full flex-col gap-4 bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl h-full"
              >
                <div className="flex w-full flex-col items-start justify-between">
                  <button 
                    onClick={() => {
                      setMoreView(false);
                      setSelectedDayDay(null);
                      setSelectedTimeSlot(null);
                    }}
                    className="lg:hidden flex items-center gap-2 text-white/50 hover:text-white pb-6 text-sm font-semibold transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Calendar
                  </button>
                  <motion.h2 className="mb-2 text-2xl font-bold tracking-wider text-white">
                    {selectedDay ? `Nov ${selectedDay.day}` : 'Select a Day'}
                  </motion.h2>
                  <p className="font-medium text-white/50 text-sm">
                    {selectedDay 
                      ? 'Select an available time for your call. Times are shown in your local timezone.' 
                      : 'Choose an active date on the calendar to see available booking times.'}
                  </p>
                </div>
                
                <motion.div
                  className="flex flex-col items-start justify-start overflow-hidden overflow-y-auto rounded-xl mt-2 flex-grow"
                  layout
                >
                  <AnimatePresence mode="popLayout">
                    {selectedDay && selectedDay.availableSlots ? (
                      <motion.div
                        key={`slots-${selectedDay.day}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full flex flex-col gap-3 pb-4"
                      >
                        {selectedDay.availableSlots.map((slot, sIndex) => {
                          const isSelected = selectedTimeSlot?.time === slot.time && selectedTimeSlot?.period === slot.period;
                          return (
                            <motion.button
                              key={`${slot.time}-${slot.period}`}
                              onClick={() => handleSlotSelection(slot.time, slot.period)}
                              className={`w-full text-left p-4 rounded-xl border flex items-center justify-between group transition-all duration-200 ${
                                isSelected 
                                  ? 'border-purple-500 bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] ring-1 ring-purple-500' 
                                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: sIndex * 0.05 }}
                            >
                              <div className="flex items-center gap-3">
                                <Clock className={`w-5 h-5 ${isSelected ? 'text-purple-400' : 'text-white/40 group-hover:text-white/60'}`} />
                                <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-white/80'}`}>
                                  {slot.time}
                                </span>
                                <span className={`text-sm font-medium ${isSelected ? 'text-purple-300' : 'text-white/40'}`}>
                                  {slot.period}
                                </span>
                              </div>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                isSelected ? 'border-purple-400 bg-purple-400' : 'border-white/20'
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#080617]" />}
                              </div>
                            </motion.button>
                          );
                        })}

                        {selectedTimeSlot && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handleConfirmBooking}
                            className="w-full mt-4 bg-white text-black py-4 rounded-xl font-bold flex flex-col items-center justify-center gap-1 hover:bg-[#fbe9ff] transition-colors shadow-xl"
                          >
                            <span>Confirm Booking</span>
                            <span className="text-xs text-black/60 font-medium">
                              {selectedTimeSlot.time} {selectedTimeSlot.period} · {timezone}
                            </span>
                          </motion.button>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="w-full h-40 flex items-center justify-center border border-dashed border-white/10 rounded-xl"
                      >
                        <p className="text-white/40 text-sm">No slots available for this day.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  }
);
BookingCalendar.displayName = 'BookingCalendar';

// Mock data aligned to the provided interactive calendar UI
const DAYS: DayType[] = [
  { day: '-3', classNames: 'bg-transparent text-transparent pointer-events-none' },
  { day: '-2', classNames: 'bg-transparent text-transparent pointer-events-none' },
  { day: '-1', classNames: 'bg-transparent text-transparent pointer-events-none' },
  { day: '01', classNames: 'bg-white/5' },
  {
    day: '02',
    classNames: 'bg-white/5',
    availableSlots: [
      { time: '10:00', period: 'AM' },
      { time: '10:30', period: 'AM' },
      { time: '1:00', period: 'PM' },
      { time: '2:30', period: 'PM' },
    ],
  },
  { day: '03', classNames: 'bg-white/5' },
  { day: '04', classNames: 'bg-white/5 opacity-40', availableSlots: [] },
  { day: '05', classNames: 'bg-white/5 opacity-40' },
  {
    day: '06',
    classNames: 'bg-white/5',
    availableSlots: [
      { time: '9:00', period: 'AM' },
      { time: '11:00', period: 'AM' },
      { time: '4:00', period: 'PM' },
    ],
  },
  { day: '07', classNames: 'bg-white/5' },
  {
    day: '08',
    classNames: 'bg-white/5',
    availableSlots: [
      { time: '2:00', period: 'PM' },
      { time: '4:00', period: 'PM' },
      { time: '5:30', period: 'PM' },
    ],
  },
  { day: '09', classNames: 'bg-white/5' },
  { day: '10', classNames: 'bg-white/5' },
  { day: '11', classNames: 'bg-white/5 opacity-40' },
  { day: '12', classNames: 'bg-white/5 opacity-40' },
  { day: '13', classNames: 'bg-white/5' },
  { day: '14', classNames: 'bg-white/5' },
  {
    day: '15',
    classNames: 'bg-white/5',
    availableSlots: [
      { time: '9:00', period: 'AM' },
      { time: '9:30', period: 'AM' },
    ],
  },
  { day: '16', classNames: 'bg-white/5' },
  {
    day: '17',
    classNames: 'bg-white/5',
    availableSlots: [
      { time: '9:00', period: 'AM' },
      { time: '11:00', period: 'AM' },
      { time: '2:00', period: 'PM' },
      { time: '4:00', period: 'PM' },
    ],
  },
  { day: '18', classNames: 'bg-white/5 opacity-40' },
  { day: '19', classNames: 'bg-white/5 opacity-40' },
  { day: '20', classNames: 'bg-white/5' },
  {
    day: '21',
    classNames: 'bg-white/5',
    availableSlots: [
      { time: '11:00', period: 'AM' },
      { time: '1:00', period: 'PM' },
      { time: '3:00', period: 'PM' },
      { time: '5:00', period: 'PM' },
    ],
  },
  { day: '22', classNames: 'bg-white/5' },
  { day: '23', classNames: 'bg-white/5' },
  { day: '24', classNames: 'bg-white/5' },
  { day: '25', classNames: 'bg-white/5 opacity-40' },
  { day: '26', classNames: 'bg-white/5 opacity-40' },
  { day: '27', classNames: 'bg-white/5' },
  { day: '28', classNames: 'bg-white/5' },
  { day: '29', classNames: 'bg-white/5' },
  {
    day: '30',
    classNames: 'bg-white/5',
    availableSlots: [
      { time: '11:00', period: 'AM' },
    ],
  },
  { day: '+1', classNames: 'bg-transparent text-transparent pointer-events-none' },
  { day: '+2', classNames: 'bg-transparent text-transparent pointer-events-none' },
];
