import OpenAI from "openai";

const openai = new OpenAI();

// Función para crear un asistente que convierte UML a DDD
async function createUMLToDDDAssistant() {
    const umlToDDDAssistant = await openai.beta.assistants.create({
        instructions: "You are an expert in Domain-Driven Design (DDD). When you are given a UML class diagram, you will convert it to a DDD model including entities, value objects, aggregates, and services.",
        name: "UMLToDDD",
        tools: [{ type: "file_search" }],
        model: "gpt-4-turbo",
    });

    return umlToDDDAssistant;
}

export { createUMLToDDDAssistant };
