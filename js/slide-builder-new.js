// Enhanced Slide Builder with Charts, Real Images & Professional Layouts
class SlideBuilder {
    constructor() {
        this.slideTemplates = this.initializeSlideTemplates();
        this.animations = this.initializeAnimations();
        this.layouts = this.initializeLayouts();
        this.chartBuilder = new ChartBuilder();
    }
    
    initializeSlideTemplates() {
        return {
            title: {
                layout: 'hero',
                elements: ['title', 'subtitle', 'background-image', 'feature-cards'],
                animation: 'fadeInScale',
                style: 'full-screen'
            },
            overview: {
                layout: 'content-with-image',
                elements: ['title', 'bullet-points', 'side-image'],
                animation: 'slideInLeft',
                style: 'split-layout'
            },
            statistics: {
                layout: 'chart-focus',
                elements: ['title', 'stats-grid', 'chart', 'insights'],
                animation: 'slideInUp',
                style: 'data-heavy'
            },
            applications: {
                layout: 'grid-layout',
                elements: ['title', 'feature-grid', 'icons'],
                animation: 'staggeredFadeIn',
                style: 'multi-column'
            },
            trends: {
                layout: 'timeline',
                elements: ['title', 'timeline-items', 'visual-indicators'],
                animation: 'slideInRight',
                style: 'chronological'
            },
            challenges: {
                layout: 'problem-solution',
                elements: ['title', 'challenge-list', 'solution-hints'],
                animation: 'slideInBoth',
                style: 'balanced-split'
            },
            implementation: {
                layout: 'process-flow',
                elements: ['title', 'step-indicators', 'flow-diagram'],
                animation: 'sequentialReveal',
                style: 'process-oriented'
            },
            conclusion: {
                layout: 'conclusion',
                elements: ['title', 'key-takeaways', 'call-to-action'],
                animation: 'fadeInScale',
                style: 'summary-focused'
            }
        };
    }
    
    initializeAnimations() {
        return {
            fadeIn: 'animate__animated animate__fadeIn',
            fadeInScale: 'animate__animated animate__fadeIn animate__slow',
            slideInLeft: 'animate__animated animate__slideInLeft',
            slideInRight: 'animate__animated animate__slideInRight',
            slideInUp: 'animate__animated animate__slideInUp',
            slideInBoth: 'animate__animated animate__fadeInUp',
            staggeredFadeIn: 'animate__animated animate__fadeInUp',
            sequentialReveal: 'animate__animated animate__fadeInLeft',
            bounceIn: 'animate__animated animate__bounceIn'
        };
    }
    
    initializeLayouts() {
        return {
            hero: {
                structure: 'full-screen-center',
                gridTemplate: '1fr',
                alignment: 'center'
            },
            'content-with-image': {
                structure: 'two-column',
                gridTemplate: '1fr 1fr',
                alignment: 'flex-start'
            },
            'chart-focus': {
                structure: 'chart-dominant',
                gridTemplate: '1fr 2fr',
                alignment: 'center'
            },
            'grid-layout': {
                structure: 'multi-column',
                gridTemplate: 'repeat(auto-fit, minmax(300px, 1fr))',
                alignment: 'stretch'
            },
            timeline: {
                structure: 'vertical-flow',
                gridTemplate: '1fr',
                alignment: 'flex-start'
            },
            'problem-solution': {
                structure: 'balanced-split',
                gridTemplate: '1fr 1fr',
                alignment: 'flex-start'
            },
            'process-flow': {
                structure: 'horizontal-flow',
                gridTemplate: 'repeat(4, 1fr)',
                alignment: 'center'
            },
            conclusion: {
                structure: 'centered-summary',
                gridTemplate: '1fr',
                alignment: 'center'
            }
        };
    }
    
    async buildSlide(slideData, template, colorScheme = 'blue') {
        const slideContainer = document.createElement('div');
        slideContainer.className = `slide slide-${slideData.type}`;
        slideContainer.setAttribute('data-layout', slideData.layout);
        
        // Apply color scheme
        this.applyColorScheme(slideContainer, colorScheme);
        
        // Build slide content based on type
        switch (slideData.layout) {
            case 'hero':
                await this.buildHeroSlide(slideContainer, slideData);
                break;
            case 'content-with-image':
                await this.buildContentWithImageSlide(slideContainer, slideData);
                break;
            case 'chart-focus':
                await this.buildChartFocusSlide(slideContainer, slideData);
                break;
            case 'grid-layout':
                await this.buildGridLayoutSlide(slideContainer, slideData);
                break;
            case 'timeline':
                await this.buildTimelineSlide(slideContainer, slideData);
                break;
            case 'problem-solution':
                await this.buildProblemSolutionSlide(slideContainer, slideData);
                break;
            case 'process-flow':
                await this.buildProcessFlowSlide(slideContainer, slideData);
                break;
            case 'conclusion':
                await this.buildConclusionSlide(slideContainer, slideData);
                break;
            default:
                await this.buildDefaultSlide(slideContainer, slideData);
        }
        
        // Add animations
        this.addAnimations(slideContainer, slideData.type);
        
        return slideContainer;
    }
    
    async buildHeroSlide(container, slideData) {
        container.innerHTML = `
            <div class="hero-section">
                <h1 class="hero-title">${slideData.title}</h1>
                <p class="hero-subtitle">${slideData.subtitle || ''}</p>
                
                ${slideData.image ? `
                    <div class="hero-background" style="background-image: url('${slideData.image.url}')"></div>
                ` : ''}
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="feature-icon">${slideData.visualElements?.icons || '🎯'}</div>
                        <h3>Comprehensive Analysis</h3>
                        <p>Detailed insights and strategic overview</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <h3>Data-Driven</h3>
                        <p>Evidence-based findings and statistics</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🚀</div>
                        <h3>Future-Ready</h3>
                        <p>Forward-looking trends and opportunities</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    async buildContentWithImageSlide(container, slideData) {
        const imageHtml = slideData.image ? 
            `<div class="slide-image-container">
                <img src="${slideData.image.url}" alt="${slideData.image.alt}" class="slide-image">
                <div class="image-attribution">Photo by ${slideData.image.photographer}</div>
            </div>` : 
            '<div class="slide-image-placeholder">📊 Visual Content</div>';
            
        container.innerHTML = `
            <div class="slide-with-image">
                <div class="slide-content">
                    <h2 class="slide-title">${slideData.title}</h2>
                    <ul class="slide-points">
                        ${slideData.content.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
                ${imageHtml}
            </div>
        `;
    }
    
    async buildChartFocusSlide(container, slideData) {
        const statsHtml = slideData.chartData ? 
            this.buildStatsGrid(slideData.chartData) : '';
            
        const chartHtml = slideData.chart ? 
            `<div class="chart-container">
                <img src="${slideData.chart.url}" alt="Chart visualization" class="chart-image">
            </div>` : 
            '<div class="chart-placeholder">📊 Chart Visualization</div>';
            
        container.innerHTML = `
            <div class="chart-slide">
                <h2 class="slide-title">${slideData.title}</h2>
                
                ${statsHtml}
                
                ${chartHtml}
                
                <div class="visual-content">
                    <div class="visual-content-header">
                        <i class="fas fa-lightbulb"></i>
                        <h4>Key Insights</h4>
                    </div>
                    <p>Data-driven analysis reveals significant trends and opportunities in the market.</p>
                </div>
            </div>
        `;
    }
    
    async buildGridLayoutSlide(container, slideData) {
        container.innerHTML = `
            <div class="grid-slide">
                <h2 class="slide-title">${slideData.title}</h2>
                
                <div class="feature-grid">
                    ${slideData.content.map((item, index) => `
                        <div class="feature-card">
                            <div class="feature-icon">${this.getIconForIndex(index)}</div>
                            <h3>${this.extractTitle(item)}</h3>
                            <p>${this.extractDescription(item)}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    async buildTimelineSlide(container, slideData) {
        const timelineData = this.generateTimelineData(slideData.content);
        
        container.innerHTML = `
            <div class="timeline-slide">
                <h2 class="slide-title">${slideData.title}</h2>
                
                <div class="timeline">
                    ${timelineData.map((item, index) => `
                        <div class="timeline-item">
                            <div class="timeline-year">202${index + 4}</div>
                            <div class="timeline-content">
                                <h4>${this.extractTitle(item)}</h4>
                                <p>${this.extractDescription(item)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    async buildProblemSolutionSlide(container, slideData) {
        container.innerHTML = `
            <div class="problem-solution-slide">
                <h2 class="slide-title">${slideData.title}</h2>
                
                <div class="dual-column">
                    <div class="challenges-column">
                        <h3><i class="fas fa-exclamation-triangle"></i> Challenges</h3>
                        <ul class="challenge-list">
                            ${slideData.content.slice(0, Math.ceil(slideData.content.length/2)).map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="solutions-column">
                        <h3><i class="fas fa-lightbulb"></i> Opportunities</h3>
                        <ul class="solution-list">
                            ${slideData.content.slice(Math.ceil(slideData.content.length/2)).map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
    
    async buildProcessFlowSlide(container, slideData) {
        container.innerHTML = `
            <div class="process-slide">
                <h2 class="slide-title">${slideData.title}</h2>
                
                <div class="process-flow">
                    ${slideData.content.map((step, index) => `
                        <div class="process-step">
                            <div class="step-number">${index + 1}</div>
                            <div class="step-content">
                                <h4>Step ${index + 1}</h4>
                                <p>${step}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    async buildConclusionSlide(container, slideData) {
        container.innerHTML = `
            <div class="conclusion-slide">
                <h2 class="slide-title">${slideData.title}</h2>
                
                <div class="conclusion-content">
                    <div class="key-takeaways">
                        <ul class="takeaway-list">
                            ${slideData.content.map(point => `<li><i class="fas fa-check-circle"></i> ${point}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="call-to-action">
                        <h3>Ready to Get Started?</h3>
                        <p>Take the next step in your journey with confidence.</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    async buildDefaultSlide(container, slideData) {
        const imageHtml = slideData.image ? 
            `<div class="slide-image-container">
                <img src="${slideData.image.url}" alt="${slideData.image.alt}" class="slide-image">
            </div>` : 
            '<div class="slide-image-placeholder">📊 Visual Content</div>';
            
        container.innerHTML = `
            <div class="default-slide">
                <h2 class="slide-title">${slideData.title}</h2>
                <div class="slide-content-wrapper">
                    <div class="slide-text">
                        <ul class="slide-points">
                            ${slideData.content.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                    ${imageHtml}
                </div>
            </div>
        `;
    }
    
    buildStatsGrid(statistics) {
        if (!statistics || statistics.length === 0) return '';
        
        return `
            <div class="stats-section">
                ${statistics.map(stat => `
                    <div class="stat-card">
                        <div class="stat-number">${stat.value}</div>
                        <p class="stat-label">${stat.label}</p>
                        <div class="stat-growth">${stat.growth}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    generateTimelineData(content) {
        // Convert content items into timeline format
        return content.map((item, index) => ({
            year: `202${index + 4}`,
            title: this.extractTitle(item),
            description: this.extractDescription(item)
        }));
    }
    
    extractTitle(item) {
        // Extract first few words as title
        const words = item.split(' ');
        return words.slice(0, 3).join(' ');
    }
    
    extractDescription(item) {
        // Use full item as description
        return item;
    }
    
    getIconForIndex(index) {
        const icons = ['🎯', '⚡', '🚀', '💡', '🔧', '📊', '🎨', '🌟'];
        return icons[index % icons.length];
    }
    
    applyColorScheme(container, scheme) {
        const schemes = {
            blue: {
                primary: '#2563eb',
                secondary: '#3b82f6',
                accent: '#1e40af'
            },
            green: {
                primary: '#059669',
                secondary: '#10b981',
                accent: '#047857'
            },
            purple: {
                primary: '#7c3aed',
                secondary: '#8b5cf6',
                accent: '#6d28d9'
            },
            orange: {
                primary: '#f59e0b',
                secondary: '#fbbf24',
                accent: '#d97706'
            }
        };
        
        const colors = schemes[scheme] || schemes.blue;
        container.style.setProperty('--primary-color', colors.primary);
        container.style.setProperty('--secondary-color', colors.secondary);
        container.style.setProperty('--accent-color', colors.accent);
    }
    
    addAnimations(container, slideType) {
        const template = this.slideTemplates[slideType];
        if (template && template.animation) {
            container.classList.add(this.animations[template.animation]);
        }
    }
    
    async buildPresentation(presentationData) {
        const slides = [];
        
        for (let i = 0; i < presentationData.slides.length; i++) {
            const slideData = presentationData.slides[i];
            const slide = await this.buildSlide(slideData, presentationData.template);
            slides.push(slide);
        }
        
        return {
            slides,
            metadata: presentationData.metadata,
            title: presentationData.title,
            subtitle: presentationData.subtitle
        };
    }
}

// Chart Builder Class for generating chart visualizations
class ChartBuilder {
    constructor() {
        this.chartTypes = ['bar', 'line', 'pie', 'doughnut', 'radar'];
        this.colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
    }
    
    generateChart(data, type = 'bar', title = 'Chart') {
        const chartConfig = {
            type: type,
            data: this.formatChartData(data, type),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                },
                scales: type !== 'pie' && type !== 'doughnut' ? {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    },
                    x: {
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    }
                } : {}
            }
        };
        
        return {
            config: chartConfig,
            url: `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(chartConfig))}&w=800&h=400`
        };
    }
    
    formatChartData(data, type) {
        if (!data || !Array.isArray(data)) {
            return { labels: [], datasets: [] };
        }
        
        return {
            labels: data.map(item => item.label || `Item ${data.indexOf(item) + 1}`),
            datasets: [{
                label: 'Values',
                data: data.map(item => this.extractNumericValue(item.value)),
                backgroundColor: this.colors.slice(0, data.length),
                borderColor: this.colors.slice(0, data.length),
                borderWidth: 2,
                fill: type === 'line' ? false : true
            }]
        };
    }
    
    extractNumericValue(value) {
        if (typeof value === 'number') return value;
        
        // Extract numbers from strings like "$184B", "77%", "3.5M"
        const numStr = value.toString().replace(/[^0-9.]/g, '');
        const num = parseFloat(numStr);
        
        // Handle suffixes
        if (value.includes('B') || value.includes('billion')) return num * 1000;
        if (value.includes('M') || value.includes('million')) return num * 1000;
        if (value.includes('K') || value.includes('thousand')) return num;
        if (value.includes('%')) return num;
        
        return num || 0;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.SlideBuilder = SlideBuilder;
    window.ChartBuilder = ChartBuilder;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SlideBuilder, ChartBuilder };
}
