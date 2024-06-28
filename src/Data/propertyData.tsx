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
import ilu from "../assets/ilupeju_gsc.jpg";
import gombo from "../assets/gombo_gsc.jpg";
import palmgrove from "../assets/palmgrove.jpg";
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

const propertyData = [
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
        src: [gombo],
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
        src: [ilu],
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
        src: [palmgrove],
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
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 150,000,000",
        location: "ajah Lagos",
      },
      {
        src: [featured2, featured3, featured1],
        title: "6 bedroom detached bungalow",
        price: "₦ 10,000,000",
        location: "surulere Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "7 bedroom detached duplex with bq",
        price: "₦ 90,000,000",
        location: "alaka surulere",
      },
      {
        src: [featured1, featured2, featured3],
        title: "luxury 4 bedroom semi-duplex",
        price: "₦ 500,000",
        location: "epe ibeju lekki",
      },
      {
        src: [featured2, featured1, featured3],
        title: "luxury 5 bedroom detached duplex with bq",
        price: "₦ 180,000,000",
        location: "coker orile",
      },
      {
        src: [featured3, featured2, featured2],
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 160,000,000",
        location: "orile iganmu",
      },
      {
        src: [featured1, featured2, featured3],
        title: " 4 bedroom detached duplex with bq",
        price: "₦ 120,000,000",
        location: "maryland ikeja",
      },
      {
        src: [featured2, featured3, featured1],
        title: "luxury 2 bedroom detached duplex",
        price: "₦ 120,560,000",
        location: "Ajah Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "luxury 8 bedroom detached bungalow with bq",
        price: "₦ 14,009,000",
        location: "Anthony shomolu",
      },
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
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 150,000,000",
        location: "ajah Lagos",
      },
      {
        src: [featured2, featured3, featured1],
        title: "6 bedroom detached bungalow",
        price: "₦ 10,000,000",
        location: "surulere Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "7 bedroom detached duplex with bq",
        price: "₦ 90,000,000",
        location: "alaka surulere",
      },
      {
        src: [featured1, featured2, featured3],
        title: "luxury 4 bedroom semi-duplex",
        price: "₦ 500,000",
        location: "epe ibeju lekki",
      },
      {
        src: [featured2, featured1, featured3],
        title: "luxury 5 bedroom detached duplex with bq",
        price: "₦ 180,000,000",
        location: "coker orile",
      },
      {
        src: [featured3, featured2, featured2],
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 160,000,000",
        location: "orile iganmu",
      },
      {
        src: [featured1, featured2, featured3],
        title: " 4 bedroom detached duplex with bq",
        price: "₦ 120,000,000",
        location: "maryland ikeja",
      },
      {
        src: [featured2, featured3, featured1],
        title: "luxury 2 bedroom detached duplex",
        price: "₦ 120,560,000",
        location: "Ajah Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "luxury 8 bedroom detached bungalow with bq",
        price: "₦ 14,009,000",
        location: "Anthony shomolu",
      },
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
        src: [featured1, featured2, featured3],
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 150,000,000",
        location: "ajah Lagos",
      },
      {
        src: [featured2, featured3, featured1],
        title: "6 bedroom detached bungalow",
        price: "₦ 10,000,000",
        location: "surulere Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "7 bedroom detached duplex with bq",
        price: "₦ 90,000,000",
        location: "alaka surulere",
      },
      {
        src: [featured1, featured2, featured3],
        title: "luxury 4 bedroom semi-duplex",
        price: "₦ 500,000",
        location: "epe ibeju lekki",
      },
      {
        src: [featured2, featured1, featured3],
        title: "luxury 5 bedroom detached duplex with bq",
        price: "₦ 180,000,000",
        location: "coker orile",
      },
      {
        src: [featured3, featured2, featured2],
        title: "luxury 4 bedroom detached duplex with bq",
        price: "₦ 160,000,000",
        location: "orile iganmu",
      },
      {
        src: [featured1, featured2, featured3],
        title: " 4 bedroom detached duplex with bq",
        price: "₦ 120,000,000",
        location: "maryland ikeja",
      },
      {
        src: [featured2, featured3, featured1],
        title: "luxury 2 bedroom detached duplex",
        price: "₦ 120,560,000",
        location: "Ajah Lagos",
      },
      {
        src: [featured3, featured1, featured2],
        title: "luxury 8 bedroom detached bungalow with bq",
        price: "₦ 14,009,000",
        location: "Anthony shomolu",
      },
      {
        src: [featured1, featured2, featured3],
        title: "luxury 3 bedroom detached duplex with bq",
        price: "₦ 850,000,000",
        location: "lekki phase 1",
      },
    ],
  },
];

export default propertyData;
