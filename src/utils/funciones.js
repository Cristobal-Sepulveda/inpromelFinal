
export const delay = async timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
};