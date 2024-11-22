document.addEventListener('DOMContentLoaded', function () {
    // Deschiderea modalului de printare
    const printButton = document.getElementById('print-button');
    const printModal = document.getElementById('printModal');
    const closePrintModal = document.getElementById('closePrintModal');

    // Daca butonul pentru printare este apasat, se deschide modalul
    if (printButton) {
        printButton.addEventListener('click', function () {
            printModal.style.display = 'block'; // Afișăm modalul
        });
    }

    // Inchide modalul cand se apas pe "X"
    closePrintModal.addEventListener('click', function () {
        printModal.style.display = 'none'; // Ascundem modalul
    });

    // Daca utilizatorul apasa pe "Convert to PDF and Print"
    const convertToPDFButton = document.getElementById('convertToPDF');
    convertToPDFButton.addEventListener('click', function () {
        const font = document.getElementById('font').value;
        const fontSize = document.getElementById('fontSize').value;
        const templateColor = document.getElementById('templateColor').value;
        const templateStyle = document.getElementById('templateStyle').value;

        // Cod pentru generarea PDF-ului folosind jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFont(font);
        doc.setFontSize(parseInt(fontSize));
        doc.setTextColor(templateColor);

        doc.text('Document Content', 10, 10);
        doc.text('This is your document content. Add more details here.', 10, 20);

        doc.save('document.pdf');

        printModal.style.display = 'none';
    });
});
