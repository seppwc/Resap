interface Prop {
  msg: string
}

type myFunc = (a: Prop) => string

export const f: myFunc = ({ msg }: Prop): string => {
  return `Hello ${msg}`
}
console.log(f({ msg: 'bob' }))
