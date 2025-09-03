// Main Application JavaScript for Professional PPT Maker
class PPTMakerApp {
    constructor() {
        this.state = {
            topic: '',
            template: 'business',
            colorScheme: 'blue',
            slides: [],
            currentSlide: 0,
            isGenerating: false
        };
        
        this.cache = new Map();
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupServiceWorker();
        this.loadFromCache();
        console.log('PPT Maker Pro initialized');
    }
    
    bindEvents() {
        // Topic input
        const topicInput = document.getElementById('topic-input');
        const charCount = document.getElementById('char-count');
        const generateBtn = document.getElementById('generate-btn');
        
        topicInput?.addEventListener('input', (e) => {
            this.state.topic = e.target.value;
            charCount.textContent = e.target.value.length;
            this.validateForm();
        });
        
        topicInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.state.isGenerating && this.state.topic.trim()) {
                this.generatePresentation();
            }
        });
        
        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.state.template = card.dataset.template;
                this.saveToCache();
            });
        });
        
        // Color scheme selection
        document.querySelectorAll('.color-scheme').forEach(scheme => {
            scheme.addEventListener('click', () => {
                document.querySelectorAll('.color-scheme').forEach(s => s.classList.remove('active'));
                scheme.classList.add('active');
                this.state.colorScheme = scheme.dataset.colors;
                this.saveToCache();
            });
        });
        
        // Generate button
        generateBtn?.addEventListener('click', () => {
            if (!this.state.isGenerating && this.state.topic.trim()) {
                this.generatePresentation();
            }
        });
        
        // Slide navigation
        document.getElementById('prev-slide')?.addEventListener('click', () => this.previousSlide());
        document.getElementById('next-slide')?.addEventListener('click', () => this.nextSlide());
        
        // Download buttons
        document.getElementById('download-ppt')?.addEventListener('click', () => this.downloadPPT());
        document.getElementById('download-pdf')?.addEventListener('click', () => this.downloadPDF());
        document.getElementById('download-images')?.addEventListener('click', () => this.downloadImages());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.state.slides.length > 0) {
                if (e.key === 'ArrowLeft') this.previousSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
                if (e.key === 'Escape') this.hidePreview();
            }
        });
        
        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    validateForm() {
        const generateBtn = document.getElementById('generate-btn');
        const isValid = this.state.topic.trim().length >= 3;
        
        if (generateBtn) {
            generateBtn.disabled = !isValid || this.state.isGenerating;
            generateBtn.style.opacity = isValid && !this.state.isGenerating ? '1' : '0.6';
        }
    }
    
    async generatePresentation() {
        if (this.state.isGenerating) return;
        
        this.state.isGenerating = true;
        this.showLoadingOverlay();
        
        try {
            // Generate content using AI
            const content = await this.generateContent(this.state.topic);
            
            // Create slides
            this.state.slides = await this.createSlides(content);
            
            // Apply template and styling
            this.applyTheme();
            
            // Show preview
            this.showPreview();
            
            // Save to cache
            this.saveToCache();
            
            // Analytics (if implemented)
            this.trackEvent('presentation_generated', {
                topic: this.state.topic,
                template: this.state.template,
                colorScheme: this.state.colorScheme,
                slideCount: this.state.slides.length
            });
            
        } catch (error) {
            console.error('Error generating presentation:', error);
            this.showError('Failed to generate presentation. Please try again.');
        } finally {
            this.state.isGenerating = false;
            this.hideLoadingOverlay();
            this.validateForm();
        }
    }
    
    async generateContent(topic) {
        this.updateLoadingStatus('Analyzing your topic...');
        
        // Simulate AI content generation
        // In a real implementation, this would call an AI API
        await this.delay(1000);
        
        this.updateLoadingStatus('Researching relevant information...');
        await this.delay(1000);
        
        this.updateLoadingStatus('Generating slide content...');
        await this.delay(1500);
        
        // Generate structured content
        const content = {
            title: this.formatTitle(topic),
            subtitle: `A comprehensive overview of ${topic}`,
            outline: this.generateOutline(topic),
            keyPoints: this.generateKeyPoints(topic),
            images: await this.searchImages(topic),
            conclusion: this.generateConclusion(topic)
        };
        
        return content;
    }
    
    formatTitle(topic) {
        return topic.charAt(0).toUpperCase() + topic.slice(1);
    }
    
    generateOutline(topic) {
        const outlines = {
            'artificial intelligence': [
                'Introduction to AI',
                'Types of AI Systems',
                'AI Applications Today',
                'Benefits and Challenges',
                'Future of AI',
                'Ethical Considerations'
            ],
            'renewable energy': [
                'What is Renewable Energy?',
                'Solar Energy Solutions',
                'Wind Power Technology',
                'Hydroelectric Systems',
                'Environmental Impact',
                'Economic Benefits'
            ],
            'digital marketing': [
                'Digital Marketing Overview',
                'Social Media Strategy',
                'Search Engine Optimization',
                'Content Marketing',
                'Email Marketing Campaigns',
                'Analytics and Measurement'
            ],
            'climate change': [
                'Understanding Climate Change',
                'Causes and Contributing Factors',
                'Global Impact Assessment',
                'Mitigation Strategies',
                'Adaptation Measures',
                'Individual Action Steps'
            ]
        };
        
        const lowercaseTopic = topic.toLowerCase();
        
        // Find matching outline or generate generic one
        for (const [key, outline] of Object.entries(outlines)) {
            if (lowercaseTopic.includes(key) || key.includes(lowercaseTopic)) {
                return outline;
            }
        }
        
        // Generate generic outline
        return [
            `Introduction to ${topic}`,
            `Key Components`,
            `Benefits and Advantages`,
            `Challenges and Solutions`,
            `Real-world Applications`,
            `Future Outlook`
        ];
    }
    
    generateKeyPoints(topic) {
        const keyPointsTemplates = {
            'artificial intelligence': [
                'AI is transforming industries across the globe',
                'Machine learning enables computers to learn from data',
                'Deep learning mimics human neural networks',
                'AI applications include healthcare, finance, and transportation',
                'Ethical AI development is crucial for responsible innovation'
            ],
            'renewable energy': [
                'Renewable energy sources are naturally replenishing',
                'Solar and wind power are the fastest-growing energy sources',
                'Renewable energy reduces greenhouse gas emissions',
                'Cost of renewable technologies continues to decline',
                'Energy storage solutions are improving rapidly'
            ],
            'digital marketing': [
                'Digital marketing reaches customers where they spend time online',
                'Data-driven strategies improve marketing effectiveness',
                'Social media platforms offer powerful targeting capabilities',
                'Content marketing builds trust and authority',
                'Mobile optimization is essential for modern campaigns'
            ]
        };
        
        const lowercaseTopic = topic.toLowerCase();
        
        for (const [key, points] of Object.entries(keyPointsTemplates)) {
            if (lowercaseTopic.includes(key) || key.includes(lowercaseTopic)) {
                return points;
            }
        }
        
        // Generate generic key points
        return [
            `${topic} is an important and evolving field`,
            `Understanding the fundamentals is essential`,
            `Current trends are shaping the future`,
            `Best practices lead to successful outcomes`,
            `Continuous learning and adaptation are key`
        ];
    }
    
    async searchImages(topic) {
        this.updateLoadingStatus('Finding relevant images...');
        
        // Create topic-specific and slide-specific images
        const lowerTopic = topic.toLowerCase();
        const images = [];
        
        // Topic-specific image mappings
        const topicImages = {
            'artificial intelligence': [
                'https://source.unsplash.com/800x600/?artificial-intelligence,technology',
                'https://source.unsplash.com/800x600/?robot,machine-learning',
                'https://source.unsplash.com/800x600/?neural-network,ai',
                'https://source.unsplash.com/800x600/?computer-vision,automation',
                'https://source.unsplash.com/800x600/?data-science,algorithm',
                'https://source.unsplash.com/800x600/?futuristic,technology'
            ],
            'climate change': [
                'https://source.unsplash.com/800x600/?climate-change,environment',
                'https://source.unsplash.com/800x600/?global-warming,earth',
                'https://source.unsplash.com/800x600/?greenhouse-gases,pollution',
                'https://source.unsplash.com/800x600/?renewable-energy,solar',
                'https://source.unsplash.com/800x600/?sustainability,green',
                'https://source.unsplash.com/800x600/?nature,conservation'
            ],
            'renewable energy': [
                'https://source.unsplash.com/800x600/?solar-panel,renewable',
                'https://source.unsplash.com/800x600/?wind-turbine,energy',
                'https://source.unsplash.com/800x600/?hydroelectric,power',
                'https://source.unsplash.com/800x600/?geothermal,clean-energy',
                'https://source.unsplash.com/800x600/?battery,energy-storage',
                'https://source.unsplash.com/800x600/?sustainable,green-technology'
            ],
            'digital marketing': [
                'https://source.unsplash.com/800x600/?digital-marketing,social-media',
                'https://source.unsplash.com/800x600/?analytics,data',
                'https://source.unsplash.com/800x600/?content-marketing,strategy',
                'https://source.unsplash.com/800x600/?email-marketing,campaign',
                'https://source.unsplash.com/800x600/?seo,search-engine',
                'https://source.unsplash.com/800x600/?mobile-marketing,smartphone'
            ]
        };
        
        // Find matching images or use generic professional ones
        let selectedImages = null;
        for (const [key, imgs] of Object.entries(topicImages)) {
            if (lowerTopic.includes(key) || key.includes(lowerTopic)) {
                selectedImages = imgs;
                break;
            }
        }
        
        // Fallback to generic professional images
        if (!selectedImages) {
            selectedImages = [
                'https://source.unsplash.com/800x600/?business,professional',
                'https://source.unsplash.com/800x600/?technology,innovation',
                'https://source.unsplash.com/800x600/?strategy,planning',
                'https://source.unsplash.com/800x600/?growth,success',
                'https://source.unsplash.com/800x600/?teamwork,collaboration',
                'https://source.unsplash.com/800x600/?presentation,meeting'
            ];
        }
        
        // Add variety with random parameters to avoid duplicate images
        return selectedImages.map((url, index) => ({
            url: `${url}&t=${Date.now()}&i=${index}`,
            alt: `Professional image related to ${topic}`,
            caption: `Visual content for ${topic} presentation`
        }));
    }
    
    generateConclusion(topic) {
        return `In conclusion, ${topic} represents a significant opportunity for growth and innovation. By understanding the key concepts and implementing best practices, organizations and individuals can harness its potential for positive impact.`;
    }
    
    async createSlides(content) {
        this.updateLoadingStatus('Creating slides...');
        
        const slides = [];
        
        // Title slide
        slides.push({
            type: 'title',
            title: content.title,
            subtitle: content.subtitle,
            image: content.images[0]?.url
        });
        
        // Table of contents
        slides.push({
            type: 'toc',
            title: 'Agenda',
            items: content.outline
        });
        
        // Content slides
        content.outline.forEach((item, index) => {
            slides.push({
                type: 'content',
                title: item,
                points: this.generateSlidePoints(item, content.keyPoints),
                image: content.images[index % content.images.length]?.url
            });
        });
        
        // Conclusion slide
        slides.push({
            type: 'conclusion',
            title: 'Conclusion',
            text: content.conclusion
        });
        
        // Thank you slide
        slides.push({
            type: 'thankyou',
            title: 'Thank You',
            subtitle: 'Questions & Discussion'
        });
        
        await this.delay(500);
        return slides;
    }
    
    generateSlidePoints(title, keyPoints) {
        // Generate specific content for each slide title
        const specificContent = this.generateSpecificContent(title, this.state.topic);
        return specificContent.length > 0 ? specificContent : this.fallbackSlidePoints(title, keyPoints);
    }
    
    generateSpecificContent(title, topic) {
        const lowerTitle = title.toLowerCase();
        const lowerTopic = topic.toLowerCase();
        
        // AI-specific content
        if (lowerTopic.includes('artificial intelligence') || lowerTopic.includes('ai')) {
            if (lowerTitle.includes('introduction')) {
                return [
                    'AI enables machines to perform tasks requiring human intelligence',
                    'Machine learning algorithms learn patterns from large datasets',
                    'Neural networks simulate brain-like information processing',
                    'AI applications span healthcare, finance, transport, and education'
                ];
            } else if (lowerTitle.includes('types')) {
                return [
                    'Narrow AI: Specialized systems for specific tasks (Siri, chess engines)',
                    'General AI: Human-level intelligence across all domains (theoretical)',
                    'Superintelligence: AI surpassing human cognitive abilities',
                    'Machine Learning: Algorithms that improve through experience'
                ];
            } else if (lowerTitle.includes('applications')) {
                return [
                    'Healthcare: Medical diagnosis, drug discovery, surgical robots',
                    'Finance: Algorithmic trading, fraud detection, risk assessment',
                    'Transportation: Autonomous vehicles, traffic optimization',
                    'Personal assistants: Voice recognition, natural language processing'
                ];
            } else if (lowerTitle.includes('benefits')) {
                return [
                    'Increased efficiency and productivity in repetitive tasks',
                    'Enhanced decision-making through data analysis',
                    'Improved accuracy in complex pattern recognition',
                    '24/7 operation without fatigue or human error'
                ];
            } else if (lowerTitle.includes('future')) {
                return [
                    'Quantum computing will exponentially increase AI capabilities',
                    'Brain-computer interfaces will merge human and artificial intelligence',
                    'AI will enable personalized medicine and education',
                    'Autonomous systems will transform manufacturing and logistics'
                ];
            } else if (lowerTitle.includes('ethical')) {
                return [
                    'AI bias can perpetuate discrimination in hiring and lending',
                    'Privacy concerns with extensive data collection and analysis',
                    'Job displacement requires retraining and social safety nets',
                    'Transparency in AI decision-making is crucial for trust'
                ];
            }
        }
        
        // Climate Change specific content
        if (lowerTopic.includes('climate change')) {
            if (lowerTitle.includes('understanding')) {
                return [
                    'Global average temperature has risen 1.1°C since pre-industrial times',
                    'Greenhouse gases trap heat in Earth\'s atmosphere',
                    'Carbon dioxide levels are highest in 3 million years',
                    'Climate feedback loops accelerate warming processes'
                ];
            } else if (lowerTitle.includes('causes')) {
                return [
                    'Fossil fuel combustion releases 36 billion tons of CO2 annually',
                    'Deforestation reduces Earth\'s carbon absorption capacity',
                    'Industrial agriculture contributes 24% of greenhouse gas emissions',
                    'Transportation accounts for 14% of global emissions'
                ];
            } else if (lowerTitle.includes('impact')) {
                return [
                    'Sea levels rising 3.3mm per year threatening coastal cities',
                    'Extreme weather events becoming more frequent and severe',
                    'Arctic ice loss accelerating at 13% per decade',
                    'Ocean acidification threatening marine ecosystems'
                ];
            } else if (lowerTitle.includes('mitigation')) {
                return [
                    'Renewable energy transition can reduce emissions by 65%',
                    'Carbon pricing mechanisms incentivize clean technologies',
                    'Energy efficiency improvements in buildings and transport',
                    'Forest restoration can sequester 1-5 billion tons CO2 annually'
                ];
            } else if (lowerTitle.includes('adaptation')) {
                return [
                    'Coastal defenses protecting against sea level rise',
                    'Drought-resistant crops ensuring food security',
                    'Early warning systems for extreme weather events',
                    'Green infrastructure managing urban heat and flooding'
                ];
            } else if (lowerTitle.includes('individual')) {
                return [
                    'Reduce energy consumption with LED lights and efficient appliances',
                    'Choose sustainable transportation: walking, cycling, public transit',
                    'Adopt plant-based diet to reduce agricultural emissions',
                    'Support renewable energy and sustainable businesses'
                ];
            }
        }
        
        // Renewable Energy content
        if (lowerTopic.includes('renewable energy')) {
            if (lowerTitle.includes('renewable') || lowerTitle.includes('introduction')) {
                return [
                    'Renewable energy sources naturally replenish over human timescales',
                    'Solar, wind, hydro, and geothermal provide clean electricity',
                    'Global renewable capacity reached 2,799 GW in 2020',
                    'Renewable energy costs have fallen 85% since 2010'
                ];
            } else if (lowerTitle.includes('solar')) {
                return [
                    'Solar photovoltaic cells convert sunlight directly to electricity',
                    'Solar power capacity grew 127 GW globally in 2020',
                    'Concentrated solar power stores energy for nighttime use',
                    'Solar costs now competitive with fossil fuels in many markets'
                ];
            } else if (lowerTitle.includes('wind')) {
                return [
                    'Wind turbines generate electricity from kinetic energy',
                    'Offshore wind farms access stronger, more consistent winds',
                    'Wind power capacity exceeded 733 GW worldwide in 2020',
                    'Modern turbines are 50x more powerful than 1980s models'
                ];
            }
        }
        
        // Digital Marketing content
        if (lowerTopic.includes('digital marketing')) {
            if (lowerTitle.includes('overview') || lowerTitle.includes('introduction')) {
                return [
                    'Digital marketing reaches 4.66 billion internet users worldwide',
                    'Data-driven targeting achieves 3x higher conversion rates',
                    'Mobile devices account for 55% of digital media consumption',
                    'Real-time analytics enable instant campaign optimization'
                ];
            } else if (lowerTitle.includes('social media')) {
                return [
                    'Facebook reaches 2.9 billion monthly active users globally',
                    'Video content generates 1200% more shares than text and images',
                    'Influencer marketing delivers $5.20 ROI for every dollar spent',
                    'Social commerce sales expected to reach $1.2 trillion by 2025'
                ];
            } else if (lowerTitle.includes('seo')) {
                return [
                    'Google processes over 8.5 billion searches daily',
                    'First page results receive 95% of all search traffic',
                    'Voice search optimization crucial for 50% of adults using voice daily',
                    'Local SEO drives 76% of mobile users to visit stores within 24 hours'
                ];
            }
        }
        
        return []; // Return empty if no specific content found
    }
    
    fallbackSlidePoints(title, keyPoints) {
        // Fallback to original logic if no specific content
        const points = [];
        const numPoints = Math.min(4, keyPoints.length);
        
        for (let i = 0; i < numPoints; i++) {
            const point = keyPoints[i % keyPoints.length];
            points.push(this.adaptPointToTitle(point, title));
        }
        
        return points;
    }
    
    adaptPointToTitle(point, title) {
        // Simple adaptation - in a real implementation, this would be more sophisticated
        const adaptations = {
            'introduction': `Understanding ${point.toLowerCase()}`,
            'overview': `Key aspects of ${point.toLowerCase()}`,
            'benefits': `How ${point.toLowerCase()} provides value`,
            'challenges': `Addressing ${point.toLowerCase()}`,
            'future': `The evolution of ${point.toLowerCase()}`
        };
        
        const lowercaseTitle = title.toLowerCase();
        for (const [key, adaptation] of Object.entries(adaptations)) {
            if (lowercaseTitle.includes(key)) {
                return adaptation;
            }
        }
        
        return point;
    }
    
    applyTheme() {
        const slideViewer = document.getElementById('slide-viewer');
        if (!slideViewer) return;
        
        // Remove existing theme classes
        slideViewer.className = 'slide-viewer';
        
        // Apply new theme
        slideViewer.classList.add(`theme-${this.state.template}`);
        slideViewer.classList.add(`color-${this.state.colorScheme}`);
        
        this.renderSlides();
    }
    
    renderSlides() {
        const slideViewer = document.getElementById('slide-viewer');
        if (!slideViewer) return;
        
        slideViewer.innerHTML = '';
        
        this.state.slides.forEach((slide, index) => {
            const slideElement = this.createSlideElement(slide, index);
            slideViewer.appendChild(slideElement);
        });
        
        this.updateSlideCounter();
        this.showSlide(0);
    }
    
    createSlideElement(slide, index) {
        const slideDiv = document.createElement('div');
        slideDiv.className = `slide slide-type-${slide.type}`;
        slideDiv.dataset.slideIndex = index;
        
        if (slide.image && slide.type === 'title') {
            slideDiv.style.backgroundImage = `url(${slide.image})`;
            slideDiv.style.backgroundSize = 'cover';
            slideDiv.style.backgroundPosition = 'center';
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'slide-content';
        
        switch (slide.type) {
            case 'title':
                contentDiv.innerHTML = `
                    <h1 class="slide-title">${slide.title}</h1>
                    <p class="slide-subtitle">${slide.subtitle}</p>
                `;
                break;
                
            case 'toc':
                const itemsList = slide.items.map((item, i) => 
                    `<li>${item}</li>`
                ).join('');
                contentDiv.innerHTML = `
                    <h2 class="slide-title">${slide.title}</h2>
                    <ol class="slide-list">${itemsList}</ol>
                `;
                break;
                
            case 'content':
                const pointsList = slide.points.map(point => 
                    `<li>${point}</li>`
                ).join('');
                const hasImage = slide.image && this.state.template !== 'minimal';
                
                if (hasImage) {
                    slideDiv.classList.add('slide-with-image');
                    contentDiv.innerHTML = `
                        <div>
                            <h2 class="slide-title">${slide.title}</h2>
                            <ul class="slide-list">${pointsList}</ul>
                        </div>
                        <div class="slide-image-container">
                            <img src="${slide.image}" alt="${slide.title}" class="slide-image" 
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                            <div class="slide-image-placeholder" style="display:none;">
                                📊 Visual Content
                            </div>
                        </div>
                    `;
                } else {
                    contentDiv.innerHTML = `
                        <h2 class="slide-title">${slide.title}</h2>
                        <ul class="slide-list">${pointsList}</ul>
                    `;
                }
                break;
                
            case 'conclusion':
                contentDiv.innerHTML = `
                    <h2 class="slide-title">${slide.title}</h2>
                    <p class="slide-text">${slide.text}</p>
                `;
                break;
                
            case 'thankyou':
                contentDiv.innerHTML = `
                    <h1 class="slide-title">${slide.title}</h1>
                    <p class="slide-subtitle">${slide.subtitle}</p>
                `;
                break;
        }
        
        slideDiv.appendChild(contentDiv);
        
        // Add background div for styling
        const backgroundDiv = document.createElement('div');
        backgroundDiv.className = 'slide-background';
        slideDiv.appendChild(backgroundDiv);
        
        return slideDiv;
    }
    
    showPreview() {
        const previewSection = document.getElementById('preview-section');
        if (previewSection) {
            previewSection.classList.remove('hidden');
            previewSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    hidePreview() {
        const previewSection = document.getElementById('preview-section');
        if (previewSection) {
            previewSection.classList.add('hidden');
        }
    }
    
    showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        this.state.currentSlide = index;
        this.updateSlideCounter();
        this.updateNavigationButtons();
    }
    
    previousSlide() {
        if (this.state.currentSlide > 0) {
            this.showSlide(this.state.currentSlide - 1);
        }
    }
    
    nextSlide() {
        if (this.state.currentSlide < this.state.slides.length - 1) {
            this.showSlide(this.state.currentSlide + 1);
        }
    }
    
    updateSlideCounter() {
        const counter = document.getElementById('slide-counter');
        if (counter && this.state.slides.length > 0) {
            counter.textContent = `${this.state.currentSlide + 1} / ${this.state.slides.length}`;
        }
    }
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        
        if (prevBtn) {
            prevBtn.disabled = this.state.currentSlide === 0;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.state.currentSlide === this.state.slides.length - 1;
        }
    }
    
    showLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        const generateBtn = document.getElementById('generate-btn');
        
        if (overlay) {
            overlay.classList.remove('hidden');
        }
        
        if (generateBtn) {
            generateBtn.classList.add('loading');
            generateBtn.disabled = true;
        }
    }
    
    hideLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        const generateBtn = document.getElementById('generate-btn');
        
        if (overlay) {
            overlay.classList.add('hidden');
        }
        
        if (generateBtn) {
            generateBtn.classList.remove('loading');
            generateBtn.disabled = false;
        }
    }
    
    updateLoadingStatus(message) {
        const statusElement = document.getElementById('loading-status');
        if (statusElement) {
            statusElement.textContent = message;
        }
    }
    
    showError(message) {
        // Simple error handling - could be enhanced with a modal or toast
        alert(message);
    }
    
    async downloadPPT() {
        try {
            this.trackEvent('download_ppt');
            // PPT generation will be handled by export-handler.js
            if (window.exportHandler) {
                await window.exportHandler.downloadPPT(this.state.slides, this.state);
            } else {
                this.showError('Export functionality not available');
            }
        } catch (error) {
            console.error('Error downloading PPT:', error);
            this.showError('Failed to download PowerPoint file');
        }
    }
    
    async downloadPDF() {
        try {
            this.trackEvent('download_pdf');
            if (window.exportHandler) {
                await window.exportHandler.downloadPDF(this.state.slides, this.state);
            } else {
                this.showError('Export functionality not available');
            }
        } catch (error) {
            console.error('Error downloading PDF:', error);
            this.showError('Failed to download PDF file');
        }
    }
    
    async downloadImages() {
        try {
            this.trackEvent('download_images');
            if (window.exportHandler) {
                await window.exportHandler.downloadImages(this.state.slides, this.state);
            } else {
                this.showError('Export functionality not available');
            }
        } catch (error) {
            console.error('Error downloading images:', error);
            this.showError('Failed to download images');
        }
    }
    
    saveToCache() {
        try {
            localStorage.setItem('ppt-maker-state', JSON.stringify({
                topic: this.state.topic,
                template: this.state.template,
                colorScheme: this.state.colorScheme,
                lastUsed: new Date().toISOString()
            }));
        } catch (error) {
            console.warn('Failed to save to cache:', error);
        }
    }
    
    loadFromCache() {
        try {
            const cached = localStorage.getItem('ppt-maker-state');
            if (cached) {
                const state = JSON.parse(cached);
                
                // Restore topic
                const topicInput = document.getElementById('topic-input');
                if (topicInput && state.topic) {
                    topicInput.value = state.topic;
                    this.state.topic = state.topic;
                    document.getElementById('char-count').textContent = state.topic.length;
                }
                
                // Restore template
                if (state.template) {
                    const templateCard = document.querySelector(`[data-template="${state.template}"]`);
                    if (templateCard) {
                        document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
                        templateCard.classList.add('active');
                        this.state.template = state.template;
                    }
                }
                
                // Restore color scheme
                if (state.colorScheme) {
                    const colorScheme = document.querySelector(`[data-colors="${state.colorScheme}"]`);
                    if (colorScheme) {
                        document.querySelectorAll('.color-scheme').forEach(s => s.classList.remove('active'));
                        colorScheme.classList.add('active');
                        this.state.colorScheme = state.colorScheme;
                    }
                }
                
                this.validateForm();
            }
        } catch (error) {
            console.warn('Failed to load from cache:', error);
        }
    }
    
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered successfully');
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }
    
    trackEvent(eventName, properties = {}) {
        // Analytics tracking - implement with your preferred analytics service
        console.log('Track event:', eventName, properties);
        
        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pptMaker = new PPTMakerApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && window.pptMaker) {
        // Re-validate form when user returns to tab
        window.pptMaker.validateForm();
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('App is online');
    // Could re-enable certain features that require internet
});

window.addEventListener('offline', () => {
    console.log('App is offline');
    // Could show offline message or disable internet-dependent features
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PPTMakerApp;
}
