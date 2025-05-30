import acl1 from "../assets/4.25 Iju/acl1.jfif";
import acl2 from "../assets/4.25 Iju/acl2.jpg";
import acl3 from "../assets/4.25 Iju/acl3.jfif";
import acl4 from "../assets/4.25 Iju/acl4.jpg";
import govConst1 from "../assets/governors_consent/gs1.jpg";
import govConst2 from "../assets/governors_consent/gs2.jpg";
import govConst3 from "../assets/governors_consent/gs3.jpg";

import tw1 from "../assets/greystone_tower/tw1.jpg";
import tw10 from "../assets/greystone_tower/tw10.jpg";
import tw11 from "../assets/greystone_tower/tw11.jpg";
import tw12 from "../assets/greystone_tower/tw12.jpg";
import tw13 from "../assets/greystone_tower/tw13.jpg";
import tw2 from "../assets/greystone_tower/tw2.jpg";
import tw3 from "../assets/greystone_tower/tw3.jpg";
import tw4 from "../assets/greystone_tower/tw4.jpg";
import tw5 from "../assets/greystone_tower/tw5.jpg";
import tw6 from "../assets/greystone_tower/tw6.jpg";
import tw7 from "../assets/greystone_tower/tw7.jpg";
import tw8 from "../assets/greystone_tower/tw8.jpg";
import tw9 from "../assets/greystone_tower/tw9.jpg";
import ygr1 from "../assets/yellow-gate-residence/ygr1.jpg";
import ygr2 from "../assets/yellow-gate-residence/ygr2.jpg";
import ygr3 from "../assets/yellow-gate-residence/ygr3.jpg";
import ygr4 from "../assets/yellow-gate-residence/ygr4.jpg";
import ygr5 from "../assets/yellow-gate-residence/ygr5.jpg";
import ygr6 from "../assets/yellow-gate-residence/ygr6.jpg";
import ygr7 from "../assets/yellow-gate-residence/ygr7.jpg";
import ygr8 from "../assets/yellow-gate-residence/ygr8.jpg";
import ygr9 from "../assets/yellow-gate-residence/ygr9.jpg";
// import warehouse1 from "../assets/warehouse1.jpg";
import land1 from "../assets/land1.jpg";
import land2 from "../assets/land2.jpg";
import land3 from "../assets/land3.jpg";
import land4 from "../assets/land4.jpg";
import tankfarm from "../assets/tankfarm.jpg";
import warehouse2 from "../assets/warehouse2.jpg";
// import tank1 from "../assets/tank1.jpg";
import bung from "../assets/bung.jpg";
import fence1 from "../assets/fence1.jpg";
import fence2 from "../assets/fence2.jpg";
import tank2 from "../assets/tank2.jpg";

import comingsoon from "../assets/coming-soon.jpg";

//servicem
import headerImage1 from "../assets/carousel1.jpg";
import headerImage2 from "../assets/carousel2.jpg";
import p1 from "../assets/property-1.jpg";
import p3 from "../assets/property-3.jpg";

export interface propertySummaryProps {
  type?: string;
  src: string[];
  title: string;
  price: string;
  location: string;
  size?: string;
  room?: string;
  bath?: string;
  tank?: string;
  measurement?: string;
  suitability?: string[];
  details?: string[];
}

export interface ServicePageDetProps {
  src: string;
  title: string;
  link: string;
  count: number;
}

export const propertyData = [
  {
    type: "sale",
    information: [
      {
        id: "ntr3",
        type: "cfs",
        src: ["/landacre.mp4"],
        title: "Distressed Sale Offer 4.25 Acres facing the express",
        price: "₦ 5, 500, 000, 000",
        location: "maryland lagos",
        size: "4.25",
        measurement: "Acres",
        suitability: [
          "high-rise building",
          "hospital",
          "school",
          "church",
          "warehouse/showroom",
          "mega filing station",
          "recreational facility",
          "event centre",
          "factory",
        ],
      },
      {
        id: "ntr3",
        type: "cfs",
        src: [govConst1, govConst2, govConst3],
        title: "governor's consent, deed of assignment",
        price: "₦ 5, 500, 000, 000",
        location: "maryland lagos",
        size: "7,500",
        measurement: "sqm",
        suitability: [
          "high-rise building",
          "hospital",
          "school",
          "church",
          "warehouse/showroom",
          "mega filing station",
          "recreational facility",
          "event centre",
          "factory",
        ],
      },
      {
        id: "tr2",
        type: "lfs",
        src: [acl4, acl2, acl3, acl1],
        title: "4.25 acres of land facing the express",
        price: "₦ 3, 500, 000, 000",
        location: "iju road, iju",
        size: "296",
        measurement: "m",
        suitability: [
          "high-rise building",
          "hospital",
          "school",
          "church",
          "warehouse/showroom",
          "mega filing station",
          "recreational facility",
          "event centre",
          "factory",
        ],
      },
      {
        type: "lfs",
        src: [acl2],
        title: "4 plots of land, governor's consent",
        price: "₦ 100, 000, 000",
        location: "ogombo lekki lagos",
        size: "2,253",
        measurement: "sqm",
        suitability: [
          "high-rise building",
          "hospital",
          "school",
          "church",
          "warehouse/showroom",
          "filing station",
          "event centre",
        ],
      },
      {
        id: "tr11",
        type: "lfs",
        src: [govConst2],
        title: "governor's consent, strategic land",
        price: "₦ 1, 800, 000, 000",
        location: "ilaka str, ilupeju lagos",
        size: "2,671",
        measurement: "sqm",
        suitability: [
          "high-rise building",
          "hospital",
          "school",
          "church",
          "warehouse/showroom",
          "filing station",
          "event centre",
        ],
      },
      {
        id: "tr11",
        type: "cfs",
        src: [acl3],
        title: "registered conveyance",
        price: "₦ 1, 500, 000, 000",
        location: "palm grove estate, ilupeju lagos",
        size: "4, 850",
        measurement: "sqm",
        suitability: [
          "mixed development",
          "high-rise building",
          "hospital",
          "school",
          "church",
          "warehouse/showroom",
          "filing station",
          "event centre",
        ],
      },
      {
        id: "tr11",
        type: "cfs",
        src: [
          tw1,
          tw2,
          tw3,
          tw4,
          tw5,
          tw6,
          tw7,
          tw8,
          tw9,
          tw10,
          tw11,
          tw12,
          tw13,
        ],
        title: "19 floors greystone tower available for sale",
        price: "$ 70, 000, 000",
        location: "idowu taylor str, victoria island lagos",
        size: "1200",
        measurement: "sqm",
        suitability: [
          "mixed development",
          "high-rise building",
          "hospital",
          "school",
          "church",
          "warehouse/showroom",
          "filing station",
          "event centre",
        ],
        details: [
          "floor : 19",
          "floor 1 - 5 : car park",
          "floor 17 : car park",
          "endless swimming pools",
          "3 bedroom luxury flats",
          "floor 19 : sky lounge",
          "offices : 416.52sqm",
        ],
      },
      {
        id: "dtr1",
        type: "afs",
        src: [ygr1, ygr2, ygr3, ygr4, ygr5, ygr6, ygr7, ygr8, ygr9],
        title: "3 units of 4 bedroom townhouse / terrance duplexes",
        price: "₦ 360, 000, 000 per unit",
        location:
          "the yellow gate residence, off freedom way, lekki phase 1 lagos",
        room: "4",
        bath: "4",
        suitability: [
          "high-rise building",
          "family home",
          "leisure",
          "residental living",
          "vacation home",
        ],
        details: ["rooftop gym", "jacuzzi", "exclusive lounge"],
      },
      {
        id: "dtr1",
        type: "afs",
        src: [ygr2, ygr1, ygr3, ygr4, ygr5, ygr6, ygr7, ygr8, ygr9],
        title: "4 units of 3 bedroom flats + 1 bq",
        price: "₦ 241, 000, 000 per unit",
        location:
          "the yellow gate residence, off freedom way, lekki phase 1 lagos",
        room: "3",
        bath: "3",
        suitability: [
          "high-rise building",
          "family home",
          "leisure",
          "residental living",
          "vacation home",
        ],
        details: ["rooftop gym", "jacuzzi", "exclusive lounge"],
      },
      {
        id: "tr14",
        type: "cfs",
        src: [tankfarm],
        title: "2½ acres tank farm for sale",
        price: "₦ 14, 000, 000, 000",
        location: "ibafon apapa lagos",
        size: "29,147",
        tank: "10",
        measurement: "mt",
        suitability: [
          "storage",
          "inventory managment",
          "blending and processing",
          "transportation and distribution",
          "quality control ",
          "safety and environmental protection",
          "regular compliance",
        ],
        details: ["10 tanks", "2.5 acres of land", "29,147 square-meters"],
      },
      {
        id: "tr13",
        type: "cfs",
        src: [warehouse2],
        title: "large warehouse sitting on 8,600sqm",
        price: "₦ 3, 000, 000, 000",
        location: "eric more road surulere lagos",
        size: "8600",
        measurement: "sqm",
        suitability: [
          "distribution center",
          "manufacturing support",
          "logistic hub",
          "automotive and machinery storage",
          "wholesale and bulk storage",
          "value added seevice",
          "inventory management",
          "specialized storage",
        ],
        details: [
          "high ceiling and wide aisle",
          "safety and security",
          "flexibility and scalability",
        ],
      },
      {
        id: "tr13",
        type: "cfs",
        src: [tank2],
        title: "2.5 acres tank farm for sale",
        price: "₦ 18, 000, 000, 000",
        location: "dockyard apapa lagos",
        size: "30 million",
        tank: "10",
        measurement: "L",
        suitability: [
          "storage",
          "inventory managment",
          "blending and processing",
          "transportation and distribution",
          "quality control ",
          "safety and environmental protection",
          "regular compliance",
        ],
        details: [
          "6 loading bays",
          "10 tanks",
          "2.5 acres of land",
          "30 million liters",
        ],
      },
      {
        src: [acl1],
        type: "lfs",
        title: "a plot of land for sale in a calm gated area",
        price: "₦ 220, 000, 000",
        location: "alagomeji yaba lagos",
        suitability: ["homes", "vacation homes", "primary health center"],
        details: ["title: registered conveyance"],
      },
      {
        src: [land1],
        type: "lfs",
        title: "a coner piece 1 plot available for sale",
        price: "₦ 200, 000, 000",
        location: "alagomeji yaba lagos",
        suitability: ["homes", "vacation homes", "primary health center"],
        details: ["title: registered conveyance"],
      },
      {
        src: [land2],
        type: "lfs",
        title:
          "an empty land measuring 480sqm available for sale in a prime area",
        price: "₦ 250, 000, 000",
        size: "480",
        measurement: "sqm",
        location: "alagomeji yaba lagos",
        suitability: ["homes", "vacation homes", "primary health center"],
        details: ["title: governor's coveyance"],
      },
      {
        src: [land3],
        type: "lfs",
        title: "an empty land available for sale",
        price: "₦ 160, 000, 000",
        location: "alagomeji yaba lagos",
        suitability: ["homes", "vacation homes", "primary health center"],
        details: ["title: land certificate"],
      },
      {
        src: [bung],
        type: "hfs",
        title: "a bungalow on a full plot of land available for sale",
        price: "₦ 180, 000, 000",
        location: "sabo yaba lagos",
        suitability: ["homes", "vacation homes", "primary health center"],
        details: ["title: registered conveyance"],
      },
      {
        src: [fence1],
        type: "lfs",
        title: "fenced and gate bareland for sale",
        price: "₦ 5, 000, 000, 000",
        location: "mobolaji bank anthony way ikeja lagos",
        size: "5,800",
        measurement: "sqm",
      },
      {
        id: "tr1",
        src: [fence2],
        type: "lfs",
        title: "fenced and gated land for sale",
        price: "$ 2, 500, 000",
        location: "off ikorodu road, by ismail estate, maryland ikeja lagos",
        size: "5,800",
        measurement: "sqm",
        details: [
          "factories",
          "warehouses",
          "residential duplex",
          "swimming pool",
          "bungalow",
        ],
      },
      {
        id: "tr4",
        src: [land4],
        type: "lfs",
        title: "land for sale",
        price: "₦ 170, 000, 000",
        location: "sari iganmuu road, iganmu lagos",
        size: "1, 651",
        measurement: "sqm",
      },
      {
        id: "tr8",
        type: "cfs",
        src: [land2],

        title: "commercial plot, corner piece for sale",
        price: "₦ 90, 000, 000",
        location: "idi oro, beside NNPC mushin lagos",
        size: "900",
        measurement: "sqm",
      },
    ],
  },
  {
    type: "rent",
    information: [
      // {
      //   type: "afr",
      //   src: [yt1, yt2, yt3, yt4, yt5, yt6, yt7, yt8, yt9],
      //   title: "3 bedroom apartment, yabatech staff quarters",
      //   price: "₦ 4, 500, 000",
      //   location: "Yaba Lagos",
      //   room: "3",
      //   bath: "3",
      //   suitability: [
      //     "high-rise building",
      //     "family home",
      //     "leisure",
      //     "residental living",
      //     "vacation home",
      //   ],
      // },
      // {
      //   type: "afr",
      //   src: [yt4, yt7, yt6, yt1, yt5, yt2, yt8, yt3, yt9],
      //   title: "2 bedroom apartment, yabatech staff quarters",
      //   price: "₦ 3, 500, 000",
      //   location: "Yaba Lagos",
      //   room: "2",
      //   bath: "2",
      //   suitability: [
      //     "high-rise building",
      //     "family home",
      //     "leisure",
      //     "residental living",
      //     "vacation home",
      //   ],
      // },
      // {
      //   type: "afr",
      //   src: [yt7, yt1, yt4, yt6, yt5, yt2, yt3, yt8, yt9],
      //   title: "2 bed maisonette, yabatech staff quarters",
      //   price: "₦ 5, 000, 000",
      //   location: "Yaba Lagos",
      //   room: "2",
      //   bath: "2",
      //   suitability: [
      //     "high-rise building",
      //     "family home",
      //     "leisure",
      //     "residental living",
      //     "vacation home",
      //   ],
      // },
    ],
  },
  {
    type: "joint-ventures",
    information: [
      // {
      //   id: "tr15",
      //   src: [govConst2],
      //   title: "joint venture in bourdillon road ikoyi",
      //   price: "₦ 4, 000, 000, 000",
      //   location: "bourdillon road ikoyi lagos",
      //   size: "3,149.447",
      //   measurement: "sqm",
      //   details: [
      //     "proposal: 20 floors",
      //     "sharing: 50: 50",
      //     "facilitator's fee: 10%",
      //   ],
      // },
      // {
      //   id: "tr15",
      //   src: [govConst2],
      //   title: "joint venture. build operate & transfer (bot)",
      //   price: "₦ 4, 000, 000, 000",
      //   location: "milverton road ikoyi lagos",
      //   size: "2,215",
      //   measurement: "sqm",
      //   details: [
      //     "proposal: town house",
      //     "blocks of flats",
      //     "hotel apartment",
      //     "already built structurr",
      //   ],
      // },
      // {
      //   id: "tr1",
      //   src: [govConst2],
      //   title: "joint ventures",
      //   price: "$ 2, 500, 000",
      //   location: "sangotedo lekki lagos",
      //   size: "2, 388",
      //   measurement: "sqm",
      // },
    ],
  },
  {
    type: "off-plan",
    information: [
      {
        src: [comingsoon],
        title: "",
        price: "",
        location: "",
      },
    ],
  },
];

// Function to get the count of properties by type
const getCountByType = (type: string) => {
  const property = propertyData.find((item) => item.type === type);
  return property ? property.information.length : 0;
};

export const servicePageDet = [
  {
    src: headerImage1,
    title: "Sale",
    link: "sale",
    count: getCountByType("sale"),
  },
  {
    src: headerImage2,
    title: "Rent",
    link: "rent",
    count: getCountByType("rent"),
  },
  {
    src: p1,
    title: "Off Plan",
    link: "off-plan",
    count: getCountByType("off-plan"),
  },

  {
    src: p3,
    title: "Joint Ventures",
    link: "joint-ventures",
    count: getCountByType("joint-ventures"),
  },
];

export const slides = [
  {
    src: "/yellow-gate-residence/ygr1.jpg",
    alt: "header carousel",
    title: "A 3 Stories",
    highlight: "Commercial Property",
    location: "at Apapa",
    buttonLabel: "Buy Now",
    type: "cfs",
  },
  {
    src: "/yabatech/yt1.jpg",
    alt: "header carousel",
    title: "A Duplex",
    highlight: "Luxury Home",
    location: "at Banana Island",
    buttonLabel: "View Deal",
    type: "lux",
  },
  {
    src: "/greystone_tower/tw1.jpg",
    alt: "header carousel",
    title: "Plots of Land",
    highlight: "Now Selling Fast",
    location: "at Lekki Phase 1",
    buttonLabel: "Invest Today",
    type: "land",
  },
  {
    src: "/greystone_tower/tw5.jpg",
    alt: "header carousel",
    title: "Acres of Land",
    highlight: "For Sale",
    location: "at Apapa 1",
    buttonLabel: "Invest Today",
    type: "land",
  },
  {
    src: "/yellow-gate-residence/ygr2.jpg",
    alt: "header carousel",
    title: "Commerical Property",
    highlight: "Now Selling Fast",
    location: "at Ikeja",
    buttonLabel: "Buy",
    type: "land",
  },
];
