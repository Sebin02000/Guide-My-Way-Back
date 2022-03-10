exports.parseServiceData = function(data) {
    let finalResult=[];
    data.results.forEach(result => {
        if(result.business_status=="OPERATIONAL")
       { 
           const op={
            loaction:result.geometry.location,
            iconUrl:result.icon,
            name:result.name,
            rating:result.rating,
            noOfRating:result.user_ratings_total
        }
        finalResult.push(op)
    }
    });
  
    
    return finalResult;
}