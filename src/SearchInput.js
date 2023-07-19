import { createElement } from "./hooks/createElement.js";
import { fetchSearchResult } from "./api.js";

class SearchInput {
  constructor({ $target, callbackResult, callbackSelected, callbackEnter }) {
    this.$target = $target;
    this.callbackResult = callbackResult;
    this.callbackSelected = callbackSelected;
    this.callbackEnter = callbackEnter;
    this.$input;
    this.value;
    this.suggetionList = [];
    this.nowIndex = -1;
    this.isAutoSearch = false; // keyDown, up press 여부
    this.render();
  }

  render = () => {
    this.$target.addEventListener("enter", this.handleEnter);
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

  handleInputQuery = (event) => {
    event.preventDefault();
    this.isAutoSearch = false;
    const { value } = event.target;
    let searchTimer;
    searchTimer = setTimeout(() => {
      this.getSearchResult(value);
      this.value = value;
      clearTimeout(searchTimer);
    }, 1000);
  };

  handleKeyup = (event) => {
    event.preventDefault();
    const { key } = event;
    if (key === "ArrowUp") {
      this.isAutoSearch = true;
      this.nowIndex -= 1;
      if (this.nowIndex < 0) {
        this.nowIndex = this.suggetionList.length - 1;
      }
    } else if (key === "ArrowDown") {
      this.isAutoSearch = true;
      this.nowIndex += 1;
      if (this.nowIndex > this.suggetionList.length - 1) {
        this.nowIndex = 0;
      }
    } else {
      this.nowIndex = -1;
    }
    if (this.isAutoSearch) {
      // if (key === "Enter") {
      //   event.preventDefault();
      //   this.callbackEnter();
      // }
      this.callbackSelected();
    }
  };

  handleEnter = (event) => {
    event.preventDefault();
    if (this.isAutoSearch) {
      this.callbackEnter();
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
