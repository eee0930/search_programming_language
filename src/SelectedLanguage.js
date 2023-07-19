import { createElement } from "./hooks/createElement.js";
import { removeChildNode } from "./hooks/removeChildNode.js";

class SelectedLanguage {
  constructor({ $target }) {
    this.$target = $target;
    this.seletedList = [];
  }

  render = () => {
    removeChildNode(this.$target);
    const $ul = createElement("ul");
    this.seletedList.map((selected) => {
      const $li = createElement("li");
      $li.innerText = selected;
      $ul.appendChild($li);
    });
    this.$target.append($ul);
  };

  setSelectedList = (seletedList) => {
    this.seletedList = seletedList;
  };
}

export default SelectedLanguage;

{
  /* <div class="SelectedLanguage">
    <ul>
      <li>JavaScript</li>
      <li>Python</li>
      <li>Elixir</li>
      <li>Java</li>
      <li>PHP</li>
    </ul>
</div> */
}
