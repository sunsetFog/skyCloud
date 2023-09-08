import map from './map.json'
let mapList = function (options) {
    let json = JSON.parse(options.body)
    return map
}
export default { mapList }