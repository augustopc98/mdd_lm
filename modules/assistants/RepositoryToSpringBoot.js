import OpenAI from "openai";

const openai = new OpenAI();

// Función para crear un asistente que genera código de Spring Boot a partir de un modelo DDD con capa de repositorio
async function createRepositoryToSpringBootAssistant() {
    const repositoryToSpringBootAssistant = await openai.beta.assistants.create({
        instructions: "You are an expert in Spring Boot. When you are given a DDD model with a repository layer, you will generate the corresponding Spring Boot code including controllers, services, and repository interfaces.",
        name: "RepositoryToSpringBoot",
        tools: [{ type: "file_search" }],
        model: "gpt-4-turbo",
    });

    return repositoryToSpringBootAssistant;
}

export { createRepositoryToSpringBootAssistant };
