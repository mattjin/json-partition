import difference from 'lodash.difference';
import isEqual from 'lodash.isequal';

interface Options {
  identifier: string;
}

interface Result<T> {
  add: T[] | undefined | null;
  del: T[] | undefined | null;
  same: T[] | undefined | null;
  change: T[] | undefined | null;
}

export function partition<T>(newArray: T[], oldArray: T[], options?: Options) : Result<T> {
  const result: Result<T> = {
    add: [],
    del: [],
    same: [],
    change: [],
  };
  
  if (!newArray || newArray.length === 0) {
    result.del = oldArray;
    return result;
  }
  if (!oldArray || oldArray.length === 0) {
    result.add = newArray;
    return result;
  }

  if (options && options.identifier) {
    const identifier = options.identifier;
    const addArray = [];
    const sameArray = [];
    const changeArray = [];
    const oldArr = [...oldArray];
    for (let i = 0; i < newArray.length; i++) {
      const idValue = newArray[i][identifier];
      let found = false;
      for (let j = 0; j < oldArr.length; j++) {
        if (isEqual(newArray[i], oldArr[j])) {
          sameArray.push(newArray[i]);
          found = true;
        } else if (newArray[i][identifier] && newArray[i][identifier] === oldArr[j][identifier]) {
          changeArray.push(newArray[i]);
          found = true;
        }
        if (found) {
          oldArr.splice(j, 1);
          break;
        }
      }
      if (!found) {
        addArray.push(newArray[i]);
      }
    }
    result.del = oldArr;
  } else {
    const diffArray = difference(newArray, oldArray);
    const sameArray = difference(newArray, diffArray);
    const delArray = difference(oldArray, diffArray);
    result.add = diffArray;
    result.same = sameArray;
    result.del = delArray;
  }
  return result;
}