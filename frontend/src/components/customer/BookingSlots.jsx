import { useState, useEffect } from "react";

const BookingSlots = ({ date, selectedSlot, setSelectedSlot }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (!date) return;

    const now = new Date();
    const selectedDate = new Date(date + "T00:00");

    const allSlots = [];
    for (let h = 8; h <= 22; h += 2) {
      const hourStr = h.toString().padStart(2, "0") + ":00";
      allSlots.push(hourStr);
    }

    // Nếu chọn ngày hôm nay thì chỉ hiển thị slot giờ >= thời gian hiện tại
    const validSlots =
      selectedDate.toDateString() === now.toDateString()
        ? allSlots.filter((slot) => {
            const [h, m] = slot.split(":").map(Number);
            return h >= now.getHours() + (now.getMinutes() > 0 ? 1 : 0);
          })
        : allSlots;

    setSlots(validSlots);
    setSelectedSlot(""); // resset khi đổi ngày khác
  }, [date, setSelectedSlot]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Chọn khung giờ
      </label>
      {slots.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {slots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedSlot(slot)}
              className={`p-3 rounded-lg text-center font-semibold transition ${
                selectedSlot === slot
                  ? "bg-blue-500 text-white"
                  : "bg-black-700/50 hover:bg-gray-600"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 col-span-full">
          Không còn khung giờ đặt lịch hợp lệ. Vui lòng chọn ngày khác.
        </p>
      )}
    </div>
  );
};

export default BookingSlots;
