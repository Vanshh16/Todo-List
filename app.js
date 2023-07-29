const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req,res){

  let day = date.getDate();
  res.render("list", {listTitle: day, newItems: items });

});

app.post("/", function(req,res){

  let item = req.body.newItem;

  if(req.body.list === "Work-List")
  {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    console.log(req.body.delete);
    if(req.body.delete)
    {
      const index = req.body.delete;
      console.log(index);
      if (index > -1)
       {
        // only splice array when item is found
          items.splice(index, 1);
          console.log(items);
       }
    }
    items.push(item)
    res.redirect("/");
  }
});

app.get("/work", function(req,res){

  res.render("list",{listTitle: "Work-List", newItems: workItems});
});

app.get("/about", function(req,res){

  res.render("about");
})

app.listen("3000", function(){

  console.log("Server is running at port 3000");
});
