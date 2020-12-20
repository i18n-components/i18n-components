import { TestUtils } from "../../../testing-utility";
import { InputNumber } from "../src/index";
import { getCurrentCaretPosition } from "../src/helpers";

// eslint-disabled
describe("@i18n-components/input-number", () => {
  describe("initialization with default values", () => {
    let SUT;
    beforeAll(() => {
      SUT = new InputNumber();
    });
    it("initialized with default locale", () => {
      expect(SUT.locale).toBe("en-US");
    });
    it("initialized with default numeric value 0", () => {
      expect(SUT.numericValue).toBe(0);
    });
    it("initialize intl instance", () => {
      expect(SUT.intl instanceof Intl.NumberFormat).toBe(true);
    });
    it("Should observe attributes", () => {
      expect(InputNumber.observedAttributes.join()).toBe(
        ["locale", "decimaldigits", "value"].join()
      );
    });
  });

  describe("Rendering of component with defaults", () => {
    let SUT;
    beforeAll(async (done) => {
      SUT = await TestUtils.render("input", { is: InputNumber.tag });
      done();
    });

    it("should render component", () => {
      expect(SUT instanceof HTMLInputElement).toBeTruthy();
    });

    it("should render component with value 0.00", () => {
      expect(SUT.value).toBe("0.00");
    });

    it("should render component input type tel", () => {
      expect(SUT.type).toBe("tel");
    });
  });
  describe("Check caret positions", () => {
    let SUT;
    beforeAll(async (done) => {
      SUT = await TestUtils.render("input", { is: InputNumber.tag });
      done();
    });
    it("should update the caret position to 1 when start typing at caret 0", () => {
      const event = new KeyboardEvent("keydown", <KeyboardEventInit>{
        key: "4",
      });
      SUT.updateCaretPosition(0);
      SUT.dispatchEvent(event);

      expect(getCurrentCaretPosition(SUT)).toBe(1);
    });

    it("should update the caret position to actual number when pressing backspace at the thousand separator", () => {
      const event = new KeyboardEvent("keydown", <KeyboardEventInit>{
        key: "Backspace",
      });
      SUT.value = "1,234.00";
      SUT.updateCaretPosition(2);
      SUT.dispatchEvent(event);

      expect(getCurrentCaretPosition(SUT)).toBe(1);
    });

    it("should update the caret position to actual number when pressing Delete at the thousand separator", () => {
      const event = new KeyboardEvent("keydown", <KeyboardEventInit>{
        key: "Delete",
      });
      SUT.value = "1,234.00";
      SUT.updateCaretPosition(1);
      SUT.dispatchEvent(event);

      expect(getCurrentCaretPosition(SUT)).toBe(2);
    });

    it("should not update caret position for invalid input", () => {
      const event = new KeyboardEvent("keydown", <KeyboardEventInit>{
        key: "h",
      });
      SUT.value = "1,234.00";
      SUT.updateCaretPosition(1);
      SUT.dispatchEvent(event);

      expect(getCurrentCaretPosition(SUT)).toBe(1);
    });

    it("should format the input and update the caret position", () => {
      const event = new Event("change", <KeyboardEventInit>{ key: "4" });
      SUT.value = "1234.00";
      SUT.updateCaretPosition(4);
      SUT.dispatchEvent(event);
      
      expect(SUT.value).toBe("1,234.00");
      expect(getCurrentCaretPosition(SUT)).toBe(5);
    });

    it("should format the input with leading zeros and update the caret position", () => {
      const event = new Event("change", <KeyboardEventInit>{ key: "4" });
      SUT.setAttribute('decimaldigits', "0");
      SUT.value = "0023";
      SUT.updateCaretPosition(4);
      SUT.dispatchEvent(event);
      
      expect(SUT.value).toBe("23");
      expect(getCurrentCaretPosition(SUT)).toBe(2);
    });

    it("should format the input for invalid input", () => {
      const event = new Event("change", <KeyboardEventInit>{ key: "4" });
      SUT.value = "1a33";
      SUT.updateCaretPosition(4);
      SUT.dispatchEvent(event);
      
      expect(SUT.value).toBe("23");
      expect(getCurrentCaretPosition(SUT)).toBe(2);
    });
  });

  describe("Attribute change behaviour", () => {
    let SUT;
    beforeAll(async (done) => {
      SUT = await TestUtils.render("input", { is: InputNumber.tag });
      done();
    });
    it("should set the value and format the input", () => {
      SUT.setAttribute('value', 1234.55);
      expect(SUT.value).toBe("1,234.55");
      expect(SUT.numericValue).toBe(1234.55);
      expect(SUT.formattedValue).toBe("1,234.55");
    });

    it("should change the format on locale change", () => {
      SUT.setAttribute('locale', "de-DE");
      expect(SUT.value).toBe("1.234,55");
      expect(SUT.numericValue).toBe(1234.55);
      expect(SUT.formattedValue).toBe("1.234,55");
    });

    it("should update the fraction digits on decimaldigits change", () => {
      SUT.setAttribute('decimaldigits', "5");
      expect(SUT.value).toBe("1.234,55000");
      expect(SUT.numericValue).toBe(1234.55000);
      expect(SUT.formattedValue).toBe("1.234,55000");
    });

    it("should remove the fraction digits on decimaldigits change to 0", () => {
      SUT.setAttribute('decimaldigits', "0");
      expect(SUT.value).toBe("1.234");
      expect(SUT.numericValue).toBe(1234);
      expect(SUT.formattedValue).toBe("1.234");
    });
  });
});
