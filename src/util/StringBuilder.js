class StringBuilder{
    buildString()
    {
        var strings = [];

        this.append = function (string)
        {
            string = verify(string);
            if (string.length > 0) strings[strings.length] = string;
        };

        this.appendLine = function (string)
        {
            string = verify(string);
            if (this.isEmpty())
            {
                if (string.length > 0) strings[strings.length] = string;
                else return;
            }
            else strings[strings.length] = string.length > 0 ? "\r\n" + string : "\r\n";
        };

        this.clear = function () { strings = []; };

        this.isEmpty = function () { return strings.length == 0; };

        this.toString = function () { return strings.join(""); };

        var verify = function (string)
        {
            if (!defined(string)) return "";
            if (getType(string) != getType(new String())) return String(string);
            return string;
        };

        var defined = function (el)
        {
            // Changed per Ryan O'Hara's comment:
            return el != null && typeof(el) != "undefined";
        };

        var getType = function (instance)
        {
            if (!defined(instance.constructor)) throw Error("Unexpected object type");
            var type = String(instance.constructor).match(/function\s+(\w+)/);

            return defined(type) ? type[1] : "undefined";
        };
    };
}
export default StringBuilder;