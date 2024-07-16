# encode_favicon.py
from PIL import Image

def encode_data(data, output_file='favicon.ico'):
    binary_data = ''.join(format(ord(i), '08b') for i in data)
    
    img = Image.new('RGB', (32, 32), color = 'red')
    pixels = img.load()
    
    for i in range(min(len(binary_data), 32*32)):
        x, y = i % 32, i // 32
        r, g, b = pixels[x, y]
        pixels[x, y] = (r, g, b & 254 | int(binary_data[i]))
    
    img.save(output_file)

encode_data("ARXIQWQDM_79dFJEBCEBKBQ")