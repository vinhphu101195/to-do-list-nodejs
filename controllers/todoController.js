var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var data = [
  {
    item: "get milk"
  },
  {
    item: "walk dog"
  },
  {
    item: "kick some coding ass"
  }
];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
  app.get("/todo", function(req, res) {
    console.log("HELLO GET");

    res.render("todo", { todos: data });
  });

  app.post("/todo", urlencodedParser, function(req, res) {
    data.push(req.body);
    console.log("post data");
    console.log(req.body);

    //send to front end
    res.json(data);
  });

  app.delete("/todo/:item", function(req, res) {
    console.log("delete data");

    data = data.filter(function(e) {
      //return false means find the exactly item
      return e.item.replace(/ /g, "-") !== req.params.item;
    });
    res.json(data);
  });
};
