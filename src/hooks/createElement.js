export function createElement(ele, classNode) {
  const $ele = document.createElement(ele);
  if (classNode) {
    if (typeof classNode === "string") {
      $ele.className = classNode;
    } else {
      $ele.className = classNode.join(" ");
    }
  }
  return $ele;
}
