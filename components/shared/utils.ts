const MIN_SCREEN_SIZE  = 200;
const MAX_SCREEN_SIZE = 2160;

export const validateInput = (value: string) => {
    const numericValue = Number(value);
    if (numericValue < MIN_SCREEN_SIZE) {
        return {
          success: false,
          errorMsg: `Value must be greater than ${MIN_SCREEN_SIZE}.`
        };
    }
    if (numericValue > MAX_SCREEN_SIZE) {
      return {
        success: false,
        errorMsg: `Value must be less than ${MAX_SCREEN_SIZE}.`
      };
    }
    return {
      success: true, 
      errorMsg: ''
    };
}