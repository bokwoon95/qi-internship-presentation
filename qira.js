"use strict";

let draggedElement = null;

function elDragstart(event) {
  const el = event.currentTarget;
  setTimeout(function() {
    el.classList.add("el-ghost");
  }, 0);
  draggedElement = el;
}

function elDragend(event) {
  const el = event.currentTarget;
  el.classList.remove("el-ghost");
  draggedElement = null;
}

function elDragover(event) {
  const el = event.currentTarget;
  const parent = el.parentNode;
  const boundingRect = el.getBoundingClientRect();
  if (!draggedElement) {
    return;
  }
  if (el === draggedElement) {
    return;
  } else if (el === parent.firstElementChild) {
    parent.insertBefore(draggedElement, el);
  } else if (el === parent.lastElementChild) {
    parent.insertBefore(draggedElement, el.nextElementSibling);
  } else if (el.nextElementSibling === draggedElement) {
    parent.insertBefore(draggedElement, el);
  } else if (el === draggedElement.nextElementSibling) {
    parent.insertBefore(draggedElement, el.nextElementSibling);
  } else if (event.pageY - boundingRect.bottom < boundingRect.top - event.pageY) {
    parent.insertBefore(draggedElement, el);
  } else {
    parent.insertBefore(draggedElement, el.nextElementSibling);
  }
}

window.onload = function() {
  for (const sortable of document.querySelectorAll(".sortable")) {
    sortable.classList.add("bg-gray-200");
    sortable.classList.add("pl-4");
    sortable.classList.add("pr-4");
    sortable.classList.add("pb-4");
    for (const sortableEl of sortable.children) {
      sortableEl.setAttribute("draggable", "true");
      sortableEl.classList.add("sortable-el");
      sortableEl.classList.add("mt-4");
      sortableEl.classList.add("min-h-16");
      sortableEl.classList.add("h-auto");
      sortableEl.classList.add("bg-gray-500");
      sortableEl.addEventListener("dragstart", elDragstart);
      sortableEl.addEventListener("dragend", elDragend);
      sortableEl.addEventListener("dragover", elDragover);
    }
  }
};
