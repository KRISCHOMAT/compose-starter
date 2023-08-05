import { useEffect, useRef, useState } from "react";
import "./App.css";

interface Kitten {
  id: string;
  name: string;
}

function App() {
  const [kittens, setKittens] = useState<Kitten[]>();
  const newKittenRef = useRef<HTMLInputElement>(null);

  const greeting = async (name: string) => {
    try {
      const response = await fetch("http://localhost:8080/greeting", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const greeting = await response.json();
      console.log(greeting);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteKitten = async (name: string) => {
    try {
      const response = await fetch("http://localhost:8080/delete", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const json = await response.json();
      console.log(json);
      getKittens();
    } catch (error) {
      console.log(error);
    }
  };

  const save = async () => {
    if (!newKittenRef.current) return;
    const name = newKittenRef.current.value;
    if (name === "") return;

    try {
      const response = await fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      console.log(data);
      getKittens();
      newKittenRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const getKittens = async () => {
    const response = await fetch("http://localhost:8080");
    const kittens = await response.json();
    console.log(kittens);

    setKittens(kittens);
  };

  useEffect(() => {
    getKittens();
  }, []);
  return (
    <div className="wrapper">
      <div className="input">
        <input ref={newKittenRef} placeholder="kitten name"></input>
        <button onClick={save}>save</button>
      </div>
      <div className="kittens">
        {kittens?.map((kitten) => {
          return (
            <div className="kitten">
              <p key={kitten.id}>{kitten.name}</p>
              <div className="buttons">
                <button
                  onClick={() => {
                    greeting(kitten.name);
                  }}
                >
                  greeting
                </button>
                <button
                  onClick={() => {
                    deleteKitten(kitten.name);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
