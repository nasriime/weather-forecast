export const getLocation= (fun: (lat: number, lon: number)=>void, locationDenied: boolean, errorMsg?: string)=> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {    
        fun(position.coords.latitude, position.coords.longitude);
      }, (error)=> {
        const errors: { [key: number]: string } = {
          [error.PERMISSION_DENIED]: 'User denied the request for Geolocation.',
          [error.POSITION_UNAVAILABLE]: 'Location information is unavailable.',
          [error.TIMEOUT]: 'The request to get user location timed out.',
        }
        if(error.code == error.PERMISSION_DENIED) {
          locationDenied = true
        }
        errorMsg = errors[error.code];
      })
    }
  } 

  export const handleError = (error: GeolocationPositionError, locationDenied: boolean, errorMsg?: string)=> {
    const errors: { [key: number]: string } = {
      [error.PERMISSION_DENIED]: 'User denied the request for Geolocation.',
      [error.POSITION_UNAVAILABLE]: 'Location information is unavailable.',
      [error.TIMEOUT]: 'The request to get user location timed out.',
    }
    if(error.code == error.PERMISSION_DENIED) {
      locationDenied = true
    }
    errorMsg = errors[error.code];
  }

  export const convertCountrryCodeToName = (countryCode: string)=> {
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    return regionNames.of(countryCode);
  }