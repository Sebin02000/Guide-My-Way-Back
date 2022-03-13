// remove html tags from string
let instructions=[];
removeHtmlTags = function(str) {
    return str.replace(/<(?:.|\n)*?>/gm, '');
};

// simplyfied steps function
parseSteps = function(steps) {
    var parsedSteps = [];
    steps.forEach(function(step) {
        instructions.push(removeHtmlTags(step.html_instructions));
        parsedSteps.push({
            'instruction': removeHtmlTags(step.html_instructions),
            "maneuver": steps.maneuver??"",
            'distance': step.distance.text,
            'duration': step.duration.text,
            'start_location': step.start_location,
            'end_location': step.end_location
        });
    });
    return parsedSteps;
};


// simplyfied legs function
parseLegs = function(legs) {
    var leg,
        leg_array = [];
    for (var i = 0; i < legs.length; i++) {
        leg = legs[i];
        leg_array.push({
            "duration": leg.duration.text,
            "distance": leg.distance.text,
            "steps": parseSteps(leg.steps),
            "start_address": leg.start_address,
            "end_address": leg.end_address,
            "start_location": leg.start_location,
            "end_location": leg.end_location,
            
        });
    }
    return leg_array;
}

exports.parseRouteData = function(data) {
    instructions=[];
    const routeData = data["routes"][0];
    const bound= routeData['bounds'];
    const  legs= parseLegs(routeData['legs']);
    const polyLine = routeData['overview_polyline'];
    const summary = routeData['summary'];
    const route = {
        "summary": summary,
        "bound": bound,
        "legs": legs,
        "overview_polyline": polyLine,
        "instructions": instructions
        
    };
    
    return route;
}