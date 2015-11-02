bbyc.common.factory('CommonUtils', ['Config', '$http', '$q', function(Config, $http, $q) {
    return {
        getServiceResponse: function (path) {
            var deferred = $q.defer();

            $http.get(path, {withCredentials: true}).success(function(data) {
                deferred.resolve(data);
            }).error(function(data) {
                deferred.reject(data);
            });

            return deferred.promise;
        },

        ellipsis: function (inputStr, length, word) {
            word = word === undefined ? true : word;
            var outStr = inputStr;
            if (inputStr && length < inputStr.length - 3) {

                if (word) {
                    for (var i = length - 3; i > 0; i--) {
                        if (inputStr.substr(i, 1) === ' ') {
                            outStr = $.trim(inputStr.substr(0, i)) + '...';
                            break;
                        }
                    }
                }
                else {
                    outStr = inputStr.substr(0, length - 3) + '...';
                }
            }
            return outStr;
        }
    };
}]);