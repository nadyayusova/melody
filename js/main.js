$(document).ready(function () {
  const MIN_FLOOR = 2;
  const MAX_FLOOR = 18;
  var currentFloor = MIN_FLOOR;
  var allHousePaths = $(".page-main__house-img path"); // все пути в svg с домом
  var counterBtnUp = $(".counter__button--up"); // кнопка  увеличения этажа
  var counterBtnDown = $(".counter__button--down"); // кнопка уменьшения этажа
  var viewFlatsBtn = $(".page-main__btn-select"); // кнопка выбора этажа для просмотра
  var modal = $(".modal"); // модальное окно
  var modalCloseBtn = $(".modal__close-btn"); // кнопка закрытия модального окна
  var currentFlat = 1;
  var allFloorPaths = $(".modal__flats-img path"); // все пути в svg с этажом
  var flatsList = $(".modal__flats-list"); // список с квартирами
  var allFlatsItems = $(".flats-list__item"); // все элементы списка квартир

  // при наведении мыши на этаж
  allHousePaths.on("mouseover", function () {
    allHousePaths.removeClass("current-floor");
    currentFloor = $(this).attr("data-floor");
    $(".selected-floor").text(currentFloor);
  });

  allHousePaths.on("click", toggleModal);
  modalCloseBtn.on("click", toggleModal);
  viewFlatsBtn.on("click", toggleModal);

  function toggleModal() {
    modal.toggleClass("is-opened");
  };

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
    $(".selected-floor").text(usCurrentFloor);
    allHousePaths.removeClass("current-floor");
    $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor");
  }

  // при наведении мыши на квартиру
  allFloorPaths.on("mouseover", function () {
    allFloorPaths.removeClass("current-flat");
    allFlatsItems.removeClass("current-flat");
    currentFlat = $(this).attr("data-flat"); // получили номер для элемента списка квартир
    $(`.flats-list__item:nth-child(${currentFlat})`).toggleClass("current-flat"); // добавить класс к li с соотв. порядковым номером
  });

  allFloorPaths.on("mouseout", function () {
    allFlatsItems.removeClass("current-flat");
  });

  flatsList.on("mouseover", ".flats-list__item", function () {
    currentFlat = $(this).index() + 1;
    allFloorPaths.removeClass("current-flat");
    $(`[data-flat=${currentFlat}]`).toggleClass("current-flat");
  });

  flatsList.on("mouseout", function () {
    allFloorPaths.removeClass("current-flat");
  });
});
