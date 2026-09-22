// backend.js
import express from "express";
import cors from "cors"; 
import userService from "./services/user-service.js"; 

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors()); 


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  
  userService.addUser(userToAdd).then((savedUser) => {
	  res.status(201).send(savedUser); 
  })
	.catch((error) => {
		console.log(error); 
		res.status(500).send("Error adding user."); 
	}); 
}); 

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  
  userService.findUserById(id).then((result) => {
	  if (result === null) {
		  res.status(404).send("Resource not found."); 
	  } else {
		  res.send(result); 
	  }
  })
	.catch((error) => {
		console.log(error); 
		res.status(500).send("Error finding user."); 
	}); 
}); 

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job; 
  
  userService.getUsers(name, job).then((result) => {
	  res.send({ users_list: result });
  })
	.catch((error) => {
		console.log(error); 
		res.status(500).send("Error getting users."); 
	}); 
});

app.delete("/users/:id", (req, res) => {
	const id = req.params.id; 
	
	userService.removeUser(id).then((deletedUser) => {
		if (deletedUser === null) {
			res.status(404).send("Resource not found."); 
		} else {
			res.status(204).send(); 
		}
	})
	.catch((error) => {
		console.log(error); 
		res.status(500).send("Error deleting user."); 
	}); 
}); 

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

