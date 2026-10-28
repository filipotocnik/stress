// Avatarji, med katerimi lahko otrok izbira.
// Slike so iz OpenMoji (https://openmoji.org), licenca CC BY-SA 4.0.
import owl from "../assets/avatars/owl.svg";
import dog from "../assets/avatars/dog.svg";
import cat from "../assets/avatars/cat.svg";
import fox from "../assets/avatars/fox.svg";
import panda from "../assets/avatars/panda.svg";
import frog from "../assets/avatars/frog.svg";
import lion from "../assets/avatars/lion.svg";
import rabbit from "../assets/avatars/rabbit.svg"

export interface Avatar {
  id: string; // to shranimo pri uporabniku, npr. "owl"
  name: string; // angleško ime živali, za alt besedilo
  image: string; // pot do slike
}

export const AVATARS: Avatar[] = [
  { id: "owl", name: "Owl", image: owl },
  { id: "dog", name: "Dog", image: dog },
  { id: "cat", name: "Cat", image: cat },
  { id: "fox", name: "Fox", image: fox },
  { id: "panda", name: "Panda", image: panda },
  { id: "frog", name: "Frog", image: frog },
  { id: "lion", name: "Lion", image: lion },
  { id: "rabbit", name: "Rabbit", image: rabbit },
];

// Poišče avatar po id-ju. Če ga ni, vrne sovo.
export function getAvatar(id: string): Avatar {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}
