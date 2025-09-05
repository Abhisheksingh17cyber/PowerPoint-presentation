// Advanced Export Handler for Multiple Formats
class ExportHandler {
    constructor() {
        this.supportedFormats = ['pdf', 'pptx', 'html', 'images'];
        this.exportOptions = this.initializeExportOptions();
        this.isExporting = false;
    }

    initializeExportOptions() {
        return {
            pdf: {
                name: 'PDF Document',
                description: 'Export as a PDF file for easy sharing',
                icon: '📄',
                options: {
                    pageSize: 'A4',
                    orientation: 'landscape',
                    quality: 'high',
                    includeAnimations: false
                }
            },
            pptx: {
                name: 'PowerPoint File',
                description: 'Export as PPTX for editing in PowerPoint',
                icon: '📊',
                options: {
                    includeAnimations: true,
                    includeNotes: false,
                    slideSize: 'standard'
                }
            },
            html: {
                name: 'HTML Presentation',
                description: 'Export as interactive HTML presentation',
                icon: '🌐',
                options: {
                    includeNavigation: true,
                    includeAnimations: true,
                    responsive: true,
                    theme: 'default'
                }
            },
            images: {
                name: 'Image Set',
                description: 'Export each slide as high-quality images',
                icon: '🖼️',
                options: {
                    format: 'png',
                    quality: 'high',
                    width: 1920,
                    height: 1080,
                    includeBackground: true
                }
            }
        };
    }

    async exportPresentation(format, slides, options = {}) {
        if (!this.supportedFormats.includes(format)) {
            throw new Error(`Unsupported export format: ${format}`);
        }

        if (this.isExporting) {
            throw new Error('Export already in progress');
        }

        this.isExporting = true;
        
        try {
            const exportOptions = { ...this.exportOptions[format].options, ...options };
            
            switch (format) {
                case 'pdf':
                    return await this.exportToPDF(slides, exportOptions);
                case 'pptx':
                    return await this.exportToPPTX(slides, exportOptions);
                case 'html':
                    return await this.exportToHTML(slides, exportOptions);
                case 'images':
                    return await this.exportToImages(slides, exportOptions);
                default:
                    throw new Error(`Export method not implemented for ${format}`);
            }
        } finally {
            this.isExporting = false;
        }
    }

    async exportToPDF(slides, options) {
        // Show progress
        this.showExportProgress('Generating PDF...', 0);
        
        try {
            // Create a new jsPDF instance
            const { jsPDF } = window.jspdf || {};
            if (!jsPDF) {
                throw new Error('jsPDF library not loaded');
            }

            const pdf = new jsPDF({
                orientation: options.orientation || 'landscape',
                unit: 'mm',
                format: options.pageSize || 'a4'
            });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;

            for (let i = 0; i < slides.length; i++) {
                this.updateExportProgress(`Processing slide ${i + 1}/${slides.length}...`, 
                    (i / slides.length) * 80);

                if (i > 0) {
                    pdf.addPage();
                }

                // Convert slide to canvas
                const canvas = await this.slideToCanvas(slides[i], {
                    width: (pageWidth - 2 * margin) * 3.78, // Convert mm to px
                    height: (pageHeight - 2 * margin) * 3.78,
                    backgroundColor: '#ffffff'
                });

                // Add canvas to PDF
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', margin, margin, 
                    pageWidth - 2 * margin, pageHeight - 2 * margin);
            }

            this.updateExportProgress('Finalizing PDF...', 90);

            // Generate filename
            const filename = `presentation-${this.generateTimestamp()}.pdf`;
            
            // Save the PDF
            pdf.save(filename);

            this.hideExportProgress();
            
            return {
                success: true,
                format: 'pdf',
                filename: filename,
                message: 'PDF exported successfully!'
            };

        } catch (error) {
            this.hideExportProgress();
            console.error('PDF export error:', error);
            throw new Error(`PDF export failed: ${error.message}`);
        }
    }

    async exportToPPTX(slides, options) {
        this.showExportProgress('Generating PowerPoint...', 0);
        
        try {
            // Use PptxGenJS library
            const pptx = new PptxGenJS();
            
            // Set slide size
            pptx.defineLayout({ 
                name: 'custom', 
                width: 10, 
                height: 5.625 
            });
            pptx.layout = 'custom';

            for (let i = 0; i < slides.length; i++) {
                this.updateExportProgress(`Processing slide ${i + 1}/${slides.length}...`, 
                    (i / slides.length) * 80);

                const slide = pptx.addSlide();
                await this.addSlideContentToPPTX(slide, slides[i], options);
            }

            this.updateExportProgress('Finalizing PowerPoint...', 90);

            const filename = `presentation-${this.generateTimestamp()}.pptx`;
            await pptx.writeFile({ fileName: filename });

            this.hideExportProgress();

            return {
                success: true,
                format: 'pptx',
                filename: filename,
                message: 'PowerPoint file exported successfully!'
            };

        } catch (error) {
            this.hideExportProgress();
            console.error('PPTX export error:', error);
            
            // Fallback to HTML export if PPTX fails
            console.log('Falling back to HTML export...');
            return await this.exportToHTML(slides, options);
        }
    }

    async exportToHTML(slides, options) {
        this.showExportProgress('Generating HTML presentation...', 0);
        
        try {
            const htmlContent = await this.generateHTMLPresentation(slides, options);
            
            this.updateExportProgress('Finalizing HTML...', 90);
            
            const filename = `presentation-${this.generateTimestamp()}.html`;
            this.downloadFile(htmlContent, filename, 'text/html');

            this.hideExportProgress();

            return {
                success: true,
                format: 'html',
                filename: filename,
                message: 'HTML presentation exported successfully!'
            };

        } catch (error) {
            this.hideExportProgress();
            console.error('HTML export error:', error);
            throw new Error(`HTML export failed: ${error.message}`);
        }
    }

    async exportToImages(slides, options) {
        this.showExportProgress('Generating images...', 0);
        
        try {
            const images = [];
            const zip = new JSZip();

            for (let i = 0; i < slides.length; i++) {
                this.updateExportProgress(`Converting slide ${i + 1}/${slides.length}...`, 
                    (i / slides.length) * 80);

                const canvas = await this.slideToCanvas(slides[i], {
                    width: options.width || 1920,
                    height: options.height || 1080,
                    backgroundColor: options.includeBackground ? '#ffffff' : 'transparent'
                });

                const imageData = canvas.toDataURL(`image/${options.format || 'png'}`);
                const base64Data = imageData.split(',')[1];
                
                const filename = `slide-${String(i + 1).padStart(2, '0')}.${options.format || 'png'}`;
                zip.file(filename, base64Data, { base64: true });
                
                images.push({
                    filename: filename,
                    data: imageData
                });
            }

            this.updateExportProgress('Creating archive...', 90);

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const zipFilename = `presentation-slides-${this.generateTimestamp()}.zip`;
            
            this.downloadBlob(zipBlob, zipFilename);

            this.hideExportProgress();

            return {
                success: true,
                format: 'images',
                filename: zipFilename,
                count: images.length,
                message: `${images.length} images exported successfully!`
            };

        } catch (error) {
            this.hideExportProgress();
            console.error('Images export error:', error);
            throw new Error(`Images export failed: ${error.message}`);
        }
    }

    async slideToCanvas(slideElement, options = {}) {
        // Use html2canvas library
        if (!window.html2canvas) {
            throw new Error('html2canvas library not loaded');
        }

        const canvas = await html2canvas(slideElement, {
            width: options.width || 1920,
            height: options.height || 1080,
            backgroundColor: options.backgroundColor || '#ffffff',
            scale: 2,
            useCORS: true,
            allowTaint: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: options.width || 1920,
            windowHeight: options.height || 1080
        });

        return canvas;
    }

    async addSlideContentToPPTX(slide, slideElement, options) {
        try {
            // Extract slide content
            const title = slideElement.querySelector('.slide-title')?.textContent || '';
            const content = Array.from(slideElement.querySelectorAll('.content-item'))
                .map(item => item.textContent);
            
            // Add title
            if (title) {
                slide.addText(title, {
                    x: 0.5,
                    y: 0.5,
                    w: 9,
                    h: 1,
                    fontSize: 24,
                    color: '2563eb',
                    bold: true,
                    fontFace: 'Arial'
                });
            }

            // Add content
            if (content.length > 0) {
                slide.addText(content, {
                    x: 0.5,
                    y: 2,
                    w: 9,
                    h: 3,
                    fontSize: 16,
                    color: '1f2937',
                    fontFace: 'Arial',
                    bullet: true
                });
            }

            // Add images if present
            const images = slideElement.querySelectorAll('.slide-image');
            for (let img of images) {
                try {
                    const imgData = await this.imageToBase64(img.src);
                    slide.addImage({
                        data: imgData,
                        x: 5.5,
                        y: 2,
                        w: 4,
                        h: 3
                    });
                } catch (e) {
                    console.warn('Failed to add image to slide:', e);
                }
            }

        } catch (error) {
            console.warn('Error adding slide content to PPTX:', error);
        }
    }

    async generateHTMLPresentation(slides, options) {
        const slideHTML = slides.map((slide, index) => {
            return `
                <section class="slide" id="slide-${index + 1}">
                    ${slide.innerHTML}
                </section>
            `;
        }).join('');

        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Presentation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            overflow: hidden;
        }
        
        .presentation-container {
            position: relative;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .slide {
            width: 90vw;
            max-width: 1200px;
            height: 80vh;
            max-height: 675px;
            display: none;
            animation: slideIn 0.5s ease-out;
        }
        
        .slide.active {
            display: block;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .navigation {
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 1rem;
            z-index: 1000;
        }
        
        .nav-btn {
            padding: 0.75rem 1.5rem;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            color: #1f2937;
            transition: all 0.3s ease;
        }
        
        .nav-btn:hover {
            background: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .nav-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .slide-counter {
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: rgba(255, 255, 255, 0.9);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: 600;
            color: #1f2937;
        }
        
        .progress-bar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
        }
        
        .progress-fill {
            height: 100%;
            background: #3b82f6;
            transition: width 0.3s ease;
            width: 0;
        }
    </style>
</head>
<body>
    <div class="progress-bar">
        <div class="progress-fill" id="progressFill"></div>
    </div>
    
    <div class="slide-counter" id="slideCounter">
        1 / ${slides.length}
    </div>
    
    <div class="presentation-container">
        ${slideHTML}
    </div>
    
    ${options.includeNavigation ? `
    <div class="navigation">
        <button class="nav-btn" id="prevBtn" onclick="previousSlide()">Previous</button>
        <button class="nav-btn" id="nextBtn" onclick="nextSlide()">Next</button>
        <button class="nav-btn" onclick="toggleFullscreen()">Fullscreen</button>
    </div>
    ` : ''}
    
    <script>
        let currentSlide = 0;
        const totalSlides = ${slides.length};
        
        function showSlide(n) {
            const slides = document.querySelectorAll('.slide');
            const counter = document.getElementById('slideCounter');
            const progressFill = document.getElementById('progressFill');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (n >= totalSlides) currentSlide = totalSlides - 1;
            if (n < 0) currentSlide = 0;
            
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide].classList.add('active');
            
            if (counter) {
                counter.textContent = \`\${currentSlide + 1} / \${totalSlides}\`;
            }
            
            if (progressFill) {
                progressFill.style.width = \`\${((currentSlide + 1) / totalSlides) * 100}%\`;
            }
            
            if (prevBtn) prevBtn.disabled = currentSlide === 0;
            if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
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
        
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    nextSlide();
                    break;
                case 'ArrowLeft':
                    previousSlide();
                    break;
                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    break;
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
            }
        });
        
        // Initialize
        showSlide(0);
    </script>
</body>
</html>`;

        return html;
    }

    async imageToBase64(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL());
            };
            img.onerror = reject;
            img.src = url;
        });
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        this.downloadBlob(blob, filename);
    }

    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    generateTimestamp() {
        const now = new Date();
        return now.getFullYear() + 
               String(now.getMonth() + 1).padStart(2, '0') + 
               String(now.getDate()).padStart(2, '0') + '-' +
               String(now.getHours()).padStart(2, '0') + 
               String(now.getMinutes()).padStart(2, '0');
    }

    showExportProgress(message, progress) {
        let progressModal = document.getElementById('exportProgressModal');
        
        if (!progressModal) {
            progressModal = document.createElement('div');
            progressModal.id = 'exportProgressModal';
            progressModal.className = 'export-progress-modal';
            progressModal.innerHTML = `
                <div class="progress-content">
                    <div class="progress-icon">
                        <div class="spinner"></div>
                    </div>
                    <div class="progress-message" id="progressMessage">${message}</div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" id="progressBarFill" style="width: ${progress}%"></div>
                        </div>
                        <div class="progress-percentage" id="progressPercentage">${Math.round(progress)}%</div>
                    </div>
                </div>
            `;
            document.body.appendChild(progressModal);
        }

        // Add styles if not present
        if (!document.getElementById('exportProgressStyles')) {
            const styles = document.createElement('style');
            styles.id = 'exportProgressStyles';
            styles.textContent = `
                .export-progress-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    backdrop-filter: blur(4px);
                }
                
                .progress-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    min-width: 400px;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                }
                
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f4f6;
                    border-top: 4px solid #3b82f6;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .progress-message {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #1f2937;
                    margin-bottom: 1.5rem;
                }
                
                .progress-bar-container {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .progress-bar-bg {
                    flex: 1;
                    height: 8px;
                    background: #f3f4f6;
                    border-radius: 4px;
                    overflow: hidden;
                }
                
                .progress-bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
                    transition: width 0.3s ease;
                }
                
                .progress-percentage {
                    font-weight: 600;
                    color: #3b82f6;
                    min-width: 40px;
                }
            `;
            document.head.appendChild(styles);
        }

        progressModal.style.display = 'flex';
    }

    updateExportProgress(message, progress) {
        const progressMessage = document.getElementById('progressMessage');
        const progressBarFill = document.getElementById('progressBarFill');
        const progressPercentage = document.getElementById('progressPercentage');
        
        if (progressMessage) progressMessage.textContent = message;
        if (progressBarFill) progressBarFill.style.width = `${progress}%`;
        if (progressPercentage) progressPercentage.textContent = `${Math.round(progress)}%`;
    }

    hideExportProgress() {
        const progressModal = document.getElementById('exportProgressModal');
        if (progressModal) {
            progressModal.style.display = 'none';
        }
    }

    getExportFormats() {
        return Object.entries(this.exportOptions).map(([key, option]) => ({
            id: key,
            ...option
        }));
    }

    buildExportSelector() {
        const formats = this.getExportFormats();
        
        return `
            <div class="export-selector">
                <h3 class="selector-title">Choose Export Format</h3>
                <div class="export-formats">
                    ${formats.map(format => `
                        <div class="export-format-card" data-format="${format.id}">
                            <div class="format-icon">${format.icon}</div>
                            <div class="format-info">
                                <h4 class="format-name">${format.name}</h4>
                                <p class="format-description">${format.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="export-actions">
                    <button class="export-btn" id="exportBtn" disabled>
                        <span class="btn-icon">📥</span>
                        Export Presentation
                    </button>
                </div>
            </div>
        `;
    }

    initializeExportSelector() {
        // Add event listeners for format selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.export-format-card')) {
                const formatCard = e.target.closest('.export-format-card');
                const formatId = formatCard.dataset.format;
                
                // Remove previous selection
                document.querySelectorAll('.export-format-card').forEach(card => 
                    card.classList.remove('selected'));
                
                // Add selection to clicked card
                formatCard.classList.add('selected');
                
                // Enable export button
                const exportBtn = document.getElementById('exportBtn');
                if (exportBtn) {
                    exportBtn.disabled = false;
                    exportBtn.onclick = () => this.handleExportClick(formatId);
                }
            }
        });
    }

    async handleExportClick(format) {
        try {
            const slides = document.querySelectorAll('.slide');
            if (slides.length === 0) {
                throw new Error('No slides to export');
            }

            const result = await this.exportPresentation(format, Array.from(slides));
            
            // Show success message
            this.showNotification(result.message, 'success');
            
        } catch (error) {
            console.error('Export failed:', error);
            this.showNotification(`Export failed: ${error.message}`, 'error');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        // Add styles
        if (!document.getElementById('notificationStyles')) {
            const styles = document.createElement('style');
            styles.id = 'notificationStyles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 2rem;
                    right: 2rem;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
                    z-index: 10001;
                    animation: slideInFromRight 0.3s ease-out;
                    max-width: 400px;
                }
                
                .notification-success {
                    border-left: 4px solid #10b981;
                }
                
                .notification-error {
                    border-left: 4px solid #ef4444;
                }
                
                .notification-info {
                    border-left: 4px solid #3b82f6;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                
                .notification-message {
                    font-weight: 500;
                    color: #1f2937;
                }
                
                @keyframes slideInFromRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInFromRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}
