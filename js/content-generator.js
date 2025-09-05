// Ultimate Automated PPT Generator with Real Images, Charts & Complete Content
class ContentGenerator {
    constructor() {
        this.apiEndpoints = {
            unsplash: 'https://api.unsplash.com/search/photos',
            charts: 'https://quickchart.io/chart',
            icons: 'https://api.iconify.design'
        };
        
        this.cache = new Map();
        this.unsplashKey = 'YOUR_UNSPLASH_KEY_HERE'; // Users can add their key
        this.templates = this.initializeTemplates();
        this.comprehensiveDatabase = this.initializeContentDatabase();
    }
    
    initializeTemplates() {
        return {
            business: {
                slideCount: 10,
                structure: ['title', 'overview', 'market-analysis', 'key-features', 'benefits', 'statistics', 'case-studies', 'implementation', 'future-trends', 'conclusion'],
                style: 'professional',
                colors: ['#2563eb', '#1e40af', '#3b82f6'],
                chartTypes: ['bar', 'line', 'pie', 'doughnut']
            },
            academic: {
                slideCount: 12,
                structure: ['title', 'abstract', 'introduction', 'literature-review', 'methodology', 'findings', 'analysis', 'discussion', 'implications', 'limitations', 'conclusion', 'references'],
                style: 'scholarly',
                colors: ['#374151', '#4b5563', '#6b7280'],
                chartTypes: ['scatter', 'line', 'bar', 'radar']
            },
            creative: {
                slideCount: 8,
                structure: ['title', 'vision', 'concept', 'design-elements', 'features', 'user-experience', 'impact', 'future'],
                style: 'innovative',
                colors: ['#7c3aed', '#6d28d9', '#8b5cf6'],
                chartTypes: ['doughnut', 'radar', 'bubble', 'polar']
            }
        };
    }
    
    initializeContentDatabase() {
        return {
            "artificial intelligence": {
                overview: "AI revolutionizes industries through machine learning, automation, and intelligent decision-making",
                keyPoints: [
                    "Machine learning algorithms process vast datasets to identify patterns",
                    "Natural language processing enables human-computer communication",
                    "Computer vision allows machines to interpret visual information",
                    "AI automation increases efficiency and reduces human error",
                    "Deep learning mimics neural networks for complex problem-solving"
                ],
                statistics: [
                    { label: "AI Market Size 2024", value: "$184B", growth: "+35%" },
                    { label: "Companies Using AI", value: "77%", growth: "+15%" },
                    { label: "AI Job Growth", value: "97%", growth: "+25%" },
                    { label: "Productivity Increase", value: "40%", growth: "+20%" }
                ],
                applications: [
                    "Healthcare diagnostics and drug discovery",
                    "Autonomous vehicles and transportation",
                    "Financial fraud detection and trading",
                    "Manufacturing quality control and robotics",
                    "Customer service chatbots and personalization"
                ],
                trends: [
                    "Generative AI transforming content creation",
                    "Edge AI bringing intelligence to devices",
                    "Ethical AI ensuring responsible development",
                    "Quantum AI promising exponential computing power"
                ],
                challenges: [
                    "Data privacy and security concerns",
                    "Algorithm bias and fairness issues",
                    "Job displacement and workforce adaptation",
                    "Regulatory compliance and governance"
                ],
                futureOutlook: "AI will become ubiquitous, driving innovation across all sectors with human-AI collaboration becoming the norm"
            },
            
            "climate change": {
                overview: "Climate change represents the most pressing environmental challenge, requiring urgent global action and innovative solutions",
                keyPoints: [
                    "Global temperature has risen 1.1°C since pre-industrial times",
                    "Greenhouse gas concentrations at highest levels in 3 million years",
                    "Sea levels rising 3.3mm per year, threatening coastal communities",
                    "Extreme weather events increasing in frequency and intensity",
                    "Arctic ice declining at 13% per decade, accelerating warming"
                ],
                statistics: [
                    { label: "CO2 Concentration", value: "421ppm", growth: "+2.4ppm/year" },
                    { label: "Annual Emissions", value: "36.8Gt", growth: "+1.1%" },
                    { label: "Renewable Energy Growth", value: "12%", growth: "+0.8%" },
                    { label: "Climate Investment Needed", value: "$4.5T", growth: "+6%" }
                ],
                applications: [
                    "Renewable energy transition and grid modernization",
                    "Carbon capture and storage technologies",
                    "Sustainable agriculture and food systems",
                    "Green transportation and electric mobility",
                    "Climate adaptation and resilient infrastructure"
                ],
                trends: [
                    "Net-zero commitments from major corporations",
                    "Green hydrogen emerging as clean fuel alternative",
                    "Nature-based solutions gaining investment traction",
                    "Climate tech startups attracting record funding"
                ],
                challenges: [
                    "Political resistance to environmental policies",
                    "High costs of green technology adoption",
                    "Developing country capacity constraints",
                    "Fossil fuel industry transition challenges"
                ],
                futureOutlook: "Achieving 1.5°C target requires immediate action, with clean technology costs falling and climate solutions scaling rapidly"
            },

            "renewable energy": {
                overview: "Renewable energy sources are transforming the global energy landscape, offering sustainable alternatives to fossil fuels",
                keyPoints: [
                    "Solar and wind power costs dropped 85% and 70% respectively since 2010",
                    "Renewable capacity additions reached record 295 GW globally in 2022",
                    "Storage technology advances solving intermittency challenges",
                    "Smart grid integration enabling efficient energy distribution",
                    "Green jobs in renewable sector growing 5x faster than overall economy"
                ],
                statistics: [
                    { label: "Global Renewable Capacity", value: "3,372 GW", growth: "+8.8%" },
                    { label: "Solar PV Additions", value: "191 GW", growth: "+22%" },
                    { label: "Wind Power Growth", value: "77 GW", growth: "+9%" },
                    { label: "Investment Volume", value: "$1.8T", growth: "+8%" }
                ],
                applications: [
                    "Utility-scale solar and wind farms",
                    "Distributed rooftop solar systems",
                    "Offshore wind energy platforms",
                    "Hydroelectric and pumped storage",
                    "Geothermal and biomass power generation"
                ],
                trends: [
                    "Floating solar panels maximizing water surface usage",
                    "Green hydrogen production from excess renewable energy",
                    "Agrovoltaics combining solar panels with agriculture",
                    "Microgrids enhancing energy security and resilience"
                ],
                challenges: [
                    "Grid integration and stability management",
                    "Energy storage cost and technology limitations",
                    "Land use and environmental impact concerns",
                    "Policy and regulatory framework inconsistencies"
                ],
                futureOutlook: "Renewables expected to provide 80% of global electricity by 2050, with continued cost reductions and efficiency improvements"
            },

            "digital marketing": {
                overview: "Digital marketing leverages online channels and data analytics to reach target audiences with personalized, measurable campaigns",
                keyPoints: [
                    "Social media platforms reach 4.8 billion users globally",
                    "Mobile devices account for 55% of web traffic",
                    "Email marketing delivers $42 ROI for every $1 spent",
                    "Video content generates 1200% more shares than text",
                    "Personalization increases conversion rates by 10-15%"
                ],
                statistics: [
                    { label: "Digital Ad Spending", value: "$701B", growth: "+8.2%" },
                    { label: "Mobile Ad Share", value: "68%", growth: "+12%" },
                    { label: "E-commerce Growth", value: "14.3%", growth: "+2.1%" },
                    { label: "Video Marketing ROI", value: "87%", growth: "+5%" }
                ],
                applications: [
                    "Search engine optimization and marketing",
                    "Social media advertising and community building",
                    "Content marketing and thought leadership",
                    "Email automation and customer nurturing",
                    "Influencer partnerships and brand collaborations"
                ],
                trends: [
                    "AI-powered personalization and predictive analytics",
                    "Voice search optimization for smart speakers",
                    "Interactive content and immersive experiences",
                    "Privacy-first marketing with cookieless solutions"
                ],
                challenges: [
                    "Data privacy regulations and compliance",
                    "Ad blocking and banner blindness",
                    "Platform algorithm changes affecting reach",
                    "Attribution modeling across multiple touchpoints"
                ],
                futureOutlook: "Digital marketing evolving toward hyper-personalization, omnichannel experiences, and AI-driven automation"
            },

            "blockchain technology": {
                overview: "Blockchain creates immutable, decentralized ledgers that enable secure, transparent transactions without intermediaries",
                keyPoints: [
                    "Distributed ledger technology eliminates single points of failure",
                    "Cryptographic security ensures data integrity and authenticity",
                    "Smart contracts automate agreement execution and enforcement",
                    "Consensus mechanisms validate transactions across network nodes",
                    "Tokenization enables fractional ownership and new business models"
                ],
                statistics: [
                    { label: "Blockchain Market Size", value: "$67.3B", growth: "+68.4%" },
                    { label: "Enterprise Adoption", value: "81%", growth: "+23%" },
                    { label: "DeFi Total Value", value: "$45B", growth: "+156%" },
                    { label: "NFT Market Value", value: "$25B", growth: "+21,350%" }
                ],
                applications: [
                    "Cryptocurrency and digital payment systems",
                    "Supply chain transparency and traceability",
                    "Identity verification and credential management",
                    "Real estate tokenization and fractional ownership",
                    "Healthcare data security and interoperability"
                ],
                trends: [
                    "Central bank digital currencies (CBDCs) development",
                    "Web3 and decentralized internet infrastructure",
                    "Carbon credit trading on blockchain platforms",
                    "Blockchain-as-a-Service (BaaS) platforms emerging"
                ],
                challenges: [
                    "Energy consumption and environmental impact",
                    "Scalability limitations and transaction speeds",
                    "Regulatory uncertainty and compliance requirements",
                    "Technical complexity and user adoption barriers"
                ],
                futureOutlook: "Blockchain technology maturing with enterprise adoption, regulatory clarity, and sustainable consensus mechanisms"
            },

            "cybersecurity": {
                overview: "Cybersecurity protects digital systems, networks, and data from evolving threats through comprehensive defense strategies",
                keyPoints: [
                    "Cyberattacks increased 38% year-over-year affecting all industries",
                    "Ransomware damages expected to reach $265 billion by 2031",
                    "Zero-trust security models assuming no implicit trust",
                    "AI and machine learning enhancing threat detection capabilities",
                    "Human error remains the leading cause of security breaches"
                ],
                statistics: [
                    { label: "Global Cybersecurity Spending", value: "$172B", growth: "+12.1%" },
                    { label: "Data Breach Average Cost", value: "$4.45M", growth: "+15.3%" },
                    { label: "Unfilled Security Jobs", value: "3.5M", growth: "+23%" },
                    { label: "Remote Work Security Incidents", value: "+40%", growth: "+18%" }
                ],
                applications: [
                    "Network security and intrusion detection systems",
                    "Identity and access management solutions",
                    "Endpoint protection and device security",
                    "Cloud security and data encryption",
                    "Security awareness training and education"
                ],
                trends: [
                    "Extended detection and response (XDR) platforms",
                    "Quantum-resistant cryptography development",
                    "Security orchestration and automated response",
                    "Privacy-enhancing technologies and frameworks"
                ],
                challenges: [
                    "Sophisticated AI-powered cyberattacks",
                    "IoT device security and vulnerability management",
                    "Skills shortage and cybersecurity talent gap",
                    "Balancing security with user experience"
                ],
                futureOutlook: "Cybersecurity becoming integral to business strategy with AI-driven defense and quantum-safe solutions"
            }
        };
    }

    async generateContent(topic, template = 'business') {
        const cacheKey = `${topic}-${template}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            // Get comprehensive content for the topic
            const content = await this.getTopicContent(topic, template);
            
            // Generate real images for each slide
            const images = await this.generateImages(topic, content.slides.length);
            
            // Create charts and visual elements
            const charts = this.generateCharts(topic, content.statistics);
            
            // Combine all elements into complete presentation
            const presentation = {
                title: content.title,
                subtitle: content.subtitle,
                slides: content.slides.map((slide, index) => ({
                    ...slide,
                    image: images[index] || this.getFallbackImage(slide.title),
                    chart: charts[index] || null,
                    visualElements: this.generateVisualElements(slide, template)
                })),
                metadata: {
                    topic,
                    template,
                    slideCount: content.slides.length,
                    generatedAt: new Date().toISOString()
                }
            };

            this.cache.set(cacheKey, presentation);
            return presentation;

        } catch (error) {
            console.error('Content generation error:', error);
            return this.generateFallbackPresentation(topic, template);
        }
    }

    async getTopicContent(topic, template) {
        const normalizedTopic = topic.toLowerCase();
        const templateConfig = this.templates[template];
        
        // Check if we have comprehensive data for this topic
        const topicData = this.findTopicData(normalizedTopic);
        
        if (topicData) {
            return this.buildPresentationFromDatabase(topic, topicData, templateConfig);
        } else {
            return this.generateGenericContent(topic, templateConfig);
        }
    }

    findTopicData(topic) {
        // Find exact or partial matches in our database
        for (const [key, data] of Object.entries(this.comprehensiveDatabase)) {
            if (topic.includes(key) || key.includes(topic)) {
                return data;
            }
        }
        return null;
    }

    buildPresentationFromDatabase(topic, data, templateConfig) {
        const slides = [];
        
        // Title slide
        slides.push({
            type: 'title',
            title: this.formatTitle(topic),
            subtitle: data.overview,
            layout: 'hero'
        });

        // Overview slide
        slides.push({
            type: 'overview',
            title: `Understanding ${topic}`,
            content: data.keyPoints.slice(0, 4),
            layout: 'content-with-image'
        });

        // Statistics slide with chart
        slides.push({
            type: 'statistics',
            title: 'Key Statistics & Market Data',
            content: data.statistics.map(stat => 
                `${stat.label}: ${stat.value} (${stat.growth} growth)`
            ),
            chartData: data.statistics,
            layout: 'chart-focus'
        });

        // Applications slide
        slides.push({
            type: 'applications',
            title: 'Real-World Applications',
            content: data.applications,
            layout: 'grid-layout'
        });

        // Trends slide
        slides.push({
            type: 'trends',
            title: 'Future Trends & Developments',
            content: data.trends,
            layout: 'timeline'
        });

        // Challenges slide
        slides.push({
            type: 'challenges',
            title: 'Challenges & Considerations',
            content: data.challenges,
            layout: 'problem-solution'
        });

        // Implementation slide
        slides.push({
            type: 'implementation',
            title: 'Implementation Strategy',
            content: [
                "Assess current capabilities and infrastructure needs",
                "Develop phased implementation roadmap",
                "Invest in training and skill development",
                "Monitor progress and adjust strategies"
            ],
            layout: 'process-flow'
        });

        // Future outlook slide
        slides.push({
            type: 'conclusion',
            title: 'Future Outlook & Opportunities',
            content: [data.futureOutlook],
            layout: 'conclusion'
        });

        return {
            title: this.formatTitle(topic),
            subtitle: `Comprehensive Analysis & Strategic Insights`,
            slides,
            statistics: data.statistics
        };
    }

    generateGenericContent(topic, templateConfig) {
        const slides = [];
        
        templateConfig.structure.forEach((slideType, index) => {
            slides.push({
                type: slideType,
                title: this.generateSlideTitle(slideType, topic),
                content: this.generateSlideContent(slideType, topic),
                layout: this.selectLayout(slideType, index)
            });
        });

        return {
            title: this.formatTitle(topic),
            subtitle: 'Professional Analysis & Insights',
            slides
        };
    }

    generateSlideTitle(type, topic) {
        const titleTemplates = {
            'overview': `Understanding ${topic}`,
            'market-analysis': `${topic} Market Analysis`,
            'key-features': `Key Features of ${topic}`,
            'benefits': `Benefits & Advantages of ${topic}`,
            'statistics': `${topic} Statistics & Data`,
            'case-studies': `${topic} Case Studies`,
            'implementation': `Implementing ${topic} Solutions`,
            'future-trends': `Future of ${topic}`,
            'conclusion': `${topic}: Key Takeaways`
        };
        
        return titleTemplates[type] || `${topic} - ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    }

    generateSlideContent(type, topic) {
        const contentTemplates = {
            'overview': [
                `${topic} represents a significant opportunity for innovation`,
                `Key components include advanced technologies and methodologies`,
                `Strategic implementation drives competitive advantages`,
                `Market adoption continues to accelerate globally`
            ],
            'benefits': [
                `Increased efficiency and productivity gains`,
                `Cost reduction through optimized processes`,
                `Enhanced user experience and satisfaction`,
                `Improved decision-making through data insights`
            ],
            'implementation': [
                `Assess current infrastructure and capabilities`,
                `Develop comprehensive implementation strategy`,
                `Train teams and build necessary expertise`,
                `Monitor progress and optimize continuously`
            ]
        };
        
        return contentTemplates[type] || [
            `${topic} offers significant value proposition`,
            `Strategic approach ensures successful implementation`,
            `Best practices drive optimal outcomes`,
            `Continuous innovation maintains competitive edge`
        ];
    }

    async generateImages(topic, slideCount) {
        const images = [];
        const searchTerms = this.generateImageSearchTerms(topic, slideCount);
        
        for (const term of searchTerms) {
            try {
                const image = await this.fetchUnsplashImage(term);
                images.push(image);
            } catch (error) {
                images.push(this.getFallbackImage(term));
            }
        }
        
        return images;
    }

    generateImageSearchTerms(topic, count) {
        const baseTerms = [topic, `${topic} technology`, `${topic} business`, `${topic} innovation`];
        const additionalTerms = [
            'data visualization', 'team collaboration', 'future technology',
            'business strategy', 'innovation concept', 'digital transformation'
        ];
        
        return [...baseTerms, ...additionalTerms].slice(0, count);
    }

    async fetchUnsplashImage(searchTerm) {
        if (!this.unsplashKey || this.unsplashKey === 'YOUR_UNSPLASH_KEY_HERE') {
            return this.getFallbackImage(searchTerm);
        }

        try {
            const response = await fetch(`${this.apiEndpoints.unsplash}?query=${encodeURIComponent(searchTerm)}&per_page=1&orientation=landscape`, {
                headers: {
                    'Authorization': `Client-ID ${this.unsplashKey}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    const photo = data.results[0];
                    return {
                        url: photo.urls.regular,
                        alt: photo.alt_description || searchTerm,
                        photographer: photo.user.name,
                        photographerUrl: photo.user.links.html
                    };
                }
            }
        } catch (error) {
            console.warn('Failed to fetch Unsplash image:', error);
        }
        
        return this.getFallbackImage(searchTerm);
    }

    getFallbackImage(term) {
        const colors = ['4299e1', '10b981', '8b5cf6', 'f59e0b', 'ef4444'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return {
            url: `https://via.placeholder.com/1200x675/${color}/ffffff?text=${encodeURIComponent(term)}`,
            alt: `Visual representation of ${term}`,
            photographer: 'Generated',
            photographerUrl: '#'
        };
    }

    generateCharts(topic, statistics) {
        if (!statistics || statistics.length === 0) return [];
        
        const charts = [];
        
        // Bar chart for statistics
        const barChart = this.createBarChart(statistics, 'Market Statistics');
        charts.push(barChart);
        
        // Pie chart for distribution
        const pieChart = this.createPieChart(statistics, 'Distribution Analysis');
        charts.push(pieChart);
        
        return charts;
    }

    createBarChart(data, title) {
        const chartConfig = {
            type: 'bar',
            data: {
                labels: data.map(item => item.label),
                datasets: [{
                    label: 'Values',
                    data: data.map(item => parseFloat(item.value.replace(/[^0-9.]/g, ''))),
                    backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: title
                    }
                }
            }
        };
        
        return {
            type: 'chart',
            config: chartConfig,
            url: `${this.apiEndpoints.charts}?c=${encodeURIComponent(JSON.stringify(chartConfig))}`
        };
    }

    createPieChart(data, title) {
        const chartConfig = {
            type: 'pie',
            data: {
                labels: data.map(item => item.label),
                datasets: [{
                    data: data.map(item => parseFloat(item.value.replace(/[^0-9.]/g, ''))),
                    backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: title
                    }
                }
            }
        };
        
        return {
            type: 'chart',
            config: chartConfig,
            url: `${this.apiEndpoints.charts}?c=${encodeURIComponent(JSON.stringify(chartConfig))}`
        };
    }

    generateVisualElements(slide, template) {
        return {
            icons: this.selectIcons(slide.type),
            animations: this.selectAnimations(template),
            colorScheme: this.templates[template].colors
        };
    }

    selectIcons(slideType) {
        const iconMap = {
            'title': '🎯',
            'overview': '📊',
            'statistics': '📈',
            'applications': '⚡',
            'trends': '🚀',
            'challenges': '⚠️',
            'implementation': '🔧',
            'conclusion': '✅'
        };
        
        return iconMap[slideType] || '💡';
    }

    selectAnimations(template) {
        const animationStyles = {
            'business': ['fade', 'slideIn'],
            'academic': ['fade', 'slideUp'],
            'creative': ['bounce', 'slideIn', 'zoomIn']
        };
        
        return animationStyles[template] || ['fade'];
    }

    selectLayout(slideType, index) {
        const layouts = {
            'title': 'hero',
            'overview': 'content-with-image',
            'statistics': 'chart-focus',
            'applications': 'grid-layout',
            'trends': 'timeline',
            'challenges': 'problem-solution',
            'implementation': 'process-flow',
            'conclusion': 'conclusion'
        };
        
        return layouts[slideType] || 'content-with-image';
    }

    formatTitle(topic) {
        return topic.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    generateFallbackPresentation(topic, template) {
        return {
            title: this.formatTitle(topic),
            subtitle: 'Professional Presentation',
            slides: [
                {
                    type: 'title',
                    title: this.formatTitle(topic),
                    subtitle: 'Comprehensive Analysis',
                    layout: 'hero',
                    image: this.getFallbackImage(topic)
                },
                {
                    type: 'overview',
                    title: `Understanding ${topic}`,
                    content: [
                        `${topic} represents significant opportunities`,
                        `Key components drive innovation`,
                        `Strategic implementation ensures success`,
                        `Future developments show promise`
                    ],
                    layout: 'content-with-image',
                    image: this.getFallbackImage(`${topic} overview`)
                }
            ],
            metadata: {
                topic,
                template,
                slideCount: 2,
                generatedAt: new Date().toISOString()
            }
        };
    }

    clearCache() {
        this.cache.clear();
    }

    getCacheSize() {
        return this.cache.size;
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.ContentGenerator = ContentGenerator;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentGenerator;
}
