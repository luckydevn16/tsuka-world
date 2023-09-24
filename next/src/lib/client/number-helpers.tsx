export const convertLawPrice = (price: number) => {
  let priceEle;
  if (price >= 0.01) {
    priceEle = `$${price.toLocaleString("en-us")}`;
  } else {
    priceEle = (
      <>
        {formatNumberToHtmlTag(price).integerPart}
        .0
        <sub>{formatNumberToHtmlTag(price).leadingZerosCount}</sub>
        {formatNumberToHtmlTag(price).remainingDecimal}
      </>
    );
  }
  return priceEle;
};

export const handleNumberFormat = (num: number): string => {
  const value = num.toString();
  const pattern = /^\d*\.?\d*$/;
  if (!pattern.test(value)) return "";
  let newValue = "";
  if (value.search("\\.") !== -1) {
    let integerPart = value.split(".")[0];
    const decimalPart = value.split(".")[1];
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    newValue = `${integerPart}.${decimalPart ? decimalPart : ""}`;
  } else {
    newValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return newValue;
};

export const toNumber = (str: string): number => {
  const value = str.replace(/,/g, "");
  const num = Number(value);
  if (Number.isNaN(num)) {
    return -1;
  }
  return num;
};

/**
 * Optimizes numbers so that either very small values can be represented using the subscript notation seen on the homepage if the value is less than 0.01, or for larger values will display them as normal currency
 * @param price
 * @returns
 */
export function commafyOrHtmlTag(
  price: number,
  includeDollarSign = true
) {
  let output;

  if (price == 0) {
    output = 0;
  } else if (price >= 0.01) {
    output = `${includeDollarSign ? "$" : ""}${price.toLocaleString("en-us")}`;
  } else {
    output = (
      <>
        {includeDollarSign ? "$" : ""}
        {formatNumberToHtmlTag(price).integerPart}.0
        <sub>{formatNumberToHtmlTag(price).leadingZerosCount}</sub>
        {formatNumberToHtmlTag(price).remainingDecimal}
      </>
    );
  }

  return output;
}

export function fixedDecimal(x: number, d: number) {
  const p = Math.pow(10, d);
  return Number((x * p).toFixed(0)) / p;
}

export function percentChange(initial: number, final: number): number {
  return 100 * ((final - initial) / initial)
}

/**
 * 0.00000427 => 0.0_543
 * @param x
 * @returns
 */
export function formatNumberToHtmlTag(num: number): {integerPart: string, leadingZerosCount: number, remainingDecimal: string} {
  
    let numStr = num.toString();
    
    if (numStr.indexOf('e') !== -1) {
      const exponent = parseInt(numStr.split('e')[1]);
      numStr = parseFloat(numStr).toFixed(Math.abs(exponent-parseInt(numStr.split('e')[0])));
    }
    const parts = numStr.split('.');
    
    if (parts.length === 1) {
      return {integerPart: parts[0], leadingZerosCount: 0, remainingDecimal: ''};
    }
  
    const integerPart = parts[0];
    const decimalPart = parts[1];
  
    const leadingZeros = decimalPart.match(/^0*/) ?? [''];
    const leadingZerosCount = leadingZeros[0].length;
    
    
    let remainingDecimal = decimalPart.slice(leadingZerosCount, decimalPart.length).split('0')[0];  
    if(remainingDecimal.length < 3 ) remainingDecimal += ("000").slice(0, 3-remainingDecimal.length);
    else remainingDecimal = remainingDecimal.slice(0, 3);
    
    return {integerPart, leadingZerosCount, remainingDecimal};
}