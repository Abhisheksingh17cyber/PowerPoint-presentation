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
            staggeredFadeIn: 'staggeredFadeIn 1s ease-out forwards'
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
        
        // Build slide content based on type
        switch (slideData.type) {
            case 'title':
                await this.buildTitleSlide(slideElement, slideData, slideTheme);
                break;
            case 'content':
                await this.buildContentSlide(slideElement, slideData, slideTheme);
                break;
            case 'chart':
                await this.buildChartSlide(slideElement, slideData, slideTheme);
                break;
            case 'statistics':
                await this.buildStatisticsSlide(slideElement, slideData, slideTheme);
                break;
            case 'conclusion':
                await this.buildConclusionSlide(slideElement, slideData, slideTheme);
                break;
            default:
                await this.buildContentSlide(slideElement, slideData, slideTheme);
        }
        
        // Apply animations
        if (slideData.animation) {
            this.applyAnimation(slideElement, slideData.animation);
        }
        
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
                    </div>
                </div>
            `;
        }
        
        contentHTML += '</div>';
        
        slideElement.innerHTML = contentHTML;
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
}
