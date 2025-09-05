// Professional AI PowerPoint Generator - Main Application
class PowerPointGeneratorApp {
    constructor() {
        this.currentTopic = '';
        this.selectedTemplate = 'business-professional';
        this.selectedTheme = 'tech-blue';
        this.generatedPresentation = null;
        this.isGenerating = false;
        
        // Initialize components
        this.contentGenerator = new ContentGenerator();
        this.slideBuilder = new SlideBuilder();
        this.templateManager = new TemplateManager();
        this.exportHandler = new ExportHandler();
        
        // Initialize UI
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeTemplateManager();
    }

    initializeElements() {
        // Main form elements
        this.topicInput = document.getElementById('topicInput');
        this.generateBtn = document.getElementById('generateBtn');
        this.advancedOptionsBtn = document.getElementById('advancedOptionsBtn');
        
        // Progress and loading elements
        this.loadingSection = document.getElementById('loadingSection');
        this.progressBar = document.getElementById('progressBar');
        this.progressText = document.getElementById('progressText');
        this.loadingSteps = document.getElementById('loadingSteps');
        
        // Preview and results
        this.previewSection = document.getElementById('previewSection');
        this.slideContainer = document.getElementById('slideContainer');
        this.slideNavigation = document.getElementById('slideNavigation');
        this.exportOptions = document.getElementById('exportOptions');
        
        // Template and theme selectors
        this.templateSelector = document.getElementById('templateSelector');
        this.themeSelector = document.getElementById('themeSelector');
        
        // Example topic buttons
        this.exampleTopics = document.querySelectorAll('.example-topic');
    }

    initializeEventListeners() {
        // Main generate button
        if (this.generateBtn) {
            this.generateBtn.addEventListener('click', () => this.handleGenerate());
        }

        // Topic input enter key
        if (this.topicInput) {
            this.topicInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleGenerate();
                }
            });
            
            this.topicInput.addEventListener('input', (e) => {
                this.currentTopic = e.target.value.trim();
                this.updateGenerateButton();
            });
        }

        // Example topic buttons
        this.exampleTopics.forEach(button => {
            button.addEventListener('click', (e) => {
                const topic = e.target.textContent.trim();
                if (this.topicInput) {
                    this.topicInput.value = topic;
                    this.currentTopic = topic;
                    this.updateGenerateButton();
                }
            });
        });

        // Advanced options toggle
        if (this.advancedOptionsBtn) {
            this.advancedOptionsBtn.addEventListener('click', () => {
                this.toggleAdvancedOptions();
            });
        }

        // Template selection
        document.addEventListener('templateSelected', (e) => {
            this.selectedTemplate = e.detail.templateId;
            this.updatePreview();
        });

        // Theme selection
        document.addEventListener('themeSelected', (e) => {
            this.selectedTheme = e.detail.themeId;
            this.updatePreview();
        });

        // Export buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.export-btn[data-format]')) {
                const format = e.target.dataset.format;
                this.handleExport(format);
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                document.querySelector('.nav-links').classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initializeTemplateManager() {
        if (this.templateSelector) {
            this.templateSelector.innerHTML = this.templateManager.getTemplateSelectorHTML();
        }
        
        if (this.themeSelector) {
            this.themeSelector.innerHTML = this.templateManager.getThemeSelectorHTML();
        }
        
        this.templateManager.initializeEventListeners();
    }

    updateGenerateButton() {
        if (this.generateBtn) {
            if (this.currentTopic && this.currentTopic.length > 2) {
                this.generateBtn.disabled = false;
                this.generateBtn.classList.add('ready');
            } else {
                this.generateBtn.disabled = true;
                this.generateBtn.classList.remove('ready');
            }
        }
    }

    async handleGenerate() {
        if (!this.currentTopic || this.isGenerating) {
            return;
        }

        this.isGenerating = true;
        
        try {
            // Show loading section
            this.showLoading();
            
            // Step 1: Analyze topic
            this.updateProgress('Analyzing topic...', 20);
            await this.delay(500);
            
            // Step 2: Generate content
            this.updateProgress('Generating AI content...', 40);
            const presentationData = await this.contentGenerator.generatePresentation(this.currentTopic);
            await this.delay(800);
            
            // Step 3: Apply template
            this.updateProgress('Applying template...', 60);
            const template = this.templateManager.getTemplate(this.selectedTemplate);
            await this.delay(500);
            
            // Step 4: Build slides
            this.updateProgress('Building slides...', 80);
            await this.buildSlides(presentationData);
            await this.delay(500);
            
            // Step 5: Complete
            this.updateProgress('Finalizing presentation...', 100);
            await this.delay(300);
            
            // Show results
            this.showPreview(presentationData);
            this.generatedPresentation = presentationData;
            
        } catch (error) {
            console.error('Generation error:', error);
            this.showError('Failed to generate presentation. Please try again.');
        } finally {
            this.isGenerating = false;
        }
    }

    async buildSlides(presentationData) {
        if (!this.slideContainer) {
            this.slideContainer = document.getElementById('slideContainer') || 
                                   this.createSlideContainer();
        }

        // Clear existing slides
        this.slideContainer.innerHTML = '';
        
        const template = this.templateManager.getTemplate(this.selectedTemplate);
        const slides = [];

        try {
            // Generate slides based on presentation data and template
            for (let i = 0; i < presentationData.slides.length; i++) {
                const slideData = presentationData.slides[i];
                const slideElement = await this.slideBuilder.buildSlide(slideData, this.selectedTheme);
                
                slides.push(slideElement);
                this.slideContainer.appendChild(slideElement);
                
                // Small delay for smooth loading animation
                await this.delay(100);
            }
            
            // Initialize slide navigation
            this.initializeSlideNavigation(slides.length);
            
            return slides;
            
        } catch (error) {
            console.error('Error building slides:', error);
            throw error;
        }
    }

    createSlideContainer() {
        const container = document.createElement('div');
        container.id = 'slideContainer';
        container.className = 'slide-container';
        
        const previewSection = this.previewSection || document.getElementById('previewSection');
        if (previewSection) {
            previewSection.appendChild(container);
        }
        
        return container;
    }

    initializeSlideNavigation(slideCount) {
        if (!this.slideNavigation) {
            this.slideNavigation = document.getElementById('slideNavigation') || 
                                   this.createSlideNavigation();
        }

        const navHTML = `
            <div class="slide-nav-controls">
                <button class="nav-btn prev-btn" id="prevSlide" disabled>
                    <span>←</span> Previous
                </button>
                <span class="slide-counter">
                    <span id="currentSlide">1</span> / <span id="totalSlides">${slideCount}</span>
                </span>
                <button class="nav-btn next-btn" id="nextSlide" ${slideCount <= 1 ? 'disabled' : ''}>
                    Next <span>→</span>
                </button>
            </div>
            <div class="slide-thumbnails" id="slideThumbnails">
                ${Array.from({length: slideCount}, (_, i) => 
                    `<div class="thumbnail ${i === 0 ? 'active' : ''}" data-slide="${i + 1}">
                        <span>${i + 1}</span>
                    </div>`
                ).join('')}
            </div>
        `;
        
        this.slideNavigation.innerHTML = navHTML;
        this.initializeSlideNavigationEvents();
        this.currentSlideIndex = 0;
        this.showSlide(0);
    }

    createSlideNavigation() {
        const nav = document.createElement('div');
        nav.id = 'slideNavigation';
        nav.className = 'slide-navigation';
        
        const previewSection = this.previewSection || document.getElementById('previewSection');
        if (previewSection) {
            previewSection.appendChild(nav);
        }
        
        return nav;
    }

    initializeSlideNavigationEvents() {
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        const thumbnails = document.querySelectorAll('.thumbnail');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.showSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.previewSection && this.previewSection.style.display !== 'none') {
                if (e.key === 'ArrowLeft') {
                    this.previousSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            }
        });
    }

    showSlide(index) {
        const slides = this.slideContainer.querySelectorAll('.slide');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const currentSlideSpan = document.getElementById('currentSlide');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');

        if (index < 0 || index >= slides.length) return;

        // Hide all slides
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });

        // Update thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        // Update counter
        if (currentSlideSpan) {
            currentSlideSpan.textContent = index + 1;
        }

        // Update navigation buttons
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === slides.length - 1;

        this.currentSlideIndex = index;
    }

    previousSlide() {
        if (this.currentSlideIndex > 0) {
            this.showSlide(this.currentSlideIndex - 1);
        }
    }

    nextSlide() {
        const slides = this.slideContainer.querySelectorAll('.slide');
        if (this.currentSlideIndex < slides.length - 1) {
            this.showSlide(this.currentSlideIndex + 1);
        }
    }

    showLoading() {
        if (this.loadingSection) {
            this.loadingSection.style.display = 'block';
        }
        
        if (this.previewSection) {
            this.previewSection.style.display = 'none';
        }

        // Scroll to loading section
        if (this.loadingSection) {
            this.loadingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    hideLoading() {
        if (this.loadingSection) {
            this.loadingSection.style.display = 'none';
        }
    }

    showPreview(presentationData) {
        this.hideLoading();
        
        if (this.previewSection) {
            this.previewSection.style.display = 'block';
        }

        // Update export options
        this.initializeExportOptions();
        
        // Scroll to preview
        if (this.previewSection) {
            this.previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Show success message
        this.showNotification(`✅ Successfully generated ${presentationData.slides.length} slides!`, 'success');
    }

    initializeExportOptions() {
        if (!this.exportOptions) {
            this.exportOptions = document.getElementById('exportOptions') || 
                                 this.createExportOptions();
        }

        const exportHTML = this.exportHandler.buildExportSelector();
        this.exportOptions.innerHTML = exportHTML;
        this.exportHandler.initializeExportSelector();
    }

    createExportOptions() {
        const container = document.createElement('div');
        container.id = 'exportOptions';
        container.className = 'export-options';
        
        const previewSection = this.previewSection || document.getElementById('previewSection');
        if (previewSection) {
            previewSection.appendChild(container);
        }
        
        return container;
    }

    async handleExport(format) {
        if (!this.generatedPresentation) {
            this.showNotification('Please generate a presentation first', 'error');
            return;
        }

        try {
            const slides = Array.from(this.slideContainer.querySelectorAll('.slide'));
            const result = await this.exportHandler.exportPresentation(format, slides);
            
            if (result.success) {
                this.showNotification(result.message, 'success');
            } else {
                throw new Error(result.error || 'Export failed');
            }
        } catch (error) {
            console.error('Export error:', error);
            this.showNotification(`Export failed: ${error.message}`, 'error');
        }
    }

    updateProgress(text, percentage) {
        if (this.progressText) {
            this.progressText.textContent = text;
        }
        
        if (this.progressBar) {
            this.progressBar.style.width = `${percentage}%`;
        }

        // Update loading steps
        this.updateLoadingSteps(percentage);
    }

    updateLoadingSteps(percentage) {
        const steps = [
            { step: 1, threshold: 20, text: 'Analyzing Topic' },
            { step: 2, threshold: 40, text: 'Generating Content' },
            { step: 3, threshold: 60, text: 'Applying Template' },
            { step: 4, threshold: 80, text: 'Building Slides' },
            { step: 5, threshold: 100, text: 'Finalizing' }
        ];

        steps.forEach(({ step, threshold, text }) => {
            const stepElement = document.querySelector(`[data-step="${step}"]`);
            if (stepElement) {
                if (percentage >= threshold) {
                    stepElement.classList.add('completed');
                    stepElement.classList.remove('active');
                } else if (percentage >= threshold - 20) {
                    stepElement.classList.add('active');
                    stepElement.classList.remove('completed');
                }
            }
        });
    }

    toggleAdvancedOptions() {
        const advancedPanel = document.getElementById('advancedOptionsPanel');
        const btn = this.advancedOptionsBtn;
        
        if (advancedPanel) {
            const isVisible = advancedPanel.style.display === 'block';
            advancedPanel.style.display = isVisible ? 'none' : 'block';
            
            if (btn) {
                btn.classList.toggle('active', !isVisible);
                btn.innerHTML = isVisible ? 
                    '<span>⚙️</span> Advanced Options' : 
                    '<span>⚙️</span> Hide Options';
            }
        }
    }

    updatePreview() {
        if (this.generatedPresentation) {
            // Regenerate slides with new template/theme
            this.buildSlides(this.generatedPresentation);
        }
    }

    showError(message) {
        this.hideLoading();
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    ×
                </button>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if all required classes are available
    if (typeof ContentGenerator !== 'undefined' && 
        typeof SlideBuilder !== 'undefined' && 
        typeof TemplateManager !== 'undefined' && 
        typeof ExportHandler !== 'undefined') {
        
        window.powerPointGeneratorApp = new PowerPointGeneratorApp();
        console.log('✅ AI PowerPoint Generator initialized successfully!');
    } else {
        console.error('❌ Required classes not found. Please check that all JS files are loaded.');
        
        // Show fallback message
        const container = document.querySelector('.hero-content') || document.body;
        const fallback = document.createElement('div');
        fallback.innerHTML = `
            <div class="error-message" style="background: #fee; border: 1px solid #fcc; padding: 1rem; border-radius: 8px; margin: 1rem 0; color: #c00;">
                <strong>⚠️ Application Loading Error</strong><br>
                Some components failed to load. Please refresh the page or check your internet connection.
            </div>
        `;
        container.appendChild(fallback);
    }
});

// Make classes globally available for debugging
if (typeof window !== 'undefined') {
    window.PowerPointGeneratorApp = PowerPointGeneratorApp;
}
