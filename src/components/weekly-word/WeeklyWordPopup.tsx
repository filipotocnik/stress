import { useEffect, useId, useRef } from "react";
import { useWeeklyWord } from "../../hooks/useWeeklyWord";
import "./WeeklyWord.css";

interface WeeklyWordPopupProps {
    onClose: () => void;
}

export default function WeeklyWordPopup({
    onClose,
}: WeeklyWordPopupProps) {
    const { word, dateLabel } = useWeeklyWord();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const examplesTitleId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const previousOverflow = document.body.style.overflow;

        dialog.showModal();
        document.body.style.overflow = "hidden";

        return () => {
            dialog.close();
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    return (
        <dialog
            ref={dialogRef}
            className="weekly-word-modal"
            aria-labelledby={titleId}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
        >
            <article className="weekly-word-detail">
                <header className="weekly-word-detail__header">
                    <div className="weekly-word-detail__heading">
                        <h1
                            id={titleId}
                            className="weekly-word-detail__title"
                        >
                            Beseda tedna
                        </h1>

                        <p className="weekly-word-detail__date">
                            {dateLabel}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="weekly-word-modal__close"
                        aria-label="Zapri besedo tedna"
                        onClick={onClose}
                        autoFocus
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            aria-hidden="true"
                        >
                            <path d="m6 6 12 12M18 6 6 18" />
                        </svg>
                    </button>
                </header>

                <div className="weekly-word-detail__hero">
                    <div className="weekly-word-detail__picture">
                        <img
                            src={word.imageSrc}
                            alt=""
                            width={160}
                            height={160}
                        />
                    </div>

                    <div className="weekly-word-detail__words">
                        <h2
                            className="weekly-word-detail__word"
                            lang="en"
                        >
                            {word.en}
                        </h2>

                        <p
                            className="weekly-word-detail__translation"
                            lang="sl"
                        >
                            {word.sl}
                        </p>
                    </div>
                </div>

                <section
                    className="weekly-word-examples"
                    aria-labelledby={examplesTitleId}
                >
                    <h2 id={examplesTitleId}>Beseda v povedi</h2>

                    <div className="weekly-word-example">
                        <p
                            className="weekly-word-example__en"
                            lang="en"
                        >
                            {word.exampleEn}
                        </p>

                        <p
                            className="weekly-word-example__sl"
                            lang="sl"
                        >
                            {word.exampleSl}
                        </p>
                    </div>
                </section>
            </article>
        </dialog>
    );
}