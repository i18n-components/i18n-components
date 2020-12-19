import * as helpers from "./helpers";

/**
 * Class Declaration for InputNumber Webcomponent
 */
export class InputNumber extends HTMLInputElement {
  /**
   * HTML tag declaration
   * @returns string
   */
  static get tag(): string {
    return "i18n-input-number";
  }
  /**
   * observe locale and decimalDigits attributes to re-render
   * @returns Array
   */
  static get observedAttributes(): Array<string> {
    return ["locale", "decimalDigits", "value"];
  }

  intl: Intl.NumberFormat;
  numRegx: RegExp;
  inputValue: string;

  /**
   * Constrctor
   */
  constructor() {
    super();
    this.intl = this.initializeIntl();
    this.numRegx = this.getNumRegx();
    this.inputValue = this.value || this.intl.format(0);
    this.value = this.getFormattedValue();
  }
  /**
   * get number regex with thosand and decimal separator based on locale
   * @param  {boolean} invertMatch=false
   * @returns RegExp
   */
  getNumRegx(invertMatch = false, locale: string = this.locale): RegExp {
    const decimalSeparator = this.fractionDigits
      ? "|\\" + this.getDecimalSeparator(locale)
      : "";
    const thousandSeparator = this.getThousandSeparator(locale)
      ? "|\\" + this.getThousandSeparator(locale)
      : "";

    let regxString = "\\d" + decimalSeparator + thousandSeparator;
    if (invertMatch) {
      regxString = "[^" + regxString + "]";
    }
    return new RegExp(regxString, "g");
  }
  /**
   * current locale
   * @returns string
   */
  get locale(): string {
    if (!this.getAttribute("locale")) {
      // set locale because attribute change callback should have oldValue
      this.setAttribute("locale", navigator.language);
    }
    return <string>this.getAttribute("locale");
  }
  /**
   * formatted input value
   * @returns string
   */
  getFormattedValue(locale: string = this.locale): string {
    return this.intl.format(this.getNumericValue(locale));
  }
  /**
   * @returns string
   */
  get formattedValue(): string {
    return this.getFormattedValue();
  }
  /**
   * Number of fraction digits allowed
   * @returns number
   */
  get fractionDigits(): number {
    const digits = Number(this.getAttribute("decimalDigits"));
    return digits && digits > -1 ? digits : 2;
  }
  /**
   * decimal separator for current locale
   * @returns string
   */
  getDecimalSeparator(locale: string = this.locale): string {
    return (1.1).toLocaleString(locale).substring(1, 2);
  }
  /**
   * thousand separator for current locale
   * @returns string
   */
  getThousandSeparator(locale: string = this.locale): string {
    const separator = (1000).toLocaleString(locale).substring(1, 2);
    // In case there are locales that don't use a thousand separator
    if (separator.match(/\d/)) return "";
    return separator;
  }
  /**
   * detect if current input key is valid or not based on locale
   * @param  {string=this.locale} locale
   * @returns boolean
   */
  isValidInput({value = this.value, locale = this.locale} = {}): boolean {
    const regx = this.getNumRegx(true, locale);
    return !regx.exec(value);
  }

  /**
   * current numeric value
   * @returns number
   */
  getNumericValue(locale: string = this.locale): number {
    if (!this.inputValue) {
      return 0;
    }
    const str = this.inputValue
      .replace(new RegExp(`\\${this.getThousandSeparator(locale)}`, "gi"), "")
      .replace(new RegExp(`\\${this.getDecimalSeparator(locale)}`, "gi"), ".");
    return Number(parseFloat(str).toFixed(this.fractionDigits));
  }
  /**
   * @returns number
   */
  get numericValue(): number {
    return this.getNumericValue();
  }
  /**
   * initialize the Intl.NumberFormat
   * @returns void
   */
  initializeIntl(): Intl.NumberFormat {
    return new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: this.fractionDigits,
      minimumFractionDigits: this.fractionDigits,
    });
  }
  /**
   * Attach events after elements being attached to DOM
   * @returns void
   */
  connectedCallback(): void {
    this.type = "tel"; // Tel is used because, This will open the numeric keyboard in mobile devices
    this.attachEvents();
  }
  /**
   * @param  {string} name
   * @param  {string} oldValue
   * @param  {string} newValue
   * @returns void
   */
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    // Re-initialize Intl only when locale and fraction digit changes
    if (name === "locale" || name === "decimalDigits") {
      this.intl = this.initializeIntl();
    }
    if (name === "locale") {
      if (this.isValidInput({locale: oldValue})) {
        this.inputValue = this.value = this.getFormattedValue(oldValue);
      }
    } else {
      const value = name === 'value' ? newValue : undefined;
      if (this.isValidInput({value})) {
        this.inputValue = this.value = this.getFormattedValue();
      } else {
        console.info("@i18n-components/input-number:", "Invalid Value.", newValue);
        this.inputValue = this.value = oldValue
          ? oldValue
          : this.intl.format(0);
      }
    }
  }
  /**
   * set the curser at specific position
   * @param  {number} pos
   * @returns void
   */
  updateCaretPosition(pos: number): void {
    helpers.setCaretPosition(this, pos);
  }
  /**
   * Attach Events after initialization
   * @returns void
   */
  attachEvents(): void {
    this.addEventListener("change", this.onChange);
    this.addEventListener("input", this.onChange);
    this.addEventListener("keydown", this.onKeydown);
    this.addEventListener("focus", this.onFocus);
  }
  /**
   * @returns void
   */
  onFocus(): void {
    if (!this.isValidInput()) {
      this.inputValue = this.value = this.intl.format(0);
    }
  }

  /**
   * onchange and onInput event listener callback
   * @returns void
   */
  onChange(): void {
    if (this.isValidInput()) {
      this.inputValue = this.value;
    }
    const currentCaretPosition = helpers.getCurrentCaretPosition(this);
    const formattedValue = this.getFormattedValue();
    const caretPos = helpers.getCaretPosition(
      this.inputValue,
      this.getFormattedValue(),
      currentCaretPosition
    );
    this.inputValue = this.value = formattedValue;
    this.isValidInput() && this.updateCaretPosition(caretPos);
  }
  /**
   * onKeydown event listner callback
   * @param  {KeyboardEvent} e
   * @returns void
   */
  onKeydown(e: KeyboardEvent): void {
    const { key } = e;
    const currentCaretPosition = helpers.getCurrentCaretPosition(this);
    const numRegex = /^[1-9]$/g;
    const invalidInputRegex = this.getNumRegx(true);
    if (key.match(numRegex) && currentCaretPosition === 0) {
      this.updateCaretPosition(1);
    } else if (key === "Backspace") {
      this.correctCaretPosition(true);
    } else if (key === "Delete") {
      this.correctCaretPosition();
    } else if (invalidInputRegex.exec(key)) {
      this.updateCaretPosition(currentCaretPosition);
    }
  }
  /**
   *
   * @param  {boolean} isBackspace=false
   * @returns void
   */
  correctCaretPosition(isBackspace = false): void {
    const currentCaretPosition = helpers.getCurrentCaretPosition(this);
    const decimalSeparator = this.fractionDigits
      ? "\\" + this.getDecimalSeparator()
      : "";
    const thousandSeparator = this.getThousandSeparator()
      ? "|\\" + this.getThousandSeparator()
      : "";
    const separatorDecimalRegex = new RegExp(
      "^" + decimalSeparator + thousandSeparator + "$",
      "g"
    );
    const currentCharacter = isBackspace
      ? this.inputValue[currentCaretPosition - 1]
      : this.inputValue[currentCaretPosition];

    if (currentCharacter?.match(separatorDecimalRegex)) {
      const deletionPos = currentCaretPosition + (isBackspace ? -1 : 1);
      this.updateCaretPosition(deletionPos);
    }
  }
}

customElements.define(InputNumber.tag, InputNumber, { extends: "input" });

// const input = document.createElement("input", { is: "i18n-input-number" });

// document.body.append(input);
