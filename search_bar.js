var list;
fetch("https://raw.githubusercontent.com/buianhduc/Norona/master/database.json").then(function(response){
    return response.json();
}).then(function (obj){
    list=obj;
}).catch(function(error){
    console.log("there is an error");
})
document.getElementById('input_box').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){

        let options = {
            shouldSort: true,
            includeScore: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            minMatchCharLength: 1,
            keys: [
              "name","category"
            ]
          };
          let fuse = new Fuse(list, options); // "list" is the item array
          let result = fuse.search(document.getElementById('input_box').value);
          console.log(result);
      return false;
    }
  }
