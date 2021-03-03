
$(".slider").slider({
  animate: "0.3",
  max: 255,
  min: 0,
  value: 127,
  range: "min",
  slide: handleSliderColor(setBGColor, [127,127,127])
});

$(".switch-color-control").button()


/**
 * Принимает показания слайдеров, и собирает их в строку вида 'rgb(xxx, xxx, xxx)', и передает в коллбек "cb"
 * ..наверно следовало разделить на две функции
 * @param {function} cb - callback 
 * @param {number[]} initialRGBColorArr - array RGB like
 */
function handleSliderColor(cb, initialRGBColorArr) {
  const rgbChannels = initialRGBColorArr;
  return function(ev, ui) {
    $(this).is($("#red"))
      ? rgbChannels[0] = ui.value
    : $(this).is($("#green"))
      ? rgbChannels[1] = ui.value
    : $(this).is($("#blue"))
      ? rgbChannels[2] = ui.value
      : console.warn("Just do refactoring");
    
    cb(`rgb(${rgbChannels.toString()})`)
  }
}

/**
 * Из строки вида 'rgb(xxx, xxx, xxx)' забирает числа в массив, альфа-канал игнорирует
 * @param {string} rgbStr - RGB(RGBA) like string
 */
function rgbStringToArray(rgbStr) {
  return rgbStr.match(/rgba?\((\d+), ?(\d+), ?(\d+).*\)/).slice(1);
}

/**
 * Крутит слайдеры в цвет
 * @param {number[]} rgbColorArr - values of rgb channels
 */
function setSliderColor(rgbColorArr) {
  $("#red.slider").slider("value", rgbColorArr[0])
  $("#green.slider").slider("value", rgbColorArr[1])
  $("#blue.slider").slider("value", rgbColorArr[2])
}

// Переключает слайдеры, и крутит их как надо ;) 
$(".switch-color-control").change(ev => {
  if (ev.target.value == "bg-color") {

    const rgbArr = rgbStringToArray($("#preview-bg").css("background-color"));
    setSliderColor(rgbArr);
    $('.slider').slider("option", { slide: handleSliderColor(setBGColor, rgbArr) });

  } else if (ev.target.value == "text-color") {

    const rgbArr = rgbStringToArray($("#preview-text").css("color"));
    setSliderColor(rgbArr);
    $('.slider').slider("option", { slide: handleSliderColor(setTextColor, rgbArr) });

  } else {
    console.warn("Just do refactoring");
  }
})

function setBGColor(color) {
  $("#preview-bg").css("background-color", color)
}

function setTextColor(color) {
  $("#preview-text").css("color", color)
}
