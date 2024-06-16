export const escapeId = (id) => `"${String(id).replace(/(["])/gi, "$1$1")}"`;

export const escapeStr = (str) => `'${String(str).replace(/(['])/gi, "$1$1")}'`;

export const escapeNum = (num) => (!isNaN(+num) ? `${+num}` : "0");
