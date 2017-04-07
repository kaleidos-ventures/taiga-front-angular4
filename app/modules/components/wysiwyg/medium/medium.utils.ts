export const getIcon = (icon) =>
    `<svg class="icon icon-${icon}">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#${icon}"></use>
    </svg>`;
