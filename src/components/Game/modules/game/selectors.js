// group moves based on color.  
export const groupMovesByColor = (state) => {
  // White's always first, so this reducer moves even indexes to white object and odd indexes to black object.
  return state.reduce((acc, val, idx) => {
    if(idx % 2 === 0)  acc[idx] = { white: val }
    else  acc[idx - 1].black = val;

    return acc;
  }, []);
};
