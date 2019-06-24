import pinyin from 'pinyin'
export function formatList (arr, keyword) {
  arr.forEach((item, index) => {
    item.Findex = pinyin(item[keyword], {
      style: pinyin.STYLE_INITIALS,
      heteronym: true
    })[0][0].charAt(0).toUpperCase()
  })
  // arr = groupBy('nameFirstChat')
  return arr
}
// function groupBy (prop) {
//   return this.reduce(function (groups, item) {
//     var val = item[prop]
//     groups[val] = groups[val] || []
//     groups[val].push(item)
//     return groups
//   }, {})
// }
