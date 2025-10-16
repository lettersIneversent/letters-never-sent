import os
import re

# Loop through all files in current directory
for filename in os.listdir('.'):
    # Only process .html files
    if filename.lower().endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as file:
            html = file.read()
        
        # Fix href="/something" → href="something"
        html = re.sub(r'href="/', 'href="', html)
        # Fix src="/something" → src="something"
        html = re.sub(r'src="/', 'src="', html)
        
        with open(filename, 'w', encoding='utf-8') as file:
            file.write(html)

print("All HTML files updated for GitHub Pages links!")
