# Python PowerPoint Generator Setup Guide

## 🐍 Python Version Requirements

This script requires **Python 3.7 or higher**. Check your Python version:

```bash
python --version
# or
python3 --version
```

## 📦 Installation

### Step 1: Install Required Packages

```bash
# Install from requirements file
pip install -r requirements.txt

# Or install packages individually
pip install python-pptx requests Pillow
```

### Step 2: API Keys Setup (Optional but Recommended)

#### Unsplash API (for high-quality images)
1. Visit: https://unsplash.com/developers
2. Create a free account
3. Create a new application
4. Copy your "Access Key"
5. Edit `python_generator.py` and add your key:
   ```python
   self.unsplash_access_key = "YOUR_UNSPLASH_ACCESS_KEY"
   ```

#### SerpAPI (for web content search)
1. Visit: https://serpapi.com/
2. Sign up for a free account (100 searches/month)
3. Get your API key from dashboard
4. Edit `python_generator.py` and add your key:
   ```python
   self.serpapi_key = "YOUR_SERPAPI_KEY"
   ```

## 🚀 Usage

### Basic Usage (No API Keys Required)

```bash
python python_generator.py
```

Then enter your topic when prompted:
```
📝 Enter the topic for your presentation: Artificial Intelligence
```

### Example Topics to Try

- "Machine Learning Basics"
- "Digital Marketing Strategies" 
- "Climate Change Solutions"
- "Cryptocurrency Overview"
- "Space Exploration"
- "Renewable Energy Technologies"

## 📁 Output

- Presentations are saved in the `presentations/` folder
- Files are named: `{topic}_presentation.pptx`
- Example: `Artificial_Intelligence_presentation.pptx`

## 🎨 Customization Options

### Modify Slide Templates

Edit the `create_content_slide()` method to customize:
- Font sizes and colors
- Slide layouts
- Image positioning
- Content formatting

### Change Color Scheme

Update the `RGBColor` values:
```python
# Current blue theme
title_para.font.color.rgb = RGBColor(0, 102, 204)

# Alternative themes:
# Green: RGBColor(34, 139, 34)
# Purple: RGBColor(128, 0, 128)
# Orange: RGBColor(255, 140, 0)
```

### Add More Slide Types

Extend the `content_data['key_points']` list:
```python
"key_points": [
    f"Introduction to {topic}",
    f"History of {topic}",
    f"Current Applications",
    f"Benefits and Advantages",
    f"Challenges and Limitations",
    f"Future Prospects",
    f"Case Studies",
    f"Implementation Guide",
    f"Best Practices",
    f"Conclusion"
]
```

## 🔧 Troubleshooting

### Common Issues

1. **ModuleNotFoundError**: Install required packages
   ```bash
   pip install python-pptx requests Pillow
   ```

2. **Image Download Errors**: Check internet connection
   - Script will use placeholder images as fallback

3. **Permission Errors**: Run with appropriate permissions
   ```bash
   # Windows
   python python_generator.py
   
   # Linux/Mac
   python3 python_generator.py
   ```

4. **API Rate Limits**: 
   - Unsplash: 50 requests/hour (free tier)
   - SerpAPI: 100 searches/month (free tier)

### Debug Mode

Add debug prints to see what's happening:
```python
print(f"DEBUG: Content data: {content_data}")
print(f"DEBUG: Images found: {len(images)}")
```

## 🌐 Integration with Web App

This Python generator complements your web-based PowerPoint Maker:

- **Web App**: Instant browser-based generation
- **Python Script**: Advanced local generation with API integration

### Hybrid Workflow

1. Use web app for quick presentations
2. Use Python script for detailed, research-heavy presentations
3. Both generate professional PowerPoint files

## 📊 Features Comparison

| Feature | Web App | Python Script |
|---------|---------|---------------|
| Speed | ⚡ Instant | 🔄 1-2 minutes |
| Images | 🖼️ Unsplash API | 🖼️ Unsplash API + Placeholder |
| Content | 🤖 AI Generated | 🔍 Web Search + Templates |
| Customization | 🎨 4 Templates | 🛠️ Full Code Control |
| Offline | ✅ After first load | ❌ Requires internet |
| File Size | 📱 Lightweight | 💾 Full .pptx files |

## 🚀 Next Steps

1. Test the script with a simple topic
2. Add your API keys for enhanced functionality
3. Customize templates to match your brand
4. Integrate with your existing workflow
5. Consider adding more advanced features:
   - Chart generation
   - Video embedding
   - Animation effects
   - Custom fonts

## 📝 Example Output Structure

```
presentations/
├── Artificial_Intelligence_presentation.pptx
├── Machine_Learning_presentation.pptx
└── Digital_Marketing_presentation.pptx
```

Each presentation includes:
- Title slide with background image
- 5-7 content slides with text and images
- Conclusion slide
- Professional formatting and consistent design

---

**Happy Presenting! 🎉**
