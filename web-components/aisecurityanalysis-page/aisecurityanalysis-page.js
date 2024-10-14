const llmModule = require("assistos").loadModule("llm", {});  // Import modulul necesar

export class AISecurityAnalysisPage {
    constructor(element, invalidate) {
        this.element = element;
        this.invalidate = invalidate;
        this.invalidate();
    }

    async beforeRender() {
        this.insertedText = "Dummy Text";
    }

    async afterRender() {

    }

    async analyzeProject(_target) {
        const formData = await assistOS.UI.extractFormInformation(_target);
        if (!formData.isValid) {
            return assistOS.UI.showApplicationError("Invalid form data", "Please fill all the required fields", "error");  // Validare date
        }
        const projectData = formData.data;
        const prompt =
            `Analyze a project with name ${projectData["project-name"]}. 
             GitHub repository: ${projectData["github-link"]}. 
             Details: ${projectData["project-prompt"]}`;

        const reqData = {
            modelName: "GPT-4o",
            prompt: prompt
        }
        const llmResponse = await llmModule.sendLLMRequest(reqData);
        const analysisResult = llmResponse.messages;
        console.log(analysisResult);
    }
}
