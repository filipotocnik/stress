import { useState } from "react";
import { useWeeklyWord } from "../../hooks/useWeeklyWord";
import WeeklyWordPopup from "./WeeklyWordPopup";
import "./WeeklyWord.css";

export default function WeeklyWordCard() {
    const { word } = useWeeklyWord();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="card weekly-word-card">
                <h2 className="card__label weekly-word-card__label">
                    Beseda tedna
                </h2>

                <div className="weekly-word-card__picture">
                    <img
                        src={word.imageSrc}
                        alt=""
                        width={100}
                        height={100}
                    />
                </div>

                <p className="weekly-word-card__word" lang="en">
                    {word.en}
                </p>

                <button
                    type="button"
                    className="start-button"
                    aria-haspopup="dialog"
                    onClick={() => setIsOpen(true)}
                >
                    Odkrij besedo
                </button>
            </div>

            {isOpen && (
                <WeeklyWordPopup onClose={() => setIsOpen(false)} />
            )}
        </>
    );
}