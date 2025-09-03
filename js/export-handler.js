// Export Handler for Professional PPT Maker
class ExportHandler {
    constructor() {
        this.supportedFormats = ['pptx', 'pdf', 'png', 'jpg', 'html'];
        this.exportOptions = this.initializeExportOptions();
    }
    
    initializeExportOptions() {
        return {
            pptx: {
                quality: 'high',
                includeNotes: true,
                includeAnimations: false,
                slideSize: {
                    width: 10,
                    height: 5.625
                }
            },
            pdf: {
                quality: 'high',
                includeNotes: false,
                format: 'A4',
                orientation: 'landscape'
            },
            images: {
                format: 'png',
                quality: 0.9,
                width: 1920,
                height: 1080,
                includeNotes: false
            }
        };
    }
    
    async downloadPPT(slides, presentationData) {
        try {
            // Check if PptxGenJS is available
            if (typeof PptxGenJS === 'undefined') {
                throw new Error('PptxGenJS library not loaded');
            }
            
            const pptx = new PptxGenJS();
            
            // Set presentation properties
            this.setPresentationProperties(pptx, presentationData);
            
            // Add slides
            for (let i = 0; i < slides.length; i++) {
                await this.addSlideToPPTX(pptx, slides[i], presentationData);
            }
            
            // Generate and download
            const fileName = `${this.sanitizeFileName(presentationData.topic || 'presentation')}.pptx`;
            await pptx.writeFile({ fileName: fileName });
            
            return true;
        } catch (error) {
            console.error('PPT export failed:', error);
            // Fallback to HTML download
            return this.downloadHTML(slides, presentationData);
        }
    }
    
    setPresentationProperties(pptx, presentationData) {
        pptx.author = 'PPT Maker Pro';
        pptx.company = 'PPT Maker Pro';
        pptx.title = presentationData.topic || 'Generated Presentation';
        pptx.subject = `Presentation about ${presentationData.topic}`;
        pptx.category = presentationData.template || 'Business';
    }
    
    async addSlideToPPTX(pptx, slideData, presentationData) {
        const slide = pptx.addSlide();
        const template = presentationData.template || 'business';
        const colorScheme = presentationData.colorScheme || 'blue';
        
        // Set slide background
        this.setSlideBackground(slide, slideData, template, colorScheme);
        
        // Add content based on slide type
        switch (slideData.type) {
            case 'title':
                this.addTitleSlideContent(slide, slideData, template, colorScheme);
                break;
            case 'toc':
            case 'agenda':
                this.addAgendaSlideContent(slide, slideData, template, colorScheme);
                break;
            case 'content':
                this.addContentSlideContent(slide, slideData, template, colorScheme);
                break;
            case 'conclusion':
                this.addConclusionSlideContent(slide, slideData, template, colorScheme);
                break;
            case 'thankyou':
                this.addThankYouSlideContent(slide, slideData, template, colorScheme);
                break;
            default:
                this.addDefaultSlideContent(slide, slideData, template, colorScheme);
        }
        
        // Add speaker notes if available
        if (slideData.notes) {
            slide.addNotes(slideData.notes);
        }
    }
    
    setSlideBackground(slide, slideData, template, colorScheme) {
        const colors = this.getTemplateColors(template, colorScheme);
        
        if (slideData.type === 'title' && slideData.image) {
            // Add background image for title slide
            slide.background = { 
                path: slideData.image,
                transparency: 30
            };
        } else {
            // Set gradient background
            slide.background = {
                fill: {
                    type: 'gradient',
                    colors: [colors.background, colors.backgroundAlt || colors.background],
                    direction: 'toBottom'
                }
            };
        }
    }
    
    addTitleSlideContent(slide, slideData, template, colorScheme) {
        const colors = this.getTemplateColors(template, colorScheme);
        
        // Main title
        slide.addText(slideData.title, {
            x: 1,
            y: 2,
            w: 8,
            h: 1.5,
            fontSize: 44,
            fontFace: 'Arial',
            color: colors.primary,
            bold: true,
            align: 'center'
        });
        
        // Subtitle
        if (slideData.subtitle) {
            slide.addText(slideData.subtitle, {
                x: 1,
                y: 3.5,
                w: 8,
                h: 1,
                fontSize: 24,
                fontFace: 'Arial',
                color: colors.text,
                align: 'center'
            });
        }
    }
    
    addAgendaSlideContent(slide, slideData, template, colorScheme) {
        const colors = this.getTemplateColors(template, colorScheme);
        
        // Title
        slide.addText(slideData.title, {
            x: 1,
            y: 0.5,
            w: 8,
            h: 1,
            fontSize: 36,
            fontFace: 'Arial',
            color: colors.primary,
            bold: true
        });
        
        // Agenda items
        if (slideData.items && Array.isArray(slideData.items)) {
            slideData.items.forEach((item, index) => {
                slide.addText(`${index + 1}. ${item}`, {
                    x: 1.5,
                    y: 1.8 + (index * 0.5),
                    w: 7,
                    h: 0.4,
                    fontSize: 20,
                    fontFace: 'Arial',
                    color: colors.text
                });
            });
        }
    }
    
    addContentSlideContent(slide, slideData, template, colorScheme) {
        const colors = this.getTemplateColors(template, colorScheme);
        
        // Title
        slide.addText(slideData.title, {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.8,
            fontSize: 32,
            fontFace: 'Arial',
            color: colors.primary,
            bold: true
        });
        
        // Content points
        if (slideData.points && Array.isArray(slideData.points)) {
            slideData.points.forEach((point, index) => {
                slide.addText(`• ${point}`, {
                    x: 1,
                    y: 1.5 + (index * 0.6),
                    w: 8,
                    h: 0.5,
                    fontSize: 18,
                    fontFace: 'Arial',
                    color: colors.text,
                    lineSpacing: 24
                });
            });
        }
    }
    
    addConclusionSlideContent(slide, slideData, template, colorScheme) {
        const colors = this.getTemplateColors(template, colorScheme);
        
        // Title
        slide.addText(slideData.title, {
            x: 1,
            y: 1,
            w: 8,
            h: 1,
            fontSize: 36,
            fontFace: 'Arial',
            color: colors.primary,
            bold: true,
            align: 'center'
        });
        
        // Conclusion text
        if (slideData.text) {
            slide.addText(slideData.text, {
                x: 1,
                y: 2.5,
                w: 8,
                h: 2,
                fontSize: 20,
                fontFace: 'Arial',
                color: colors.text,
                align: 'center',
                lineSpacing: 28
            });
        }
    }
    
    addThankYouSlideContent(slide, slideData, template, colorScheme) {
        const colors = this.getTemplateColors(template, colorScheme);
        
        // Thank you title
        slide.addText(slideData.title, {
            x: 1,
            y: 2,
            w: 8,
            h: 1.5,
            fontSize: 48,
            fontFace: 'Arial',
            color: colors.primary,
            bold: true,
            align: 'center'
        });
        
        // Subtitle
        if (slideData.subtitle) {
            slide.addText(slideData.subtitle, {
                x: 1,
                y: 3.5,
                w: 8,
                h: 1,
                fontSize: 24,
                fontFace: 'Arial',
                color: colors.text,
                align: 'center'
            });
        }
    }
    
    addDefaultSlideContent(slide, slideData, template, colorScheme) {
        const colors = this.getTemplateColors(template, colorScheme);
        
        // Title
        slide.addText(slideData.title, {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.8,
            fontSize: 32,
            fontFace: 'Arial',
            color: colors.primary,
            bold: true
        });
        
        // Content
        if (slideData.content) {
            const content = Array.isArray(slideData.content) ? slideData.content.join('\n') : slideData.content;
            slide.addText(content, {
                x: 1,
                y: 1.5,
                w: 8,
                h: 3,
                fontSize: 18,
                fontFace: 'Arial',
                color: colors.text,
                lineSpacing: 24
            });
        }
    }
    
    async downloadPDF(slides, presentationData) {
        try {
            // Check if jsPDF is available
            if (typeof window.jsPDF === 'undefined') {
                throw new Error('jsPDF library not loaded');
            }
            
            const { jsPDF } = window.jsPDF;
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });
            
            // Set document properties
            pdf.setProperties({
                title: presentationData.topic || 'Generated Presentation',
                subject: `Presentation about ${presentationData.topic}`,
                author: 'PPT Maker Pro',
                creator: 'PPT Maker Pro'
            });
            
            // Generate PDF pages from slides
            for (let i = 0; i < slides.length; i++) {
                if (i > 0) {
                    pdf.addPage();
                }
                await this.addSlideToPDF(pdf, slides[i], presentationData, i);
            }
            
            // Download the PDF
            const fileName = `${this.sanitizeFileName(presentationData.topic || 'presentation')}.pdf`;
            pdf.save(fileName);
            
            return true;
        } catch (error) {
            console.error('PDF export failed:', error);
            throw error;
        }
    }
    
    async addSlideToPDF(pdf, slideData, presentationData, slideIndex) {
        const colors = this.getTemplateColors(presentationData.template, presentationData.colorScheme);
        
        // Add slide background
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, 297, 210, 'F');
        
        // Add title
        pdf.setFontSize(24);
        pdf.setTextColor(colors.primaryRGB.r, colors.primaryRGB.g, colors.primaryRGB.b);
        pdf.text(slideData.title || 'Slide Title', 20, 30);
        
        // Add content based on slide type
        let yPosition = 50;
        
        if (slideData.points && Array.isArray(slideData.points)) {
            pdf.setFontSize(14);
            pdf.setTextColor(colors.textRGB.r, colors.textRGB.g, colors.textRGB.b);
            
            slideData.points.forEach((point, index) => {
                const bulletPoint = `• ${point}`;
                const lines = pdf.splitTextToSize(bulletPoint, 250);
                pdf.text(lines, 30, yPosition);
                yPosition += lines.length * 8;
            });
        } else if (slideData.content) {
            pdf.setFontSize(14);
            pdf.setTextColor(colors.textRGB.r, colors.textRGB.g, colors.textRGB.b);
            
            const content = Array.isArray(slideData.content) ? slideData.content.join('\n') : slideData.content;
            const lines = pdf.splitTextToSize(content, 250);
            pdf.text(lines, 30, yPosition);
        }
        
        // Add page number
        pdf.setFontSize(10);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`${slideIndex + 1}`, 280, 200);
    }
    
    async downloadImages(slides, presentationData) {
        try {
            if (typeof html2canvas === 'undefined') {
                throw new Error('html2canvas library not loaded');
            }
            
            const zip = new JSZip();
            const images = zip.folder('presentation-images');
            
            // Get all slide elements
            const slideElements = document.querySelectorAll('.slide');
            
            for (let i = 0; i < slideElements.length && i < slides.length; i++) {
                const slideElement = slideElements[i];
                const slideData = slides[i];
                
                // Capture slide as image
                const canvas = await html2canvas(slideElement, {
                    width: 1920,
                    height: 1080,
                    scale: 1,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: '#ffffff'
                });
                
                // Convert to blob
                const blob = await new Promise(resolve => {
                    canvas.toBlob(resolve, 'image/png', 0.9);
                });
                
                // Add to zip
                const fileName = `slide-${String(i + 1).padStart(2, '0')}-${this.sanitizeFileName(slideData.title || 'slide')}.png`;
                images.file(fileName, blob);
            }
            
            // Generate and download zip
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const fileName = `${this.sanitizeFileName(presentationData.topic || 'presentation')}-images.zip`;
            this.downloadBlob(zipBlob, fileName);
            
            return true;
        } catch (error) {
            console.error('Image export failed:', error);
            throw error;
        }
    }
    
    async downloadHTML(slides, presentationData) {
        try {
            const html = this.generateHTML(slides, presentationData);
            const blob = new Blob([html], { type: 'text/html' });
            const fileName = `${this.sanitizeFileName(presentationData.topic || 'presentation')}.html`;
            this.downloadBlob(blob, fileName);
            return true;
        } catch (error) {
            console.error('HTML export failed:', error);
            throw error;
        }
    }
    
    generateHTML(slides, presentationData) {
        const template = presentationData.template || 'business';
        const colorScheme = presentationData.colorScheme || 'blue';
        
        const slidesHTML = slides.map((slide, index) => {
            return this.generateSlideHTML(slide, index, template, colorScheme);
        }).join('\n');
        
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${presentationData.topic || 'Presentation'}</title>
    <style>
        ${this.generateEmbeddedCSS(template, colorScheme)}
    </style>
</head>
<body>
    <div class="presentation-container">
        <header class="presentation-header">
            <h1>${presentationData.topic || 'Presentation'}</h1>
            <p>Generated by PPT Maker Pro</p>
        </header>
        
        <div class="slides-container">
            ${slidesHTML}
        </div>
        
        <nav class="presentation-nav">
            <button onclick="previousSlide()">← Previous</button>
            <span id="slide-counter">1 / ${slides.length}</span>
            <button onclick="nextSlide()">Next →</button>
        </nav>
    </div>
    
    <script>
        ${this.generateEmbeddedJS(slides.length)}
    </script>
</body>
</html>`;
    }
    
    generateSlideHTML(slide, index, template, colorScheme) {
        const isActive = index === 0 ? 'active' : '';
        
        let content = `<h2 class="slide-title">${slide.title || 'Slide Title'}</h2>`;
        
        if (slide.points && Array.isArray(slide.points)) {
            content += '<ul class="slide-list">';
            slide.points.forEach(point => {
                content += `<li>${point}</li>`;
            });
            content += '</ul>';
        } else if (slide.content) {
            const contentText = Array.isArray(slide.content) ? slide.content.join('</p><p>') : slide.content;
            content += `<div class="slide-text"><p>${contentText}</p></div>`;
        }
        
        return `
        <div class="slide slide-${slide.type || 'content'} theme-${template} color-${colorScheme} ${isActive}" data-slide-index="${index}">
            <div class="slide-content">
                ${content}
            </div>
        </div>`;
    }
    
    generateEmbeddedCSS(template, colorScheme) {
        return `
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            background: #f5f5f5; 
        }
        .presentation-container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .presentation-header { 
            text-align: center; 
            margin-bottom: 30px; 
        }
        .slides-container { 
            position: relative; 
            background: white; 
            border-radius: 10px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
            overflow: hidden; 
        }
        .slide { 
            display: none; 
            padding: 40px; 
            min-height: 500px; 
        }
        .slide.active { 
            display: block; 
        }
        .slide-title { 
            color: #2563eb; 
            margin-bottom: 30px; 
            font-size: 2rem; 
        }
        .slide-list { 
            font-size: 1.1rem; 
            line-height: 1.8; 
        }
        .slide-list li { 
            margin-bottom: 10px; 
        }
        .slide-text { 
            font-size: 1.1rem; 
            line-height: 1.8; 
        }
        .presentation-nav { 
            text-align: center; 
            margin-top: 20px; 
        }
        .presentation-nav button { 
            background: #2563eb; 
            color: white; 
            border: none; 
            padding: 10px 20px; 
            margin: 0 10px; 
            border-radius: 5px; 
            cursor: pointer; 
        }
        .presentation-nav button:hover { 
            background: #1e40af; 
        }
        .presentation-nav button:disabled { 
            background: #ccc; 
            cursor: not-allowed; 
        }
        #slide-counter { 
            margin: 0 20px; 
            font-weight: bold; 
        }
        @media print {
            .slide { display: block !important; page-break-after: always; }
            .presentation-nav { display: none; }
        }`;
    }
    
    generateEmbeddedJS(slideCount) {
        return `
        let currentSlide = 0;
        const totalSlides = ${slideCount};
        
        function showSlide(index) {
            document.querySelectorAll('.slide').forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            document.getElementById('slide-counter').textContent = \`\${index + 1} / \${totalSlides}\`;
            updateNavButtons();
        }
        
        function nextSlide() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                showSlide(currentSlide);
            }
        }
        
        function previousSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                showSlide(currentSlide);
            }
        }
        
        function updateNavButtons() {
            const prevBtn = document.querySelector('.presentation-nav button:first-child');
            const nextBtn = document.querySelector('.presentation-nav button:last-child');
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') previousSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Initialize
        updateNavButtons();`;
    }
    
    getTemplateColors(template, colorScheme) {
        const colorMappings = {
            blue: { 
                primary: '#2563eb', 
                text: '#1f2937', 
                background: '#ffffff', 
                backgroundAlt: '#f8fafc',
                primaryRGB: { r: 37, g: 99, b: 235 },
                textRGB: { r: 31, g: 41, b: 55 }
            },
            green: { 
                primary: '#059669', 
                text: '#1f2937', 
                background: '#ffffff', 
                backgroundAlt: '#f0fdf4',
                primaryRGB: { r: 5, g: 150, b: 105 },
                textRGB: { r: 31, g: 41, b: 55 }
            },
            purple: { 
                primary: '#7c3aed', 
                text: '#1f2937', 
                background: '#ffffff', 
                backgroundAlt: '#faf5ff',
                primaryRGB: { r: 124, g: 58, b: 237 },
                textRGB: { r: 31, g: 41, b: 55 }
            },
            orange: { 
                primary: '#ea580c', 
                text: '#1f2937', 
                background: '#ffffff', 
                backgroundAlt: '#fff7ed',
                primaryRGB: { r: 234, g: 88, b: 12 },
                textRGB: { r: 31, g: 41, b: 55 }
            }
        };
        
        return colorMappings[colorScheme] || colorMappings.blue;
    }
    
    sanitizeFileName(fileName) {
        return fileName
            .replace(/[^a-z0-9]/gi, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '')
            .toLowerCase()
            .substring(0, 50);
    }
    
    downloadBlob(blob, fileName) {
        if (typeof saveAs !== 'undefined') {
            // Use FileSaver.js if available
            saveAs(blob, fileName);
        } else {
            // Fallback method
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
    
    // Utility methods for format checking
    isFormatSupported(format) {
        return this.supportedFormats.includes(format.toLowerCase());
    }
    
    getExportOptions(format) {
        return this.exportOptions[format] || {};
    }
    
    setExportOption(format, option, value) {
        if (this.exportOptions[format]) {
            this.exportOptions[format][option] = value;
        }
    }
}

// Initialize export handler when DOM is loaded
if (typeof window !== 'undefined') {
    window.exportHandler = new ExportHandler();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExportHandler;
}
