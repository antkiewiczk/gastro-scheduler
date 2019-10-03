import { darken, lighten } from 'polished';

// colors
const bgColor = '#ebebeb';
const fontColor = '#02021e';
const lightFontColor = lighten(0.2, fontColor);

const button = '#27279f';
const buttonHover = darken(0.15, button);

// breakpoints
const belowLarge = '(max-width: 1800px)';
const belowDesktop = '(max-width: 1280px)';
const belowTablet = '(max-width: 768px)';
const belowPhablet = '(max-width: 520px)';

const aboveDesktop = '(min-width: 1280px)';
const aboveTablet = '(min-width: 768px)';
const abovePhablet = '(min-width: 520px)';
const aboveMobile = '(min-width: 320px)';

export {
  bgColor, fontColor, lightFontColor, button, buttonHover, belowLarge, belowDesktop, belowTablet, belowPhablet, aboveDesktop, aboveTablet, abovePhablet, aboveMobile,
};
