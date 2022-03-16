const axios = require('axios');
const apiResponse = require('../helpers/apiResponse');
const routeParse = require('../helpers/route');
const serviceParce = require('../helpers/service');
// Route map
exports.routeMap=(req,res)=>{
    let origin = req.body.origin;
    let destination = req.body.destination;
    let mode = req.body.mode;
    console.log(req.body);
    // 
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${process.env.GOOGLE_API_KEY}`;
    //
    axios.get(url)
        .then(response => {
          let data= routeParse.parseRouteData(response.data)
            return apiResponse.successResponseWithData(res, 'Route map', data);
        }
        )
        .catch(err => {
            return apiResponse.errorResponse(res, 'Map route', err);
        }
        );

   
}

//  Route map with services
exports.routeMapWithServices=(req,res)=>{
    let origin = req.body.origin;
    let destination = req.body.destination;
    let mode = req.body.mode;
    let services=req.body.services;
    // get directions with way points
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&waypoints=optimize:true${services}&key=${process.env.GOOGLE_API_KEY}`;
    //
    axios.get(url)
        .then(response => {
            let data= routeParse.parseRouteData(response.data)
                return apiResponse.successResponseWithData(res, 'route created', data);
            }
        )
        .catch(err => {
            console.log(err);
            return apiResponse.errorResponse(res,  err);
        }
        );
}

// All services
exports.allServices=(req,res)=>{
   let keyword= req.body.keyword;
   let location = req.body.location;
   let url=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${location}&rankby=distance&key=${process.env.GOOGLE_API_KEY}` 
   axios.get(url)
   .then(response => {
       let data= serviceParce.parseServiceData(response.data);
           return apiResponse.successResponseWithData(res, 'Fetchedx', data);
       }
   )
   .catch(err => {
       console.log(err);
       return apiResponse.errorResponse(res,  err);
   }
   );

}
