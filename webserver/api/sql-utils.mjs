export const escapeId = (str) => `"${String(str).replace(/(["])/gi, "$1$1")}"`;

export const escapeStr = (str) => `'${String(str).replace(/(['])/gi, "$1$1")}'`;
