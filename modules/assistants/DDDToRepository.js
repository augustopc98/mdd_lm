import OpenAI from "openai";

const openai = new OpenAI();

// Función para crear un asistente que agrega la capa de repositorio a un modelo DDD
async function createDDDToRepositoryAssistant() {
    const dddToRepositoryAssistant = await openai.beta.assistants.create({
        instructions: "You are an expert in software architecture. When you are given a DDD model, you will add the repository layer necessary to interact with a database.",
        name: "DDDToRepository",
        tools: [{ type: "file_search" }],
        model: "gpt-4-turbo",
    });

    return dddToRepositoryAssistant;
}

export { createDDDToRepositoryAssistant };
