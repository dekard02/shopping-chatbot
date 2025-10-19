export const hasSessionStorageKeyIncluding = (searchString: string) => {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && key.includes(searchString)) {
      return key.substring(searchString.length + 1);
    }
  }
  return null;
}

const cachedHelper = { hasSessionStorageKeyIncluding };

export default cachedHelper;