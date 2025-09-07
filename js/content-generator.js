// Image Service for fetching real images
class ImageService {
    constructor() {
        this.unsplashAccessKey = 'demo-key'; // In production, use actual API key
        this.fallbackImages = this.initializeFallbackImages();
    }

    initializeFallbackImages() {
        return {
            'ai-brain': 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
            'machine-learning': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
            'robot-automation': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
            'data-analysis': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
            'neural-network': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
            'melting-glaciers': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b',
            'renewable-energy': 'https://images.unsplash.com/photo-1466611653911-95081537e5b7',
            'solar-panels': 'https://images.unsplash.com/photo-1509391366360-2e959784a276',
            'wind-turbines': 'https://images.unsplash.com/photo-1548337138-e87d889cc369',
            'sustainable-city': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f'
        };
    }

    fetchImage(query) {
        try {
            // Check if we have a fallback image for this query
            if (this.fallbackImages[query]) {
                return {
                    src: this.fallbackImages[query] + '?w=800&h=600&fit=crop',
                    alt: query.replace('-', ' '),
                    width: 800,
                    height: 600
                };
            }
            
            // Use Unsplash Source API for demo purposes
            return {
                src: `https://source.unsplash.com/800x600/?${query}`,
                alt: query.replace('-', ' '),
                width: 800,
                height: 600
            };
        } catch (error) {
            console.error('Image fetch failed:', error);
            return {
                src: 'https://via.placeholder.com/800x600/e2e8f0/64748b?text=Image+Placeholder',
                alt: 'Placeholder image',
                width: 800,
                height: 600
            };
        }
    }

    fetchHighQualityImage(query, title) {
        try {
            // Enhanced fallback images with better quality
            const enhancedFallbacks = {
                'ai-brain': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80',
                'machine-learning': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=800&fit=crop&q=80',
                'robot-automation': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop&q=80',
                'data-analysis': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
                'neural-network': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
                'melting-glaciers': 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1200&h=800&fit=crop&q=80',
                'renewable-energy': 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=800&fit=crop&q=80',
                'solar-panels': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop&q=80',
                'wind-turbines': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1200&h=800&fit=crop&q=80',
                'sustainable-city': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=1200&h=800&fit=crop&q=80',
                'cyber-security-shield': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop&q=80',
                'network-protection': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
                'data-encryption': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
                'security-team': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=80',
                'firewall-protection': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop&q=80',
                'blockchain-network': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop&q=80',
                'cryptocurrency-coins': 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=800&fit=crop&q=80',
                'smart-contracts': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop&q=80',
                'digital-security': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop&q=80',
                'decentralized-network': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop&q=80',
                'solar-farm': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop&q=80',
                'hydroelectric-dam': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop&q=80',
                'geothermal-plant': 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=800&fit=crop&q=80',
                'renewable-grid': 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1200&h=800&fit=crop&q=80'
            };

            if (enhancedFallbacks[query]) {
                return {
                    src: enhancedFallbacks[query],
                    alt: title || query.replace('-', ' '),
                    width: 1200,
                    height: 800,
                    caption: this.generateImageCaption(query, title)
                };
            }
            
            // Use Unsplash Source API with higher quality
            return {
                src: `https://source.unsplash.com/1200x800/?${query}`,
                alt: title || query.replace('-', ' '),
                width: 1200,
                height: 800,
                caption: this.generateImageCaption(query, title)
            };
        } catch (error) {
            console.error('High quality image fetch failed:', error);
            return {
                src: 'https://via.placeholder.com/1200x800/e2e8f0/64748b?text=Professional+Image',
                alt: title || 'Professional image',
                width: 1200,
                height: 800,
                caption: 'Professional presentation image'
            };
        }
    }

    generateImageCaption(query, title) {
        const captions = {
            'ai-brain': 'Artificial Intelligence and Machine Learning',
            'machine-learning': 'Advanced Machine Learning Algorithms',
            'robot-automation': 'Automation and Robotics Technology',
            'data-analysis': 'Data Analytics and Business Intelligence',
            'neural-network': 'Neural Networks and Deep Learning',
            'melting-glaciers': 'Climate Change and Environmental Impact',
            'renewable-energy': 'Clean and Renewable Energy Solutions',
            'solar-panels': 'Solar Energy Technology',
            'wind-turbines': 'Wind Power Generation',
            'sustainable-city': 'Sustainable Urban Development',
            'cyber-security-shield': 'Cybersecurity and Data Protection',
            'blockchain-network': 'Blockchain and Distributed Ledger Technology'
        };
        
        return captions[query] || title || 'Professional presentation image';
    }
}

// Chart Service for generating data visualizations
class ChartService {
    generateChartConfig(chartData) {
        const baseConfig = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            family: 'Inter, sans-serif',
                            size: 12,
                            weight: '500'
                        },
                        color: '#374151'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    cornerRadius: 12,
                    padding: 16,
                    titleFont: {
                        family: 'Inter, sans-serif',
                        size: 14,
                        weight: '600'
                    },
                    bodyFont: {
                        family: 'Inter, sans-serif',
                        size: 13
                    },
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    borderWidth: 1
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        };

        const typeSpecificConfigs = {
            line: {
                ...baseConfig,
                scales: {
                    x: {
                        grid: { 
                            display: true,
                            color: 'rgba(229, 231, 235, 0.5)',
                            drawBorder: false
                        },
                        ticks: { 
                            color: '#6b7280',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        grid: { 
                            color: 'rgba(229, 231, 235, 0.5)',
                            drawBorder: false
                        },
                        ticks: { 
                            color: '#6b7280',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        },
                        border: {
                            display: false
                        }
                    }
                },
                elements: {
                    line: {
                        borderWidth: 4,
                        tension: 0.4,
                        capBezierPoints: false
                    },
                    point: {
                        radius: 8,
                        hoverRadius: 12,
                        borderWidth: 3,
                        hoverBorderWidth: 4
                    }
                }
            },
            bar: {
                ...baseConfig,
                scales: {
                    x: {
                        grid: { 
                            display: false,
                            drawBorder: false
                        },
                        ticks: { 
                            color: '#6b7280',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11,
                                weight: '500'
                            }
                        }
                    },
                    y: {
                        grid: { 
                            color: 'rgba(229, 231, 235, 0.5)',
                            drawBorder: false
                        },
                        ticks: { 
                            color: '#6b7280',
                            font: {
                                family: 'Inter, sans-serif',
                                size: 11
                            }
                        }
                    }
                },
                elements: {
                    bar: {
                        borderRadius: 6,
                        borderSkipped: false
                    }
                }
            },
            doughnut: {
                ...baseConfig,
                cutout: '65%',
                plugins: {
                    ...baseConfig.plugins,
                    legend: {
                        position: 'right',
                        labels: {
                            ...baseConfig.plugins.legend.labels,
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 3,
                        borderColor: '#ffffff'
                    }
                }
            },
            pie: {
                ...baseConfig,
                plugins: {
                    ...baseConfig.plugins,
                    legend: {
                        position: 'right',
                        labels: {
                            ...baseConfig.plugins.legend.labels,
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 3,
                        borderColor: '#ffffff'
                    }
                }
            }
        };

        return typeSpecificConfigs[chartData.type] || baseConfig;
    }

    generateChartColors(count) {
        // Professional color palettes
        const professionalPalettes = {
            primary: [
                '#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'
            ],
            success: [
                '#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'
            ],
            warning: [
                '#d97706', '#f59e0b', '#fbbf24', '#fcd34d', '#fef3c7'
            ],
            danger: [
                '#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fecaca'
            ],
            purple: [
                '#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'
            ],
            teal: [
                '#0d9488', '#14b8a6', '#5eead4', '#99f6e4', '#ccfbf1'
            ],
            orange: [
                '#ea580c', '#f97316', '#fb923c', '#fdba74', '#fed7aa'
            ],
            pink: [
                '#be185d', '#ec4899', '#f472b6', '#f9a8d4', '#fce7f3'
            ]
        };

        // Select palette based on count
        const paletteKeys = Object.keys(professionalPalettes);
        const selectedPalette = professionalPalettes[paletteKeys[count % paletteKeys.length]];
        
        // Generate gradient variations for better visual appeal
        const colors = [];
        for (let i = 0; i < count; i++) {
            const baseColor = selectedPalette[i % selectedPalette.length];
            const variation = i % 3; // Create 3 variations of each color
            
            switch (variation) {
                case 0:
                    colors.push(baseColor);
                    break;
                case 1:
                    colors.push(this.lightenColor(baseColor, 20));
                    break;
                case 2:
                    colors.push(this.darkenColor(baseColor, 20));
                    break;
            }
        }
        
        return colors;
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
            (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
            (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
    }
}

// Advanced AI Content Generator for PowerPoint Presentations
class ContentGenerator {
    constructor() {
        this.topicDatabase = this.initializeTopicDatabase();
        this.imageService = new ImageService();
        this.chartService = new ChartService();
        this.contentTemplates = this.initializeContentTemplates();
        this.analyzedTopic = null;
    }

    initializeTopicDatabase() {
        return {
            'artificial intelligence': {
                category: 'technology',
                keywords: ['ai', 'machine learning', 'deep learning', 'neural networks', 'automation'],
                sections: {
                    introduction: {
                        title: 'Introduction to Artificial Intelligence',
                        subtitle: 'The Future of Technology',
                        content: [
                            'AI represents the simulation of human intelligence in machines',
                            'Enables computers to learn, reason, and make decisions',
                            'Revolutionizing industries from healthcare to finance',
                            'Expected to contribute $15.7 trillion to global GDP by 2030'
                        ]
                    },
                    applications: {
                        title: 'Real-World AI Applications',
                        subtitle: 'Transforming Industries Today',
                        content: [
                            'Healthcare: Medical diagnosis and drug discovery',
                            'Finance: Fraud detection and algorithmic trading',
                            'Transportation: Autonomous vehicles and traffic optimization',
                            'Entertainment: Personalized content recommendations',
                            'Manufacturing: Predictive maintenance and quality control'
                        ]
                    },
                    benefits: {
                        title: 'Benefits of AI Implementation',
                        subtitle: 'Why Organizations Adopt AI',
                        content: [
                            'Increased efficiency and productivity by 40%',
                            'Enhanced decision-making through data insights',
                            '24/7 availability and consistent performance',
                            'Cost reduction through automation',
                            'Improved customer experience and satisfaction'
                        ]
                    },
                    challenges: {
                        title: 'AI Implementation Challenges',
                        subtitle: 'Obstacles to Overcome',
                        content: [
                            'Data quality and availability issues',
                            'High implementation and maintenance costs',
                            'Skills gap and talent shortage',
                            'Ethical concerns and bias in algorithms',
                            'Regulatory compliance and governance'
                        ]
                    },
                    future: {
                        title: 'Future of Artificial Intelligence',
                        subtitle: 'What Lies Ahead',
                        content: [
                            'General AI development beyond narrow applications',
                            'Integration with quantum computing for enhanced capabilities',
                            'Autonomous systems in smart cities and IoT',
                            'AI-human collaboration in creative industries',
                            'Ethical AI frameworks and responsible development'
                        ]
                    }
                },
                statistics: [
                    { label: 'AI Market Size', value: '$387B', description: 'by 2030' },
                    { label: 'Job Creation', value: '97M', description: 'new jobs by 2025' },
                    { label: 'Productivity Gain', value: '40%', description: 'average increase' },
                    { label: 'Investment Growth', value: '15%', description: 'CAGR 2021-2030' }
                ],
                charts: {
                    market_growth: {
                        type: 'line',
                        title: 'AI Market Growth Projection',
                        data: {
                            labels: ['2020', '2022', '2024', '2026', '2028', '2030'],
                            values: [62, 119, 191, 267, 327, 387]
                        }
                    },
                    applications: {
                        type: 'doughnut',
                        title: 'AI Applications by Industry',
                        data: {
                            labels: ['Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Transportation', 'Other'],
                            values: [25, 20, 18, 15, 12, 10]
                        }
                    }
                },
                images: ['ai-brain', 'machine-learning', 'robot-automation', 'data-analysis', 'neural-network']
            },

            'climate change': {
                category: 'environment',
                keywords: ['global warming', 'sustainability', 'carbon emissions', 'renewable energy', 'environment'],
                sections: {
                    introduction: {
                        title: 'Understanding Climate Change',
                        subtitle: 'The Greatest Challenge of Our Time',
                        content: [
                            'Climate change refers to long-term shifts in global temperatures',
                            'Primarily caused by human activities since the Industrial Revolution',
                            'Global temperatures have risen 1.1°C since pre-industrial times',
                            'Urgent action needed to limit warming to 1.5°C by 2030'
                        ]
                    },
                    causes: {
                        title: 'Primary Causes of Climate Change',
                        subtitle: 'Human Activities Driving Change',
                        content: [
                            'Fossil fuel combustion (75% of global emissions)',
                            'Deforestation and land use changes',
                            'Industrial processes and manufacturing',
                            'Agriculture and livestock farming',
                            'Transportation and energy production'
                        ]
                    },
                    impacts: {
                        title: 'Climate Change Impacts',
                        subtitle: 'Effects We\'re Already Seeing',
                        content: [
                            'Rising sea levels threatening coastal communities',
                            'Extreme weather events increasing in frequency',
                            'Arctic ice melting at unprecedented rates',
                            'Biodiversity loss and ecosystem disruption',
                            'Food security and water scarcity challenges'
                        ]
                    },
                    solutions: {
                        title: 'Climate Solutions and Mitigation',
                        subtitle: 'Path to a Sustainable Future',
                        content: [
                            'Transition to renewable energy sources',
                            'Energy efficiency improvements in buildings',
                            'Sustainable transportation systems',
                            'Carbon capture and storage technologies',
                            'Nature-based solutions and reforestation'
                        ]
                    },
                    action: {
                        title: 'Taking Action on Climate Change',
                        subtitle: 'What We Can Do Now',
                        content: [
                            'Individual actions: reduce, reuse, recycle',
                            'Support renewable energy adoption',
                            'Advocate for climate-friendly policies',
                            'Invest in sustainable technologies',
                            'Educate and raise awareness in communities'
                        ]
                    }
                },
                statistics: [
                    { label: 'CO₂ Concentration', value: '421 ppm', description: 'highest in 3M years' },
                    { label: 'Temperature Rise', value: '1.1°C', description: 'since 1880' },
                    { label: 'Sea Level Rise', value: '21cm', description: 'since 1880' },
                    { label: 'Ice Loss', value: '427B tons/year', description: 'from glaciers' }
                ],
                charts: {
                    emissions: {
                        type: 'bar',
                        title: 'Global CO₂ Emissions by Sector',
                        data: {
                            labels: ['Energy', 'Agriculture', 'Industry', 'Transport', 'Buildings', 'Other'],
                            values: [73.2, 18.4, 5.2, 16.2, 6.2, 8.8]
                        }
                    },
                    temperature: {
                        type: 'line',
                        title: 'Global Temperature Anomaly (1880-2023)',
                        data: {
                            labels: ['1880', '1920', '1960', '2000', '2023'],
                            values: [-0.2, -0.3, -0.1, 0.4, 1.1]
                        }
                    }
                },
                images: ['melting-glaciers', 'renewable-energy', 'solar-panels', 'wind-turbines', 'sustainable-city']
            },

            'digital marketing': {
                category: 'business',
                keywords: ['online marketing', 'social media', 'seo', 'content marketing', 'digital advertising'],
                sections: {
                    introduction: {
                        title: 'Digital Marketing Revolution',
                        subtitle: 'Marketing in the Digital Age',
                        content: [
                            'Digital marketing encompasses all online marketing efforts',
                            'Leverages internet and digital technologies to reach customers',
                            'More targeted and measurable than traditional marketing',
                            'Global digital ad spending reached $602 billion in 2023'
                        ]
                    },
                    channels: {
                        title: 'Key Digital Marketing Channels',
                        subtitle: 'Where Your Audience Lives',
                        content: [
                            'Search Engine Optimization (SEO) and Marketing (SEM)',
                            'Social Media Marketing across platforms',
                            'Email marketing and automation',
                            'Content marketing and blogging',
                            'Pay-per-click (PPC) advertising'
                        ]
                    },
                    strategies: {
                        title: 'Effective Digital Marketing Strategies',
                        subtitle: 'Winning Approaches for 2024',
                        content: [
                            'Personalized customer experiences using AI',
                            'Video content and live streaming engagement',
                            'Influencer partnerships and collaborations',
                            'Voice search optimization',
                            'Interactive content and gamification'
                        ]
                    },
                    measurement: {
                        title: 'Measuring Digital Marketing Success',
                        subtitle: 'Key Performance Indicators',
                        content: [
                            'Website traffic and conversion rates',
                            'Social media engagement and reach',
                            'Email open rates and click-through rates',
                            'Return on ad spend (ROAS) and ROI',
                            'Customer acquisition cost (CAC) and lifetime value'
                        ]
                    },
                    trends: {
                        title: 'Digital Marketing Trends 2024',
                        subtitle: 'Stay Ahead of the Curve',
                        content: [
                            'AI-powered personalization and chatbots',
                            'Privacy-first marketing strategies',
                            'Interactive and immersive experiences',
                            'Sustainability and purpose-driven marketing',
                            'Micro-moments and real-time engagement'
                        ]
                    }
                },
                statistics: [
                    { label: 'Global Ad Spend', value: '$602B', description: 'digital advertising 2023' },
                    { label: 'ROI Average', value: '4:1', description: 'digital marketing ROI' },
                    { label: 'Mobile Traffic', value: '58%', description: 'of global web traffic' },
                    { label: 'Video Engagement', value: '1200%', description: 'more shares than text' }
                ],
                charts: {
                    channel_effectiveness: {
                        type: 'bar',
                        title: 'Digital Marketing Channel Effectiveness',
                        data: {
                            labels: ['Email', 'SEO', 'Social Media', 'PPC', 'Content Marketing', 'Influencer'],
                            values: [42, 38, 31, 28, 26, 22]
                        }
                    },
                    spending_growth: {
                        type: 'line',
                        title: 'Digital Ad Spending Growth',
                        data: {
                            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
                            values: [378, 455, 521, 602, 681, 756]
                        }
                    }
                },
                images: ['social-media-marketing', 'seo-optimization', 'email-marketing', 'digital-analytics', 'content-creation']
            },

            'cybersecurity': {
                category: 'technology',
                keywords: ['information security', 'data protection', 'cyber threats', 'network security'],
                sections: {
                    introduction: {
                        title: 'Cybersecurity Fundamentals',
                        subtitle: 'Protecting Digital Assets',
                        content: [
                            'Cybersecurity protects systems, networks, and data from attacks',
                            'Critical for businesses, governments, and individuals',
                            'Global cybersecurity market valued at $173.5B in 2023',
                            'Cyber attacks occur every 39 seconds on average'
                        ]
                    },
                    threats: {
                        title: 'Common Cyber Threats',
                        subtitle: 'Understanding the Threat Landscape',
                        content: [
                            'Malware: viruses, worms, ransomware, spyware',
                            'Phishing and social engineering attacks',
                            'Advanced Persistent Threats (APTs)',
                            'Insider threats and data breaches',
                            'IoT vulnerabilities and supply chain attacks'
                        ]
                    },
                    protection: {
                        title: 'Cybersecurity Protection Measures',
                        subtitle: 'Building Strong Defenses',
                        content: [
                            'Multi-factor authentication (MFA) implementation',
                            'Regular software updates and patch management',
                            'Employee training and security awareness',
                            'Network segmentation and access controls',
                            'Backup and disaster recovery planning'
                        ]
                    },
                    compliance: {
                        title: 'Regulatory Compliance',
                        subtitle: 'Meeting Legal Requirements',
                        content: [
                            'GDPR: European data protection regulation',
                            'HIPAA: Healthcare data protection in the US',
                            'SOX: Financial reporting compliance',
                            'ISO 27001: International security standard',
                            'NIST Framework: Cybersecurity best practices'
                        ]
                    },
                    future: {
                        title: 'Future of Cybersecurity',
                        subtitle: 'Emerging Technologies and Trends',
                        content: [
                            'AI-powered threat detection and response',
                            'Zero Trust security architecture',
                            'Quantum-resistant cryptography',
                            'Cloud security and DevSecOps',
                            'Biometric authentication advances'
                        ]
                    }
                },
                statistics: [
                    { label: 'Market Size', value: '$173.5B', description: 'global cybersecurity 2023' },
                    { label: 'Attack Frequency', value: '39 sec', description: 'average time between attacks' },
                    { label: 'Data Breach Cost', value: '$4.45M', description: 'average cost in 2023' },
                    { label: 'Skills Gap', value: '3.5M', description: 'unfilled cybersecurity jobs' }
                ],
                charts: {
                    threat_types: {
                        type: 'doughnut',
                        title: 'Cyber Attack Types Distribution',
                        data: {
                            labels: ['Malware', 'Phishing', 'Denial of Service', 'Insider Threats', 'Advanced Threats', 'Other'],
                            values: [28, 25, 18, 15, 10, 4]
                        }
                    },
                    investment_growth: {
                        type: 'bar',
                        title: 'Cybersecurity Investment by Industry',
                        data: {
                            labels: ['Financial', 'Government', 'Healthcare', 'Technology', 'Manufacturing', 'Retail'],
                            values: [23, 19, 16, 15, 13, 14]
                        }
                    }
                },
                images: ['cyber-security-shield', 'network-protection', 'data-encryption', 'security-team', 'firewall-protection']
            },

            'blockchain': {
                category: 'technology',
                keywords: ['cryptocurrency', 'distributed ledger', 'bitcoin', 'ethereum', 'smart contracts'],
                sections: {
                    introduction: {
                        title: 'Understanding Blockchain Technology',
                        subtitle: 'The Foundation of Digital Trust',
                        content: [
                            'Blockchain is a distributed ledger technology',
                            'Provides transparency, security, and immutability',
                            'Eliminates need for intermediaries in transactions',
                            'Global blockchain market expected to reach $163.8B by 2029'
                        ]
                    },
                    applications: {
                        title: 'Blockchain Applications Beyond Crypto',
                        subtitle: 'Real-World Use Cases',
                        content: [
                            'Supply chain management and traceability',
                            'Digital identity and credential verification',
                            'Smart contracts and automated agreements',
                            'Healthcare records and data sharing',
                            'Voting systems and governance'
                        ]
                    },
                    benefits: {
                        title: 'Benefits of Blockchain Technology',
                        subtitle: 'Why Organizations Choose Blockchain',
                        content: [
                            'Enhanced security through cryptographic hashing',
                            'Improved transparency and auditability',
                            'Reduced costs by eliminating intermediaries',
                            'Faster settlement times for transactions',
                            'Global accessibility and 24/7 availability'
                        ]
                    },
                    challenges: {
                        title: 'Blockchain Implementation Challenges',
                        subtitle: 'Obstacles to Widespread Adoption',
                        content: [
                            'Scalability limitations and transaction speed',
                            'High energy consumption in some networks',
                            'Regulatory uncertainty and compliance issues',
                            'Technical complexity and skills shortage',
                            'Integration with existing systems'
                        ]
                    },
                    future: {
                        title: 'The Future of Blockchain',
                        subtitle: 'Next Generation Developments',
                        content: [
                            'Interoperability between different blockchains',
                            'Green blockchain with proof-of-stake consensus',
                            'Central Bank Digital Currencies (CBDCs)',
                            'Web3 and decentralized internet applications',
                            'Integration with AI and IoT technologies'
                        ]
                    }
                },
                statistics: [
                    { label: 'Market Size', value: '$163.8B', description: 'projected by 2029' },
                    { label: 'Transaction Speed', value: '7 TPS', description: 'Bitcoin network average' },
                    { label: 'Energy Use', value: '150 TWh', description: 'Bitcoin annual consumption' },
                    { label: 'Adoption Rate', value: '106M', description: 'global crypto users' }
                ],
                charts: {
                    adoption_timeline: {
                        type: 'line',
                        title: 'Blockchain Adoption Growth',
                        data: {
                            labels: ['2016', '2018', '2020', '2022', '2024', '2026'],
                            values: [2.3, 8.7, 28.4, 67.2, 119.6, 163.8]
                        }
                    },
                    use_cases: {
                        type: 'bar',
                        title: 'Blockchain Use Cases by Industry',
                        data: {
                            labels: ['Finance', 'Supply Chain', 'Healthcare', 'Real Estate', 'Government', 'Media'],
                            values: [35, 22, 18, 12, 8, 5]
                        }
                    }
                },
                images: ['blockchain-network', 'cryptocurrency-coins', 'smart-contracts', 'digital-security', 'decentralized-network']
            },

            'renewable energy': {
                category: 'environment',
                keywords: ['solar power', 'wind energy', 'green energy', 'sustainable energy', 'clean technology'],
                sections: {
                    introduction: {
                        title: 'Renewable Energy Revolution',
                        subtitle: 'Powering a Sustainable Future',
                        content: [
                            'Renewable energy comes from naturally replenishing sources',
                            'Key to reducing greenhouse gas emissions',
                            'Global renewable capacity grew 9.6% in 2022',
                            'Renewable energy employed 13.7 million people globally'
                        ]
                    },
                    types: {
                        title: 'Types of Renewable Energy',
                        subtitle: 'Diverse Sources of Clean Power',
                        content: [
                            'Solar energy: photovoltaic and thermal systems',
                            'Wind power: onshore and offshore turbines',
                            'Hydroelectric power from flowing water',
                            'Geothermal energy from Earth\'s heat',
                            'Biomass and bioenergy from organic materials'
                        ]
                    },
                    benefits: {
                        title: 'Benefits of Renewable Energy',
                        subtitle: 'Environmental and Economic Advantages',
                        content: [
                            'Zero greenhouse gas emissions during operation',
                            'Abundant and inexhaustible energy sources',
                            'Reduced dependence on fossil fuel imports',
                            'Job creation in manufacturing and installation',
                            'Long-term cost savings and price stability'
                        ]
                    },
                    challenges: {
                        title: 'Renewable Energy Challenges',
                        subtitle: 'Barriers to Overcome',
                        content: [
                            'Intermittency and storage requirements',
                            'High upfront capital investments',
                            'Grid integration and infrastructure needs',
                            'Geographic limitations for some technologies',
                            'Policy and regulatory framework development'
                        ]
                    },
                    future: {
                        title: 'Future of Renewable Energy',
                        subtitle: 'Trends and Innovations',
                        content: [
                            'Advanced energy storage solutions',
                            'Floating solar and offshore wind expansion',
                            'Green hydrogen production and applications',
                            'Smart grids and energy management systems',
                            'Agrivoltaics combining solar panels with farming'
                        ]
                    }
                },
                statistics: [
                    { label: 'Global Capacity', value: '3,372 GW', description: 'renewable capacity 2022' },
                    { label: 'Employment', value: '13.7M', description: 'renewable energy jobs' },
                    { label: 'Investment', value: '$1.8T', description: 'annual renewable investment' },
                    { label: 'Growth Rate', value: '9.6%', description: 'capacity growth 2022' }
                ],
                charts: {
                    capacity_mix: {
                        type: 'doughnut',
                        title: 'Renewable Energy Capacity by Type',
                        data: {
                            labels: ['Hydropower', 'Wind', 'Solar', 'Bioenergy', 'Geothermal', 'Other'],
                            values: [38, 26, 28, 5, 2, 1]
                        }
                    },
                    investment_trends: {
                        type: 'line',
                        title: 'Global Renewable Energy Investment',
                        data: {
                            labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
                            values: [289, 301, 304, 366, 434, 495]
                        }
                    }
                },
                images: ['solar-farm', 'wind-turbines', 'hydroelectric-dam', 'geothermal-plant', 'renewable-grid']
            }
        };
    }

    initializeContentTemplates() {
        return {
            titleSlide: {
                layout: 'title',
                structure: ['title', 'subtitle', 'presenter', 'date']
            },
            introductionSlide: {
                layout: 'content',
                structure: ['title', 'bullet-points', 'image']
            },
            statisticsSlide: {
                layout: 'chart-focus',
                structure: ['title', 'key-stats', 'chart']
            },
            contentSlide: {
                layout: 'balanced',
                structure: ['title', 'content', 'image']
            },
            comparisonSlide: {
                layout: 'two-column',
                structure: ['title', 'left-content', 'right-content']
            },
            conclusionSlide: {
                layout: 'centered',
                structure: ['title', 'summary-points', 'call-to-action']
            }
        };
    }

    analyzeTopic(topic) {
        const normalizedTopic = topic.toLowerCase();
        
        // Find best matching topic in database
        let bestMatch = null;
        let bestScore = 0;
        
        for (const [key, data] of Object.entries(this.topicDatabase)) {
            const score = this.calculateTopicSimilarity(normalizedTopic, key, data.keywords);
            if (score > bestScore) {
                bestScore = score;
                bestMatch = { key, data };
            }
        }
        
        this.analyzedTopic = bestMatch || this.generateTopicAnalysis(topic);
        
        return this.analyzedTopic;
    }

    calculateTopicSimilarity(input, topicKey, keywords) {
        let score = 0;
        
        // Direct match
        if (input.includes(topicKey) || topicKey.includes(input)) {
            score += 50;
        }
        
        // Keyword matches
        keywords.forEach(keyword => {
            if (input.includes(keyword)) {
                score += 10;
            }
        });
        
        return score;
    }

    generateTopicAnalysis(topic) {
        // For topics not in database, generate generic structure
        return {
            key: 'generic',
            data: {
                category: 'general',
                keywords: topic.split(' '),
                sections: this.generateGenericSections(topic),
                statistics: this.generateGenericStats(topic),
                charts: this.generateGenericCharts(topic),
                images: this.generateGenericImages(topic)
            }
        };
    }

    generateGenericSections(topic) {
        const sections = {
            introduction: {
                title: `Introduction to ${topic}`,
                subtitle: 'Understanding the Fundamentals',
                content: [
                    `${topic} represents an important area of study and application`,
                    'Understanding key concepts and principles is essential',
                    'Multiple factors contribute to its significance',
                    'Continued research and development drive innovation'
                ]
            },
            overview: {
                title: `${topic} Overview`,
                subtitle: 'Key Components and Elements',
                content: [
                    'Multiple aspects define this field',
                    'Various approaches and methodologies exist',
                    'Different perspectives contribute to understanding',
                    'Evolution continues through research and practice'
                ]
            },
            applications: {
                title: `Applications of ${topic}`,
                subtitle: 'Real-World Implementation',
                content: [
                    'Practical applications span multiple industries',
                    'Implementation varies based on specific needs',
                    'Benefits include improved efficiency and outcomes',
                    'Continued adoption drives further development'
                ]
            },
            challenges: {
                title: `Challenges in ${topic}`,
                subtitle: 'Obstacles and Considerations',
                content: [
                    'Implementation challenges require careful planning',
                    'Resource allocation and timing are crucial',
                    'Training and education support success',
                    'Ongoing evaluation ensures effectiveness'
                ]
            },
            future: {
                title: `Future of ${topic}`,
                subtitle: 'Trends and Developments',
                content: [
                    'Continued evolution shapes future possibilities',
                    'Emerging trends indicate new directions',
                    'Innovation drives expanded applications',
                    'Future success depends on current foundations'
                ]
            }
        };
        
        return sections;
    }

    generateGenericStats(topic) {
        return [
            { label: 'Market Growth', value: '15%', description: 'annual growth rate' },
            { label: 'Adoption Rate', value: '65%', description: 'organizations implementing' },
            { label: 'Investment', value: '$2.3B', description: 'global investment 2023' },
            { label: 'Efficiency Gain', value: '30%', description: 'average improvement' }
        ];
    }

    generateGenericCharts(topic) {
        return {
            growth: {
                type: 'line',
                title: `${topic} Growth Trends`,
                data: {
                    labels: ['2020', '2021', '2022', '2023', '2024'],
                    values: [100, 115, 132, 152, 175]
                }
            },
            distribution: {
                type: 'bar',
                title: `${topic} Implementation by Sector`,
                data: {
                    labels: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Education', 'Government'],
                    values: [28, 22, 18, 16, 10, 6]
                }
            }
        };
    }

    generateGenericImages(topic) {
        const genericImages = ['business-team', 'technology-concept', 'data-analytics', 'innovation', 'growth-chart'];
        return genericImages;
    }

    generateContent(topic, options = {}) {
        if (!this.analyzedTopic) {
            this.analyzeTopic(topic);
        }

        const { data } = this.analyzedTopic;
        const slideCount = options.slidesCount || 10;
        const audienceLevel = options.audienceLevel || 'intermediate';
        const style = options.presentationStyle || 'professional';

        const presentationData = {
            metadata: {
                title: this.generateTitle(topic),
                subtitle: this.generateSubtitle(topic, data.category),
                author: 'AI PowerPoint Generator',
                date: new Date().toLocaleDateString(),
                topic: topic,
                slideCount: slideCount,
                audienceLevel: audienceLevel,
                style: style,
                theme: this.selectTheme(data.category, style)
            },
            slides: []
        };

        // Generate slides based on content sections
        const sections = Object.entries(data.sections);
        const slidesPerSection = Math.floor((slideCount - 2) / sections.length); // Reserve 2 for title and conclusion
        
        // Title slide
        presentationData.slides.push(this.generateTitleSlide(presentationData.metadata));
        
        // Content slides
        let slideIndex = 1;
        for (const [sectionKey, sectionData] of sections) {
            if (slideIndex >= slideCount - 1) break;
            
            // Main content slide for section
            presentationData.slides.push(
                this.generateContentSlide(sectionData, sectionKey, data, slideIndex)
            );
            slideIndex++;
            
            // Additional slides if needed
            if (slidesPerSection > 1 && slideIndex < slideCount - 1) {
                if (sectionKey === 'introduction' && data.statistics) {
                    presentationData.slides.push(
                        this.generateStatisticsSlide(data.statistics, slideIndex)
                    );
                    slideIndex++;
                } else if (data.charts && Object.keys(data.charts).length > 0) {
                    const chartKey = Object.keys(data.charts)[0];
                    presentationData.slides.push(
                        this.generateChartSlide(data.charts[chartKey], slideIndex)
                    );
                    slideIndex++;
                }
            }
        }
        
        // Conclusion slide
        presentationData.slides.push(this.generateConclusionSlide(topic, data, slideIndex));
        
        return presentationData;
    }

    // Main method called by the app
    generatePresentation(topic, options = {}) {
        return this.generateContent(topic, options);
    }

    generateTitle(topic) {
        const titles = [
            `${topic}: A Comprehensive Overview`,
            `Understanding ${topic}`,
            `${topic}: Current Trends and Future Prospects`,
            `The Complete Guide to ${topic}`,
            `${topic}: Strategy and Implementation`
        ];
        
        return titles[Math.floor(Math.random() * titles.length)];
    }

    generateSubtitle(topic, category) {
        const subtitles = {
            technology: 'Innovation and Digital Transformation',
            business: 'Strategic Insights and Best Practices',
            environment: 'Sustainability and Future Solutions',
            general: 'Key Concepts and Applications'
        };
        
        return subtitles[category] || subtitles.general;
    }

    selectTheme(category, style) {
        const themes = {
            technology: { professional: 'tech-blue', creative: 'tech-gradient', academic: 'tech-minimal' },
            business: { professional: 'corporate-blue', creative: 'business-modern', academic: 'business-clean' },
            environment: { professional: 'eco-green', creative: 'nature-gradient', academic: 'eco-minimal' },
            general: { professional: 'modern-blue', creative: 'colorful', academic: 'minimal-gray' }
        };
        
        return themes[category]?.[style] || themes.general[style];
    }

    generateTitleSlide(metadata) {
        return {
            type: 'title',
            layout: 'hero',
            title: metadata.title,
            subtitle: metadata.subtitle,
            author: metadata.author,
            date: metadata.date,
            background: 'gradient',
            animation: 'fadeInUp'
        };
    }

    generateContentSlide(sectionData, sectionKey, topicData, slideIndex) {
        // Determine layout based on content type and slide index
        let layout = 'content-with-image';
        if (sectionKey === 'introduction' || sectionKey === 'overview') {
            layout = 'professional-title';
        } else if (sectionKey === 'applications' || sectionKey === 'benefits') {
            layout = 'content-split';
        } else if (sectionKey === 'challenges' || sectionKey === 'solutions') {
            layout = 'comparison';
        } else if (sectionKey === 'future' || sectionKey === 'trends') {
            layout = 'timeline';
        }

        const slide = {
            type: 'content',
            layout: layout,
            title: sectionData.title,
            subtitle: sectionData.subtitle,
            content: sectionData.content,
            slideNumber: slideIndex,
            animation: this.getAnimationForLayout(layout)
        };

        // Add high-quality image with better selection
        if (topicData.images && topicData.images.length > 0) {
            const imageIndex = slideIndex % topicData.images.length;
            const imageQuery = topicData.images[imageIndex];
            
            slide.image = this.imageService.fetchHighQualityImage(imageQuery, sectionData.title);
            slide.image.position = this.getImagePositionForLayout(layout);
        }

        // Add additional content based on layout
        if (layout === 'content-split') {
            slide.leftContent = this.generateLeftContent(sectionData, topicData);
            slide.rightContent = this.generateRightContent(sectionData, topicData);
        } else if (layout === 'comparison') {
            slide.leftSide = this.generateComparisonSide(sectionData, 'pros');
            slide.rightSide = this.generateComparisonSide(sectionData, 'cons');
        } else if (layout === 'timeline') {
            slide.timelineItems = this.generateTimelineItems(sectionData, topicData);
        }

        return slide;
    }

    getAnimationForLayout(layout) {
        const animations = {
            'hero': 'professionalFadeIn',
            'content-with-image': 'slideInWithRotation',
            'chart-focus': 'fadeInWithBlur',
            'professional-title': 'slideInFromTop',
            'content-split': 'slideInDiagonal',
            'image-showcase': 'zoomIn',
            'data-visualization': 'fadeInScale',
            'timeline': 'slideInFromLeft',
            'comparison': 'slideInFromRight',
            'quote': 'bounceIn'
        };
        return animations[layout] || 'professionalFadeIn';
    }

    getImagePositionForLayout(layout) {
        const positions = {
            'professional-title': 'background',
            'content-with-image': 'right',
            'image-showcase': 'full',
            'content-split': 'center'
        };
        return positions[layout] || 'right';
    }

    generateLeftContent(sectionData, topicData) {
        return {
            title: 'Key Points',
            content: sectionData.content.slice(0, Math.ceil(sectionData.content.length / 2))
        };
    }

    generateRightContent(sectionData, topicData) {
        return {
            title: 'Additional Details',
            content: sectionData.content.slice(Math.ceil(sectionData.content.length / 2))
        };
    }

    generateComparisonSide(sectionData, type) {
        if (type === 'pros') {
            return {
                title: 'Advantages',
                content: sectionData.content.filter((item, index) => index % 2 === 0)
            };
        } else {
            return {
                title: 'Considerations',
                content: sectionData.content.filter((item, index) => index % 2 === 1)
            };
        }
    }

    generateTimelineItems(sectionData, topicData) {
        return sectionData.content.map((item, index) => ({
            title: `Step ${index + 1}`,
            content: item,
            date: `Phase ${index + 1}`,
            icon: this.getTimelineIcon(index)
        }));
    }

    getTimelineIcon(index) {
        const icons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        return icons[index] || '•';
    }

    generateStatisticsSlide(statistics, slideIndex) {
        return {
            type: 'statistics',
            layout: 'stats-grid',
            title: 'Key Statistics',
            subtitle: 'Numbers That Matter',
            statistics: statistics,
            slideNumber: slideIndex,
            animation: 'fadeInScale'
        };
    }

    generateChartSlide(chartData, slideIndex) {
        return {
            type: 'chart',
            layout: 'chart-focus',
            title: chartData.title,
            subtitle: 'Data Visualization',
            chart: {
                type: chartData.type,
                data: chartData.data,
                id: `chart-${slideIndex}`
            },
            slideNumber: slideIndex,
            animation: 'slideInUp'
        };
    }

    generateConclusionSlide(topic, topicData, slideIndex) {
        return {
            type: 'conclusion',
            layout: 'centered',
            title: `${topic}: Key Takeaways`,
            subtitle: 'Moving Forward',
            content: [
                `${topic} represents significant opportunities and challenges`,
                'Strategic implementation requires careful planning and execution',
                'Continued innovation and adaptation drive success',
                'Future developments will shape the landscape ahead'
            ],
            callToAction: 'Ready to implement these insights?',
            slideNumber: slideIndex,
            animation: 'fadeInUp'
        };
    }

    addImages(presentationData) {
        if (!this.analyzedTopic) return;

        const { data } = this.analyzedTopic;
        const images = data.images || [];

        for (const slide of presentationData.slides) {
            if (slide.type === 'content' || slide.type === 'statistics') {
                if (!slide.image && images.length > 0) {
                    const imageQuery = images[Math.floor(Math.random() * images.length)];
                    slide.image = this.imageService.fetchImage(imageQuery);
                }
            }
        }
    }

    addCharts(presentationData) {
        if (!this.analyzedTopic) return;

        const { data } = this.analyzedTopic;
        const charts = data.charts || {};

        for (const slide of presentationData.slides) {
            if (slide.type === 'chart' || slide.type === 'statistics') {
                const chartKeys = Object.keys(charts);
                if (chartKeys.length > 0) {
                    const chartKey = chartKeys[Math.floor(Math.random() * chartKeys.length)];
                    const chartConfig = charts[chartKey];
                    
                    slide.chart = {
                        ...chartConfig,
                        id: `chart-${slide.slideNumber}`,
                        config: this.chartService.generateChartConfig(chartConfig)
                    };
                }
            }
        }
    }
}
