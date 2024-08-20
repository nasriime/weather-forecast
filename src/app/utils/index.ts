  export const convertCountrryCodeToName = (countryCode: string)=> {
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    return regionNames.of(countryCode);
  }