# GitHub Project Template for Dynamic Portfolio Integration

This template provides instructions for setting up GitHub repositories to work seamlessly with the dynamic Side Projects section of your portfolio website.

## Overview

Your portfolio's Side Projects page fetches repositories dynamically from the GitHub API and displays them with enhanced metadata. To ensure your projects display correctly with rich information, follow this template structure.

## Required Files Structure

```
your-project/
├── README.md                 # Main project description
├── .github/
│   └── project-meta.yml     # Portfolio metadata (optional)
├── docs/                    # Documentation (optional)
│   ├── SETUP.md            # Setup instructions
│   ├── USAGE.md            # Usage guide
│   └── EXAMPLES.md         # Examples/demos
├── screenshots/             # Visual assets (optional)
│   ├── demo.png
│   ├── screenshot1.png
│   └── preview.gif
└── [your project files]
```

## 1. README.md Template

Your README.md should follow this structure for optimal display:

```markdown
# Project Name

<!-- Badges (optional but recommended) -->
![Language](https://img.shields.io/github/languages/top/yourusername/reponame)
![License](https://img.shields.io/github/license/yourusername/reponame)
![Stars](https://img.shields.io/github/stars/yourusername/reponame)

## Description

A clear, concise description of what your project does. This will be used as the project description in your portfolio.

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Technologies Used

List the main technologies, frameworks, and tools used:
- Python/JavaScript/etc.
- Framework name
- Database/tools used
- Any AI/ML libraries

## Demo

If you have a live demo, include the link here:
[Live Demo](https://your-demo-url.com)

## Screenshots

![Demo Screenshot](screenshots/demo.png)

## Quick Start

```bash
# Installation commands
git clone https://github.com/yourusername/reponame.git
cd reponame
# Setup commands
```

## Detailed Documentation

- [Setup Guide](docs/SETUP.md)
- [Usage Instructions](docs/USAGE.md)
- [Examples](docs/EXAMPLES.md)

## Contributing

Instructions for contributors (if applicable).

## License

[License Type] - see [LICENSE](LICENSE) file for details.
```

## 2. .github/project-meta.yml (Optional)

Create this file to provide additional metadata for your portfolio display:

```yaml
# Portfolio Display Metadata
portfolio:
  # Display category (will group projects)
  category: "Machine Learning" # or "Web Development", "Data Science", "Mobile App", etc.

  # Featured project (will be highlighted)
  featured: true # or false

  # Difficulty/complexity level
  complexity: "intermediate" # beginner, intermediate, advanced

  # Project status
  status: "completed" # completed, in-progress, archived

  # Custom tags for filtering (in addition to GitHub topics)
  tags:
    - "computer-vision"
    - "pytorch"
    - "real-time"

  # Demo information
  demo:
    url: "https://your-demo-url.com"
    type: "web" # web, video, images
    screenshots:
      - "screenshots/demo.png"
      - "screenshots/screenshot1.png"

  # Development timeline
  timeline:
    started: "2024-01-15"
    completed: "2024-03-20"
    duration: "2 months"

  # Additional context
  context: "Academic project for computer vision course"
  highlight: "Achieved 95% accuracy on custom dataset"
```

## 3. Documentation Files

### docs/SETUP.md Template

```markdown
# Setup Instructions

## Prerequisites

List all prerequisites:
- Python 3.8+
- Node.js 16+
- Required system dependencies

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/reponame.git
cd reponame
```

### 2. Install Dependencies
```bash
# Python projects
pip install -r requirements.txt

# Node.js projects
npm install

# Other dependencies
```

### 3. Configuration
```bash
# Environment setup
cp .env.example .env
# Edit .env with your configurations
```

### 4. Database Setup (if applicable)
```bash
# Database initialization commands
```

## Verification

How to verify the setup worked:
```bash
# Test commands
```

## Troubleshooting

Common issues and solutions.
```

### docs/USAGE.md Template

```markdown
# Usage Guide

## Basic Usage

How to use your project:

```bash
# Basic command examples
python main.py --input data.csv
```

## Advanced Features

Detailed explanation of advanced functionality.

## API Reference (if applicable)

Document your API endpoints or function signatures.

## Configuration Options

Explain available configuration options.

## Examples

Link to examples or provide inline examples.
```

### docs/EXAMPLES.md Template

```markdown
# Examples

## Example 1: Basic Usage

Description and code example.

## Example 2: Advanced Feature

Description and code example.

## Example 3: Integration

How to integrate with other tools/projects.

## Demo Videos/Images

Links to demo content.
```

## 4. GitHub Repository Configuration

### Topics/Tags
Add relevant topics to your GitHub repository:
- Go to your repo → Settings → Topics
- Add relevant tags like: `machine-learning`, `python`, `computer-vision`, `api`, `web-app`, etc.

### Repository Description
Write a clear, one-line description that summarizes your project.

### Repository Settings
- Ensure repository is public
- Add a meaningful repository description
- Include a website URL if you have a demo
- Set up GitHub Pages if applicable

## 5. File Naming Conventions

- Use clear, descriptive file names
- Screenshots should be in `screenshots/` folder
- Documentation in `docs/` folder
- Use consistent naming: `screenshot1.png`, `demo.gif`, etc.

## 6. Image Guidelines

### Screenshots
- Recommended size: 1200x800px or similar 3:2 ratio
- Format: PNG for screenshots, GIF for animations
- File size: Keep under 2MB for faster loading
- Name descriptively: `dashboard-view.png`, `login-flow.gif`

### Demo Content
- If you have a video demo, consider converting key parts to GIF
- Include before/after comparisons where relevant
- Show the actual interface/output, not just code

## 7. Portfolio Integration Notes

The portfolio's Side Projects page will:

1. **Fetch repositories** from your GitHub account
2. **Display repository information** including:
   - Repository name and description
   - Primary language
   - Star count and last updated
   - Topics/tags
3. **Use README.md** content for detailed project information
4. **Show screenshots** from the screenshots folder
5. **Link to live demos** if provided
6. **Filter by language** and other criteria

## 8. Best Practices

### For Better Portfolio Display:
- Use clear, professional project names
- Write concise but informative descriptions
- Include relevant technologies in topics
- Add screenshots showing your project in action
- Keep repositories updated
- Use meaningful commit messages
- Add proper licensing

### For Professional Presentation:
- Ensure code is well-commented
- Include unit tests where applicable
- Use consistent code formatting
- Remove any sensitive information
- Add contribution guidelines for open-source projects

## 9. Example Implementation

Here's how to apply this template to an existing project:

```bash
# 1. Navigate to your project
cd your-existing-project

# 2. Create required directories
mkdir -p .github docs screenshots

# 3. Create template files
touch .github/project-meta.yml
touch docs/SETUP.md docs/USAGE.md docs/EXAMPLES.md

# 4. Update README.md following the template
# 5. Add screenshots to screenshots/
# 6. Commit and push changes
git add .
git commit -m "Add portfolio integration templates and documentation"
git push origin main
```

## 10. Quick Checklist

Before your project appears well in the portfolio:

- [ ] README.md follows template structure
- [ ] Repository has clear description and topics
- [ ] Screenshots added to screenshots/ folder
- [ ] Documentation files created (optional but recommended)
- [ ] project-meta.yml configured (optional)
- [ ] Repository is public
- [ ] Demo link added (if applicable)
- [ ] Code is clean and commented
- [ ] All sensitive data removed

---

## Usage Instructions

1. **For new projects**: Use this template from the start
2. **For existing projects**: Apply this template structure to improve portfolio display
3. **Provide this file to Claude Code**: When working on projects, share this template so Claude can help set up the proper structure

This template ensures your GitHub projects will display beautifully in your portfolio's dynamic Side Projects section with rich metadata, proper documentation, and professional presentation.