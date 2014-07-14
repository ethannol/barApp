Drinks = new Meteor.Collection("drinks")
Students = new Meteor.Collection("students")


if (Meteor.isClient) {
  // Valid URLs for this app are:
  // XXX.com/bartender; (in this case, Session.get("page") === 'bartender')
  // XXX.com/manager; (in this case, Session.get("page") === 'manager')
  // XXX.com/       ; (in this case, Session.get("page") === '')

  Session.setDefault("role", "");
  
  //look up anonymous functions javascript if this is confusing
  
  

  UI.body.onLandingPage = function () {
    return Session.get("role") === '';
  };

  UI.body.isbartender = function () {
    return Session.get("role") === 'bartender';
  };

  UI.body.ismanager = function () {
    return Session.get("role") === 'manager';
  };

  Template.landing.events({
    'click #bartender': function () {
      Session.set("role", "bartender");
    },
    'click #manager': function () {
      Session.set("role", "manager");
    }
  });
  
  Template.drinkForm.events({
    'click #drinkCreate' : function (){
      Drinks.insert({
        name: document.getElementById('drinkName').value,
        price: document.getElementById('drinkPrice').value,
        category: document.getElementById('drinkCategory').value
      })
    }
  })
  Template.listDrinks.drinks = function(){
    return Drinks.find({});
    
  }
  
  Template.listDrinks.events({
    'click .removeDrink': function(){
      Drinks.remove({_id:this._id});
    }
  })
  
  Template.listStudents.students = function(){
    Session.set("allStudents",
    Students.find({},{fields: {firstname:1, lastname:1}})
      .map(function(student){
          return student.firstname+" "+student.lastname
        })
    );
    return Students.find({role:"student"});
 
    
  }
  
  Template.createStudent.events({
    'click #createNewStudent': function(){
      console.log("hi");
      Students.insert({
        firstname: document.getElementById('studentFirstName').value,
        lastname: document.getElementById('studentLastName').value,
        balance:  parseInt(document.getElementById('studentInitBal').value),
        role:"student"
      })
    }
  })

  Template.manager.managerName = function () {
    return Session.get("managerName");
  };
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
