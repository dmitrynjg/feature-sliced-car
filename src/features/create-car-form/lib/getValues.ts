export const getValues: <T = any>(values: T | any) => T = (values) => {
  if(!values) {
    return {};
  }
  if (values.engine === 'электрический') {
    const { transmission, ...otherValues } = values;
    return otherValues;
  }
  const { powerReserve, ...otherValues } = values;
  return otherValues;
};
