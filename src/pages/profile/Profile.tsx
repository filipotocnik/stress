import { getAvatar } from "../../data/avatars";
import { getCompletedCount, getTotalStars, type User } from "../../models/user";
import "./Profile.css";

// Število lekcij je za vse uporabnike enako, zato ga ne shranjujemo pri uporabniku.
// Ko združimo Pijino vejo, ga zamenjamo z LESSONS.length iz data/lessons.ts.
const TOTAL_LEVELS = 12;

interface ProfileProps {
  user: User;
  // Gumb "Uredi profil" pokažemo samo, če ga kdo posluša
  onEdit?: () => void;
}

function Profile({ user, onEdit }: ProfileProps) {
  // Odstotek napredka za vrstico napredka
  const completed = getCompletedCount(user);
  const stars = getTotalStars(user);
  const percent = Math.round((completed / TOTAL_LEVELS) * 100);
  const avatar = getAvatar(user.avatar);

  return (
    <main className="profile">
      <img className="profile__avatar" src={avatar.image} alt={avatar.name} />
      <h1 className="profile__name">{user.nickname}</h1>

      <section className="profile__stats">
        <div className="profile__stat">
          <span className="profile__value">
            {completed}/{TOTAL_LEVELS}
          </span>
          <span className="profile__label">Končane</span>
        </div>
        <div className="profile__stat">
          <span className="profile__value">⭐ {stars}</span>
          <span className="profile__label">Zvezdice</span>
        </div>
      </section>

      <div className="profile__progress">
        <div className="profile__bar" style={{ width: `${percent}%` }} />
      </div>
      <p className="profile__percent">{percent}% poti</p>

      <h2 className="profile__info-title">Moji podatki</h2>
      <section className="profile__info">
        <dl>
          <dt>Ime in priimek</dt>
          <dd>
            {user.firstName} {user.lastName}
          </dd>
          <dt>Vzdevek</dt>
          <dd>{user.nickname}</dd>
          <dt>E-pošta</dt>
          <dd>{user.email}</dd>
        </dl>
      </section>

      {onEdit && (
        <button className="profile__edit" onClick={onEdit}>
          Uredi profil
        </button>
      )}
    </main>
  );
}

export default Profile;
