import type { Word } from "../models/word";
import { openmoji } from "./images";

export const words: Word[] = [
	// Colours
	{
		id: "red",
		en: "red",
		sl: "rdeča",
		imageSrc: openmoji("1F534"),
	},
	{
		id: "blue",
		en: "blue",
		sl: "modra",
		imageSrc: openmoji("1F535"),
	},
	{
		id: "green",
		en: "green",
		sl: "zelena",
		imageSrc: openmoji("1F7E2"),
	},
	{
		id: "yellow",
		en: "yellow",
		sl: "rumena",
		imageSrc: openmoji("1F7E1"),
	},
	{
		id: "orange",
		en: "orange",
		sl: "oranžna",
		imageSrc: openmoji("1F7E0"),
	},
	{
		id: "purple",
		en: "purple",
		sl: "vijolična",
		imageSrc: openmoji("1F7E3"),
	},
	{
		id: "black",
		en: "black",
		sl: "črna",
		imageSrc: openmoji("26AB"),
	},
	{
		id: "white",
		en: "white",
		sl: "bela",
		imageSrc: openmoji("26AA"),
	},

	// Numbers
	{
		id: "one",
		en: "one",
		sl: "ena",
		imageSrc: openmoji("0031-FE0F-20E3"),
	},
	{
		id: "two",
		en: "two",
		sl: "dva",
		imageSrc: openmoji("0032-FE0F-20E3"),
	},
	{
		id: "three",
		en: "three",
		sl: "tri",
		imageSrc: openmoji("0033-FE0F-20E3"),
	},
	{
		id: "four",
		en: "four",
		sl: "štiri",
		imageSrc: openmoji("0034-FE0F-20E3"),
	},
	{
		id: "five",
		en: "five",
		sl: "pet",
		imageSrc: openmoji("0035-FE0F-20E3"),
	},
	{
		id: "six",
		en: "six",
		sl: "šest",
		imageSrc: openmoji("0036-FE0F-20E3"),
	},
	{
		id: "seven",
		en: "seven",
		sl: "sedem",
		imageSrc: openmoji("0037-FE0F-20E3"),
	},
	{
		id: "eight",
		en: "eight",
		sl: "osem",
		imageSrc: openmoji("0038-FE0F-20E3"),
	}, 
	{
		id: "nine",
		en: "nine",
		sl: "devet",
		imageSrc: openmoji("0039-FE0F-20E3"),
	},
	{
		id: "ten",
		en: "ten",
		sl: "deset",
		imageSrc: openmoji("1F51F"),
	},

	// School things
	{
		id: "book",
		en: "book",
		sl: "knjiga",
		imageSrc: openmoji("1F4D6"),
	},
	{
		id: "pencil",
		en: "pencil",
		sl: "svinčnik",
		imageSrc: openmoji("270F"),
	},
	{
		id: "pen",
		en: "pen",
		sl: "pisalo",
		imageSrc: openmoji("1F58A"),
	},
	{
		id: "ruler",
		en: "ruler",
		sl: "ravnilo",
		imageSrc: openmoji("1F4CF"),
	},
	{
		id: "rubber",
		en: "rubber",
		sl: "radirka",
	},
	{
		id: "bag",
		en: "bag",
		sl: "torba",
		imageSrc: openmoji("1F392"),
	},
	{
		id: "desk",
		en: "desk",
		sl: "šolska klop",
	},
	{
		id: "chair",
		en: "chair",
		sl: "stol",
		imageSrc: openmoji("1FA91"),
	},

	// Clothes
	{
		id: "t-shirt",
		en: "T-shirt",
		sl: "majica",
		imageSrc: openmoji("1F455"),
	},
	{
		id: "dress",
		en: "dress",
		sl: "obleka",
		imageSrc: openmoji("1F457"),
	},
	{
		id: "skirt",
		en: "skirt",
		sl: "krilo",
	},
	{
		id: "trousers",
		en: "trousers",
		sl: "hlače",
		imageSrc: openmoji("1F456"),
	},
	{
		id: "shoes",
		en: "shoes",
		sl: "čevlji",
		imageSrc: openmoji("1F45E"),
	},
	{
		id: "socks",
		en: "socks",
		sl: "nogavice",
		imageSrc: openmoji("1F9E6"),
	},
	{
		id: "hat",
		en: "hat",
		sl: "klobuk",
		imageSrc: openmoji("1F3A9"),
	},
	{
		id: "jacket",
		en: "jacket",
		sl: "jakna",
		imageSrc: openmoji("1F9E5"),
	},

	// My family
	{
		id: "mum",
		en: "mum",
		sl: "mama",
		imageSrc: openmoji("1F469"),
	},
	{
		id: "dad",
		en: "dad",
		sl: "oče",
		imageSrc: openmoji("1F468"),
	},
	{
		id: "sister",
		en: "sister",
		sl: "sestra",
		imageSrc: openmoji("1F467"),
	},
	{
		id: "brother",
		en: "brother",
		sl: "brat",
		imageSrc: openmoji("1F466"),
	},
	{
		id: "grandma",
		en: "grandma",
		sl: "babica",
		imageSrc: openmoji("1F475"),
	},
	{
		id: "grandpa",
		en: "grandpa",
		sl: "dedek",
		imageSrc: openmoji("1F474"),
	},
	{
		id: "baby",
		en: "baby",
		sl: "dojenček",
		imageSrc: openmoji("1F476"),
	},
	{
		id: "family",
		en: "family",
		sl: "družina",
		imageSrc: openmoji("1F46A"),
	},

	// My body
	{
		id: "head",
		en: "head",
		sl: "glava",
	},
	{
		id: "eyes",
		en: "eyes",
		sl: "oči",
		imageSrc: openmoji("1F440"),
	},
	{
		id: "ears",
		en: "ears",
		sl: "ušesa",
		imageSrc: openmoji("1F442"),
	},
	{
		id: "nose",
		en: "nose",
		sl: "nos",
		imageSrc: openmoji("1F443"),
	},
	{
		id: "mouth",
		en: "mouth",
		sl: "usta",
		imageSrc: openmoji("1F444"),
	},
	{
		id: "hair",
		en: "hair",
		sl: "lasje",
		imageSrc: openmoji("1F9B1"),
	},
	{
		id: "hand",
		en: "hand",
		sl: "roka",
		imageSrc: openmoji("270B"),
	},
	{
		id: "leg",
		en: "leg",
		sl: "noga",
		imageSrc: openmoji("1F9B5"),
	},

	// Food
	{
		id: "apple",
		en: "apple",
		sl: "jabolko",
		imageSrc: openmoji("1F34E"),
	},
	{
		id: "banana",
		en: "banana",
		sl: "banana",
		imageSrc: openmoji("1F34C"),
	},
	{
		id: "bread",
		en: "bread",
		sl: "kruh",
		imageSrc: openmoji("1F35E"),
	},
	{
		id: "milk",
		en: "milk",
		sl: "mleko",
		imageSrc: openmoji("1F95B"),
	},
	{
		id: "cheese",
		en: "cheese",
		sl: "sir",
		imageSrc: openmoji("1F9C0"),
	},
	{
		id: "egg",
		en: "egg",
		sl: "jajce",
		imageSrc: openmoji("1F95A"),
	},
	{
		id: "cake",
		en: "cake",
		sl: "torta",
		imageSrc: openmoji("1F382"),
	},
	{
		id: "carrot",
		en: "carrot",
		sl: "korenje",
		imageSrc: openmoji("1F955"),
	},

	// Free time
	{
		id: "football",
		en: "football",
		sl: "nogomet",
		imageSrc: openmoji("26BD"),
	},
	{
		id: "basketball",
		en: "basketball",
		sl: "košarka",
		imageSrc: openmoji("1F3C0"),
	},
	{
		id: "tennis",
		en: "tennis",
		sl: "tenis",
		imageSrc: openmoji("1F3BE"),
	},
	{
		id: "swim",
		en: "swim",
		sl: "plavanje",
		imageSrc: openmoji("1F3CA"),
	},
	{
		id: "run",
		en: "run",
		sl: "tek",
		imageSrc: openmoji("1F3C3"),
	},
	{
		id: "dance",
		en: "dance",
		sl: "plesati",
		imageSrc: openmoji("1F483"),
	},
	{
		id: "sing",
		en: "sing",
		sl: "peti",
		imageSrc: openmoji("1F9D1-200D-1F3A4"),
	},
	{
		id: "bike",
		en: "bike",
		sl: "kolo",
		imageSrc: openmoji("1F6B2"),
	},

	// School day
	{
		id: "maths",
		en: "Maths",
		sl: "matematika",
		imageSrc: openmoji("1F9EE"),
	},
	{
		id: "english",
		en: "English",
		sl: "angleščina",
		imageSrc: openmoji("1F1EC-1F1E7"),
	},
	{
		id: "music",
		en: "Music",
		sl: "glasba",
		imageSrc: openmoji("1F3B5"),
	},
	{
		id: "art",
		en: "Art",
		sl: "likovna umetnost",
		imageSrc: openmoji("1F3A8"),
	},
	{
		id: "pe",
		en: "PE",
		sl: "šport",
		imageSrc: openmoji("1F9D1-200D-1FA70"),
	},
	{
		id: "science",
		en: "Science",
		sl: "naravoslovje",
		imageSrc: openmoji("1F9D1-200D-1F52C"),
	},
	{
		id: "history",
		en: "History",
		sl: "zgodovina",
		imageSrc: openmoji("1F3F0"),
	},
	{
		id: "geography",
		en: "Geography",
		sl: "geografija",
		imageSrc: openmoji("1F30D"),
	},

	// Meal times
	{
		id: "breakfast",
		en: "breakfast",
		sl: "zajtrk",
	},
	{
		id: "lunch",
		en: "lunch",
		sl: "kosilo",
	},
	{
		id: "dinner",
		en: "dinner",
		sl: "večerja",
	},
	{
		id: "cereal",
		en: "cereal",
		sl: "kosmiči",
	},
	{
		id: "honey",
		en: "honey",
		sl: "med",
		imageSrc: openmoji("1F36F"),
	},
	{
		id: "biscuits",
		en: "biscuits",
		sl: "piškoti",
		imageSrc: openmoji("1F36A"),
	},
	{
		id: "bacon",
		en: "bacon",
		sl: "slanina",
		imageSrc: openmoji("1F953"),
	},
	{
		id: "blueberries",
		en: "blueberries",
		sl: "borovnice",
		imageSrc: openmoji("1FAD0"),
	},

	// Wild animals
	{
		id: "lion",
		en: "lion",
		sl: "lev",
		imageSrc: openmoji("1F981"),
	},
	{
		id: "bear",
		en: "bear",
		sl: "medved",
		imageSrc: openmoji("1F43B"),
	},
	{
		id: "wolf",
		en: "wolf",
		sl: "volk",
		imageSrc: openmoji("1F43A"),
	},
	{
		id: "snake",
		en: "snake",
		sl: "kača",
		imageSrc: openmoji("1F40D"),
	},
	{
		id: "eagle",
		en: "eagle",
		sl: "orel",
		imageSrc: openmoji("1F985"),
	},
	{
		id: "deer",
		en: "deer",
		sl: "jelen",
		imageSrc: openmoji("1F98C"),
	},
	{
		id: "horse",
		en: "horse",
		sl: "konj",
		imageSrc: openmoji("1F40E"),
	},
	{
		id: "swan",
		en: "swan",
		sl: "labod",
		imageSrc: openmoji("1F9A2"),
	},

	// Months and festivals
	{
		id: "pumpkin",
		en: "pumpkin",
		sl: "buča",
		imageSrc: openmoji("1F383"),
	},
	{
		id: "ghost",
		en: "ghost",
		sl: "duh",
		imageSrc: openmoji("1F47B"),
	},
	{
		id: "witch",
		en: "witch",
		sl: "čarovnica",
	},
	{
		id: "bat",
		en: "bat",
		sl: "netopir",
		imageSrc: openmoji("1F987"),
	},
	{
		id: "christmas-tree",
		en: "Christmas tree",
		sl: "božično drevo",
		imageSrc: openmoji("1F384"),
	},
	{
		id: "present",
		en: "present",
		sl: "darilo",
		imageSrc: openmoji("1F381"),
	},
	{
		id: "easter-egg",
		en: "Easter egg",
		sl: "pirh",
	},
	{
		id: "rabbit",
		en: "rabbit",
		sl: "zajec",
		imageSrc: openmoji("1F407"),
	},
];

export const wordsById = new Map<string, Word>(
	words.map((word) => [word.id, word]),
);
