// //clasa speciala constructor -> structura din aisecurityanalysis-page.js

export class PrintDocumentModal {
    constructor(element, invalidate) {
        this.element = element;
        this.invalidate = invalidate;
        this.invalidate();
        this.documentId = this.element.getAttribute("data-documentId");
    }

    async beforeRender() {
        // Cod de initializare care se ruleaza inainte de redarea paginii (daca este necesar)
    }

    async convertToPDF() {

    }

}