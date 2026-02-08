"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
    eventType: {
        id: string;
        length: number;
        slug: string;
    };
    userAvailability: Array<{
        days: number[];
        startTime: string;
        endTime: string;
    }>;
    userTimezone: string;
}

export function BookingCalendar({
    eventType,
    userAvailability,
    userTimezone,
}: BookingCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(dayjs());

    // Generate calendar days for current month
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startDate = startOfMonth.startOf("week");
    const endDate = endOfMonth.endOf("week");

    const calendarDays: Date[] = [];
    let day = startDate;

    while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
        calendarDays.push(day.toDate());
        day = day.add(1, "day");
    }

    // Check if a day has availability
    const hasAvailability = (date: Date) => {
        const dayOfWeek = dayjs(date).day();
        return userAvailability.some((avail) => avail.days.includes(dayOfWeek));
    };

    // Mock time slots (in production, this would call the availability API)
    const timeSlots = selectedDate
        ? [
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
        ]
        : [];

    return (
        <div className="border border-border-subtle rounded-lg p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">
                    {currentMonth.format("MMMM YYYY")}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
                        className="px-3 py-1 text-sm border border-border rounded hover:bg-accent transition-colors"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
                        className="px-3 py-1 text-sm border border-border rounded hover:bg-accent transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="mb-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div
                            key={day}
                            className="text-center text-xs font-medium text-muted-foreground py-2"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((date, index) => {
                        const isCurrentMonth = dayjs(date).isSame(currentMonth, "month");
                        const isToday = dayjs(date).isSame(dayjs(), "day");
                        const isPast = dayjs(date).isBefore(dayjs(), "day");
                        const isSelected = selectedDate && dayjs(date).isSame(selectedDate, "day");
                        const available = hasAvailability(date) && !isPast;

                        return (
                            <button
                                key={index}
                                onClick={() => available && setSelectedDate(date)}
                                disabled={!available}
                                className={cn(
                                    "aspect-square rounded-md text-sm transition-colors",
                                    isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                                    isToday && "font-bold",
                                    isSelected && "bg-primary text-primary-foreground",
                                    !isSelected && available && "hover:bg-accent",
                                    !available && "opacity-30 cursor-not-allowed"
                                )}
                            >
                                {dayjs(date).format("D")}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Time Slots */}
            {selectedDate && (
                <div>
                    <h3 className="text-sm font-semibold mb-3">
                        Available times for {dayjs(selectedDate).format("MMMM D, YYYY")}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto scrollbar-thin">
                        {timeSlots.map((time) => (
                            <button
                                key={time}
                                onClick={() => {
                                    // In production, this would navigate to confirmation page
                                    alert(`Selected: ${dayjs(selectedDate).format("YYYY-MM-DD")} at ${time}`);
                                }}
                                className="px-4 py-2 text-sm border border-border rounded-md hover:bg-accent hover:border-foreground transition-colors"
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {selectedDate && timeSlots.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No available times for this date</p>
                </div>
            )}
        </div>
    );
}
