import json
import os
import re

 
path = "../../lucide/icons"
 
list = []
svgs = []

for (root, dirs, file) in os.walk(path):
    for f in file:
        if '.svg' in f:
            list.append(f)

print(list)

for file in list:
    with open(os.path.join(path, file), mode='r') as svg:
        svg_content = svg.read()
        svg_content = re.sub(r'\n', '', svg_content)
        svg_content = re.sub(r'<svg[^>]*>', '', svg_content)
        svg_content = re.sub(r'<\/svg>', '', svg_content)
        svg_content = re.sub(r'(\d\.\d\d)\d*', r'\1', svg_content)
        svg_content = re.sub(r'> ', r'>', svg_content)
        svg_content = re.sub(r' <', r'<', svg_content)

        file_name = file
        file_name = re.sub(r'.svg', '', file_name)

        svgs.append({
            "name": file_name,
            "path": svg_content
        })


print(json.dumps(svgs))


with open('./output.json', mode='w') as svelte:
    svelte.write(json.dumps(svgs))

# print(set(colors))
print('DONE')
