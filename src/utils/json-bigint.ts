export function JSONBigIntParse(data: string) {
  return JSON.parse(data, (_key, value) => {
    if (value !== null && typeof value === 'object' && value.type === 'bigint') {
      return BigInt(value.value);
    }

    return value;
  });
}

export function JSONBigIntStringify(value: unknown, space?: string | number): string {
  return JSON.stringify(
    value,
    (_key, value) =>
      typeof value === 'bigint'
        ? {
            type: 'bigint',
            value: value.toString(),
          }
        : value,
    space,
  );
}
