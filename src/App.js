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
    });
    this.$target.append($SelectedLanguage, $SearchInput);
  };

  // SearchInput.js
  settingSuggestionList = () => {
    if (document.querySelector(".Suggestion")) {
      document.querySelector(".Suggestion").remove();
    }
    const $Suggestion = createElement("div", "Suggestion");
    const value = this.searchI.getSearchValue();
    const sugestionList = this.searchI.getSuggestionList();
    removeChildNode($Suggestion);
    this.suggestion = new Suggestion({
      $target: $Suggestion,
      searchValue: value,
      suggestions: sugestionList,
      callback: this.settingSelectedList,
      callbackHandle: this.renderSuggestionList,
    });
    this.$target.append($Suggestion);
  };

  // SearchInput.js
  settingNowSelected = () => {
    const nowIndex = this.searchI.getNowIndex();
    this.suggestion.setNowIndex(nowIndex);
    this.suggestion.handleKeyPoint();
  };

  // Suggestion.js
  settingSelectedList = () => {
    const selectedList = this.suggestion.getSelectedList();
    this.selL.setSelectedList(selectedList);
  };

  // Suggestion.js
  renderSuggestionList = () => {
    this.selL.render();
  };
}

export default App;
