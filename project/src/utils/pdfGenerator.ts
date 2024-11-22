import html2pdf from 'html2pdf.js';

export const generatePDF = async (documentType: 'resume' | 'cover-letter') => {
  const element = document.getElementById(documentType);
  if (!element) {
    console.error(`Element with id "${documentType}" not found`);
    return;
  }

  const options = {
    margin: 1,
    filename: `${documentType}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
