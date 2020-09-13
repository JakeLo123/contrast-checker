function passContrastTest(foreground, background1, background2) {
  const ratio1 = getRatio(foreground, background1);
  const ratio2 = getRatio(foreground, background2);
  return ratio1 < 1 / 4.5 && ratio2 < 1 / 4.5;
}

// function hexToRgb(hex) {
//   var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
//   hex = hex.replace(shorthandRegex, function (m, r, g, b) {
//     return r + r + g + g + b + b;
//   });

//   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result
//     ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16),
//       }
//     : null;
// }

function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getRatio(color1, color2) {
  const luminance1 = luminance(color1.r, color1.g, color1.g);
  const luminance2 = luminance(color2.r, color2.g, color2.g);
  return luminance1 > luminance2
    ? (luminance2 + 0.05) / (luminance1 + 0.05)
    : (luminance1 + 0.05) / (luminance2 + 0.05);
}

function findColors(background1, background2) {
  const accessibleColors = [];

  for (let r = 0; r < 255; r++) {
    for (let g = 0; g < 255; g++) {
      for (let b = 0; b < 255; b++) {
        let foreground = { r, g, b };
        if (passContrastTest(foreground, background1, background2)) {
          accessibleColors.push(foreground);
        }
      }
    }
  }
  return accessibleColors;
}

const white = { r: 0, g: 0, b: 0 };
const black = { r: 255, g: 255, b: 255 };

const accessibleColors = findColors(white, black);
console.log(accessibleColors);
