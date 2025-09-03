// Advanced Content Generator for Professional PPT Maker
class ContentGenerator {
    constructor() {
        this.apiEndpoints = {
            wikipedia: 'https://en.wikipedia.org/api/rest_v1/page/summary/',
            unsplash: 'https://api.unsplash.com/search/photos',
            openAI: '/api/openai', // Proxy endpoint if using OpenAI
        };
        
        this.cache = new Map();
        this.templates = this.initializeTemplates();
    }
    
    initializeTemplates() {
        return {
            business: {
                slideCount: 8,
                structure: ['title', 'agenda', 'overview', 'analysis', 'strategy', 'implementation', 'results', 'conclusion'],
                style: 'professional',
                colors: ['#2563eb', '#1e40af', '#3b82f6']
            },
            academic: {
                slideCount: 10,
                structure: ['title', 'abstract', 'introduction', 'methodology', 'findings', 'analysis', 'discussion', 'limitations', 'conclusion', 'references'],
                style: 'scholarly',
                colors: ['#374151', '#4b5563', '#6b7280']
            },
            creative: {
                slideCount: 7,
                structure: ['title', 'vision', 'concept', 'design', 'features', 'impact', 'future'],
                style: 'innovative',
                colors: ['#7c3aed', '#6d28d9', '#8b5cf6']
            },
            minimal: {
                slideCount: 6,
                structure: ['title', 'problem', 'solution', 'benefits', 'implementation', 'summary'],
                style: 'clean',
                colors: ['#000000', '#404040', '#808080']
            }
        };
    }
    
    async generateContent(topic, template = 'business') {
        const cacheKey = `${topic}-${template}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        try {
            // Research the topic
            const research = await this.researchTopic(topic);
            
            // Generate structured content
            const content = await this.createStructuredContent(topic, research, template);
            
            // Cache the result
            this.cache.set(cacheKey, content);
            
            return content;
        } catch (error) {
            console.error('Content generation failed:', error);
            return this.generateFallbackContent(topic, template);
        }
    }
    
    async researchTopic(topic) {
        const research = {
            summary: '',
            keyFacts: [],
            relatedTerms: [],
            statistics: [],
            trends: [],
            challenges: [],
            opportunities: []
        };
        
        try {
            // Try Wikipedia API for basic information
            const wikipediaData = await this.fetchWikipediaData(topic);
            if (wikipediaData) {
                research.summary = wikipediaData.extract;
                research.keyFacts = this.extractKeyFacts(wikipediaData.extract);
            }
        } catch (error) {
            console.warn('Wikipedia fetch failed:', error);
        }
        
        // Generate additional content based on topic analysis
        research.relatedTerms = this.generateRelatedTerms(topic);
        research.statistics = this.generateStatistics(topic);
        research.trends = this.generateTrends(topic);
        research.challenges = this.generateChallenges(topic);
        research.opportunities = this.generateOpportunities(topic);
        
        return research;
    }
    
    async fetchWikipediaData(topic) {
        try {
            const response = await fetch(`${this.apiEndpoints.wikipedia}${encodeURIComponent(topic)}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.warn('Wikipedia API error:', error);
        }
        return null;
    }
    
    extractKeyFacts(text) {
        if (!text) return [];
        
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
        return sentences.slice(0, 5).map(s => s.trim());
    }
    
    generateRelatedTerms(topic) {
        const termMappings = {
            'artificial intelligence': ['machine learning', 'neural networks', 'deep learning', 'automation', 'robotics'],
            'renewable energy': ['solar power', 'wind energy', 'sustainability', 'clean energy', 'carbon neutral'],
            'digital marketing': ['SEO', 'social media', 'content marketing', 'analytics', 'conversion optimization'],
            'climate change': ['global warming', 'greenhouse gases', 'carbon emissions', 'sustainability', 'environmental impact'],
            'blockchain': ['cryptocurrency', 'decentralization', 'smart contracts', 'digital ledger', 'consensus'],
            'cybersecurity': ['data protection', 'network security', 'encryption', 'threat detection', 'risk management']
        };
        
        const lowerTopic = topic.toLowerCase();
        for (const [key, terms] of Object.entries(termMappings)) {
            if (lowerTopic.includes(key) || key.includes(lowerTopic)) {
                return terms;
            }
        }
        
        // Generate generic terms
        return ['innovation', 'technology', 'development', 'implementation', 'best practices'];
    }
    
    generateStatistics(topic) {
        const statisticTemplates = {
            'artificial intelligence': [
                'AI market expected to reach $733.7 billion by 2027',
                '37% of organizations have implemented AI in some form',
                '85% of businesses plan to invest in AI by 2025',
                'AI can improve productivity by up to 40%'
            ],
            'renewable energy': [
                'Renewable energy accounts for 26% of global electricity generation',
                'Solar power costs have decreased by 85% since 2010',
                'Wind energy capacity increased by 53 GW in 2020',
                '11 million people work in renewable energy worldwide'
            ],
            'digital marketing': [
                'Digital advertising spending reached $378 billion in 2020',
                '4.6 billion people use social media globally',
                'Email marketing has an average ROI of $42 for every $1 spent',
                '93% of online experiences begin with a search engine'
            ]
        };
        
        const lowerTopic = topic.toLowerCase();
        for (const [key, stats] of Object.entries(statisticTemplates)) {
            if (lowerTopic.includes(key) || key.includes(lowerTopic)) {
                return stats;
            }
        }
        
        return [
            'Industry showing strong growth potential',
            'Significant investment opportunities available',
            'Growing adoption across multiple sectors',
            'Positive impact on operational efficiency'
        ];
    }
    
    generateTrends(topic) {
        const trendTemplates = {
            'artificial intelligence': [
                'Increased adoption of AI in healthcare',
                'Growth in conversational AI and chatbots',
                'Edge AI becoming more prevalent',
                'Focus on explainable AI systems'
            ],
            'renewable energy': [
                'Declining costs of solar and wind power',
                'Growth in energy storage solutions',
                'Increased corporate renewable energy commitments',
                'Development of green hydrogen technologies'
            ],
            'digital marketing': [
                'Rise of video content marketing',
                'Increased focus on personalization',
                'Growth in influencer marketing',
                'Privacy-first marketing strategies'
            ]
        };
        
        const lowerTopic = topic.toLowerCase();
        for (const [key, trends] of Object.entries(trendTemplates)) {
            if (lowerTopic.includes(key) || key.includes(lowerTopic)) {
                return trends;
            }
        }
        
        return [
            'Emerging technologies driving innovation',
            'Increased focus on sustainability',
            'Digital transformation accelerating',
            'Data-driven decision making'
        ];
    }
    
    generateChallenges(topic) {
        const challengeTemplates = {
            'artificial intelligence': [
                'Data privacy and security concerns',
                'Need for skilled AI professionals',
                'Ethical considerations and bias',
                'Integration with existing systems'
            ],
            'renewable energy': [
                'Grid integration and stability',
                'Energy storage limitations',
                'Initial investment costs',
                'Policy and regulatory barriers'
            ],
            'digital marketing': [
                'Increasing competition online',
                'Privacy regulations and compliance',
                'Ad fatigue and banner blindness',
                'Measuring true ROI and attribution'
            ]
        };
        
        const lowerTopic = topic.toLowerCase();
        for (const [key, challenges] of Object.entries(challengeTemplates)) {
            if (lowerTopic.includes(key) || key.includes(lowerTopic)) {
                return challenges;
            }
        }
        
        return [
            'Implementation complexity',
            'Cost considerations',
            'Change management',
            'Skill development requirements'
        ];
    }
    
    generateOpportunities(topic) {
        const opportunityTemplates = {
            'artificial intelligence': [
                'Automation of repetitive tasks',
                'Enhanced decision-making capabilities',
                'New product and service innovations',
                'Improved customer experiences'
            ],
            'renewable energy': [
                'Job creation in clean energy sector',
                'Energy independence and security',
                'Environmental sustainability',
                'Long-term cost savings'
            ],
            'digital marketing': [
                'Precise audience targeting',
                'Real-time campaign optimization',
                'Global market reach',
                'Cost-effective customer acquisition'
            ]
        };
        
        const lowerTopic = topic.toLowerCase();
        for (const [key, opportunities] of Object.entries(opportunityTemplates)) {
            if (lowerTopic.includes(key) || key.includes(lowerTopic)) {
                return opportunities;
            }
        }
        
        return [
            'Innovation and competitive advantage',
            'Efficiency improvements',
            'Market expansion opportunities',
            'Strategic partnerships'
        ];
    }
    
    async createStructuredContent(topic, research, template) {
        const templateConfig = this.templates[template];
        const content = {
            title: this.formatTitle(topic),
            subtitle: this.generateSubtitle(topic, template),
            slides: [],
            template: template,
            research: research
        };
        
        // Generate slides based on template structure
        for (let i = 0; i < templateConfig.structure.length; i++) {
            const slideType = templateConfig.structure[i];
            const slide = await this.generateSlide(slideType, topic, research, i, templateConfig);
            content.slides.push(slide);
        }
        
        return content;
    }
    
    formatTitle(topic) {
        return topic.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    
    generateSubtitle(topic, template) {
        const subtitleTemplates = {
            business: `Strategic Overview and Business Impact of ${this.formatTitle(topic)}`,
            academic: `A Comprehensive Analysis of ${this.formatTitle(topic)}`,
            creative: `Innovative Approaches to ${this.formatTitle(topic)}`,
            minimal: `Essential Insights on ${this.formatTitle(topic)}`
        };
        
        return subtitleTemplates[template] || `An Overview of ${this.formatTitle(topic)}`;
    }
    
    async generateSlide(slideType, topic, research, index, templateConfig) {
        const slide = {
            type: slideType,
            index: index,
            title: '',
            content: [],
            notes: ''
        };
        
        switch (slideType) {
            case 'title':
                slide.title = this.formatTitle(topic);
                slide.subtitle = this.generateSubtitle(topic, templateConfig.style);
                slide.image = await this.getRelevantImage(topic);
                break;
                
            case 'agenda':
            case 'abstract':
                slide.title = slideType === 'agenda' ? 'Agenda' : 'Abstract';
                slide.content = templateConfig.structure.slice(2, -1).map(item => 
                    this.formatSlideTitle(item, topic)
                );
                break;
                
            case 'overview':
            case 'introduction':
                slide.title = slideType === 'overview' ? 'Overview' : 'Introduction';
                slide.content = [
                    research.summary || `${topic} represents a significant area of development and innovation.`,
                    ...research.keyFacts.slice(0, 3)
                ];
                break;
                
            case 'analysis':
            case 'methodology':
                slide.title = slideType === 'analysis' ? 'Current Analysis' : 'Methodology';
                slide.content = [
                    'Key market trends and developments',
                    ...research.trends.slice(0, 3)
                ];
                break;
                
            case 'strategy':
            case 'findings':
                slide.title = slideType === 'strategy' ? 'Strategic Approach' : 'Key Findings';
                slide.content = research.opportunities.slice(0, 4);
                break;
                
            case 'implementation':
            case 'discussion':
                slide.title = slideType === 'implementation' ? 'Implementation' : 'Discussion';
                slide.content = [
                    'Best practices for successful implementation',
                    ...research.challenges.slice(0, 3).map(challenge => 
                        `Addressing: ${challenge.toLowerCase()}`
                    )
                ];
                break;
                
            case 'results':
            case 'limitations':
                slide.title = slideType === 'results' ? 'Expected Results' : 'Limitations';
                slide.content = slideType === 'results' ? 
                    research.statistics.slice(0, 4) : 
                    research.challenges.slice(0, 4);
                break;
                
            case 'conclusion':
            case 'summary':
                slide.title = slideType === 'conclusion' ? 'Conclusion' : 'Summary';
                slide.content = [
                    `${topic} offers significant opportunities for growth and innovation`,
                    'Key success factors have been identified',
                    'Implementation strategy provides clear roadmap',
                    'Continued monitoring and adaptation will be essential'
                ];
                break;
                
            case 'references':
                slide.title = 'References';
                slide.content = [
                    'Industry research and market analysis',
                    'Academic publications and studies',
                    'Expert interviews and insights',
                    'Government and regulatory sources'
                ];
                break;
                
            case 'vision':
                slide.title = 'Vision';
                slide.content = [
                    `Transforming how we approach ${topic.toLowerCase()}`,
                    'Creating innovative solutions for complex challenges',
                    'Building sustainable and scalable systems',
                    'Empowering stakeholders through technology'
                ];
                break;
                
            case 'concept':
                slide.title = 'Core Concept';
                slide.content = [
                    ...research.relatedTerms.slice(0, 4).map(term => 
                        `${term}: Essential component of modern ${topic.toLowerCase()}`
                    )
                ];
                break;
                
            case 'design':
                slide.title = 'Design Principles';
                slide.content = [
                    'User-centered approach',
                    'Scalable architecture',
                    'Security and reliability',
                    'Performance optimization'
                ];
                break;
                
            case 'features':
                slide.title = 'Key Features';
                slide.content = research.opportunities.slice(0, 4);
                break;
                
            case 'impact':
                slide.title = 'Expected Impact';
                slide.content = research.statistics.slice(0, 4);
                break;
                
            case 'future':
                slide.title = 'Future Outlook';
                slide.content = research.trends.slice(0, 4);
                break;
                
            case 'problem':
                slide.title = 'Problem Statement';
                slide.content = research.challenges.slice(0, 4);
                break;
                
            case 'solution':
                slide.title = 'Proposed Solution';
                slide.content = research.opportunities.slice(0, 4);
                break;
                
            case 'benefits':
                slide.title = 'Key Benefits';
                slide.content = [
                    'Improved efficiency and productivity',
                    'Cost reduction and optimization',
                    'Enhanced user experience',
                    'Competitive advantage'
                ];
                break;
                
            default:
                slide.title = this.formatSlideTitle(slideType, topic);
                slide.content = [`Content for ${slideType} related to ${topic}`];
        }
        
        // Add speaker notes
        slide.notes = this.generateSpeakerNotes(slide, topic);
        
        return slide;
    }
    
    formatSlideTitle(slideType, topic) {
        const titleMappings = {
            'overview': `${this.formatTitle(topic)} Overview`,
            'analysis': `Market Analysis`,
            'strategy': `Strategic Approach`,
            'implementation': `Implementation Plan`,
            'results': `Expected Outcomes`,
            'conclusion': `Key Takeaways`,
            'vision': `Future Vision`,
            'concept': `Core Concepts`,
            'design': `Design Framework`,
            'features': `Key Features`,
            'impact': `Impact Assessment`,
            'future': `Future Roadmap`,
            'problem': `Current Challenges`,
            'solution': `Proposed Solutions`,
            'benefits': `Value Proposition`
        };
        
        return titleMappings[slideType] || slideType.charAt(0).toUpperCase() + slideType.slice(1);
    }
    
    generateSpeakerNotes(slide, topic) {
        const notes = [
            `This slide covers ${slide.title.toLowerCase()} for ${topic}.`,
            'Key points to emphasize:',
            ...slide.content.slice(0, 2).map(point => `- ${point}`),
            'Be prepared to answer questions about implementation and next steps.'
        ];
        
        return notes.join('\n');
    }
    
    async getRelevantImage(topic) {
        // In production, this would use Unsplash API or similar
        const imageKeywords = {
            'artificial intelligence': 'technology',
            'renewable energy': 'solar-panel',
            'digital marketing': 'marketing',
            'climate change': 'environment',
            'blockchain': 'technology',
            'cybersecurity': 'security'
        };
        
        const lowerTopic = topic.toLowerCase();
        let keyword = 'business'; // default
        
        for (const [key, value] of Object.entries(imageKeywords)) {
            if (lowerTopic.includes(key)) {
                keyword = value;
                break;
            }
        }
        
        return `https://source.unsplash.com/1200x800/?${keyword}`;
    }
    
    generateFallbackContent(topic, template) {
        const templateConfig = this.templates[template];
        
        return {
            title: this.formatTitle(topic),
            subtitle: this.generateSubtitle(topic, template),
            slides: templateConfig.structure.map((slideType, index) => ({
                type: slideType,
                index: index,
                title: this.formatSlideTitle(slideType, topic),
                content: [
                    `Key information about ${topic}`,
                    'Important points to consider',
                    'Best practices and recommendations',
                    'Next steps and action items'
                ],
                notes: `Speaker notes for ${slideType} slide about ${topic}`
            })),
            template: template,
            research: {
                summary: `${topic} is an important topic that requires careful consideration and strategic planning.`,
                keyFacts: [],
                relatedTerms: [],
                statistics: [],
                trends: [],
                challenges: [],
                opportunities: []
            }
        };
    }
    
    // Utility methods
    clearCache() {
        this.cache.clear();
    }
    
    getCacheSize() {
        return this.cache.size;
    }
    
    getCachedTopics() {
        return Array.from(this.cache.keys());
    }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.ContentGenerator = ContentGenerator;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentGenerator;
}
