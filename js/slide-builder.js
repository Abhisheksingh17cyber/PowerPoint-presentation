// Slide Builder Module for Professional PPT Maker
class SlideBuilder {
    constructor() {
        this.slideTemplates = this.initializeSlideTemplates();
        this.animations = this.initializeAnimations();
        this.layouts = this.initializeLayouts();
    }
    
    initializeSlideTemplates() {
        return {
            title: {
                layout: 'center',
                elements: ['title', 'subtitle', 'background-image'],
                animation: 'fadeIn'
            },
            content: {
                layout: 'split',
                elements: ['title', 'bullet-points', 'image'],
                animation: 'slideInLeft'
            },
            agenda: {
                layout: 'list',
                elements: ['title', 'numbered-list'],
                animation: 'slideInUp'
            },
            conclusion: {
                layout: 'center',
                elements: ['title', 'summary-text'],
                animation: 'fadeInScale'
            },
            thankyou: {
                layout: 'center',
                elements: ['title', 'subtitle'],
                animation: 'bounceIn'
            },
            image_focus: {
                layout: 'image-dominant',
                elements: ['title', 'image', 'caption'],
                animation: 'slideInRight'
            },
            chart: {
                layout: 'chart-focus',
                elements: ['title', 'chart', 'insights'],
                animation: 'slideInUp'
            },
            comparison: {
                layout: 'two-column',
                elements: ['title', 'left-content', 'right-content'],
                animation: 'slideInBoth'
            }
        };
    }
    
    initializeAnimations() {
        return {
            fadeIn: 'fade-in',
            slideInLeft: 'slide-in-left',
            slideInRight: 'slide-in-right',
            slideInUp: 'slide-in-up',
            slideInDown: 'slide-in-down',
            fadeInScale: 'fade-in-scale',
            bounceIn: 'bounce-in',
            slideInBoth: 'slide-in-both'
        };
    }
    
    initializeLayouts() {
        return {
            center: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            },
            split: {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                alignItems: 'center'
            },
            list: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: '2rem'
            },
            'image-dominant': {
                display: 'grid',
                gridTemplateRows: 'auto 1fr auto',
                gap: '1rem'
            },
            'chart-focus': {
                display: 'grid',
                gridTemplateRows: 'auto 1fr auto',
                gap: '1.5rem'
            },
            'two-column': {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '3rem',
                alignItems: 'start'
            }
        };
    }
    
    buildSlide(slideData, options = {}) {
        const {
            template = 'content',
            theme = 'business',
            colorScheme = 'blue',
            animationEnabled = true,
            responsive = true
        } = options;
        
        // Create slide container
        const slideElement = this.createSlideContainer(slideData, template, theme, colorScheme);
        
        // Apply layout
        this.applyLayout(slideElement, template);
        
        // Add content elements
        this.addContentElements(slideElement, slideData, template, theme);
        
        // Apply animations
        if (animationEnabled) {
            this.applyAnimations(slideElement, template);
        }
        
        // Make responsive
        if (responsive) {
            this.makeResponsive(slideElement);
        }
        
        // Add accessibility features
        this.addAccessibilityFeatures(slideElement, slideData);
        
        return slideElement;
    }
    
    createSlideContainer(slideData, template, theme, colorScheme) {
        const slide = document.createElement('div');
        slide.className = `slide slide-${template} theme-${theme} color-${colorScheme}`;
        slide.setAttribute('data-slide-type', slideData.type || template);
        slide.setAttribute('data-slide-index', slideData.index || 0);
        
        // Add background
        const background = document.createElement('div');
        background.className = 'slide-background';
        slide.appendChild(background);
        
        // Add content container
        const content = document.createElement('div');
        content.className = 'slide-content';
        slide.appendChild(content);
        
        return slide;
    }
    
    applyLayout(slideElement, template) {
        const templateConfig = this.slideTemplates[template];
        if (!templateConfig) return;
        
        const content = slideElement.querySelector('.slide-content');
        const layoutStyles = this.layouts[templateConfig.layout];
        
        if (layoutStyles) {
            Object.assign(content.style, layoutStyles);
        }
        
        content.setAttribute('data-layout', templateConfig.layout);
    }
    
    addContentElements(slideElement, slideData, template, theme) {
        const content = slideElement.querySelector('.slide-content');
        const templateConfig = this.slideTemplates[template];
        
        templateConfig.elements.forEach(elementType => {
            const element = this.createElement(elementType, slideData, theme);
            if (element) {
                content.appendChild(element);
            }
        });
    }
    
    createElement(elementType, slideData, theme) {
        switch (elementType) {
            case 'title':
                return this.createTitleElement(slideData.title);
            
            case 'subtitle':
                return this.createSubtitleElement(slideData.subtitle);
            
            case 'bullet-points':
                return this.createBulletPointsElement(slideData.content || []);
            
            case 'numbered-list':
                return this.createNumberedListElement(slideData.content || []);
            
            case 'image':
                return this.createImageElement(slideData.image, slideData.imageAlt);
            
            case 'chart':
                return this.createChartElement(slideData.chartData);
            
            case 'summary-text':
                return this.createSummaryTextElement(slideData.summary || slideData.content);
            
            case 'caption':
                return this.createCaptionElement(slideData.caption);
            
            case 'left-content':
                return this.createContentColumn(slideData.leftContent || slideData.content?.slice(0, Math.ceil(slideData.content.length / 2)));
            
            case 'right-content':
                return this.createContentColumn(slideData.rightContent || slideData.content?.slice(Math.ceil(slideData.content.length / 2)));
            
            case 'insights':
                return this.createInsightsElement(slideData.insights || slideData.content);
            
            case 'background-image':
                return this.setBackgroundImage(slideData.image);
            
            default:
                return null;
        }
    }
    
    createTitleElement(title) {
        if (!title) return null;
        
        const element = document.createElement('h1');
        element.className = 'slide-title';
        element.textContent = title;
        return element;
    }
    
    createSubtitleElement(subtitle) {
        if (!subtitle) return null;
        
        const element = document.createElement('p');
        element.className = 'slide-subtitle';
        element.textContent = subtitle;
        return element;
    }
    
    createBulletPointsElement(points) {
        if (!points || points.length === 0) return null;
        
        const ul = document.createElement('ul');
        ul.className = 'slide-list bullet-points';
        
        points.forEach(point => {
            const li = document.createElement('li');
            li.textContent = point;
            ul.appendChild(li);
        });
        
        return ul;
    }
    
    createNumberedListElement(items) {
        if (!items || items.length === 0) return null;
        
        const ol = document.createElement('ol');
        ol.className = 'slide-list numbered-list';
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ol.appendChild(li);
        });
        
        return ol;
    }
    
    createImageElement(imageSrc, imageAlt) {
        if (!imageSrc) {
            // Create placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'slide-image-placeholder';
            placeholder.innerHTML = `
                <i class="fas fa-image"></i>
                <span>Visual Content</span>
            `;
            return placeholder;
        }
        
        const img = document.createElement('img');
        img.className = 'slide-image';
        img.src = imageSrc;
        img.alt = imageAlt || 'Slide image';
        img.loading = 'lazy';
        
        // Add error handling
        img.onerror = () => {
            const placeholder = this.createElement('image', {});
            img.parentNode?.replaceChild(placeholder, img);
        };
        
        return img;
    }
    
    createChartElement(chartData) {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container';
        
        if (chartData) {
            // In a real implementation, this would use Chart.js or similar
            chartContainer.innerHTML = `
                <div class="chart-placeholder">
                    <i class="fas fa-chart-bar"></i>
                    <span>Chart: ${chartData.title || 'Data Visualization'}</span>
                </div>
            `;
        } else {
            chartContainer.innerHTML = `
                <div class="chart-placeholder">
                    <i class="fas fa-chart-line"></i>
                    <span>Data Visualization</span>
                </div>
            `;
        }
        
        return chartContainer;
    }
    
    createSummaryTextElement(text) {
        if (!text) return null;
        
        const element = document.createElement('div');
        element.className = 'slide-text summary-text';
        
        if (Array.isArray(text)) {
            text.forEach(paragraph => {
                const p = document.createElement('p');
                p.textContent = paragraph;
                element.appendChild(p);
            });
        } else {
            element.textContent = text;
        }
        
        return element;
    }
    
    createCaptionElement(caption) {
        if (!caption) return null;
        
        const element = document.createElement('p');
        element.className = 'slide-caption';
        element.textContent = caption;
        return element;
    }
    
    createContentColumn(content) {
        if (!content) return null;
        
        const column = document.createElement('div');
        column.className = 'content-column';
        
        if (Array.isArray(content)) {
            const ul = document.createElement('ul');
            ul.className = 'slide-list';
            content.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ul.appendChild(li);
            });
            column.appendChild(ul);
        } else {
            const p = document.createElement('p');
            p.className = 'slide-text';
            p.textContent = content;
            column.appendChild(p);
        }
        
        return column;
    }
    
    createInsightsElement(insights) {
        if (!insights) return null;
        
        const container = document.createElement('div');
        container.className = 'insights-container';
        
        const title = document.createElement('h3');
        title.textContent = 'Key Insights';
        title.className = 'insights-title';
        container.appendChild(title);
        
        if (Array.isArray(insights)) {
            const ul = document.createElement('ul');
            ul.className = 'insights-list';
            insights.forEach(insight => {
                const li = document.createElement('li');
                li.textContent = insight;
                ul.appendChild(li);
            });
            container.appendChild(ul);
        }
        
        return container;
    }
    
    setBackgroundImage(imageSrc) {
        if (imageSrc) {
            // This would be applied to the slide container
            return { backgroundImage: `url(${imageSrc})` };
        }
        return null;
    }
    
    applyAnimations(slideElement, template) {
        const templateConfig = this.slideTemplates[template];
        if (!templateConfig.animation) return;
        
        const animationClass = this.animations[templateConfig.animation];
        if (animationClass) {
            slideElement.classList.add(animationClass);
        }
        
        // Add staggered animations for list items
        const listItems = slideElement.querySelectorAll('li');
        listItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('animate-item');
        });
    }
    
    makeResponsive(slideElement) {
        slideElement.classList.add('responsive-slide');
        
        // Add responsive classes based on content type
        const content = slideElement.querySelector('.slide-content');
        const hasImage = slideElement.querySelector('.slide-image, .slide-image-placeholder');
        const hasList = slideElement.querySelector('.slide-list');
        const hasChart = slideElement.querySelector('.chart-container');
        
        if (hasImage && hasList) {
            content.classList.add('has-image-and-text');
        }
        
        if (hasChart) {
            content.classList.add('has-chart');
        }
        
        // Add touch-friendly classes for mobile
        if ('ontouchstart' in window) {
            slideElement.classList.add('touch-device');
        }
    }
    
    addAccessibilityFeatures(slideElement, slideData) {
        // Add ARIA labels and roles
        slideElement.setAttribute('role', 'article');
        slideElement.setAttribute('aria-label', `Slide: ${slideData.title || 'Presentation slide'}`);
        
        // Add skip links for keyboard navigation
        const skipLink = document.createElement('a');
        skipLink.className = 'skip-link';
        skipLink.href = '#next-slide';
        skipLink.textContent = 'Skip to next slide';
        slideElement.insertBefore(skipLink, slideElement.firstChild);
        
        // Add alt text for images
        const images = slideElement.querySelectorAll('img');
        images.forEach(img => {
            if (!img.alt) {
                img.alt = 'Presentation image';
            }
        });
        
        // Add ARIA labels for lists
        const lists = slideElement.querySelectorAll('ul, ol');
        lists.forEach(list => {
            list.setAttribute('role', 'list');
            const items = list.querySelectorAll('li');
            items.forEach(item => {
                item.setAttribute('role', 'listitem');
            });
        });
        
        // Add focus management
        slideElement.setAttribute('tabindex', '-1');
    }
    
    // Advanced slide building methods
    
    buildSlideFromTemplate(templateName, data, options = {}) {
        const templates = {
            'problem-solution': {
                type: 'comparison',
                leftContent: data.problems || [],
                rightContent: data.solutions || []
            },
            'before-after': {
                type: 'comparison',
                leftContent: data.before || [],
                rightContent: data.after || []
            },
            'process-flow': {
                type: 'content',
                content: data.steps || [],
                layout: 'flow'
            },
            'key-metrics': {
                type: 'chart',
                chartData: data.metrics,
                insights: data.insights
            }
        };
        
        const template = templates[templateName];
        if (!template) {
            throw new Error(`Template '${templateName}' not found`);
        }
        
        return this.buildSlide({ ...data, ...template }, options);
    }
    
    buildSlideSet(slidesData, options = {}) {
        const slideSet = document.createElement('div');
        slideSet.className = 'slide-set';
        
        slidesData.forEach((slideData, index) => {
            const slide = this.buildSlide({ ...slideData, index }, options);
            slideSet.appendChild(slide);
        });
        
        return slideSet;
    }
    
    exportSlideAsHTML(slideElement) {
        const clone = slideElement.cloneNode(true);
        
        // Add inline styles for export
        const styles = window.getComputedStyle(slideElement);
        clone.style.cssText = styles.cssText;
        
        return clone.outerHTML;
    }
    
    exportSlideAsImage(slideElement, options = {}) {
        const {
            format = 'png',
            quality = 0.9,
            width = 1920,
            height = 1080
        } = options;
        
        return new Promise((resolve, reject) => {
            if (typeof html2canvas === 'undefined') {
                reject(new Error('html2canvas library not loaded'));
                return;
            }
            
            html2canvas(slideElement, {
                width: width,
                height: height,
                scale: 1,
                useCORS: true,
                allowTaint: true
            }).then(canvas => {
                const dataURL = canvas.toDataURL(`image/${format}`, quality);
                resolve(dataURL);
            }).catch(reject);
        });
    }
    
    // Utility methods
    
    validateSlideData(slideData) {
        const required = ['title'];
        const missing = required.filter(field => !slideData[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
        
        return true;
    }
    
    optimizeSlideForPrint(slideElement) {
        const clone = slideElement.cloneNode(true);
        
        // Remove animations for print
        clone.classList.remove(...Object.values(this.animations));
        
        // Adjust colors for print
        clone.classList.add('print-optimized');
        
        // Ensure text is readable
        const text = clone.querySelectorAll('h1, h2, h3, p, li');
        text.forEach(el => {
            el.style.color = '#000000';
        });
        
        return clone;
    }
    
    getSlideMetadata(slideElement) {
        return {
            type: slideElement.getAttribute('data-slide-type'),
            index: slideElement.getAttribute('data-slide-index'),
            title: slideElement.querySelector('.slide-title')?.textContent,
            layout: slideElement.querySelector('.slide-content')?.getAttribute('data-layout'),
            hasImage: !!slideElement.querySelector('.slide-image, .slide-image-placeholder'),
            hasList: !!slideElement.querySelector('.slide-list'),
            hasChart: !!slideElement.querySelector('.chart-container'),
            wordCount: this.getWordCount(slideElement)
        };
    }
    
    getWordCount(slideElement) {
        const text = slideElement.textContent || '';
        return text.trim().split(/\s+/).length;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.SlideBuilder = SlideBuilder;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SlideBuilder;
}
