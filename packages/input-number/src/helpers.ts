/** set the caret positon in an input field **/
export function setCaretPosition(el: HTMLInputElement, caretPos = 0): boolean  {
    el.value = el.value; // eslint-disable-line
    // ^ this is used to not only get "focus", but
    // to make sure we don't have it everything -selected-
    // (it causes an issue in chrome, and having it doesn't hurt any other browser)
    
    if (el !== null) {
      // if (el.createTextRange) { 
      //   const range = el.createTextRange();
      //   range.move("character", caretPos);
      //   range.select();
      //   return true;
      // }
      // (el.selectionStart === 0 added for Firefox bug)
      if (el.selectionStart || el.selectionStart === 0) {
        el.focus();
        el.setSelectionRange(caretPos, caretPos);
        return true;
      }
  
      // fail city, fortunately this never happens (as far as I've tested) :)
      el.focus();
      return false;
    }
    return false;
  }
  
  /**
   * @param  {HTMLInputElement} el
   * @returns number
   */
  export function getCurrentCaretPosition(el: HTMLInputElement): number {
    /*Max of selectionStart and selectionEnd is taken for the patch of pixel and other mobile device caret bug*/
    return Math.max(<number>el.selectionStart, <number>el.selectionEnd);
  }
  
  /**
   * @param  {string} inputValue
   * @param  {string} formattedValue
   * @param  {number} caretPos
   * @returns number
   */
  export function getCaretPosition(
   inputValue: string,
   formattedValue: string,
   caretPos: number
 ): number {
   const numRegex = /\d/g;
   const inputNumber = (inputValue.match(numRegex) || []).join("");
   const formattedNumber = (formattedValue.match(numRegex) || []).join("");
   let j, i;
   j = 0;

   for (i = 0; i < caretPos; i++) {
     const currentInputChar = inputValue[i] || "";
     const currentFormatChar = formattedValue[j] || "";
     //no need to increase new cursor position if formatted value does not have those characters
     //case inputValue = 1a23 and formattedValue =  123
     if (
       !currentInputChar.match(numRegex) &&
       currentInputChar !== currentFormatChar
     )
       continue;

     //When we are striping out leading zeros maintain the new cursor position
     //Case inputValue = 00023 and formattedValue = 23;
     if (
       currentInputChar === "0" &&
       currentFormatChar.match(numRegex) &&
       currentFormatChar !== "0" &&
       inputNumber.length !== formattedNumber.length
     )
       continue;

     //we are not using currentFormatChar because j can change here
     while (
       currentInputChar !== formattedValue[j] &&
       j < formattedValue.length
     )
       j++;
     j++;
   }

   return j;
 }