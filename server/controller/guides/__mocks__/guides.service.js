const guidesService = jest.mock('./guides.service.js');

let mockData;
guidesService.findOneGuide = jest.fn(id => Promise.resolve(mockData.find(p => p.id == id)));
guidesService.findAllGuide = jest.fn(() => Promise.resolve(mockData));
guidesService.createGuide = jest.fn(newGuide => Promise.resolve(
    newGuide.id = mockData[mockData.length - 1].id + 1,
        mockData.push(newGuide)
            )
    );
guidesService.updateGuide = jest.fn( (id) => {
    const index = mockData.findIndex(guide => guide.id === id)
    if (index === -1) { return Promise.resolve(undefined) }
    const foundGuide = mockData.find(guide => guide.id === id);
    foundGuide = {
        first_name: updatedGuideData.first_name,
        last_name: updatedGuideData.last_name,
        age: updatedGuideData.age,
        image: updatedGuideData.image,
        description1: updatedGuideData.description1,
        description2: updatedGuideData.description2,
        tours: updatedGuideData.tours
    }
    return Promise.resolve(foundGuide);
})
 
guidesService.deleteGuide = jest.fn(id => Promise.resolve(
        mockData.splice(p => p.id == id, 1)
    ));

guidesService.__setMockData = data => mockData = data;

module.exports = guidesService;
