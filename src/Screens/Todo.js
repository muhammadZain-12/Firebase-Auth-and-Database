import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { ref, getDatabase, push, onValue, update , remove } from "firebase/database";
import app from "../config/firebaseConfig";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const database = getDatabase(app);



function Todo() {
  
  

  const auth = getAuth(app)
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);
  const location = useLocation();
  const user = location.state;

  let date = new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let time = `${hour}:${minutes}:${seconds}`;

  const addTodo = (e, i) => {
    const reference = ref(database, `Todos/${user.uid}`);
    const obj = {
      value: inputValue,
      time : time
      // uid : user.uid
    };
    push(reference, obj);
    // setTodo([...todo, { value: inputValue }]);

    setInputValue("");
  };

  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      if(user){
        const reference = ref(database, `Todos/${user.uid}`);
        onValue(reference, (e) => {
          const todoData = e.val();
          console.log(todoData);
          if (todoData) {
            let object = Object.entries(todoData).map(([key, value]) => {
              return {
                ...value,
                id: key
              };
            });
            setTodo(object);
          }
        });}
        else{
          navigate("/")
        }
    })
    
  }, []);
  
  

  const updateDataInDb = (id, value) => {
    const reference = ref(database, `Todos/${user.uid}/${id}`);
    update(reference, { value,time })
      .then((isUpdated) => {
        console.log("isUpdated", isUpdated);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const editTodo = (e, i) => {
    setTodo(
      todo.map((event, ind) => {
        if (i == ind) {
          if (event.edit) {
            updateDataInDb(event.id, event.value);
            return {
              ...event,
              edit: event.edit ? false : true,
            };
          } else {
            return {
              ...event,
              edit: event.edit ? false : true,
            };
          }
        } else {
          return {
            ...event,
            edit: false,
          };
        }
      })
    );
  };

  const deleteTodo = (event,value,i) => {

  const reference = ref(database, `Todos/${user.uid}/${event}`);
  value = null;
  remove(reference)
    .then((isDeleted) => {
      console.log(isDeleted, "value is deleted");
    })
    .catch((isnotDeleted) => {
      console.log(isnotDeleted, "value is not deleted");
    });
    setTodo(
      todo.filter((e, ind) => {
        console.log(ind, i);
        return ind !== i;
      })
    );
  }

const clearAll = () => {
  const reference = ref(database,`Todos/${user.uid}`)
  remove(reference)
  setTodo([])

}

const SignOut = () => {
  const auth = getAuth();
signOut(auth).then(() => {
  console.log("signOut")
  // Sign-out successful.
}).catch((error) => {
  console.log(error,"error")
  // An error happened.
});
}



  const item = todo.map((e, i) => {
    return (
      <Box key={i}>
        <li style={{ listStyle: "none", marginLeft: 20 }}>
          {e.edit ? (
            <TextField
              onChange={(item) => {
                setTodo(
                  todo.map((val, ind) => {
                    if (i == ind) {
                      return {
                        ...val,
                        value: item.target.value,
                      };
                    } else {
                      return val;
                    }
                  })
                );
              }}
              value={e.value}
            />
          ) : (
            e.value
          )}
        </li>

        <Button
          onClick={() => editTodo(e, i)}
          sx={{ margin: "10px" }}
          variant="contained"
        >
          {e.edit ? "save" : "Edit"}
        </Button>
        {!e.edit ? (
          <Button
            sx={{ margin: "10px" }}
            onClick={() => deleteTodo(e.id,e.value,i)}
            variant="contained"
          >
            Delete
          </Button>
        ) : (
          ""
        )}
      </Box>
    );
  });

  const submitOnEnter = (e) => {
    if(e.key == "Enter"){
    addTodo()
    }
  }

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "60%",
          marginTop: 3,

        }}
      >
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={submitOnEnter}
          label="Enter Task Here"
          variant="standard"
          sx={{ width: "60%",marginRight:3 }}
        />
        <Button
          onClick={addTodo}
          sx={{ width: "30%", marginTop: 2 }}
          variant="contained"
        >
          Add Item
        </Button>
        <Button
        onClick={clearAll}
        sx={{ width: "30%", marginTop: 2,marginLeft:2 }}
          variant="contained"
        >
          Clear All
        </Button>
       <Link to="/" > <Button
       sx={{ width: "30%", marginTop: 2,marginLeft:2 }}
       variant="primary"
       onClick={SignOut}>
             SignOut
        </Button> </Link>
      </Box>
      <Box sx={{ display: "flex", width: "50%", marginTop: 2 }}>
        <Typography sx={{ fontSize: 20 }} variant="p">
          {item}
        </Typography>
        <Typography
          sx={{ fontSize: 20, marginLeft: 10 }}
          variant="p"
        ></Typography>
      </Box>
    </Box>
  );
}

export default Todo;
