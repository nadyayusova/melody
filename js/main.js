$(document).ready(function () {
  const MIN_FLOOR = 2;
  const MAX_FLOOR = 18;
  var currentFloor = MIN_FLOOR;
  var allFloorPaths = $(".page-main__house-img path"); // все пути в svg
  var counterBtnUp = $(".counter__button--up"); // кнопка  увеличения этажа
  var counterBtnDown = $(".counter__button--down"); // кнопка уменьшения этажа

  // при наведении мыши на этаж
  allFloorPaths.on("mouseover", function () {
    allFloorPaths.removeClass("current-floor");
    currentFloor = $(this).attr("data-floor");
    $(".counter__floor-number").text(currentFloor);
  });

  counterBtnUp.on("click", function () {
    if (currentFloor < MAX_FLOOR) {
      currentFloor++;
      drawFloorNumber();
    }
  });

  counterBtnDown.on("click", function () {
    if (currentFloor > MIN_FLOOR) {
      currentFloor--;
      drawFloorNumber();
    }
  });

  function drawFloorNumber() {
    usCurrentFloor = currentFloor.toLocaleString("en-US", {
      // форматирование значения этажа, чтобы был лидирующий 0
      minimumIntegerDigits: 2,
      useGroupping: false,
    });
    $(".counter__floor-number").text(usCurrentFloor);
    allFloorPaths.removeClass("current-floor");
    $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor");
  }
});
