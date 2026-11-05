import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__about">
                <strong>Stress · 2026</strong>
                <span>Študentski projekt za učenje angleščine.</span>
            </p>

            <ul className="footer__credits" aria-label="Viri in zahvale">
                <li>
                    Ilustracije:{" "}
                    <a
                        href="https://openmoji.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        OpenMoji
                    </a>{" "}
                    (OpenMoji contributors) ·{" "}
                    <a
                        href="https://creativecommons.org/licenses/by-sa/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CC BY-SA 4.0
                    </a>
                </li>

                <li>
                    Glasovni posnetki:{" "}
                    <a
                        href="https://elevenlabs.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ElevenLabs
                    </a>
                </li>

                <li>
                    Pisava:{" "}
                    <a
                        href="https://fonts.google.com/specimen/Atkinson+Hyperlegible"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Atkinson Hyperlegible
                    </a>{" "}
                    (Braille Institute) ·{" "}
                    <a
                        href="https://github.com/googlefonts/atkinson-hyperlegible/blob/main/OFL.txt"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        SIL OFL 1.1
                    </a>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;