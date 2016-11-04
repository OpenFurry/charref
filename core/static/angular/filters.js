angular.filter('linebreaks', function(input) {
        return input ? '<p>' + input.replace(/(\r)?\n(\r)?\n/g, '</p><p>') + '</p>' : input;
});
