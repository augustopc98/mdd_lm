import OpenAI from "openai";
import fs from 'fs';
import { pic2UMLexperiment } from "./modules/experiments/pic2UMLexp.js";

const openai = new OpenAI();

  

    async function main() {
        //const testPic = await testPicAssistant();
        const testPic = await pic2UMLexperiment();
    }
    
  
  main();