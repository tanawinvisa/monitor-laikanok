import os

def rename_images(directory):
    # Get a list of all files in the directory
    files = os.listdir(directory)
    
    # Filter out only image files (assuming jpg format)
    images = [file for file in files if file.lower().endswith('.jpg')]
    
    # Sort the images to ensure consistent renaming order
    images.sort()
    
    # Rename the images
    for index, filename in enumerate(images, start=1):
        # Construct new file name
        new_filename = f'img{index}.jpg'
        
        # Get full file paths
        old_file = os.path.join(directory, filename)
        new_file = os.path.join(directory, new_filename)
        
        # Rename the file
        os.rename(old_file, new_file)
        print(f'Renamed: {old_file} -> {new_file}')

# Specify the directory containing the images
directory = './img'

# Call the function to rename images
rename_images(directory)
