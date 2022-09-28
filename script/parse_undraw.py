import os
import re

 
path = "."
SVG_START = r'''<script lang="ts">
    import Svg from "./Svg.svelte";

    export let alt: string;
    export let maxwidth: number | undefined = undefined;
    export let maxheight: number | undefined = undefined;
</script>

<Svg format={[\1, \2]} {alt} {maxwidth} {maxheight}>'''
SVG_END = '</Svg>'
 
list = []
colors = []

for (root, dirs, file) in os.walk(path):
    for f in file:
        if '.svg' in f:
            list.append(f)

print(list)

for file in list:
    with open(file, mode='r') as svg:
        svg_content = svg.read()
        svg_content = re.sub(r'(id|name|data-name)="[^"]*" ', '', svg_content)
        svg_content = re.sub(r'>', '>\n', svg_content)
        svg_content = re.sub(r'(\d\.\d\d)\d*', r'\1', svg_content)
        svg_content = re.sub(r'<svg[^>]*viewBox="0 0 (\d+\.?\d*) (\d+\.?\d*)"[^>]*>', SVG_START, svg_content)
        svg_content = re.sub(r'<\/svg>', SVG_END, svg_content)
        svg_content = re.sub(r'#(A32AFD|a32afd|6c63ff|6C63FF)', 'currentColor', svg_content)

        colors.extend(re.findall(r'#.{6}', svg_content))

        file_name = re.sub(r'undraw_', '', file)
        file_name = re.sub(r'_re_.*', '', file_name)
        file_name = re.sub(r'_[^_]{1,10}svg', '', file_name)
        file_name = "".join(n[0].upper() + n[1:] for n in file_name.split("_")) + '.svelte'

        with open(os.path.join('../src/lib/components/svg/', file_name), mode='w') as svelte:
            svelte.write(svg_content)
            print(file_name)

# print(set(colors))
print('DONE')
