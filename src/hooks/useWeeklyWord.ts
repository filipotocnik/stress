import { useEffect, useState } from "react";
import { weeklyWords } from "../data/weekly-words";

const DAY_MS = 24 * 60 * 60 * 1000;

const sloveniaDateFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Ljubljana",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

const rangeFormatter = new Intl.DateTimeFormat("sl-SI", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
});

const wordsByOrder = new Map(
    weeklyWords.map((word) => [word.order, word]),
);

export function getWeeklyWord(now = new Date()) {
    const parts = sloveniaDateFormatter.formatToParts(now);

    function getPart(type: "year" | "month" | "day") {
        return Number(parts.find((part) => part.type === type)!.value);
    }

    const year = getPart("year");
    const month = getPart("month");
    const day = getPart("day");

    // using UTC + slovene formatting
    const today = Date.UTC(year, month - 1, day);
    const yearStart = Date.UTC(year, 0, 1);
    const dayIndex = Math.floor((today - yearStart) / DAY_MS);

    const order = Math.min(52, Math.floor(dayIndex / 7) + 1);
    const word = wordsByOrder.get(order);

    if (!word) {
        throw new Error(`Missing weekly word with order ${order}.`);
    }

    const startDate = new Date(yearStart + (order - 1) * 7 * DAY_MS);

    const endDate = new Date(
        order === 52
            ? Date.UTC(year, 11, 31)
            : startDate.getTime() + 6 * DAY_MS,
    );

    return {
        word,
        order,
        startDate,
        endDate,
        dateLabel: `${rangeFormatter.format(startDate)} - ${rangeFormatter.format(endDate)} ${year}`,
    };
}

export function useWeeklyWord() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const refresh = () => setNow(new Date());

        // refresh already-open page without reloading
        const interval = window.setInterval(refresh, 60_000);

        function handleVisibilityChange() {
            if (document.visibilityState === "visible") {
                refresh();
            }
        }

        window.addEventListener("focus", refresh);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.clearInterval(interval);
            window.removeEventListener("focus", refresh);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange,
            );
        };
    }, []);

    return getWeeklyWord(now);
}