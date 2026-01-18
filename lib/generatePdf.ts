import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { REPORT_DATA } from "./reportContent";

// Helper to fetch font as Base64/Binary
async function loadFonts(doc: jsPDF) {
    try {
        // 1. Construct the URL to the local file in the public folder
        const fontUrl = window.location.origin + '/fonts/Roboto-Regular.ttf';

        // 2. Fetch the font as an ArrayBuffer
        const response = await fetch(fontUrl);
        if (!response.ok) {
            // Try fallback to CDN if local fails (optional, but good for safety)
            console.warn("Local font not found in public/fonts, trying CDN fallback...");
            const cdnResponse = await fetch("https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf");
            if (!cdnResponse.ok) throw new Error("Failed to load font from local AND CDN");

            // If CDN works, use it (same logic)
            const buffer = await cdnResponse.arrayBuffer();
            const base64 = arrayBufferToBase64(buffer);
            doc.addFileToVFS("Roboto-Medium.ttf", base64);
            doc.addFont("Roboto-Medium.ttf", "Roboto", "normal");
            return;
        }

        const buffer = await response.arrayBuffer();

        // 3. Add font to PDF
        // Convert ArrayBuffer to binary string or base64. 
        // jsPDF addFileToVFS supports binary string content.
        const binary = arrayBufferToBinary(buffer);

        doc.addFileToVFS("Roboto-Regular.ttf", binary);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");

        console.log("Font loaded successfully!");

    } catch (err) {
        console.error("Font loading error:", err);
        // Alert is a bit aggressive here, maybe just log
        // Fallback to standard font handled in main function if font set fails
    }
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function arrayBufferToBinary(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return binary;
}

export const generateEfficiencyReport = async (
    score: number,
    revenue: string | number,
    zone: "red" | "green" | "yellow",
    lang: "en" | "ru"
) => {
    const doc = new jsPDF();

    // 1. Load Custom Font for Cyrillic
    await loadFonts(doc);
    doc.setFont("Roboto");

    try {
        const content = REPORT_DATA[lang][zone];
        const revenueDisplay = revenue.toLocaleString();

        // Header
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text("SAFAR ISAEV | Efficiency Audit", 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Date: ${new Date().toLocaleDateString()} | ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 14, 28);

        // Score Section
        doc.setFontSize(40);
        doc.setTextColor(zone === 'red' ? '#e11d48' : zone === 'yellow' ? '#d97706' : '#059669');
        doc.text(`${score}%`, 14, 50);

        // Revenue Risk Context
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
        doc.text(`Est. Revenue Input: $${revenueDisplay}`, 50, 45); // Adjust position as needed

        // Reset color
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);

        // Title & Role
        doc.text(content.title, 14, 65);
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text(content.role, 14, 72);

        // Diagnosis
        autoTable(doc, {
            startY: 80,
            head: [['DIAGNOSIS']],
            body: [[content.diagnosis]],
            styles: { font: "Roboto", fontSize: 11, cellPadding: 4 },
            headStyles: { fillColor: [40, 40, 40], textColor: 255, fontStyle: 'bold' }
        });

        // Imperatives
        const imperativesData = content.imperatives.map(imp => [`${imp.title}\n${imp.desc}`]);
        // @ts-ignore
        const nextY = doc.lastAutoTable.finalY + 10;

        autoTable(doc, {
            startY: nextY,
            head: [['STRATEGIC IMPERATIVES']],
            body: imperativesData,
            styles: { font: "Roboto", fontSize: 10, cellPadding: 4 },
            headStyles: { fillColor: [30, 30, 30], textColor: 255 },
            columnStyles: { 0: { cellWidth: 'auto' } }
        });

        // Pitch
        // @ts-ignore
        const finalY = doc.lastAutoTable.finalY + 10;

        autoTable(doc, {
            startY: finalY,
            head: [[content.pitch.title]],
            body: [[content.pitch.desc]],
            styles: { font: "Roboto", fontSize: 10, fillColor: [240, 240, 240], cellPadding: 6 },
            headStyles: { fillColor: [16, 185, 129], textColor: 255 } // Emerald-500
        });

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Generated by safarisaev.ai", 14, 280);

        doc.save('Safar_Isaev_Audit_Protocol.pdf');
        console.log("PDF Generated Successfully");

    } catch (error) {
        console.error("PDF Generation Failed:", error);
        alert("Error generating PDF. Please check console.");
    }
};
