"use strict";

let draggedElement = null;

function dragstart(event) {
  const el = event.currentTarget;
  setTimeout(function() {
    el.classList.add("el-ghost");
  }, 0);
  draggedElement = el;
}

function dragend(event) {
  const el = event.currentTarget;
  el.classList.remove("el-ghost");
  draggedElement = null;
}

function dragover(event) {
  const parent = event.currentTarget;
  const target = event.target;
  const isParent = target => target.classList.contains("sortable");
  const isChild = target => target.classList.contains("sortable-el");
  if (isParent(target)) {
    parent.appendChild(draggedElement);
  } else if (isChild(target)) {
    const boundingRect = target.getBoundingClientRect();
    if (!draggedElement) {
      return;
    }
    if (target === draggedElement) {
      return;
    } else if (target === parent.firstElementChild) {
      parent.insertBefore(draggedElement, target);
    } else if (target === parent.lastElementChild) {
      parent.insertBefore(draggedElement, target.nextElementSibling);
    } else if (target.nextElementSibling === draggedElement) {
      parent.insertBefore(draggedElement, target);
    } else if (target === draggedElement.nextElementSibling) {
      parent.insertBefore(draggedElement, target.nextElementSibling);
    } else if (event.pageY - boundingRect.bottom < boundingRect.top - event.pageY) {
      parent.insertBefore(draggedElement, target);
    } else {
      parent.insertBefore(draggedElement, target.nextElementSibling);
    }
  }
}

window.onload = function() {
  for (const sortable of document.querySelectorAll(".sortable")) {
    sortable.classList.add("bg-gray-200");
    sortable.classList.add("pl-4");
    sortable.classList.add("pr-4");
    sortable.classList.add("pb-4");
    sortable.addEventListener("dragover", dragover);
    for (const sortableEl of sortable.children) {
      sortableEl.setAttribute("draggable", "true");
      sortableEl.classList.add("sortable-el");
      sortableEl.classList.add("mt-2");
      sortableEl.classList.add("h-auto");
      sortableEl.classList.add("bg-white");
      sortableEl.classList.add("p-4");
      sortableEl.addEventListener("dragstart", dragstart);
      sortableEl.addEventListener("dragend", dragend);
    }
  }
};
