export const exportToPDF = async (paperRef, filename = "my-resume.pdf") => {
  if (!paperRef?.current) {
    alert("Resume content not found!");
    return;
  }

  const paper = paperRef.current;
  const currentWidth = parseFloat(paper.style.width) || 794;
  const pageFormat = currentWidth > 800 ? "Letter" : "A4";

  const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume</title>
  <style>
    @page { size: ${pageFormat}; margin: 0; }
    body { margin:0; padding:0; background:white; }
  </style>
</head>
<body>
  ${paper.outerHTML}
</body>
</html>`;

  try {
    // in exportPDF.js or wherever you make the call
const response = await fetch("http://localhost:3000/api/resumes/generate-pdf", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    html: fullHTML,
    format: pageFormat,         // "A4" or "Letter"
    filename: "my-resume.pdf"
  }),
});

    if (!response.ok) throw new Error(await response.text());

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.log(err);
    alert("❌ PDF failed. Make sure backend is running on http://localhost:3000");
  }
};