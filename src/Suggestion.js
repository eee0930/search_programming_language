import { createElement } from "./hooks/createElement.js";
import { removeChildNode } from "./hooks/removeChildNode.js";

class Suggestion {
  constructor({ $target, searchValue, suggestions, callback, callbackHandle }) {
    this.$target = $target;
    this.searchValue = searchValue;
    this.suggestions = suggestions;
    this.callback = callback;
    this.callbackHandle = callbackHandle;
    this.nowIndex;
    this.selectedList = [];
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
    return $ul;
  };

  settingSelectedList = (value) => {
    if (this.selectedList.includes(value)) {
      const idx = this.selectedList.indexOf(value);
      this.selectedList.splice(idx, 1);
    } else {
      if (this.selectedList.length === 5) {
        this.selectedList.shift();
      }
    }
    this.selectedList.push(value);
  };

  // Suggestion__item--selected
  handleSelected = (event) => {
    event.preventDefault();
    const selected = this.suggestions[this.nowIndex];
    alert(selected);
    this.settingSelectedList(selected);
    this.callback();
    this.callbackHandle();
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

  getSelectedList = () => {
    return this.selectedList;
  };
}

export default Suggestion;
