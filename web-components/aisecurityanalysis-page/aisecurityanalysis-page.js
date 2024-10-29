const assistOSSDK = require("assistos")
const applicationModule = require('assistos').loadModule('application', {});

export class AISecurityAnalysisPage {
    constructor(element, invalidate) {
        this.element = element;
        this.invalidate = invalidate;
        this.invalidate();
        this.documentId = this.element.getAttribute("data-documentId")

    }

    saveProject() {
        // const llmmodule = assistOSSDK.loadModule("llm")
        alert("Project Saved Successfully!");

    }

    async beforeRender() {
        
    }

    async afterRender() {

    }

    async saveProject1 (_target){

        try {
            await assistOS.loadifyFunction(async () => {
                const bookGenerationData = {
                    llm: "ChatGPT",
                    size: 1500,
                    documentId: this.documentId
                };

                const response = await applicationModule.runApplicationFlow(
                    assistOS.space.id,
                    "AISecurity",
                    "GenerateTemplate",
                    bookGenerationData
                );

                const documentId = response.data;
                await assistOS.UI.changeToDynamicPage(
                    `space-application-page`,
                    `${assistOS.space.id}/Space/document-view-page/${documentId}`
                );
            });
        } catch (error) {
            console.error("Error while saving the project:", error);
            alert(`Error: ${error.message || "Unknown error occurred"}`);
        }
    }
}