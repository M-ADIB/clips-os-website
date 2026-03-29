import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BookingCalendar } from '../components/ui/booking-calendar';

export default function BookACallBetaPage() {
  const navigate = useNavigate();
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBook = (date: string, time: string, period: string) => {
    // Navigate to the thank you page after booking
    console.log("Confirmed booking:", { date, time, period });
    setBookingConfirmed(true);
    
    setTimeout(() => {
      navigate('/thank-you');
    }, 1500);
  };

  return (
    <div className="bg-[#080617] min-h-screen text-[#fffff7] font-sans">
      <main className="pt-28 sm:pt-36 pb-12 sm:pb-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Book A Call (Beta)
          </h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Test out our native booking component flow here.
          </p>
        </div>

        <div className="mb-16">
          {bookingConfirmed ? (
            <div className="w-full rounded-3xl bg-green-500/10 border border-green-500/20 p-12 text-center text-green-400">
              <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
              <p>Redirecting to confirmation page...</p>
            </div>
          ) : (
            <BookingCalendar onBook={handleBook} />
          )}
        </div>

        <div className="mt-12 text-center pb-8">
          <p className="text-white/60 text-sm">
            Facing any issues? <a href="mailto:mail@theclips.agency?subject=Issues%20with%20ClipsOS%20Application&body=Hello%20TCA%20Team%2C%0A%0AI%20am%20having%20issues%20with%20my%20application.%20Please%20help." className="underline decoration-white/30 underline-offset-4 hover:text-white transition-colors">Email us at mail@theclips.agency</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
