import { MyButton, SubArea } from "./main";

jest.mock("./sub2");

it("test", ()=>{
  console.log(MyButton, SubArea);
})