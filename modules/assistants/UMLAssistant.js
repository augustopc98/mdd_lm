import OpenAI from "openai";

const openai = new OpenAI();

// Función para crear un asistente que convierte UML a PlantUML
async function createUMLAssistant() {
    const pic2UMLAssistant = await openai.beta.assistants.create({
        instructions: "You are an expert in UML modelling. When you are given a picture of a class diagram, you will model it on UML 2.0 and return a Plant UML code of the class diagram. "+
        "You should guess the type of the attributes based on their name, using the String type by default. "+
        "You should guess the parameters of the methods based on the class' attributes. " +
        "Your output should be only the PlantUML model. Omit any other response texts.",
        name: "Pic2UML",
        tools: [{ type: "file_search" }],
        model: "gpt-4-turbo",
    });

    return pic2UMLAssistant;
}

export { createUMLAssistant };
