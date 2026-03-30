const poll = new Map();

function addOption(option){
  let message = "";
  if (option === ""){
    message = "Option cannot be empty.";
  }
  else if(poll.has(option) == false){
    poll.set(option, new Set());
    message = "Option \"" + option + "\" added to the poll."
  }
  else {
    message = "Option \"" + option + "\" already exists..";
  }
  return message;
}

function vote(option, voterId){
    let message = "";
  if(poll.has(option) == false){
    message = "Option \"" + option + "\" does not exist.";
  }

  else {
    if (poll.get(option).has(voterId) == true){
      message = "Voter " + voterId + " has already voted for " + option + ".";
    }
    else {
      poll.get(option).add(voterId);
      message = "Voter " + voterId + " voted for \"" + option + "\".";
    }
  }
  return message;
}

function displayResults(){
  console.log("Poll Results:");
  poll.forEach(function(value, key){
    let N = value.size();
    console.log(key + ": " + N + " votes");
  })
}
