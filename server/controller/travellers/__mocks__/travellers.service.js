const travellersService = jest.mock('./travellers.service.js');

let mockData;
travellersService.findOneTraveller = jest.fn(id => Promise.resolve(mockData.find(traveller => traveller.id == id)));
travellersService.findAllTraveller = jest.fn(() => Promise.resolve(mockData));
travellersService.createTraveller = jest.fn(newTraveller => Promise.resolve(
    newTraveller.id = mockData[mockData.length - 1].id + 1,
        mockData.push(newTraveller)
            )
    );
travellersService.updateTraveller = jest.fn( (id) => {
    const index = mockData.findIndex(traveller => traveller.id === id)
    if (index === -1) { return Promise.resolve(undefined) }
    const foundTraveller = mockData.find(traveller => traveller.id === id);
    return Promise.resolve(foundTraveller);
})
travellersService.deleteTraveller = jest.fn(id => Promise.resolve(
        mockData.splice(traveller => traveller.id == id, 1)
    ));

travellersService.__setMockData = data => mockData = data;

module.exports = travellersService;
