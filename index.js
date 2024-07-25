import { createUMLToDDDAssistant } from "./agents/UMLToDDD.js";
import { createDDDToRepositoryAssistant } from "./agents/DDDToRepository.js";
import { createRepositoryToSpringBootAssistant } from "./agents/RepositoryToSpringBoot.js";
import { initResults, writeResult } from "./helpers/resultLogWriter.js";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

async function main() {
    // Inicializar resultados
    const experimentName = "uml-to-springboot";
    initResults(experimentName);

    // Crear asistentes
    const umlToDDDAssistant = await createUMLToDDDAssistant();
    const dddToRepositoryAssistant = await createDDDToRepositoryAssistant();
    const repositoryToSpringBootAssistant = await createRepositoryToSpringBootAssistant();

    // Leer el UML de entrada
    const umlFilePath = path.join(__dirname, 'inputs', 'UMLInputs.txt');
    const umlDiagram = fs.readFileSync(umlFilePath, 'utf-8');

    // Convertir UML a DDD
    const dddResponse = await openai.chat.completions.create({
        messages: [{ role: "user", content: `Convert this UML diagram to a DDD model: ${umlDiagram}` }],
        model: umlToDDDAssistant.model,
    });
    const dddModel = dddResponse.choices[0].text;
    writeResult(experimentName, 'ddd_model', dddModel);

    // Agregar capa de repositorio
    const repositoryResponse = await openai.chat.completions.create({
        messages: [{ role: "user", content: `Add a repository layer to this DDD model: ${dddModel}` }],
        model: dddToRepositoryAssistant.model,
    });
    const repositoryModel = repositoryResponse.choices[0].text;
    writeResult(experimentName, 'repository_model', repositoryModel);

    // Generar código Spring Boot
    const springBootResponse = await openai.chat.completions.create({
        messages: [{ role: "user", content: `Generate Spring Boot code from this DDD model with repository layer: ${repositoryModel}` }],
        model: repositoryToSpringBootAssistant.model,
    });
    const springBootCode = springBootResponse.choices[0].text;
    writeResult(experimentName, 'springboot_code', springBootCode);

    console.log("Spring Boot code generated successfully!");
}

main().catch(console.error);
