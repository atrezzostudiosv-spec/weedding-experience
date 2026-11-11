import { initAtrezzoMotion } from "./atrezzo-motion.js";
// Enhances only elements explicitly marked data-am-*. The approved navigation,
// page VEIL, directional buttons and Expand 01 retain their own original engines.
window.atrezzoMotion = initAtrezzoMotion(document);
