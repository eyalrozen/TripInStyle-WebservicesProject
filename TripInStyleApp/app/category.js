"use strict";
var Category = (function () {
    function Category(id, title, imgUrl) {
        this.selected = false;
        this._id = id;
        this.title = title.toUpperCase();
        this.imgUrl = imgUrl;
    }
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.js.map