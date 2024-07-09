import featured1 from "../assets/feature1.webp";
import featured2 from "../assets/feature2.webp";
import featured3 from "../assets/feature3.webp";
import govConst1 from "../assets/governors_consent/gs1.jpg";
import govConst2 from "../assets/governors_consent/gs2.jpg";
import govConst3 from "../assets/governors_consent/gs3.jpg";
import acl1 from "../assets/4.25 Iju/acl1.jfif";
import acl2 from "../assets/4.25 Iju/acl2.jpg";
import acl3 from "../assets/4.25 Iju/acl3.jfif";
import acl4 from "../assets/4.25 Iju/acl4.jpg";
import yt1 from "../assets/yabatech/yt1.jpg";
import yt2 from "../assets/yabatech/yt2.jpg";
import yt3 from "../assets/yabatech/yt3.jpg";
import yt4 from "../assets/yabatech/yt4.jpg";
import yt5 from "../assets/yabatech/yt5.jpg";
import yt6 from "../assets/yabatech/yt6.jpg";
import yt7 from "../assets/yabatech/yt7.jpg";
import yt8 from "../assets/yabatech/yt8.jpg";
import yt9 from "../assets/yabatech/yt9.jpg";

import tw1 from "../assets/greystone_tower/tw1.jpg";
import tw2 from "../assets/greystone_tower/tw2.jpg";
import tw3 from "../assets/greystone_tower/tw3.jpg";
import tw4 from "../assets/greystone_tower/tw4.jpg";
import tw5 from "../assets/greystone_tower/tw5.jpg";
import tw6 from "../assets/greystone_tower/tw6.jpg";
import tw7 from "../assets/greystone_tower/tw7.jpg";
import tw8 from "../assets/greystone_tower/tw8.jpg";
import tw9 from "../assets/greystone_tower/tw9.jpg";
import tw10 from "../assets/greystone_tower/tw10.jpg";
import tw11 from "../assets/greystone_tower/tw11.jpg";
import tw12 from "../assets/greystone_tower/tw12.jpg";
import tw13 from "../assets/greystone_tower/tw13.jpg";
import ygr1 from "../assets/yellow-gate-residence/ygr1.jpg";
import ygr2 from "../assets/yellow-gate-residence/ygr2.jpg";
import ygr3 from "../assets/yellow-gate-residence/ygr3.jpg";
import ygr4 from "../assets/yellow-gate-residence/ygr4.jpg";
import ygr5 from "../assets/yellow-gate-residence/ygr5.jpg";
import ygr6 from "../assets/yellow-gate-residence/ygr6.jpg";
import ygr7 from "../assets/yellow-gate-residence/ygr7.jpg";
import ygr8 from "../assets/yellow-gate-residence/ygr8.jpg";
import ygr9 from "../assets/yellow-gate-residence/ygr9.jpg";

import comingsoon from "../assets/coming-soon.jpg";

//servicem
import headerImage1 from "../assets/carousel1.jpg";
import headerImage2 from "../assets/carousel2.jpg";
import p1 from "../assets/property-1.jpg";
import p2 from "../assets/property-2.jpg";
import p3 from "../assets/property-3.jpg";

export interface propertySummaryProps {
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
    type: "buy",
    information: [
      {
        id: "ntr3",
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
        src: [comingsoon],
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
        src: [comingsoon],
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
        src: [comingsoon],
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
        src: [comingsoon],
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
        src: [comingsoon],
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
        src: [comingsoon],
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
        src: [comingsoon],
        title: "a plot of land for sale in a calm gated area",
        price: "₦ 220, 000, 000",
        location: "alagomeji yaba lagos",
        suitability: ["homes", "vacation homes", "primary health center"],
        details: ["title: registered conveyance"],
      },
      {
        src: [comingsoon],
        title: "a coner piece 1 plot available for sale",
        price: "₦ 200, 000, 000",
        location: "alagomeji yaba lagos",
        suitability: ["homes", "vacation homes", "primary health center"],
        details: ["title: registered conveyance"],
      },
      {
        src: [comingsoon],
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
        src: [comingsoon],
        title: "an empty land available for sale",
        price: "₦ 160, 000, 000",
        location: "alagomeji yaba lagos",
        suitability: ["homes", "vacation homes", "primary health center"],
        details: ["title: land certificate"],
      },
      {
        src: [comingsoon],
        title: "a bungalow on a full plot of land available for sale",
        price: "₦ 180, 000, 000",
        location: "sabo yaba lagos",
        suitability: ["homes", "vacation homes", "primary health center"],
        details: ["title: registered conveyance"],
      },
      {
        src: [comingsoon],
        title: "fenced and gate bareland for sale",
        price: "₦ 5, 000, 000, 000",
        location: "mobolaji bank anthony way ikeja lagos",
        size: "5,800",
        measurement: "sqm",
      },
      {
        id: "tr1",
        src: [comingsoon],
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
        src: [comingsoon],
        title: "land for sale",
        price: "₦ 170, 000, 000",
        location: "sari iganmuu road, iganmu lagos",
        size: "1, 651",
        measurement: "sqm",
      },
      {
        id: "tr8",
        src: [comingsoon],
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
      {
        src: [yt1, yt2, yt3, yt4, yt5, yt6, yt7, yt8, yt9],
        title: "3 bedroom apartment, yabatech staff quarters",
        price: "₦ 4, 500, 000",
        location: "Yaba Lagos",
        room: "3",
        bath: "3",
        suitability: [
          "high-rise building",
          "family home",
          "leisure",
          "residental living",
          "vacation home",
        ],
      },
      {
        src: [yt4, yt7, yt6, yt1, yt5, yt2, yt8, yt3, yt9],
        title: "2 bedroom apartment, yabatech staff quarters",
        price: "₦ 3, 500, 000",
        location: "Yaba Lagos",
        room: "2",
        bath: "2",
        suitability: [
          "high-rise building",
          "family home",
          "leisure",
          "residental living",
          "vacation home",
        ],
      },
      {
        src: [yt7, yt1, yt4, yt6, yt5, yt2, yt3, yt8, yt9],
        title: "2 bed maisonette, yabatech staff quarters",
        price: "₦ 5, 000, 000",
        location: "Yaba Lagos",
        room: "2",
        bath: "2",
        suitability: [
          "high-rise building",
          "family home",
          "leisure",
          "residental living",
          "vacation home",
        ],
      },
    ],
  },
  {
    type: "shortlet",
    information: [
      {
        src: [featured1, featured2, featured3],
        title: "luxury 3 bedroom detached duplex with bq",
        price: "₦ 850,000,000",
        location: "lekki phase 1",
      },
    ],
  },
  {
    type: "long-lease",
    information: [
      {
        src: [featured1, featured2, featured3],
        title: "luxury 3 bedroom detached duplex with bq",
        price: "₦ 850,000,000",
        location: "lekki phase 1",
      },
    ],
  },
  {
    type: "joint-ventures",
    information: [
      {
        id: "tr15",
        src: [comingsoon],
        title: "joint venture in bourdillon road ikoyi",
        price: "₦ 4, 000, 000, 000",
        location: "bourdillon road ikoyi lagos",
        size: "3,149.447",
        measurement: "sqm",
        details: [
          "proposal: 20 floors",
          "sharing: 50: 50",
          "facilitator's fee: 10%",
        ],
      },
      {
        id: "tr15",
        src: [comingsoon],
        title: "joint venture. build operate & transfer (bot)",
        price: "₦ 4, 000, 000, 000",
        location: "milverton road ikoyi lagos",
        size: "2,215",
        measurement: "sqm",
        details: [
          "proposal: town house",
          "blocks of flats",
          "hotel apartment",
          "already built structurr",
        ],
      },
      {
        id: "tr1",
        src: [comingsoon],
        title: "joint ventures",
        price: "$ 2, 500, 000",
        location: "sangotedo lekki lagos",
        size: "2, 388",
        measurement: "sqm",
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
    title: "Buy",
    link: "buy",
    count: getCountByType("buy"),
  },
  {
    src: headerImage2,
    title: "Rent",
    link: "rent",
    count: getCountByType("rent"),
  },
  {
    src: p1,
    title: "Shortlet",
    link: "shortlet",
    count: getCountByType("shortlet"),
  },
  {
    src: p2,
    title: "Long Lease",
    link: "long-lease",
    count: getCountByType("long-lease"),
  },
  {
    src: p3,
    title: "Joint Ventures",
    link: "joint-ventures",
    count: getCountByType("joint-ventures"),
  },
];
