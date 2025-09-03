#!/usr/bin/env python3
"""
Automated PowerPoint Presentation Generator
Searches for content based on topic and creates presentations with relevant images
"""

import os
import requests
import json
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
import time
from urllib.parse import quote
import random
from io import BytesIO
from PIL import Image

class PowerPointGenerator:
    def __init__(self):
        self.unsplash_access_key = None  # Add your Unsplash API key here
        self.serpapi_key = None  # Add your SerpAPI key for web search
        
    def setup_api_keys(self):
        """Setup API keys - you'll need to get these from respective services"""
        print("🔧 API Key Setup:")
        print("1. Get Unsplash API key from: https://unsplash.com/developers")
        print("2. Get SerpAPI key from: https://serpapi.com/")
        print("3. Edit the script to add your API keys")
        
        # For demo purposes, we'll use placeholder methods
        return True
    
    def search_web_content(self, topic, num_results=5):
        """Search for web content about the topic"""
        print(f"🔍 Searching for content about: {topic}")
        
        # Mock data for demonstration - replace with actual API call
        if self.serpapi_key:
            # Actual SerpAPI implementation would go here
            pass
        
        # Demo content structure
        content_data = {
            "overview": f"Introduction to {topic}",
            "key_points": [
                f"What is {topic}?",
                f"Key features of {topic}",
                f"Benefits of {topic}",
                f"Applications of {topic}",
                f"Future of {topic}"
            ],
            "details": {
                f"What is {topic}?": f"{topic} is an important concept that involves multiple aspects and considerations.",
                f"Key features of {topic}": f"The main features include functionality, usability, and effectiveness.",
                f"Benefits of {topic}": f"Benefits include improved efficiency, better outcomes, and enhanced user experience.",
                f"Applications of {topic}": f"{topic} can be applied in various industries and use cases.",
                f"Future of {topic}": f"The future looks promising with continued development and innovation."
            }
        }
        
        return content_data
    
    def search_images(self, query, count=5):
        """Search for relevant images using Unsplash API"""
        print(f"🖼️  Searching for images: {query}")
        
        if self.unsplash_access_key:
            try:
                url = f"https://api.unsplash.com/search/photos"
                params = {
                    'query': query,
                    'per_page': count,
                    'orientation': 'landscape'
                }
                headers = {
                    'Authorization': f'Client-ID {self.unsplash_access_key}'
                }
                
                response = requests.get(url, params=params, headers=headers)
                if response.status_code == 200:
                    data = response.json()
                    images = []
                    for photo in data['results']:
                        images.append({
                            'url': photo['urls']['regular'],
                            'description': photo['description'] or photo['alt_description'] or query,
                            'photographer': photo['user']['name']
                        })
                    return images
            except Exception as e:
                print(f"Error fetching images: {e}")
        
        # Fallback: Use placeholder images
        print("📝 Using placeholder images (add your Unsplash API key for real images)")
        return [
            {
                'url': f'https://via.placeholder.com/800x600/0066CC/FFFFFF?text={quote(query)}+{i+1}',
                'description': f'{query} related image {i+1}',
                'photographer': 'Placeholder'
            }
            for i in range(count)
        ]
    
    def download_image(self, url, filename):
        """Download image from URL"""
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                with open(filename, 'wb') as f:
                    f.write(response.content)
                return True
        except Exception as e:
            print(f"Error downloading image: {e}")
        return False
    
    def create_presentation(self, topic, content_data, output_filename):
        """Create PowerPoint presentation"""
        print(f"📊 Creating presentation: {output_filename}")
        
        # Create presentation object
        prs = Presentation()
        
        # Set slide size (16:9 aspect ratio)
        prs.slide_width = Inches(13.33)
        prs.slide_height = Inches(7.5)
        
        # Create title slide
        self.create_title_slide(prs, topic)
        
        # Create content slides
        for i, point in enumerate(content_data['key_points']):
            self.create_content_slide(prs, point, content_data['details'].get(point, ""), topic, i)
        
        # Create conclusion slide
        self.create_conclusion_slide(prs, topic)
        
        # Save presentation
        prs.save(output_filename)
        print(f"✅ Presentation saved as: {output_filename}")
        
        return output_filename
    
    def create_title_slide(self, prs, topic):
        """Create title slide"""
        slide_layout = prs.slide_layouts[0]  # Title slide layout
        slide = prs.slides.add_slide(slide_layout)
        
        # Set title
        title = slide.shapes.title
        title.text = topic.title()
        
        # Format title
        title_para = title.text_frame.paragraphs[0]
        title_para.font.size = Pt(44)
        title_para.font.bold = True
        title_para.font.color.rgb = RGBColor(0, 102, 204)
        
        # Set subtitle
        subtitle = slide.placeholders[1]
        subtitle.text = f"Comprehensive Overview\nGenerated on {time.strftime('%B %d, %Y')}"
        
        # Format subtitle
        for paragraph in subtitle.text_frame.paragraphs:
            paragraph.font.size = Pt(18)
            paragraph.font.color.rgb = RGBColor(68, 68, 68)
        
        # Search and add background image
        images = self.search_images(f"{topic} background", 1)
        if images:
            self.add_background_image(slide, images[0]['url'])
    
    def create_content_slide(self, prs, title, content, topic, index):
        """Create content slide with image"""
        slide_layout = prs.slide_layouts[1]  # Title and content layout
        slide = prs.slides.add_slide(slide_layout)
        
        # Set title
        slide.shapes.title.text = title
        
        # Format title
        title_para = slide.shapes.title.text_frame.paragraphs[0]
        title_para.font.size = Pt(32)
        title_para.font.bold = True
        title_para.font.color.rgb = RGBColor(0, 102, 204)
        
        # Add content text
        content_placeholder = slide.placeholders[1]
        content_placeholder.text = content
        
        # Format content
        for paragraph in content_placeholder.text_frame.paragraphs:
            paragraph.font.size = Pt(18)
            paragraph.font.color.rgb = RGBColor(68, 68, 68)
            paragraph.space_after = Pt(12)
        
        # Search and add relevant image
        search_query = title.replace('?', '').replace('of ' + topic, topic)
        images = self.search_images(search_query, 1)
        
        if images:
            image_url = images[0]['url']
            image_filename = f"temp_image_{index}.jpg"
            
            if self.download_image(image_url, image_filename):
                # Add image to slide
                left = Inches(7)
                top = Inches(2)
                width = Inches(5)
                height = Inches(3.75)
                
                try:
                    slide.shapes.add_picture(image_filename, left, top, width, height)
                    os.remove(image_filename)  # Clean up temp file
                except Exception as e:
                    print(f"Error adding image to slide: {e}")
                    if os.path.exists(image_filename):
                        os.remove(image_filename)
    
    def create_conclusion_slide(self, prs, topic):
        """Create conclusion slide"""
        slide_layout = prs.slide_layouts[1]
        slide = prs.slides.add_slide(slide_layout)
        
        # Set title
        slide.shapes.title.text = "Conclusion"
        
        # Format title
        title_para = slide.shapes.title.text_frame.paragraphs[0]
        title_para.font.size = Pt(36)
        title_para.font.bold = True
        title_para.font.color.rgb = RGBColor(0, 102, 204)
        
        # Add conclusion content
        conclusion_text = f"""
        • {topic} offers significant value and opportunities
        • Understanding key concepts is crucial for implementation
        • Future developments will continue to evolve
        • Thank you for your attention!
        """
        
        content_placeholder = slide.placeholders[1]
        content_placeholder.text = conclusion_text.strip()
        
        # Format content
        for paragraph in content_placeholder.text_frame.paragraphs:
            paragraph.font.size = Pt(20)
            paragraph.font.color.rgb = RGBColor(68, 68, 68)
            paragraph.space_after = Pt(12)
    
    def add_background_image(self, slide, image_url):
        """Add background image to slide"""
        try:
            image_filename = "temp_bg.jpg"
            if self.download_image(image_url, image_filename):
                # Add image as background
                left = Inches(0)
                top = Inches(0)
                width = Inches(13.33)
                height = Inches(7.5)
                
                pic = slide.shapes.add_picture(image_filename, left, top, width, height)
                # Send to back
                slide.shapes._spTree.remove(pic._element)
                slide.shapes._spTree.insert(2, pic._element)
                
                os.remove(image_filename)
        except Exception as e:
            print(f"Error adding background image: {e}")
    
    def generate_presentation(self, topic):
        """Main method to generate presentation"""
        print(f"🚀 Starting presentation generation for: {topic}")
        
        # Create output directory
        output_dir = "presentations"
        os.makedirs(output_dir, exist_ok=True)
        
        # Search for content
        content_data = self.search_web_content(topic)
        
        # Create presentation filename
        safe_topic = "".join(c for c in topic if c.isalnum() or c in (' ', '-', '_')).rstrip()
        filename = f"{output_dir}/{safe_topic.replace(' ', '_')}_presentation.pptx"
        
        # Generate presentation
        self.create_presentation(topic, content_data, filename)
        
        print(f"🎉 Presentation generated successfully!")
        print(f"📁 File saved as: {filename}")
        
        return filename

def main():
    """Main function"""
    print("=" * 60)
    print("🎯 AUTOMATED POWERPOINT GENERATOR")
    print("=" * 60)
    
    # Initialize generator
    generator = PowerPointGenerator()
    
    # Setup API keys (optional but recommended)
    generator.setup_api_keys()
    
    # Get topic from user
    print("\n" + "=" * 60)
    topic = input("📝 Enter the topic for your presentation: ").strip()
    
    if not topic:
        print("❌ No topic provided. Exiting...")
        return
    
    try:
        # Generate presentation
        filename = generator.generate_presentation(topic)
        
        print("\n" + "=" * 60)
        print("✅ GENERATION COMPLETE!")
        print(f"📄 File: {filename}")
        print(f"🔗 Repository: https://github.com/Abhisheksingh17cyber/PowerPoint-presentation.git")
        print("=" * 60)
        
        # Instructions for GitHub
        print("\n📋 NEXT STEPS:")
        print("1. Copy the generated .pptx file to your GitHub repository")
        print("2. git add .")
        print("3. git commit -m 'Add presentation for " + topic + "'")
        print("4. git push origin main")
        
    except Exception as e:
        print(f"❌ Error generating presentation: {e}")
        print("Please check your API keys and internet connection.")

if __name__ == "__main__":
    # Required packages installation check
    required_packages = ['python-pptx', 'requests', 'Pillow']
    
    print("📦 Required packages:", ", ".join(required_packages))
    print("💡 Install with: pip install " + " ".join(required_packages))
    print()
    
    main()
