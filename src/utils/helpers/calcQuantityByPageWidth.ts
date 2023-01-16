import {
  CARDS_QUANTITY_DESKTOP,
  CARDS_QUANTITY_MOBILE,
  CARDS_QUANTITY_TABLET,
  DESKTOP_BREAKPOINT,
  TABLET_BREAKPOINT
} from "../constants";

export const calcQuantityByPageWidth = () => {
  const pageWidth = document.documentElement.clientWidth;
  if (pageWidth > DESKTOP_BREAKPOINT) {
    return CARDS_QUANTITY_DESKTOP;
  }
  if (pageWidth > TABLET_BREAKPOINT) {
    return CARDS_QUANTITY_TABLET;
  }
  return CARDS_QUANTITY_MOBILE;
};