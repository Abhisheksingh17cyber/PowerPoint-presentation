// Advanced Slide Builder for Professional Presentations
class SlideBuilder {
    constructor() {
        this.layouts = this.initializeLayouts();
        this.animations = this.initializeAnimations();
        this.themes = this.initializeThemes();
        this.slideCounter = 0;
    }

    initializeLayouts() {
        return {
            hero: {
                template: 'hero-layout',
                structure: ['background', 'title', 'subtitle', 'metadata'],
                css: this.getHeroLayoutCSS()
            },
            'content-with-image': {
                template: 'content-image-layout',
                structure: ['title', 'content', 'image'],
                css: this.getContentImageLayoutCSS()
            },
            'chart-focus': {
                template: 'chart-focus-layout',
                structure: ['title', 'chart', 'insights'],
                css: this.getChartFocusLayoutCSS()
            },
            'stats-grid': {
                template: 'stats-grid-layout',
                structure: ['title', 'stats-grid'],
                css: this.getStatsGridLayoutCSS()
            },
            centered: {
                template: 'centered-layout',
                structure: ['title', 'content', 'cta'],
                css: this.getCenteredLayoutCSS()
            },
            'two-column': {
                template: 'two-column-layout',
                structure: ['title', 'left-column', 'right-column'],
                css: this.getTwoColumnLayoutCSS()
            },
            'professional-title': {
                template: 'professional-title-layout',
                structure: ['background', 'title', 'subtitle', 'author', 'date', 'decorative'],
                css: this.getProfessionalTitleLayoutCSS()
            },
            'content-split': {
                template: 'content-split-layout',
                structure: ['title', 'left-content', 'right-content', 'divider'],
                css: this.getContentSplitLayoutCSS()
            },
            'image-showcase': {
                template: 'image-showcase-layout',
                structure: ['title', 'large-image', 'caption', 'overlay-text'],
                css: this.getImageShowcaseLayoutCSS()
            },
            'data-visualization': {
                template: 'data-visualization-layout',
                structure: ['title', 'chart-container', 'data-points', 'insights'],
                css: this.getDataVisualizationLayoutCSS()
            },
            'timeline': {
                template: 'timeline-layout',
                structure: ['title', 'timeline-container', 'timeline-items'],
                css: this.getTimelineLayoutCSS()
            },
            'comparison': {
                template: 'comparison-layout',
                structure: ['title', 'left-side', 'vs-divider', 'right-side'],
                css: this.getComparisonLayoutCSS()
            },
            'quote': {
                template: 'quote-layout',
                structure: ['background', 'quote-text', 'author', 'decorative'],
                css: this.getQuoteLayoutCSS()
            }
        };
    }

    initializeAnimations() {
        return {
            fadeInUp: 'fadeInUp 0.8s ease-out forwards',
            slideInLeft: 'slideInLeft 0.8s ease-out forwards',
            slideInRight: 'slideInRight 0.8s ease-out forwards',
            slideInUp: 'slideInUp 0.8s ease-out forwards',
            fadeInScale: 'fadeInScale 0.8s ease-out forwards',
            staggeredFadeIn: 'staggeredFadeIn 1s ease-out forwards',
            professionalFadeIn: 'professionalFadeIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
            slideInFromBottom: 'slideInFromBottom 0.8s ease-out forwards',
            slideInFromTop: 'slideInFromTop 0.8s ease-out forwards',
            scaleIn: 'scaleIn 0.6s ease-out forwards',
            rotateIn: 'rotateIn 0.8s ease-out forwards',
            bounceIn: 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
            slideInDiagonal: 'slideInDiagonal 0.8s ease-out forwards',
            fadeInWithBlur: 'fadeInWithBlur 1s ease-out forwards',
            slideInWithRotation: 'slideInWithRotation 0.8s ease-out forwards',
            zoomIn: 'zoomIn 0.6s ease-out forwards',
            slideInFromLeft: 'slideInFromLeft 0.8s ease-out forwards',
            slideInFromRight: 'slideInFromRight 0.8s ease-out forwards'
        };
    }

    initializeThemes() {
        return {
            'tech-blue': {
                primary: '#2563eb',
                secondary: '#1e40af',
                accent: '#3b82f6',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                text: '#1f2937',
                textSecondary: '#6b7280'
            },
            'corporate-blue': {
                primary: '#1d4ed8',
                secondary: '#1e3a8a',
                accent: '#3b82f6',
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                text: '#111827',
                textSecondary: '#4b5563'
            },
            'eco-green': {
                primary: '#059669',
                secondary: '#047857',
                accent: '#10b981',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                text: '#064e3b',
                textSecondary: '#166534'
            },
            'modern-blue': {
                primary: '#0ea5e9',
                secondary: '#0284c7',
                accent: '#38bdf8',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                text: '#0c4a6e',
                textSecondary: '#075985'
            }
        };
    }

    async buildSlide(slideData, theme = 'tech-blue') {
        this.slideCounter++;
        
        const layout = this.layouts[slideData.layout] || this.layouts['content-with-image'];
        const slideTheme = this.themes[theme] || this.themes['tech-blue'];
        
        // Create slide container
        const slideElement = document.createElement('div');
        slideElement.className = `slide slide-${slideData.type} layout-${slideData.layout}`;
        slideElement.id = `slide-${this.slideCounter}`;
        
        // Apply theme styles
        this.applyThemeStyles(slideElement, slideTheme);
        
        // Apply layout CSS
        this.applyLayoutStyles(slideElement, layout.css);
        
        // Build slide content based on layout
        switch (slideData.layout) {
            case 'hero':
                await this.buildTitleSlide(slideElement, slideData, slideTheme);
                break;
            case 'professional-title':
                await this.buildProfessionalTitleSlide(slideElement, slideData, slideTheme);
                break;
            case 'content-with-image':
                await this.buildContentSlide(slideElement, slideData, slideTheme);
                break;
            case 'content-split':
                await this.buildContentSplitSlide(slideElement, slideData, slideTheme);
                break;
            case 'image-showcase':
                await this.buildImageShowcaseSlide(slideElement, slideData, slideTheme);
                break;
            case 'data-visualization':
                await this.buildDataVisualizationSlide(slideElement, slideData, slideTheme);
                break;
            case 'timeline':
                await this.buildTimelineSlide(slideElement, slideData, slideTheme);
                break;
            case 'comparison':
                await this.buildComparisonSlide(slideElement, slideData, slideTheme);
                break;
            case 'quote':
                await this.buildQuoteSlide(slideElement, slideData, slideTheme);
                break;
            case 'chart-focus':
                await this.buildChartSlide(slideElement, slideData, slideTheme);
                break;
            case 'stats-grid':
                await this.buildStatisticsSlide(slideElement, slideData, slideTheme);
                break;
            case 'centered':
                await this.buildConclusionSlide(slideElement, slideData, slideTheme);
                break;
            case 'two-column':
                await this.buildContentSlide(slideElement, slideData, slideTheme);
                break;
            default:
                await this.buildContentSlide(slideElement, slideData, slideTheme);
        }
        
        // Apply animations
        if (slideData.animation) {
            this.applyAnimation(slideElement, slideData.animation);
        }
        
        // Add staggered animations to child elements
        setTimeout(() => {
            const elements = slideElement.querySelectorAll('.slide-content > *');
            elements.forEach((element, index) => {
                element.style.animationDelay = `${index * 0.2}s`;
                element.classList.add('animate-fadeInUp');
            });
        }, 100);
        
        return slideElement;
    }

    applyThemeStyles(element, theme) {
        element.style.setProperty('--slide-primary', theme.primary);
        element.style.setProperty('--slide-secondary', theme.secondary);
        element.style.setProperty('--slide-accent', theme.accent);
        element.style.setProperty('--slide-background', theme.background);
        element.style.setProperty('--slide-text', theme.text);
        element.style.setProperty('--slide-text-secondary', theme.textSecondary);
    }

    applyLayoutStyles(element, css) {
        const styleElement = document.createElement('style');
        styleElement.textContent = css;
        element.appendChild(styleElement);
    }

    applyAnimation(element, animationName) {
        const animation = this.animations[animationName];
        if (animation) {
            element.style.animation = animation;
        }
    }

    async buildTitleSlide(slideElement, slideData, theme) {
        slideElement.innerHTML = `
            <div class="slide-background"></div>
            <div class="slide-content title-content">
                <div class="title-section">
                    <h1 class="slide-title">${slideData.title}</h1>
                    <p class="slide-subtitle">${slideData.subtitle || ''}</p>
                </div>
                <div class="metadata-section">
                    <div class="author-info">
                        <span class="author">${slideData.author || ''}</span>
                        <span class="date">${slideData.date || ''}</span>
                    </div>
                </div>
            </div>
            <div class="decorative-elements">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>
        `;
    }

    async buildContentSlide(slideElement, slideData, theme) {
        const hasImage = slideData.image;
        const contentClass = hasImage ? 'content-with-image' : 'content-only';
        
        let contentHTML = `
            <div class="slide-header">
                <h2 class="slide-title">${slideData.title}</h2>
                ${slideData.subtitle ? `<p class="slide-subtitle">${slideData.subtitle}</p>` : ''}
            </div>
            <div class="slide-body ${contentClass}">
                <div class="content-section">
                    ${this.buildContentList(slideData.content)}
                </div>
        `;
        
        if (hasImage) {
            contentHTML += `
                <div class="image-section">
                    <div class="image-container">
                        <img src="${slideData.image.src}" alt="${slideData.image.alt || ''}" 
                             loading="lazy" class="slide-image">
                        ${slideData.image.caption ? `<div class="image-caption">${slideData.image.caption}</div>` : ''}
                    </div>
                </div>
            `;
        }
        
        contentHTML += '</div>';
        
        slideElement.innerHTML = contentHTML;
    }

    async buildProfessionalTitleSlide(slideElement, slideData, theme) {
        slideElement.innerHTML = `
            <div class="slide-background"></div>
            <div class="slide-content title-content">
                <div class="title-section">
                    <h1 class="slide-title">${slideData.title}</h1>
                    <p class="slide-subtitle">${slideData.subtitle || ''}</p>
                </div>
                <div class="metadata-section">
                    <div class="author-info">
                        <span class="author">${slideData.author || ''}</span>
                        <span class="date">${slideData.date || ''}</span>
                    </div>
                </div>
            </div>
            <div class="decorative-elements">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>
        `;
    }

    async buildContentSplitSlide(slideElement, slideData, theme) {
        slideElement.innerHTML = `
            <div class="slide-header">
                <h2 class="slide-title">${slideData.title}</h2>
                ${slideData.subtitle ? `<p class="slide-subtitle">${slideData.subtitle}</p>` : ''}
            </div>
            <div class="slide-body">
                <div class="left-content">
                    <h3 class="content-title">${slideData.leftContent?.title || 'Key Points'}</h3>
                    ${this.buildContentList(slideData.leftContent?.content || slideData.content.slice(0, Math.ceil(slideData.content.length / 2)))}
                </div>
                <div class="divider"></div>
                <div class="right-content">
                    <h3 class="content-title">${slideData.rightContent?.title || 'Additional Details'}</h3>
                    ${this.buildContentList(slideData.rightContent?.content || slideData.content.slice(Math.ceil(slideData.content.length / 2)))}
                </div>
            </div>
        `;
    }

    async buildImageShowcaseSlide(slideElement, slideData, theme) {
        slideElement.innerHTML = `
            <div class="slide-background"></div>
            <div class="slide-header">
                <h2 class="slide-title">${slideData.title}</h2>
                ${slideData.subtitle ? `<p class="slide-subtitle">${slideData.subtitle}</p>` : ''}
            </div>
            <div class="image-container">
                <img src="${slideData.image?.src || 'https://via.placeholder.com/1200x800'}" 
                     alt="${slideData.image?.alt || ''}" 
                     class="slide-image">
                <div class="image-overlay"></div>
                <div class="overlay-text">
                    <h3>${slideData.title}</h3>
                    <p>${slideData.subtitle || ''}</p>
                </div>
                ${slideData.image?.caption ? `<div class="image-caption">${slideData.image.caption}</div>` : ''}
            </div>
        `;
    }

    async buildDataVisualizationSlide(slideElement, slideData, theme) {
        const chartId = slideData.chart?.id || `chart-${this.slideCounter}`;
        
        slideElement.innerHTML = `
            <div class="slide-header">
                <h2 class="slide-title">${slideData.title}</h2>
                ${slideData.subtitle ? `<p class="slide-subtitle">${slideData.subtitle}</p>` : ''}
            </div>
            <div class="chart-container">
                <div class="chart-wrapper">
                    <canvas id="${chartId}" class="slide-chart"></canvas>
                </div>
                <div class="data-points">
                    ${this.buildDataPoints(slideData.dataPoints || [])}
                </div>
            </div>
            ${slideData.insights ? this.buildInsightsSection(slideData.insights) : ''}
        `;
        
        // Initialize chart after slide is added to DOM
        if (slideData.chart) {
            setTimeout(() => {
                this.initializeChart(chartId, slideData.chart);
            }, 100);
        }
    }

    async buildTimelineSlide(slideElement, slideData, theme) {
        slideElement.innerHTML = `
            <div class="slide-header">
                <h2 class="slide-title">${slideData.title}</h2>
                ${slideData.subtitle ? `<p class="slide-subtitle">${slideData.subtitle}</p>` : ''}
            </div>
            <div class="timeline-container">
                <div class="timeline-line"></div>
                <div class="timeline-items">
                    ${this.buildTimelineItems(slideData.timelineItems || [])}
                </div>
            </div>
        `;
    }

    async buildComparisonSlide(slideElement, slideData, theme) {
        slideElement.innerHTML = `
            <div class="slide-header">
                <h2 class="slide-title">${slideData.title}</h2>
                ${slideData.subtitle ? `<p class="slide-subtitle">${slideData.subtitle}</p>` : ''}
            </div>
            <div class="slide-body">
                <div class="left-side">
                    <h3 class="side-title">${slideData.leftSide?.title || 'Advantages'}</h3>
                    ${this.buildContentList(slideData.leftSide?.content || [])}
                    <div class="side-highlight">Key Benefits</div>
                </div>
                <div class="vs-divider"></div>
                <div class="right-side">
                    <h3 class="side-title">${slideData.rightSide?.title || 'Considerations'}</h3>
                    ${this.buildContentList(slideData.rightSide?.content || [])}
                    <div class="side-highlight">Important Points</div>
                </div>
            </div>
        `;
    }

    async buildQuoteSlide(slideElement, slideData, theme) {
        slideElement.innerHTML = `
            <div class="slide-background"></div>
            <div class="slide-content">
                <div class="quote-text">${slideData.quote || slideData.content?.[0] || 'Inspirational quote'}</div>
                <div class="quote-author">${slideData.author || 'Expert'}</div>
                <div class="quote-title">${slideData.title || 'Professional'}</div>
            </div>
            <div class="decorative-elements">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
            </div>
        `;
    }

    buildDataPoints(dataPoints) {
        return dataPoints.map((point, index) => `
            <div class="data-point">
                <div class="data-point-icon">${index + 1}</div>
                <div class="data-point-content">
                    <h4>${point.title || point.label}</h4>
                    <p>${point.description || point.value}</p>
                </div>
            </div>
        `).join('');
    }

    buildTimelineItems(timelineItems) {
        return timelineItems.map((item, index) => `
            <div class="timeline-item">
                <div class="timeline-dot">${item.icon || index + 1}</div>
                <div class="timeline-content">
                    <h4>${item.title}</h4>
                    <p>${item.content}</p>
                    <div class="timeline-date">${item.date}</div>
                </div>
            </div>
        `).join('');
    }

    async buildChartSlide(slideElement, slideData, theme) {
        const chartId = slideData.chart.id || `chart-${this.slideCounter}`;
        
        slideElement.innerHTML = `
            <div class="slide-header">
                <h2 class="slide-title">${slideData.title}</h2>
                ${slideData.subtitle ? `<p class="slide-subtitle">${slideData.subtitle}</p>` : ''}
            </div>
            <div class="slide-body chart-container">
                <div class="chart-wrapper">
                    <canvas id="${chartId}" class="slide-chart"></canvas>
                </div>
                ${slideData.insights ? this.buildInsightsSection(slideData.insights) : ''}
            </div>
        `;
        
        // Initialize chart after slide is added to DOM
        setTimeout(() => {
            this.initializeChart(chartId, slideData.chart);
        }, 100);
    }

    async buildStatisticsSlide(slideElement, slideData, theme) {
        slideElement.innerHTML = `
            <div class="slide-header">
                <h2 class="slide-title">${slideData.title}</h2>
                ${slideData.subtitle ? `<p class="slide-subtitle">${slideData.subtitle}</p>` : ''}
            </div>
            <div class="slide-body">
                <div class="stats-grid">
                    ${slideData.statistics.map(stat => `
                        <div class="stat-item">
                            <div class="stat-value">${stat.value}</div>
                            <div class="stat-label">${stat.label}</div>
                            <div class="stat-description">${stat.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async buildConclusionSlide(slideElement, slideData, theme) {
        slideElement.innerHTML = `
            <div class="slide-content centered-content">
                <div class="conclusion-header">
                    <h2 class="slide-title">${slideData.title}</h2>
                    ${slideData.subtitle ? `<p class="slide-subtitle">${slideData.subtitle}</p>` : ''}
                </div>
                <div class="conclusion-body">
                    ${this.buildContentList(slideData.content)}
                    ${slideData.callToAction ? `
                        <div class="call-to-action">
                            <p class="cta-text">${slideData.callToAction}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    buildContentList(content) {
        if (!content || !Array.isArray(content)) return '';
        
        return `
            <ul class="content-list">
                ${content.map(item => `<li class="content-item">${item}</li>`).join('')}
            </ul>
        `;
    }

    buildInsightsSection(insights) {
        if (!insights || !Array.isArray(insights)) return '';
        
        return `
            <div class="insights-section">
                <h4 class="insights-title">Key Insights</h4>
                <ul class="insights-list">
                    ${insights.map(insight => `<li class="insight-item">${insight}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    initializeChart(chartId, chartData) {
        const canvas = document.getElementById(chartId);
        if (!canvas || !window.Chart) return;

        const ctx = canvas.getContext('2d');
        
        const data = {
            labels: chartData.data.labels,
            datasets: [{
                label: chartData.title || 'Data',
                data: chartData.data.values,
                backgroundColor: this.generateChartColors(chartData.data.values.length, 0.8),
                borderColor: this.generateChartColors(chartData.data.values.length, 1),
                borderWidth: 2,
                tension: 0.4
            }]
        };

        const config = {
            type: chartData.type,
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: chartData.type === 'doughnut' ? 'right' : 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12,
                                family: 'Inter, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        cornerRadius: 8,
                        padding: 12
                    }
                },
                ...(chartData.type !== 'doughnut' && {
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { 
                                color: '#64748b',
                                font: { family: 'Inter, sans-serif' }
                            }
                        },
                        y: {
                            grid: { color: '#e2e8f0' },
                            ticks: { 
                                color: '#64748b',
                                font: { family: 'Inter, sans-serif' }
                            }
                        }
                    }
                }),
                ...(chartData.type === 'doughnut' && {
                    cutout: '60%'
                })
            }
        };

        new Chart(ctx, config);
    }

    generateChartColors(count, opacity = 1) {
        const colors = [
            `rgba(59, 130, 246, ${opacity})`,   // Blue
            `rgba(16, 185, 129, ${opacity})`,   // Green
            `rgba(245, 158, 11, ${opacity})`,   // Yellow
            `rgba(239, 68, 68, ${opacity})`,    // Red
            `rgba(139, 92, 246, ${opacity})`,   // Purple
            `rgba(6, 182, 212, ${opacity})`,    // Cyan
            `rgba(132, 204, 22, ${opacity})`,   // Lime
            `rgba(249, 115, 22, ${opacity})`,   // Orange
            `rgba(236, 72, 153, ${opacity})`,   // Pink
            `rgba(99, 102, 241, ${opacity})`    // Indigo
        ];
        
        return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
    }

    // Layout CSS Methods
    getHeroLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                position: relative;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                background: var(--slide-background);
            }

            .slide-background {
                position: absolute;
                inset: 0;
                background: var(--slide-background);
                z-index: 1;
            }

            .title-content {
                position: relative;
                z-index: 2;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 3rem;
            }

            .slide-title {
                font-size: 2.5rem;
                font-weight: 800;
                color: var(--slide-primary);
                margin: 0 0 1rem 0;
                line-height: 1.2;
                font-family: 'Montserrat', sans-serif;
            }

            .slide-subtitle {
                font-size: 1.25rem;
                color: var(--slide-text-secondary);
                margin: 0 0 2rem 0;
                font-weight: 500;
                max-width: 600px;
            }

            .metadata-section {
                margin-top: auto;
            }

            .author-info {
                display: flex;
                gap: 2rem;
                font-size: 0.9rem;
                color: var(--slide-text-secondary);
            }

            .decorative-elements {
                position: absolute;
                inset: 0;
                z-index: 1;
                pointer-events: none;
            }

            .shape {
                position: absolute;
                border-radius: 50%;
                background: linear-gradient(45deg, var(--slide-accent), var(--slide-primary));
                opacity: 0.1;
            }

            .shape-1 {
                width: 200px;
                height: 200px;
                top: -50px;
                right: -50px;
            }

            .shape-2 {
                width: 150px;
                height: 150px;
                bottom: -30px;
                left: -30px;
            }

            .shape-3 {
                width: 100px;
                height: 100px;
                top: 50%;
                left: 10%;
                transform: translateY(-50%);
            }
        `;
    }

    getContentImageLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                padding: 2rem;
                display: flex;
                flex-direction: column;
            }

            .slide-header {
                margin-bottom: 2rem;
            }

            .slide-title {
                font-size: 2rem;
                font-weight: 700;
                color: var(--slide-primary);
                margin: 0 0 0.5rem 0;
                font-family: 'Montserrat', sans-serif;
            }

            .slide-subtitle {
                font-size: 1rem;
                color: var(--slide-text-secondary);
                margin: 0;
                font-weight: 500;
            }

            .slide-body {
                flex: 1;
                display: flex;
                gap: 2rem;
                align-items: center;
            }

            .content-with-image .content-section {
                flex: 1.2;
            }

            .content-with-image .image-section {
                flex: 0.8;
            }

            .content-only .content-section {
                flex: 1;
            }

            .content-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .content-item {
                padding: 0.75rem 0;
                padding-left: 2rem;
                position: relative;
                font-size: 1.1rem;
                line-height: 1.6;
                color: var(--slide-text);
                border-left: 3px solid var(--slide-accent);
                margin-bottom: 1rem;
                background: linear-gradient(90deg, var(--slide-accent)10, transparent 10%);
            }

            .content-item::before {
                content: '';
                position: absolute;
                left: -6px;
                top: 50%;
                transform: translateY(-50%);
                width: 12px;
                height: 12px;
                background: var(--slide-primary);
                border-radius: 50%;
            }

            .image-container {
                width: 100%;
                height: 300px;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .slide-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .slide-image:hover {
                transform: scale(1.02);
            }
        `;
    }

    getChartFocusLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                padding: 2rem;
                display: flex;
                flex-direction: column;
            }

            .slide-header {
                margin-bottom: 2rem;
                text-align: center;
            }

            .slide-title {
                font-size: 2rem;
                font-weight: 700;
                color: var(--slide-primary);
                margin: 0 0 0.5rem 0;
                font-family: 'Montserrat', sans-serif;
            }

            .slide-subtitle {
                font-size: 1rem;
                color: var(--slide-text-secondary);
                margin: 0;
                font-weight: 500;
            }

            .chart-container {
                flex: 1;
                display: flex;
                gap: 2rem;
            }

            .chart-wrapper {
                flex: 2;
                position: relative;
                background: #fafafa;
                border-radius: 8px;
                padding: 1rem;
            }

            .slide-chart {
                width: 100% !important;
                height: 100% !important;
            }

            .insights-section {
                flex: 1;
                padding-left: 1rem;
            }

            .insights-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: var(--slide-primary);
                margin: 0 0 1rem 0;
            }

            .insights-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .insight-item {
                padding: 0.5rem 0;
                font-size: 0.9rem;
                line-height: 1.5;
                color: var(--slide-text);
                position: relative;
                padding-left: 1.5rem;
            }

            .insight-item::before {
                content: '→';
                position: absolute;
                left: 0;
                color: var(--slide-accent);
                font-weight: bold;
            }
        `;
    }

    getStatsGridLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                padding: 2rem;
                display: flex;
                flex-direction: column;
            }

            .slide-header {
                margin-bottom: 2rem;
                text-align: center;
            }

            .slide-title {
                font-size: 2rem;
                font-weight: 700;
                color: var(--slide-primary);
                margin: 0 0 0.5rem 0;
                font-family: 'Montserrat', sans-serif;
            }

            .slide-subtitle {
                font-size: 1rem;
                color: var(--slide-text-secondary);
                margin: 0;
                font-weight: 500;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                flex: 1;
                align-items: center;
            }

            .stat-item {
                text-align: center;
                padding: 2rem;
                background: linear-gradient(135deg, var(--slide-background) 0%, rgba(255, 255, 255, 0.8) 100%);
                border-radius: 12px;
                border: 2px solid var(--slide-accent);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .stat-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }

            .stat-value {
                font-size: 3rem;
                font-weight: 800;
                color: var(--slide-primary);
                margin-bottom: 0.5rem;
                font-family: 'Montserrat', sans-serif;
            }

            .stat-label {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--slide-text);
                margin-bottom: 0.5rem;
            }

            .stat-description {
                font-size: 0.9rem;
                color: var(--slide-text-secondary);
                font-weight: 500;
            }
        `;
    }

    getCenteredLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 3rem;
            }

            .centered-content {
                text-align: center;
                max-width: 700px;
            }

            .conclusion-header {
                margin-bottom: 2rem;
            }

            .slide-title {
                font-size: 2.25rem;
                font-weight: 700;
                color: var(--slide-primary);
                margin: 0 0 1rem 0;
                font-family: 'Montserrat', sans-serif;
            }

            .slide-subtitle {
                font-size: 1.1rem;
                color: var(--slide-text-secondary);
                margin: 0;
                font-weight: 500;
            }

            .conclusion-body {
                margin-bottom: 2rem;
            }

            .content-list {
                list-style: none;
                padding: 0;
                margin: 0 0 2rem 0;
            }

            .content-item {
                padding: 1rem;
                margin: 1rem 0;
                font-size: 1.1rem;
                line-height: 1.6;
                color: var(--slide-text);
                background: var(--slide-background);
                border-radius: 8px;
                border-left: 4px solid var(--slide-accent);
            }

            .call-to-action {
                margin-top: 2rem;
                padding: 2rem;
                background: linear-gradient(135deg, var(--slide-primary), var(--slide-accent));
                border-radius: 12px;
                color: white;
            }

            .cta-text {
                font-size: 1.25rem;
                font-weight: 600;
                margin: 0;
            }
        `;
    }

    getTwoColumnLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                padding: 2rem;
                display: flex;
                flex-direction: column;
            }

            .slide-header {
                margin-bottom: 2rem;
                text-align: center;
            }

            .slide-title {
                font-size: 2rem;
                font-weight: 700;
                color: var(--slide-primary);
                margin: 0 0 0.5rem 0;
                font-family: 'Montserrat', sans-serif;
            }

            .slide-subtitle {
                font-size: 1rem;
                color: var(--slide-text-secondary);
                margin: 0;
                font-weight: 500;
            }

            .slide-body {
                flex: 1;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 3rem;
            }

            .left-column, .right-column {
                padding: 1.5rem;
                background: var(--slide-background);
                border-radius: 8px;
                border: 1px solid rgba(0, 0, 0, 0.1);
            }

            .column-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: var(--slide-primary);
                margin-bottom: 1rem;
            }

            .column-content {
                color: var(--slide-text);
                line-height: 1.6;
            }
        `;
    }

    getProfessionalTitleLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                position: relative;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                background: linear-gradient(135deg, var(--slide-primary) 0%, var(--slide-secondary) 100%);
            }

            .slide-background {
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, var(--slide-primary) 0%, var(--slide-secondary) 100%);
                z-index: 1;
            }

            .slide-background::before {
                content: '';
                position: absolute;
                inset: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
                opacity: 0.3;
            }

            .slide-content {
                position: relative;
                z-index: 2;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 4rem;
                color: white;
            }

            .slide-title {
                font-size: 3.5rem;
                font-weight: 800;
                color: white;
                margin: 0 0 1.5rem 0;
                line-height: 1.1;
                font-family: 'Montserrat', sans-serif;
                text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }

            .slide-subtitle {
                font-size: 1.5rem;
                color: rgba(255, 255, 255, 0.9);
                margin: 0 0 3rem 0;
                font-weight: 400;
                max-width: 800px;
                line-height: 1.4;
            }

            .metadata-section {
                margin-top: auto;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                align-items: center;
            }

            .author-info {
                display: flex;
                gap: 3rem;
                font-size: 1rem;
                color: rgba(255, 255, 255, 0.8);
                font-weight: 500;
            }

            .decorative-elements {
                position: absolute;
                inset: 0;
                z-index: 1;
                pointer-events: none;
            }

            .shape {
                position: absolute;
                border-radius: 50%;
                background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                animation: float 20s infinite ease-in-out;
            }

            .shape-1 {
                width: 300px;
                height: 300px;
                top: -100px;
                right: -100px;
                animation-delay: 0s;
            }

            .shape-2 {
                width: 200px;
                height: 200px;
                bottom: -50px;
                left: -50px;
                animation-delay: 5s;
            }

            .shape-3 {
                width: 150px;
                height: 150px;
                top: 30%;
                left: 10%;
                animation-delay: 10s;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-30px) rotate(180deg); }
            }
        `;
    }

    getContentSplitLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                padding: 3rem;
                display: flex;
                flex-direction: column;
            }

            .slide-header {
                margin-bottom: 3rem;
                text-align: center;
            }

            .slide-title {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--slide-primary);
                margin: 0 0 1rem 0;
                font-family: 'Montserrat', sans-serif;
            }

            .slide-subtitle {
                font-size: 1.2rem;
                color: var(--slide-text-secondary);
                margin: 0;
                font-weight: 500;
            }

            .slide-body {
                flex: 1;
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                gap: 3rem;
                align-items: center;
            }

            .left-content, .right-content {
                padding: 2rem;
                background: linear-gradient(135deg, var(--slide-background) 0%, rgba(255, 255, 255, 0.8) 100%);
                border-radius: 12px;
                border: 1px solid var(--border-color);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }

            .divider {
                width: 4px;
                height: 200px;
                background: linear-gradient(180deg, var(--slide-primary) 0%, var(--slide-accent) 100%);
                border-radius: 2px;
                position: relative;
            }

            .divider::before {
                content: 'VS';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                color: var(--slide-primary);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-weight: 700;
                font-size: 0.9rem;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .content-title {
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--slide-primary);
                margin-bottom: 1.5rem;
                text-align: center;
            }

            .content-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .content-item {
                padding: 1rem 0;
                font-size: 1.1rem;
                line-height: 1.6;
                color: var(--slide-text);
                position: relative;
                padding-left: 2rem;
                border-bottom: 1px solid var(--border-light);
            }

            .content-item:last-child {
                border-bottom: none;
            }

            .content-item::before {
                content: '✓';
                position: absolute;
                left: 0;
                top: 1rem;
                width: 20px;
                height: 20px;
                background: var(--slide-accent);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                font-weight: bold;
            }
        `;
    }

    getImageShowcaseLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                position: relative;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
            }

            .slide-background {
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, var(--slide-background) 0%, #f8fafc 100%);
            }

            .slide-header {
                position: absolute;
                top: 3rem;
                left: 3rem;
                right: 3rem;
                z-index: 3;
            }

            .slide-title {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--slide-primary);
                margin: 0 0 1rem 0;
                font-family: 'Montserrat', sans-serif;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .slide-subtitle {
                font-size: 1.2rem;
                color: var(--slide-text-secondary);
                margin: 0;
                font-weight: 500;
            }

            .image-container {
                position: absolute;
                inset: 0;
                z-index: 1;
            }

            .slide-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }

            .image-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
                z-index: 2;
            }

            .overlay-text {
                position: absolute;
                bottom: 3rem;
                left: 3rem;
                right: 3rem;
                z-index: 3;
                color: white;
            }

            .overlay-text h3 {
                font-size: 1.8rem;
                font-weight: 600;
                margin: 0 0 1rem 0;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            }

            .overlay-text p {
                font-size: 1.1rem;
                margin: 0;
                opacity: 0.9;
                line-height: 1.5;
            }

            .image-caption {
                position: absolute;
                bottom: 1rem;
                right: 1rem;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                z-index: 3;
            }
        `;
    }

    getDataVisualizationLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                padding: 3rem;
                display: flex;
                flex-direction: column;
            }

            .slide-header {
                margin-bottom: 2rem;
                text-align: center;
            }

            .slide-title {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--slide-primary);
                margin: 0 0 1rem 0;
                font-family: 'Montserrat', sans-serif;
            }

            .slide-subtitle {
                font-size: 1.2rem;
                color: var(--slide-text-secondary);
                margin: 0;
                font-weight: 500;
            }

            .chart-container {
                flex: 1;
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 3rem;
                align-items: center;
            }

            .chart-wrapper {
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                border-radius: 12px;
                padding: 2rem;
                border: 1px solid var(--border-color);
                position: relative;
                overflow: hidden;
            }

            .chart-wrapper::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, var(--slide-primary) 0%, var(--slide-accent) 100%);
            }

            .slide-chart {
                width: 100% !important;
                height: 100% !important;
            }

            .data-points {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }

            .data-point {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: white;
                border-radius: 8px;
                border: 1px solid var(--border-color);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }

            .data-point-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--slide-primary) 0%, var(--slide-accent) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 1.2rem;
            }

            .data-point-content h4 {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--slide-primary);
                margin: 0 0 0.25rem 0;
            }

            .data-point-content p {
                font-size: 0.9rem;
                color: var(--slide-text-secondary);
                margin: 0;
            }

            .insights-section {
                margin-top: 2rem;
                padding: 2rem;
                background: linear-gradient(135deg, var(--slide-background) 0%, rgba(255, 255, 255, 0.8) 100%);
                border-radius: 12px;
                border-left: 4px solid var(--slide-accent);
            }

            .insights-title {
                font-size: 1.3rem;
                font-weight: 600;
                color: var(--slide-primary);
                margin: 0 0 1rem 0;
            }

            .insights-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .insight-item {
                padding: 0.75rem 0;
                font-size: 1rem;
                line-height: 1.5;
                color: var(--slide-text);
                position: relative;
                padding-left: 1.5rem;
            }

            .insight-item::before {
                content: '→';
                position: absolute;
                left: 0;
                color: var(--slide-accent);
                font-weight: bold;
            }
        `;
    }

    getTimelineLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                padding: 3rem;
                display: flex;
                flex-direction: column;
            }

            .slide-header {
                margin-bottom: 3rem;
                text-align: center;
            }

            .slide-title {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--slide-primary);
                margin: 0 0 1rem 0;
                font-family: 'Montserrat', sans-serif;
            }

            .slide-subtitle {
                font-size: 1.2rem;
                color: var(--slide-text-secondary);
                margin: 0;
                font-weight: 500;
            }

            .timeline-container {
                flex: 1;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .timeline-line {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, var(--slide-primary) 0%, var(--slide-accent) 100%);
                border-radius: 2px;
                transform: translateY(-50%);
            }

            .timeline-items {
                display: flex;
                justify-content: space-between;
                width: 100%;
                position: relative;
                z-index: 2;
            }

            .timeline-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                max-width: 200px;
            }

            .timeline-dot {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--slide-primary) 0%, var(--slide-accent) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 1.2rem;
                margin-bottom: 1rem;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                position: relative;
            }

            .timeline-dot::before {
                content: '';
                position: absolute;
                inset: -4px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--slide-primary) 0%, var(--slide-accent) 100%);
                opacity: 0.3;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 0.3; }
                50% { transform: scale(1.1); opacity: 0.1; }
            }

            .timeline-content h4 {
                font-size: 1.1rem;
                font-weight: 600;
                color: var(--slide-primary);
                margin: 0 0 0.5rem 0;
            }

            .timeline-content p {
                font-size: 0.9rem;
                color: var(--slide-text-secondary);
                margin: 0;
                line-height: 1.4;
            }

            .timeline-date {
                font-size: 0.8rem;
                color: var(--slide-accent);
                font-weight: 600;
                margin-top: 0.5rem;
            }
        `;
    }

    getComparisonLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                padding: 3rem;
                display: flex;
                flex-direction: column;
            }

            .slide-header {
                margin-bottom: 3rem;
                text-align: center;
            }

            .slide-title {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--slide-primary);
                margin: 0 0 1rem 0;
                font-family: 'Montserrat', sans-serif;
            }

            .slide-subtitle {
                font-size: 1.2rem;
                color: var(--slide-text-secondary);
                margin: 0;
                font-weight: 500;
            }

            .slide-body {
                flex: 1;
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                gap: 3rem;
                align-items: stretch;
            }

            .left-side, .right-side {
                padding: 2.5rem;
                border-radius: 12px;
                position: relative;
                overflow: hidden;
            }

            .left-side {
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                border: 2px solid #0ea5e9;
            }

            .right-side {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                border: 2px solid #f59e0b;
            }

            .vs-divider {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .vs-divider::before {
                content: 'VS';
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--slide-primary) 0%, var(--slide-accent) 100%);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                font-size: 1.5rem;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                z-index: 2;
            }

            .side-title {
                font-size: 1.8rem;
                font-weight: 700;
                margin: 0 0 2rem 0;
                text-align: center;
            }

            .left-side .side-title {
                color: #0c4a6e;
            }

            .right-side .side-title {
                color: #92400e;
            }

            .side-content {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .side-content li {
                padding: 1rem 0;
                font-size: 1.1rem;
                line-height: 1.6;
                position: relative;
                padding-left: 2rem;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }

            .side-content li:last-child {
                border-bottom: none;
            }

            .side-content li::before {
                content: '✓';
                position: absolute;
                left: 0;
                top: 1rem;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                font-weight: bold;
                color: white;
            }

            .left-side .side-content li::before {
                background: #0ea5e9;
            }

            .right-side .side-content li::before {
                background: #f59e0b;
            }

            .side-highlight {
                margin-top: 2rem;
                padding: 1.5rem;
                border-radius: 8px;
                text-align: center;
                font-weight: 600;
            }

            .left-side .side-highlight {
                background: rgba(14, 165, 233, 0.1);
                color: #0c4a6e;
            }

            .right-side .side-highlight {
                background: rgba(245, 158, 11, 0.1);
                color: #92400e;
            }
        `;
    }

    getQuoteLayoutCSS() {
        return `
            .slide {
                width: 100%;
                height: 500px;
                position: relative;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
                background: linear-gradient(135deg, var(--slide-primary) 0%, var(--slide-secondary) 100%);
            }

            .slide-background {
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, var(--slide-primary) 0%, var(--slide-secondary) 100%);
                z-index: 1;
            }

            .slide-background::before {
                content: '';
                position: absolute;
                inset: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
                opacity: 0.5;
            }

            .slide-content {
                position: relative;
                z-index: 2;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 4rem;
                color: white;
            }

            .quote-text {
                font-size: 2.5rem;
                font-weight: 300;
                line-height: 1.3;
                margin: 0 0 3rem 0;
                font-style: italic;
                max-width: 900px;
                position: relative;
            }

            .quote-text::before {
                content: '"';
                position: absolute;
                top: -1rem;
                left: -2rem;
                font-size: 6rem;
                color: rgba(255, 255, 255, 0.3);
                font-family: serif;
                line-height: 1;
            }

            .quote-text::after {
                content: '"';
                position: absolute;
                bottom: -2rem;
                right: -2rem;
                font-size: 6rem;
                color: rgba(255, 255, 255, 0.3);
                font-family: serif;
                line-height: 1;
            }

            .quote-author {
                font-size: 1.3rem;
                font-weight: 600;
                margin: 0 0 0.5rem 0;
                opacity: 0.9;
            }

            .quote-title {
                font-size: 1rem;
                opacity: 0.7;
                margin: 0;
                font-weight: 400;
            }

            .decorative-elements {
                position: absolute;
                inset: 0;
                z-index: 1;
                pointer-events: none;
            }

            .shape {
                position: absolute;
                border-radius: 50%;
                background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                animation: float 25s infinite ease-in-out;
            }

            .shape-1 {
                width: 400px;
                height: 400px;
                top: -150px;
                right: -150px;
                animation-delay: 0s;
            }

            .shape-2 {
                width: 300px;
                height: 300px;
                bottom: -100px;
                left: -100px;
                animation-delay: 8s;
            }

            .shape-3 {
                width: 200px;
                height: 200px;
                top: 20%;
                left: 5%;
                animation-delay: 15s;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-40px) rotate(180deg); }
            }
        `;
    }
}
