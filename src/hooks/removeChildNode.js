export function removeChildNode($ele) {
  while ($ele.firstChild) {
    $ele.removeChild($ele.firstChild);
  }
}
