fetch("./database.json")
  .then(response => response.json())
  .then(json => console.log(json));
console.log("jdjsndijw");
// let options = {
//     shouldSort: true,
//     includeScore: true,
//     threshold: 0.6,
//     location: 0,
//     distance: 100,
//     minMatchCharLength: 1,
//     keys: [
//       "name", "category";
//     ]
//   };
//   let fuse = new Fuse(list, options); // "list" is the item array
//   let result = fuse.search("");