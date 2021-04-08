const repository = require('./repository/searchByNameAndDate')
const getTagNames = require('./repository/searchTagNames')

// repository.searchTags("2021-01-27 16:58:42", "VT_EL01_유효전력*05M")
//     .then((result) => {
//         console.log(result)
//     });
getTagNames.searchTagNames.then((result) => {
        console.log(result)
    });
