function isNullOrEmpty(str) {
    if(!str || str.length === 0)
        return true;
    return false;
}

module.exports = { isNullOrEmpty };