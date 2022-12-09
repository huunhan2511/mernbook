export const getDistrictByCity = (cities, id) =>{
    if (id) {
        return cities.find(city => city.name === id).districts;      
    }
    return cities[0].districts;
  }
  export const getWardByDistrict = (districts, id) =>{
    if (id) {
        let results = districts.find(district => district.name === id);
        if(results) return results.wards;    
        return districts[0].wards;
    }
    return districts[0].wards;
  }