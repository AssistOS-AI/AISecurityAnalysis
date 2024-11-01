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

    async submitForm (_target){

        try {
            await assistOS.loadifyFunction(async () => {
                const bookGenerationData = {
                    llm: "ChatGPT",
                    size: 2,
                    documentId: this.documentId
                };

                const formElement = this.element.querySelector("form");
                const formData = await assistOS.UI.extractFormInformation(formElement);
                if (!formData.isValid) {
                    return assistOS.UI.showApplicationError("Invalid form data", "Please fill all the required fields", "error");
                }
                const planData = formData.data;

                const response = await applicationModule.runApplicationFlow(
                    assistOS.space.id,
                    "AISecurity",
                    "GenerateTemplate",
                    planData
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