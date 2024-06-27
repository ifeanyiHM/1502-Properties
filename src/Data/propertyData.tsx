import featured1 from "../assets/feature1.webp";
import featured2 from "../assets/feature2.webp";
import featured3 from "../assets/feature3.webp";
import govConst1 from "../assets/governors_consent/gs1.jpg";
import govConst2 from "../assets/governors_consent/gs2.jpg";
import govConst3 from "../assets/governors_consent/gs3.jpg";
import acl1 from "../assets/4.25 Iju/acl1.jfif";
import acl2 from "../assets/4.25 Iju/acl2.jpg";
import acl3 from "../assets/4.25 Iju/acl3.jfif";

const propertyData = [
  {
    type: "buy",
    information: [
      {
        id: "ntr3",
        src: [govConst1, govConst2, govConst3],
        title: "governor's consent, deed of assignment",
        price: "₦ 5, 500, 000, 000",
        location: "Maryland Lagos",
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
        src: [acl2, acl3, acl1],
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
    ],
  },
  {
    type: "rent",
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
