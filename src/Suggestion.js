import { createElement } from "./hooks/createElement.js";
import { removeChildNode } from "./hooks/removeChildNode.js";

class Suggestion {
  constructor({ $target, searchValue, suggestions, callback }) {
    this.$target = $target;
    this.searchValue = searchValue;
    this.suggestions = suggestions;
    this.callback = callback;
    this.nowIndex;
    this.nowValue;
    this.render();
  }

  render = () => {
    removeChildNode(this.$target);
    const $ul = this.settingSuggestion();
    this.$target.appendChild($ul);
  };

  settingSuggestion = () => {
    const $ul = createElement("ul");
    const $highlight = `<span class="Suggestion__item--matched">${this.searchValue}</span>`;
    if (this.suggestions.length > 0) {
      this.suggestions.map((sugestion, i) => {
        const $li = createElement("li");
        const regex = new RegExp(this.searchValue, "gi");
        const data = sugestion.replace(regex, $highlight);
        $li.innerHTML = data;
        $li.dataset.idx = i;
        $li.addEventListener("click", this.handleSelected);
        $li.addEventListener("mouseenter", this.handleMouseEnter);
        $ul.appendChild($li);
      });
    }
    return $ul;
  };

  // Suggestion__item--selected
  handleSelected = () => {
    const selected = this.suggestions[this.nowIndex];
    alert(selected);
    this.nowValue = selected;
    this.callback();
  };

  handleMouseEnter = (event) => {
    event.preventDefault();
    const idx = event.target.dataset.idx;
    this.nowIndex = idx;
  };

  handleKeyPoint = () => {
    const $lis = this.$target.querySelectorAll("li");
    $lis.forEach(($li, i) => {
      $li.classList.remove("Suggestion__item--selected");
      if (i === this.nowIndex) {
        $li.classList.add("Suggestion__item--selected");
      }
    });
  };

  setSuggestionList = (suggestions) => {
    this.suggestions = suggestions;
  };

  setNowIndex = (nowIndex) => {
    this.nowIndex = nowIndex;
  };

  getNowValue = () => {
    return this.nowValue;
  };
}

export default Suggestion;
