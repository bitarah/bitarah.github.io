#!/usr/bin/env python3
"""
Test Project - Main Application
A simple Python application that demonstrates basic data processing.
"""

import json
import os
from datetime import datetime

def load_data(filename):
    """Load data from a JSON file."""
    try:
        with open(filename, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

def save_data(data, filename):
    """Save data to a JSON file."""
    with open(filename, 'w') as file:
        json.dump(data, file, indent=2)

def process_data(data):
    """Process the loaded data."""
    processed = []
    for item in data:
        processed_item = {
            'id': item.get('id', 0),
            'name': item.get('name', 'Unknown'),
            'processed_at': datetime.now().isoformat(),
            'status': 'processed'
        }
        processed.append(processed_item)
    return processed

def main():
    """Main application function."""
    print("🚀 Starting Test Project...")

    # Sample data for demonstration
    sample_data = [
        {'id': 1, 'name': 'Sample Item 1'},
        {'id': 2, 'name': 'Sample Item 2'},
        {'id': 3, 'name': 'Sample Item 3'}
    ]

    # Save sample data
    save_data(sample_data, 'input_data.json')
    print("✅ Sample data created")

    # Load and process data
    data = load_data('input_data.json')
    processed_data = process_data(data)

    # Save processed data
    save_data(processed_data, 'output_data.json')
    print("✅ Data processed and saved")

    print(f"📊 Processed {len(processed_data)} items")
    print("🎉 Test Project completed successfully!")

if __name__ == "__main__":
    main()