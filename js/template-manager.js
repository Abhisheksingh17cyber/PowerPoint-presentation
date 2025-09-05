// Advanced Template Manager for Professional Presentations
class TemplateManager {
    constructor() {
        this.templates = this.initializeTemplates();
        this.currentTheme = 'tech-blue';
        this.themes = this.initializeThemes();
    }

    initializeTemplates() {
        return {
            'business-professional': {
                name: 'Business Professional',
                description: 'Clean, corporate design perfect for business presentations',
                theme: 'corporate-blue',
                slides: [
                    {
                        type: 'title',
                        layout: 'hero',
                        animation: 'fadeInUp'
                    },
                    {
                        type: 'content',
                        layout: 'content-with-image',
                        animation: 'slideInLeft'
                    },
                    {
                        type: 'statistics',
                        layout: 'stats-grid',
                        animation: 'staggeredFadeIn'
                    },
                    {
                        type: 'chart',
                        layout: 'chart-focus',
                        animation: 'slideInUp'
                    },
                    {
                        type: 'content',
                        layout: 'two-column',
                        animation: 'slideInRight'
                    },
                    {
                        type: 'conclusion',
                        layout: 'centered',
                        animation: 'fadeInScale'
                    }
                ]
            },
            'tech-innovation': {
                name: 'Tech Innovation',
                description: 'Modern, tech-focused design with gradient backgrounds',
                theme: 'tech-blue',
                slides: [
                    {
                        type: 'title',
                        layout: 'hero',
                        animation: 'fadeInScale'
                    },
                    {
                        type: 'content',
                        layout: 'content-with-image',
                        animation: 'slideInLeft'
                    },
                    {
                        type: 'statistics',
                        layout: 'stats-grid',
                        animation: 'staggeredFadeIn'
                    },
                    {
                        type: 'chart',
                        layout: 'chart-focus',
                        animation: 'slideInUp'
                    },
                    {
                        type: 'content',
                        layout: 'content-with-image',
                        animation: 'slideInRight'
                    },
                    {
                        type: 'conclusion',
                        layout: 'centered',
                        animation: 'fadeInUp'
                    }
                ]
            },
            'eco-friendly': {
                name: 'Eco-Friendly',
                description: 'Green-themed design for environmental and sustainability topics',
                theme: 'eco-green',
                slides: [
                    {
                        type: 'title',
                        layout: 'hero',
                        animation: 'fadeInUp'
                    },
                    {
                        type: 'content',
                        layout: 'content-with-image',
                        animation: 'slideInLeft'
                    },
                    {
                        type: 'chart',
                        layout: 'chart-focus',
                        animation: 'slideInUp'
                    },
                    {
                        type: 'statistics',
                        layout: 'stats-grid',
                        animation: 'staggeredFadeIn'
                    },
                    {
                        type: 'content',
                        layout: 'two-column',
                        animation: 'slideInRight'
                    },
                    {
                        type: 'conclusion',
                        layout: 'centered',
                        animation: 'fadeInScale'
                    }
                ]
            },
            'modern-minimal': {
                name: 'Modern Minimal',
                description: 'Clean, minimal design with focus on content',
                theme: 'modern-blue',
                slides: [
                    {
                        type: 'title',
                        layout: 'hero',
                        animation: 'fadeInUp'
                    },
                    {
                        type: 'content',
                        layout: 'content-with-image',
                        animation: 'slideInLeft'
                    },
                    {
                        type: 'statistics',
                        layout: 'stats-grid',
                        animation: 'staggeredFadeIn'
                    },
                    {
                        type: 'chart',
                        layout: 'chart-focus',
                        animation: 'slideInUp'
                    },
                    {
                        type: 'conclusion',
                        layout: 'centered',
                        animation: 'fadeInScale'
                    }
                ]
            },
            'executive-summary': {
                name: 'Executive Summary',
                description: 'Professional template for executive presentations and board meetings',
                theme: 'corporate-blue',
                slides: [
                    {
                        type: 'title',
                        layout: 'professional-title',
                        animation: 'professionalFadeIn'
                    },
                    {
                        type: 'content',
                        layout: 'content-split',
                        animation: 'slideInDiagonal'
                    },
                    {
                        type: 'statistics',
                        layout: 'data-visualization',
                        animation: 'fadeInWithBlur'
                    },
                    {
                        type: 'content',
                        layout: 'comparison',
                        animation: 'slideInFromRight'
                    },
                    {
                        type: 'chart',
                        layout: 'chart-focus',
                        animation: 'zoomIn'
                    },
                    {
                        type: 'conclusion',
                        layout: 'quote',
                        animation: 'bounceIn'
                    }
                ]
            },
            'creative-portfolio': {
                name: 'Creative Portfolio',
                description: 'Vibrant template for showcasing creative work and portfolios',
                theme: 'purple-gradient',
                slides: [
                    {
                        type: 'title',
                        layout: 'hero',
                        animation: 'slideInFromTop'
                    },
                    {
                        type: 'content',
                        layout: 'image-showcase',
                        animation: 'zoomIn'
                    },
                    {
                        type: 'content',
                        layout: 'content-split',
                        animation: 'slideInWithRotation'
                    },
                    {
                        type: 'statistics',
                        layout: 'data-visualization',
                        animation: 'fadeInScale'
                    },
                    {
                        type: 'content',
                        layout: 'timeline',
                        animation: 'slideInFromLeft'
                    },
                    {
                        type: 'conclusion',
                        layout: 'quote',
                        animation: 'bounceIn'
                    }
                ]
            },
            'data-analytics': {
                name: 'Data Analytics',
                description: 'Template optimized for data-heavy presentations and analytics reports',
                theme: 'tech-blue',
                slides: [
                    {
                        type: 'title',
                        layout: 'professional-title',
                        animation: 'slideInFromTop'
                    },
                    {
                        type: 'chart',
                        layout: 'data-visualization',
                        animation: 'fadeInWithBlur'
                    },
                    {
                        type: 'statistics',
                        layout: 'stats-grid',
                        animation: 'staggeredFadeIn'
                    },
                    {
                        type: 'content',
                        layout: 'comparison',
                        animation: 'slideInDiagonal'
                    },
                    {
                        type: 'chart',
                        layout: 'chart-focus',
                        animation: 'zoomIn'
                    },
                    {
                        type: 'content',
                        layout: 'timeline',
                        animation: 'slideInFromLeft'
                    },
                    {
                        type: 'conclusion',
                        layout: 'content-split',
                        animation: 'slideInFromBottom'
                    }
                ]
            },
            'startup-pitch': {
                name: 'Startup Pitch',
                description: 'Dynamic template for startup pitches and investor presentations',
                theme: 'orange-energy',
                slides: [
                    {
                        type: 'title',
                        layout: 'hero',
                        animation: 'professionalFadeIn'
                    },
                    {
                        type: 'content',
                        layout: 'content-split',
                        animation: 'slideInWithRotation'
                    },
                    {
                        type: 'statistics',
                        layout: 'data-visualization',
                        animation: 'fadeInScale'
                    },
                    {
                        type: 'content',
                        layout: 'comparison',
                        animation: 'slideInDiagonal'
                    },
                    {
                        type: 'chart',
                        layout: 'chart-focus',
                        animation: 'zoomIn'
                    },
                    {
                        type: 'content',
                        layout: 'timeline',
                        animation: 'slideInFromLeft'
                    },
                    {
                        type: 'conclusion',
                        layout: 'quote',
                        animation: 'bounceIn'
                    }
                ]
            },
            'academic-research': {
                name: 'Academic Research',
                description: 'Formal template for academic presentations and research papers',
                theme: 'modern-blue',
                slides: [
                    {
                        type: 'title',
                        layout: 'professional-title',
                        animation: 'slideInFromTop'
                    },
                    {
                        type: 'content',
                        layout: 'content-with-image',
                        animation: 'slideInLeft'
                    },
                    {
                        type: 'chart',
                        layout: 'data-visualization',
                        animation: 'fadeInWithBlur'
                    },
                    {
                        type: 'content',
                        layout: 'comparison',
                        animation: 'slideInFromRight'
                    },
                    {
                        type: 'statistics',
                        layout: 'stats-grid',
                        animation: 'staggeredFadeIn'
                    },
                    {
                        type: 'content',
                        layout: 'timeline',
                        animation: 'slideInFromLeft'
                    },
                    {
                        type: 'conclusion',
                        layout: 'content-split',
                        animation: 'slideInFromBottom'
                    }
                ]
            }
        };
    }

    initializeThemes() {
        return {
            'tech-blue': {
                name: 'Tech Blue',
                primary: '#2563eb',
                secondary: '#1e40af',
                accent: '#3b82f6',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                text: '#1f2937',
                textSecondary: '#6b7280',
                preview: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
            },
            'corporate-blue': {
                name: 'Corporate Blue',
                primary: '#1d4ed8',
                secondary: '#1e3a8a',
                accent: '#3b82f6',
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                text: '#111827',
                textSecondary: '#4b5563',
                preview: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)'
            },
            'eco-green': {
                name: 'Eco Green',
                primary: '#059669',
                secondary: '#047857',
                accent: '#10b981',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                text: '#064e3b',
                textSecondary: '#166534',
                preview: 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
            },
            'modern-blue': {
                name: 'Modern Blue',
                primary: '#0ea5e9',
                secondary: '#0284c7',
                accent: '#38bdf8',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                text: '#0c4a6e',
                textSecondary: '#075985',
                preview: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)'
            },
            'purple-gradient': {
                name: 'Purple Gradient',
                primary: '#7c3aed',
                secondary: '#5b21b6',
                accent: '#a855f7',
                background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
                text: '#581c87',
                textSecondary: '#7c2d92',
                preview: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
            },
            'orange-energy': {
                name: 'Orange Energy',
                primary: '#ea580c',
                secondary: '#c2410c',
                accent: '#fb923c',
                background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
                text: '#9a3412',
                textSecondary: '#c2410c',
                preview: 'linear-gradient(135deg, #ea580c 0%, #fb923c 100%)'
            }
        };
    }

    getTemplate(templateName) {
        return this.templates[templateName] || this.templates['business-professional'];
    }

    getAllTemplates() {
        return Object.entries(this.templates).map(([key, template]) => ({
            id: key,
            ...template,
            themePreview: this.themes[template.theme]?.preview || this.themes['tech-blue'].preview
        }));
    }

    getTheme(themeName) {
        return this.themes[themeName] || this.themes['tech-blue'];
    }

    getAllThemes() {
        return Object.entries(this.themes).map(([key, theme]) => ({
            id: key,
            ...theme
        }));
    }

    setCurrentTheme(themeName) {
        if (this.themes[themeName]) {
            this.currentTheme = themeName;
            return true;
        }
        return false;
    }

    getCurrentTheme() {
        return this.getTheme(this.currentTheme);
    }

    generateTemplatePreview(templateName) {
        const template = this.getTemplate(templateName);
        const theme = this.getTheme(template.theme);
        
        return {
            template: template,
            theme: theme,
            previewHTML: this.buildPreviewHTML(template, theme)
        };
    }

    buildPreviewHTML(template, theme) {
        return `
            <div class="template-preview" style="
                background: ${theme.background};
                border-radius: 8px;
                padding: 1rem;
                height: 200px;
                position: relative;
                overflow: hidden;
                border: 2px solid ${theme.accent};
            ">
                <div class="preview-header" style="
                    background: ${theme.primary};
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    margin-bottom: 0.75rem;
                    font-size: 0.8rem;
                    font-weight: 600;
                ">
                    ${template.name}
                </div>
                <div class="preview-slides" style="
                    display: flex;
                    gap: 0.25rem;
                    flex-wrap: wrap;
                ">
                    ${template.slides.map((slide, index) => `
                        <div class="preview-slide" style="
                            width: 30px;
                            height: 20px;
                            background: ${index % 2 === 0 ? theme.accent : theme.secondary};
                            border-radius: 2px;
                            opacity: 0.8;
                            position: relative;
                        ">
                            <div style="
                                width: 60%;
                                height: 3px;
                                background: white;
                                border-radius: 1px;
                                position: absolute;
                                top: 3px;
                                left: 50%;
                                transform: translateX(-50%);
                                opacity: 0.7;
                            "></div>
                            <div style="
                                width: 80%;
                                height: 2px;
                                background: white;
                                border-radius: 1px;
                                position: absolute;
                                top: 8px;
                                left: 50%;
                                transform: translateX(-50%);
                                opacity: 0.5;
                            "></div>
                        </div>
                    `).join('')}
                </div>
                <div class="preview-description" style="
                    position: absolute;
                    bottom: 1rem;
                    left: 1rem;
                    right: 1rem;
                    font-size: 0.7rem;
                    color: ${theme.textSecondary};
                    font-weight: 500;
                ">
                    ${template.description}
                </div>
            </div>
        `;
    }

    buildTemplateSelector() {
        const templates = this.getAllTemplates();
        
        return `
            <div class="template-selector">
                <h3 class="selector-title">Choose a Template</h3>
                <div class="template-grid">
                    ${templates.map(template => `
                        <div class="template-card" data-template="${template.id}">
                            <div class="template-preview-container">
                                ${this.buildPreviewHTML(template, this.getTheme(template.theme))}
                            </div>
                            <div class="template-info">
                                <h4 class="template-name">${template.name}</h4>
                                <p class="template-description">${template.description}</p>
                                <div class="template-meta">
                                    <span class="slide-count">${template.slides.length} slides</span>
                                    <span class="template-theme">${this.getTheme(template.theme).name}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    buildThemeSelector() {
        const themes = this.getAllThemes();
        
        return `
            <div class="theme-selector">
                <h3 class="selector-title">Choose a Theme</h3>
                <div class="theme-grid">
                    ${themes.map(theme => `
                        <div class="theme-card" data-theme="${theme.id}">
                            <div class="theme-preview" style="
                                background: ${theme.preview};
                                height: 80px;
                                border-radius: 8px;
                                position: relative;
                                overflow: hidden;
                                border: 2px solid transparent;
                                transition: all 0.3s ease;
                            ">
                                <div class="theme-preview-content" style="
                                    position: absolute;
                                    inset: 0;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: white;
                                    font-weight: 600;
                                    font-size: 0.9rem;
                                ">
                                    ${theme.name}
                                </div>
                            </div>
                            <div class="theme-info" style="
                                padding: 0.75rem 0;
                                text-align: center;
                            ">
                                <h4 class="theme-name" style="
                                    margin: 0;
                                    font-size: 0.9rem;
                                    font-weight: 600;
                                    color: #374151;
                                ">${theme.name}</h4>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    applyTemplate(templateName, slideContainer, presentationData) {
        const template = this.getTemplate(templateName);
        const theme = this.getTheme(template.theme);
        
        // Clear existing slides
        slideContainer.innerHTML = '';
        
        // Apply global theme styles
        this.applyGlobalThemeStyles(theme);
        
        // Generate slides based on template structure
        return this.generateSlidesFromTemplate(template, theme, presentationData, slideContainer);
    }

    applyGlobalThemeStyles(theme) {
        // Remove existing theme stylesheets
        const existingThemeStyles = document.querySelectorAll('style[data-theme]');
        existingThemeStyles.forEach(style => style.remove());
        
        // Create new theme stylesheet
        const themeStyle = document.createElement('style');
        themeStyle.setAttribute('data-theme', 'current');
        themeStyle.textContent = `
            :root {
                --theme-primary: ${theme.primary};
                --theme-secondary: ${theme.secondary};
                --theme-accent: ${theme.accent};
                --theme-background: ${theme.background};
                --theme-text: ${theme.text};
                --theme-text-secondary: ${theme.textSecondary};
            }
            
            .template-selector, .theme-selector {
                margin: 2rem 0;
            }
            
            .selector-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: var(--theme-primary);
                margin-bottom: 1rem;
                text-align: center;
            }
            
            .template-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
                margin-top: 1rem;
            }
            
            .template-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                overflow: hidden;
                transition: all 0.3s ease;
                cursor: pointer;
                border: 2px solid transparent;
            }
            
            .template-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                border-color: var(--theme-accent);
            }
            
            .template-card.selected {
                border-color: var(--theme-primary);
                box-shadow: 0 8px 25px rgba(37, 99, 235, 0.2);
            }
            
            .template-info {
                padding: 1.5rem;
            }
            
            .template-name {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--theme-primary);
                margin: 0 0 0.5rem 0;
            }
            
            .template-description {
                font-size: 0.9rem;
                color: var(--theme-text-secondary);
                margin: 0 0 1rem 0;
                line-height: 1.4;
            }
            
            .template-meta {
                display: flex;
                justify-content: space-between;
                font-size: 0.8rem;
                color: var(--theme-text-secondary);
                font-weight: 500;
            }
            
            .theme-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .theme-card {
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .theme-card:hover .theme-preview {
                border-color: var(--theme-primary) !important;
                transform: scale(1.05);
            }
            
            .theme-card.selected .theme-preview {
                border-color: var(--theme-primary) !important;
                box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
            }
        `;
        
        document.head.appendChild(themeStyle);
    }

    async generateSlidesFromTemplate(template, theme, presentationData, slideContainer) {
        const slideBuilder = new SlideBuilder();
        const slides = [];
        
        try {
            for (let i = 0; i < template.slides.length; i++) {
                const slideTemplate = template.slides[i];
                const slideData = this.mapPresentationDataToSlide(presentationData, slideTemplate, i);
                
                // Build the slide
                const slideElement = await slideBuilder.buildSlide(slideData, template.theme);
                slideContainer.appendChild(slideElement);
                slides.push(slideElement);
                
                // Add slight delay between slides for animation effect
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            return {
                success: true,
                slides: slides,
                template: template,
                theme: theme
            };
        } catch (error) {
            console.error('Error generating slides from template:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    mapPresentationDataToSlide(presentationData, slideTemplate, slideIndex) {
        const slideData = {
            type: slideTemplate.type,
            layout: slideTemplate.layout,
            animation: slideTemplate.animation
        };
        
        switch (slideTemplate.type) {
            case 'title':
                slideData.title = presentationData.title || 'Presentation Title';
                slideData.subtitle = presentationData.subtitle || 'A comprehensive overview';
                slideData.author = presentationData.author || 'AI Generated';
                slideData.date = new Date().toLocaleDateString();
                break;
                
            case 'content':
                const contentSlides = presentationData.slides?.filter(s => s.type === 'content') || [];
                const contentIndex = contentSlides.findIndex((_, i) => i === slideIndex - 1) || 0;
                const content = contentSlides[contentIndex] || contentSlides[0];
                
                slideData.title = content?.title || `Content Slide ${slideIndex}`;
                slideData.subtitle = content?.subtitle;
                slideData.content = content?.content || ['Key point 1', 'Key point 2', 'Key point 3'];
                slideData.image = content?.image;
                break;
                
            case 'chart':
                const chartSlides = presentationData.slides?.filter(s => s.type === 'chart') || [];
                const chart = chartSlides[0];
                
                slideData.title = chart?.title || 'Data Analysis';
                slideData.subtitle = chart?.subtitle;
                slideData.chart = chart?.chart || {
                    type: 'bar',
                    data: {
                        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                        values: [25, 35, 45, 55]
                    }
                };
                slideData.insights = chart?.insights;
                break;
                
            case 'statistics':
                const statsSlides = presentationData.slides?.filter(s => s.type === 'statistics') || [];
                const stats = statsSlides[0];
                
                slideData.title = stats?.title || 'Key Statistics';
                slideData.subtitle = stats?.subtitle;
                slideData.statistics = stats?.statistics || [
                    { value: '85%', label: 'Success Rate', description: 'Overall performance' },
                    { value: '2.4x', label: 'Growth', description: 'Year over year' },
                    { value: '150K+', label: 'Users', description: 'Active monthly users' }
                ];
                break;
                
            case 'conclusion':
                slideData.title = 'Conclusion';
                slideData.subtitle = 'Key takeaways and next steps';
                slideData.content = presentationData.conclusion || [
                    'Summary of key points',
                    'Actionable recommendations',
                    'Future outlook'
                ];
                slideData.callToAction = presentationData.callToAction || 'Thank you for your attention!';
                break;
        }
        
        return slideData;
    }

    getTemplateSelectorHTML() {
        return this.buildTemplateSelector();
    }

    getThemeSelectorHTML() {
        return this.buildThemeSelector();
    }

    initializeEventListeners() {
        // Template selection events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.template-card')) {
                const templateCard = e.target.closest('.template-card');
                const templateId = templateCard.dataset.template;
                
                // Remove previous selection
                document.querySelectorAll('.template-card').forEach(card => 
                    card.classList.remove('selected'));
                
                // Add selection to clicked card
                templateCard.classList.add('selected');
                
                // Dispatch custom event
                document.dispatchEvent(new CustomEvent('templateSelected', {
                    detail: { templateId: templateId }
                }));
            }
        });
        
        // Theme selection events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-card')) {
                const themeCard = e.target.closest('.theme-card');
                const themeId = themeCard.dataset.theme;
                
                // Remove previous selection
                document.querySelectorAll('.theme-card').forEach(card => 
                    card.classList.remove('selected'));
                
                // Add selection to clicked card
                themeCard.classList.add('selected');
                
                // Update current theme
                this.setCurrentTheme(themeId);
                
                // Dispatch custom event
                document.dispatchEvent(new CustomEvent('themeSelected', {
                    detail: { themeId: themeId }
                }));
            }
        });
    }

    exportTemplate(templateName) {
        const template = this.getTemplate(templateName);
        const theme = this.getTheme(template.theme);
        
        return {
            template: template,
            theme: theme,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }

    importTemplate(templateData) {
        try {
            if (templateData.template && templateData.theme) {
                const templateId = `custom-${Date.now()}`;
                this.templates[templateId] = templateData.template;
                
                if (templateData.theme && !this.themes[templateData.theme.id]) {
                    this.themes[templateData.theme.id] = templateData.theme;
                }
                
                return {
                    success: true,
                    templateId: templateId
                };
            }
            throw new Error('Invalid template data');
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}
