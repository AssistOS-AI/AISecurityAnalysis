const assistOSSDK = require("assistos");
const applicationModule = require('assistos').loadModule('application', {});

export class AISecurityAnalysisPage {
    constructor(element, invalidate) {
        this.element = element;
        this.invalidate = invalidate;
        this.invalidate();
        this.documentId = this.element.getAttribute("data-documentId");
    }

    saveProject() {
        alert("Project Saved Successfully!");
    }

    async beforeRender() {
        // Cod de initializare care se ruleaza inainte de redarea paginii (daca este necesar)
    }

    async afterRender() {
        //  butonul de print este disponibil dupa redarea completa a paginii
        const printButton = document.getElementById('print-button');
        if (printButton) {
            printButton.addEventListener('click', function () {
                window.print(); // Deschide dialogul de imprimare
            });
        }
    }

    async submitForm(_target) {
        try {
            await assistOS.loadifyFunction(async () => {
                const formElement = this.element.querySelector("form");
                const formData = await assistOS.UI.extractFormInformation(formElement);

                // verif date formularului sunt valide
                if (!formData.isValid) {
                    return assistOS.UI.showApplicationError("Invalid form data", "Please fill all the required fields", "error");
                }

                const planData = formData.data;

                // Ruleaza fluxul de generare pentru proiect
                const response = await applicationModule.runApplicationFlow(
                    assistOS.space.id,
                    "AISecurity",
                    "GenerateTemplate",
                    planData
                );

                // Obtine documentId-ul si incarca pagina cu documentul generat
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
