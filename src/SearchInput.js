import { createElement } from "./hooks/createElement.js";
import { fetchSearchResult } from "./api.js";

class SearchInput {
  constructor({ $target, callbackResult, callbackSelected }) {
    this.$target = $target;
    this.callbackResult = callbackResult;
    this.callbackSelected = callbackSelected;
    this.$input;
    this.suggestion;
    this.value;
    this.suggetionList = [];
    this.nowIndex = -1;
    this.isAutoSearch = false;
    this.render();
  }

  render = () => {
    this.settingSearchInput();
    this.$target.appendChild(this.$input);
    this.$input.focus();
  };

  settingSearchInput = () => {
    this.$input = createElement("input", "SearchInput__input");
    this.$input.type = "text";
    this.$input.placeholder = "프로그램 언어를 입력하세요.";
    this.$input.addEventListener("input", this.handleInputQuery);
    this.$input.addEventListener("keyup", this.handleKeyup);
  };

  getSearchResult = async (query) => {
    this.suggetionList = await fetchSearchResult(query);
    this.callbackResult();
  };

  handleInputQuery = (e) => {
    e.preventDefault();
    this.isAutoSearch = false;
    const { value } = e.target;
    let searchTimer;
    searchTimer = setTimeout(() => {
      this.getSearchResult(value);
      this.value = value;
      clearTimeout(searchTimer);
    }, 1000);
  };

  handleKeyup = (e) => {
    e.preventDefault();
    const keyCode = e.key;
    if (keyCode === "ArrowUp") {
      this.isAutoSearch = true;
      this.nowIndex -= 1;
      if (this.nowIndex < 0) {
        this.nowIndex = this.suggetionList.length - 1;
      }
    } else if (keyCode === "ArrowDown") {
      this.isAutoSearch = true;
      this.nowIndex += 1;
      if (this.nowIndex > this.suggetionList.length - 1) {
        this.nowIndex = 0;
      }
    } else {
      this.nowIndex = -1;
    }
    if (this.isAutoSearch) {
      if (keyCode == "Enter") {
        e.preventDefault();
        this.suggestion.handleSelected();
      }
      this.callbackSelected();
    }
  };

  getNowIndex = () => {
    return this.nowIndex;
  };

  getSuggestionList = () => {
    return this.suggetionList;
  };

  getSearchValue = () => {
    return this.value;
  };
}

export default SearchInput;

{
  /* <form class="SearchInput">
  <input type="text" class="SearchInput__input" placeholder="프로그램 언어를 입력하세요." value="javascript" />
</form> */
}
