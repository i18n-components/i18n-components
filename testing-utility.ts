export class TestUtils {
  /**
   * @param  {HTMLInputElement} el
   * @returns number
   */
  static getCaret(el: HTMLInputElement): number {
    if (el.selectionStart) {
      return el.selectionStart;
    }
    return 0;
  }
  /**
   * @param  {HTMLInputElement} txtElement
   * @param  {number} currentPos
   * @returns void
   */
  static resetCursor(txtElement: HTMLInputElement, currentPos: number): void {
    if (txtElement.setSelectionRange) {
      txtElement.focus();
      txtElement.setSelectionRange(currentPos, currentPos);
    }
  }
  /**
   * @param  {HTMLInputElement} el
   * @returns void
   */
  static Backspace(el: HTMLInputElement): void {
    const currentPos = TestUtils.getCaret(el);
    const text = el.value;

    const backSpace =
      text.substr(0, currentPos - 1) + text.substr(currentPos, text.length);

    el.value = backSpace;

    TestUtils.resetCursor(el, currentPos - 1);
  }
  /**
   * Renders a given element with provided attributes
   * and returns a promise which resolves as soon as
   * rendered element becomes available.
   * @param {string} tag
   * @param {object} attributes
   * @returns {Promise<Element>}
   */
  static render(tag: string, attributes = {}): Promise<Element> {
    TestUtils._renderToDocument(tag, attributes);
    return TestUtils._waitForComponentToRender(tag);
  }

  /**
   * Replaces document's body with provided element
   * including given attributes.
   * @param {string} tag
   * @param {object} attributes
   */
  static _renderToDocument(
    tag: string,
    attributes: Record<string, unknown>
  ): void {
    const htmlAttributes = TestUtils._mapObjectToHTMLAttributes(attributes);
    document.body.innerHTML = `<${tag} ${htmlAttributes}></${tag}>`;
  }

  /**
   * Converts an object to HTML string representation of attributes.
   *
   * For example: `{ foo: "bar", baz: "foo" }`
   * becomes `foo="bar" baz="foo"`
   *
   * @param {object} attributes
   * @returns {string}
   */
  static _mapObjectToHTMLAttributes(
    attributes: Record<string, unknown>
  ): string {
    return Object.entries(attributes).reduce((previous, current) => {
      return previous + ` ${current[0]}="${current[1]}"`;
    }, "");
  }

  /**
   * Returns a promise which resolves as soon as
   * requested element becomes available.
   * @param {string} tag
   * @returns {Promise<Element>}
   */
  static async _waitForComponentToRender(tag: string): Promise<Element> {
    return new Promise((resolve) => {
      /**
       */
      function requestComponent() {
        const element = document.querySelector(tag);
        if (element) {
          resolve(element);
        } else {
          window.requestAnimationFrame(requestComponent);
        }
      }
      requestComponent();
    });
  }
}
