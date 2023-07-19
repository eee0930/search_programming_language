import { createElement } from "./hooks/createElement.js";
import { removeChildNode } from "./hooks/removeChildNode.js";
import SelectedLanguage from "./SelectedLanguage.js";
import SearchInput from "./SearchInput.js";
import Suggestion from "./Suggestion.js";

class App {
  constructor($target) {
    this.$target = document.querySelector($target);
    this.selL;
    this.searchI;
    this.suggestion;
    this.selectedList = [];
    this.render();
  }

  render = () => {
    const $SelectedLanguage = createElement("div", "SelectedLanguage");
    const $SearchInput = createElement("form", "SearchInput");
    this.selL = new SelectedLanguage({ $target: $SelectedLanguage });
    this.searchI = new SearchInput({
      $target: $SearchInput,
      callbackResult: this.settingSuggestionList,
      callbackSelected: this.settingNowSelected,
      callbackEnter: this.handleSelectedEnter,
    });
    this.$target.append($SelectedLanguage, $SearchInput);
  };

  // SearchInput.js
  settingSuggestionList = () => {
    const searchValue = this.searchI.getSearchValue();
    if (document.querySelector(".Suggestion")) {
      document.querySelector(".Suggestion").remove();
    }
    if (searchValue.length > 0) {
      const $Suggestion = createElement("div", "Suggestion");
      const sugestionList = this.searchI.getSuggestionList();
      removeChildNode($Suggestion);
      this.suggestion = new Suggestion({
        $target: $Suggestion,
        searchValue: searchValue,
        suggestions: sugestionList,
        callback: this.settingSelectedList,
      });
      this.$target.append($Suggestion);
    }
  };

  // SearchInput.js
  settingNowSelected = () => {
    const nowIndex = this.searchI.getNowIndex();
    this.suggestion.setNowIndex(nowIndex);
    this.suggestion.handleKeyPoint();
  };

  // SearchInput.js
  handleSelectedEnter = () => {
    this.suggestion.handleSelected();
  };

  // Suggestion.js
  settingSelectedList = () => {
    const value = this.suggestion.getNowValue();
    if (this.selectedList.includes(value)) {
      const idx = this.selectedList.indexOf(value);
      this.selectedList.splice(idx, 1);
    } else {
      if (this.selectedList.length === 5) {
        this.selectedList.shift();
      }
    }
    this.selectedList.push(value);
    this.selL.setSelectedList(this.selectedList);
    this.selL.render();
  };
}

export default App;
