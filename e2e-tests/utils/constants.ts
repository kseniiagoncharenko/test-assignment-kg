export const suggestionsNumber = 10;

export enum SortingOptions {
    Relevancy = 'relevancy',
    DateDown = 'date_down',
    DateUp = 'date_up',
    PriceDown = 'price_down',
    PriceUp = 'price_up'
}

export enum OfferingTypeFilter {
    Buy = 'buy',
    Rent = 'rent'
}

export const OfferringTypeMap = {
    'buy': 'sale',
    'rent': 'rent'
}

export enum PropertyTypeFilter {
    House = 'house',
    Apartment = 'apartment',
    Parking = 'parking',
    Land = 'land'
}

export const incorrectUser = {
    email: "test@gmail.com",
    password: "testpassword"
}