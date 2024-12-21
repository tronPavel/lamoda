import { v4 as uuidv4 } from "uuid";
import Chance from "chance";

const chance = new Chance();

const colors = ["черный", "серый", "белый", "желтый", "красный"];

const imageUrls = [
  "/images/image1.webp",
  "/images/image2.webp",
  "/images/image3.webp",
  "/images/image4.webp",
  "/images/image5.webp",
];

export const generateProducts = (n = 10) => {
  const products = [];
  for (let i = 0; i < n; i++) {
    products.push(generateProduct());
  }
  return products;
};

const generateProduct = () => ({
  id: uuidv4(),
  name: chance.word(),
  description: chance.sentence({ words: 10 }), 
  color: getRandomColor(),
  price: getRandomPrice(),
  rating: getRandomRating(),
  imageUrl: getRandomImageUrl()
});

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomPrice = () => {
  return Math.floor(Math.random() * (9990)) + 10; 
};

const getRandomRating = () => {
  return Math.round((Math.random() * 5) * 10) / 10; 
};

const getRandomImageUrl = () => {
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
};