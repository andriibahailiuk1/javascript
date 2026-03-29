function isIPAddress(ip) {
    const pattern = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/;
    return pattern.test(ip);
}

function findRGBA(text) {
    const pattern = /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[0-1]?\.?\d+\s*\)/;
    const result = text.match(pattern);
    return result ? result[0] : null;
}


function findHexColor(text) {
    const pattern = /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\b/;
    const result = text.match(pattern);
    return result ? result[0] : null;
}

function findTags(text, tag) {
    const pattern = new RegExp(`<${tag}\\b[^>]*>`, 'gi');
    const result = text.match(pattern);
    return result || [];
}

function findPosNum(text) {
    const pattern = /(?<!-)\b\d+(\.\d+)?\b/g;
    const result = text.match(pattern);
    return result ? result.map(Number) : [];
}

function findDates(text) {
    const pattern = /\b\d{4}-\d{2}-\d{2}\b/g;
    const result = text.match(pattern);
    return result || [];
}

function findEmail(text) {
    const pattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
    const result = text.match(pattern);
    return result || [];
}