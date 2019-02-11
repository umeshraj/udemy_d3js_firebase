const personOne = {
  name: "Yoshi",
  speak: function() {
    console.log("My name is ", this.name);
  }
};

const personTwo = {
  name: "Yoshi",
  speak: () => {
    console.log("My name is ", this.name);
  }
};

personOne.speak();
personTwo.speak();
