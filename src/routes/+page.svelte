Home

{#each [16, 32, 48, 64, 96] as height}
    <div>
        <img alt="website favicon" src="/svg/favicon-s.svg" {height} style:margin-right="{128 - height}px"/>
        <img alt="website large favicon" src="/svg/favicon-m.svg" {height} style:margin-right="{32 + 3 * (96 - height)}px"/>
        <img alt="website favicon with a background" src="/svg/favicon-s.svg?bg=true" {height} style:margin-right="{128 - height}px"/>
        <img alt="website large favicon with a background" src="/svg/favicon-m.svg?bg=true" {height}/>
    </div>
{/each}