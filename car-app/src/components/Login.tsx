/*Instead of using class in the html tag to style them we use classname
when using the html in tsx or jsx file becuase class is a key word in js and ts*/

//here curly braces are used to destructure the object named react and take the property called useState
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
interface LoginPageProps {
  onLogin: () => void;
}
//This writing in which React.FC follows after a semincolon is called type annothation
//helps react identify the type in random functions
const Login: React.FC<LoginPageProps> = ({ onLogin }: LoginPageProps) => {
  /*So now about hooks here the username is just a constant react doesnt know its
  value will change each time we type something into text field so we use hooks that helps
  us refresh the DOM whenever a change occurs so actually what we do here is in the 
  list the first is the parameter that can undergo change and the second thing is the function
  that associates it with the change the function defines what to do when somethin happens
  and the hook refreshes the DOM after the change inside the empty string of use state we can set
  default values for it*/

  //If value passed into the function associated with variable it will change to the value

  const [username, setUsername] = useState("John Doe");
  const [password, setPassword] = useState("Machankilladi");
  const button_type = ["Normal User", "Company User"];
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const handleLoginTypeChange = (num: number) => {
    setSelectedIndex(num);
  };

  //here for the e also we can see type annotation,
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { username, password });

    if (selectedIndex === 0) {
      navigate("/rentside");
    } else {
      navigate("/companyside");
    }

    onLogin();
  };

  /*

const items = ['apple', 'banana', 'cherry'];

const ItemList = () => (
  <ul>
    {items.map((item, index) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

There is something called a map fucntion that works like this
Initially the ItemList is called an arrow function it is written like 
Function name = (parameters[if any]) => (value function returns)

here the map function which lies inside it returs list element which contains
item in the container we can name it whatever it want the first parameter of the
map function is identified as the item in the perticular index and the second paramter
is always the index of the currently referring item

here the map function is termed as a callnback function which is a function that is 
called by another function 
*/

  return (
    /*this opening closing angular brackets are used because we need everything inside a single tag for react to render in dom it cant be more than one tag
    so we enclose multiple tags with a single tag*/
    <>
      <h2>Login</h2>
      <div>
        <ul className="list-group">
          {button_type.map((the_type, index) => (
            <li
              onClick={() => handleLoginTypeChange(index)}
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={index}
            >
              {the_type}
            </li>
          ))}
        </ul>
      </div>
      {/*here you can see the curly braces is being used to write javascript code  in html*/}
      <form
        onSubmit={
          handleLogin
        } /*onSubmit is an event handling function which responds to button of type submit*/
      >
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            /*here the e is an event called synthetic base event and is one of the built-in classes in react*/
            /*here the target is the text field box and the value is the value inside that text field box
            that is Onchange of something inside that text field box that event is taken as the parameter and the value inside the text
            field is given as the parameter to the setPassword which sets the value of the password*/
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </p>
    </>
  );
};

export default Login;

/*Additionally in React we have a passing in data via props thing we use interface to perform it
so what it basically is that the List group with heading Cities and diffrent cities as list item
can have heading flowers and different flowers as its item so for this we define an input shape for 
that component so that when using that component we can change the value of input shape so that it 
can decide flowers cities or avengers in this case we give the heading and the contents of the list group
also different list group might behave differently some may decide to bomb up a button when an item is clicked
others may decide to lay a flower mat when an item is clicked so this functionality of the buttons can also be 
adjusted via giving the functions as parameters*/
