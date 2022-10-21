import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { ref, getDatabase, push, onValue, update } from "firebase/database";
import app from "../config/firebaseConfig";

const database = getDatabase(app);
function Todo() {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);
  const location = useLocation();
  const user = location.state;

  const addTodo = (e, i) => {
    const reference = ref(database, `Todos/${user.uid}`);
    const obj = {
      value: inputValue,
      // uid : user.uid
    };
    push(reference, obj);
    // setTodo([...todo, { value: inputValue }]);

    setInputValue("");
  };

  useEffect(() => {
    const reference = ref(database, `Todos/${user.uid}`);
    onValue(reference, (e) => {
      const todoData = e.val();
      console.log(todoData);
      if (todoData) {
        let object = Object.entries(todoData).map(([key, value]) => {
          return {
            ...value,
            id: key,
          };
        });
        setTodo(object);
      }
    });
  }, []);
  console.log("DATA", todo);
  const deleteTodo = (e, i) => {
    console.log(i, "iii");
    setTodo(
      todo.filter((e, ind) => {
        return ind !== i;
      })
    );
  };

  const updateDataInDb = (id, value) => {
    const reference = ref(database, `Todos/${user.uid}/${id}`);
    update(reference, { value })
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
            onClick={() => deleteTodo(e, i)}
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
          label="Enter Task Here"
          variant="standard"
          sx={{ width: "60%" }}
        />
        <Button
          onClick={addTodo}
          sx={{ width: "30%", marginTop: 2 }}
          variant="contained"
        >
          Add Item
        </Button>
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
