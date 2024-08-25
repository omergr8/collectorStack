import { LinkItem, ToggleItem } from "./types";
import dashLogo from "@/public/icons/dash.svg";
import marketLogo from "@/public/icons/marketplace.svg";
import newsLogo from "@/public/icons/news.svg";
import wishLogo from "@/public/icons/wish.svg";
import playerLogo from "@/public/icons/players.svg";
import DayLogo from "@/public/icons/day.svg";
import NightLogo from "@/public/icons/night.svg";
import Collection from "@/public/icons/collection.svg";
import Kit from "@/public/icons/kit.svg";
import Sharing from "@/public/icons/sharing.svg";
import CardIcon from "@/public/icons/cardIcon.svg";
import OneGrade from "@/public/icons/Grades/1Grade.svg";
import OneHalfGrade from "@/public/icons/Grades/1.5Grade.svg";
import TwoGrade from "@/public/icons/Grades/2Grade.svg";
import ThreeGrade from "@/public/icons/Grades/3Grade.svg";
import FourGrade from "@/public/icons/Grades/4Grade.svg";
import FiveGrade from "@/public/icons/Grades/5Grade.svg";
import SixGrade from "@/public/icons/Grades/6Grade.svg";
import SevenGrade from "@/public/icons/Grades/7Grade.svg";
import EightGrade from "@/public/icons/Grades/8Grade.svg";
import NinthGrade from "@/public/icons/Grades/9Grade.svg";
import TenthGrade from "@/public/icons/Grades/10Grade.svg";
import AuthGrade from "@/public/icons/Grades/authenticGrade.svg";
import NoGrade from "@/public/icons/Grades/noGrade.svg";

import { routes } from "@/config/routes";
import { Grade } from "./types";

export const links: LinkItem[] = [
  {
    name: "Dashboard",
    icon: dashLogo,
    to: routes.core.dashboard,
  },
  {
    name: "Marketplace",
    icon: marketLogo,
    subLinks: [
      {
        title: "Buy Cards",
        links: [
          {
            name: "News",
          },
          {
            name: "Promotions",
          },
          {
            name: "Popular Cards",
          },
          {
            name: "Live Auctions",
          },
        ],
      },
      {
        title: "Sell Cards",
        links: [
          {
            name: "Show Card",
          },
          {
            name: "Your auctions",
          },
          {
            name: "Sales history",
          },
        ],
      },
      {
        title: "Offers & Promotions",
        links: [
          {
            name: "Best Offers",
          },
          {
            name: "Discount Coupons",
          },
          {
            name: "Merchants",
          },
        ],
      },
      {
        title: "Trusted Merchants",
        links: [
          {
            name: "Ratings and reviews",
          },
        ],
      },
    ],
  },
  {
    name: "News",
    icon: newsLogo,
    to: "",
  },
  {
    name: "Wishlist",
    icon: wishLogo,
    subLinks: [
      {
        title: "Your Wish List",
        links: [
          {
            name: "All Cards",
          },
          {
            name: "Newly added",
          },
          {
            name: "Recently available",
          },
        ],
      },
      {
        title: "Notifications",
        links: [
          {
            name: "New Cards",
          },
          {
            name: "Pricing Changes",
          },
        ],
      },
      {
        title: "Recommendations",
        links: [
          {
            name: "Cards that may interest you",
          },
          {
            name: "Similar cards",
          },
        ],
      },
    ],
  },
  {
    name: "Player Collections",
    icon: playerLogo,
    subLinks: [
      {
        title: "Player Profiles",
        links: [
          {
            name: "View Profiles",
          },
          {
            name: "Find New Players",
          },
          {
            name: "Community",
          },
        ],
      },
      {
        title: "Latest Collections",
        links: [
          {
            name: "Most Popular Collections",
          },
          {
            name: "your Friends Collections",
          },
          {
            name: "Challenges & Competitions",
          },
        ],
      },
      {
        title: "Current Challenges",
        links: [
          {
            name: "Take part in a competition",
          },
          {
            name: "Contests Results",
          },
        ],
      },
    ],
  },
];

export const profileLinks = [
  {
    name: "My Profile",
    link: "",
  },
  {
    name: "Settings",
    link: "",
  },
  {
    name: "Security",
    link: "",
  },
];

export const toggleMode: ToggleItem[] = [
  {
    name: "light",
    icon: DayLogo,
  },
  {
    name: "dark",
    icon: NightLogo,
  },
];

export const authText = {
  title: "login to your account",
  info: "Manage, Share and Discover the Value of Your Most Valuable Sports Cards",
  dont: "I don't have an account",
  have: "I have an account",
  forget: "Forgot my password",
  reset: "my password",
};

export const registerText = {
  title1: "Create an account",
  info1:
    "Manage, Share and Discover the Value of Your Most Valuable Sports Cards",
  title2: "Address details",
  info2:
    "Manage, Share and Discover the Value of Your Most Valuable Sports Cards",
  title3: "Banking details",
  info3:
    "Manage, Share and Discover the Value of Your Most Valuable Sports Cards",
};

export const dashText = {
  heading: "Collection Overview",
  title:
    "Manage, Share and Discover the Value of Your Most Valuable Sports Cardsv",
};

export const stepDetails = [
  "Personal information",
  "Address",
  "Banking details",
];

export const collectionItem = [
  // { id: "/", label: "Card Classification" },
  { id: routes.core.addCard, label: "Add Card" },
  // { id: "/", label: "Edit Card" },
];
export const kitsItem = [
  { id: "/", label: "Card Classification" },
  { id: "/", label: "Missing Cards" },
  { id: "/", label: "Assistance in completing" },
];
export const sharingItem = [
  { id: routes.core.dashboard, label: "My Collections" },
  { id: "/", label: "Publicize Collection" },
];

export const sideLinks = [
  {
    name: "My Collection",
    icon: Collection,
    links: collectionItem,
  },
  // {
  //   name: "Kits",
  //   icon: Kit,
  //   links: kitsItem,
  // },
  // {
  //   name: "Sharing Collections",
  //   icon: Sharing,
  //   links: sharingItem,
  // },
];

export const sampleCardsData = [
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Texas Rangers",
    teamYear: "1979",
    name: "Corey Seager",
    info: "O-Pee-Chee",
    mintStatus: "Mint",
    price: "$120,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "New York Yankees",
    teamYear: "1985",
    name: "Derek Jeter",
    info: "Topps",
    mintStatus: "Near Mint",
    price: "$85,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Boston Red Sox",
    teamYear: "2004",
    name: "David Ortiz",
    info: "Upper Deck",
    mintStatus: "Mint",
    price: "$75,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Chicago Cubs",
    teamYear: "2016",
    name: "Kris Bryant",
    info: "Bowman",
    mintStatus: "Gem Mint",
    price: "$50,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Los Angeles Dodgers",
    teamYear: "1988",
    name: "Orel Hershiser",
    info: "Score",
    mintStatus: "Mint",
    price: "$40,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "San Francisco Giants",
    teamYear: "1993",
    name: "Barry Bonds",
    info: "Donruss",
    mintStatus: "Mint",
    price: "$60,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Philadelphia Phillies",
    teamYear: "1980",
    name: "Mike Schmidt",
    info: "Topps",
    mintStatus: "Near Mint",
    price: "$45,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Detroit Tigers",
    teamYear: "1984",
    name: "Alan Trammell",
    info: "Fleer",
    mintStatus: "Mint",
    price: "$30,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Toronto Blue Jays",
    teamYear: "1992",
    name: "Roberto Alomar",
    info: "Fleer",
    mintStatus: "Gem Mint",
    price: "$55,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Minnesota Twins",
    teamYear: "1991",
    name: "Kirby Puckett",
    info: "Topps",
    mintStatus: "Mint",
    price: "$35,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Baltimore Orioles",
    teamYear: "1983",
    name: "Cal Ripken Jr.",
    info: "Donruss",
    mintStatus: "Near Mint",
    price: "$65,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Atlanta Braves",
    teamYear: "1995",
    name: "Chipper Jones",
    info: "Upper Deck",
    mintStatus: "Mint",
    price: "$70,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Cleveland Indians",
    teamYear: "1997",
    name: "Manny Ramirez",
    info: "Topps",
    mintStatus: "Near Mint",
    price: "$25,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Kansas City Royals",
    teamYear: "1980",
    name: "George Brett",
    info: "Fleer",
    mintStatus: "Mint",
    price: "$40,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Seattle Mariners",
    teamYear: "1991",
    name: "Ken Griffey Jr.",
    info: "Upper Deck",
    mintStatus: "Gem Mint",
    price: "$95,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "St. Louis Cardinals",
    teamYear: "2006",
    name: "Albert Pujols",
    info: "Topps",
    mintStatus: "Mint",
    price: "$85,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "San Diego Padres",
    teamYear: "1998",
    name: "Tony Gwynn",
    info: "Donruss",
    mintStatus: "Mint",
    price: "$55,000",
  },
  {
    imageSrc: "/images/card.png",
    cardIcon: CardIcon,
    teamName: "Houston Astros",
    teamYear: "2005",
    name: "Craig Biggio",
    info: "Fleer",
    mintStatus: "Near Mint",
    price: "$30,000",
  },
];

export const progressData = [
  { title: "Topps 1952", description: "75 / 100 cards", percentage: 75 },
  { title: "Topps 1952", description: "75 / 100 cards", percentage: 75 },
  { title: "Topps 1952", description: "75 / 100 cards", percentage: 75 },
  { title: "Topps 1952", description: "75 / 100 cards", percentage: 75 },
  { title: "Topps 1952", description: "75 / 100 cards", percentage: 75 },
  { title: "Topps 1952", description: "75 / 100 cards", percentage: 75 },
  // Add more progress data as needed
];
export const filters = [
  { text: "Addition Date" },
  { text: "Year Kits" },
  { text: "Player" },
  { text: "Team" },
  { text: "Card Condition" },
  { text: "Value" },
];

export const grades: Record<
  Grade,
  { text: string; abbreviation: string; icon: any }
> = {
  10: { text: "Gem Mint", abbreviation: "GEM-MT", icon: TenthGrade },
  9: { text: "Mint", abbreviation: "MT", icon: NinthGrade },
  8: { text: "Near Mint-Mint", abbreviation: "NM-MT", icon: EightGrade },
  7: { text: "Near Mint", abbreviation: "NM", icon: SevenGrade },
  6: { text: "Excellent-Mint", abbreviation: "EX-MT", icon: SixGrade },
  5: { text: "Excellent", abbreviation: "EX", icon: FiveGrade },
  4: { text: "Very Good - Excellent", abbreviation: "VG-EX", icon: FourGrade },
  3: { text: "Very Good", abbreviation: "VG", icon: ThreeGrade },
  2: { text: "Good", abbreviation: "GOOD", icon: TwoGrade },
  1.5: { text: "Fair", abbreviation: "FR", icon: OneHalfGrade },
  1: { text: "Poor", abbreviation: "PR", icon: OneGrade },
};

export const sortOptions = [
  { label: "Latest Added", value: "-created_date" },
  { label: "Oldest Added", value: "created_date" },
  { label: "Number", value: "card__number" },
  { label: "Value", value: "-card__average_sale_price" },
  { label: "Card Condition", value: "-grade" },
  { label: "Year Desc", value: "-card__year" },
  { label: "Year Asc", value: "card__year" },
];

export const resetTokenErrorMessage = `Your reset password link is invalid. Please try copying the URL from your email and pasting it into your browser's address bar.`;
export const progressText = `Track your progress of your favorite card sets. See which cards you already own and which you have yet to colect to complete a set.`;
