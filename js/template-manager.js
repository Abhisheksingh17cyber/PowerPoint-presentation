// Template Manager for Professional PPT Maker
class TemplateManager {
    constructor() {
        this.templates = this.initializeTemplates();
        this.themes = this.initializeThemes();
        this.colorSchemes = this.initializeColorSchemes();
        this.fonts = this.initializeFonts();
        this.currentTemplate = 'business';
        this.currentTheme = 'business';
        this.currentColorScheme = 'blue';
    }
    
    initializeTemplates() {
        return {
            business: {
                name: 'Business Professional',
                description: 'Clean, corporate design perfect for business presentations',
                slideTypes: ['title', 'agenda', 'overview', 'content', 'chart', 'conclusion'],
                defaultSlideCount: 8,
                features: ['charts', 'tables', 'professional-layouts'],
                preview: 'business-preview.png',
                colors: {
                    primary: '#2563eb',
                    secondary: '#1e40af',
                    accent: '#3b82f6',
                    text: '#1f2937',
                    background: '#ffffff'
                },
                fonts: {
                    heading: 'Inter',
                    body: 'Inter'
                },
                spacing: {
                    padding: '2rem',
                    gap: '1.5rem'
                }
            },
            
            academic: {
                name: 'Academic Research',
                description: 'Scholarly design with citations and formal structure',
                slideTypes: ['title', 'abstract', 'introduction', 'methodology', 'findings', 'discussion', 'conclusion', 'references'],
                defaultSlideCount: 10,
                features: ['references', 'citations', 'formal-layouts'],
                preview: 'academic-preview.png',
                colors: {
                    primary: '#374151',
                    secondary: '#4b5563',
                    accent: '#6b7280',
                    text: '#111827',
                    background: '#ffffff'
                },
                fonts: {
                    heading: 'Playfair Display',
                    body: 'Inter'
                },
                spacing: {
                    padding: '2.5rem',
                    gap: '1.25rem'
                }
            },
            
            creative: {
                name: 'Creative Innovation',
                description: 'Modern, vibrant design for creative presentations',
                slideTypes: ['title', 'vision', 'concept', 'design', 'features', 'impact', 'future'],
                defaultSlideCount: 7,
                features: ['gradients', 'animations', 'creative-layouts'],
                preview: 'creative-preview.png',
                colors: {
                    primary: '#7c3aed',
                    secondary: '#6d28d9',
                    accent: '#a855f7',
                    text: '#1f2937',
                    background: '#ffffff'
                },
                fonts: {
                    heading: 'Playfair Display',
                    body: 'Inter'
                },
                spacing: {
                    padding: '2rem',
                    gap: '2rem'
                }
            },
            
            minimal: {
                name: 'Minimal Clean',
                description: 'Simple, clean design focused on content',
                slideTypes: ['title', 'problem', 'solution', 'benefits', 'implementation', 'summary'],
                defaultSlideCount: 6,
                features: ['clean-typography', 'white-space', 'minimal-elements'],
                preview: 'minimal-preview.png',
                colors: {
                    primary: '#000000',
                    secondary: '#404040',
                    accent: '#808080',
                    text: '#000000',
                    background: '#ffffff'
                },
                fonts: {
                    heading: 'Inter',
                    body: 'Inter'
                },
                spacing: {
                    padding: '3rem',
                    gap: '2rem'
                }
            }
        };
    }
    
    initializeThemes() {
        return {
            light: {
                name: 'Light Theme',
                colors: {
                    background: '#ffffff',
                    surface: '#f8fafc',
                    text: '#1f2937',
                    textSecondary: '#4b5563'
                }
            },
            dark: {
                name: 'Dark Theme',
                colors: {
                    background: '#1f2937',
                    surface: '#111827',
                    text: '#f9fafb',
                    textSecondary: '#d1d5db'
                }
            },
            auto: {
                name: 'Auto (System)',
                colors: null // Will use system preference
            }
        };
    }
    
    initializeColorSchemes() {
        return {
            blue: {
                name: 'Professional Blue',
                colors: {
                    primary: '#2563eb',
                    secondary: '#1e40af',
                    accent: '#3b82f6',
                    light: '#dbeafe',
                    dark: '#1e3a8a'
                }
            },
            green: {
                name: 'Nature Green',
                colors: {
                    primary: '#059669',
                    secondary: '#047857',
                    accent: '#10b981',
                    light: '#d1fae5',
                    dark: '#064e3b'
                }
            },
            purple: {
                name: 'Creative Purple',
                colors: {
                    primary: '#7c3aed',
                    secondary: '#6d28d9',
                    accent: '#8b5cf6',
                    light: '#ede9fe',
                    dark: '#581c87'
                }
            },
            orange: {
                name: 'Energy Orange',
                colors: {
                    primary: '#ea580c',
                    secondary: '#c2410c',
                    accent: '#f97316',
                    light: '#fed7aa',
                    dark: '#9a3412'
                }
            },
            red: {
                name: 'Bold Red',
                colors: {
                    primary: '#dc2626',
                    secondary: '#b91c1c',
                    accent: '#ef4444',
                    light: '#fecaca',
                    dark: '#7f1d1d'
                }
            },
            teal: {
                name: 'Modern Teal',
                colors: {
                    primary: '#0d9488',
                    secondary: '#0f766e',
                    accent: '#14b8a6',
                    light: '#ccfbf1',
                    dark: '#134e4a'
                }
            }
        };
    }
    
    initializeFonts() {
        return {
            inter: {
                name: 'Inter',
                url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
                fallback: 'system-ui, sans-serif'
            },
            playfair: {
                name: 'Playfair Display',
                url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
                fallback: 'serif'
            },
            roboto: {
                name: 'Roboto',
                url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
                fallback: 'sans-serif'
            },
            opensans: {
                name: 'Open Sans',
                url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap',
                fallback: 'sans-serif'
            }
        };
    }
    
    getTemplate(templateName) {
        return this.templates[templateName] || this.templates.business;
    }
    
    getAllTemplates() {
        return Object.keys(this.templates).map(key => ({
            id: key,
            ...this.templates[key]
        }));
    }
    
    getColorScheme(schemeName) {
        return this.colorSchemes[schemeName] || this.colorSchemes.blue;
    }
    
    getAllColorSchemes() {
        return Object.keys(this.colorSchemes).map(key => ({
            id: key,
            ...this.colorSchemes[key]
        }));
    }
    
    applyTemplate(templateName, element) {
        const template = this.getTemplate(templateName);
        if (!template || !element) return false;
        
        // Remove existing template classes
        element.classList.remove(...Object.keys(this.templates).map(t => `template-${t}`));
        
        // Add new template class
        element.classList.add(`template-${templateName}`);
        
        // Apply template-specific styles
        this.applyTemplateStyles(element, template);
        
        this.currentTemplate = templateName;
        return true;
    }
    
    applyColorScheme(schemeName, element) {
        const scheme = this.getColorScheme(schemeName);
        if (!scheme || !element) return false;
        
        // Remove existing color scheme classes
        element.classList.remove(...Object.keys(this.colorSchemes).map(s => `color-${s}`));
        
        // Add new color scheme class
        element.classList.add(`color-${schemeName}`);
        
        // Apply color variables
        this.applyColorVariables(element, scheme);
        
        this.currentColorScheme = schemeName;
        return true;
    }
    
    applyTemplateStyles(element, template) {
        // Apply typography
        if (template.fonts) {
            element.style.setProperty('--font-heading', template.fonts.heading);
            element.style.setProperty('--font-body', template.fonts.body);
        }
        
        // Apply spacing
        if (template.spacing) {
            element.style.setProperty('--slide-padding', template.spacing.padding);
            element.style.setProperty('--content-gap', template.spacing.gap);
        }
        
        // Apply colors
        if (template.colors) {
            Object.entries(template.colors).forEach(([key, value]) => {
                element.style.setProperty(`--template-${key}`, value);
            });
        }
    }
    
    applyColorVariables(element, scheme) {
        if (scheme.colors) {
            Object.entries(scheme.colors).forEach(([key, value]) => {
                element.style.setProperty(`--color-${key}`, value);
            });
        }
    }
    
    generateSlideStructure(templateName, topic) {
        const template = this.getTemplate(templateName);
        if (!template) return [];
        
        return template.slideTypes.map((slideType, index) => ({
            type: slideType,
            index: index,
            title: this.generateSlideTitle(slideType, topic, templateName),
            template: templateName
        }));
    }
    
    generateSlideTitle(slideType, topic, templateName) {
        const titleMappings = {
            business: {
                title: topic,
                agenda: 'Agenda',
                overview: 'Executive Summary',
                content: 'Key Points',
                chart: 'Market Analysis',
                conclusion: 'Next Steps'
            },
            academic: {
                title: topic,
                abstract: 'Abstract',
                introduction: 'Introduction',
                methodology: 'Methodology',
                findings: 'Findings',
                discussion: 'Discussion',
                conclusion: 'Conclusion',
                references: 'References'
            },
            creative: {
                title: topic,
                vision: 'Our Vision',
                concept: 'Core Concept',
                design: 'Design Approach',
                features: 'Key Features',
                impact: 'Expected Impact',
                future: 'Future Roadmap'
            },
            minimal: {
                title: topic,
                problem: 'The Problem',
                solution: 'Our Solution',
                benefits: 'Key Benefits',
                implementation: 'Implementation',
                summary: 'Summary'
            }
        };
        
        const template = titleMappings[templateName] || titleMappings.business;
        return template[slideType] || slideType.charAt(0).toUpperCase() + slideType.slice(1);
    }
    
    customizeTemplate(templateName, customizations) {
        const template = this.getTemplate(templateName);
        if (!template) return null;
        
        // Create a deep copy of the template
        const customTemplate = JSON.parse(JSON.stringify(template));
        
        // Apply customizations
        if (customizations.colors) {
            customTemplate.colors = { ...customTemplate.colors, ...customizations.colors };
        }
        
        if (customizations.fonts) {
            customTemplate.fonts = { ...customTemplate.fonts, ...customizations.fonts };
        }
        
        if (customizations.spacing) {
            customTemplate.spacing = { ...customTemplate.spacing, ...customizations.spacing };
        }
        
        if (customizations.slideTypes) {
            customTemplate.slideTypes = customizations.slideTypes;
        }
        
        return customTemplate;
    }
    
    saveCustomTemplate(name, template) {
        try {
            const customTemplates = this.getCustomTemplates();
            customTemplates[name] = template;
            localStorage.setItem('ppt-custom-templates', JSON.stringify(customTemplates));
            return true;
        } catch (error) {
            console.error('Failed to save custom template:', error);
            return false;
        }
    }
    
    getCustomTemplates() {
        try {
            const stored = localStorage.getItem('ppt-custom-templates');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Failed to load custom templates:', error);
            return {};
        }
    }
    
    deleteCustomTemplate(name) {
        try {
            const customTemplates = this.getCustomTemplates();
            delete customTemplates[name];
            localStorage.setItem('ppt-custom-templates', JSON.stringify(customTemplates));
            return true;
        } catch (error) {
            console.error('Failed to delete custom template:', error);
            return false;
        }
    }
    
    loadFont(fontName) {
        const font = this.fonts[fontName];
        if (!font) return false;
        
        // Check if font is already loaded
        if (document.querySelector(`link[href="${font.url}"]`)) {
            return true;
        }
        
        // Create and append font link
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = font.url;
        document.head.appendChild(link);
        
        return true;
    }
    
    preloadTemplateAssets(templateName) {
        const template = this.getTemplate(templateName);
        if (!template) return Promise.resolve();
        
        const promises = [];
        
        // Preload fonts
        if (template.fonts) {
            Object.values(template.fonts).forEach(fontName => {
                if (this.fonts[fontName]) {
                    promises.push(this.loadFont(fontName));
                }
            });
        }
        
        // Preload template preview if it exists
        if (template.preview) {
            const img = new Image();
            img.src = `assets/templates/${template.preview}`;
            promises.push(new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve; // Don't fail if preview doesn't load
            }));
        }
        
        return Promise.all(promises);
    }
    
    generateCSS(templateName, colorScheme) {
        const template = this.getTemplate(templateName);
        const colors = this.getColorScheme(colorScheme);
        
        if (!template || !colors) return '';
        
        const css = `
            .template-${templateName} {
                --template-primary: ${template.colors.primary};
                --template-secondary: ${template.colors.secondary};
                --template-accent: ${template.colors.accent};
                --template-text: ${template.colors.text};
                --template-background: ${template.colors.background};
                
                --color-primary: ${colors.colors.primary};
                --color-secondary: ${colors.colors.secondary};
                --color-accent: ${colors.colors.accent};
                
                --font-heading: ${template.fonts.heading}, ${this.fonts[template.fonts.heading]?.fallback || 'sans-serif'};
                --font-body: ${template.fonts.body}, ${this.fonts[template.fonts.body]?.fallback || 'sans-serif'};
                
                --slide-padding: ${template.spacing.padding};
                --content-gap: ${template.spacing.gap};
            }
            
            .template-${templateName} .slide-title {
                font-family: var(--font-heading);
                color: var(--color-primary);
            }
            
            .template-${templateName} .slide-content {
                font-family: var(--font-body);
                padding: var(--slide-padding);
                gap: var(--content-gap);
            }
        `;
        
        return css;
    }
    
    validateTemplate(template) {
        const required = ['name', 'slideTypes', 'colors', 'fonts'];
        const missing = required.filter(field => !template[field]);
        
        if (missing.length > 0) {
            throw new Error(`Template validation failed. Missing: ${missing.join(', ')}`);
        }
        
        // Validate colors
        if (!template.colors.primary || !template.colors.background) {
            throw new Error('Template must have primary and background colors');
        }
        
        // Validate slide types
        if (!Array.isArray(template.slideTypes) || template.slideTypes.length === 0) {
            throw new Error('Template must have at least one slide type');
        }
        
        return true;
    }
    
    exportTemplate(templateName) {
        const template = this.getTemplate(templateName);
        if (!template) return null;
        
        return {
            ...template,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }
    
    importTemplate(templateData, name) {
        try {
            this.validateTemplate(templateData);
            this.templates[name] = templateData;
            return true;
        } catch (error) {
            console.error('Template import failed:', error);
            return false;
        }
    }
    
    getTemplateCompatibility(templateName) {
        const template = this.getTemplate(templateName);
        if (!template) return null;
        
        return {
            supportsCharts: template.features?.includes('charts') || false,
            supportsAnimations: template.features?.includes('animations') || false,
            supportsCustomLayouts: template.features?.includes('custom-layouts') || false,
            recommendedSlideCount: template.defaultSlideCount,
            bestForTopics: this.getRecommendedTopics(templateName)
        };
    }
    
    getRecommendedTopics(templateName) {
        const recommendations = {
            business: ['business strategy', 'financial analysis', 'market research', 'company overview'],
            academic: ['research findings', 'scientific studies', 'academic analysis', 'thesis presentation'],
            creative: ['product design', 'creative projects', 'innovation', 'artistic concepts'],
            minimal: ['simple concepts', 'startup pitches', 'executive summaries', 'quick updates']
        };
        
        return recommendations[templateName] || [];
    }
    
    // Event handlers for template switching
    onTemplateChange(callback) {
        this.templateChangeCallback = callback;
    }
    
    onColorSchemeChange(callback) {
        this.colorSchemeChangeCallback = callback;
    }
    
    notifyTemplateChange(templateName) {
        if (this.templateChangeCallback) {
            this.templateChangeCallback(templateName, this.getTemplate(templateName));
        }
    }
    
    notifyColorSchemeChange(schemeName) {
        if (this.colorSchemeChangeCallback) {
            this.colorSchemeChangeCallback(schemeName, this.getColorScheme(schemeName));
        }
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.TemplateManager = TemplateManager;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateManager;
}
