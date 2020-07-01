interface Prop {
  msg: string;
}

type myFunc = (a: Prop) => void;

const f: myFunc = ({ msg }: Prop): void => {
  console.log("hello " + msg);
};

f({ msg: "bob" });
