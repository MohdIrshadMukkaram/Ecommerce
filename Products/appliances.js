import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const products = JSON.parse(fs.readFileSync(`${__dirname}/products.json`));

export const getAppliances = () => {
    return products.appliances;
}