
function KoreChatBotWrapper() {
    var _self = this,
        _bot = koreBotChat(),
        _options = {};

    function assertion(options, callback) {
        var jsonData = {
            "clientId": _options.botOptions.clientId,
            "clientSecret": _options.botOptions.clientSecret,
            "identity": _options.botOptions.userIdentity,
            "aud": "",
            "isAnonymous": false
        };
        $.ajax({
            url: _options.botOptions.JWTUrl,
            type: 'post',
            data: jsonData,
            dataType: 'json',
            success: function (data) {
                options.assertion = data.jwt;
                options.handleError = _bot.showError;
                options.chatHistory = _bot.chatHistory;
                options.botDetails = _bot.botDetails;
                callback(null, options);
                setTimeout(function () {
                    if (_bot && _bot.initToken) {
                        _bot.initToken(options);
                    }
                }, 2000);
            },
            error: function (err) {
                _bot.showError(err.responseText);
            }
        });
    };

    this.show = function (initOptions) {
        _options = initOptions;
        _options.botOptions.assertionFn = assertion
        _bot.show(_options);
    };

    this.destroy = function() {
        _bot.destroy();
    }

    return _self;
}

var koreBot = KoreChatBotWrapper();